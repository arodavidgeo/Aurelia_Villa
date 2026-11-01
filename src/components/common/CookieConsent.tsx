import React, { useEffect, useState } from 'react';
import { Cookie, Settings, ShieldCheck, X } from 'lucide-react';
import { CookiePreferences } from '../../types';

const STORAGE_KEY = 'va_cookie_consent';

export const CookieConsent: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showManageModal, setShowManageModal] = useState<boolean>(false);
  const [analyticsConsent, setAnalyticsConsent] = useState<boolean>(false);
  const [marketingConsent, setMarketingConsent] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Wait a subtle 1s delay before showing
        const timer = setTimeout(() => setShowBanner(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const savePreferences = (essential: boolean, analytics: boolean, marketing: boolean) => {
    const prefs: CookiePreferences = {
      essential,
      analytics,
      marketing,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {
      console.error(e);
    }

    setShowBanner(false);
    setShowManageModal(false);
  };

  const handleAcceptAll = () => {
    savePreferences(true, true, true);
  };

  const handleRejectOptional = () => {
    savePreferences(true, false, false);
  };

  const handleSaveCustom = () => {
    savePreferences(true, analyticsConsent, marketingConsent);
  };

  if (!showBanner && !showManageModal) return null;

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && !showManageModal && (
        <aside
          aria-label="Cookie consent banner"
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5 bg-theme-surface/95 backdrop-blur-none border-t border-theme-border shadow-2xl transition-all font-sans"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-theme-surface-raised border border-theme-border text-theme-accent shrink-0 mt-0.5">
                <Cookie className="w-4 h-4" />
              </div>
              <div className="text-xs text-theme-text-secondary leading-relaxed max-w-2xl">
                <p className="text-theme-text-primary font-medium mb-1">
                  We respect your privacy at Villa Aurelia
                </p>
                We use necessary cookies for site security and functionality. With your consent, we also use restrained performance cookies to improve your browsing experience.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={() => setShowManageModal(true)}
                className="px-3.5 py-2 text-xs border border-theme-border text-theme-text-secondary hover:text-theme-accent hover:border-theme-accent transition-colors"
              >
                Preferences
              </button>
              <button
                type="button"
                onClick={handleRejectOptional}
                className="px-3.5 py-2 text-xs border border-theme-border text-theme-text-secondary hover:text-theme-text-primary transition-colors"
              >
                Necessary Only
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 text-xs bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep font-medium tracking-wide uppercase transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Manage Preferences Modal */}
      {showManageModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 font-sans"
          onClick={() => setShowManageModal(false)}
        >
          <div
            className="relative w-full max-w-md bg-theme-surface border border-theme-border p-6 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-theme-border pb-3">
              <div className="flex items-center gap-2 text-theme-text-primary">
                <Settings className="w-4 h-4 text-theme-accent" />
                <h3 className="font-serif text-lg font-medium">Cookie Preferences</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowManageModal(false)}
                className="text-theme-text-secondary hover:text-theme-accent"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-theme-surface-raised border border-theme-border/60 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1.5 font-medium text-theme-text-primary">
                    <ShieldCheck className="w-3.5 h-3.5 text-theme-accent" />
                    Essential Cookies
                  </div>
                  <p className="text-theme-text-secondary mt-1">
                    Required for core security, theme preferences, and reservation enquiry transmission. Cannot be disabled.
                  </p>
                </div>
                <span className="text-[10px] text-theme-accent font-mono uppercase bg-theme-surface px-1.5 py-0.5 border border-theme-border">
                  Always Active
                </span>
              </div>

              <div className="p-3 bg-theme-surface-raised border border-theme-border/60 flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-theme-text-primary">Analytics & Performance</div>
                  <p className="text-theme-text-secondary mt-1">
                    Helps us understand how guests navigate our villa pages so we can refine our presentation.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={analyticsConsent}
                  onChange={(e) => setAnalyticsConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-theme-accent cursor-pointer"
                />
              </div>

              <div className="p-3 bg-theme-surface-raised border border-theme-border/60 flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-theme-text-primary">Personalisation</div>
                  <p className="text-theme-text-secondary mt-1">
                    Remembers your travel dates and preferred room category during your session.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={marketingConsent}
                  onChange={(e) => setMarketingConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 accent-theme-accent cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-theme-border">
              <button
                type="button"
                onClick={() => setShowManageModal(false)}
                className="px-3.5 py-2 text-xs border border-theme-border text-theme-text-secondary hover:text-theme-text-primary transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-2 text-xs bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep font-medium tracking-wide uppercase transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
