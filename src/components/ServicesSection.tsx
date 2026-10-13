import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Calendar } from 'lucide-react';
import { servicesData, procedureArticles } from '../data/doctorData';
import { ServiceItem, ProcedureArticle } from '../types';
import { getServiceImageUrl, DEFAULT_MEDICAL_FALLBACK } from '../utils/imageHelper';

interface ServicesSectionProps {
  onSelectArticle: (article: ProcedureArticle) => void;
  onBookService: (serviceTitle: string) => void;
  services?: ServiceItem[];
  articles?: ProcedureArticle[];
}

const getServiceCodeAndCategory = (id: string, index: number) => {
  switch (id) {
    case 'digital-implant':
      return { code: '۰۱', category: 'ایمپلنتولوژی دیجیتال', subCategory: 'کاشت دندان' };
    case 'maxillofacial-surgery':
      return { code: '۰۲', category: 'جراحی فک و صورت', subCategory: 'ارتوگناتیک' };
    case 'sinus-lift':
      return { code: '۰۳', category: 'تقویت استخوان', subCategory: 'فک بالا' };
    case 'wisdom-teeth':
      return { code: '۰۴', category: 'جراحی دندان عقل', subCategory: 'بدون درد' };
    case 'bone-graft':
      return { code: '۰۵', category: 'بازسازی استخوان', subCategory: 'پیوند لثه' };
    case 'facial-aesthetics':
      return { code: '۰۶', category: 'زیبایی چانه و فک', subCategory: 'ژنیوپلاستی' };
    default:
      return { code: `۰${index + 1}`, category: 'خدمات تخصصی', subCategory: 'جراحی فک' };
  }
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectArticle, onBookService, services, articles }) => {
  const displayServices = services && services.length > 0 ? services : servicesData;
  const [activeFilter, setActiveFilter] = useState<'all' | 'implant' | 'surgery'>('all');

  const filteredServices = displayServices.filter((service) => {
    if (activeFilter === 'implant') {
      return ['digital-implant', 'sinus-lift', 'bone-graft'].includes(service.id);
    }
    if (activeFilter === 'surgery') {
      return ['maxillofacial-surgery', 'wisdom-teeth', 'facial-aesthetics'].includes(service.id);
    }
    return true;
  });

  const handleCardClick = (service: ServiceItem) => {
    const list = articles && articles.length > 0 ? articles : procedureArticles;
    const matched = list.find((art) => art.slug === service.slug) || list[0];
    onSelectArticle(matched);
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1e3a8a] tracking-wide mb-2">
            <span>دپارتمان‌های درمانی و جراحی</span>
            <span aria-hidden="true" className="text-amber-500">·</span>
            <span>مطب دکتر اکبر شهیدی پیام</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e3a8a] mb-3">
            خدمات تخصصی جراحی دهان، فک و صورت
          </h2>
          <div className="flex items-center justify-center gap-1.5 mx-auto mb-4">
            <div className="w-12 h-1 bg-amber-500 rounded-full" />
            <div className="w-2 h-1 bg-amber-400 rounded-full" />
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            تمامی جراحی‌ها با روش‌های کم‌تهاجمی، بی‌حسی عمیق و طراحی دقیق سه‌بعدی برای بهبودی سریع و بدون درد مراجعین انجام می‌شود.
          </p>

          {/* Interactive Department Filter Controls */}
          <div className="mt-8 inline-flex items-center p-1.5 bg-slate-200/80 rounded-xl shadow-xs text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-white text-[#1e3a8a] shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              همه خدمات ({displayServices.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('implant')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeFilter === 'implant'
                  ? 'bg-white text-[#1e3a8a] shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              کاشت دندان و پیوند استخوان
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('surgery')}
              className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                activeFilter === 'surgery'
                  ? 'bg-white text-[#1e3a8a] shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              جراحی فک، دندان عقل و زیبایی
            </button>
          </div>
        </div>

        {/* Architectural Department Matrix */}
        <div className="bg-slate-200/90 rounded-2xl overflow-hidden border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
          {filteredServices.map((service, index) => {
            const meta = getServiceCodeAndCategory(service.id, index);

            return (
              <div
                key={service.id}
                className="bg-white p-5 sm:p-6 flex flex-col justify-between hover:bg-blue-50/20 transition-colors group relative text-right"
              >
                <div>
                  {/* Top Bar: Code & Category */}
                  <div className="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100">
                    <span className="font-mono text-xs font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60">
                      {meta.code}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                      <span>{meta.category}</span>
                      <span aria-hidden="true" className="text-slate-300">/</span>
                      <span className="text-[#1e3a8a] font-bold">{meta.subCategory}</span>
                    </div>
                  </div>

                  {/* Compact Clinical Photo Thumbnail */}
                  <div className="relative h-36 sm:h-40 rounded-xl overflow-hidden bg-slate-100 mb-4 border border-slate-100 shadow-xs">
                    <img
                      src={service.imageUrl || service.image || service.featuredImage || getServiceImageUrl(service)}
                      alt={service.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src !== DEFAULT_MEDICAL_FALLBACK) {
                          target.src = DEFAULT_MEDICAL_FALLBACK;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  </div>

                  {/* Title & Patient-Friendly Description */}
                  <div className="mb-3">
                    <h3 className="text-base sm:text-lg font-black text-[#1e3a8a] group-hover:text-[#2a5c8c] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1.5 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Patient-Centric Highlights List */}
                  <div className="space-y-2 py-2.5 border-t border-slate-100 my-2">
                    {service.highlights.slice(0, 3).map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Controls */}
                <div className="pt-3.5 mt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => handleCardClick(service)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#1e3a8a] hover:text-amber-600 transition-colors py-1 cursor-pointer"
                  >
                    <span>بررسی مراحل جراحی</span>
                    <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onBookService(service.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-amber-400 hover:bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg transition-all shadow-xs active:scale-95 cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-slate-950" />
                    <span>رزرو نوبت</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
