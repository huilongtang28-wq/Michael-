import React, { useState } from 'react';
import { CONTENT, CONTACT_INFO } from '../data/content';
import { PhoneIcon, EnvelopeIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { APP_VERSION } from '../constants';

export default function ContactFooter({ lang }: { lang: 'zh' | 'en' }) {
  const t = CONTENT[lang].contact;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTACT_INFO.wechat);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="bg-slate-950 text-white py-20 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-slate-200">{t.title}</h2>
        <p className="text-slate-500 mb-12 max-w-2xl mx-auto text-sm">{t.subtitle}</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
          
          {/* Items */}
          {[
            { 
              icon: PhoneIcon, 
              text: CONTACT_INFO.phone, 
              label: 'Mobile', 
              color: 'text-blue-400', 
              link: `tel:${CONTACT_INFO.phoneLink}` 
            },
            { 
              icon: EnvelopeIcon, 
              text: CONTACT_INFO.email, 
              label: 'Email', 
              color: 'text-orange-400', 
              link: `mailto:${CONTACT_INFO.email}` 
            },
            { 
              icon: ChatBubbleOvalLeftEllipsisIcon, 
              text: CONTACT_INFO.wechat, 
              label: copied ? t.copied : t.wechat_tip, 
              color: 'text-green-400', 
              onClick: handleCopy 
            },
            { 
               icon: () => <span className="font-bold">WA</span>,
               text: 'WhatsApp', 
               label: 'Chat Now', 
               color: 'text-[#25D366]', 
               link: `https://wa.me/${CONTACT_INFO.phoneLink.replace('+', '')}` 
            }
          ].map((item, idx) => (
            <a 
              key={idx}
              href={item.link}
              onClick={item.onClick}
              target={item.link && item.link.startsWith('http') ? '_blank' : undefined}
              rel={item.link && item.link.startsWith('http') ? 'noreferrer' : undefined}
              className={`bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex flex-col items-center hover:bg-slate-800 transition cursor-pointer hover:border-slate-700 ${!item.link && !item.onClick ? 'pointer-events-none' : ''}`}
            >
              <item.icon className={`w-8 h-8 mb-3 ${item.color}`} />
              <div className="text-sm font-bold text-slate-200 break-all">{item.text}</div>
              <div className="text-xs text-slate-600 mt-1 uppercase tracking-wide">{item.label}</div>
            </a>
          ))}

        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-center items-center text-xs text-slate-600 gap-4">
          <div>
            &copy; {new Date().getFullYear()} Guangzhou Shuangqing International Freight Forwarding Co., Ltd.
            <span className="ml-2 px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 font-mono text-[10px]">v{APP_VERSION}</span>
          </div>
        </div>
      </div>
    </section>
  );
}