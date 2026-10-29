'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n/LocaleContext'
import { CONTACT, LEGAL } from '@/lib/constants'
import { PHOTO, PILLARS, ZONES } from '@/lib/content'
import { Reveal } from '@/components/motion/Reveal'
import { PageIntro } from '@/components/site/PageIntro'
import { CtaBand } from '@/components/site/CtaBand'

export function CompanyPage() {
  const t = useT()
  const legal: [string, string][] = (
    [
      [t('Raison sociale', 'Company name'), LEGAL.raisonSociale],
      [t('Siège', 'Head office'), t(CONTACT.cityFr, CONTACT.cityEn)],
      ['RC', LEGAL.rc],
      ['ICE', LEGAL.ice],
      [t('IF', 'Tax ID'), LEGAL.if],
      [t('Téléphone', 'Phone'), CONTACT.phoneDisplay],
    ] as [string, string][]
  ).filter(([, v]) => v)

  return (
    <>
      <PageIntro
        folio="05"
        caption={{ fr: 'Casablanca, siège de Medixis', en: 'Casablanca, Medixis headquarters' }}
        trail={[{ label: { fr: 'La société', en: 'Company' } }]}
        title={{ fr: 'Medixis, Casablanca', en: 'Medixis, Casablanca' }}
        lead={{
          fr: 'Une société marocaine de distribution de dispositifs médicaux, au service des cliniques et des hôpitaux du pays.',
          en: 'A Moroccan medical device distribution company serving the country’s clinics and hospitals.',
        }}
        image={PHOTO.casablanca}
        imagePosition="center 60%"
        imageAlt={t('Casablanca, la mosquée Hassan II face à l’océan', 'Casablanca, the Hassan II mosque facing the ocean')}
      />

      {/* [À VALIDER] présentation par le client */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="text-[clamp(1.35rem,2.4vw,1.9rem)] leading-snug text-ink">
              {t(
                'Medixis vend, distribue et importe des équipements médicaux choisis spécialité par spécialité. Notre rôle : donner aux équipes soignantes accès aux bonnes technologies, et rester présents bien après la livraison.',
                'Medixis sells, distributes and imports medical equipment chosen specialty by specialty. Our role: give care teams access to the right technologies, and stay involved long after delivery.'
              )}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="space-y-5 leading-relaxed text-muted lg:col-span-4 lg:col-start-9">
            <p>
              {t(
                'Nos premiers partenaires couvrent l’endoscopie, la stérilisation, les sutures, l’ablation tumorale et l’électrochirurgie. De nouvelles gammes viendront compléter l’offre après le salon MEDICA 2026.',
                'Our first partners cover endoscopy, sterilization, sutures, tumor ablation and electrosurgery. New ranges will complete the offer after MEDICA 2026.'
              )}
            </p>
            <Link href="/specialites" className="link-rule inline-block font-semibold text-ink">{t('Voir les spécialités', 'See the specialties')}</Link>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-paper-alt">
        <div className="wrap grid md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.06} className={`py-14 md:px-8 ${i > 0 ? 'border-t border-line md:border-l md:border-t-0' : 'md:pl-0'}`}>
              <h2 className="display text-[clamp(1.8rem,3vw,2.5rem)] text-navy">{t(p.title.fr, p.title.en)}</h2>
              <p className="mt-4 leading-relaxed text-muted">{t(p.body.fr, p.body.en)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Zones : [À CONFIRMER] villes desservies */}
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="display text-[clamp(2rem,4vw,3.25rem)] text-ink">{t('Partout au Maroc', 'Across Morocco')}</h2>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted">
              {t('Depuis Casablanca, nous livrons et installons dans tout le pays.', 'From Casablanca, we deliver and install throughout the country.')}
            </p>
          </div>
          <ul className="border-t-2 border-ink lg:col-span-6 lg:col-start-7">
            <li className="flex items-baseline justify-between border-b border-line py-4">
              <span className="display-sm text-2xl text-ink">{ZONES.hq}</span>
              <span className="text-sm font-medium text-teal-ink">{t('Siège', 'Head office')}</span>
            </li>
            {ZONES.cities.map((c) => (
              <li key={c} className="flex items-baseline justify-between border-b border-line py-4">
                <span className="display-sm text-2xl text-ink">{c}</span>
                <span className="text-sm text-muted">{t('Livraison et installation', 'Delivery and installation')}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section border-t border-line bg-paper-alt">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <h2 className="display-sm text-2xl text-ink lg:col-span-4">{t('Informations légales', 'Legal information')}</h2>
          <dl className="border-t-2 border-ink lg:col-span-6 lg:col-start-7">
            {legal.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[10rem_1fr] gap-4 border-b border-line py-4 text-sm">
                <dt className="text-muted">{k}</dt>
                <dd className="ref font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
