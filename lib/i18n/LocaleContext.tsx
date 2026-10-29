'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Locale = 'fr' | 'en'

interface LocaleContextValue {
  locale: Locale
  toggle: () => void
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

const STORAGE_KEY = 'mdx-lang'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr')

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'fr') setLocaleState(saved)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    window.localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  function setLocale(next: Locale) {
    setLocaleState(next)
  }

  function toggle() {
    setLocaleState((current) => (current === 'fr' ? 'en' : 'fr'))
  }

  return (
    <LocaleContext.Provider value={{ locale, toggle, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within a LocaleProvider')
  return ctx
}

/** t(champ_fr, champ_en) — le rendu serveur est toujours en FR, pas de flash ni de mismatch d'hydratation. */
export function useT() {
  const { locale } = useLocale()
  return (fr: string, en: string) => (locale === 'en' ? en : fr)
}
