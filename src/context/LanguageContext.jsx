import { createContext, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { translations } from '../locales'
import { localizePath } from '../lib/paths.ts'

const LanguageContext = createContext(null)
export function LanguageProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const lang = /^\/ur(?:\/|$)/.test(location.pathname) ? 'ur-en' : 'en'
  const dict = translations[lang]
  const languageHref = (language) => localizePath(location.pathname + location.search + location.hash, language)
  const setLang = (language) => {
    if (language === 'en' || language === 'ur-en') navigate(languageHref(language))
  }
  const t = (section, key, fallback = '') => dict[section]?.[key] ?? translations.en[section]?.[key] ?? (fallback || key)
  return <LanguageContext.Provider value={{ lang, setLang, languageHref, isUrdu: lang === 'ur-en', t, dict }}>{children}</LanguageContext.Provider>
}
// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}
