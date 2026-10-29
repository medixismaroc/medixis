'use client'

import { Plus } from 'lucide-react'
import { useLocale, useT } from '@/lib/i18n/LocaleContext'
import { PHOTO, SERVICES, type Bilingual } from '@/lib/content'
import { Reveal } from '@/components/motion/Reveal'
import { PageIntro } from '@/components/site/PageIntro'
import { CtaBand } from '@/components/site/CtaBand'

// Détail de chaque étape (clés alignées sur SERVICES dans lib/content.ts).
const DETAILS: Record<string, { fr: string[]; en: string[] }> = {
  selection: {
    fr: ['Échange avec le chef de service et l’acheteur', 'Comparaison des options et des configurations', 'Devis détaillé, consommables compris'],
    en: ['Discussion with the head of department and the buyer', 'Comparison of options and configurations', 'Detailed quote, consumables included'],
  },
  import: {
    fr: ['Commande passée directement au fabricant', 'Transport jusqu’au Maroc', 'Formalités douanières et réglementaires'],
    en: ['Order placed directly with the manufacturer', 'Shipping to Morocco', 'Customs and regulatory formalities'],
  },
  installation: {
    fr: ['Livraison et mise en service dans votre établissement', 'Formation des chirurgiens, infirmiers et techniciens', 'Remise de la documentation d’utilisation'],
    en: ['Delivery and commissioning at your facility', 'Training for surgeons, nurses and technicians', 'User documentation handed over'],
  },
  support: {
    fr: ['Réapprovisionnement en consommables', 'Interlocuteur unique pour le service après-vente', 'Lien direct avec le fabricant'],
    en: ['Consumable resupply', 'Single contact for after-sales service', 'Direct link with the manufacturer'],
  },
}

const PHOTOS: Record<string, string> = {
  selection: PHOTO.ablation,
  import: PHOTO.salon,
  installation: PHOTO.salleVide,
  support: PHOTO.sterilisation,
}

// [À VALIDER] avec le client : réponses à confirmer avant publication.
const FAQ: { q: Bilingual; a: Bilingual }[] = [
  { q: { fr: 'Intervenez-vous partout au Maroc ?', en: 'Do you operate throughout Morocco?' }, a: { fr: 'Oui. Medixis est basée à Casablanca et livre les établissements de santé dans tout le pays.', en: 'Yes. Medixis is based in Casablanca and delivers to healthcare facilities across the country.' } },
  { q: { fr: 'La formation est-elle comprise ?', en: 'Is training included?' }, a: { fr: 'La mise en service et la formation des équipes font partie de chaque installation. Le détail figure dans le devis.', en: 'Commissioning and team training are part of every installation. Details are in the quote.' } },
  { q: { fr: 'Comment obtenir une fiche technique ?', en: 'How do I get a data sheet?' }, a: { fr: 'Depuis la fiche du produit, ou en nous écrivant. Nous vous envoyons la documentation du fabricant.', en: 'From the product page, or by writing to us. We send you the manufacturer’s documentation.' } },
  { q: { fr: 'Fournissez-vous les consommables ?', en: 'Do you supply consumables?' }, a: { fr: 'Oui, pour les équipements que nous distribuons. Nous organisons le réapprovisionnement avec vous.', en: 'Yes, for the equipment we distribute. We organise resupply with you.' } },
  { q: { fr: 'Sous quel délai répondez-vous ?', en: 'How quickly do you reply?' }, a: { fr: 'Sous 24 heures ouvrables pour toute demande reçue par le formulaire ou par téléphone.', en: 'Within 24 business hours for any request received through the form or by phone.' } },
]

export function ServicesPage() {
  const t = useT()
  const { locale } = useLocale()
  return (
    <>
      <PageIntro
        folio="03"
        facts={SERVICES.map((s, i) => ({ value: String(i + 1).padStart(2, '0'), label: s.title }))}
        trail={[{ label: { fr: 'Services', en: 'Services' } }]}
        title={{ fr: 'De la sélection au suivi', en: 'From selection to follow-up' }}
        lead={{
          fr: 'Un équipement médical ne s’arrête pas à la livraison. Medixis vous accompagne avant, pendant et après, avec un seul interlocuteur.',
          en: 'Medical equipment doesn’t stop at delivery. Medixis supports you before, during and after, with a single point of contact.',
        }}
      />

      {SERVICES.map((s, i) => {
        const d = DETAILS[s.key]
        const flip = i % 2 === 1
        return (
          <section key={s.key} className="border-b border-line">
            <div className="split grid lg:grid-cols-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={PHOTOS[s.key]} alt="" className={`h-64 w-full object-cover lg:col-span-5 lg:h-full ${flip ? 'lg:order-2' : ''}`} />
              <div className={`wrap py-16 lg:col-span-7 lg:mx-0 lg:py-24 ${flip ? 'lg:order-1 lg:pr-16' : 'lg:pl-16'}`}>
                <Reveal>
                  <span className="display block text-[clamp(4rem,9vw,7.5rem)] leading-none text-teal">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] text-ink">{t(s.title.fr, s.title.en)}</h2>
                  <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">{t(s.body.fr, s.body.en)}</p>
                </Reveal>
                {d && (
                  <ul className="mt-8 max-w-[52ch] border-t border-line">
                    {(locale === 'en' ? d.en : d.fr).map((line) => (
                      <li key={line} className="flex gap-4 border-b border-line py-3 text-ink">
                        <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-teal" />
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        )
      })}

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <h2 className="display text-[clamp(2rem,4vw,3.25rem)] text-ink lg:col-span-4">{t('Questions fréquentes', 'Frequently asked questions')}</h2>
          <div className="border-t-2 border-ink lg:col-span-8">
            {FAQ.map((f) => (
              <details key={f.q.fr} className="group border-b border-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {t(f.q.fr, f.q.en)}
                  <Plus size={20} className="shrink-0 text-muted transition-transform group-open:rotate-45" />
                </summary>
                <p className="max-w-[60ch] pb-6 leading-relaxed text-muted">{t(f.a.fr, f.a.en)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
