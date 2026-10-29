'use client'

import Link from 'next/link'
import { useT } from '@/lib/i18n/LocaleContext'
import { PHOTO, type Range } from '@/lib/content'
import { Reveal } from '@/components/motion/Reveal'
import { IndexIntro } from '@/components/site/IndexIntro'
import { ProductRows } from '@/components/site/ProductRows'
import { CtaBand } from '@/components/site/CtaBand'

export function SpecialtiesPage({ ranges }: { ranges: Range[] }) {
  const t = useT()
  return (
    <>
      <IndexIntro
        trail={[{ label: { fr: 'Spécialités', en: 'Specialties' } }]}
        title={{ fr: 'Spécialités', en: 'Specialties' }}
        lead={{
          fr: `${ranges.length} domaines cliniques, des fabricants sélectionnés pour chacun, et la même équipe pour l’installation, la formation et le suivi.`,
          en: `${ranges.length} clinical fields, carefully selected manufacturers for each, and the same team for installation, training and follow-up.`,
        }}
        image={PHOTO.salleVide}
        imageAlt={t('Salle d’opération équipée, vue d’ensemble', 'Equipped operating room, wide view')}
        items={ranges.map((r) => ({
          label: t(r.name.fr, r.name.en),
          meta: `${r.products.length} ${t(r.products.length > 1 ? 'produits' : 'produit', r.products.length > 1 ? 'products' : 'product')}`,
          href: `#${r.slug}`,
          image: r.image,
        }))}
      />

      {ranges.map((r, i) => {
        const flip = i % 2 === 1
        return (
          <section key={r.slug} id={r.slug} className="section scroll-mt-20 border-b border-line">
            <div className="wrap grid gap-12 lg:grid-cols-12">
              <Reveal className={`lg:col-span-6 ${flip ? 'lg:order-2 lg:col-start-7' : ''}`}>
                {r.image && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={r.image} alt="" className="aspect-[5/4] w-full object-cover" />
                )}
              </Reveal>
              <div className={`lg:col-span-5 ${flip ? 'lg:order-1' : 'lg:col-start-8'}`}>
                <Reveal>
                  <h2 className="display text-[clamp(2rem,4vw,3.25rem)] text-ink">{t(r.name.fr, r.name.en)}</h2>
                  <p className="mt-6 text-lg leading-relaxed text-muted">{t(r.body.fr, r.body.en)}</p>
                </Reveal>
                {r.products.length > 0 && (
                  <Reveal delay={0.08} className="mt-10">
                    <h3 className="mb-3 text-sm font-semibold text-ink">{t('Dans cette gamme', 'In this range')}</h3>
                    <ProductRows products={r.products} compact />
                  </Reveal>
                )}
                <Link href={`/gammes/${r.slug}`} className="link-rule mt-8 inline-block font-semibold text-ink">
                  {t('Page de la gamme', 'Range page')}
                </Link>
              </div>
            </div>
          </section>
        )
      })}

      {/* Gammes à venir : annoncées sans être nommées tant qu'elles ne sont pas signées. */}
      <section className="section">
        <div className="wrap grid gap-8 lg:grid-cols-12">
          <h2 className="display text-[clamp(1.8rem,3.6vw,2.75rem)] text-ink lg:col-span-6">
            {t('De nouvelles gammes après MEDICA 2026.', 'New ranges after MEDICA 2026.')}
          </h2>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-relaxed text-muted">
              {t(
                'Deux à trois gammes supplémentaires sont en préparation. Elles apparaîtront ici dès la signature avec les fabricants. Vous cherchez un équipement absent de cette liste ? Dites-le-nous : c’est aussi ainsi que nous choisissons nos prochaines marques.',
                'Two to three additional ranges are being prepared. They will appear here as soon as agreements are signed. Looking for equipment not on this list? Tell us: that is also how we choose our next brands.'
              )}
            </p>
            <Link href="/contact" className="link-rule mt-6 inline-block font-semibold text-ink">{t('Signaler un besoin', 'Tell us what you need')}</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}

