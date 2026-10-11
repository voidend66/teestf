import React from 'react';
import { Award, GraduationCap, Globe2, Microscope, CheckCircle2, Calendar } from 'lucide-react';
import { doctorProfile } from '../data/doctorData';

interface AboutDoctorProps {
  onOpenAppointment: () => void;
  doctorPhoto?: string;
  onUpdateDoctorPhoto?: (photoUrl: string) => void;
}

export const AboutDoctor: React.FC<AboutDoctorProps> = ({
  onOpenAppointment
}) => {
  const credentials = [
    {
      title: '۱۴ سال تجربه تخصصی',
      desc: 'بیش از یک دهه جراحی‌های موفق فک، صورت و کاشت ایمپلنت‌های پیشرفته',
      icon: Award
    },
    {
      title: 'عضو هیئت علمی دانشگاه',
      desc: 'تدریس آکادمیک و انتقال دانش جراحی‌های نوین به جامعه دندانپزشکی',
      icon: GraduationCap
    },
    {
      title: 'همکاری با مراکز بین‌المللی',
      desc: 'حضور مستمر در کنگره‌ها، سمپوزیوم‌ها و کارگاه‌های جراحی معتبر جهان',
      icon: Globe2
    },
    {
      title: 'تکنیک‌های پیشرفته و کم‌تهاجمی',
      desc: 'استفاده از اسکنرهای سه‌بعدی، پرینترهای سرجیکال گاید و پیزوسرجری',
      icon: Microscope
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[#2a5c8c] text-xs sm:text-sm font-extrabold tracking-wider uppercase bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            سوابق علمی و بالینی
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e3a8a] mt-3 mb-3">
            درباره دکتر اکبر شهیدی پیام
          </h2>
          <div className="flex items-center justify-center gap-1.5 mx-auto">
            <div className="w-12 h-1 bg-amber-500 rounded-full" />
            <div className="w-2 h-1 bg-amber-400 rounded-full" />
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Visual / Doctor Photo & Badges (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-[400px]">
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xl text-center relative overflow-hidden">
                
                {/* Official Clinic Logo Frame - Enlarged & High Impact */}
                <div className="relative mx-auto mb-5">
                  <div className="w-full aspect-square max-w-[290px] sm:max-w-[320px] mx-auto rounded-2xl bg-white border-2 border-amber-400/60 shadow-lg overflow-hidden relative group p-3 sm:p-4 flex items-center justify-center">
                    <img
                      src="https://ik.imagekit.io/arp6e31rm/logo.png"
                      alt="لوگوی رسمی مطب دکتر اکبر شهیدی پیام"
                      className="w-full h-full object-contain transform scale-120 sm:scale-125 transition-transform duration-500 group-hover:scale-130"
                      loading="lazy"
                    />
                  </div>
                </div>

                <h3 className="text-xl font-black text-[#1e3a8a]">{doctorProfile.name}</h3>
                <p className="text-xs text-slate-600 font-bold mt-1 mb-3">
                  متخصص جراحی دهان، فک و صورت و ایمپلنتولوژیست
                </p>

                <div className="bg-white rounded-xl p-3 text-xs text-slate-700 leading-relaxed border border-slate-200/80 shadow-xs font-medium">
                  <span className="font-bold text-[#1e3a8a]">دارای بورد تخصصی</span> از دانشگاه علوم پزشکی مشهد
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex justify-around text-center">
                  <div>
                    <span className="block text-2xl font-black text-amber-600">۱۴+</span>
                    <span className="text-[11px] text-slate-500 font-semibold">سال سابقه تخصصی</span>
                  </div>
                  <div className="w-px bg-slate-200 h-9 my-auto" />
                  <div>
                    <span className="block text-2xl font-black text-[#1e3a8a]">۵۰۰۰+</span>
                    <span className="text-[11px] text-slate-500 font-semibold">جراحی موفق</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bio & Credentials Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#1e3a8a] mb-4">
                بیوگرافی حرفه‌ای و اصول درمانی
              </h3>
              {doctorProfile.bio.map((paragraph, index) => (
                <p key={index} className="text-slate-700 text-sm sm:text-base leading-relaxed mb-3">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Credential Cards (Icons on the right side in RTL flow) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {credentials.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-right shadow-xs"
                  >
                    <div className="w-11 h-11 rounded-xl bg-blue-100/80 text-[#1e3a8a] flex items-center justify-center shrink-0 mt-0.5 border border-blue-200/60">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-extrabold text-slate-900 text-sm sm:text-[15px]">{item.title}</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Statement & CTA */}
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>طرح درمان انفرادی بر اساس رادیوگرافی ۳ بعدی CBCT و بیومکانیک اختصاصی</span>
              </div>

              <button
                type="button"
                onClick={onOpenAppointment}
                className="inline-flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#122457] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-blue-900/10 cursor-pointer whitespace-nowrap active:scale-95"
              >
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>درخواست ویزیت حضوری</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
