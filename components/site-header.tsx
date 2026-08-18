'use client'

import { Bike, CupSoda, Home, MapPin, Menu, Search, ShoppingCart, UtensilsCrossed, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '@/lib/cart'
import { ThemeToggle } from '@/components/theme-toggle'

const NAV = [
  { label: 'Início', href: '#inicio', icon: Home },
  { label: 'Cardápio', href: '#cardapio', icon: UtensilsCrossed },
  { label: 'Monte', href: '#combos', icon: CupSoda },
  { label: 'Entrega', href: '#entrega', icon: Bike },
]

const DESKTOP_NAV = [
  { label: 'Início', href: '#inicio' },
  { label: 'Cardápio', href: '#cardapio' },
  { label: 'Monte seu copo', href: '#cardapio' },
  { label: 'Combos', href: '#combos' },
  { label: 'Entrega', href: '#entrega' },
]

export function SiteHeader({ onOpenCart, onOpenSearch }: { onOpenCart: () => void; onOpenSearch: () => void }) {
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [desktopActive, setDesktopActive] = useState(0)

  useEffect(() => {
    const updateDesktopActive = () => {
      const marker = window.scrollY + 160
      const sections = [
        { selector: '#inicio', index: 0 },
        { selector: '#cardapio', index: 1 },
        { selector: '#combos', index: 3 },
        { selector: '#entrega', index: 4 },
      ]
      let current = 0
      sections.forEach(({ selector, index }) => {
        const section = document.querySelector(selector) as HTMLElement | null
        if (section && section.offsetTop <= marker) current = index
      })
      setDesktopActive(current)
    }
    updateDesktopActive()
    window.addEventListener('scroll', updateDesktopActive, { passive: true })
    window.addEventListener('resize', updateDesktopActive)
    return () => {
      window.removeEventListener('scroll', updateDesktopActive)
      window.removeEventListener('resize', updateDesktopActive)
    }
  }, [])

  return (
    <header className="site-header sticky top-0 z-40 bg-[#210b20] text-white shadow-lg shadow-black/10">
      <div className="mx-auto flex h-[60px] max-w-7xl items-center gap-3 px-3 sm:h-[68px] sm:px-4 lg:h-[76px] lg:gap-5 lg:px-8">
        <a href="#inicio" className="flex shrink-0 items-center gap-2 sm:gap-3" aria-label="F&G Açaí — início">
          <span className="size-9 overflow-hidden rounded-full border border-[#c39a55]/60 bg-[#32122f] sm:size-11 lg:size-12"><img src="/images/logo.webp" alt="" width="48" height="48" decoding="async" className="size-full object-cover" /></span>
          <span className="leading-tight"><strong className="block font-serif text-sm sm:text-base lg:text-lg">F&amp;G Açaí</strong><small className="text-[9px] text-white/65 sm:text-[11px] lg:text-xs">Carapicuíba</small></span>
        </a>

        <nav className="mx-auto hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
          {DESKTOP_NAV.map((item, index) => {
            const active = desktopActive === index
            return <a key={`${item.label}-${index}`} href={item.href} onClick={() => setDesktopActive(index)} aria-current={active ? 'page' : undefined} className={`relative px-3 py-2 text-sm font-medium transition after:absolute after:inset-x-3 after:-bottom-1 after:h-0.5 after:bg-[#e61d68] after:transition-transform ${active ? 'text-white after:scale-x-100' : 'text-white/75 after:scale-x-0 hover:text-white'}`}>{item.label}</a>
          })}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <span className="hidden items-center gap-2 rounded-full border border-white/15 px-3 py-2 text-xs text-white/80 md:flex"><MapPin className="size-4 text-[#ef3c7d]" /> Carapicuíba</span>
          <button type="button" onClick={onOpenSearch} className="hidden size-9 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white sm:grid lg:size-10" aria-label="Pesquisar no cardápio"><Search className="size-4 lg:size-5" /></button>
          <ThemeToggle />
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="grid size-9 place-items-center rounded-full text-white/80 transition hover:bg-white/10 lg:hidden" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen}>{menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}</button>
          <button type="button" onClick={onOpenCart} aria-label="Abrir carrinho" className="relative grid size-9 place-items-center rounded-full bg-[#e61d68] text-white shadow-lg shadow-[#e61d68]/25 transition hover:-translate-y-0.5 lg:size-10"><ShoppingCart className="size-4 lg:size-5" />{count > 0 && <span className="absolute -right-1 -top-1 grid min-w-4 place-items-center rounded-full border-2 border-[#210b20] bg-white px-1 text-[9px] font-bold text-[#e61d68]">{count}</span>}</button>
        </div>
      </div>
      {menuOpen && (
        <nav className="mobile-dock absolute inset-x-3 top-[66px] flex items-end justify-around rounded-2xl border border-white/10 bg-[#170d1b]/95 px-1.5 pb-2 pt-2 text-white shadow-[0_16px_45px_rgba(0,0,0,.35)] backdrop-blur-xl sm:inset-x-6 sm:top-[74px] lg:hidden" aria-label="Menu móvel">
          {NAV.map((item, index) => {
            const Icon = item.icon
            const active = index === activeIndex
            return <a key={`${item.label}-mobile-${index}`} href={item.href} onClick={() => { setActiveIndex(index); setMenuOpen(false) }} aria-current={active ? 'page' : undefined} className={`group relative z-10 flex min-w-0 flex-1 flex-col items-center gap-1 rounded-xl px-1 py-1.5 text-[9px] sm:text-[10px] ${active ? 'text-white' : 'text-white/70 hover:text-white'}`}><span className={`grid size-8 place-items-center rounded-full group-hover:bg-white/10 ${active ? '-mt-5 size-11 border-4 border-[#170d1b] bg-white text-[#35132f] shadow-lg' : ''}`}><Icon className="size-4" /></span>{item.label}</a>
          })}
        </nav>
      )}
    </header>
  )
}
