import React from 'react';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { Logo } from '../common/Logo';
import { BotanicalBranch } from '../common/BotanicalBranch';
import { useBooking } from '../../context/BookingContext';
import { PROPERTY } from '../../content/property';

export const Footer: React.FC = () => {
  const { setActivePolicyModal } = useBooking();
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative text-theme-footer-text pt-16 pb-12 overflow-hidden border-t border-theme-border/40 font-sans site-footer"
      style={{ backgroundColor: 'var(--footer-bg)' }}
    >
      <BotanicalBranch position="top-left" opacity={0.2} />
      <BotanicalBranch position="top-right" opacity={0.2} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Brand Centerpiece */}
        <div className="flex flex-col items-center text-center mb-12">
          <Logo variant="footer" className="mb-4 text-theme-footer-text" />

          {/* Quotation Statement */}
          <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-theme-footer-text font-normal max-w-xl my-3">
            “{PROPERTY.tagline}”
          </blockquote>

          {/* Stay Connected Divider */}
          <div className="flex items-center gap-4 w-full max-w-xs my-3">
            <span className="flex-1 h-[1px] bg-theme-accent/40" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-theme-accent font-medium">
              STAY CONNECTED
            </span>
            <span className="flex-1 h-[1px] bg-theme-accent/40" />
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5 mt-1">
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

        {/* Divider */}
        <div className="w-full h-[1px] bg-theme-border/30 mb-10" />

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-xs text-theme-footer-muted">
          {/* Col 1: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base tracking-wider text-theme-footer-text font-normal uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '#home' },
                { label: 'The Villa', href: '#the-villa' },
                { label: 'Amenities & Facilities', href: '#amenities' },
                { label: 'Terrace & Celebrations', href: '#terrace' },
                { label: 'Photo Gallery', href: '#gallery' },
                { label: 'Location & Map', href: '#location' },
                { label: 'Booking Enquiry', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-theme-accent transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Property Guidelines */}
          <div className="space-y-3">
            <h4 className="font-serif text-base tracking-wider text-theme-footer-text font-normal uppercase">
              Stay Policies
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
                  Cancellation & Refund Terms
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
                <span>{PROPERTY.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-theme-accent shrink-0" />
                <a href={PROPERTY.phoneTel} className="hover:text-theme-accent transition-colors">
                  {PROPERTY.phoneDisplay}
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

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-theme-border/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-theme-footer-muted/80 gap-3">
          <p>© {currentYear} Villa Aurelia. All rights reserved.</p>
          <p className="italic text-[10px]">
            Private residence in Tirunelveli. {PROPERTY.confirmationNotice}
          </p>
        </div>
      </div>
    </footer>
  );
};
