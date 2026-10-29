import { isMaintenanceMode } from '@/lib/settings'
import { setMaintenanceModeAction } from './actions'

export default async function AdminSettingsPage() {
  const maintenance = await isMaintenanceMode()

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Paramètres</h1>

      <div className="mt-8 max-w-xl rounded-2xl border border-line bg-paper p-6 shadow-card">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-ink">Mettre le site en veille</p>
            <p className="mt-1 text-sm text-muted">
              {maintenance
                ? 'Le site public affiche actuellement une page de maintenance. Toi seul, connecté à l’admin, peux le remettre en ligne.'
                : 'Le site public est visible normalement. En activant la veille, les visiteurs verront un message « site en maintenance » à la place du contenu.'}
            </p>
          </div>
          <form action={setMaintenanceModeAction}>
            <input type="hidden" name="enabled" value={String(!maintenance)} />
            <button
              type="submit"
              className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${maintenance ? 'bg-teal' : 'bg-line'}`}
            >
              <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper shadow transition-transform ${maintenance ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </form>
        </div>

        {maintenance && (
          <div className="mt-4 rounded-lg bg-teal-soft px-3 py-2 text-xs font-medium text-teal-ink">
            Veille active : le site public n&apos;est pas visible par les visiteurs.
          </div>
        )}
      </div>
    </div>
  )
}
