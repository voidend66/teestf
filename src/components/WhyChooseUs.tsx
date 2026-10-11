import React from 'react';
import { UserCheck, HeartHandshake, Cpu, Sparkles, PhoneCall } from 'lucide-react';
import { doctorProfile } from '../data/doctorData';

interface WhyChooseUsProps {
  onOpenAppointment: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenAppointment }) => {
  const pillars = [
    {
      title: 'تجربه و تخصص بالا',
      desc: 'بیش از ۱۴ سال سابقه جراحی موفق، عضویت در هیئت علمی و برخورداری از بورد تخصصی جراحی دهان، فک و صورت.',
      icon: UserCheck
    },
    {
      title: 'رویکرد بیمار محور و آرامش‌بخش',
      desc: 'اولویت اول ما، حذف استرس جراحی، ارتباط صادقانه با بیمار، ارزیابی کامل شرایط و ارائه کم‌دردترین متد درمانی است.',
      icon: HeartHandshake
    },
    {
      title: 'استفاده از پیشرفته‌ترین تکنولوژی روز',
      desc: 'اسکنرهای دیجیتال ۳ بعدی داخل دهانی، سرجیکال گایدهای پرینت شده، پیزوسرجری و بهترین بایومتریال‌های استخوانی.',
      icon: Cpu
    }
  ];

  return (
    <section className="bg-gradient-to-br from-[#122457] to-[#1e3a8a] text-white py-16 sm:py-20 relative overflow-hidden">
      {/* Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[#d4af37] text-sm font-extrabold tracking-wide uppercase">
            تمایز بالینی
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white mt-1 mb-4">
            چرا دکتر پیام شهیدی را انتخاب کنید؟
          </h2>
          <div className="w-20 h-1 bg-[#d4af37] mx-auto rounded-full mb-5" />
          <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
            با سال‌ها تجربه و تخصص در زمینه جراحی ایمپلنت و فک، دکتر شهیدی با ارائه بهترین خدمات و استفاده از جدیدترین تکنولوژی‌های دیجیتال، سلامت، عملکرد بهینه جویدن و لبخندی ماندگار را به شما هدیه می‌دهد.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((p, idx) => {
            const IconComponent = p.icon;
            return (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/15 hover:border-[#d4af37]/60 hover:bg-white/15 transition-all text-right space-y-4 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <IconComponent className="w-7 h-7" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={onOpenAppointment}
            className="flex items-center gap-2 bg-[#d4af37] hover:bg-[#b89628] text-slate-950 font-black px-8 py-3.5 rounded-full shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 text-sm sm:text-base cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-slate-950" />
            <span>دریافت مشاوره تخصصی</span>
          </button>

          <a
            href={`tel:${doctorProfile.phoneLandline}`}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-6 py-3.5 rounded-full transition-all text-sm sm:text-base"
          >
            <PhoneCall className="w-4 h-4 text-[#d4af37]" />
            <span>تماس مستقیم: {doctorProfile.phoneLandline}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
