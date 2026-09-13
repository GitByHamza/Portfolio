import React from 'react'
import { ArrowLeft, Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

const Error404 = () => {
  const { t, isUrdu } = useLanguage()

  return (
    <div className="min-h-[75vh] w-full bg-[#F6F5F0] dark:bg-[#0A0A0A] flex flex-col items-center justify-center px-4 py-16 text-center font-mono transition-colors duration-200">
      <div className="max-w-md mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#059669] dark:text-[#10B981] uppercase tracking-widest bg-[#ECFDF5] dark:bg-[#064E3B]/30 px-3 py-1 border border-[#059669]/30">
          <Terminal size={13} /> {t('error404', 'badge')}
        </div>

        <div className="text-7xl sm:text-9xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-white select-none">
          404
        </div>

        <h1 className="text-2xl sm:text-3xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-white">
          {t('error404', 'title')}
        </h1>

        <p className="font-serif text-sm sm:text-base text-[#575652] dark:text-[#A3A29E] max-w-sm mx-auto leading-relaxed">
          {t('error404', 'desc')}
        </p>

        <div className="pt-4">
          <Link
            to="/"
            className="btn-outline text-xs inline-flex items-center gap-2"
          >
            <ArrowLeft size={14} /> {t('error404', 'return_btn')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Error404