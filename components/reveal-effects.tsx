'use client'

import { useEffect } from 'react'

const SELECTOR = [
  'main h1', 'main h2', 'main h3', 'main p', 'main img:not(.hero-image-enter)',
  'main a', 'main button', 'main article', '.product-card', 'footer > *',
].join(',')

export function RevealEffects() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observed = new WeakSet<Element>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-revealed')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -28px' })

    const register = (root: ParentNode = document) => {
      root.querySelectorAll(SELECTOR).forEach((element, index) => {
        if (
          observed.has(element) ||
          element.closest('[role="dialog"]') ||
          element.closest('.hero-section')
        ) return
        observed.add(element)
        element.classList.add('reveal-object')
        ;(element as HTMLElement).style.setProperty('--reveal-delay', `${(index % 6) * 55}ms`)
        observer.observe(element)
      })
    }

    register()
    const mutations = new MutationObserver(() => register())
    mutations.observe(document.body, { childList: true, subtree: true })
    return () => {
      mutations.disconnect()
      observer.disconnect()
    }
  }, [])

  return null
}
