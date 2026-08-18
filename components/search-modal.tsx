'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { PRODUCTS, type Product } from '@/lib/data'
import { formatBRL } from '@/lib/format'

type SearchModalProps = {
  open: boolean
  onClose: () => void
  onSelect: (product: Product) => void
}

const CATEGORY_LABELS: Record<Product['category'], string> = {
  acai: 'Açaí',
  casal: 'Combo casal',
  familia: 'Combo família',
  mistos: 'Combo misto',
}

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export function SearchModal({ open, onClose, onSelect }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    setQuery('')
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50)
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  const results = useMemo(() => {
    const term = normalize(query.trim())
    if (!term) return PRODUCTS.slice(0, 6)
    return PRODUCTS.filter((product) => normalize(`${product.name} ${product.description} ${CATEGORY_LABELS[product.category]}`).includes(term))
  }, [query])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-[#130913]/75 px-3 pt-16 backdrop-blur-sm sm:pt-24" role="dialog" aria-modal="true" aria-labelledby="search-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[#d9c9d5] bg-[#fffaf2] text-[#35132f] shadow-2xl dark:border-white/10 dark:bg-[#1f1020] dark:text-white">
        <div className="flex items-center gap-3 border-b border-[#e7dce4] p-4 dark:border-white/10 sm:p-5">
          <Search className="size-5 shrink-0 text-[#e61d68]" />
          <label id="search-title" className="sr-only" htmlFor="menu-search">Pesquisar no cardápio</label>
          <input ref={inputRef} id="menu-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Busque açaí, tamanho ou combo..." className="min-w-0 flex-1 bg-transparent text-base font-medium outline-none placeholder:text-[#765d70]/65 dark:placeholder:text-white/45" />
          <button type="button" onClick={onClose} aria-label="Fechar pesquisa" className="grid size-9 shrink-0 place-items-center rounded-full bg-[#35132f] text-white transition hover:bg-[#e61d68] dark:bg-white/10 dark:hover:bg-[#e61d68]"><X className="size-4" /></button>
        </div>

        <div className="max-h-[65vh] overflow-y-auto p-3 sm:p-4">
          <p className="px-2 pb-3 text-xs font-semibold uppercase tracking-[.14em] text-[#8c7485] dark:text-white/45">{query.trim() ? `${results.length} resultado${results.length === 1 ? '' : 's'}` : 'Sugestões do cardápio'}</p>
          {results.length ? (
            <div className="grid gap-2 sm:grid-cols-2">
              {results.map((product) => (
                <button key={product.id} type="button" onClick={() => onSelect(product)} className="group flex items-center gap-3 rounded-2xl border border-[#eadfe7] bg-white p-2.5 text-left transition hover:-translate-y-0.5 hover:border-[#e61d68]/45 hover:shadow-md dark:border-white/10 dark:bg-white/[.04] dark:hover:border-[#e61d68]/60">
                  <img src={product.image} alt="" width="72" height="72" loading="lazy" decoding="async" className="size-[68px] shrink-0 rounded-xl object-cover" />
                  <span className="min-w-0 flex-1">
                    <strong className="block truncate font-serif text-sm">{product.name}</strong>
                    <span className="mt-0.5 line-clamp-2 block text-xs text-[#765d70] dark:text-white/55">{product.description}</span>
                    <span className="mt-1.5 block text-sm font-extrabold text-[#e61d68]">{formatBRL(product.price)}</span>
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-12 text-center"><Search className="mx-auto mb-3 size-8 text-[#e61d68]/45" /><p className="font-semibold">Nenhum produto encontrado</p><p className="mt-1 text-sm text-[#765d70] dark:text-white/50">Tente pesquisar por “300ml”, “casal” ou “família”.</p></div>
          )}
        </div>
      </section>
    </div>
  )
}
