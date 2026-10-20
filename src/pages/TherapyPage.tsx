import React, { useEffect } from 'react';
import { SITE_CONTENT } from '../config/siteContent.ts';
import { ContactTopic } from '../components/ContactDialog.tsx';
import { ArrowLeft, Check } from 'lucide-react';

interface TherapyPageProps {
  onNavigateHome: () => void;
  onOpenContact: (triggerEl?: HTMLElement, topic?: ContactTopic) => void;
}

export const TherapyPage: React.FC<TherapyPageProps> = ({
  onNavigateHome,
  onOpenContact,
}) => {
  const { therapy } = SITE_CONTENT;

  useEffect(() => {
    document.title = SITE_CONTENT.seo.therapy.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', SITE_CONTENT.seo.therapy.description);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 pb-24">
      {/* Ссылка возврата на главную */}
      <div className="mb-10">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-sm font-medium text-[#59635C] hover:text-[#252C27] transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] py-1 px-2 -ml-2 rounded-xs"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>На главную</span>
        </button>
      </div>

      {/* 1. Заголовок и вводная часть */}
      <section className="mb-16">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#315B48] mb-3">
          Индивидуальная работа · Протокол
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#252C27] text-balance">
          {therapy.subtitle}
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#59635C] leading-relaxed max-w-2xl">
          {therapy.description} Программа направлена на психологическую сторону жизни с аллергией, дерматитом и астмой.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            type="button"
            onClick={(e) => onOpenContact(e.currentTarget, 'self')}
            className="inline-flex items-center justify-center rounded-xl bg-[#315B48] text-white px-7 py-3.5 text-base font-medium hover:bg-[#274839] transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap shadow-xs"
          >
            <span>Обсудить мой запрос</span>
          </button>

          <span className="text-sm text-[#59635C]">
            Ознакомительный созвон · бесплатно · 10–15 минут
          </span>
        </div>
      </section>

      {/* 2. Полный состав услуги — открытый список с тонкими линиями */}
      <section className="border-t border-[#D9DED6] pt-12 mb-16">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#252C27] mb-8">
          Что входит в протокол
        </h2>

        <div className="divide-y divide-[#D9DED6]">
          {therapy.items.map((item, idx) => (
            <div key={idx} className="py-5 first:pt-0 last:pb-0 flex items-start gap-4">
              <Check className="w-5 h-5 text-[#315B48] shrink-0 mt-1" aria-hidden="true" />
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#252C27]">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm sm:text-base text-[#59635C] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Общая логика работы — 3 открытые текстовые колонки */}
      <section className="border-t border-[#D9DED6] pt-12 mb-16">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#252C27] mb-3">
          Общая логика работы
        </h2>
        <p className="text-base text-[#59635C] leading-relaxed mb-8 max-w-2xl">
          Каждый случай индивидуален: последовательность ориентирована на решение вашей задачи, а не на фиксированное шаблонное расписание.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {therapy.workflowSteps.map((ws, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="text-xs uppercase tracking-widest font-semibold text-[#315B48] mb-2">
                Этап 0{idx + 1}
              </div>
              <h3 className="font-serif text-lg font-bold text-[#252C27] mb-2">
                {ws.title}
              </h3>
              <p className="text-sm text-[#59635C] leading-relaxed">
                {ws.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Стоимость и условия — открытая полоса */}
      <section className="border-t border-[#D9DED6] pt-12 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-6">
          <div>
            <div className="text-xs uppercase tracking-widest font-semibold text-[#315B48] mb-1">
              Стоимость полного протокола
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#252C27]">
                {therapy.price}
              </span>
              <span className="text-base font-medium text-[#59635C]">
                {therapy.priceNote}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => onOpenContact(e.currentTarget, 'self')}
            className="inline-flex items-center justify-center rounded-xl bg-[#315B48] text-white px-5 py-3 text-sm font-medium hover:bg-[#274839] transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap"
          >
            <span>Начать с созвона</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-[#D9DED6] text-sm text-[#252C27]">
          <div>
            <span className="text-[#59635C] block text-xs uppercase tracking-wider mb-1">Количество встреч</span>
            <span className="font-medium text-base">6 сессий с интервалами 7–10 дней</span>
          </div>
          <div>
            <span className="text-[#59635C] block text-xs uppercase tracking-wider mb-1">Длительность курса</span>
            <span className="font-medium text-base">Ориентировочно шесть недель</span>
          </div>
          <div>
            <span className="text-[#59635C] block text-xs uppercase tracking-wider mb-1">Формат проведения</span>
            <span className="font-medium text-base">Онлайн или очно</span>
          </div>
          <div>
            <span className="text-[#59635C] block text-xs uppercase tracking-wider mb-1">Расписание</span>
            <span className="font-medium text-base">Календарь согласуем перед началом</span>
          </div>
        </div>
      </section>

      {/* 5. Вторичный вариант — отдельная сессия */}
      <section className="border-t border-[#D9DED6] pt-10 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#252C27]">
              {therapy.singleSessionText}
            </h3>
            <p className="mt-1 text-sm text-[#59635C]">
              Разовый консультационный формат без пакета заданий и непрерывного сопровождения.
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => onOpenContact(e.currentTarget, 'self')}
            className="shrink-0 inline-flex items-center justify-center rounded-xl bg-[#FFFEFA] border border-[#D9DED6] text-[#252C27] hover:bg-[#E9EFE8] hover:border-[#315B48] px-5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap"
          >
            <span>Обсудить формат</span>
          </button>
        </div>
      </section>

      {/* 6. Запрос о ребёнке */}
      <section className="border-t border-[#D9DED6] pt-10 mb-16">
        <h2 className="font-serif text-xl font-bold text-[#252C27] mb-2">
          Если запрос касается ребёнка
        </h2>
        <p className="text-base text-[#59635C] leading-relaxed max-w-3xl">
          {therapy.childConditions}
        </p>
        <div className="mt-4">
          <button
            type="button"
            onClick={(e) => onOpenContact(e.currentTarget, 'child')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#315B48] hover:text-[#274839] underline underline-offset-4 whitespace-nowrap"
          >
            <span>Обсудить запрос о ребёнке с Василием</span>
          </button>
        </div>
      </section>

      {/* 7. Завершение — открытый призыв */}
      <section className="border-t border-[#D9DED6] pt-12 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#252C27] tracking-tight text-balance">
          Первый шаг — ознакомительный созвон
        </h2>
        <p className="mt-3 text-base text-[#59635C] max-w-xl mx-auto leading-relaxed">
          Бесплатно · 10–15 минут. Вы расскажете о своей ситуации и зададите вопросы, а Василий объяснит, как строится работа.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={(e) => onOpenContact(e.currentTarget, 'self')}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[#315B48] text-white px-7 py-3.5 text-base font-medium hover:bg-[#274839] transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap shadow-xs"
          >
            <span>Обсудить мой запрос</span>
          </button>

          <button
            type="button"
            onClick={onNavigateHome}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[#FFFEFA] border border-[#D9DED6] text-[#252C27] hover:bg-[#E9EFE8] px-6 py-3.5 text-base font-medium transition-colors whitespace-nowrap"
          >
            <span>На главную страницу</span>
          </button>
        </div>
      </section>
    </div>
  );
};
