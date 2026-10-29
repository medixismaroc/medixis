'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useT } from '@/lib/i18n/LocaleContext'
import { CONTACT } from '@/lib/constants'
import type { Bilingual } from '@/lib/content'

/** Bandeau final de chaque page : un seul message, deux moyens de répondre. */
export function CtaBand({ title, href = '/contact', label }: { title?: Bilingual; href?: string; label?: Bilingual }) {
  const t = useT()
  const heading = title ?? { fr: 'Un équipement à chiffrer, une fiche technique à recevoir ?', en: 'Equipment to price, a data sheet to receive?' }
  const cta = label ?? { fr: 'Écrire à Medixis', en: 'Write to Medixis' }
  return (
    <section className="bg-navy text-paper">
      <div className="wrap grid gap-10 py-20 lg:grid-cols-12 lg:items-end lg:py-28">
        <h2 className="cta-title display text-[clamp(2rem,4.6vw,3.75rem)] lg:col-span-8">{t(heading.fr, heading.en)}</h2>
        <div className="flex flex-col gap-4 lg:col-span-4">
          <Link href={href} className="group flex items-center justify-between bg-paper px-6 py-5 text-base font-semibold text-navy-deep transition-colors hover:bg-teal">
            {t(cta.fr, cta.en)}
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a href={`tel:${CONTACT.phone}`} className="flex items-center justify-between border border-paper/30 px-6 py-5 text-base transition-colors hover:border-paper">
            <span>{t('Appeler', 'Call')}</span>
            <span className="ref">{CONTACT.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
