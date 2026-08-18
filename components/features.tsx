'use client'

import { Bike, Leaf, Sparkles } from 'lucide-react'

const ITEMS = [
  { icon: Bike, title: 'Entrega rápida', text: 'Receba seu açaí rapidinho.' },
  { icon: Leaf, title: 'Ingredientes frescos', text: 'Selecionamos o melhor para você.' },
  { icon: Sparkles, title: 'Monte como quiser', text: 'Do seu jeito, com seus favoritos.' },
]

export function Features() {
  return (
    <section id="beneficios" className="overflow-hidden bg-[#260d24] text-white">
      <div className="mx-auto grid max-w-7xl divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
        {ITEMS.map((item) => (
          <article key={item.title} className="flex items-center gap-3 px-5 py-5 sm:gap-4 sm:px-7 sm:py-8">
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-[#e61d68]/35 text-[#e83c7b] sm:size-12"><item.icon className="size-5 sm:size-6" /></span>
            <div><h3 className="font-serif text-sm font-bold sm:text-lg">{item.title}</h3><p className="mt-0.5 text-xs text-white/55 sm:mt-1 sm:text-sm">{item.text}</p></div>
          </article>
        ))}
      </div>
    </section>
  )
}
