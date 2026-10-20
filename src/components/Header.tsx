import React, { useState } from 'react';
import { SITE_CONTENT } from '../config/siteContent.ts';
import { RouteId, buildUrlWithParams } from '../utils/navigation.ts';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentRoute: RouteId;
  searchString: string;
  onNavigate: (path: string) => void;
  onOpenContact: (triggerEl?: HTMLElement) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  searchString,
  onNavigate,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (anchor: string) => {
    setMobileMenuOpen(false);
    if (currentRoute === 'home') {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', buildUrlWithParams('/', searchString, anchor));
      }
    } else {
      onNavigate(buildUrlWithParams('/', searchString, anchor));
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (currentRoute === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.replaceState(null, '', buildUrlWithParams('/', searchString));
    } else {
      onNavigate(buildUrlWithParams('/', searchString));
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5F0]/95 backdrop-blur-xs border-b border-[#D9DED6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Логотип: Название проекта и под ним Василий Алешин */}
        <a
          href={buildUrlWithParams('/', searchString)}
          onClick={handleLogoClick}
          className="flex flex-col group focus-visible:outline-2 focus-visible:outline-[#315B48] rounded-sm py-1 -my-1 shrink-0"
          aria-label={`${SITE_CONTENT.specialist.brand} · ${SITE_CONTENT.specialist.name} — на главную страницу`}
        >
          <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#252C27] group-hover:text-[#315B48] transition-colors leading-tight">
            {SITE_CONTENT.specialist.brand}
          </span>
          <span className="text-xs sm:text-[13px] font-normal text-[#59635C] group-hover:text-[#252C27] transition-colors leading-tight mt-0.5">
            {SITE_CONTENT.specialist.name}
          </span>
        </a>

        {/* Навигационные ссылки */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#59635C]" aria-label="Основная навигация">
          <button
            type="button"
            onClick={() => handleNavClick('approach')}
            className="hover:text-[#252C27] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#315B48] py-1"
          >
            Подход
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('formats')}
            className="hover:text-[#252C27] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#315B48] py-1"
          >
            Форматы
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('cases')}
            className="hover:text-[#252C27] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#315B48] py-1"
          >
            Результаты
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('specialist')}
            className="hover:text-[#252C27] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#315B48] py-1"
          >
            О специалисте
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('faq')}
            className="hover:text-[#252C27] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#315B48] py-1"
          >
            Вопросы
          </button>
        </nav>

        {/* Целевое действие */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            type="button"
            onClick={(e) => onOpenContact(e.currentTarget)}
            className="inline-flex items-center justify-center rounded-xl bg-[#315B48] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#274839] transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] whitespace-nowrap shrink-0 shadow-xs"
          >
            Обсудить запрос
          </button>
        </div>

        {/* Мобильная кнопка меню */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="p-2 rounded-xl text-[#252C27] hover:bg-[#E9EFE8] transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48]"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#D9DED6] bg-[#FFFEFA] px-4 pt-4 pb-6 shadow-md">
          <nav className="flex flex-col space-y-2" aria-label="Мобильная навигация">
            <button
              type="button"
              onClick={() => handleNavClick('approach')}
              className="text-left text-base font-medium text-[#252C27] py-2 px-3 rounded-lg hover:bg-[#E9EFE8] transition-colors"
            >
              Подход
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('formats')}
              className="text-left text-base font-medium text-[#252C27] py-2 px-3 rounded-lg hover:bg-[#E9EFE8] transition-colors"
            >
              Форматы
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('cases')}
              className="text-left text-base font-medium text-[#252C27] py-2 px-3 rounded-lg hover:bg-[#E9EFE8] transition-colors"
            >
              Результаты
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('specialist')}
              className="text-left text-base font-medium text-[#252C27] py-2 px-3 rounded-lg hover:bg-[#E9EFE8] transition-colors"
            >
              О специалисте
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('faq')}
              className="text-left text-base font-medium text-[#252C27] py-2 px-3 rounded-lg hover:bg-[#E9EFE8] transition-colors"
            >
              Вопросы
            </button>
            <div className="pt-3 border-t border-[#D9DED6]">
              <button
                type="button"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  onOpenContact(e.currentTarget);
                }}
                className="w-full inline-flex items-center justify-center rounded-xl bg-[#315B48] text-white py-3 text-sm font-medium hover:bg-[#274839] transition-colors"
              >
                Обсудить запрос
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
