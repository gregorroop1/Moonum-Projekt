import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = 'moonum_cookie_consent';

type ConsentStatus = 'granted' | 'denied' | null;

function getStoredConsent(): ConsentStatus {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    if (value === 'granted' || value === 'denied') return value;
  } catch {
    // localStorage unavailable
  }
  return null;
}

function setStoredConsent(status: 'granted' | 'denied') {
  try {
    localStorage.setItem(CONSENT_KEY, status);
  } catch {
    // localStorage unavailable
  }
}

function updateGtagConsent(status: 'granted' | 'denied') {
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: status,
      ad_user_data: status,
      ad_personalization: status,
      analytics_storage: status,
    });
  }
}

export default function CookieConsent() {
  const { t } = useTranslation('common');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored === null) {
      // No choice yet — show the banner after a short delay
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
    // Returning user — re-apply their choice
    updateGtagConsent(stored);
  }, []);

  const handleAccept = () => {
    setStoredConsent('granted');
    updateGtagConsent('granted');
    setVisible(false);
  };

  const handleDecline = () => {
    setStoredConsent('denied');
    updateGtagConsent('denied');
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6"
          role="dialog"
          aria-label={t('cookieConsent.title', { defaultValue: 'Cookie consent' })}
        >
          <div className="mx-auto max-w-3xl border border-zinc-700/50 bg-zinc-900/95 backdrop-blur-xl shadow-2xl shadow-black/40">
            <div className="flex flex-col gap-4 p-5 md:p-6">
              {/* Header row */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-brand-primary/15">
                    <Cookie size={20} className="text-brand-primary" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                    {t('cookieConsent.title', { defaultValue: 'We use cookies' })}
                  </h3>
                </div>
                <button
                  onClick={handleDecline}
                  className="shrink-0 p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300 transition-colors"
                  aria-label={t('cookieConsent.close', { defaultValue: 'Close' })}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <p className="text-sm leading-relaxed text-zinc-400">
                {t('cookieConsent.message', {
                  defaultValue:
                    'We use cookies and similar technologies to help personalise content, measure ads performance, and provide a better experience. By clicking "Accept", you consent to the use of cookies.',
                })}
              </p>

              {/* Actions */}
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-3">
                <button
                  onClick={handleDecline}
                  className="border border-zinc-700 px-5 py-2.5 text-sm font-semibold text-zinc-300 tracking-wide uppercase hover:bg-zinc-800 hover:border-zinc-600 transition-all duration-200"
                >
                  {t('cookieConsent.decline', { defaultValue: 'Decline' })}
                </button>
                <button
                  onClick={handleAccept}
                  className="bg-brand-primary px-5 py-2.5 text-sm font-semibold text-white tracking-wide uppercase hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-brand-primary/25"
                >
                  {t('cookieConsent.accept', { defaultValue: 'Accept' })}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
