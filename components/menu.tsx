'use client'

import { CATEGORIES, PRODUCTS, type Product } from '@/lib/data'
import { ProductCard } from '@/components/product-card'

export function Menu({ onSelect }: { onSelect: (product: Product) => void }) {
  return (
    <section id="cardapio" className="menu-section scroll-mt-24 bg-[#fffaf4] px-3 py-8 sm:px-4 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-center gap-2.5 text-center sm:gap-4">
          <span className="h-px w-8 bg-[#b79055]/65 sm:w-20" />
          <div>
            <h2 className="font-serif text-xl font-extrabold tracking-[-0.035em] text-[#2b1128] sm:text-4xl">Escolha seu favorito</h2>
            <span className="mx-auto mt-1.5 block h-0.5 w-12 rounded-full bg-[#65154f] sm:mt-2 sm:h-1 sm:w-16" />
          </div>
          <span className="h-px w-8 bg-[#b79055]/65 sm:w-20" />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-4 md:grid-cols-4">
          {PRODUCTS.slice(0, 4).map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelect}
              priority={index === 0}
            />
          ))}
        </div>

        <div id="combos" className="scroll-mt-24 pt-9 sm:pt-14">
          {CATEGORIES.slice(1).map((category) => {
            const items = PRODUCTS.filter((product) => product.category === category.id)
            return (
              <div key={category.id} className="mb-8 sm:mb-12">
                <div className="mb-3 flex items-center gap-3 sm:mb-5 sm:gap-4">
                  <h3 className="font-serif text-lg font-black text-[#2b1128] sm:text-2xl">{category.label}</h3>
                  <span className="h-px flex-1 bg-[#3a1633]/10" />
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {items.map((product) => <ProductCard key={product.id} product={product} onSelect={onSelect} />)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
