import { useState, useEffect } from 'react'

/**
 * Returns true if the page is currently in dark mode.
 * Watches for class changes on <html> so it reacts to theme toggles.
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState(
    () => false
  )

  useEffect(() => {
    const el = document.documentElement
    setIsDark(el.classList.contains('dark'))
    const observer = new MutationObserver(() => {
      setIsDark(el.classList.contains('dark'))
    })
    observer.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return isDark
}
