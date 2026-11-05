import { Link } from 'react-router'
import { useLanguage } from '../context/LanguageContext'
import { localizePath } from '../lib/paths.ts'

export default function SiteLink({ to, prefetch = 'viewport', ...props }) {
  const { lang } = useLanguage()
  const target = typeof to === 'string' ? localizePath(to, lang) : { ...to, pathname: to?.pathname ? localizePath(to.pathname, lang) : undefined }
  return <Link {...props} to={target} prefetch={prefetch} />
}

export function LanguageLink({ language, ...props }) {
  const { languageHref, lang } = useLanguage()
  return <Link {...props} to={languageHref(language)} prefetch="intent" aria-current={lang === language ? 'page' : undefined} />
}
