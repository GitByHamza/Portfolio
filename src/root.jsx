import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation, useNavigation, isRouteErrorResponse, useRouteError } from 'react-router'
import { LanguageProvider } from './context/LanguageContext'
import BrowserEnhancements from './components/BrowserEnhancements'
import Error404 from './pages/Error404'
import './index.css'

const fonts = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Caveat:wght@600;700&family=JetBrains+Mono:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,300..600;1,6..72,400;1,6..72,500&family=Oswald:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap'
const themeScript = "try{if(localStorage.getItem('Theme')==='Dark')document.documentElement.classList.add('dark')}catch{}"

export const links = () => [
  { rel: 'icon', type: 'image/png', href: '/Icon.png' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'stylesheet', href: fonts },
  { rel: 'describedby', href: '/llms.txt', type: 'text/plain' },
]

export function Layout({ children }) {
  const { pathname } = useLocation()
  const urdu = /^\/ur(?:\/|$)/.test(pathname)
  return (
    <html lang={urdu ? 'ur-Latn' : 'en'} dir="ltr" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="p:domain_verify" content="d51e58ba1ad390e9d843de2d442d4508" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-[#F6F5F0] text-[#0F0F0F] antialiased selection:bg-[#059669] selection:text-white dark:selection:bg-[#10B981] dark:selection:text-[#0F0F11]">
        <a href="#page-content" className="skip-link">Skip to content</a>
        <LanguageProvider>{children}</LanguageProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  const navigation = useNavigation()
  return <>
    {navigation.state !== 'idle' && <div className="navigation-progress" role="progressbar" aria-label="Opening page" />}
    <Outlet />
    <BrowserEnhancements />
  </>
}

export function ErrorBoundary() {
  const error = useRouteError()
  return <div id="page-content">
    {isRouteErrorResponse(error) && error.status === 404 ? <Error404 /> : (
      <main className="max-w-3xl mx-auto px-6 py-24 space-y-6">
        <h1 className="font-display text-5xl">This page could not load.</h1>
        <p>Please reload the page or contact TeXCodes directly.</p>
        <a href="/" className="btn-outline">Return home</a>
        <a href="mailto:admin@texcodes.com" className="ml-4 underline">Email TeXCodes</a>
      </main>
    )}
  </div>
}
