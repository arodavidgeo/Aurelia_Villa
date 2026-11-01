// Analytics Helper respecting Cookie Consent and GA4
export const canTrackAnalytics = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem('va_cookie_consent');
    if (!raw) return false;
    const consent = JSON.parse(raw);
    return Boolean(consent?.analytics);
  } catch {
    return false;
  }
};

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
) => {
  if (!canTrackAnalytics()) {
    return;
  }

  // If GA4 gtag exists on window
  const win = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof win.gtag === 'function') {
    win.gtag('event', eventName, eventParams);
  }

  if (import.meta.env.DEV) {
    console.info(`[Analytics Event: ${eventName}]`, eventParams);
  }
};

export const trackPageView = (pagePath: string) => {
  trackEvent('page_view', { page_path: pagePath });
};

export const trackBookingCTAClick = (source: string) => {
  trackEvent('booking_cta_click', { cta_source: source });
};

export const trackEnquirySubmitted = (preferredRoom: string, guests: number) => {
  trackEvent('enquiry_submitted', {
    preferred_room: preferredRoom,
    guest_count: guests,
  });
};

export const trackWhatsAppClick = (source: string) => {
  trackEvent('whatsapp_click', { source });
};
