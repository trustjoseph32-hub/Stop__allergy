import React from 'react';
import { SITE_CONTENT } from '../config/siteContent.ts';
import { ArrowRight, Check } from 'lucide-react';

interface FormatCardsProps {
  onNavigateTherapy: () => void;
  onNavigateCourse: () => void;
}

export const FormatCards: React.FC<FormatCardsProps> = ({
  onNavigateTherapy,
  onNavigateCourse,
}) => {
  const { therapy, course } = SITE_CONTENT;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
      {/* Карточка 1: Личная терапия — основной сравнительный блок */}
      <div className="flex flex-col justify-between bg-[#FFFEFA] border border-[#D9DED6] rounded-xl p-8 sm:p-10 shadow-xs">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#315B48] mb-3">
            <span>Индивидуальный формат</span>
            <span className="text-[#59635C] font-normal font-sans">6 недель</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#252C27] tracking-tight">
            {therapy.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-[#315B48]">
            {therapy.subtitle}
          </p>

          <p className="mt-4 text-base text-[#59635C] leading-relaxed">
            {therapy.description}
          </p>

          {/* Состав протокола */}
          <div className="mt-8 pt-6 border-t border-[#D9DED6]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#59635C] mb-4">
              Состав протокола
            </div>
            <ul className="space-y-3.5" aria-label="Состав индивидуального терапевтического протокола">
              {therapy.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#252C27]">
                  <Check className="w-4 h-4 text-[#315B48] shrink-0 mt-1" aria-hidden="true" />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Цена и переход */}
        <div className="mt-10 pt-6 border-t border-[#D9DED6]">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-[#252C27]">
              {therapy.price}
            </span>
            <span className="text-sm font-medium text-[#59635C]">
              {therapy.priceNote}
            </span>
          </div>

          <p className="mt-2 text-xs sm:text-sm text-[#59635C] leading-relaxed">
            {therapy.timingNote}
          </p>

          <div className="mt-6">
            <button
              type="button"
              onClick={onNavigateTherapy}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#315B48] text-white px-5 py-3.5 text-sm font-medium hover:bg-[#274839] transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap shadow-xs"
            >
              <span>{therapy.cardCta}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Карточка 2: Онлайн-курс «Аллерго-стресс» */}
      <div className="flex flex-col justify-between bg-[#FFFEFA] border border-[#D9DED6] rounded-xl p-8 sm:p-10 shadow-xs">
        <div>
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#59635C] mb-3">
            <span>{course.status}</span>
            <span className="font-normal font-sans">8 недель</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#252C27] tracking-tight">
            {course.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-[#59635C]">
            Групповой и самостоятельный формат
          </p>

          <p className="mt-4 text-base text-[#59635C] leading-relaxed">
            {course.description}
          </p>

          {/* Пояснение текущего статуса без дополнительных серых коробок */}
          <div className="mt-8 pt-6 border-t border-[#D9DED6] text-sm text-[#59635C] leading-relaxed">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#252C27] mb-2">
              Идёт переработка программы
            </div>
            <p>
              {course.note}
            </p>
          </div>
        </div>

        {/* Действие карточки курса */}
        <div className="mt-10 pt-6 border-t border-[#D9DED6]">
          <div className="text-xs sm:text-sm text-[#59635C] mb-4">
            Информация о курсе и новостях обновления
          </div>

          <button
            type="button"
            onClick={onNavigateCourse}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFFEFA] border border-[#D9DED6] text-[#252C27] hover:bg-[#E9EFE8] hover:border-[#315B48] px-5 py-3.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap"
          >
            <span>{course.cardCta}</span>
            <ArrowRight className="w-4 h-4 text-[#59635C]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
