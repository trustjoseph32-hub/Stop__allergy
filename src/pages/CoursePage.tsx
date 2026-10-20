import React, { useEffect } from 'react';
import { SITE_CONTENT } from '../config/siteContent.ts';
import { ArrowLeft, ArrowUpRight, ArrowRight } from 'lucide-react';

interface CoursePageProps {
  onNavigateHome: () => void;
  onNavigateTherapy: () => void;
}

export const CoursePage: React.FC<CoursePageProps> = ({
  onNavigateHome,
  onNavigateTherapy,
}) => {
  const { course } = SITE_CONTENT;

  useEffect(() => {
    document.title = SITE_CONTENT.seo.course.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', SITE_CONTENT.seo.course.description);
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

      {/* Заголовок и вводный текст */}
      <section className="mb-16">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#59635C] mb-3">
          Статус программы · Обновление содержания
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#252C27] text-balance">
          {course.title}
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-[#59635C] leading-relaxed max-w-2xl">
          {course.description}
        </p>

        {/* Разъяснение формата без коробки-карточки */}
        <div className="mt-10 pt-8 border-t border-[#D9DED6]">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#252C27] mb-3">
            О формате курса
          </h2>
          <p className="text-base sm:text-lg text-[#59635C] leading-relaxed max-w-3xl">
            Формат предполагает учебные материалы и самостоятельную практику. Окончательное содержание, сопровождение, аудитория и условия участия будут представлены после завершения текущего обновления.
          </p>
        </div>
      </section>

      {/* Что будет опубликовано — открытый список с тонкими линиями */}
      <section className="border-t border-[#D9DED6] pt-12 mb-16">
        <div className="text-xs uppercase tracking-widest font-semibold text-[#315B48] mb-2">
          Параметры нового запуска
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#252C27] mb-8">
          Что будет опубликовано после обновления
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {course.upcomingDetails.map((detail, idx) => (
            <div
              key={idx}
              className="py-4 border-b border-[#D9DED6] text-base font-medium text-[#252C27]"
            >
              <span>{detail}</span>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs sm:text-sm text-[#59635C] leading-relaxed">
          Все условия, стоимость и даты публикуются официально в канале проекта перед открытием набора.
        </p>
      </section>

      {/* Действия: Следить в Telegram и Рассмотреть личную терапию */}
      <section className="border-t border-[#D9DED6] pt-12 text-center">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#252C27] tracking-tight text-balance">
          Анонс обновления выйдет в Telegram
        </h2>
        <p className="mt-3 text-base text-[#59635C] max-w-lg mx-auto leading-relaxed">
          Подпишитесь на канал проекта «Аллерго-стресс», чтобы первыми узнать о старте новой версии программы и условиях участия.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={SITE_CONTENT.socialLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#315B48] text-white px-7 py-3.5 text-base font-medium hover:bg-[#274839] transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap shadow-xs"
          >
            <span>{course.channelCta}</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onNavigateTherapy}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFFEFA] border border-[#D9DED6] text-[#252C27] hover:bg-[#E9EFE8] hover:border-[#315B48] px-6 py-3.5 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap"
          >
            <span>{course.therapyCta}</span>
            <ArrowRight className="w-4 h-4 text-[#59635C]" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
};
