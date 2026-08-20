// ============================================================================
// CONFIGURAÇÃO — troque aqui o número de WhatsApp que vai RECEBER os pedidos.
// Formato internacional, só dígitos: 55 + DDD + número. Ex: "5511912345678"
// ============================================================================
export const WHATSAPP_NUMBER = '5511977089963'

export const STORE = {
  name: 'F&G Açaiteria & Cia',
  address: 'Rua Regina, 102 - Ariston, Carapicuíba - SP',
  // Coordenadas aproximadas da loja (Ariston, Carapicuíba) para cálculo de frete.
  lat: -23.53132,
  lng: -46.84546,
  phone: WHATSAPP_NUMBER,
  hours: 'Todos os dias, 13h às 23h',
}

// Frete por distância real (haversine loja -> cliente)
export const FREIGHT = {
  baseFee: 5, // taxa mínima para trajetos curtos
  freeRadiusKm: 0,
  perKm: 1.05, // R$ 1,05 por quilômetro
  maxFee: 25,
}

export type Option = {
  id: string
  name: string
  price: number
  image?: string
}

export type OptionGroup = {
  id: string
  title: string
  subtitle: string
  required: boolean
  min: number
  max: number
  options: Option[]
}

const img = (n: string) => `/ingredientes/${n}.webp`

// Mesmos grupos de complementos para TODOS os açaís / copos.
export const FRUTAS: OptionGroup = {
  id: 'frutas',
  title: 'Frutas',
  subtitle: 'Escolha 1 opção.',
  required: true,
  min: 1,
  max: 1,
  options: [
    { id: 'abacaxi', name: 'Abacaxi', price: 0, image: img('abacaxi') },
    { id: 'morango', name: 'Morango', price: 0, image: img('morango') },
    { id: 'banana', name: 'Banana', price: 0, image: img('banana') },
    { id: 'kiwi', name: 'Kiwi', price: 0, image: img('kiwi') },
  ],
}

export const COMPLEMENTOS: OptionGroup = {
  id: 'complementos',
  title: 'Complementos',
  subtitle: 'Escolha pelo menos 1 opção.',
  required: true,
  min: 1,
  max: 3,
  options: [
    {
      id: 'granola',
      name: 'Granola',
      price: 0,
      image: img('granola'),
    },
    {
      id: 'leite-condensado',
      name: 'Leite Condensado',
      price: 0,
      image: img('leite-condensado'),
    },
    {
      id: 'leite-em-po',
      name: 'Leite em Pó',
      price: 0,
      image: img('leite-em-po'),
    },
    {
      id: 'amendoim-c',
      name: 'Amendoim',
      price: 0,
      image: img('amendoim'),
    },
    {
      id: 'confete',
      name: 'Confete',
      price: 0,
      image: img('confete'),
    },
    {
      id: 'farinha-pacoca',
      name: 'Farinha de Paçoca',
      price: 0,
      image: img('farinha-pacoca'),
    },
    {
      id: 'sucrilhos',
      name: 'Sucrilhos',
      price: 0,
      image: img('sucrilhos'),
    },
    {
      id: 'cobertura-chocolate',
      name: 'Cobertura de Chocolate',
      price: 0,
      image: img('cobertura-chocolate'),
    },
    {
      id: 'bala-fini-bananinha',
      name: 'Bala Fini Bananinha',
      price: 0,
      image: img('bala-fini-bananinha'),
    },
    {
      id: 'bala-fini-beijinho',
      name: 'Bala Fini Beijinho',
      price: 0,
      image: img('bala-fini-beijinho'),
    },
  ],
}

export const ADICIONAIS: OptionGroup = {
  id: 'adicionais',
  title: 'Adicionais',
  subtitle: 'Escolha até 3 opções.',
  required: false,
  min: 0,
  max: 3,
  options: [
    {
      id: 'add-chocoball',
      name: 'Sucrilhos de Chocoball',
      price: 4,
      image: img('sucrilhos-chocoball'),
    },
    {
      id: 'add-nutella',
      name: 'Nutella',
      price: 4,
      image: img('nutella'),
    },
    {
      id: 'add-ovomaltine',
      name: 'Ovomaltine',
      price: 3,
      image: img('ovomaltine'),
    },
    {
      id: 'add-bis-branco',
      name: 'Bis Chocolate Branco',
      price: 3,
      image: img('bis-branco'),
    },
    {
      id: 'add-bis-preto',
      name: 'Bis Chocolate Preto',
      price: 3,
      image: img('bis-preto'),
    },
    {
      id: 'add-sucrilhos',
      name: 'Sucrilhos',
      price: 2,
      image: img('sucrilhos'),
    },
    {
      id: 'add-granola',
      name: 'Granola',
      price: 2,
      image: img('granola'),
    },
    {
      id: 'add-leite-condensado',
      name: 'Leite Condensado',
      price: 2,
      image: img('leite-condensado'),
    },
    {
      id: 'add-leite-em-po',
      name: 'Leite em Pó',
      price: 2,
      image: img('leite-em-po'),
    },
    {
      id: 'add-amendoim',
      name: 'Amendoim',
      price: 2,
      image: img('amendoim'),
    },
    {
      id: 'add-farinha-pacoca',
      name: 'Farinha de Paçoca',
      price: 2,
      image: img('farinha-pacoca'),
    },
    {
      id: 'add-bala-fini-beijinho',
      name: 'Bala Fini Beijinho',
      price: 1.5,
      image: img('bala-fini-beijinho'),
    },
    {
      id: 'add-bala-fini-dentinho',
      name: 'Bala Fini Dentinho',
      price: 1.5,
      image: img('bala-fini-dentinho'),
    },
    {
      id: 'add-cobertura-fini-bananinha',
      name: 'Cobertura Fini Bananinha',
      price: 1,
      image: img('cobertura-fini-bananinha'),
    },
    {
      id: 'add-cobertura-fini-beijinho',
      name: 'Cobertura Fini Beijinho',
      price: 1,
      image: img('cobertura-fini-beijinho'),
    },
    {
      id: 'add-cobertura-fini-dentinho',
      name: 'Cobertura Fini Dentinho',
      price: 1,
      image: img('cobertura-fini-dentinho'),
    },
  ],
}

export const OPTION_GROUPS: OptionGroup[] = [FRUTAS, COMPLEMENTOS, ADICIONAIS]

export type Product = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: 'acai' | 'casal' | 'familia' | 'mistos'
  cups: string[] // cada string é o tamanho de um copo do pedido
  badge?: string
}

const MENU_1 = '/images/menu-acai-1.webp'
const MENU_2 = '/images/menu-acai-2.webp'
const MENU_3 = '/images/menu-acai-3.webp'
const MENU_4 = '/images/menu-acai-4.webp'
const MENU_5 = '/images/menu-acai-5.webp'

export const PRODUCTS: Product[] = [
  // Açaís individuais
  { id: 'acai-300', name: 'Açaí 300ml', description: 'Açaí cremoso do seu jeito.', price: 15, image: MENU_1, category: 'acai', cups: ['300ml'] },
  { id: 'acai-400', name: 'Açaí 400ml', description: 'Açaí com morangos frescos.', price: 18, image: MENU_3, category: 'acai', cups: ['400ml'], badge: 'Popular' },
  { id: 'acai-500', name: 'Açaí 500ml', description: 'Cremoso, caprichado e irresistível.', price: 22, image: MENU_5, category: 'acai', cups: ['500ml'] },
  { id: 'acai-700', name: 'Açaí 700ml', description: 'Para quem ama açaí de verdade.', price: 28, image: MENU_4, category: 'acai', cups: ['700ml'] },

  // Combos Casal
  { id: 'casal-300', name: 'Combo Casal 2×300ml', description: 'Compartilhe momentos, compartilhe sabor.', price: 27, image: MENU_5, category: 'casal', cups: ['300ml', '300ml'] },
  { id: 'casal-400', name: 'Combo Casal 2×400ml', description: 'Compartilhe momentos, compartilhe sabor.', price: 33, image: MENU_2, category: 'casal', cups: ['400ml', '400ml'] },
  { id: 'casal-500', name: 'Combo Casal 2×500ml', description: 'Compartilhe momentos, compartilhe sabor.', price: 40, image: MENU_4, category: 'casal', cups: ['500ml', '500ml'] },
  { id: 'casal-700', name: 'Combo Casal 2×700ml', description: 'Compartilhe momentos, compartilhe sabor.', price: 52, image: MENU_2, category: 'casal', cups: ['700ml', '700ml'] },

  // Combos Família
  { id: 'familia-400', name: 'Combo Família 3×400ml', description: 'Ideal para reunir a família e os amigos.', price: 47, image: MENU_4, category: 'familia', cups: ['400ml', '400ml', '400ml'] },
  { id: 'familia-500', name: 'Combo Família 3×500ml', description: 'Ideal para reunir a família e os amigos.', price: 58, image: MENU_2, category: 'familia', cups: ['500ml', '500ml', '500ml'], badge: 'Mais pedido' },
  { id: 'familia-700', name: 'Combo Família 3×700ml', description: 'Ideal para reunir a família e os amigos.', price: 75, image: MENU_4, category: 'familia', cups: ['700ml', '700ml', '700ml'] },

  // Combos Mistos
  { id: 'mistos-400', name: 'Combo Misto 2×400ml + 300ml', description: 'Mais sabor, mais economia.', price: 48, image: MENU_2, category: 'mistos', cups: ['400ml', '400ml', '300ml'] },
  { id: 'mistos-500', name: 'Combo Misto 2×500ml + 300ml', description: 'Mais sabor, mais economia.', price: 55, image: MENU_5, category: 'mistos', cups: ['500ml', '500ml', '300ml'] },
  { id: 'mistos-700', name: 'Combo Misto 2×700ml + 300ml', description: 'Mais sabor, mais economia.', price: 67, image: MENU_4, category: 'mistos', cups: ['700ml', '700ml', '300ml'] },
]

export const CATEGORIES: { id: Product['category']; label: string }[] = [
  { id: 'acai', label: 'Açaís' },
  { id: 'casal', label: 'Combos Casal' },
  { id: 'familia', label: 'Combos Família' },
  { id: 'mistos', label: 'Combos Mistos' },
]
