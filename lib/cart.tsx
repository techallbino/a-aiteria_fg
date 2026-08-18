'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type SelectedOption = { id: string; name: string; price: number }

export type CupConfig = {
  size: string
  frutas: SelectedOption[]
  complementos: SelectedOption[]
  adicionais: SelectedOption[]
}

export type CartItem = {
  lineId: string
  productId: string
  name: string
  image: string
  basePrice: number
  cups: CupConfig[]
  unitPrice: number
  quantity: number
}

type CartContextValue = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'lineId' | 'quantity'>, quantity: number) => void
  updateQuantity: (lineId: string, quantity: number) => void
  removeItem: (lineId: string) => void
  clear: () => void
  count: number
  subtotal: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function computeUnitPrice(basePrice: number, cups: CupConfig[]): number {
  const extras = cups.reduce(
    (sum, cup) => sum + cup.adicionais.reduce((s, a) => s + a.price, 0),
    0,
  )
  return basePrice + extras
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem: CartContextValue['addItem'] = (item, quantity) => {
    setItems((prev) => [
      ...prev,
      {
        ...item,
        lineId:
          typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
            ? crypto.randomUUID()
            : `item-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        quantity: Math.max(1, quantity),
      },
    ])
  }

  const updateQuantity: CartContextValue['updateQuantity'] = (lineId, quantity) => {
    setItems((prev) =>
      prev
        .map((it) => (it.lineId === lineId ? { ...it, quantity } : it))
        .filter((it) => it.quantity > 0),
    )
  }

  const removeItem = (lineId: string) => setItems((prev) => prev.filter((it) => it.lineId !== lineId))
  const clear = () => setItems([])

  const { count, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, it) => {
        acc.count += it.quantity
        acc.subtotal += it.unitPrice * it.quantity
        return acc
      },
      { count: 0, subtotal: 0 },
    )
  }, [items])

  const value: CartContextValue = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clear,
    count,
    subtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider')
  return ctx
}
