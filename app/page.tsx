'use client'

import { useEffect, useState } from 'react'
import { CartProvider } from '@/lib/cart'
import type { Product } from '@/lib/data'
import { CartDrawer } from '@/components/cart-drawer'
import { CustomizeModal } from '@/components/customize-modal'
import { Features } from '@/components/features'
import { DeliveryContact } from '@/components/delivery-contact'
import { Hero } from '@/components/hero'
import { Menu } from '@/components/menu'
import { SiteHeader } from '@/components/site-header'
import { ServiceModal } from '@/components/service-modal'
import { RevealEffects } from '@/components/reveal-effects'
import { SearchModal } from '@/components/search-modal'

function Storefront() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [serviceOpen, setServiceOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const locked = Boolean(selectedProduct) || cartOpen || serviceOpen || searchOpen
    document.body.classList.toggle('scroll-locked', locked)
    return () => document.body.classList.remove('scroll-locked')
  }, [selectedProduct, cartOpen, serviceOpen, searchOpen])

  return (
    <>
      <SiteHeader onOpenCart={() => setCartOpen(true)} onOpenSearch={() => setSearchOpen(true)} />
      <main>
        <Hero onOpenService={() => setServiceOpen(true)} />
        <Menu onSelect={setSelectedProduct} />
        <DeliveryContact />
        <Features />
      </main>
      <footer className="border-t border-white/10 bg-[#260d24] px-4 py-7 text-center text-sm text-white/55">
        <p className="font-serif text-lg font-bold text-white">F&amp;G Açaiteria &amp; Cia</p>
        <p className="mt-1">Rua Regina, 102 — Ariston, Carapicuíba · Todos os dias, 13h às 23h</p>
        <p className="mt-4 border-t border-white/10 pt-4 text-xs text-white/40">© {new Date().getFullYear()} F&amp;G Açaiteria &amp; Cia. Todos os direitos reservados.</p>
      </footer>
      <CustomizeModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <ServiceModal open={serviceOpen} onClose={() => setServiceOpen(false)} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} onSelect={(product) => { setSearchOpen(false); setSelectedProduct(product) }} />
      <RevealEffects />
    </>
  )
}

export default function Page() {
  return <CartProvider><Storefront /></CartProvider>
}
