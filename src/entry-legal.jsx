// Server-side entry used only at build time: renders the legal pages to HTML
// (inside the normal header and footer) for scripts/prerender-legal.js.
import { renderToString } from 'react-dom/server'
import { Route, Routes, StaticRouter } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import MainLayout from './components/MainLayout'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import DataDeletion from './pages/DataDeletion'
import { LEGAL_PATHS } from './data/business'

export function render(path) {
  return renderToString(
    <LanguageProvider>
      <StaticRouter location={path}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path={LEGAL_PATHS.privacy} element={<PrivacyPolicy />} />
            <Route path={LEGAL_PATHS.terms} element={<TermsOfService />} />
            <Route path={LEGAL_PATHS.dataDeletion} element={<DataDeletion />} />
          </Route>
        </Routes>
      </StaticRouter>
    </LanguageProvider>,
  )
}
