'use client'

import Link from 'next/link'
import type { Post } from '@/lib/content'
import { useLocale, useT } from '@/lib/i18n/LocaleContext'
import { Reveal } from '@/components/motion/Reveal'
import { CtaBand } from '@/components/site/CtaBand'
import { formatDate } from './PostList'

export function NewsList({ posts }: { posts: Post[] }) {
  const t = useT()
  const { locale } = useLocale()
  const [first, ...rest] = posts
  return (
    <>
      {/* Tête de page en « une » de journal : manchette, puis l'article le plus récent en grand. */}
      <section className="border-b border-line">
        <div className="wrap pb-6 pt-6 sm:pt-8">
          <nav aria-label={t('Fil d’Ariane', 'Breadcrumb')} className="flex items-center gap-2 text-[13px] text-muted">
            <Link href="/" className="hover:text-ink">Medixis</Link>
            <span aria-hidden className="opacity-40">/</span>
            <span className="text-ink">{t('Actualités', 'News')}</span>
          </nav>

          <div className="mt-4 flex items-end justify-between gap-6 border-b border-ink pb-3">
            <h1 className="display text-[clamp(1.9rem,4.5vw,3.25rem)] leading-none text-ink">{t('Actualités', 'News')}</h1>
            <p className="pb-1 text-right text-[13px] text-muted">
              Medixis · Casablanca
              <span className="hidden sm:inline"> · {posts.length} {posts.length > 1 ? t('articles', 'articles') : t('article', 'article')}</span>
            </p>
          </div>
          <div className="mt-[3px] border-t-2 border-ink" />

          {!first && <p className="mt-10 text-lg text-muted">{t('Aucune actualité pour le moment.', 'No news yet.')}</p>}

          {first && (
            <Reveal>
              <Link href={`/actualites/${first.slug}`} className="group mt-5 grid gap-4 lg:mt-6 lg:grid-cols-12 lg:gap-10">
                <div className="overflow-hidden lg:col-span-7">
                  {first.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={first.image} alt="" className="h-[22svh] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] lg:h-[clamp(14rem,calc(100svh-24rem),30rem)]" />
                  )}
                </div>
                <div className="flex flex-col lg:col-span-5">
                  <p className="flex items-baseline gap-3 text-sm">
                    <span className="font-semibold text-ink">{t('À la une', 'Top story')}</span>
                    <time dateTime={first.date} className="ref text-teal-ink">{formatDate(first.date, locale)}</time>
                  </p>
                  <h2 className="display mt-2 lg:mt-3 text-[clamp(1.7rem,min(3.6vw,6svh),3rem)] text-ink decoration-2 underline-offset-8 group-hover:underline">{t(first.title.fr, first.title.en)}</h2>
                  <p className="mt-3 line-clamp-2 lg:mt-4 sm:line-clamp-3 text-[clamp(1rem,2.2svh,1.125rem)] leading-relaxed text-muted lg:line-clamp-4">{t(first.excerpt.fr, first.excerpt.en)}</p>
                  <span className="link-rule mt-3 self-start font-semibold text-ink lg:mt-auto">{t('Lire l’article', 'Read the article')}</span>
                </div>
              </Link>
            </Reveal>
          )}

          {rest.length > 0 && (
            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-3 text-[14px] lg:mt-6 lg:pt-4 lg:text-[15px]">
              <span className="text-muted">{t('Aussi :', 'Also:')}</span>
              {rest.slice(0, 3).map((p, i) => (
                <span key={p.slug} className="flex items-baseline gap-3">
                  {i > 0 && <span aria-hidden className="text-line-strong/40">·</span>}
                  <Link href={`/actualites/${p.slug}`} className="text-ink hover:underline">{t(p.title.fr, p.title.en)}</Link>
                </span>
              ))}
            </p>
          )}
        </div>
      </section>

      <section className="section pt-14">
        <div className="wrap">
          {rest.length > 0 && (
            <ul className="border-t-2 border-ink">
              {rest.map((p) => (
                <li key={p.slug}>
                  <Link href={`/actualites/${p.slug}`} className="group grid gap-4 border-b border-line py-8 sm:grid-cols-12 sm:items-center">
                    <time dateTime={p.date} className="ref text-sm text-teal-ink sm:col-span-2">{formatDate(p.date, locale)}</time>
                    <div className="sm:col-span-7">
                      <h3 className="display-sm text-2xl text-ink decoration-1 underline-offset-4 group-hover:underline">{t(p.title.fr, p.title.en)}</h3>
                      <p className="mt-2 text-muted">{t(p.excerpt.fr, p.excerpt.en)}</p>
                    </div>
                    {p.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.image} alt="" className="hidden aspect-[4/3] w-full object-cover sm:col-span-3 sm:block" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
