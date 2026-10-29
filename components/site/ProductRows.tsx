'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { useT } from '@/lib/i18n/LocaleContext'
import type { Product } from '@/lib/content'

/** Liste de produits en lignes de catalogue (miniature, nom, marque, flèche). */
export function ProductRows({ products, compact }: { products: Product[]; compact?: boolean }) {
  const t = useT()
  return (
    <ul className="border-t border-line-strong/25">
      {products.map((p) => (
        <li key={p.slug}>
          <Link href={`/produits/${p.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-line py-4 transition-colors hover:bg-paper-alt">
            {!compact && p.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.image} alt="" className="h-16 w-20 object-cover sm:h-20 sm:w-28" />
            )}
            <span className={compact ? 'col-span-2' : ''}>
              <span className="block font-semibold text-ink">{p.name}</span>
              <span className="mt-0.5 block text-sm text-muted">{p.brand ?? t('Marque en cours de confirmation', 'Brand being confirmed')}</span>
            </span>
            <ArrowUpRight size={20} className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
