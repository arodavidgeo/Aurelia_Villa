import React from 'react';
import { Calendar } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { PROPERTY } from '../../content/property';
import { trackBookingCTAClick } from '../../services/analytics';

export const MobileBookingBar: React.FC = () => {
  const { scrollToEnquiry } = useBooking();

  const handleBook = () => {
    trackBookingCTAClick('mobile_bottom_bar');
    scrollToEnquiry();
  };

  return (
    <aside
      aria-label="Mobile booking action"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t border-theme-border px-4 py-2.5 flex items-center justify-between gap-3 shadow-lg site-mobile-bar"
      style={{ backgroundColor: 'var(--surface)' }}
    >
      <div className="flex flex-col">
        <span className="text-[10px] tracking-widest uppercase text-theme-accent font-medium">
          Villa Aurelia · Tirunelveli
        </span>
        <span className="text-xs font-serif text-theme-text-primary">
          {PROPERTY.priceDisplay} / 24-Hour Stay
        </span>
      </div>
      <button
        type="button"
        onClick={handleBook}
        className="flex items-center gap-1.5 px-4 py-2 bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep text-xs font-medium tracking-wider uppercase transition-colors"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>Enquire Now</span>
      </button>
    </aside>
  );
};
