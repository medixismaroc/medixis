'use client'

import Link from 'next/link'
import type { ReactNode } from 'react'
import { useT } from '@/lib/i18n/LocaleContext'
import type { Bilingual } from '@/lib/content'
import { Reveal } from '@/components/motion/Reveal'

/**
 * Tête des pages intérieures, composée comme une page de catalogue :
 * à gauche une colonne de texte (folio, titre, chapô, faits), à droite un
 * panneau à fond perdu qui tient dans la hauteur de l'écran. Le panneau est
 * la photo de la page, ou à défaut un aplat marine portant le numéro de folio.
 */
export function PageIntro({ trail, title, lead, image, imageAlt, imagePosition = 'center', aside, folio, facts, caption }: {
  trail: { href?: string; label: Bilingual }[]
  title: Bilingual
  lead?: Bilingual
  image?: string
  imageAlt?: string
  imagePosition?: string
  aside?: ReactNode
  folio?: string
  facts?: { value: string; label: Bilingual }[]
  caption?: Bilingual
}) {
  const t = useT()
  const section = trail[0]?.label
  // Sans photo ni faits (contact, actualités) : tête courte, le contenu remonte.
  const tall = Boolean(image || facts?.length)

  return (
    <section className={`grid border-b border-line lg:grid-cols-12 ${tall ? "lg:min-h-[min(calc(100svh-4.25rem),46rem)]" : ""}`}>
      <div
        className="flex flex-col px-(--gutter) pb-10 pt-8 lg:col-span-7 lg:pb-12 lg:pr-12 lg:pt-10"
        style={{ paddingInlineStart: 'max(var(--gutter), calc((100vw - 72rem) / 2 + var(--gutter)))' }}
      >
        <nav aria-label={t('Fil d’Ariane', 'Breadcrumb')} className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
          <Link href="/" className="hover:text-ink">Medixis</Link>
          {trail.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              <span aria-hidden className="opacity-40">/</span>
              {c.href ? <Link href={c.href} className="hover:text-ink">{t(c.label.fr, c.label.en)}</Link> : <span className="text-ink">{t(c.label.fr, c.label.en)}</span>}
            </span>
          ))}
        </nav>

        <Reveal className={tall ? "mt-10 lg:mt-auto" : "mt-8"}>
          {folio && section && (
            <p className="mb-5 flex items-baseline gap-3 border-t-2 border-ink pt-3 text-[13px] text-muted">
              <span className="font-semibold tabular-nums text-ink">{folio}</span>
              {t(section.fr, section.en)}
            </p>
          )}
          <h1 className="display text-[clamp(2.1rem,min(5.2vw,9svh),4.5rem)] wrap-anywhere text-ink">{t(title.fr, title.en)}</h1>
        </Reveal>

        {(lead || aside) && (
          <Reveal delay={0.08} className="mt-6">
            {lead && <p className="max-w-[48ch] text-lg leading-relaxed text-muted">{t(lead.fr, lead.en)}</p>}
            {aside}
          </Reveal>
        )}

        {facts && facts.length > 0 && (
          <Reveal delay={0.12} className="mt-8 lg:mb-auto">
            <dl className="grid grid-cols-2 border-t border-line sm:grid-cols-4">
              {facts.map((f, i) => (
                <div key={i} className="flex flex-col border-b border-line py-3 pr-4 sm:border-b-0">
                  <dt className="order-2 text-[13px] leading-snug text-muted">{t(f.label.fr, f.label.en)}</dt>
                  <dd className="order-1 mb-1 text-xl font-semibold tabular-nums text-ink">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        )}
        {!facts && <div className="hidden lg:mb-auto lg:block" />}
      </div>

      {image ? (
        <figure className="relative lg:col-span-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={imageAlt ?? ''}
            className="block h-[34svh] w-full object-cover lg:absolute lg:inset-0 lg:h-full"
            style={{ objectPosition: imagePosition }}
          />
          {caption && (
            <figcaption className="absolute bottom-0 left-0 flex gap-3 bg-paper px-4 py-2 text-[13px] text-muted">
              <span className="tabular-nums text-ink">Fig. 1</span>{t(caption.fr, caption.en)}
            </figcaption>
          )}
        </figure>
      ) : tall && (
        <div aria-hidden className="hidden flex-col justify-between bg-navy-deep p-10 text-paper lg:col-span-5 lg:flex">
          <span className="text-[13px] text-paper/60">Medixis · {section ? t(section.fr, section.en) : ''}</span>
          <span className="display text-[clamp(8rem,16vw,15rem)] leading-none text-paper/90 tabular-nums">{folio}</span>
        </div>
      )}
    </section>
  )
}
