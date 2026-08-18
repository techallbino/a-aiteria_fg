'use client'

import { Plus } from 'lucide-react'
import { formatBRL } from '@/lib/format'
import type { Product } from '@/lib/data'

export function ProductCard({
  product,
  onSelect,
}: {
  product: Product
  onSelect: (product: Product) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(product)}
      className="product-card group flex flex-col overflow-hidden rounded-lg border border-[#3a1633]/10 bg-white text-left shadow-[0_8px_30px_rgba(55,20,47,0.06)] transition-all hover:-translate-y-1 hover:border-[#e61d68]/35 hover:shadow-xl sm:rounded-xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f7ede2]">
        <img
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width="800"
          height="600"
          className="size-full object-cover object-center transition-transform duration-500 group-hover:scale-105 dark:brightness-[0.82]"
        />
        {product.badge && (
          <span className="absolute left-2 top-2 rounded-full bg-[#e61d68] px-2 py-0.5 text-[9px] font-bold text-white sm:left-3 sm:top-3 sm:px-2.5 sm:py-1 sm:text-xs">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-4">
        <h3 className="font-serif text-sm font-bold leading-tight text-[#2b1128] sm:text-lg">{product.name}</h3>
        <p className="mt-1 line-clamp-2 flex-1 text-[10px] leading-relaxed text-[#796774] sm:text-sm">
          {product.description}
        </p>
        <div className="mt-2.5 flex items-center justify-between gap-1 sm:mt-4">
          <span className="text-xs font-bold text-[#e61d68] sm:text-base">{formatBRL(product.price)}</span>
          <span className="inline-flex items-center gap-1 rounded-md bg-[#4a133d] px-2 py-1.5 text-[10px] font-semibold text-white transition-colors group-hover:bg-[#e61d68] sm:gap-1.5 sm:px-3.5 sm:py-2 sm:text-sm">
            <Plus className="size-3 sm:size-4" /> Adicionar
          </span>
        </div>
      </div>
    </button>
  )
}
