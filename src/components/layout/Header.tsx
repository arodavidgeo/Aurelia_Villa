import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import { useBooking } from '../../context/BookingContext';
import { trackBookingCTAClick } from '../../services/analytics';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollToEnquiry } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'STAY', href: '#stay' },
    { label: 'THE VILLA', href: '#the-villa' },
    { label: 'EXPERIENCES', href: '#experiences' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'LOCATION', href: '#location' },
  ];

  const handleEnquireClick = () => {
    trackBookingCTAClick('header_nav_button');
    setMobileMenuOpen(false);
    scrollToEnquiry();
  };

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 bg-theme-bg/95 border-b ${
        isScrolled
          ? 'border-theme-border shadow-sm py-2.5'
          : 'border-theme-border/60 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center space-x-6 lg:space-x-8"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] lg:text-xs font-sans tracking-[0.16em] uppercase text-theme-text-primary hover:text-theme-accent transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle & Enquire/Book */}
        <div className="hidden md:flex items-center gap-3.5">
          <ThemeToggle />

          <button
            type="button"
            onClick={handleEnquireClick}
            className="px-4 py-2 border border-theme-accent text-theme-accent hover:bg-theme-accent hover:text-theme-bg dark:hover:text-theme-surface-deep text-[11px] lg:text-xs font-sans tracking-[0.18em] uppercase transition-all duration-200"
          >
            ENQUIRE / BOOK
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            className="p-2 text-theme-text-primary hover:text-theme-accent border border-theme-border/60"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 top-[60px] z-50 bg-theme-bg/98 border-t border-theme-border md:hidden flex flex-col justify-between p-6 animate-fadeIn"
        >
          <div className="flex flex-col space-y-6 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavLinkClick}
                className="text-base font-serif tracking-[0.14em] uppercase text-theme-text-primary hover:text-theme-accent transition-colors border-b border-theme-border/30 pb-3"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-6 space-y-4 border-t border-theme-border">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-theme-text-secondary">
                Appearance Mode
              </span>
              <ThemeToggle showLabel />
            </div>

            <button
              type="button"
              onClick={handleEnquireClick}
              className="w-full py-3 border border-theme-accent text-theme-accent hover:bg-theme-accent hover:text-theme-bg text-xs font-sans tracking-[0.2em] uppercase transition-colors"
            >
              ENQUIRE / BOOK
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
