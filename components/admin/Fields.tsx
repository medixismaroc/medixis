import type { ReactNode } from 'react'

const input = 'w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy'

export function TextField({ label, name, defaultValue, required, hint, type = 'text' }: {
  label: string; name: string; defaultValue?: string | number | null; required?: boolean; hint?: string; type?: string
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <input id={name} name={name} type={type} defaultValue={defaultValue ?? ''} required={required} className={input} />
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  )
}

export function ActiveToggle({ defaultChecked = true }: { defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-2.5 text-sm text-ink">
      <input type="checkbox" name="active" value="true" defaultChecked={defaultChecked} className="h-4 w-4 accent-[var(--color-navy)]" />
      Visible sur le site
    </label>
  )
}

export function FormCard({ action, children, submitLabel, id }: {
  action: (fd: FormData) => Promise<void>; children: ReactNode; submitLabel: string; id?: string
}) {
  return (
    <form action={action} className="max-w-3xl space-y-6 rounded-2xl border border-line bg-paper p-6 shadow-card">
      {id && <input type="hidden" name="id" value={id} />}
      {children}
      <div className="flex justify-end border-t border-line pt-5">
        <button type="submit" className="rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-paper hover:bg-navy-deep">
          {submitLabel}
        </button>
      </div>
    </form>
  )
}

export function AdminList({ title, count, newHref, newLabel, empty, children }: {
  title: string; count: number; newHref: string; newLabel: string; empty: string; children: ReactNode
}) {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-ink">{title}</h1>
          <p className="mt-1 text-sm text-muted">{count} élément(s)</p>
        </div>
        <a href={newHref} className="rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-paper hover:bg-navy-deep">+ {newLabel}</a>
      </div>
      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-paper">
        {count === 0 ? <p className="p-8 text-center text-sm text-muted">{empty}</p> : <div className="divide-y divide-line">{children}</div>}
      </div>
    </div>
  )
}

export function StatusBadge({ active }: { active: boolean }) {
  return (
    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${active ? 'bg-teal-soft text-teal-ink' : 'bg-line/60 text-muted'}`}>
      {active ? 'Visible' : 'Masqué'}
    </span>
  )
}
