import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const PrivacyPolicy = () => {
  const { t, isUrdu } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="w-full bg-[#F6F5F0] dark:bg-[#0A0A0A] min-h-screen py-16 px-4 sm:px-8 font-mono text-xs text-[#0F0F0F] dark:text-[#EDECE6] transition-colors duration-200">
      <div className="max-w-4xl mx-auto space-y-10">
        <div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#059669] dark:text-[#10B981] hover:underline uppercase tracking-wider"
          >
            <ArrowLeft size={14} />
            <span>{isUrdu ? 'MAIN INDEX PAR WAPIS JAYEIN' : 'RETURN TO HOME'}</span>
          </Link>
        </div>

        <div className="space-y-4 border-b border-[rgba(15,15,15,0.14)] dark:border-[rgba(255,255,255,0.1)] pb-8">
          <div className="text-[11px] font-mono uppercase tracking-widest text-[#059669] dark:text-[#10B981] font-semibold flex items-center gap-2">
            <ShieldCheck size={14} />
            {t('legal', 'last_updated')}
          </div>

          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-tight text-[#0F0F0F] dark:text-white leading-[0.9]">
            {t('legal', 'privacy_title')}
          </h1>
        </div>

        <div className="space-y-8 font-serif text-sm sm:text-base text-[#575652] dark:text-[#C5C4BE] leading-relaxed">
          <section className="space-y-2 font-sans">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-white tracking-wide">
              1. {isUrdu ? 'Maloomat Jo Hum Jama Karte Hain' : 'Information We Collect'}
            </h2>
            <p className="font-serif">
              {isUrdu
                ? 'Hum sirf woh maloomat jama karte hain jo aap contact ya inquiry forms bharte waqt faraham karte hain (jaise aapka naam, email, shehr aur inquiry overview). Yeh data mehfooz tareeqay se store kiya jata hai.'
                : 'We only collect information that you voluntarily provide when filling out project inquiry forms (such as your name, email, location, and project overview). This data is stored securely and used exclusively to communicate regarding your build.'}
            </p>
          </section>

          <section className="space-y-2 font-sans">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-white tracking-wide">
              2. {isUrdu ? 'Maloomat Ka Istemal' : 'How We Use Your Information'}
            </h2>
            <p className="font-serif">
              {isUrdu
                ? 'Aapki maloomat sirf aapke project inquiry ka jawab dene aur technical consultation ke liye istemal hoti hai. Hum kisi teesray fard ko aapka data farokht nahi karte.'
                : 'The information collected is used solely to respond to your technical and commercial inquiries. We do not sell, rent, or share personal information with third parties for marketing purposes.'}
            </p>
          </section>

          <section className="space-y-2 font-sans">
            <h2 className="text-xl font-display uppercase text-[#0F0F0F] dark:text-white tracking-wide">
              3. {isUrdu ? 'Rabta aur Sawalat' : 'Contact Us'}
            </h2>
            <p className="font-serif">
              {t('legal', 'contact_email')}
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

export default PrivacyPolicy

