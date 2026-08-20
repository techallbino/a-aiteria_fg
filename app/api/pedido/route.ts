import { NextRequest, NextResponse } from 'next/server'

const LIMITE = 3
const JANELA = 10 * 60 * 1000 // 10 minutos

type Registro = {
quantidade: number
inicio: number
}

const globalPedidos = globalThis as typeof globalThis & {
pedidosPorIp?: Map<string, Registro>
}

const pedidosPorIp =
globalPedidos.pedidosPorIp ?? new Map<string, Registro>()

globalPedidos.pedidosPorIp = pedidosPorIp

export async function POST(request: NextRequest) {
const forwardedFor = request.headers.get('x-forwarded-for')

const ip =
    forwardedFor?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'ip-desconhecido'

const agora = Date.now()
const registro = pedidosPorIp.get(ip)

if (!registro || agora - registro.inicio >= JANELA) {
    pedidosPorIp.set(ip, {
    quantidade: 1,
    inicio: agora,
    })

    return NextResponse.json({
    autorizado: true,
    restantes: 2,
    })
}

if (registro.quantidade >= LIMITE) {
    const segundosRestantes = Math.ceil(
    (JANELA - (agora - registro.inicio)) / 1000,
    )

    return NextResponse.json(
    {
        autorizado: false,
        erro: 'Limite de pedidos atingido.',
        segundosRestantes,
    },
    { status: 429 },
    )
}

registro.quantidade += 1
pedidosPorIp.set(ip, registro)

return NextResponse.json({
    autorizado: true,
    restantes: LIMITE - registro.quantidade,
})
}