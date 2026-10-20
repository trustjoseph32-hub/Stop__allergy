import React, { useEffect } from 'react';
import { SITE_CONTENT } from '../config/siteContent.ts';
import { SpecialistVisual } from '../components/SpecialistVisual.tsx';
import { SituationsSlider } from '../components/SituationsSlider.tsx';
import { FormatCards } from '../components/FormatCard.tsx';
import { SocialProof } from '../components/SocialProof.tsx';
import { FAQAccordion } from '../components/FAQAccordion.tsx';
import { ContactTopic } from '../components/ContactDialog.tsx';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

interface HomePageProps {
  onNavigateTherapy: () => void;
  onNavigateCourse: () => void;
  onNavigateRequest: (url: string) => void;
  onOpenContact: (triggerEl?: HTMLElement, topic?: ContactTopic) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigateTherapy,
  onNavigateCourse,
  onNavigateRequest,
  onOpenContact,
}) => {
  const { hero, situations, approach, specialistSection, specialist } = SITE_CONTENT;

  // Set document title and meta description
  useEffect(() => {
    document.title = SITE_CONTENT.seo.home.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', SITE_CONTENT.seo.home.description);
    }
  }, []);

  const scrollToFormats = () => {
    const el = document.getElementById('formats');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col gap-24 sm:gap-32 pb-20">
      {/* ========================================================
          БЛОК 1. Первый экран (Hero)
          ======================================================== */}
      <section className="pt-8 sm:pt-14 lg:pt-18 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Текстовая колонка */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#315B48] mb-4">
              {hero.overline}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] lg:leading-[1.16] font-bold tracking-tight text-[#252C27] text-balance">
              {hero.h1}
            </h1>

            {/* Запрошенный текст с чистым ритмом строк */}
            <div className="mt-6 text-base sm:text-lg text-[#59635C] leading-relaxed max-w-2xl space-y-2.5">
              <p>{hero.descriptionLines[0]}</p>
              <p className="text-[#252C27] font-medium">{hero.descriptionLines[1]}</p>
              <p className="text-[#315B48] font-semibold">{hero.descriptionLines[2]}</p>
            </div>

            <div className="mt-4 text-sm font-semibold text-[#315B48]">
              {specialist.title}
            </div>

            {/* Действия первого экрана */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={scrollToFormats}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#315B48] text-white px-6 py-3.5 text-base font-medium hover:bg-[#274839] transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap shadow-xs"
              >
                <span>{hero.primaryCta}</span>
                <ArrowDown className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={(e) => onOpenContact(e.currentTarget, 'self')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFFEFA] border border-[#D9DED6] text-[#252C27] hover:bg-[#E9EFE8] px-5 py-3.5 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap"
              >
                <span>{hero.secondaryCta}</span>
              </button>
            </div>

            <p className="mt-4 text-xs sm:text-sm text-[#59635C]">
              {hero.caption}
            </p>
          </div>

          {/* Визуальная часть первого экрана */}
          <div className="lg:col-span-5 w-full">
            <SpecialistVisual variant="hero" className="w-full" />
          </div>
        </div>
      </section>

      {/* ========================================================
          БЛОК 2. Узнавание ситуации: Слайдер карточек с активными ссылками
          ======================================================== */}
      {/* ========================================================
          БЛОК 2. С чем можно обратиться (Слайдер ситуаций)
          ======================================================== */}
      <section id="situations" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="border-t border-[#D9DED6] pt-12 sm:pt-16">
          <div className="mb-6 sm:mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#252C27] text-balance">
              {situations.h2}
            </h2>
            <p className="mt-2 text-base text-[#59635C]">
              {situations.leadNote}
            </p>
          </div>

          {/* Интерактивный слайдер 3 карточек с активными переходами */}
          <SituationsSlider
            onNavigateRequest={onNavigateRequest}
            onNavigateTherapy={onNavigateTherapy}
            onNavigateCourse={onNavigateCourse}
          />

          {/* Вопрос о ребёнке */}
          <div className="mt-12 pt-8 border-t border-[#D9DED6] flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-4">
            <p className="text-sm sm:text-base text-[#252C27] leading-relaxed max-w-2xl">
              {situations.childNote}
            </p>
            <button
              type="button"
              onClick={(e) => onOpenContact(e.currentTarget, 'child')}
              className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-[#315B48] hover:text-[#274839] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap"
            >
              <span>{situations.childCtaText}</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          БЛОК 3. Подход
          ======================================================== */}
      <section id="approach" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="border-t border-[#D9DED6] pt-12 sm:pt-16">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#315B48] mb-2">
              Подход к работе
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#252C27] text-balance">
              {approach.h2}
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#59635C] leading-relaxed">
              {approach.text}
            </p>
          </div>

          {/* 3 направления в открытой вёрстке */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-10 border-t border-[#D9DED6]">
            {approach.directions.map((dir, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="text-base sm:text-lg font-bold text-[#252C27] mb-2 font-serif">
                  {dir.title}
                </div>
                <div className="text-sm sm:text-base text-[#59635C] leading-relaxed">
                  {dir.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Медицинская строка */}
          <div className="mt-10 pt-6 border-t border-[#D9DED6] text-xs sm:text-sm text-[#59635C] leading-relaxed">
            {approach.medicalNote}
          </div>
        </div>
      </section>

      {/* ========================================================
          БЛОК 4. Выбор формата
          ======================================================== */}
      <section id="formats" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="border-t border-[#D9DED6] pt-12 sm:pt-16">
          <div className="mb-10 sm:mb-12">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#59635C] mb-2">
              Форматы
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#252C27] text-balance">
              Выберите формат работы
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#59635C]">
              Индивидуальная последовательная терапия или онлайн-курс
            </p>
          </div>

          <FormatCards
            onNavigateTherapy={onNavigateTherapy}
            onNavigateCourse={onNavigateCourse}
          />
        </div>
      </section>

      {/* ========================================================
          БЛОК 5. Результаты и опыт клиентов (Социальные доказательства)
          ======================================================== */}
      <SocialProof onOpenContact={(el) => onOpenContact(el, 'self')} />

      {/* ========================================================
          БЛОК 6. Специалист и доверие
          ======================================================== */}
      <section id="specialist" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="border-t border-[#D9DED6] pt-12 sm:pt-16">
          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#315B48] mb-2">
              О специалисте
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#252C27] tracking-tight">
              {specialistSection.h2}
            </h2>
            <p className="mt-1.5 text-base font-medium text-[#315B48]">
              {specialistSection.subtitle}
            </p>

            <p className="mt-6 text-base sm:text-lg text-[#252C27] font-medium leading-relaxed">
              {specialistSection.personalExperience}
            </p>

            <p className="mt-4 text-base sm:text-lg text-[#3D4740] leading-relaxed">
              {specialistSection.text}
            </p>

            <p className="mt-3 text-sm sm:text-base text-[#59635C] leading-relaxed">
              {specialistSection.additionalText}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={specialist.personalWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#FFFEFA] border border-[#D9DED6] px-5 py-3 text-sm font-semibold text-[#252C27] hover:bg-[#E9EFE8] hover:border-[#315B48] transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap"
              >
                <span>{specialistSection.websiteLinkText}</span>
                <ArrowUpRight className="w-4 h-4 text-[#59635C]" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={(e) => onOpenContact(e.currentTarget, 'self')}
                className="inline-flex items-center gap-2 rounded-xl bg-[#315B48] text-white px-5 py-3 text-sm font-medium hover:bg-[#274839] transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap shadow-xs"
              >
                <span>Задать вопрос Василию</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          БЛОК 6. Вопросы и следующий шаг
          ======================================================== */}
      <section id="faq" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="border-t border-[#D9DED6] pt-12 sm:pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#59635C] mb-2">
              Ответы
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#252C27] text-balance">
              {SITE_CONTENT.faq.h2}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#59635C]">
              Ответы на ключевые вопросы о формате, стоимости и содержании встреч
            </p>
          </div>

          <FAQAccordion onOpenContact={onOpenContact} />
        </div>
      </section>
    </div>
  );
};
