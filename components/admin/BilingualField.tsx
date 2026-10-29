interface BilingualFieldProps {
  label: string
  nameFr: string
  nameEn: string
  defaultValueFr?: string
  defaultValueEn?: string
  multiline?: boolean
  required?: boolean
}

/** Deux champs FR/EN côte à côte — un contenu ne peut pas être publié sans ses deux versions. */
export function BilingualField({ label, nameFr, nameEn, defaultValueFr, defaultValueEn, multiline, required = false }: BilingualFieldProps) {
  const Field = multiline ? 'textarea' : 'input'

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink">{label}</label>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">FR</span>
          <Field
            name={nameFr}
            defaultValue={defaultValueFr}
            required={required}
            rows={multiline ? 4 : undefined}
            className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy"
          />
        </div>
        <div>
          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">EN</span>
          <Field
            name={nameEn}
            defaultValue={defaultValueEn}
            required={required}
            rows={multiline ? 4 : undefined}
            className="w-full rounded-lg border border-line px-3 py-2 text-sm outline-none focus:border-navy"
          />
        </div>
      </div>
    </div>
  )
}
