import React, { useState } from 'react';
import { CONTENT, CONTACT_INFO } from '../data/content';
import { 
  UserIcon, 
  MapPinIcon, 
  ChatBubbleOvalLeftEllipsisIcon, 
  PhoneIcon, 
  EnvelopeIcon 
} from '@heroicons/react/24/solid';

interface AboutProps {
  lang: 'zh' | 'en';
}

export default function About({ lang }: AboutProps) {
  const t = CONTENT[lang].about;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(CONTACT_INFO.wechat);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="py-24 bg-slate-900 relative border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Identity & Contact Card */}
          <div className="w-full relative group">
             {/* Glow effect */}
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
             
             <div className="relative bg-slate-800 border border-slate-700 rounded-2xl p-8 shadow-2xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 border-b border-slate-700 pb-8">
                  <div className="w-24 h-24 bg-slate-700 rounded-full flex items-center justify-center border-4 border-slate-600 text-slate-400 shrink-0">
                    <UserIcon className="w-12 h-12" />
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold text-white mb-2">Michael Tang</h3>
                    <div className="inline-block px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20 mb-3">
                      {t.profile.role}
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-slate-400 text-sm">
                      <MapPinIcon className="w-4 h-4" />
                      {t.profile.location}
                    </div>
                  </div>
                </div>
                
                {/* Actionable Contact Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* WeChat */}
                    <button 
                      onClick={handleCopy}
                      className="flex items-center justify-center gap-3 p-4 bg-[#07c160]/10 hover:bg-[#07c160]/20 border border-[#07c160]/30 rounded-xl transition group/btn"
                    >
                      <ChatBubbleOvalLeftEllipsisIcon className="w-6 h-6 text-[#07c160]" />
                      <div className="text-left">
                        <div className="text-xs text-[#07c160] uppercase font-bold tracking-wider">WeChat</div>
                        <div className="text-white font-medium text-sm group-hover/btn:text-[#07c160] transition">{copied ? CONTENT[lang].contact.copied : CONTACT_INFO.wechat}</div>
                      </div>
                    </button>

                    {/* WhatsApp */}
                    <a 
                      href={`https://wa.me/${CONTACT_INFO.phoneLink.replace('+', '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-3 p-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl transition group/btn"
                    >
                      <div className="font-bold text-[#25D366] text-xl">WA</div>
                      <div className="text-left">
                         <div className="text-xs text-[#25D366] uppercase font-bold tracking-wider">WhatsApp</div>
                         <div className="text-white font-medium text-sm">Chat Now</div>
                      </div>
                    </a>

                     {/* Phone */}
                    <a 
                      href={`tel:${CONTACT_INFO.phoneLink}`}
                      className="flex items-center justify-center gap-3 p-4 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/30 rounded-xl transition group/btn sm:col-span-2"
                    >
                      <PhoneIcon className="w-5 h-5 text-blue-400" />
                      <div className="text-white font-bold">{CONTACT_INFO.phone}</div>
                    </a>
                </div>
                
                {/* Email row */}
                <div className="mt-6 pt-6 border-t border-slate-700 text-center">
                    <a href={`mailto:${CONTACT_INFO.email}`} className="text-slate-400 hover:text-white flex items-center justify-center gap-2 transition">
                      <EnvelopeIcon className="w-4 h-4" />
                      {CONTACT_INFO.email}
                    </a>
                </div>
             </div>
          </div>

          {/* Right: Core Competencies (No Biography Text) */}
          <div className="pt-4">
             <h2 className="text-blue-500 font-bold tracking-widest uppercase text-sm mb-3">{t.subtitle}</h2>
             <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-10">{t.title}</h3>
             
             {/* Feature Cards Grid */}
             <div className="grid gap-6">
               {t.features.map((feature, idx) => (
                 <div key={idx} className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-slate-600 transition hover:bg-slate-800">
                    <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                       <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                       {feature.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed pl-4 border-l border-slate-700 ml-1">
                      {feature.desc}
                    </p>
                 </div>
               ))}
             </div>

             {/* Stats Row */}
             <div className="grid grid-cols-3 gap-4 mt-10">
                {t.stats.map((stat, idx) => (
                  <div key={idx} className="bg-slate-800 rounded-lg p-4 text-center border border-slate-700">
                    <div className="text-blue-400 font-bold text-lg mb-1">{stat.value}</div>
                    <div className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">{stat.label}</div>
                  </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}