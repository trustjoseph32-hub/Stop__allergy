import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONTENT } from '../config/siteContent.ts';
import { getContactMessage } from '../utils/navigation.ts';
import { X, Copy, Check, Send, AlertCircle } from 'lucide-react';

export type ContactTopic = 'self' | 'child';

interface ContactDialogProps {
  isOpen: boolean;
  initialTopic?: ContactTopic;
  onClose: () => void;
  triggerElementRef?: HTMLElement | null;
}

export const ContactDialog: React.FC<ContactDialogProps> = ({
  isOpen,
  initialTopic = 'self',
  onClose,
  triggerElementRef,
}) => {
  const [topic, setTopic] = useState<ContactTopic>(initialTopic);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Sync initial topic whenever dialog opens
  useEffect(() => {
    if (isOpen) {
      setTopic(initialTopic);
      setCopyStatus('idle');
    }
  }, [isOpen, initialTopic]);

  const currentMessage = getContactMessage(topic, {
    self: SITE_CONTENT.contact.messageTemplateSelf,
    child: SITE_CONTENT.contact.messageTemplateChild,
  });

  // Handle focus trapping and Escape key
  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement | null;

    // Focus close button initially
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        if (!dialogRef.current) return;
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const focusableArray = Array.from(focusableElements).filter(
          (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
        );

        if (focusableArray.length === 0) return;

        const firstElement = focusableArray[0];
        const lastElement = focusableArray[focusableArray.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Prevent body scroll
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;

      // Restore focus
      if (triggerElementRef && typeof triggerElementRef.focus === 'function') {
        triggerElementRef.focus();
      } else if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      }
    };
  }, [isOpen, onClose, triggerElementRef]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(currentMessage);
        setCopyStatus('copied');
        setTimeout(() => setCopyStatus('idle'), 3000);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = currentMessage;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);

        if (successful) {
          setCopyStatus('copied');
          setTimeout(() => setCopyStatus('idle'), 3000);
        } else {
          setCopyStatus('error');
        }
      }
    } catch {
      setCopyStatus('error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#252C27]/50 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-dialog-title"
        className="w-full max-w-lg rounded-2xl bg-[#FFFEFA] border border-[#D9DED6] p-6 sm:p-8 shadow-xl text-[#252C27] relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title & Close button */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#D9DED6]">
          <div>
            <h2 id="contact-dialog-title" className="font-serif text-2xl font-semibold tracking-tight text-[#252C27]">
              Обсудим ваш запрос
            </h2>
            <p className="mt-1 text-sm text-[#59635C]">
              Ознакомительный созвон · бесплатно · 10–15 минут
            </p>
          </div>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            aria-label="Закрыть окно"
            className="rounded-full p-2 text-[#59635C] hover:text-[#252C27] hover:bg-[#E9EFE8] transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48]"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Topic Selector */}
        <div className="mt-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#59635C] mb-2">
            Тема обращения
          </label>
          <div className="grid grid-cols-2 gap-2" role="group" aria-label="Выбор темы обращения">
            <button
              type="button"
              onClick={() => {
                setTopic('self');
                setCopyStatus('idle');
              }}
              className={`py-2.5 px-4 rounded-xl text-sm font-medium border text-center transition-all ${
                topic === 'self'
                  ? 'bg-[#315B48] text-white border-[#315B48] shadow-xs'
                  : 'bg-[#FFFEFA] text-[#252C27] border-[#D9DED6] hover:bg-[#E9EFE8]'
              }`}
            >
              Для себя
            </button>
            <button
              type="button"
              onClick={() => {
                setTopic('child');
                setCopyStatus('idle');
              }}
              className={`py-2.5 px-4 rounded-xl text-sm font-medium border text-center transition-all ${
                topic === 'child'
                  ? 'bg-[#315B48] text-white border-[#315B48] shadow-xs'
                  : 'bg-[#FFFEFA] text-[#252C27] border-[#D9DED6] hover:bg-[#E9EFE8]'
              }`}
            >
              По поводу ребёнка
            </button>
          </div>
        </div>

        {/* Context Note */}
        <p className="mt-4 text-sm text-[#59635C] leading-relaxed">
          Напишите Василию, чтобы договориться об ознакомительном созвоне. Время согласуется в переписке.
        </p>

        {/* Message Preview Box */}
        <div className="mt-4 rounded-xl bg-[#F7F5F0] border border-[#D9DED6] p-4 text-sm text-[#252C27] font-sans">
          <div className="text-xs uppercase tracking-wider font-semibold text-[#59635C] mb-1.5 flex items-center justify-between">
            <span>Текст первого сообщения</span>
            <span className="text-[11px] normal-case text-[#59635C]/80">готовый шаблон</span>
          </div>
          <p className="italic leading-relaxed select-all text-[#252C27]">
            «{currentMessage}»
          </p>
        </div>

        {/* Status notice if copy failed */}
        {copyStatus === 'error' && (
          <div className="mt-3 flex items-center gap-2 text-xs text-amber-800 bg-amber-50 p-3 rounded-lg border border-amber-200">
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Не удалось скопировать автоматически. Пожалуйста, выделите текст в поле выше и скопируйте вручную.</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={SITE_CONTENT.contact.telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#315B48] text-white px-5 py-3 text-sm font-medium hover:bg-[#274839] transition-colors focus-visible:outline-2 focus-visible:outline-[#315B48] shadow-xs"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            <span>Написать Василию в Telegram</span>
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-medium border transition-colors ${
              copyStatus === 'copied'
                ? 'bg-[#E9EFE8] text-[#315B48] border-[#315B48]'
                : 'bg-[#FFFEFA] text-[#252C27] border-[#D9DED6] hover:bg-[#E9EFE8]'
            }`}
          >
            {copyStatus === 'copied' ? (
              <>
                <Check className="w-4 h-4 text-[#315B48]" aria-hidden="true" />
                <span>Текст скопирован</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#59635C]" aria-hidden="true" />
                <span>Скопировать текст обращения</span>
              </>
            )}
          </button>
        </div>

        {/* Specialist direct handle note */}
        <div className="mt-4 pt-3 border-t border-[#D9DED6] text-xs text-[#59635C] flex items-center justify-between">
          <span>Специалист: {SITE_CONTENT.specialist.name}</span>
          <span className="font-mono text-[#315B48]">{SITE_CONTENT.contact.telegramUsername}</span>
        </div>
      </div>
    </div>
  );
};
