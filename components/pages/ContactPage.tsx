'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ArrowRight } from 'lucide-react'
import { useT } from '@/lib/i18n/LocaleContext'
import { CONTACT, whatsappHref } from '@/lib/constants'
import Link from 'next/link'
import { Reveal } from '@/components/motion/Reveal'
import { SUBJECTS } from '@/lib/contact-subjects'
import { sendContactRequest } from '@/app/(marketing)/contact-actions'


interface FormValues {
  subject: string
  name: string
  email: string
  company?: string
  phone?: string
  message: string
  // Champ piège : masqué à l'écran, seuls les robots le remplissent.
  refInterne?: string
}

// Portes d'entrée de la tête de page (clés de SUBJECTS).
const DOORS = [
  { key: 'devis', title: { fr: 'Demander un devis', en: 'Request a quote' }, body: { fr: 'Équipement, quantités, établissement : un devis détaillé, consommables compris.', en: 'Equipment, quantities, facility: a detailed quote, consumables included.' } },
  { key: 'fiche', title: { fr: 'Recevoir une fiche technique', en: 'Get a data sheet' }, body: { fr: 'La documentation complète d’un produit du catalogue.', en: 'Full documentation for a catalogue product.' } },
  { key: 'partenariat', title: { fr: 'Devenir partenaire fabricant', en: 'Become a manufacturer partner' }, body: { fr: 'Vous fabriquez des dispositifs médicaux et cherchez un distributeur au Maroc.', en: 'You make medical devices and are looking for a distributor in Morocco.' } },
] as const

type Status = 'idle' | 'sending' | 'sent' | 'error'

const field = 'mt-2 w-full border-0 border-b border-line-strong/40 bg-transparent px-0 py-2.5 text-base text-ink outline-none transition-colors placeholder:text-muted/60 focus:border-navy'

/** Page contact. `subject` et `message` peuvent être pré-remplis depuis une fiche produit ou une gamme. */
export function ContactPage({ subject, message }: { subject: string; message: string }) {
  const t = useT()
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({ defaultValues: { subject, message } })
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(v: FormValues) {
    setStatus('sending')
    const s = SUBJECTS.find((x) => x.key === v.subject)
    const result = await sendContactRequest({ ...v, message: `[${s?.fr ?? v.subject}]\n\n${v.message}` })
    if (result.ok) {
      setStatus('sent')
      reset({ subject: 'devis', message: '' })
    } else {
      setStatus('error')
    }
  }

  return (
    <>
      {/* Tête de page : trois portes d'entrée selon le besoin ; chacune choisit l'objet du formulaire. */}
      <section className="border-b border-line">
        <div className="wrap pb-10 pt-6 sm:pt-8 lg:pb-14">
          <nav aria-label={t('Fil d’Ariane', 'Breadcrumb')} className="flex items-center gap-2 text-[13px] text-muted">
            <Link href="/" className="hover:text-ink">Medixis</Link>
            <span aria-hidden className="opacity-40">/</span>
            <span className="text-ink">Contact</span>
          </nav>

          <Reveal className="mt-6 grid gap-4 sm:mt-10 lg:grid-cols-12 lg:items-end">
            <h1 className="display text-[clamp(2rem,5vw,4rem)] text-ink lg:col-span-8">{t('Parlons de votre projet', 'Tell us about your project')}</h1>
            <p className="text-[15px] leading-relaxed text-muted lg:col-span-4 lg:text-right">
              {t('Réponse sous 24 heures ouvrables.', 'Reply within 24 business hours.')}
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <ol className="mt-6 grid border-t-2 border-ink sm:mt-10 sm:grid-cols-3">
              {DOORS.map((d, i) => (
                <li key={d.key} className={`border-b border-line sm:border-b-0 ${i > 0 ? 'sm:border-l' : ''}`}>
                  <button
                    type="button"
                    onClick={() => {
                      setValue('subject', d.key)
                      document.getElementById('formulaire')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="group flex h-full w-full items-start gap-4 py-4 text-left transition-colors hover:bg-paper-alt sm:flex-col sm:gap-0 sm:px-6 sm:py-7 sm:first:pl-0 lg:py-9"
                  >
                    <span className="pt-1 text-sm tabular-nums text-teal-ink sm:pt-0">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1">
                      <span className="display-sm block text-[clamp(1.25rem,2.2vw,1.75rem)] leading-tight text-ink sm:mt-6">{t(d.title.fr, d.title.en)}</span>
                      <span className="mt-2 hidden text-[15px] leading-relaxed text-muted sm:block">{t(d.body.fr, d.body.en)}</span>
                    </span>
                    <ArrowRight aria-hidden className="mt-1 size-5 shrink-0 text-ink transition-transform group-hover:translate-x-1 sm:mt-6" />
                  </button>
                </li>
              ))}
            </ol>
          </Reveal>

          <p className="mt-5 text-[15px] text-muted">
            {t('Ou appelez le', 'Or call')}{' '}
            <a href={`tel:${CONTACT.phone}`} className="font-semibold tabular-nums text-ink hover:text-navy">{CONTACT.phoneDisplay}</a>
            <span aria-hidden className="mx-2 opacity-40">·</span>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="link-rule font-semibold text-ink">WhatsApp</a>
          </p>
        </div>
      </section>

      <section className="section pt-14">
        <div className="wrap grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <dl className="border-t-2 border-ink">
              <div className="border-b border-line py-5">
                <dt className="text-sm text-muted">{t('Téléphone', 'Phone')}</dt>
                <dd className="mt-1"><a href={`tel:${CONTACT.phone}`} className="ref display-sm text-2xl text-ink hover:text-navy">{CONTACT.phoneDisplay}</a></dd>
              </div>
              <div className="border-b border-line py-5">
                <dt className="text-sm text-muted">WhatsApp</dt>
                <dd className="mt-1"><a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="link-rule font-semibold text-ink">{t('Écrire sur WhatsApp', 'Message on WhatsApp')}</a></dd>
              </div>
              <div className="border-b border-line py-5">
                <dt className="text-sm text-muted">{t('Siège', 'Head office')}</dt>
                <dd className="mt-1 font-semibold text-ink">{t(CONTACT.cityFr, CONTACT.cityEn)}</dd>
              </div>
            </dl>
          </aside>

          <form id="formulaire" onSubmit={handleSubmit(onSubmit)} noValidate className="relative scroll-mt-24 lg:col-span-7 lg:col-start-6">
            <fieldset>
              <legend className="text-sm font-medium text-ink">{t('Objet de votre demande', 'Subject of your request')}</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {SUBJECTS.map((s) => (
                  <label key={s.key} className="cursor-pointer">
                    <input type="radio" value={s.key} {...register('subject')} className="peer sr-only" />
                    <span className="block border border-line px-4 py-2.5 text-sm text-muted transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-paper peer-focus-visible:outline-2 peer-focus-visible:outline-teal-ink hover:border-ink hover:text-ink">
                      {t(s.fr, s.en)}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-ink">{t('Nom et prénom', 'Full name')}</label>
                <input id="name" autoComplete="name" aria-invalid={!!errors.name} {...register('name', { required: true })} className={field} />
                {errors.name && <p className="mt-1.5 text-sm text-red-700">{t('Indiquez votre nom.', 'Please enter your name.')}</p>}
              </div>
              <div>
                <label htmlFor="email" className="text-sm font-medium text-ink">Email</label>
                <input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register('email', { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/ })} className={field} />
                {errors.email && <p className="mt-1.5 text-sm text-red-700">{t('Indiquez une adresse email valide.', 'Please enter a valid email.')}</p>}
              </div>
              <div>
                <label htmlFor="company" className="text-sm font-medium text-ink">{t('Établissement ou société', 'Facility or company')}</label>
                <input id="company" autoComplete="organization" {...register('company')} className={field} />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm font-medium text-ink">{t('Téléphone', 'Phone')}</label>
                <input id="phone" type="tel" autoComplete="tel" {...register('phone')} className={field} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="text-sm font-medium text-ink">{t('Votre besoin', 'Your need')}</label>
                <textarea
                  id="message"
                  rows={5}
                  aria-invalid={!!errors.message}
                  {...register('message', { required: true, minLength: 5 })}
                  placeholder={t('Équipement recherché, quantité, délai souhaité…', 'Equipment needed, quantity, expected timeline…')}
                  className={`${field} resize-y`}
                />
                {errors.message && <p className="mt-1.5 text-sm text-red-700">{t('Décrivez votre besoin en quelques mots.', 'Describe your need in a few words.')}</p>}
              </div>
            </div>

            <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
              <label htmlFor="ref-interne">Ne pas remplir</label>
              <input id="ref-interne" tabIndex={-1} autoComplete="off" {...register('refInterne')} />
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <button
                type="submit"
                disabled={status === 'sending' || isSubmitting}
                className="group inline-flex items-center gap-3 bg-navy px-7 py-4 font-semibold text-paper transition-colors hover:bg-navy-deep disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? t('Envoi en cours…', 'Sending…') : t('Envoyer la demande', 'Send request')}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-sm text-muted">{t('Réponse sous 24 heures ouvrables.', 'Reply within 24 business hours.')}</p>
            </div>

            {status === 'sent' && (
              <p role="status" className="mt-8 border-l-0 bg-teal-soft px-5 py-4 font-medium text-navy-deep">
                {t('Demande envoyée. Nous revenons vers vous sous 24 heures ouvrables.', 'Request sent. We will get back to you within 24 business hours.')}
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="mt-8 bg-red-50 px-5 py-4 font-medium text-red-800">
                {t(`L’envoi a échoué. Appelez-nous au ${CONTACT.phoneDisplay} ou réessayez dans un instant.`, `Sending failed. Call us on ${CONTACT.phoneDisplay} or try again in a moment.`)}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  )
}
