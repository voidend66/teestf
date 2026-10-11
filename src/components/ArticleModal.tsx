import React, { useEffect } from 'react';
import { X, Calendar, Clock, CheckCircle2, Phone } from 'lucide-react';
import { ProcedureArticle } from '../types';
import { doctorProfile } from '../data/doctorData';

interface ArticleModalProps {
  article: ProcedureArticle | null;
  onClose: () => void;
  onBookAppointment: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose, onBookAppointment }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#1e3a8a] to-[#2a5c8c] text-white p-4 sm:p-6 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#d4af37] font-bold mb-1">
              <span className="bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                {article.category}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-blue-200">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-blue-200">
                <Calendar className="w-3.5 h-3.5" />
                {article.publishDate}
              </span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black leading-snug">
              {article.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body (Scrollable) */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6 text-slate-800 text-right leading-relaxed">
          {/* Hero Image if available */}
          {article.heroImage && (
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
              <img
                src={article.heroImage}
                alt={article.title}
                className="w-full max-h-72 object-cover object-center"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              {article.imageCaption && (
                <p className="text-xs text-slate-500 p-2.5 bg-slate-100/80 text-center font-medium">
                  {article.imageCaption}
                </p>
              )}
            </div>
          )}

          {/* Article Summary Quote */}
          {article.summary && (
            <div className="p-4 rounded-xl bg-blue-50/70 border-r-4 border-[#2a5c8c] text-sm sm:text-base text-[#1e3a8a] font-medium leading-relaxed">
              {article.summary}
            </div>
          )}

          {/* Structured Sections */}
          {article.sections.map((sec, idx) => (
            <section key={idx} className="space-y-3 pt-2">
              <h4 className="text-lg sm:text-xl font-extrabold text-[#1e3a8a] border-b border-slate-200 pb-2">
                {sec.title}
              </h4>

              {/* Paragraphs */}
              {sec.paragraphs?.map((p, pIdx) => (
                <p key={pIdx} className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {p}
                </p>
              ))}

              {/* List Items / Advantages / Indications */}
              {sec.listItems && (
                <div className="grid grid-cols-1 gap-2.5 pt-1">
                  {sec.listItems.map((item, lIdx) => (
                    <div
                      key={lIdx}
                      className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm text-slate-700">
                        {item.title && (
                          <strong className="font-bold text-[#1e3a8a] ml-1">
                            {item.title}:
                          </strong>
                        )}
                        <span>{item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Ordered Clinical Steps */}
              {sec.steps && (
                <div className="space-y-3 pt-2">
                  {sec.steps.map((st) => (
                    <div
                      key={st.stepNum}
                      className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {st.stepNum}
                      </div>
                      <div>
                        <h5 className="font-extrabold text-sm text-[#1e3a8a]">
                          {st.title}
                        </h5>
                        <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}

          {/* Doctor Advisory Notice */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-1">
            <p className="font-bold">توصیه دکتر اکبر شهیدی پیام:</p>
            <p className="text-amber-800 leading-relaxed">
              طرح درمان نهایی برای هر بیمار پس از معاینه بالینی دقیق و بررسی اسکن سه‌بعدی فک تعیین می‌شود. جهت اطلاعات بیشتر و مشاوره تخصصی در رابطه با این روش درمانی، می‌توانید از طریق راه‌های ارتباطی زیر با مطب در ارتباط باشید.
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <a
              href={`tel:${doctorProfile.phoneLandline}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e3a8a] bg-white border border-slate-200 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>تماس: {doctorProfile.phoneLandline}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 mr-auto">
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookAppointment();
              }}
              className="inline-flex items-center gap-1.5 bg-[#d4af37] hover:bg-[#b89628] text-slate-950 font-bold px-4 py-2 rounded-lg text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>رزرو وقت برای این جراحی</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              بستن پنجره
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
