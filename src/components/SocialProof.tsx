import React from 'react';
import { SITE_CONTENT, SocialProofCase } from '../config/siteContent.ts';
import { Quote, ArrowRight, ShieldCheck } from 'lucide-react';

interface SocialProofProps {
  onOpenContact: (triggerEl?: HTMLElement) => void;
}

export const SocialProof: React.FC<SocialProofProps> = ({ onOpenContact }) => {
  const { socialProof } = SITE_CONTENT;

  if (!socialProof) return null;

  return (
    <section id="cases" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="border-t border-[#D9DED6] pt-12 sm:pt-16">
        {/* Заголовок секции */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#315B48] mb-2">
            {socialProof.overline}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#252C27] tracking-tight text-balance">
            {socialProof.h2}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#59635C] leading-relaxed">
            {socialProof.description}
          </p>
        </div>

        {/* Сетка кейсов / отзывов */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {socialProof.cases.map((c: SocialProofCase) => (
            <article
              key={c.id}
              className="rounded-2xl border border-[#D9DED6] bg-[#FFFEFA] p-6 sm:p-7 flex flex-col justify-between shadow-xs transition-shadow hover:shadow-sm"
            >
              <div>
                {/* Категория запроса */}
                <div className="inline-flex items-center text-xs uppercase tracking-wider font-semibold text-[#315B48] mb-4">
                  {c.category}
                </div>

                {/* Было / Стало */}
                <div className="space-y-3 mb-6">
                  <div className="rounded-xl bg-[#F7F5F0] p-3 text-xs sm:text-sm">
                    <span className="font-semibold text-[#7A857E] uppercase tracking-wide block mb-0.5">
                      Было:
                    </span>
                    <span className="text-[#3D4740] leading-snug">{c.before}</span>
                  </div>

                  <div className="rounded-xl bg-[#EAF0E8] p-3 text-xs sm:text-sm">
                    <span className="font-semibold text-[#315B48] uppercase tracking-wide block mb-0.5">
                      Результат:
                    </span>
                    <span className="font-medium text-[#252C27] leading-snug">{c.after}</span>
                  </div>
                </div>

                {/* Цитата клиента */}
                <div className="relative pt-3 border-t border-[#E8EDE6]">
                  <Quote className="w-5 h-5 text-[#8FA597] mb-2 shrink-0" aria-hidden="true" />
                  <p className="text-sm text-[#3D4740] italic leading-relaxed">
                    {c.quote}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Дисклеймер и переход к диалогу */}
        <div className="mt-8 pt-6 border-t border-[#E8EDE6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-2.5 max-w-2xl text-xs sm:text-sm text-[#7A857E] leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-[#315B48] shrink-0 mt-0.5" aria-hidden="true" />
            <span>{socialProof.disclaimer}</span>
          </div>

          <button
            type="button"
            onClick={(e) => onOpenContact(e.currentTarget)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#315B48] hover:text-[#274839] group transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] shrink-0"
          >
            <span>Обсудить похожую ситуацию</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};
