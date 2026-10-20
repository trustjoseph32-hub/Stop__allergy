import React from 'react';
import { SITE_CONTENT } from '../config/siteContent.ts';

interface SpecialistVisualProps {
  className?: string;
  variant?: 'hero' | 'about';
}

/**
 * Аутентичный визуальный блок специалиста без псевдо-виджетов и декоративного нейрослопа.
 * Отображает реальный портрет Василия Алешина с семейным сходством с его сайтом.
 */
export const SpecialistVisual: React.FC<SpecialistVisualProps> = ({
  className = '',
  variant = 'hero',
}) => {
  const { specialist } = SITE_CONTENT;

  return (
    <figure className={`flex flex-col items-center lg:items-end ${className}`}>
      <div className="overflow-hidden rounded-2xl border border-[#D9DED6] bg-[#FFFEFA] max-w-sm sm:max-w-md w-full shadow-xs">
        <img
          src={specialist.photoUrl || '/images/vasiliy-aleshin-portrait.webp'}
          alt={`Портрет специалиста ${specialist.name} — ${specialist.title}`}
          loading={variant === 'hero' ? 'eager' : 'lazy'}
          className="w-full aspect-[4/5] object-cover object-top"
        />
      </div>
      <figcaption className="mt-3 text-center sm:text-left text-xs sm:text-sm text-[#59635C] w-full max-w-sm sm:max-w-md">
        <span className="font-semibold text-[#252C27]">{specialist.name}</span> · более 11 лет практики · Онлайн и очно
      </figcaption>
    </figure>
  );
};
