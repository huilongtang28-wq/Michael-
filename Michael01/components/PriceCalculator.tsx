import React, { useState } from 'react';
import { CalculatorIcon } from '@heroicons/react/24/outline';

export default function PriceCalculator({ lang }: { lang: 'zh' | 'en' }) {
  const [quote, setQuote] = useState<string | null>(null);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setQuote(lang === 'zh' ? '请联系 Michael 获取精确报价' : 'Please contact Michael for a precise quote');
  };

  const labels = {
    zh: { title: '运费估算', type: '运输方式', w: '重量 (KG)', v: '体积 (CBM)', btn: '获取参考价', types: ['海运整柜', '海运拼箱', '空运'] },
    en: { title: 'Freight Estimator', type: 'Type', w: 'Weight (KG)', v: 'Volume (CBM)', btn: 'Get Quote', types: ['Sea FCL', 'Sea LCL', 'Air Cargo'] }
  }[lang];

  return (
    <div id="price">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <CalculatorIcon className="w-6 h-6 text-blue-500" />
        {labels.title}
      </h2>
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700 h-full">
        <form onSubmit={handleCalc} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">{labels.type}</label>
            <select className="w-full p-3 border border-slate-600 rounded-lg bg-slate-900 text-white focus:ring-blue-500 focus:border-blue-500 outline-none">
              {labels.types.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{labels.w}</label>
              <input type="number" className="w-full p-3 border border-slate-600 rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:border-blue-500 outline-none" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">{labels.v}</label>
              <input type="number" className="w-full p-3 border border-slate-600 rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:border-blue-500 outline-none" placeholder="0" />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition shadow-lg shadow-blue-900/30">
            {labels.btn}
          </button>
        </form>
        {quote && (
          <div className="mt-6 p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg text-blue-200 text-center font-medium animate-pulse">
            {quote}
          </div>
        )}
      </div>
    </div>
  );
}