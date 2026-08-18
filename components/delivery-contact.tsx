'use client'

import { Bike, Clock3, MapPin, MessageCircle, Navigation } from 'lucide-react'
import { STORE, WHATSAPP_NUMBER } from '@/lib/data'

const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Rua+Regina+102+Ariston+Carapicuiba+SP'

export function DeliveryContact() {
  return (
    <section id="entrega" className="delivery-section scroll-mt-24 bg-[#f7eee5] px-3 py-9 sm:px-4 sm:py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl border border-[#3a1633]/10 bg-white shadow-[0_24px_70px_rgba(48,15,41,0.1)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[210px] overflow-hidden sm:min-h-[320px] lg:min-h-[390px]">
          <iframe
            title="Localização da F&G Açaiteria no mapa"
            src="https://www.google.com/maps?q=-23.5316,-46.818&z=17&output=embed"
            className="absolute inset-0 size-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <span className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#e61d68] px-3 py-1.5 text-[10px] font-bold text-white shadow-lg sm:bottom-5 sm:left-5 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"><Bike className="size-3.5 sm:size-4" /> Rua Regina, 102 — Ariston</span>
        </div>

        <div className="p-5 sm:p-10 lg:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a77b36]">Entrega e contato</p>
          <h2 className="mt-2 font-serif text-2xl font-black leading-tight text-[#2b1128] sm:text-4xl">Seu açaí chega fresquinho até você.</h2>
          <p className="mt-3 text-sm leading-relaxed text-[#705d6a] sm:mt-4 sm:text-base">Informe seu CEP no carrinho para calcularmos uma estimativa de frete pela distância até a loja.</p>

          <div className="mt-5 space-y-2.5 sm:mt-8 sm:space-y-4">
            <div className="flex gap-3 rounded-xl bg-[#fff8f1] p-3 sm:gap-4 sm:rounded-2xl sm:p-4"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#4a133d] text-white sm:size-11 sm:rounded-xl"><MapPin className="size-4 sm:size-5" /></span><div><strong className="block text-sm text-[#2b1128] sm:text-base">Nosso endereço</strong><span className="text-xs text-[#705d6a] sm:text-sm">{STORE.address}</span></div></div>
            <div className="flex gap-3 rounded-xl bg-[#fff8f1] p-3 sm:gap-4 sm:rounded-2xl sm:p-4"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#4a133d] text-white sm:size-11 sm:rounded-xl"><Clock3 className="size-4 sm:size-5" /></span><div><strong className="block text-sm text-[#2b1128] sm:text-base">Horário de atendimento</strong><span className="text-xs text-[#705d6a] sm:text-sm">{STORE.hours}</span></div></div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2 sm:mt-7 sm:gap-3">
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md border border-[#4a133d]/20 px-3.5 py-2.5 text-xs font-bold text-[#4a133d] transition hover:bg-[#4a133d] hover:text-white sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"><Navigation className="size-3.5 sm:size-4" /> Ver no mapa</a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-md bg-[#e61d68] px-3.5 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#e61d68]/20 transition hover:-translate-y-0.5 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"><MessageCircle className="size-3.5 sm:size-4" /> Falar no WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  )
}
