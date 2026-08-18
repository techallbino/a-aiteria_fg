'use client'

import { Bike, Droplets, Leaf, Sparkles, X } from 'lucide-react'

const STEPS = [
  { icon: Leaf, title: 'Ingredientes selecionados', text: 'Frutas, cremes e complementos escolhidos para garantir sabor e frescor em cada pedido.' },
  { icon: Droplets, title: 'Preparo cuidadoso', text: 'Higienizamos os ingredientes e preparamos cada copo somente depois da confirmação do pedido.' },
  { icon: Sparkles, title: 'Montagem do seu jeito', text: 'As camadas são montadas na hora, seguindo exatamente o tamanho e os adicionais escolhidos por você.' },
  { icon: Bike, title: 'Entrega rápida', text: 'Embalamos com cuidado e encaminhamos para entrega, preservando textura, temperatura e apresentação.' },
]

export function ServiceModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 grid place-items-end bg-black/55 p-0 backdrop-blur-sm sm:place-items-center sm:p-5" onClick={onClose}>
      <section role="dialog" aria-modal="true" aria-labelledby="service-title" onClick={(event) => event.stopPropagation()} className="animate-pop max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#fffaf4] p-5 text-[#2b1128] shadow-2xl dark:bg-[#21101f] dark:text-white sm:rounded-3xl sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b47b37]">Nosso serviço</p>
            <h2 id="service-title" className="mt-2 font-serif text-3xl font-black sm:text-4xl">Do preparo à sua porta.</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#705d6a] dark:text-white/65">Cada açaí é preparado individualmente, com atenção aos ingredientes e às escolhas feitas no cardápio.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Fechar nosso serviço" className="grid size-10 shrink-0 place-items-center rounded-full bg-[#351b31] text-white"><X className="size-5" /></button>
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {STEPS.map((step, index) => (
            <article key={step.title} className="service-step rounded-2xl border border-[#4a133d]/10 bg-white p-4 dark:border-white/10 dark:bg-white/5" style={{ animationDelay: `${index * 80}ms` }}>
              <span className="grid size-11 place-items-center rounded-xl bg-[#e61d68]/10 text-[#e61d68]"><step.icon className="size-5" /></span>
              <h3 className="mt-3 font-serif text-lg font-bold">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-[#705d6a] dark:text-white/60">{step.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
