import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { SITE_URL } from '@/lib/constants'

// Le réglage de veille est lu au plus une fois toutes les 30 s par instance,
// au lieu d'un appel Supabase à chaque visite. Contrepartie : activer ou
// désactiver la veille met jusqu'à 30 s à s'appliquer côté visiteurs.
const MAINTENANCE_TTL_MS = 30_000
let maintenanceCache: { active: boolean; expires: number } | null = null

/** Cookie de session Supabase (« sb-<ref>-auth-token », éventuellement découpé en .0, .1…). */
function hasSessionCookie(request: NextRequest) {
  return request.cookies.getAll().some(({ name }) => name.startsWith('sb-') && name.includes('-auth-token'))
}

export async function proxy(request: NextRequest) {
  // www.medixis.ma et medixis.ma servent le même site : deux adresses pour
  // un seul contenu. Redirection permanente vers le domaine nu, celui que
  // designe la balise canonical. Placee avant tout appel a Supabase.
  const host = request.headers.get('host') ?? request.nextUrl.host
  if (host.toLowerCase().startsWith('www.')) {
    const target = new URL(`${request.nextUrl.pathname}${request.nextUrl.search}`, SITE_URL)
    return NextResponse.redirect(target, 301)
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  const pathname = request.nextUrl.pathname
  const isAdminRoute = pathname.startsWith('/admin')
  const isMaintenancePage = pathname === '/maintenance'

  // Un visiteur sans cookie de session n'est pas connecté : inutile
  // d'interroger Supabase Auth (appel réseau) pour le confirmer.
  const user = isAdminRoute || hasSessionCookie(request) ? (await supabase.auth.getUser()).data.user : null

  // Routes admin : toujours accessibles (auth uniquement) — sinon personne ne
  // peut désactiver la veille une fois activée.
  if (isAdminRoute) {
    const isLoginPage = pathname === '/admin/login'

    if (!isLoginPage && !user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }

    if (isLoginPage && user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  }

  if (!maintenanceCache || maintenanceCache.expires < Date.now()) {
    const { data: setting } = await supabase.from('settings').select('value').eq('key', 'maintenance_mode').single()
    maintenanceCache = { active: setting?.value === 'true', expires: Date.now() + MAINTENANCE_TTL_MS }
  }
  const maintenanceActive = maintenanceCache.active

  if (isMaintenancePage) {
    if (!maintenanceActive) {
      const url = request.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect(url)
    }
    return supabaseResponse
  }

  // Un administrateur connecté voit le site normalement même en veille, pour
  // pouvoir vérifier son rendu avant de désactiver la maintenance.
  if (maintenanceActive && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/maintenance'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)'],
}
