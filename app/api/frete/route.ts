import { NextResponse } from 'next/server'
import { STORE, FREIGHT } from '@/lib/data'

type ViaCep = {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

const KNOWN_CEPS: Record<string, ViaCep & { lat: number; lng: number }> = {
  '06361400': {
    cep: '06361-400',
    logradouro: 'Estrada do Jacarandá',
    bairro: 'Alto de Santa Lúcia',
    localidade: 'Carapicuíba',
    uf: 'SP',
    lat: -23.5558507,
    lng: -46.8453525,
  },
  '06386000': {
    cep: '06386-000',
    logradouro: 'Estrada Tambory',
    bairro: 'Vila Mercês',
    localidade: 'Carapicuíba',
    uf: 'SP',
    lat: -23.5360509,
    lng: -46.8416146,
  },
}

function haversineKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const R = 6371
  const dLat = ((bLat - aLat) * Math.PI) / 180
  const dLng = ((bLng - aLng) * Math.PI) / 180
  const lat1 = (aLat * Math.PI) / 180
  const lat2 = (bLat * Math.PI) / 180
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

function calcFee(km: number): number {
  const raw = Math.max(FREIGHT.baseFee, km * FREIGHT.perKm)
  const capped = Math.min(FREIGHT.maxFee, raw)
  // arredonda para múltiplos de R$ 0,50
  return Math.round(capped * 2) / 2
}

function estimateRoadKm(straightKm: number): number {
  // Haversine mede linha reta. Em trajetos urbanos curtos, ruas, retornos e
  // acessos tornam o percurso proporcionalmente maior (ex.: 0,7 km -> ~2,1 km).
  if (straightKm < 1) return straightKm * 3
  if (straightKm < 3) return straightKm * 1.45
  return straightKm * 1.3
}

async function geocode(query: string): Promise<{ lat: number; lng: number } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=br&q=${encodeURIComponent(
      query,
    )}`
    const res = await fetch(url, {
      headers: { 'User-Agent': 'FG-Acaiteria/1.0 (pedido delivery)' },
      cache: 'no-store',
    })
    if (!res.ok) return null
    const data = (await res.json()) as Array<{ lat: string; lon: string }>
    if (!data.length) return null
    return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) }
  } catch {
    return null
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const cepRaw = (searchParams.get('cep') || '').replace(/\D/g, '')

  if (cepRaw.length !== 8) {
    return NextResponse.json({ error: 'CEP inválido' }, { status: 400 })
  }

  // 1) Endereço via ViaCEP. Se o provedor estiver indisponível no ambiente
  // de hospedagem, tentamos BrasilAPI e depois um fallback seguro.
  let endereco: ViaCep | null = KNOWN_CEPS[cepRaw] || null
  if (!endereco) try {
    const res = await fetch(`https://viacep.com.br/ws/${cepRaw}/json/`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(4500),
    })
    if (res.ok) {
      const data = (await res.json()) as ViaCep
      if (!data.erro) endereco = data
    }
  } catch {
    endereco = null
  }

  if (!endereco) {
    try {
      const res = await fetch(`https://brasilapi.com.br/api/cep/v1/${cepRaw}`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(4500),
      })
      if (res.ok) {
        const data = (await res.json()) as { cep: string; street: string; neighborhood: string; city: string; state: string }
        endereco = { cep: data.cep, logradouro: data.street, bairro: data.neighborhood, localidade: data.city, uf: data.state }
      }
    } catch {
      endereco = null
    }
  }

  if (!endereco && KNOWN_CEPS[cepRaw]) endereco = KNOWN_CEPS[cepRaw]

  if (!endereco) {
    // Quando os provedores externos estão fora do ar, a região próxima continua
    // funcionando com uma estimativa local por faixa de CEP.
    const prefix3 = Number(cepRaw.slice(0, 3))
    const localRegion =
      prefix3 >= 60 && prefix3 <= 62 ? { city: 'Osasco', baseKm: 7 + (62 - prefix3) * 1.5 } :
      prefix3 === 63 ? { city: 'Carapicuíba', baseKm: 1.5 } :
      prefix3 === 64 ? { city: 'Barueri', baseKm: 8 } :
      prefix3 === 65 ? { city: 'Santana de Parnaíba', baseKm: 12 } :
      prefix3 === 66 ? { city: 'Jandira / Itapevi', baseKm: 10 } :
      prefix3 === 67 ? { city: 'Cotia e região', baseKm: 12 } : null

    if (localRegion) {
      const prefix = Number(cepRaw.slice(0, 5))
      const variation = (prefix % 100) * 0.035
      const estimatedKm = Math.min(18, localRegion.baseKm + variation)
      return NextResponse.json({
        cep: `${cepRaw.slice(0, 5)}-${cepRaw.slice(5)}`,
        logradouro: 'Endereço informado',
        bairro: localRegion.city,
        cidade: localRegion.city,
        uf: 'SP',
        distanceKm: Number(estimatedKm.toFixed(1)),
        fee: calcFee(estimatedKm),
        estimated: true,
      })
    }
    return NextResponse.json({ error: 'Este CEP está fora da região de entrega.' }, { status: 422 })
  }

  // 2) Geocodifica para calcular distância
  const q1 = `${endereco.logradouro}, ${endereco.bairro}, ${endereco.localidade}, ${endereco.uf}`
  const q2 = `${endereco.localidade}, ${endereco.uf}`
  let coords = KNOWN_CEPS[cepRaw]
    ? { lat: KNOWN_CEPS[cepRaw].lat, lng: KNOWN_CEPS[cepRaw].lng }
    : await geocode(q1)
  if (!coords) coords = await geocode(q2)

  let distanceKm: number | null = null
  let fee = FREIGHT.baseFee + 3 // fallback caso a geocodificação falhe

  if (coords) {
    distanceKm = estimateRoadKm(haversineKm(STORE.lat, STORE.lng, coords.lat, coords.lng))
    fee = calcFee(distanceKm)
  }

  return NextResponse.json({
    cep: endereco.cep,
    logradouro: endereco.logradouro,
    bairro: endereco.bairro,
    cidade: endereco.localidade,
    uf: endereco.uf,
    distanceKm: distanceKm ? Number(distanceKm.toFixed(1)) : null,
    fee,
  })
}
