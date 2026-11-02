import React from 'react';
import { MessageCircle } from 'lucide-react';
import { PROPERTY } from '../../content/property';
import { useBooking } from '../../context/BookingContext';
import { trackWhatsAppClick } from '../../services/analytics';

export const FloatingWhatsApp: React.FC = () => {
  const { checkInDate, checkOutDate, guests, purposeOfVisit } = useBooking();

  const getWhatsAppUrl = () => {
    if (checkInDate || checkOutDate) {
      const lines = [
        '🏡 *VILLA AURELIA ENQUIRY*',
        '━━━━━━━━━━━━━━━━━━━━━━',
        `📅 *Dates:* ${checkInDate || 'Flexible'} to ${checkOutDate || 'Flexible'}`,
        `👥 *Guests:* ${guests} Guests`,
        `🎯 *Purpose:* ${purposeOfVisit || 'Family Stay'}`,
        `🏠 *Package:* Entire Private Villa (${PROPERTY.priceDisplay} / 24 Hours)`,
        '━━━━━━━━━━━━━━━━━━━━━━',
        'Hello Villa Aurelia, I would like to check availability for the above dates and requirements.'
      ];
      return `https://wa.me/${PROPERTY.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    }
    return PROPERTY.whatsappUrl;
  };

  const handleClick = () => {
    trackWhatsAppClick('floating_button');
  };

  return (
    <a
      href={getWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Chat with Villa Aurelia on WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-3.5 py-2.5 bg-theme-surface border border-theme-border shadow-md text-theme-text-primary hover:border-theme-accent hover:text-theme-accent transition-all duration-200 group font-sans"
    >
      <MessageCircle className="w-4 h-4 text-theme-accent transition-transform group-hover:scale-110" />
      <span className="text-xs tracking-wider uppercase font-medium hidden sm:inline-block">
        WhatsApp Us
      </span>
    </a>
  );
};
