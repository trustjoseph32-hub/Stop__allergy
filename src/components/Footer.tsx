import React from 'react';
import { SITE_CONTENT } from '../config/siteContent.ts';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[#D9DED6] bg-[#F7F5F0] py-14 text-[#252C27]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 pb-10 border-b border-[#D9DED6]">
          {/* Brand & Specialist info */}
          <div className="max-w-md">
            <div className="font-serif text-2xl font-bold tracking-tight text-[#252C27]">
              {SITE_CONTENT.specialist.brand}
            </div>
            <p className="mt-1 text-sm font-medium text-[#315B48]">
              {SITE_CONTENT.specialist.name} · {SITE_CONTENT.specialist.title}
            </p>
            <p className="mt-3 text-xs sm:text-sm text-[#59635C] leading-relaxed">
              Психологическая работа при аллергии, дерматите и астме. Индивидуальный терапевтический протокол и онлайн-курс «Аллерго-стресс».
            </p>
          </div>

          {/* Social Links */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-[#59635C] mb-3">
              Проект в сети
            </div>
            <ul className="flex flex-col gap-2.5 text-sm" aria-label="Социальные сети и каналы">
              <li>
                <a
                  href={SITE_CONTENT.socialLinks.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#252C27] hover:text-[#315B48] transition-colors"
                >
                  <span>Telegram-канал</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#59635C]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONTENT.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#252C27] hover:text-[#315B48] transition-colors"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#59635C]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONTENT.socialLinks.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#252C27] hover:text-[#315B48] transition-colors"
                >
                  <span>ВКонтакте</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#59635C]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONTENT.socialLinks.dzen}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#252C27] hover:text-[#315B48] transition-colors"
                >
                  <span>Дзен</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#59635C]" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#59635C]">
          <p className="max-w-2xl leading-relaxed">
            Психологическая работа дополняет медицинскую помощь и не предполагает отмену назначенного лечения.
          </p>
          <div className="shrink-0">
            © {currentYear} {SITE_CONTENT.specialist.name}
          </div>
        </div>
      </div>
    </footer>
  );
};
