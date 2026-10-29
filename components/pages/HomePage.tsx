'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useT } from '@/lib/i18n/LocaleContext'
import { MOTION } from '@/lib/motion/tokens'
import { PHOTO, PILLARS, type Brand, type Post, type Range } from '@/lib/content'
import { Reveal } from '@/components/motion/Reveal'
import { RangeIndex } from '@/components/site/RangeIndex'
import { PartnerTable } from '@/components/site/PartnerTable'
import { CtaBand } from '@/components/site/CtaBand'
import { PostList } from '@/components/news/PostList'

export function HomePage({ ranges, brands, posts }: { ranges: Range[]; brands: Brand[]; posts: Post[] }) {
  const t = useT()
  const reduce = useReducedMotion()
  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: MOTION.duration.slow, delay, ease: MOTION.ease },
  })
  const productCount = ranges.reduce((n, r) => n + r.products.length, 0)

  return (
    <div className="home">
      {/* ── Ouverture : tient dans la hauteur de l'écran (sous l'en-tête), sans défilement. ── */}
      <section className="relative border-b border-line">
        <div className="split flex h-[calc(100svh-4.25rem)] flex-col lg:grid lg:max-h-[56rem] lg:grid-cols-12">
          <div className="wrap flex min-w-0 shrink-0 flex-col justify-between gap-[3.5svh] py-[4svh] lg:col-span-7 lg:mx-0 lg:max-w-none lg:py-[6svh] lg:pr-12">
            <motion.p {...enter(0)} className="ref text-sm text-muted">
              Casablanca · Sales. Distribution. Import
            </motion.p>

            <div>
              <motion.h1 {...enter(0.05)} className="display text-[clamp(2rem,min(5.6vw,8svh),4.6rem)] text-ink">
                {t('Le bon équipement,', 'The right equipment,')}
                <br />
                <span className="text-navy">{t('au bon bloc.', 'in the right theatre.')}</span>
              </motion.h1>
              <motion.p {...enter(0.12)} className="mt-[3svh] max-w-[52ch] text-base leading-relaxed text-muted lg:text-lg">
                {t(
                  'Medixis importe et distribue des dispositifs médicaux pour les cliniques et les hôpitaux du Maroc : endoscopie, stérilisation, sutures, ablation et électrochirurgie. Installation, formation et suivi compris.',
                  'Medixis imports and distributes medical devices for clinics and hospitals in Morocco: endoscopy, sterilization, sutures, ablation and electrosurgery. Installation, training and follow-up included.'
                )}
              </motion.p>
              <motion.div {...enter(0.18)} className="mt-[4svh] flex flex-wrap items-center gap-x-8 gap-y-3">
                <Link href="/contact" className="group inline-flex items-center gap-3 bg-navy px-6 py-3.5 font-semibold text-paper transition-colors hover:bg-navy-deep">
                  {t('Demander un devis', 'Request a quote')}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="/produits" className="link-rule font-semibold text-ink">
                  {t(`Parcourir les ${productCount} produits`, `Browse the ${productCount} products`)}
                </Link>
              </motion.div>
            </div>

            <motion.dl {...enter(0.26)} className="hidden grid-cols-3 gap-x-6 border-t border-line pt-[2.5svh] text-sm sm:grid">
              <div>
                <dt className="text-muted">{t('Gammes', 'Ranges')}</dt>
                <dd className="mt-1 font-semibold text-ink">{ranges.length} {t('spécialités', 'specialties')}</dd>
              </div>
              <div>
                <dt className="text-muted">{t('Marques', 'Brands')}</dt>
                <dd className="mt-1 font-semibold text-ink">{brands.map((b) => b.name).join(', ') || '…'}</dd>
              </div>
              <div>
                <dt className="text-muted">{t('Livraison', 'Delivery')}</dt>
                <dd className="mt-1 font-semibold text-ink">{t('Partout au Maroc', 'Across Morocco')}</dd>
              </div>
            </motion.dl>
          </div>

          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={reduce ? { duration: 0 } : { duration: 1.1, delay: 0.1, ease: MOTION.ease }}
            className="relative min-h-0 min-w-0 flex-1 lg:col-span-5 lg:h-auto"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTO.hero} alt={t('Équipe chirurgicale au travail sous les scialytiques', 'Surgical team at work under the operating lights')} className="absolute inset-0 h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* ── Index des gammes ── */}
      <section className="section">
        <div className="wrap">
          <div className="mb-14 grid gap-6 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <h2 className="display text-[clamp(2.2rem,5vw,4rem)] text-ink">{t('Cinq spécialités, un seul interlocuteur.', 'Five specialties, one point of contact.')}</h2>
            </Reveal>
            <Reveal delay={0.08} className="flex items-end lg:col-span-4 lg:col-start-9">
              <p className="text-muted">
                {t('Chaque gamme a sa page : technologies, produits, fiches techniques sur demande.', 'Each range has its own page: technologies, products, data sheets on request.')}{' '}
                <Link href="/specialites" className="link-rule font-semibold text-ink">{t('Toutes les spécialités', 'All specialties')}</Link>
              </p>
            </Reveal>
          </div>
          <RangeIndex ranges={ranges} />
        </div>
      </section>

      <PartnerTable brands={brands} ranges={ranges} />

      {/* ── Métiers : photo d'instruments, trois lignes de définition ── */}
      <section className="bg-paper-alt">
        <div className="split grid lg:grid-cols-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={PHOTO.sterilisation} alt={t('Instruments chirurgicaux préparés sur un champ stérile', 'Surgical instruments laid out on a sterile drape')} className="h-72 w-full object-cover lg:col-span-5 lg:h-full" />
          <div className="wrap section lg:col-span-7 lg:mx-0 lg:pl-16">
            <Reveal>
              <h2 className="display text-[clamp(2rem,4.4vw,3.5rem)] text-ink">{t('Du fabricant à votre salle d’opération.', 'From the manufacturer to your operating room.')}</h2>
            </Reveal>
            <dl className="mt-12">
              {PILLARS.map((p, i) => (
                <Reveal key={p.key} delay={i * 0.06} className="grid gap-2 border-t border-line-strong/20 py-6 sm:grid-cols-[10rem_1fr]">
                  <dt className="display-sm text-xl text-navy">{t(p.title.fr, p.title.en)}</dt>
                  <dd className="leading-relaxed text-muted">{t(p.body.fr, p.body.en)}</dd>
                </Reveal>
              ))}
            </dl>
            <Link href="/services" className="link-rule mt-6 inline-block font-semibold text-ink">{t('Notre accompagnement en quatre étapes', 'Our four-step support')}</Link>
          </div>
        </div>
      </section>

      {/* ── Actualités ── */}
      {posts.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
              <h2 className="display text-[clamp(2rem,4.4vw,3.5rem)] text-ink">{t('Actualités', 'News')}</h2>
              <Link href="/actualites" className="link-rule font-semibold text-ink">{t('Toutes les actualités', 'All news')}</Link>
            </div>
            <PostList posts={posts.slice(0, 3)} />
          </div>
        </section>
      )}

      <CtaBand />
    </div>
  )
}
