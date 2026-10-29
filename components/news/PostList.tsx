'use client'

import Link from 'next/link'
import { useLocale, useT } from '@/lib/i18n/LocaleContext'
import type { Post } from '@/lib/content'
import { Reveal } from '@/components/motion/Reveal'

export function formatDate(date: string, locale: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(locale === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

/** Trois colonnes sans cadre : image, date, titre. */
export function PostList({ posts }: { posts: Post[] }) {
  const t = useT()
  const { locale } = useLocale()
  return (
    <div className="grid gap-x-8 gap-y-14 md:grid-cols-3">
      {posts.map((p, i) => (
        <Reveal key={p.slug} delay={i * 0.06}>
          <Link href={`/actualites/${p.slug}`} className="group block">
            <div className="overflow-hidden">
              {p.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt="" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              )}
            </div>
            <time dateTime={p.date} className="ref mt-5 block text-sm text-teal-ink">{formatDate(p.date, locale)}</time>
            <h3 className="display-sm mt-2 text-xl text-ink decoration-1 underline-offset-4 group-hover:underline">{t(p.title.fr, p.title.en)}</h3>
            <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-muted">{t(p.excerpt.fr, p.excerpt.en)}</p>
          </Link>
        </Reveal>
      ))}
    </div>
  )
}
