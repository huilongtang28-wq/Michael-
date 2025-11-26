import React, { useState } from 'react';
import { Bars3Icon, XMarkIcon, LanguageIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { CONTENT, CONTACT_INFO } from '../data/content';

interface NavbarProps {
  lang: 'zh' | 'en';
  setLang: (l: 'zh' | 'en') => void;
  scrollTo: (id: string) => void;
}

export default function Navbar({ lang, setLang, scrollTo }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = CONTENT[lang].nav;

  const handleNav = (id: string) => {
    scrollTo(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Bar - Contact Info */}
      <div className="bg-slate-950 text-slate-400 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
           <div className="flex items-center gap-6">
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-1.5 hover:text-blue-400 transition">
                 <EnvelopeIcon className="w-3.5 h-3.5" />
                 {CONTACT_INFO.email}
              </a>
              <a href={`tel:${CONTACT_INFO.phoneLink}`} className="flex items-center gap-1.5 hover:text-blue-400 transition">
                 <PhoneIcon className="w-3.5 h-3.5" />
                 {CONTACT_INFO.phone}
              </a>
           </div>
           <div className="hidden sm:block text-slate-500">
              Professional Global Logistics Services
           </div>
        </div>
      </div>

      <nav className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-lg transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            
            {/* Logo / Brand */}
            <div className="flex flex-col cursor-pointer group" onClick={() => handleNav('hero')}>
              <span className="text-2xl font-extrabold text-white tracking-tight group-hover:text-blue-500 transition">
                {t.brand}
              </span>
              <span className="text-xs text-slate-400 font-medium tracking-wider uppercase group-hover:text-slate-300 transition">
                {t.company}
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              {['about', 'services', 'tool', 'contact'].map((key) => (
                <button
                  key={key}
                  onClick={() => handleNav(key)}
                  className="text-sm font-semibold text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg transition-all"
                >
                  {t[key as keyof typeof t]}
                </button>
              ))}
              
              <div className="h-6 w-px bg-slate-700 mx-2"></div>

              <button
                onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
                className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition border border-slate-700 px-3 py-1.5 rounded-full hover:border-blue-500 hover:bg-slate-800"
              >
                <LanguageIcon className="w-4 h-4" />
                {lang === 'zh' ? 'EN' : '中文'}
              </button>
            </div>

            {/* Mobile Menu Btn */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 p-2">
                {isOpen ? <XMarkIcon className="w-7 h-7" /> : <Bars3Icon className="w-7 h-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 absolute w-full shadow-2xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {['about', 'services', 'tool', 'contact'].map((key) => (
                <button
                  key={key}
                  onClick={() => handleNav(key)}
                  className="block w-full text-left px-4 py-3 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg"
                >
                  {t[key as keyof typeof t]}
                </button>
              ))}
              <div className="border-t border-slate-800 my-2 pt-2">
                 <button
                  onClick={() => { setLang(lang === 'zh' ? 'en' : 'zh'); setIsOpen(false); }}
                  className="block w-full text-left px-4 py-3 text-base font-bold text-blue-400"
                >
                  Switch to {lang === 'zh' ? 'English' : '中文'}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}