'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useT } from '@/lib/i18n/LocaleContext'
import type { Bilingual } from '@/lib/content'
import { Reveal } from '@/components/motion/Reveal'

export type IntroItem = {
  /** Libellé déjà traduit. */
  label: string
  /** Petite mention à droite (nombre de produits, date, marque…). */
  meta?: string
  href?: string
  external?: boolean
  /** Photo affichée quand la ligne est survolée. */
  image?: string
}

/**
 * Tête de la page Spécialités : aplat marine qui tient dans un écran.
 * À gauche le titre et le chapô (et une photo sur grand écran), à droite une
 * liste numérotée propre à la page qui sert de sommaire ; la photo suit la
 * ligne survolée.
 */
export function IndexIntro({ trail, title, lead, image, imageAlt, items = [] }: {
  trail: { href?: string; label: Bilingual }[]
  title: Bilingual
  lead?: Bilingual
  image?: string
  imageAlt?: string
  items?: IntroItem[]
}) {
  const t = useT()
  const [active, setActive] = useState(0)
  const current = items[active]
  const photo = current?.image ?? image ?? items.find((i) => i.image)?.image
  const caption = active >= 0 && current?.image ? `${String(active + 1).padStart(2, '0')}|${current.label}` : null

  return (
    <section className="flex min-h-[calc(100svh-4.25rem)] flex-col bg-navy-deep text-paper lg:block lg:min-h-[min(calc(100svh-4.25rem),46rem)]">
      <div className="wrap grid flex-1 content-between gap-[3svh] pb-[3svh] pt-[2.5svh] sm:pt-10 lg:min-h-[inherit] lg:grid-cols-12 lg:content-normal lg:gap-12 lg:pb-12">
        <div className="flex flex-col lg:col-span-5">
          <nav aria-label={t('Fil d’Ariane', 'Breadcrumb')} className="flex flex-wrap items-center gap-2 text-[13px] text-paper/60">
            <Link href="/" className="hover:text-paper">Medixis</Link>
            {trail.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <span aria-hidden className="opacity-40">/</span>
                {c.href ? <Link href={c.href} className="hover:text-paper">{t(c.label.fr, c.label.en)}</Link> : <span className="text-paper">{t(c.label.fr, c.label.en)}</span>}
              </span>
            ))}
          </nav>

          <Reveal className="mt-[3svh] lg:mt-14">
            <h1 className="display text-[clamp(2rem,min(5.5vw,7svh),4.75rem)] text-paper lg:text-[clamp(2.4rem,min(5.5vw,10svh),4.75rem)]">{t(title.fr, title.en)}</h1>
            {lead && (
              <p className="mt-[2svh] max-w-[40ch] text-[clamp(1.05rem,min(4.8vw,2.6svh),1.25rem)] leading-relaxed text-paper/75 sm:text-lg lg:mt-6">
                {t(lead.fr, lead.en)}
              </p>
            )}
          </Reveal>

          {photo && (
            <figure className="mt-10 hidden lg:mt-auto lg:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={photo} src={photo} alt={current ? '' : imageAlt ?? ''} className="aspect-[16/10] max-h-[30svh] w-full animate-[fadein_.4s_ease-out] object-cover" />
              {caption && (
                <figcaption className="mt-3 flex gap-3 text-[13px] text-paper/60">
                  <span className="tabular-nums text-paper">{caption.split('|')[0]}</span>{caption.split('|')[1]}
                </figcaption>
              )}
            </figure>
          )}
        </div>

        {items.length > 0 && (
          <Reveal delay={0.08} className="lg:col-span-7 lg:flex lg:flex-col lg:justify-end">
            <ol aria-label={t('Sommaire', 'Contents')} className="border-t border-paper/25">
              {items.map((it, i) => {
                const on = i === active
                const row = (
                  <>
                    <span className={`text-sm tabular-nums ${on ? 'text-teal' : 'text-paper/50'}`}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={`display-sm text-[clamp(1.05rem,min(4.6vw,2.9svh),2.1rem)] leading-tight transition-colors lg:text-[clamp(1.25rem,min(2.4vw,4.2svh),2.1rem)] ${on || !it.href ? 'text-paper' : 'text-paper/70'}`}>
                      {it.label}
                    </span>
                    {it.meta && <span className="text-right text-[13px] text-paper/50 transition-transform group-hover:translate-x-1">{it.meta}</span>}
                  </>
                )
                const cls = 'group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 py-[clamp(0.45rem,1.6svh,1.35rem)]'
                const hover = { onMouseEnter: () => setActive(i), onFocus: () => setActive(i) }
                return (
                  <li key={i} className="border-b border-paper/25">
                    {!it.href ? <div className={cls}>{row}</div>
                      : it.external || it.href.startsWith('#') || it.href.startsWith('tel:')
                        ? <a href={it.href} {...hover} className={cls} {...(it.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{row}</a>
                        : <Link href={it.href} {...hover} className={cls}>{row}</Link>}
                  </li>
                )
              })}
            </ol>
          </Reveal>
        )}
      </div>
    </section>
  )
}
