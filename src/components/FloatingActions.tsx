import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, Phone, X } from 'lucide-react';
import { doctorProfile } from '../data/doctorData';
import { InstagramIcon } from './InstagramIcon';

export const FloatingActions: React.FC = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Back to Top (Compact, only when scrolled) */}
      {showTopBtn && (
        <button
          type="button"
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white/95 text-[#1e3a8a] border border-slate-200 shadow-lg flex items-center justify-center hover:bg-[#1e3a8a] hover:text-white transition-all transform hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
          aria-label="بازگشت به بالای صفحه"
          title="بازگشت به بالای صفحه"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Expanded Quick Contact Menu Items */}
      {isMenuOpen && (
        <div className="flex flex-col items-end gap-2 mb-1 animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${doctorProfile.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-full shadow-lg transition-all transform hover:scale-105 text-xs font-bold whitespace-nowrap"
            title="ارتباط در واتساپ"
          >
            <span>واتساپ مطب</span>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-white" />
            </div>
          </a>

          {/* Instagram */}
          <a
            href={`https://www.instagram.com/${doctorProfile.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-[#405DE6] via-[#5851DB] to-[#E1306C] text-white px-3.5 py-2 rounded-full shadow-lg transition-all transform hover:scale-105 text-xs font-bold whitespace-nowrap"
            title="اینستاگرام دکتر شهیدی"
          >
            <span>اینستاگرام</span>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <InstagramIcon className="w-4 h-4 text-white" />
            </div>
          </a>

          {/* Phone Call */}
          <a
            href={`tel:${doctorProfile.phoneLandline}`}
            className="flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#122457] text-white px-3.5 py-2 rounded-full shadow-lg transition-all transform hover:scale-105 text-xs font-bold whitespace-nowrap"
            title="تماس با مطب"
          >
            <span>تماس تلفنی</span>
            <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </a>
        </div>
      )}

      {/* Main Single Speed Dial Trigger */}
      <button
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-white ${
          isMenuOpen
            ? 'bg-slate-800 text-white rotate-90'
            : 'bg-emerald-600 hover:bg-emerald-500 text-white'
        }`}
        aria-label={isMenuOpen ? 'بستن منوی ارتباطی' : 'راه‌های ارتباط با مطب'}
        title={isMenuOpen ? 'بستن منو' : 'راه‌های ارتباط با مطب'}
      >
        {isMenuOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
};
