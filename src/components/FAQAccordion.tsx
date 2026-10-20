import React, { useState } from 'react';
import { SITE_CONTENT, FAQItem } from '../config/siteContent.ts';
import { ChevronDown, ArrowUpRight } from 'lucide-react';

interface FAQAccordionProps {
  onOpenContact: (triggerEl?: HTMLElement) => void;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ onOpenContact }) => {
  const { faq } = SITE_CONTENT;
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
  });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* FAQ items list */}
      <div className="divide-y divide-[#D9DED6] border-y border-[#D9DED6]">
        {faq.items.map((item: FAQItem) => {
          const isOpen = !!openIds[item.id];
          return (
            <div key={item.id} className="py-5 sm:py-6">
              <button
                type="button"
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                className="w-full flex items-center justify-between text-left gap-4 focus-visible:outline-2 focus-visible:outline-[#315B48] rounded-xs group"
              >
                <span className="font-serif text-lg sm:text-xl font-medium text-[#252C27] group-hover:text-[#315B48] transition-colors">
                  {item.question}
                </span>
                <span
                  className={`shrink-0 p-1 text-[#59635C] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#315B48]' : ''
                  }`}
                  aria-hidden="true"
                >
                  <ChevronDown className="w-5 h-5" />
                </span>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${item.id}`}
                  className="mt-3 text-base sm:text-lg text-[#59635C] leading-relaxed pr-8"
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Финальный шаг — открытая композиция без искусственной карточки-коробки */}
      <div className="mt-16 text-center">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#252C27] tracking-tight text-balance">
          {faq.finalHeading}
        </h3>
        <p className="mt-3 text-base text-[#59635C] max-w-md mx-auto leading-relaxed">
          Ознакомительный созвон · бесплатно · 10–15 минут. Вы расскажете о запросе, а Василий объяснит предполагаемый подход.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={(e) => onOpenContact(e.currentTarget)}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[#315B48] text-white px-7 py-3.5 text-base font-medium hover:bg-[#274839] transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap shadow-xs"
          >
            <span>{faq.finalPrimaryCta}</span>
          </button>

          <a
            href={SITE_CONTENT.contact.telegramChannelUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#FFFEFA] border border-[#D9DED6] text-[#252C27] hover:bg-[#E9EFE8] hover:border-[#315B48] px-6 py-3.5 text-base font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap"
          >
            <span>{faq.finalSecondaryCta}</span>
            <ArrowUpRight className="w-4 h-4 text-[#59635C]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
};
