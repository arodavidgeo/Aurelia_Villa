import React from 'react';
import { MessageCircle } from 'lucide-react';
import { trackWhatsAppClick } from '../../services/analytics';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappNumber = import.meta.env.VITE_PROPERTY_WHATSAPP || '919876543210';
  const prefilledMessage = encodeURIComponent(
    'Hello Villa Aurelia team, I would like to enquire about room availability and reservations.'
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${prefilledMessage}`;

  const handleClick = () => {
    trackWhatsAppClick('floating_button');
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Chat with Villa Aurelia on WhatsApp"
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-3.5 py-2.5 bg-theme-surface border border-theme-border/80 shadow-sm text-theme-text-primary hover:border-theme-accent hover:text-theme-accent transition-all duration-200 group font-sans"
    >
      <MessageCircle className="w-4 h-4 text-theme-accent transition-transform group-hover:scale-110" />
      <span className="text-xs tracking-wider uppercase font-medium hidden sm:inline-block">
        WhatsApp Us
      </span>
    </a>
  );
};

