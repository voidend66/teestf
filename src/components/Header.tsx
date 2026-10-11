import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Clock, Menu, X, MapPin } from 'lucide-react';
import { doctorProfile } from '../data/doctorData';
import { scrollToElement } from '../utils/scroll';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

interface HeaderProps {
  onOpenAppointment: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAppointment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'خانه', href: '#home' },
    { label: 'درباره دکتر', href: '#about' },
    { label: 'خدمات تخصصی', href: '#services' },
    { label: 'گالری نتایج', href: '#gallery' },
    { label: 'مقالات علمی', href: '#articles' },
    { label: 'سؤالات متداول', href: '#faq' },
    { label: 'اطلاعات تماس', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Notification / Contact Bar */}
      <div className="bg-[#1e3a8a] text-white text-xs py-1.5 px-3 sm:px-4 border-b border-blue-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-4 overflow-hidden">
            <a
              href={`tel:${doctorProfile.phoneLandline}`}
              className="flex items-center gap-1 hover:text-[#d4af37] transition-colors whitespace-nowrap text-[11px] sm:text-xs"
              title="تماس با مطب"
            >
              <Phone className="w-3 h-3 text-[#d4af37] shrink-0" />
              <span className="font-semibold">{doctorProfile.phoneLandline}</span>
            </a>
            <span className="text-blue-300">|</span>
            <a
              href={`tel:${doctorProfile.phoneMobile}`}
              className="flex items-center gap-1 hover:text-[#d4af37] transition-colors whitespace-nowrap text-[11px] sm:text-xs"
              title="شماره همراه مشاوره"
            >
              <span className="font-semibold">{doctorProfile.phoneMobile}</span>
            </a>
            <span className="hidden md:inline text-blue-300">|</span>
            <div className="hidden md:flex items-center gap-1.5 text-blue-200">
              <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>شنبه تا چهارشنبه: ۱۶ الی ۲۰</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={doctorProfile.neshanMapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 text-blue-200 hover:text-white transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>تهران، پاسداران، خیابان دولت</span>
            </a>
            <a
              href={`https://instagram.com/${doctorProfile.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:opacity-90 text-white px-2.5 py-1 rounded text-[11px] sm:text-xs font-bold transition-all shadow-xs whitespace-nowrap"
              title="اینستاگرام رسمی دکتر اکبر شهیدی پیام"
            >
              <InstagramIcon className="w-3.5 h-3.5 shrink-0" />
              <span>اینستاگرام مطب</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`bg-white/95 backdrop-blur-md transition-all duration-300 border-b ${
          isScrolled ? 'shadow-md py-2 sm:py-2.5 border-slate-200' : 'py-2 sm:py-3.5 border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
          {/* Brand Logo & Name */}
          <a
            href="#home"
            onClick={(e) => scrollToElement('home', e)}
            className="flex items-center gap-2 sm:gap-3 group min-w-0"
          >
            <div className="w-10 h-10 sm:w-13 sm:h-13 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center p-1 group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              <img
                src="https://ik.imagekit.io/arp6e31rm/unnamed.jpg?updatedAt=1749769657359"
                alt="لوگوی رسمی دکتر اکبر شهیدی پیام"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>
            <div className="flex flex-col justify-center min-w-0">
              <span className="block text-[13.5px] sm:text-[18px] font-black tracking-tight text-[#162d6b] group-hover:text-[#2563eb] transition-colors leading-tight whitespace-nowrap">
                {doctorProfile.name}
              </span>
              <span className="block text-[10px] sm:text-[12px] text-slate-600 font-semibold tracking-tight mt-0.5 whitespace-nowrap">
                <span className="sm:hidden">متخصص جراحی فک و صورت</span>
                <span className="hidden sm:inline">متخصص جراحی دهان، فک و صورت</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-7">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scrollToElement(item.href, e)}
                className="text-slate-700 hover:text-amber-600 font-semibold text-sm transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-500 hover:after:w-full after:transition-all cursor-pointer whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenAppointment}
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-3 sm:px-4.5 py-1.5 sm:py-2.5 rounded-xl shadow-xs hover:shadow-sm transition-all text-xs sm:text-sm active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-slate-950" />
              <span className="sm:hidden">نوبت‌دهی</span>
              <span className="hidden sm:inline">نوبت‌دهی آنلاین</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="منوی سایت"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  scrollToElement(item.href, e);
                  setMobileMenuOpen(false);
                }}
                className="block py-2.5 px-3 rounded-lg text-slate-800 hover:bg-blue-50 hover:text-[#1e3a8a] font-bold text-sm transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`https://instagram.com/${doctorProfile.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 text-pink-700 font-bold text-sm border border-pink-100 hover:opacity-90"
              >
                <InstagramIcon className="w-4 h-4 text-pink-600" />
                <span>صفحه اینستاگرام دکتر: {doctorProfile.instagram}@</span>
              </a>
              <a
                href={`tel:${doctorProfile.phoneLandline}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-50 text-[#1e3a8a] font-bold text-sm"
              >
                <Phone className="w-4 h-4 text-[#d4af37]" />
                <span>تماس با تلفن مطب: {doctorProfile.phoneLandline}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
