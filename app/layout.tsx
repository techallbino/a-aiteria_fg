import type { Metadata, Viewport } from 'next'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import '@fontsource/poppins/800.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'F&G Açaí | Açaiteria & Cia — Carapicuíba',
  description: 'Monte seu açaí, escolha seus complementos e peça pelo WhatsApp em Carapicuíba.',
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f2fb' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1023' },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className="bg-background">
      <body>{children}</body>
    </html>
  )
}
