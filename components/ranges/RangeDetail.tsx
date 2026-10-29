'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useT } from '@/lib/i18n/LocaleContext'
import type { Range } from '@/lib/content'
import { Reveal } from '@/components/motion/Reveal'
import { PageIntro } from '@/components/site/PageIntro'
import { ProductRows } from '@/components/site/ProductRows'
import { CtaBand } from '@/components/site/CtaBand'

export function RangeDetail({ range, index, prev, next }: { range: Range; index: number; prev?: Range; next?: Range }) {
  const t = useT()
  const brands = [...new Set(range.products.map((p) => p.brand).filter(Boolean))] as string[]
  const facts: [string, string][] = [
    [t('Marque', 'Brand'), brands.join(', ') || t('En cours de confirmation', 'Being confirmed')],
    [t('Produits', 'Products'), String(range.products.length)],
    [t('Documentation', 'Documentation'), t('Fiches techniques sur demande', 'Data sheets on request')],
    [t('Inclus', 'Included'), t('Installation, formation, suivi', 'Installation, training, follow-up')],
  ]

  return (
    <>
      <PageIntro
        folio="01"
        trail={[{ href: '/specialites', label: { fr: 'Spécialités', en: 'Specialties' } }, { label: range.name }]}
        title={range.name}
        lead={range.summary}
        image={range.image}
      />

      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-[clamp(1.2rem,2vw,1.5rem)] leading-relaxed text-ink">{t(range.body.fr, range.body.en)}</p>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
            <dl className="border-t-2 border-ink text-sm">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8rem_1fr] gap-4 border-b border-line py-3.5">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {range.products.length > 0 && (
          <div className="wrap mt-20">
            <h2 className="display-sm mb-6 text-2xl text-ink">{t('Produits de la gamme', 'Products in this range')}</h2>
            <ProductRows products={range.products} />
          </div>
        )}
      </section>

      <nav aria-label={t('Autres gammes', 'Other ranges')} className="border-t border-line">
        <div className="wrap grid sm:grid-cols-2">
          {prev ? (
            <Link href={`/gammes/${prev.slug}`} className="group flex flex-col gap-2 border-line py-10 sm:border-r sm:pr-8">
              <span className="flex items-center gap-2 text-sm text-muted"><ArrowLeft size={16} /> {t('Gamme précédente', 'Previous range')}</span>
              <span className="display-sm text-xl text-ink group-hover:text-navy">{t(prev.name.fr, prev.name.en)}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/gammes/${next.slug}`} className="group flex flex-col items-end gap-2 py-10 text-right sm:pl-8">
              <span className="flex items-center gap-2 text-sm text-muted">{t('Gamme suivante', 'Next range')} <ArrowRight size={16} /></span>
              <span className="display-sm text-xl text-ink group-hover:text-navy">{t(next.name.fr, next.name.en)}</span>
            </Link>
          )}
        </div>
      </nav>

      <CtaBand title={{ fr: `Un devis pour la gamme ${range.name.fr.toLowerCase()} ?`, en: `A quote for the ${range.name.en.toLowerCase()} range?` }} href={`/contact?gamme=${range.slug}`} label={{ fr: 'Demander un devis', en: 'Request a quote' }} />
    </>
  )
}
