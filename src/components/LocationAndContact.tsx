import React from 'react';
import { MapPin, Phone, Mail, Navigation, ExternalLink, MessageCircle } from 'lucide-react';
import { doctorProfile } from '../data/doctorData';

export const LocationAndContact: React.FC = () => {
  return (
    <section id="contact" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <span className="text-[#2a5c8c] text-sm font-extrabold tracking-wide uppercase">
            مسیریابی و ارتباط
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e3a8a] mt-1 mb-3">
            موقعیت مکانی و اطلاعات تماس مطب
          </h2>
          <div className="w-20 h-1 bg-[#d4af37] mx-auto rounded-full mb-4" />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            دسترسی آسان از طریق بزرگراه‌های شهید صیاد شیرازی، پاسداران و خیابان شریعتی (دولت)
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Contact Details Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4 text-right">
            
            {/* Address */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#1e3a8a] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-[#1e3a8a] text-sm sm:text-base">نشانی مطب</h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {doctorProfile.clinicAddress}
                </p>
              </div>
            </div>

            {/* Phones */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#1e3a8a] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-extrabold text-[#1e3a8a] text-sm sm:text-base">شماره‌های تماس</h3>
                <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
                  <a
                    href={`tel:${doctorProfile.phoneLandline}`}
                    className="font-bold text-[#1e3a8a] hover:text-[#d4af37] transition-colors"
                  >
                    تلفن مطب: {doctorProfile.phoneLandline}
                  </a>
                  <span className="text-slate-300">|</span>
                  <a
                    href={`tel:${doctorProfile.phoneMobile}`}
                    className="font-bold text-[#1e3a8a] hover:text-[#d4af37] transition-colors"
                  >
                    همراه: {doctorProfile.phoneMobile}
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#1e3a8a] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-extrabold text-[#1e3a8a] text-sm sm:text-base">پست الکترونیک</h3>
                <a
                  href={`mailto:${doctorProfile.email}`}
                  className="text-xs sm:text-sm text-slate-600 hover:text-[#1e3a8a] font-medium"
                >
                  {doctorProfile.email}
                </a>
              </div>
            </div>

            {/* Navigation Buttons Row */}
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={doctorProfile.neshanMapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 bg-[#1e3a8a] hover:bg-[#122457] text-white font-bold py-3 px-5 rounded-xl shadow-md transition-all text-xs sm:text-sm active:scale-95"
              >
                <Navigation className="w-4 h-4 text-amber-300" />
                <span>مسیریابی با اپلیکیشن نشان</span>
              </a>

              <a
                href={`https://wa.me/${doctorProfile.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-5 rounded-xl shadow-md transition-all text-xs sm:text-sm active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>واتساپ مشاوره</span>
              </a>
            </div>

          </div>

          {/* Map Preview Graphic & Quick Directions (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100 relative group h-80 sm:h-96">
              {/* Map Illustration / Visual */}
              <div className="w-full h-full bg-slate-200 relative overflow-hidden flex items-center justify-center">
                {/* Visual grid / streets styling */}
                <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
                
                {/* Roads illustration */}
                <div className="absolute w-full h-8 bg-slate-300 top-1/2 -translate-y-1/2 rotate-6 shadow-sm flex items-center justify-center">
                  <span className="text-[11px] font-bold text-slate-600 tracking-wider">خیابان کلاهدوز (دولت)</span>
                </div>
                <div className="absolute h-full w-8 bg-slate-300 left-1/3 -rotate-12 shadow-sm flex items-center justify-center">
                  <span className="text-[11px] font-bold text-slate-600 tracking-wider -rotate-90 whitespace-nowrap">خیابان پاسداران</span>
                </div>

                {/* Location Marker Pin */}
                <div className="relative z-10 flex flex-col items-center animate-bounce">
                  <div className="bg-[#1e3a8a] text-white p-3 rounded-full shadow-2xl border-4 border-white flex items-center justify-center">
                    <MapPin className="w-8 h-8 text-[#d4af37]" />
                  </div>
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg shadow-md border border-slate-200 mt-2 text-center">
                    <span className="font-black text-xs text-[#1e3a8a] block">مطب دکتر اکبر شهیدی پیام</span>
                    <span className="text-[10px] text-slate-500 font-semibold">ساختمان پزشکان سینا، واحد ۹</span>
                  </div>
                </div>

                {/* Overlay Action */}
                <div className="absolute bottom-4 right-4 left-4 sm:left-auto flex items-center gap-2">
                  <a
                    href={doctorProfile.neshanMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md hover:bg-white text-slate-900 px-4 py-2 rounded-xl text-xs font-bold shadow-md border border-slate-200 transition-all hover:scale-105"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#1e3a8a]" />
                    <span>مشاهده مکان دقیق در نقشه نشان</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
