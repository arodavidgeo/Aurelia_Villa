import React, { useEffect, useState } from 'react';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomeHero } from './components/sections/HomeHero';
import { RoomsSection } from './components/sections/RoomsSection';
import { TheVillaSection } from './components/sections/TheVillaSection';
import { ExperiencesSection } from './components/sections/ExperiencesSection';
import { GallerySection } from './components/sections/GallerySection';
import { LocationSection } from './components/sections/LocationSection';
import { ContactSection } from './components/sections/ContactSection';
import { AmenitiesSection } from './components/sections/AmenitiesSection';
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
    // Capture UTM tracking parameters from URL
    initUTMTracking();

    // Trigger initial page view
    trackPageView(window.location.pathname || '/');

    // Handle 404 test hash or route
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
      {/* Accessibility Skip Link */}
      <SkipToContent />

      {/* Global Header */}
      <Header />

      {/* Main Content Landmark */}
      <main id="main-content" className="flex-1 pb-16 md:pb-0">
        {/* Screen 1: Home */}
        <HomeHero />

        {/* Screen 2: Rooms & Suites */}
        <RoomsSection />

        {/* Screen 3: The Villa */}
        <TheVillaSection />

        {/* Screen 4: Experiences */}
        <ExperiencesSection />

        {/* Screen 5: Gallery */}
        <GallerySection />

        {/* Facilities & Amenities */}
        <AmenitiesSection />

        {/* Screen 6: Location */}
        <LocationSection />

        {/* Stay Policies */}
        <BookingPoliciesSection />

        {/* FAQ Accordion */}
        <FAQSection />

        {/* Screen 7: Contact & Enquiries */}
        <ContactSection />
      </main>

      {/* Screen 8: Footer */}
      <Footer />

      {/* Overlay Modals & Controls */}
      <ConfirmationModal />
      <PolicyModal />
      <CookieConsent />
      <BackToTop />
      <FloatingWhatsApp />
      <MobileBookingBar />
    </div>
  );
};
