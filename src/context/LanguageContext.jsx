import React, { createContext, useContext, useState } from 'react'
import { translations } from '../locales'

const LanguageContext = createContext(null)

function detectInitialLanguage() {
  if (typeof window === 'undefined') return 'en'

  // 1. Manual user override in localStorage
  try {
    const saved = localStorage.getItem('texcodes_lang') || localStorage.getItem('texcodes_retail_lang')
    if (saved === 'en' || saved === 'ur-en') {
      return saved
    }
  } catch (e) {}

  // 2. Synchronous timezone inspection
  try {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase()
    if (
      tz === 'asia/karachi' ||
      tz === 'asia/kolkata' ||
      tz === 'asia/calcutta'
    ) {
      return 'ur-en'
    }

    if (
      tz.startsWith('america/') ||
      tz.startsWith('europe/') ||
      tz.startsWith('atlantic/') ||
      tz.startsWith('australia/')
    ) {
      return 'en'
    }
  } catch (e) {}

  // 3. Browser locale check
  try {
    const navLangs = (navigator.languages || [navigator.language || '']).map((l) => l.toLowerCase())
    const isDesiLocale = navLangs.some(
      (l) =>
        l.includes('-pk') ||
        l.includes('-in') ||
        l.startsWith('ur') ||
        l.startsWith('hi') ||
        l.startsWith('pa')
    )
    if (isDesiLocale) return 'ur-en'
  } catch (e) {}

  return 'en'
}

export const LanguageProvider = ({ children }) => {
  const [lang, setLangState] = useState(detectInitialLanguage)

  const setLang = (newLang) => {
    if (newLang !== 'en' && newLang !== 'ur-en') return
    setLangState(newLang)
    try {
      localStorage.setItem('texcodes_lang', newLang)
      localStorage.setItem('texcodes_retail_lang', newLang)
    } catch (e) {}
  }

  const isUrdu = lang === 'ur-en'

  // Translation helper function
  const t = (section, key, fallback = '') => {
    const activeDict = translations[lang] || translations.en
    if (activeDict && activeDict[section] && activeDict[section][key] !== undefined) {
      return activeDict[section][key]
    }
    const fallbackDict = translations.en
    if (fallbackDict && fallbackDict[section] && fallbackDict[section][key] !== undefined) {
      return fallbackDict[section][key]
    }
    return fallback || key
  }

  const value = {
    lang,
    setLang,
    isUrdu,
    t,
    dict: translations[lang] || translations.en,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
