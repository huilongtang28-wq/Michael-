import React from 'react';
import { CONTENT } from '../data/content';

interface HeroProps {
  lang: 'zh' | 'en';
  scrollTo: (id: string) => void;
}

export default function Hero({ lang, scrollTo }: HeroProps) {
  const t = CONTENT[lang].hero;

  return (
    <section id="hero" className="relative bg-slate-900 min-h-[80vh] flex items-center overflow-hidden border-b border-slate-800">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-blue-950/50 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="Logistics Port" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 backdrop-blur-sm mb-8 fade-in-up">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span className="text-blue-200 text-xs font-semibold tracking-wide uppercase">
              {t.badge}
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-blue-400 font-bold text-lg md:text-xl tracking-widest uppercase mb-4 fade-in-up" style={{ animationDelay: '0.1s' }}>
             {t.tagline}
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-8 fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t.title}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl fade-in-up" style={{ animationDelay: '0.3s' }}>
            {t.desc}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 fade-in-up" style={{ animationDelay: '0.4s' }}>
            <button 
              onClick={() => scrollTo('contact')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg shadow-blue-900/20 transition transform hover:-translate-y-1"
            >
              {t.cta}
            </button>
            <button 
              onClick={() => scrollTo('services')}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-lg backdrop-blur-sm transition"
            >
              {lang === 'zh' ? '探索服务' : 'Explore Services'}
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative Gradient Fade at Bottom */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-900 to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}