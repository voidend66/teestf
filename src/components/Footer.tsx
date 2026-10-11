import React from 'react';
import { MapPin, Phone, Mail, Code2 } from 'lucide-react';
import { doctorProfile } from '../data/doctorData';
import { InstagramIcon } from './InstagramIcon';
import { scrollToElement } from '../utils/scroll';

interface FooterProps {
  onSelectServiceSlug: (slug: string) => void;
  onOpenApiDocs?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectServiceSlug, onOpenApiDocs }) => {
  return (
    <footer className="bg-[#101e4a] text-white pt-14 pb-8 border-t border-blue-900 text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Doctor Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-md overflow-hidden shrink-0 border border-slate-200">
                <img
                  src={doctorProfile.logoUrl || "https://i.ibb.co/RGJFYgmF/logo.png"}
                  alt="لوگوی رسمی دکتر اکبر شهیدی پیام"
                  className="w-full h-full object-contain transform scale-105"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black leading-tight text-white">
                  {doctorProfile.name}
                </h3>
                <p className="text-xs text-blue-200 mt-0.5">
                  متخصص جراحی دهان، فک و صورت
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              «{doctorProfile.motto}»
            </p>

            <div className="text-xs text-blue-200/80 leading-relaxed">
              عضو هیئت علمی دانشگاه و دارای بورد تخصصی جراحی دهان، فک و صورت از دانشگاه علوم پزشکی مشهد.
            </div>

            {/* Instagram Social */}
            <div className="pt-2">
              <a
                href={`https://www.instagram.com/${doctorProfile.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#405DE6] via-[#5851DB] to-[#E1306C] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm hover:opacity-95 transition-opacity"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>اینستاگرام: @{doctorProfile.instagram}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white border-b-2 border-[#d4af37] pb-2 inline-block">
              دسترسی سریع
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <a
                  href="#home"
                  onClick={(e) => scrollToElement('home', e)}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  خانه
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => scrollToElement('about', e)}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  درباره دکتر
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => scrollToElement('services', e)}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  خدمات تخصصی
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => scrollToElement('gallery', e)}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  گالری نتایج و مقایسه
                </a>
              </li>
              <li>
                <a
                  href="#articles"
                  onClick={(e) => scrollToElement('articles', e)}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  مقالات و راهنماهای جراحی
                </a>
              </li>
              <li>
                <a
                  href="#appointment"
                  onClick={(e) => scrollToElement('appointment', e)}
                  className="hover:text-[#d4af37] transition-colors cursor-pointer"
                >
                  رزرو نوبت آنلاین
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialized Procedures */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white border-b-2 border-[#d4af37] pb-2 inline-block">
              خدمات تخصصی
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => onSelectServiceSlug('digital-implant')}
                  className="hover:text-[#d4af37] transition-colors text-right cursor-pointer"
                >
                  ایمپلنت دیجیتال ۳ بعدی
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectServiceSlug('maxillofacial-surgery')}
                  className="hover:text-[#d4af37] transition-colors text-right cursor-pointer"
                >
                  جراحی فک و صورت (ارتوگناتیک)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectServiceSlug('sinus-lift')}
                  className="hover:text-[#d4af37] transition-colors text-right cursor-pointer"
                >
                  سینوس لیفت و پیوند استخوان
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onSelectServiceSlug('wisdom-teeth')}
                  className="hover:text-[#d4af37] transition-colors text-right cursor-pointer"
                >
                  جراحی دندان عقل نهفته
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact details */}
          <div className="space-y-3">
            <h4 className="text-sm font-black text-white border-b-2 border-[#d4af37] pb-2 inline-block">
              اطلاعات مطب
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{doctorProfile.clinicAddress}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href={`tel:${doctorProfile.phoneLandline}`} className="hover:text-[#d4af37]">
                  {doctorProfile.phoneLandline}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <a href={`tel:${doctorProfile.phoneMobile}`} className="hover:text-[#d4af37]">
                  {doctorProfile.phoneMobile}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{doctorProfile.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-900/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© ۱۴۰۳ کلیه حقوق این وبسایت متعلق به مطب دکتر اکبر شهیدی پیام می‌باشد.</p>
          
          <div className="flex items-center gap-3">
            {onOpenApiDocs && (
              <button
                type="button"
                onClick={onOpenApiDocs}
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-amber-400 transition-colors text-[11px] cursor-pointer"
                title="مستندات و تنظیمات اتصال پنل مدیریت"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>اتصال پنل مدیریت</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
