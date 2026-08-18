'use client'

import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('fg-theme')
    const enabled = saved === 'dark'
    document.documentElement.classList.toggle('dark', enabled)
    setDark(enabled)
  }, [])

  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('fg-theme', next ? 'dark' : 'light')
    setDark(next)
  }

  return (
    <button type="button" onClick={toggle} aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'} title={dark ? 'Tema claro' : 'Tema escuro'} className="grid size-10 place-items-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white">
      {dark ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
    </button>
  )
}
