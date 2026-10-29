import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'
import { LocaleProvider } from '@/lib/i18n/LocaleContext'
import { SITE_URL, CONTACT } from '@/lib/constants'

// Archivo : grotesque à axe de largeur ; étendue pour les titres, normale pour le texte.
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  axes: ['wdth'],
})

const TITLE = 'Medixis | Vente, distribution et import de matériel médical au Maroc'
const DESCRIPTION =
  'Medixis, Casablanca : vente, distribution et import de matériel médical pour les établissements de santé au Maroc.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    siteName: 'Medixis',
    locale: 'fr_MA',
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: '/',
    images: [{ url: '/img/og.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Medixis',
  url: SITE_URL,
  logo: `${SITE_URL}/img/logo.png`,
  slogan: 'Sales. Distribution. Import',
  description: DESCRIPTION,
  address: { '@type': 'PostalAddress', addressLocality: 'Casablanca', addressCountry: 'MA' },
  telephone: CONTACT.phone,
  areaServed: { '@type': 'Country', name: 'Maroc' },
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="fr" className={`${archivo.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  )
}
