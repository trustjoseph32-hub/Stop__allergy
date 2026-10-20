import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SITE_CONTENT, SituationItem } from '../config/siteContent.ts';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface SituationsSliderProps {
  onNavigateRequest: (url: string) => void;
  onNavigateTherapy?: () => void;
  onNavigateCourse?: () => void;
}

export const SituationsSlider: React.FC<SituationsSliderProps> = ({
  onNavigateRequest,
  onNavigateTherapy,
  onNavigateCourse,
}) => {
  const { situations } = SITE_CONTENT;
  const items = situations.items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Sync current index from scroll position
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cardWidth = container.clientWidth;
    if (cardWidth === 0) return;

    const newIndex = Math.round(scrollLeft / cardWidth);
    const clampedIndex = Math.max(0, Math.min(items.length - 1, newIndex));
    if (clampedIndex !== currentIndex) {
      setCurrentIndex(clampedIndex);
    }
  }, [currentIndex, items.length]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const cardWidth = container.clientWidth;
    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < items.length - 1) {
      scrollToIndex(currentIndex + 1);
    }
  };

  return (
    <div className="w-full">
      {/* Горизонтальный контейнер слайдера со snap-прокруткой */}
      <div
        ref={scrollContainerRef}
        role="region"
        aria-label="Ситуации, с которыми можно обратиться"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            handlePrev();
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            handleNext();
          }
        }}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none rounded-2xl sm:rounded-3xl border border-[#D9DED6] bg-[#FFFEFA] focus-visible:outline-2 focus-visible:outline-[#315B48] shadow-xs"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item: SituationItem, idx: number) => {
          return (
            <article
              key={item.id}
              className="w-full min-w-full shrink-0 snap-start flex flex-col lg:flex-row items-stretch justify-between min-h-[380px] sm:min-h-[420px] relative overflow-hidden"
            >
              {/* Левая текстовая колонка */}
              <div className="w-full lg:w-7/12 p-6 sm:p-10 lg:p-14 flex flex-col justify-between z-10">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-[36px] font-bold text-[#252C27] tracking-tight mb-2 sm:mb-3 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#59635C] leading-relaxed max-w-xl">
                    {item.description}
                  </p>

                  {/* Симптомы и формы проявления запроса */}
                  {item.symptoms && item.symptoms.length > 0 && (
                    <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-[#E8EDE6] grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5">
                      {item.symptoms.map((symptom, sIdx) => (
                        <div key={sIdx} className="flex items-start gap-2 text-xs sm:text-[13px] text-[#3D4740] leading-snug">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#315B48] shrink-0 mt-1.5" aria-hidden="true" />
                          <div>
                            <span className="font-semibold text-[#252C27]">{symptom.name}</span>
                            {symptom.detail && (
                              <span className="text-[#59635C]"> — {symptom.detail}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Активная ссылка на подробную страницу запроса */}
                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#D9DED6]/80 flex items-center">
                  <button
                    type="button"
                    onClick={() => onNavigateRequest(item.url)}
                    className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-[#315B48] hover:text-[#274839] group transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] text-left cursor-pointer"
                  >
                    <span>{item.actionText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Правая визуальная часть: тематический художественный образ, отражающий суть запроса */}
              <div className="w-full lg:w-5/12 h-44 sm:h-56 lg:h-auto lg:min-h-full relative overflow-hidden flex items-center justify-center">
                <img
                  src={item.artwork}
                  alt={`Иллюстрация: ${item.title}`}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center lg:object-right select-none opacity-100"
                />
                {/* Мягкий градиентный переход слева на десктопе */}
                <div className="hidden lg:block absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-[#FFFEFA] to-transparent pointer-events-none" />
                {/* Мягкий градиентный переход сверху на мобильных */}
                <div className="lg:hidden absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#FFFEFA] to-transparent pointer-events-none" />
              </div>
            </article>
          );
        })}
      </div>

      {/* Панель управления под слайдером в точном стиле референса: Стрелка влево, Точки в центре, Стрелка вправо */}
      <div className="mt-6 flex items-center justify-between">
        {/* Кнопка «Назад» */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Предыдущая карточка"
          className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] ${
            currentIndex === 0
              ? 'border-[#D9DED6] text-[#D9DED6] cursor-not-allowed bg-[#F7F5F0]'
              : 'border-[#D9DED6] text-[#252C27] bg-[#FFFEFA] hover:bg-[#E9EFE8] hover:border-[#315B48]'
          }`}
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        </button>

        {/* Индикаторы в центре: точки/капсулы */}
        <div className="flex items-center gap-2" role="group" aria-label="Выбор карточки">
          {items.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToIndex(idx)}
              aria-label={`Перейти к ситуации ${idx + 1}: ${item.title}`}
              aria-current={currentIndex === idx ? 'true' : undefined}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-[#315B48]'
                  : 'w-2.5 bg-[#D9DED6] hover:bg-[#59635C]'
              }`}
            />
          ))}
        </div>

        {/* Кнопка «Вперёд» */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === items.length - 1}
          aria-label="Следующая карточка"
          className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] ${
            currentIndex === items.length - 1
              ? 'border-[#D9DED6] text-[#D9DED6] cursor-not-allowed bg-[#F7F5F0]'
              : 'border-[#D9DED6] text-[#252C27] bg-[#FFFEFA] hover:bg-[#E9EFE8] hover:border-[#315B48]'
          }`}
        >
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};
