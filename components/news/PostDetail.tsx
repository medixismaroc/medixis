'use client'

import Link from 'next/link'
import type { Post } from '@/lib/content'
import { useLocale, useT } from '@/lib/i18n/LocaleContext'
import { CtaBand } from '@/components/site/CtaBand'
import { PostList, formatDate } from './PostList'

export function PostDetail({ post: p, others }: { post: Post; others: Post[] }) {
  const t = useT()
  const { locale } = useLocale()
  const paragraphs = t(p.body.fr, p.body.en).split(/\n\s*\n/).filter(Boolean)
  return (
    <>
      <article>
        <header className="wrap pb-12 pt-10">
          <nav aria-label={t('Fil d’Ariane', 'Breadcrumb')} className="flex flex-wrap items-center gap-2 text-[13px] text-muted">
            <Link href="/" className="hover:text-ink">Medixis</Link>
            <span aria-hidden>/</span>
            <Link href="/actualites" className="hover:text-ink">{t('Actualités', 'News')}</Link>
          </nav>
          <div className="mt-10 max-w-4xl">
            <time dateTime={p.date} className="ref text-sm text-teal-ink">{formatDate(p.date, locale)}</time>
            <h1 className="display mt-4 text-[clamp(2.4rem,5.5vw,4.5rem)] text-ink">{t(p.title.fr, p.title.en)}</h1>
            <p className="mt-6 max-w-[60ch] text-xl leading-relaxed text-muted">{t(p.excerpt.fr, p.excerpt.en)}</p>
          </div>
        </header>

        {p.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.image} alt="" className="block h-[clamp(16rem,42vw,34rem)] w-full object-cover" />
        )}

        <div className="wrap grid gap-10 py-16 lg:grid-cols-12 lg:py-24">
          <div className="space-y-6 text-lg leading-[1.75] text-ink lg:col-span-7 lg:col-start-3">
            {paragraphs.map((para, i) => <p key={i} className="whitespace-pre-line">{para}</p>)}
            <p className="pt-4">
              <Link href="/contact" className="link-rule font-semibold">{t('Écrire à Medixis', 'Write to Medixis')}</Link>
            </p>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="border-t border-line pb-24 pt-16">
          <div className="wrap">
            <h2 className="display-sm mb-10 text-2xl text-ink">{t('À lire aussi', 'Read also')}</h2>
            <PostList posts={others} />
          </div>
        </section>
      )}

      <CtaBand />
    </>
  )
}
