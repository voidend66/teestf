import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { reviewsData } from '../data/doctorData';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <span className="text-[#2a5c8c] text-xs sm:text-sm font-extrabold tracking-wider uppercase bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            رضایت مراجعین
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e3a8a] mt-3 mb-3">
            تجربه بیماران از درمان و جراحی
          </h2>
          <div className="flex items-center justify-center gap-1.5 mx-auto mb-4">
            <div className="w-12 h-1 bg-amber-500 rounded-full" />
            <div className="w-2 h-1 bg-amber-400 rounded-full" />
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            نظرات مراجعین گرامی که تجربه درمان، کاشت ایمپلنت و جراحی فک را با دکتر اکبر شهیدی پیام داشته‌اند.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewsData.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between text-right space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                  «{rev.comment}»
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#1e3a8a]">
                    <span>{rev.patientName}</span>
                    {rev.verified && (
                      <span title="بیمار تایید شده">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {rev.treatment}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
