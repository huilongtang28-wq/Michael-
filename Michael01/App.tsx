import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ContainerTool from './components/ContainerTool';
import PriceCalculator from './components/PriceCalculator';
import ServiceCases from './components/ServiceCases';
import ContactFooter from './components/ContactFooter';

function App() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500 selection:text-white">
      <Navbar lang={lang} setLang={setLang} scrollTo={scrollToSection} />
      
      <main>
        <Hero lang={lang} scrollTo={scrollToSection} />
        
        <About lang={lang} />
        
        <Services lang={lang} />
        
        {/* Tool Section - Keep lighter background for the tool to stand out, but not stark white container */}
        <section id="tool" className="py-24 bg-slate-900 border-b border-slate-800 relative">
           {/* Subtle background pattern */}
           <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
           
          <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-extrabold text-white">
                {lang === 'zh' ? '智能装箱模拟' : 'Smart Container Loading'}
              </h2>
              <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
                {lang === 'zh' 
                  ? '使用我们的 3D 可视化工具，精准计算货物装载量，优化您的物流成本。' 
                  : 'Optimize your logistics costs with our precision 3D loading calculator.'}
              </p>
            </div>
            
            {/* Embedded Tool Container */}
            <div className="h-[800px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-700/50">
              <ContainerTool />
            </div>
          </div>
        </section>

        {/* Info Grid Section */}
        <section className="py-24 bg-slate-950 border-t border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <PriceCalculator lang={lang} />
              <ServiceCases lang={lang} />
            </div>
          </div>
        </section>
      </main>

      <ContactFooter lang={lang} />
    </div>
  );
}

export default App;