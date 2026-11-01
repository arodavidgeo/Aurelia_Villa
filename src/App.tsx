import React, { useEffect, useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomeHero } from './components/sections/HomeHero';
import { TheVillaSection } from './components/sections/TheVillaSection';
import { AmenitiesSection } from './components/sections/AmenitiesSection';
import { TerraceSection } from './components/sections/TerraceSection';
import { GallerySection } from './components/sections/GallerySection';
import { LocationSection } from './components/sections/LocationSection';
import { ContactSection } from './components/sections/ContactSection';
import { FAQSection } from './components/sections/FAQSection';
import { BookingPoliciesSection } from './components/sections/BookingPoliciesSection';
import { SkipToContent } from './components/common/SkipToContent';
import { BackToTop } from './components/common/BackToTop';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { MobileBookingBar } from './components/common/MobileBookingBar';
import { ConfirmationModal } from './components/common/ConfirmationModal';
import { PolicyModal } from './components/common/PolicyModal';
import { CookieConsent } from './components/common/CookieConsent';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { initUTMTracking } from './services/utm';
import { trackPageView } from './services/analytics';

export const App: React.FC = () => {
  const [is404, setIs404] = useState<boolean>(false);

  useEffect(() => {
    initUTMTracking();
    trackPageView(window.location.pathname || '/');

    const checkHash = () => {
      if (window.location.hash === '#404') {
        setIs404(true);
      } else {
        setIs404(false);
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  if (is404) {
    return (
      <NotFoundPage
        onReturnHome={() => {
          window.location.hash = '';
          setIs404(false);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text-primary transition-colors duration-200 flex flex-col selection:bg-theme-accent selection:text-white">
      <SkipToContent />
      <Header />

      <main id="main-content" className="flex-1 pb-16 md:pb-0">
        {/* Screen 1: Home */}
        <HomeHero />

        {/* Screen 2: The Villa Walkthrough */}
        <TheVillaSection />

        {/* Screen 3: Verified Amenities & Facilities */}
        <AmenitiesSection />

        {/* Screen 4: Terrace & Celebrations */}
        <TerraceSection />

        {/* Screen 5: Real Photo Gallery */}
        <GallerySection />

        {/* Screen 6: Pricing & Stay Policies */}
        <BookingPoliciesSection />

        {/* Screen 7: Location & Directions in Tirunelveli */}
        <LocationSection />

        {/* Screen 8: FAQ Accordion */}
        <FAQSection />

        {/* Screen 9: Contact & Enquiry Form */}
        <ContactSection />
      </main>

      {/* Screen 10: Footer */}
      <Footer />

      {/* Floating Overlays */}
      <ConfirmationModal />
      <PolicyModal />
      <CookieConsent />
      <BackToTop />
      <FloatingWhatsApp />
      <MobileBookingBar />
    </div>
  );
};
