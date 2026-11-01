import React from 'react';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from '../common/Logo';
import { BotanicalBranch } from '../common/BotanicalBranch';
import { useBooking } from '../../context/BookingContext';

export const Footer: React.FC = () => {
  const { setActivePolicyModal } = useBooking();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-theme-footer-bg text-theme-footer-text pt-16 pb-12 overflow-hidden border-t border-theme-border/40 font-sans">
      {/* Decorative Botanical Flourishes on edges */}
      <BotanicalBranch position="top-left" opacity={0.25} />
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Brand Centerpiece */}
        <div className="flex flex-col items-center text-center mb-12">
          <Logo variant="footer" className="mb-4 text-theme-footer-text" />

          {/* Quotation Statement */}
          <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-theme-footer-text font-normal max-w-xl my-4">
            “A quieter kind of luxury.”
          </blockquote>

          {/* Stay Connected Divider */}
          <div className="flex items-center gap-4 w-full max-w-xs my-4">
            <span className="flex-1 h-[1px] bg-theme-accent/40" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-theme-accent font-medium">
              STAY CONNECTED
            </span>
            <span className="flex-1 h-[1px] bg-theme-accent/40" />
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5 mt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Villa Aurelia Instagram"
              className="p-2 text-theme-footer-muted hover:text-theme-accent transition-colors"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Villa Aurelia Facebook"
              className="p-2 text-theme-footer-muted hover:text-theme-accent transition-colors"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Villa Aurelia Pinterest"
              className="p-2 text-theme-footer-muted hover:text-theme-accent transition-colors"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.5.03-3.57.14-.98.92-3.89.92-3.89s-.23-.47-.23-1.17c0-1.1.64-1.92 1.43-1.92.68 0 1 .5 1 1.12 0 .68-.43 1.7-.66 2.64-.19.8.4 1.45 1.18 1.45 1.42 0 2.51-1.5 2.51-3.66 0-1.92-1.38-3.26-3.34-3.26-2.28 0-3.62 1.71-3.62 3.47 0 .69.26 1.43.6 1.83.07.08.08.15.06.23-.06.26-.2.83-.23.95-.04.15-.13.18-.3.11-1.12-.52-1.82-2.16-1.82-3.48 0-2.83 2.06-5.43 5.94-5.43 3.12 0 5.54 2.22 5.54 5.2 0 3.1-1.95 5.6-4.66 5.6-.91 0-1.77-.47-2.06-1.03l-.56 2.14c-.2.78-.75 1.76-1.12 2.36A12 12 0 1 0 12 0z" />
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Villa Aurelia YouTube"
              className="p-2 text-theme-footer-muted hover:text-theme-accent transition-colors"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-[1px] bg-theme-border/30 mb-12" />

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-xs text-theme-footer-muted">
          {/* Col 1: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base tracking-wider text-theme-footer-text font-normal uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['Home', 'Rooms & Suites', 'The Villa', 'Experiences', 'Gallery', 'Location', 'Contact'].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      className="hover:text-theme-accent transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Col 2: Our Policies */}
          <div className="space-y-3">
            <h4 className="font-serif text-base tracking-wider text-theme-footer-text font-normal uppercase">
              Our Policies
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicyModal('terms')}
                  className="hover:text-theme-accent transition-colors text-left"
                >
                  Terms of Stay
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicyModal('cancellation')}
                  className="hover:text-theme-accent transition-colors text-left"
                >
                  Cancellation Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActivePolicyModal('privacy')}
                  className="hover:text-theme-accent transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-theme-accent transition-colors">
                  Frequently Asked Questions (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Verified Contact Info */}
          <div className="space-y-3">
            <h4 className="font-serif text-base tracking-wider text-theme-footer-text font-normal uppercase">
              Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-theme-accent shrink-0 mt-0.5" />
                <span>123 Villa Aurelia, [Your Area], [City], [State]</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-theme-accent shrink-0" />
                <a href="tel:+919876543210" className="hover:text-theme-accent transition-colors">
                  +91 98765 43210
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-theme-accent shrink-0" />
                <a href="mailto:info@villaaurelia.com" className="hover:text-theme-accent transition-colors">
                  info@villaaurelia.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Verification Notice */}
        <div className="mt-12 pt-6 border-t border-theme-border/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-theme-footer-muted/80 gap-3">
          <p>© {currentYear} Villa Aurelia. All rights reserved.</p>
          <p className="italic text-[10px]">
            Official boutique villa accommodation portal. All rates & policies subject to final verification.
          </p>
        </div>
      </div>
    </footer>
  );
};
