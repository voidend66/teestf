import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqsData } from '../data/doctorData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(faqsData[0].id);

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#2a5c8c] text-xs sm:text-sm font-extrabold tracking-wider uppercase bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            پاسخ به ابهامات متداول
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e3a8a] mt-3 mb-3">
            سؤالات متداول بیماران
          </h2>
          <div className="flex items-center justify-center gap-1.5 mx-auto mb-4">
            <div className="w-12 h-1 bg-amber-500 rounded-full" />
            <div className="w-2 h-1 bg-amber-400 rounded-full" />
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            پاسخ‌های تخصصی دکتر اکبر شهیدی پیام به پرتکرارترین سؤالات جراحی و ایمپلنت
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 text-right">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  isOpen
                    ? 'border-[#1e3a8a] bg-blue-50/20 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 flex items-center justify-between gap-4 text-right focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1e3a8a] flex items-center justify-center shrink-0">
                      <HelpCircle className="w-4 h-4 text-[#d4af37]" />
                    </div>
                    <span className="font-extrabold text-sm sm:text-base text-[#1e3a8a]">
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-[#1e3a8a]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-700 text-xs sm:text-sm leading-relaxed border-t border-slate-100 animate-in fade-in duration-200">
                    <p className="pr-11">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
