'use client'

import Link from 'next/link'
import { ArrowRight, FileText } from 'lucide-react'
import { useLocale, useT } from '@/lib/i18n/LocaleContext'
import type { Product } from '@/lib/content'
import { Reveal } from '@/components/motion/Reveal'
import { CtaBand } from '@/components/site/CtaBand'
import { ProductCard } from './ProductCard'

export function ProductDetail({ product: p, related }: { product: Product; related: Product[] }) {
  const t = useT()
  const { locale } = useLocale()
  const highlights = locale === 'en' && p.highlights.en.length ? p.highlights.en : p.highlights.fr
  const specs = locale === 'en' && p.specs.en.length ? p.specs.en : p.specs.fr
  const quoteHref = `/contact?produit=${encodeURIComponent(p.slug)}`

  return (
    <>
      <section className="border-b border-line">
        <div className="wrap pt-10">
          <nav aria-label={t('Fil d’Ariane', 'Breadcrumb')} className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
            <Link href="/" className="hover:text-ink">Medixis</Link>
            <span aria-hidden>/</span>
            <Link href="/produits" className="hover:text-ink">{t('Produits', 'Products')}</Link>
            <span aria-hidden>/</span>
            <Link href={`/gammes/${p.rangeSlug}`} className="hover:text-ink">{t(p.rangeName.fr, p.rangeName.en)}</Link>
          </nav>
        </div>

        <div className="wrap grid gap-12 pb-16 pt-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            {p.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt={p.name} className="aspect-[4/3] w-full bg-paper-alt object-cover" />
            )}
            <p className="mt-3 text-xs text-muted">{t('Photo d’illustration. Visuel du produit sur demande.', 'Illustrative photo. Product images on request.')}</p>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-5">
            <p className="text-sm font-medium text-teal-ink">{p.brand ?? t('Marque en cours de confirmation', 'Brand being confirmed')}</p>
            <h1 className="display mt-3 text-[clamp(2.2rem,4.5vw,3.5rem)] text-ink">{p.name}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">{t(p.description.fr, p.description.en)}</p>

            {highlights.length > 0 && (
              <ul className="mt-8 border-t border-line">
                {highlights.map((h) => (
                  <li key={h} className="flex gap-3 border-b border-line py-3 text-ink">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-teal" />
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-10 flex flex-col gap-3">
              <Link href={quoteHref} className="group flex items-center justify-between bg-navy px-6 py-4 font-semibold text-paper transition-colors hover:bg-navy-deep">
                {t('Demander un devis', 'Request a quote')}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              {p.datasheet ? (
                <a href={p.datasheet} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between border border-ink px-6 py-4 font-semibold text-ink transition-colors hover:bg-ink hover:text-paper">
                  {t('Fiche technique (PDF)', 'Data sheet (PDF)')} <FileText size={18} />
                </a>
              ) : (
                <Link href={`${quoteHref}&fiche=1`} className="flex items-center justify-between border border-ink px-6 py-4 font-semibold text-ink transition-colors hover:bg-ink hover:text-paper">
                  {t('Recevoir la fiche technique', 'Get the data sheet')} <FileText size={18} />
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <h2 className="display-sm text-2xl text-ink lg:col-span-4">{t('Caractéristiques techniques', 'Technical specifications')}</h2>
          <div className="lg:col-span-8">
            {specs.length > 0 ? (
              <dl className="border-t-2 border-ink">
                {specs.map(([k, v]) => (
                  <div key={k} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[14rem_1fr]">
                    <dt className="text-muted">{k}</dt>
                    <dd className="font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <div className="border-t-2 border-ink pt-6">
                <p className="max-w-[56ch] text-lg leading-relaxed text-ink">
                  {t(
                    'Les caractéristiques détaillées (dimensions, références, compatibilités) figurent dans la fiche technique du fabricant, envoyée sur simple demande.',
                    'Detailed specifications (dimensions, references, compatibility) are in the manufacturer’s data sheet, sent on request.'
                  )}
                </p>
                <Link href={`${quoteHref}&fiche=1`} className="link-rule mt-4 inline-block font-semibold text-ink">{t('Demander la fiche', 'Request the sheet')}</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line pb-24 pt-16">
          <div className="wrap">
            <h2 className="display-sm mb-10 text-2xl text-ink">{t('Dans la même gamme', 'In the same range')}</h2>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => <ProductCard key={r.slug} product={r} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBand href={quoteHref} label={{ fr: 'Demander un devis', en: 'Request a quote' }} title={{ fr: `Un devis pour ${p.name.toLowerCase()} ?`, en: `A quote for ${p.name}?` }} />
    </>
  )
}
