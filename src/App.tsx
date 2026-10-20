/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { ContactDialog, ContactTopic } from './components/ContactDialog.tsx';
import { HomePage } from './pages/HomePage.tsx';
import { TherapyPage } from './pages/TherapyPage.tsx';
import { CoursePage } from './pages/CoursePage.tsx';
import { RequestDetailPage } from './pages/RequestDetailPage.tsx';
import { RouteId, parseRoute, buildUrlWithParams } from './utils/navigation.ts';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<RouteId>(() =>
    parseRoute(window.location.pathname)
  );
  const [searchString, setSearchString] = useState<string>(() => window.location.search);
  const [isContactOpen, setIsContactOpen] = useState<boolean>(false);
  const [contactTopic, setContactTopic] = useState<ContactTopic>('self');
  const triggerRef = useRef<HTMLElement | null>(null);

  // Sync state on popstate (browser back / forward)
  useEffect(() => {
    const handlePopState = () => {
      const newRoute = parseRoute(window.location.pathname);
      setCurrentRoute(newRoute);
      setSearchString(window.location.search);

      // Handle hash scroll if present
      if (window.location.hash) {
        const hashId = window.location.hash.replace('#', '');
        setTimeout(() => {
          const el = document.getElementById(hashId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initial anchor scroll if landing with hash
  useEffect(() => {
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(hashId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  // Navigate handler with pushState preserving query params
  const navigate = useCallback(
    (targetUrl: string) => {
      const [pathAndQuery, hash] = targetUrl.split('#');
      const [path, query] = pathAndQuery.split('?');

      const nextRoute = parseRoute(path);
      const nextSearch = query !== undefined ? (query ? `?${query}` : '') : searchString;

      setCurrentRoute(nextRoute);
      if (query !== undefined) {
        setSearchString(nextSearch);
      }

      const fullUrl = buildUrlWithParams(
        nextRoute === 'home' ? '/' : `/${nextRoute}`,
        nextSearch,
        hash
      );

      window.history.pushState(null, '', fullUrl);

      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [searchString]
  );

  const handleOpenContact = useCallback(
    (triggerEl?: HTMLElement, topic: ContactTopic = 'self') => {
      triggerRef.current = triggerEl || null;
      setContactTopic(topic);
      setIsContactOpen(true);
    },
    []
  );

  const handleCloseContact = useCallback(() => {
    setIsContactOpen(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5F0] text-[#252C27] font-sans">
      {/* Шапка сайта */}
      <Header
        currentRoute={currentRoute}
        searchString={searchString}
        onNavigate={navigate}
        onOpenContact={(el) => handleOpenContact(el, 'self')}
      />

      {/* Основной контент страницы */}
      <main id="main-content" className="flex-1">
        {currentRoute === 'home' && (
          <HomePage
            onNavigateTherapy={() => navigate('/therapy')}
            onNavigateCourse={() => navigate('/course')}
            onNavigateRequest={(url) => navigate(url)}
            onOpenContact={handleOpenContact}
          />
        )}

        {currentRoute === 'therapy' && (
          <TherapyPage
            onNavigateHome={() => navigate('/')}
            onOpenContact={handleOpenContact}
          />
        )}

        {currentRoute === 'course' && (
          <CoursePage
            onNavigateHome={() => navigate('/')}
            onNavigateTherapy={() => navigate('/therapy')}
          />
        )}

        {currentRoute === 'allergy' && (
          <RequestDetailPage
            requestId="allergy"
            onNavigateHome={() => navigate('/')}
            onNavigateTherapy={() => navigate('/therapy')}
            onNavigateCourse={() => navigate('/course')}
            onOpenContact={handleOpenContact}
          />
        )}

        {currentRoute === 'dermatitis' && (
          <RequestDetailPage
            requestId="dermatitis"
            onNavigateHome={() => navigate('/')}
            onNavigateTherapy={() => navigate('/therapy')}
            onNavigateCourse={() => navigate('/course')}
            onOpenContact={handleOpenContact}
          />
        )}

        {currentRoute === 'asthma' && (
          <RequestDetailPage
            requestId="asthma"
            onNavigateHome={() => navigate('/')}
            onNavigateTherapy={() => navigate('/therapy')}
            onNavigateCourse={() => navigate('/course')}
            onOpenContact={handleOpenContact}
          />
        )}
      </main>

      {/* Подвал сайта */}
      <Footer />

      {/* Единый доступный диалог обращения */}
      <ContactDialog
        isOpen={isContactOpen}
        initialTopic={contactTopic}
        onClose={handleCloseContact}
        triggerElementRef={triggerRef.current}
      />
    </div>
  );
}
