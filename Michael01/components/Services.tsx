import React from 'react';
import { CONTENT } from '../data/content';

interface ServicesProps {
  lang: 'zh' | 'en';
}

export default function Services({ lang }: ServicesProps) {
  const t = CONTENT[lang].services;

  return (
    <section id="services" className="py-24 bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{t.title}</h2>
          <p className="text-lg text-slate-400">{t.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.list.map((item, idx) => (
            <div key={idx} className="bg-slate-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300 border border-slate-700 group">
              <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-6 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 border border-slate-700">
                <item.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}