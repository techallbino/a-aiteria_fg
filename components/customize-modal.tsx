'use client'

import { useMemo, useState } from 'react'
import { Check, Minus, Plus, X } from 'lucide-react'
import { COMPLEMENTOS, FRUTAS, ADICIONAIS, type OptionGroup, type Product } from '@/lib/data'
import { computeUnitPrice, useCart, type CupConfig, type SelectedOption } from '@/lib/cart'
import { formatBRL } from '@/lib/format'

const GROUPS: OptionGroup[] = [FRUTAS, COMPLEMENTOS, ADICIONAIS]

type CupSelection = Record<string, string[]> // groupId -> option ids

function emptyCup(): CupSelection {
  return { [FRUTAS.id]: [], [COMPLEMENTOS.id]: [], [ADICIONAIS.id]: [] }
}

export function CustomizeModal({
  product,
  onClose,
}: {
  product: Product | null
  onClose: () => void
}) {
  const { addItem } = useCart()
  const [selections, setSelections] = useState<CupSelection[]>([])
  const [activeCup, setActiveCup] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // (re)inicializa quando um novo produto é aberto
  const key = product?.id
  const [initKey, setInitKey] = useState<string | undefined>(undefined)
  if (product && key !== initKey) {
    setInitKey(key)
    setSelections(product.cups.map(() => emptyCup()))
    setActiveCup(0)
    setQuantity(1)
  }

  const cupValid = (sel: CupSelection | undefined) =>
    !!sel && sel[FRUTAS.id].length >= FRUTAS.min && sel[COMPLEMENTOS.id].length >= COMPLEMENTOS.min

  const allValid = useMemo(
    () => selections.length > 0 && selections.every(cupValid),
    [selections],
  )

  const cups: CupConfig[] = useMemo(() => {
    if (!product) return []
    const toOpts = (group: OptionGroup, ids: string[]): SelectedOption[] =>
      group.options
        .filter((o) => ids.includes(o.id))
        .map((o) => ({ id: o.id, name: o.name, price: o.price }))
    return product.cups.map((size, i) => {
      const sel = selections[i] ?? emptyCup()
      return {
        size,
        frutas: toOpts(FRUTAS, sel[FRUTAS.id]),
        complementos: toOpts(COMPLEMENTOS, sel[COMPLEMENTOS.id]),
        adicionais: toOpts(ADICIONAIS, sel[ADICIONAIS.id]),
      }
    })
  }, [product, selections])

  const unitPrice = product ? computeUnitPrice(product.price, cups) : 0

  if (!product) return null

  const toggle = (groupId: string, group: OptionGroup, optionId: string) => {
    setSelections((prev) => {
      const next = prev.map((c) => ({ ...c }))
      const current = next[activeCup][groupId]
      if (current.includes(optionId)) {
        next[activeCup][groupId] = current.filter((id) => id !== optionId)
      } else if (group.max === 1) {
        next[activeCup][groupId] = [optionId]
      } else if (current.length < group.max) {
        next[activeCup][groupId] = [...current, optionId]
      }
      return next
    })
  }

  const handleAdd = () => {
    if (!allValid) return
    addItem(
      {
        productId: product.id,
        name: product.name,
        image: product.image,
        basePrice: product.price,
        cups,
        unitPrice,
      },
      quantity,
    )
    onClose()
  }

  const multiCup = product.cups.length > 1
  const activeSel = selections[activeCup] ?? emptyCup()

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="animate-pop flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl border border-border bg-background shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className="relative flex items-center gap-3 border-b border-border bg-card p-4">
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            decoding="async"
            className="size-14 rounded-xl object-cover"
          />
          <div className="min-w-0 flex-1">
            <h2 className="truncate font-serif text-lg font-bold text-foreground">{product.name}</h2>
            <p className="text-sm text-muted-foreground">{formatBRL(product.price)}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid size-9 place-items-center rounded-full bg-secondary text-foreground transition-colors hover:bg-muted"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* seletor de copos (combos) */}
        {multiCup && (
          <div className="flex gap-2 overflow-x-auto border-b border-border bg-background px-4 py-3">
            {product.cups.map((size, i) => {
              const ok = cupValid(selections[i])
              const active = i === activeCup
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveCup(i)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-secondary text-foreground hover:bg-muted'
                  }`}
                >
                  {ok && <Check className="size-3.5 text-gold" />}
                  Copo {i + 1} · {size}
                </button>
              )
            })}
          </div>
        )}

        {/* corpo com grupos */}
        <div className="flex-1 overflow-y-auto">
          {multiCup && (
            <p className="px-4 pt-4 text-sm text-muted-foreground">
              Personalizando o <strong className="text-foreground">Copo {activeCup + 1}</strong> ({product.cups[activeCup]})
            </p>
          )}
          {GROUPS.map((group) => {
            const selected = activeSel[group.id]
            const done = group.required ? selected.length >= group.min : true
            return (
              <div key={group.id} className="mt-4">
                <div className="flex items-center justify-between gap-3 bg-secondary/70 px-4 py-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{group.title}</h3>
                    <p className="text-sm text-muted-foreground">{group.subtitle}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {group.max > 1 && (
                      <span className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-muted-foreground">
                        {selected.length}/{group.max}
                      </span>
                    )}
                    {group.required &&
                      (done ? (
                        <Check className="size-5 text-gold" />
                      ) : (
                        <span className="rounded bg-muted px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                          Obrigatório
                        </span>
                      ))}
                  </div>
                </div>

                <ul>
                  {group.options.map((opt) => {
                    const isSel = selected.includes(opt.id)
                    const blocked = !isSel && group.max > 1 && selected.length >= group.max
                    return (
                      <li key={opt.id}>
                        <button
                          type="button"
                          onClick={() => toggle(group.id, group, opt.id)}
                          disabled={blocked}
                          className={`flex w-full items-center gap-3 border-b border-border px-4 py-3 text-left transition-colors disabled:opacity-40 ${
                            isSel ? 'bg-primary/10' : 'hover:bg-secondary/50'
                          }`}
                        >
                          {opt.image && (
                            <img
                              src={opt.image || '/placeholder.svg'}
                              alt={opt.name}
                              loading="lazy"
                              decoding="async"
                              className="size-12 rounded-lg object-cover"
                            />
                          )}
                          <span className="flex-1">
                            <span className="block font-medium text-foreground">{opt.name}</span>
                            {opt.price > 0 && (
                              <span className="text-sm font-medium text-gold">+ {formatBRL(opt.price)}</span>
                            )}
                          </span>
                          <span
                            className={`grid size-8 shrink-0 place-items-center rounded-full transition-colors ${
                              isSel ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary'
                            }`}
                          >
                            {isSel ? <Check className="size-4" /> : <Plus className="size-4" />}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
          <div className="h-4" />
        </div>

        {/* rodapé */}
        <div className="border-t border-border bg-card p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 rounded-full border border-border bg-background p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Diminuir quantidade"
                className="grid size-9 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-6 text-center font-semibold text-foreground">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar quantidade"
                className="grid size-9 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
              >
                <Plus className="size-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={!allValid}
              className="flex flex-1 items-center justify-between rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>{allValid ? 'Adicionar' : 'Escolha os obrigatórios'}</span>
              <span>{formatBRL(unitPrice * quantity)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
