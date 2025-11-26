import React from 'react';
import { CONTENT } from '../data/content';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';

export default function ServiceCases({ lang }: { lang: 'zh' | 'en' }) {
  const t = CONTENT[lang].cases;

  return (
    <div id="cases">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <ClipboardDocumentCheckIcon className="w-6 h-6 text-blue-500" />
        {t.title}
      </h2>
      <div className="space-y-6">
        {t.list.map((item, index) => (
          <div key={index} className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 border-l-4 border-l-blue-500 hover:bg-slate-750 hover:shadow-xl transition group">
             <div className="flex justify-between items-start mb-2">
                <span className="bg-blue-900/50 text-blue-300 text-xs px-2 py-1 rounded font-bold uppercase tracking-wider group-hover:bg-blue-800 transition">{item.tag}</span>
             </div>
             <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
             <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}