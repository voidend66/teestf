import React from 'react';
import { Calendar, Phone, Award, ArrowDownLeft, CheckCircle2 } from 'lucide-react';
import { doctorProfile } from '../data/doctorData';
import { scrollToElement } from '../utils/scroll';

interface HeroProps {
  onOpenAppointment: () => void;
  doctorPhoto?: string;
  onUpdateDoctorPhoto?: (photoUrl: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAppointment,
  doctorPhoto = ''
}) => {
  const currentPhoto = doctorPhoto || doctorProfile.doctorPhotoUrl;

  return (
    <section id="home" className="relative bg-gradient-to-br from-[#0c1836] via-[#162d66] to-[#1e3a8a] text-white py-14 sm:py-20 lg:py-24 overflow-hidden">
      {/* Subtle geometric medical mesh overlay */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center">
          
          {/* Main Content Column (7 cols on lg, 6 cols on xl) */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-6 text-right">
            
            {/* Board Certification Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-amber-400/40 text-amber-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-md leading-relaxed">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>دارای بورد تخصصی جراحی فک و صورت • عضو هیئت علمی دانشگاه</span>
            </div>

            {/* Doctor Name & Heading */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.2]">
                {doctorProfile.name}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-100/95">
                متخصص جراحی دهان، فک و صورت و ایمپلنتولوژیست
              </p>
              {/* Balanced Golden Accent Underline */}
              <div className="flex items-center gap-2 pt-1">
                <div className="w-24 h-1.5 bg-gradient-to-l from-amber-400 to-amber-500 rounded-full" />
                <div className="w-3 h-1.5 bg-amber-400/60 rounded-full" />
                <div className="w-1.5 h-1.5 bg-amber-400/40 rounded-full" />
              </div>
            </div>

            {/* Motto & Narrative */}
            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-2xl font-normal">
              «{doctorProfile.motto}» — پیشرفته‌ترین متدهای جراحی کم‌تهاجمی، اسکن ۳ بعدی داخل دهانی، سرجیکال گاید اختصاصی و بالاترین استانداردهای استریلیزاسیون بیمارستانی.
            </p>

            {/* Core Pillars / Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-white/95 bg-white/5 p-2 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>ایمپلنت دیجیتال با دقت میلی‌متری</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-white/95 bg-white/5 p-2 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>جراحی‌های ارتوگناتیک و اصلاح فک</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-white/95 bg-white/5 p-2 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>سینوس لیفت و پیوند استخوان فک بالا</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-white/95 bg-white/5 p-2 rounded-xl border border-white/10">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>جراحی ایمن دندان‌های عقل نهفته</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <button
                type="button"
                onClick={onOpenAppointment}
                className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl shadow-lg shadow-amber-400/25 transition-all transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-slate-950" />
                <span>رزرو نوبت آنلاین</span>
              </button>

              <a
                href={`tel:${doctorProfile.phoneLandline}`}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold px-5 py-3.5 rounded-xl transition-all text-sm sm:text-base hover:border-amber-400/50"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>تماس با مطب ({doctorProfile.phoneLandline})</span>
              </a>

              <a
                href="#services"
                onClick={(e) => scrollToElement('services', e)}
                className="inline-flex items-center gap-1.5 text-blue-200 hover:text-white font-medium text-sm transition-colors py-2 px-1 cursor-pointer"
              >
                <span>مشاهده خدمات</span>
                <ArrowDownLeft className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Doctor Photo Showcase Column (5 cols on lg, 6 cols on xl) */}
          <div className="lg:col-span-5 xl:col-span-6 flex flex-col items-center justify-center pt-2 lg:pt-0">
            <div className="relative w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[490px] xl:max-w-[530px] mx-auto">
              
              {/* Luxury Ambient Glow Behind Photo */}
              <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/25 via-blue-500/30 to-indigo-500/25 rounded-[3.5rem] blur-3xl transform scale-110 pointer-events-none" />

              {/* Decorative Subtle Corner Accents */}
              <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-amber-400/70 rounded-tr-3xl pointer-events-none z-10" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-amber-400/70 rounded-bl-3xl pointer-events-none z-10" />

              {/* Floating Top Badge: Board Certified */}
              <div className="absolute -top-3.5 right-6 z-20 bg-slate-950/90 backdrop-blur-md border border-amber-400/50 text-amber-300 px-4 py-1.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>دارای بورد تخصصی جراحی فک و صورت</span>
              </div>

              {/* Outer Elegant Glass Frame */}
              <div className="relative p-3 sm:p-4 rounded-[2.5rem] bg-gradient-to-b from-white/20 via-white/10 to-white/5 border border-white/25 shadow-2xl backdrop-blur-md">
                
                {/* Inner Image Container - Large, Clear, and Clean */}
                <div className="relative w-full aspect-[3.7/4] sm:aspect-[3.8/4] rounded-[2rem] overflow-hidden bg-slate-900 shadow-inner group">
                  <img
                    src={currentPhoto}
                    alt={doctorProfile.name}
                    className="w-full h-full object-cover object-[center_12%] transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  {/* Ultra-soft vignette border for photographic elegance */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/15 rounded-[2rem] pointer-events-none" />
                </div>

              </div>

              {/* Two Premium Stats Cards Below Photo to Perfectly Fill Space */}
              <div className="grid grid-cols-2 gap-3.5 mt-4 w-full">
                <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-3.5 text-center border border-white/15 shadow-xl transition-all">
                  <span className="block text-2xl sm:text-3xl font-black text-amber-300">۱۴+ سال</span>
                  <span className="text-xs text-blue-100 font-semibold mt-0.5 block">سابقه جراحی تخصصی</span>
                </div>
                <div className="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-2xl p-3.5 text-center border border-white/15 shadow-xl transition-all">
                  <span className="block text-2xl sm:text-3xl font-black text-amber-300">۱۰۰٪</span>
                  <span className="text-xs text-blue-100 font-semibold mt-0.5 block">برنامه‌ریزی ۳ بعدی دیجیتال</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
