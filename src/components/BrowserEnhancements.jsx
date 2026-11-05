import { useEffect, useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router'

export default function BrowserEnhancements() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()
  useLayoutEffect(() => {
    if (navigationType !== 'POP') window.__lenis?.scrollTo(0, { immediate: true })
  }, [pathname, navigationType])
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let active = true
    let lenis
    import('lenis').then(({ default: Lenis }) => {
      if (!active) return
      lenis = new Lenis({ duration: 0.8, smoothWheel: true, autoRaf: true })
      window.__lenis = lenis
    })
    return () => { active = false; lenis?.destroy(); delete window.__lenis }
  }, [])
  return null
}
