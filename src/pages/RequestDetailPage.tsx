import React, { useEffect } from 'react';
import { SITE_CONTENT, SituationItem } from '../config/siteContent.ts';
import { ContactTopic } from '../components/ContactDialog.tsx';
import { ArrowLeft, ArrowRight, Check, Send, ShieldCheck } from 'lucide-react';

interface RequestDetailPageProps {
  requestId: 'allergy' | 'dermatitis' | 'asthma';
  onNavigateHome: () => void;
  onNavigateTherapy: () => void;
  onNavigateCourse: () => void;
  onOpenContact: (triggerEl?: HTMLElement, topic?: ContactTopic) => void;
}

export const RequestDetailPage: React.FC<RequestDetailPageProps> = ({
  requestId,
  onNavigateHome,
  onNavigateTherapy,
  onNavigateCourse,
  onOpenContact,
}) => {
  const { situations, therapy, course, seo } = SITE_CONTENT;
  const item: SituationItem | undefined = situations.items.find((s) => s.id === requestId);

  useEffect(() => {
    if (item && seo.requests[requestId]) {
      document.title = seo.requests[requestId].title;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', seo.requests[requestId].description);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [item, requestId, seo.requests]);

  if (!item) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">Запрос не найден</h1>
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-sm text-[#315B48] underline"
        >
          Вернуться на главную
        </button>
      </div>
    );
  }

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

      {/* 1. Заголовок запроса */}
      <section className="mb-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex-1">
            <div className="text-xs uppercase tracking-widest font-semibold text-[#315B48] mb-3">
              Направление работы · {SITE_CONTENT.specialist.brand}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#252C27] text-balance">
              Психологическая работа: {item.title.toLowerCase()}
            </h1>

            <p className="mt-4 text-lg sm:text-xl text-[#315B48] font-medium leading-relaxed max-w-2xl">
              {item.subtitle}
            </p>

            <p className="mt-5 text-base sm:text-lg text-[#59635C] leading-relaxed max-w-2xl">
              {item.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                type="button"
                onClick={(e) => onOpenContact(e.currentTarget, 'self')}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#315B48] text-white px-7 py-3.5 text-base font-medium hover:bg-[#274839] transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap shadow-xs"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
                <span>Обсудить мой запрос</span>
              </button>

              <span className="text-sm text-[#59635C]">
                Ознакомительный созвон · бесплатно · 10–15 минут
              </span>
            </div>
          </div>

          {item.artwork && (
            <div className="w-full md:w-64 lg:w-72 h-44 sm:h-52 md:h-56 rounded-2xl overflow-hidden border border-[#D9DED6] shrink-0 bg-[#FFFEFA] shadow-xs">
              <img
                src={item.artwork}
                alt={`Художественный образ направления: ${item.title}`}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-right"
              />
            </div>
          )}
        </div>
      </section>

      {/* 2. С какими формами и проявлениями работаем */}
      {item.symptoms && item.symptoms.length > 0 && (
        <section className="border-t border-[#D9DED6] pt-12 mb-16">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#315B48] mb-2">
            Симптоматика
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#252C27] mb-6">
            Формы и частые проявления
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {item.symptoms.map((symptom, sIdx) => (
              <div key={sIdx} className="rounded-xl border border-[#D9DED6] bg-[#FFFEFA] p-5 shadow-xs">
                <div className="font-serif text-lg font-bold text-[#252C27] mb-1">
                  {symptom.name}
                </div>
                <div className="text-sm text-[#59635C] leading-relaxed">
                  {symptom.detail}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Подробное описание психологической стороны запроса */}
      <section className="border-t border-[#D9DED6] pt-12 mb-16">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#252C27] mb-6">
          Что происходит психологически
        </h2>

        <div className="space-y-4 text-base sm:text-lg text-[#59635C] leading-relaxed">
          {item.psychologicalContext.map((text, idx) => (
            <div key={idx} className="flex items-start gap-3.5">
              <span className="text-[#315B48] font-bold font-mono text-sm mt-1 shrink-0">
                0{idx + 1}.
              </span>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Как устроена помощь */}
      <section className="border-t border-[#D9DED6] pt-12 mb-16">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#252C27] mb-6">
          Как помогает психологическая работа
        </h2>

        <div className="divide-y divide-[#D9DED6]">
          {item.howWeWork.map((point, idx) => (
            <div key={idx} className="py-4.5 first:pt-0 last:pb-0 flex items-start gap-4">
              <Check className="w-5 h-5 text-[#315B48] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-base sm:text-lg text-[#252C27] leading-relaxed">
                {point}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#D9DED6] flex items-center gap-3 text-xs sm:text-sm text-[#59635C]">
          <ShieldCheck className="w-4 h-4 text-[#315B48] shrink-0" aria-hidden="true" />
          <span>{SITE_CONTENT.approach.medicalNote}</span>
        </div>
      </section>

      {/* 4. Предложение формата работы — решение запроса */}
      <section className="border-t border-[#D9DED6] pt-12 mb-16">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#315B48] mb-2">
            Решение
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#252C27]">
            Предлагаемые форматы работы
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#59635C]">
            Выберите подходящий способ работы с вашим запросом
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Решение 1: Личная терапия */}
          <div className="bg-[#FFFEFA] border border-[#D9DED6] rounded-xl p-7 sm:p-9 flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#315B48] mb-2">
                Рекомендуемый формат
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#252C27] mb-2">
                {therapy.subtitle}
              </h3>
              <p className="text-sm text-[#59635C] leading-relaxed mb-6">
                Последовательная индивидуальная работа конкретно с вашими триггерами, реакциями и симптомами.
              </p>

              <div className="pt-4 border-t border-[#D9DED6] space-y-2 text-sm text-[#252C27]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#315B48]" aria-hidden="true" />
                  <span>6 сессий с интервалами 7–10 дней</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#315B48]" aria-hidden="true" />
                  <span>Задания между встречами и обратная связь</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#315B48]" aria-hidden="true" />
                  <span>Поддержка в мессенджерах весь блок</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D9DED6]">
              <div className="font-serif text-2xl font-bold text-[#252C27] mb-4">
                {therapy.price} <span className="text-sm font-sans font-normal text-[#59635C]">{therapy.priceNote}</span>
              </div>
              <div className="flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={(e) => onOpenContact(e.currentTarget, 'self')}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#315B48] text-white py-3 text-sm font-medium hover:bg-[#274839] transition-colors"
                >
                  <span>Обсудить на созвоне</span>
                </button>
                <button
                  type="button"
                  onClick={onNavigateTherapy}
                  className="w-full inline-flex items-center justify-center gap-1.5 text-xs text-[#59635C] hover:text-[#252C27] py-2"
                >
                  <span>Подробнее о протоколе</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Решение 2: Онлайн-курс */}
          <div className="bg-[#FFFEFA] border border-[#D9DED6] rounded-xl p-7 sm:p-9 flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#59635C] mb-2">
                {course.status}
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#252C27] mb-2">
                {course.title}
              </h3>
              <p className="text-sm text-[#59635C] leading-relaxed mb-6">
                Восьминедельный формат с учебными материалами и самостоятельной практикой. Идёт обновление программы.
              </p>

              <div className="pt-4 border-t border-[#D9DED6] text-xs text-[#59635C] leading-relaxed space-y-2">
                <p>Все условия участия и даты набора будут опубликованы после завершения переработки.</p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D9DED6]">
              <button
                type="button"
                onClick={onNavigateCourse}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFFEFA] border border-[#D9DED6] text-[#252C27] hover:bg-[#E9EFE8] hover:border-[#315B48] py-3 text-sm font-medium transition-colors"
              >
                <span>Узнать о статусе курса</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Завершение с бесплатным созвоном */}
      <section className="border-t border-[#D9DED6] pt-12 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#252C27] tracking-tight text-balance">
          Начните с бесплатного созвона
        </h2>
        <p className="mt-3 text-base text-[#59635C] max-w-xl mx-auto leading-relaxed">
          10–15 минут. Вы расскажете о вашей ситуации с {item.title.toLowerCase()}, а Василий объяснит, как строится терапевтическая работа.
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
