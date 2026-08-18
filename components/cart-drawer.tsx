'use client'

import { useState } from 'react'
import { MapPin, Minus, Plus, Send, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '@/lib/cart'
import { STORE, WHATSAPP_NUMBER } from '@/lib/data'
import { formatBRL } from '@/lib/format'

type Freight = {
  logradouro: string
  bairro: string
  cidade: string
  uf: string
  distanceKm: number | null
  fee: number
}

export function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, subtotal, updateQuantity, removeItem } = useCart()
  const [cep, setCep] = useState('')
  const [number, setNumber] = useState('')
  const [freight, setFreight] = useState<Freight | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!open) return null

  const calculateFreight = async () => {
    const cleanCep = cep.replace(/\D/g, '')
    if (cleanCep.length !== 8) {
      setError('Digite um CEP válido com 8 números.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const response = await fetch(`/api/frete?cep=${cleanCep}`)
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Não foi possível calcular o frete.')
      setFreight(data)
    } catch (err) {
      setFreight(null)
      setError(err instanceof Error ? err.message : 'Não foi possível calcular o frete.')
    } finally {
      setLoading(false)
    }
  }

  const sendOrder = () => {
    if (!items.length || !freight) return
    const lines = items.flatMap((item, itemIndex) => {
      const header = `${itemIndex + 1}. *${item.quantity}x ${item.name}* — ${formatBRL(item.unitPrice * item.quantity)}`
      const cups = item.cups.map((cup, cupIndex) => {
        const parts = [
          `Fruta: ${cup.frutas.map((option) => option.name).join(', ')}`,
          `Complementos: ${cup.complementos.map((option) => option.name).join(', ')}`,
          cup.adicionais.length ? `Adicionais: ${cup.adicionais.map((option) => option.name).join(', ')}` : '',
        ].filter(Boolean)
        return `   Copo ${cupIndex + 1} (${cup.size}) — ${parts.join(' | ')}`
      })
      return [header, ...cups]
    })
    const total = subtotal + freight.fee
    const address = `${freight.logradouro}, ${number || 's/n'} — ${freight.bairro}, ${freight.cidade}/${freight.uf} — CEP ${cep}`
    const message = [
      `Olá! Quero fazer um pedido na *${STORE.name}* 💜`,
      '',
      ...lines,
      '',
      `Subtotal: ${formatBRL(subtotal)}`,
      `Entrega: ${formatBRL(freight.fee)}`,
      `*Total: ${formatBRL(total)}*`,
      '',
      `Endereço: ${address}`,
    ].join('\n')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[2px] lg:bg-black/10 lg:backdrop-blur-none" onClick={onClose}>
      <aside
        className="cart-drawer absolute inset-x-0 bottom-0 flex max-h-[88dvh] w-full flex-col rounded-t-3xl bg-[#fffdf9] text-[#2b1128] shadow-2xl sm:left-auto sm:right-4 sm:top-24 sm:bottom-auto sm:max-h-[calc(100dvh-7rem)] sm:max-w-[390px] sm:rounded-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="flex items-center gap-3 border-b border-[#3a1633]/10 p-5">
          <ShoppingBag className="size-5 text-[#e61d68]" />
          <h2 className="flex-1 font-serif text-xl font-bold">Seu pedido</h2>
          <button type="button" onClick={onClose} aria-label="Fechar carrinho" className="grid size-9 place-items-center rounded-full bg-[#351b31] text-white shadow-sm">
            <X className="size-5 text-white" strokeWidth={2.5} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-5">
          {!items.length ? (
            <div className="grid min-h-72 place-items-center text-center">
              <div>
                <ShoppingBag className="mx-auto size-12 text-primary/50" />
                <p className="mt-4 font-semibold">Seu carrinho está vazio</p>
                <p className="mt-1 text-sm text-muted-foreground">Escolha um açaí e monte do seu jeito.</p>
                <button type="button" onClick={onClose} className="mt-5 rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground">Ver cardápio</button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map((item) => (
                <article key={item.lineId} className="rounded-2xl border border-[#4a133d]/10 bg-[#f8f1f6] p-4 text-[#2b1128]">
                  <div className="flex items-start gap-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm font-bold text-[#7a245f]">{formatBRL(item.unitPrice)}</p>
                    </div>
                    <button type="button" onClick={() => removeItem(item.lineId)} aria-label={`Remover ${item.name}`} className="text-[#7b6876] hover:text-red-600"><Trash2 className="size-4" /></button>
                  </div>
                  <div className="mt-2 space-y-1 text-xs text-[#6e5b69]">
                    {item.cups.map((cup, index) => <p key={index}>Copo {index + 1}: {cup.frutas.map((o) => o.name).join(', ')} · {cup.complementos.map((o) => o.name).join(', ')}</p>)}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-full border border-[#4a133d]/15 bg-white">
                      <button type="button" onClick={() => updateQuantity(item.lineId, item.quantity - 1)} aria-label="Diminuir" className="grid size-8 place-items-center"><Minus className="size-3.5" /></button>
                      <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.lineId, item.quantity + 1)} aria-label="Aumentar" className="grid size-8 place-items-center"><Plus className="size-3.5" /></button>
                    </div>
                    <strong>{formatBRL(item.unitPrice * item.quantity)}</strong>
                  </div>
                </article>
              ))}

              <section className="rounded-2xl border border-[#4a133d]/10 bg-[#f8f1f6] p-4 text-[#2b1128]">
                <h3 className="flex items-center gap-2 font-semibold"><MapPin className="size-4 text-[#7a245f]" /> Calcular entrega</h3>
                <div className="mt-3 flex gap-2">
                  <input value={cep} onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))} inputMode="numeric" placeholder="CEP" aria-label="CEP" className="min-w-0 flex-1 rounded-xl border border-[#4a133d]/15 bg-white px-3 py-2.5 text-[#2b1128] outline-none placeholder:text-[#8b7887] focus:border-[#7a245f]" />
                  <input value={number} onChange={(e) => setNumber(e.target.value.slice(0, 12))} placeholder="Número" aria-label="Número do endereço" className="w-24 rounded-xl border border-[#4a133d]/15 bg-white px-3 py-2.5 text-[#2b1128] outline-none placeholder:text-[#8b7887] focus:border-[#7a245f]" />
                  <button type="button" onClick={calculateFreight} disabled={loading} className="rounded-xl bg-[#eadfea] px-3 text-sm font-semibold text-[#3c1835] disabled:opacity-60">{loading ? '...' : 'Calcular'}</button>
                </div>
                {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
                {freight && <p className="mt-3 rounded-xl bg-[#eadfea] p-3 text-sm text-[#3c1835]"><strong>{freight.logradouro}, {freight.bairro}</strong><br />Entrega: {formatBRL(freight.fee)}{freight.distanceKm ? ` · ${freight.distanceKm} km` : ''}</p>}
              </section>
            </div>
          )}
        </div>

        {!!items.length && (
          <footer className="border-t border-[#4a133d]/10 bg-[#fffdf9] p-5 text-[#2b1128]">
            <div className="mb-4 flex items-center justify-between text-lg"><span>Total</span><strong className="text-[#7a245f]">{formatBRL(subtotal + (freight?.fee || 0))}</strong></div>
            <button type="button" onClick={sendOrder} disabled={!freight} className="flex w-full items-center justify-center gap-2 rounded-md bg-[#e61d68] px-5 py-3.5 font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"><Send className="size-5" /> {freight ? 'Comprar agora' : 'Calcule o frete para continuar'}</button>
          </footer>
        )}
      </aside>
    </div>
  )
}
