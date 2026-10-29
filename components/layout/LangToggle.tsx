'use client'

import { useLocale } from '@/lib/i18n/LocaleContext'

function FlagFr() {
  return (
    <svg viewBox="0 0 20 14" width="20" height="14" className="rounded-[2px]" aria-hidden="true">
      <rect width="7" height="14" fill="#002395" />
      <rect x="7" width="6" height="14" fill="#fff" />
      <rect x="13" width="7" height="14" fill="#ED2939" />
    </svg>
  )
}

function FlagEn() {
  return (
    <svg viewBox="0 0 20 14" width="20" height="14" className="rounded-[2px]" aria-hidden="true">
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0l20 14M20 0L0 14" stroke="#fff" strokeWidth="3" />
      <path d="M0 0l20 14M20 0L0 14" stroke="#C8102E" strokeWidth="1.5" />
      <path d="M10 0v14M0 7h20" stroke="#fff" strokeWidth="4" />
      <path d="M10 0v14M0 7h20" stroke="#C8102E" strokeWidth="2.5" />
    </svg>
  )
}

/** N'affiche que la langue vers laquelle on peut basculer, pas la langue active. */
export function LangToggle() {
  const { locale, toggle } = useLocale()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={locale === 'fr' ? 'Switch to English' : 'Passer en français'}
      className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-md border border-line px-2.5 py-1.5 text-[13px] font-semibold text-muted transition-colors hover:border-navy hover:text-navy"
    >
      {locale === 'fr' ? (
        <>
          <FlagEn />
          EN
        </>
      ) : (
        <>
          <FlagFr />
          FR
        </>
      )}
    </button>
  )
}
