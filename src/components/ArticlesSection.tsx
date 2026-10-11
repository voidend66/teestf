import React from 'react';
import { BookOpen, Clock, Calendar, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { procedureArticles } from '../data/doctorData';
import { ProcedureArticle } from '../types';

interface ArticlesSectionProps {
  onSelectArticle: (article: ProcedureArticle) => void;
  articles?: ProcedureArticle[];
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({ onSelectArticle, articles }) => {
  const displayArticles = articles && articles.length > 0 ? articles : procedureArticles;

  return (
    <section id="articles" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <span className="text-[#2a5c8c] text-xs sm:text-sm font-extrabold tracking-wider uppercase bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            دانش‌نامه و آموزش بیمار
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e3a8a] mt-3 mb-3">
            مقالات علمی و راهنماهای جراحی
          </h2>
          <div className="flex items-center justify-center gap-1.5 mx-auto mb-4">
            <div className="w-12 h-1 bg-amber-500 rounded-full" />
            <div className="w-2 h-1 bg-amber-400 rounded-full" />
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            مطالعه مقالات تخصصی نگارش شده توسط دکتر اکبر شهیدی پیام جهت آشنایی بیماران با روند درمان، مراقبت‌ها و فناوری‌های نوین
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {displayArticles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col justify-between text-right group"
            >
              <div>
                {/* Header Image */}
                {article.heroImage && (
                  <div className="h-52 overflow-hidden bg-slate-100 relative">
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-[#1e3a8a]/90 backdrop-blur-md text-white font-bold text-xs px-3 py-1 rounded-lg border border-white/20">
                      {article.category}
                    </div>
                  </div>
                )}

                {/* Article Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                    <span className="flex items-center gap-1 text-[#2a5c8c]">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.publishDate}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-[#1e3a8a] group-hover:text-[#2a5c8c] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {article.summary}
                  </p>

                  <div className="pt-2">
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1.5 rounded-md inline-flex">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>نگارش بر اساس آخرین منابع جراحی دهان و فک</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Action */}
              <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">نویسنده: دکتر اکبر شهیدی پیام</span>
                <button
                  type="button"
                  onClick={() => onSelectArticle(article)}
                  className="inline-flex items-center gap-2 bg-[#1e3a8a] hover:bg-[#2a5c8c] text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#d4af37]" />
                  <span>مطالعه کامل مقاله</span>
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
