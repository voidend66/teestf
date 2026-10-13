import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal, ZoomIn, X, CheckCircle2 } from 'lucide-react';
import { galleryItems } from '../data/doctorData';
import { GalleryItem } from '../types';

export const BeforeAfterGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<GalleryItem | null>(null);
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 - 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const categories = [
    { id: 'all', label: 'همه موارد' },
    { id: 'implant', label: 'ایمپلنت دیجیتال' },
    { id: 'jaw', label: 'جراحی فک' },
    { id: 'sinus', label: 'سینوس لیفت' },
    { id: 'clinic', label: 'مطب و تجهیزات' },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 5) percentage = 5;
    if (percentage > 95) percentage = 95;
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-12 max-w-3xl mx-auto">
          <span className="text-[#2a5c8c] text-xs sm:text-sm font-extrabold tracking-wider uppercase bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            مستندات و نتایج بالینی
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1e3a8a] mt-3 mb-3">
            گالری قبل و بعد و نمونه‌کارها
          </h2>
          <div className="flex items-center justify-center gap-1.5 mx-auto mb-4">
            <div className="w-12 h-1 bg-amber-500 rounded-full" />
            <div className="w-2 h-1 bg-amber-400 rounded-full" />
          </div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            مشاهده نتایج جراحی‌ها با استفاده از اسلایدر مقایسه قبل و بعد، کیفیت استخوان‌سازی و محیط تخصصی مطب
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1e3a8a] text-white shadow-md shadow-blue-900/15 scale-105'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all group flex flex-col"
            >
              {/* Media Preview */}
              <div className="relative h-56 overflow-hidden bg-slate-200 cursor-pointer" onClick={() => setSelectedCase(item)}>
                {item.type === 'before-after' ? (
                  <div className="relative w-full h-full flex">
                    <div className="w-1/2 h-full relative border-l border-white/80 overflow-hidden">
                      <img
                        src={item.beforeUrl}
                        alt="قبل"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-2 right-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                        قبل از جراحی
                      </span>
                    </div>
                    <div className="w-1/2 h-full relative overflow-hidden">
                      <img
                        src={item.afterUrl}
                        alt="بعد"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-2 left-2 bg-[#1e3a8a]/90 text-[#d4af37] text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                        بعد از درمان
                      </span>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/40 transition-opacity backdrop-blur-xs">
                      <span className="inline-flex items-center gap-1.5 bg-white text-[#1e3a8a] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
                        <MoveHorizontal className="w-4 h-4" />
                        <span>مشاهده اسلایدر تعاملی</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-slate-950/40 transition-opacity">
                      <span className="inline-flex items-center gap-1.5 bg-white text-[#1e3a8a] text-xs font-bold px-3 py-1.5 rounded-lg shadow-md">
                        <ZoomIn className="w-4 h-4" />
                        <span>بزرگنمایی تصویر</span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Type Badge */}
                <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-sm text-[#1e3a8a] font-bold text-[11px] px-2.5 py-0.5 rounded-md shadow-xs">
                  {item.categoryLabel}
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2 text-right">
                <div>
                  <h3 className="font-extrabold text-[#1e3a8a] text-sm sm:text-base leading-snug">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCase(item)}
                  className="pt-2 text-xs font-bold text-[#2a5c8c] hover:text-[#d4af37] flex items-center gap-1 mt-auto cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>مشاهده جزئیات کامل نمونه‌کار</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Comparison / Inspection Modal */}
      {selectedCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCase(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col text-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#1e3a8a] text-white p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#d4af37] font-bold block">
                  {selectedCase.categoryLabel}
                </span>
                <h4 className="text-base sm:text-lg font-bold">
                  {selectedCase.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="بستن"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Slider Body */}
            <div className="p-5 sm:p-6 space-y-4">
              {selectedCase.type === 'before-after' ? (
                <div>
                  <div className="text-xs text-slate-500 mb-2 flex items-center justify-between">
                    <span>جهت مقایسه، نوار وسط را به طرفین بکشید:</span>
                    <span className="font-semibold text-[#1e3a8a]">{sliderPos.toFixed(0)}%</span>
                  </div>

                  {/* Interactive Slider Container */}
                  <div
                    ref={containerRef}
                    className="relative w-full h-72 sm:h-96 rounded-xl overflow-hidden select-none cursor-ew-resize border border-slate-300 bg-slate-100 shadow-inner touch-none"
                    onMouseDown={() => (isDraggingRef.current = true)}
                    onMouseUp={() => (isDraggingRef.current = false)}
                    onMouseLeave={() => (isDraggingRef.current = false)}
                    onMouseMove={handleMouseMove}
                    onTouchMove={handleTouchMove}
                    onClick={(e) => handleMove(e.clientX)}
                  >
                    {/* "After" Image (Background layer) */}
                    <img
                      src={selectedCase.afterUrl}
                      alt="بعد از جراحی"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    />

                    {/* "Before" Image (Clipped layer) */}
                    <div
                      className="absolute inset-y-0 right-0 overflow-hidden border-l-2 border-white shadow-2xl pointer-events-none"
                      style={{ width: `${100 - sliderPos}%` }}
                    >
                      <img
                        src={selectedCase.beforeUrl}
                        alt="قبل از جراحی"
                        className="absolute inset-y-0 right-0 h-full max-w-none object-contain pointer-events-none"
                        style={{
                          width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                        }}
                      />
                    </div>

                    {/* Divider Line & Circular Handle */}
                    <div
                      className="absolute top-0 bottom-0 pointer-events-none z-10"
                      style={{ right: `${100 - sliderPos}%`, transform: 'translateX(50%)' }}
                    >
                      <div className="w-0.5 h-full bg-white shadow-md relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center shadow-lg border-2 border-white">
                          <MoveHorizontal className="w-4 h-4 text-[#d4af37]" />
                        </div>
                      </div>
                    </div>

                    {/* Floating Labels inside image */}
                    <span className="absolute bottom-3 right-3 bg-slate-900/80 text-white text-xs px-2.5 py-1 rounded font-bold pointer-events-none">
                      قبل از عمل
                    </span>
                    <span className="absolute bottom-3 left-3 bg-[#1e3a8a]/90 text-[#d4af37] text-xs px-2.5 py-1 rounded font-bold pointer-events-none">
                      بعد از عمل
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={selectedCase.imageUrl}
                    alt={selectedCase.title}
                    referrerPolicy="no-referrer"
                    className="w-full max-h-[420px] object-contain mx-auto"
                  />
                </div>
              )}

              {selectedCase.description && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <div className="flex items-center gap-1.5 font-bold text-[#1e3a8a] mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>توضیحات بالینی و تکنیک درمانی:</span>
                  </div>
                  <p>{selectedCase.description}</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-3.5 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCase(null)}
                className="bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
