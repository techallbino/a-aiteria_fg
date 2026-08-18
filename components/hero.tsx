'use client'

import { Bike, BookOpen, Leaf, ShoppingBag, Sparkles } from 'lucide-react'
import Image from 'next/image'

export function Hero({ onOpenService }: { onOpenService: () => void }) {
  return (
    <section id="inicio" className="hero-section relative scroll-mt-24 overflow-hidden bg-[#f6eddf]">
      <div className="mx-auto grid max-w-7xl lg:min-h-[520px] lg:grid-cols-[0.82fr_1.18fr]">
        <div className="hero-copy relative z-10 order-1 flex items-center px-5 pb-5 pt-7 sm:px-7 sm:pb-7 lg:px-10 lg:py-14">
          <div className="max-w-lg animate-fade-up">
            <h1 className="font-serif text-[2.55rem] font-extrabold leading-[0.94] tracking-[-0.055em] text-[#2b1128] sm:text-5xl lg:text-[clamp(3rem,5.6vw,5.25rem)]">
              Seu açaí,<br /><span className="text-[#e61d68]">do seu jeito.</span>
            </h1>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-[#654f60] sm:mt-5 sm:text-sm lg:mt-6 lg:text-base">Monte seu copo perfeito, escolha seus complementos favoritos e receba rapidinho.</p>
            <div className="mt-4 flex gap-2 sm:mt-6 sm:gap-3">
              <a href="#cardapio" className="inline-flex items-center gap-1.5 rounded-md bg-[#e61d68] px-3.5 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#e61d68]/20 transition hover:-translate-y-0.5 sm:px-5 sm:py-3 sm:text-sm"><ShoppingBag className="size-3.5 sm:size-4" /> Montar meu açaí</a>
              <button type="button" onClick={onOpenService} className="inline-flex items-center gap-1.5 rounded-md border border-[#5a3151]/25 bg-white/70 px-3.5 py-2.5 text-xs font-bold text-[#401538] transition hover:bg-white sm:px-5 sm:py-3 sm:text-sm"><BookOpen className="size-3.5 sm:size-4" /> Nosso serviço</button>
            </div>
            <div className="mt-5 grid max-w-md grid-cols-3 gap-2 border-t border-[#3d1735]/10 pt-4 text-center sm:mt-8 sm:gap-3 sm:pt-5 sm:text-left lg:mt-9 lg:pt-6">
              <span className="text-[10px] leading-tight text-[#705a68] sm:text-xs"><Bike className="mx-auto mb-1.5 size-5 text-[#4d173e] dark:text-white sm:mx-0 sm:mb-2 sm:size-6" strokeWidth={1.9} />Entrega rápida</span>
              <span className="text-[10px] leading-tight text-[#705a68] sm:text-xs"><Leaf className="mx-auto mb-1.5 size-5 text-[#4d173e] dark:text-white sm:mx-0 sm:mb-2 sm:size-6" strokeWidth={1.9} />Ingredientes frescos</span>
              <span className="text-[10px] leading-tight text-[#705a68] sm:text-xs"><Sparkles className="mx-auto mb-1.5 size-5 text-[#4d173e] dark:text-white sm:mx-0 sm:mb-2 sm:size-6" strokeWidth={1.9} />Monte como quiser</span>
            </div>
          </div>
        </div>

        <div className="hero-visual relative order-2 h-[260px] overflow-hidden bg-[#f6eddf] sm:h-[340px] lg:-ml-24 lg:h-auto lg:min-h-[520px]">
          <Image
            src="/images/hero-acai-unificado.webp"
            alt="Dois copos de açaí F&G com frutas e complementos"
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 800px"
            quality={76}
            className="object-contain object-right-bottom drop-shadow-[0_22px_32px_rgba(43,17,40,.18)]"
          />
        </div>
      </div>
    </section>
  )
}
