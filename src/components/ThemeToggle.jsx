import React, { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'
import { cn } from '../lib/utils'

/**
 * Apply theme globally across document root, localStorage, and notify all instances
 */
function applyTheme(dark) {
  if (typeof window === 'undefined') return
  if (dark) {
    document.documentElement.classList.add('dark')
    try {
      localStorage.setItem('Theme', 'Dark')
    } catch (e) {}
  } else {
    document.documentElement.classList.remove('dark')
    try {
      localStorage.setItem('Theme', 'Light')
    } catch (e) {}
  }
  window.dispatchEvent(
    new CustomEvent('texcodes-theme-change', { detail: { isDark: dark } })
  )
}

export default function ThemeToggle({ className, variant = 'full' }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('Theme') === 'Dark'
    }
    return false
  })

  useEffect(() => {
    const syncState = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'))
    }

    const handleCustomEvent = (e) => {
      if (e?.detail && typeof e.detail.isDark === 'boolean') {
        setIsDarkMode(e.detail.isDark)
      } else {
        syncState()
      }
    }

    // Observe changes to document.documentElement 'class' attribute
    const observer = new MutationObserver(syncState)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    window.addEventListener('texcodes-theme-change', handleCustomEvent)
    window.addEventListener('storage', syncState)

    return () => {
      observer.disconnect()
      window.removeEventListener('texcodes-theme-change', handleCustomEvent)
      window.removeEventListener('storage', syncState)
    }
  }, [])

  const setMode = (dark) => {
    applyTheme(dark)
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={() => setMode(!isDarkMode)}
        className={cn(
          'p-1.5 border border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.15)] bg-white dark:bg-[#161619] text-[#0F0F0F] dark:text-[#EDECE6] hover:text-[#059669] dark:hover:text-[#10B981] transition-colors cursor-pointer',
          className
        )}
        aria-label={isDarkMode ? 'Switch to Paper Edition' : 'Switch to Night Edition'}
        title={isDarkMode ? 'Switch to Paper Edition (Light)' : 'Switch to Night Edition (Dark)'}
      >
        {isDarkMode ? <Sun size={14} className="text-[#10B981]" /> : <Moon size={14} />}
      </button>
    )
  }

  return (
    <div
      className={cn(
        'inline-flex items-center border border-[rgba(15,15,15,0.18)] dark:border-[rgba(255,255,255,0.16)] bg-white/70 dark:bg-[#161619] font-mono text-[10px] tracking-wider uppercase select-none',
        className
      )}
    >
      <button
        type="button"
        onClick={() => setMode(false)}
        className={`px-2 py-0.5 flex items-center gap-1 transition-colors cursor-pointer ${
          !isDarkMode
            ? 'bg-[#0F0F0F] text-[#F6F5F0] font-bold dark:bg-[#0F0F0F] dark:text-[#F6F5F0]'
            : 'text-[#8E8D88] hover:text-[#0F0F0F] dark:hover:text-[#EDECE6]'
        }`}
        aria-label="Switch to Paper Edition"
      >
        <Sun size={10} />
        <span>PAPER</span>
      </button>

      <span className="w-px h-3.5 bg-[rgba(15,15,15,0.15)] dark:bg-[rgba(255,255,255,0.15)]" />

      <button
        type="button"
        onClick={() => setMode(true)}
        className={`px-2 py-0.5 flex items-center gap-1 transition-colors cursor-pointer ${
          isDarkMode
            ? 'bg-[#10B981] text-white font-bold'
            : 'text-[#8E8D88] hover:text-[#0F0F0F] dark:hover:text-[#EDECE6]'
        }`}
        aria-label="Switch to Night Edition"
      >
        <Moon size={10} />
        <span>NIGHT</span>
      </button>
    </div>
  )
}
