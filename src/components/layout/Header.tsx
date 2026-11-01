import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import { useBooking } from '../../context/BookingContext';
import { PROPERTY } from '../../content/property';

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
    { label: 'EXPLORE', href: '#explore' },
    { label: 'THE VILLA', href: '#the-villa' },
    { label: 'AMENITIES', href: '#amenities' },
    { label: 'TERRACE', href: '#terrace' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'LOCATION', href: '#location' },
    { label: 'FAQ', href: '#faq' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleEnquireClick = () => {
    setMobileMenuOpen(false);
    scrollToEnquiry();
  };

  const handleNavLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b site-header ${
        isScrolled
          ? 'border-theme-border shadow-md py-2.5'
          : 'border-theme-border/60 py-3.5'
      }`}
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Official Brand Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden lg:flex items-center space-x-6 xl:space-x-8"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] xl:text-xs font-sans tracking-[0.16em] uppercase text-theme-text-primary hover:text-theme-accent transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions: Phone, Theme Toggle & Enquire */}
        <div className="hidden sm:flex items-center gap-3.5">
          <a
            href={PROPERTY.phoneTel}
            className="hidden xl:flex items-center gap-1.5 text-xs text-theme-text-secondary hover:text-theme-accent font-sans transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-theme-accent" />
            <span>{PROPERTY.phoneDisplay}</span>
          </a>

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
        <div className="flex lg:hidden items-center gap-2">
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
          className="fixed inset-0 top-[60px] z-50 border-t border-theme-border lg:hidden flex flex-col justify-between p-6 animate-fadeIn site-mobile-drawer"
          style={{ backgroundColor: 'var(--page-bg)' }}
        >
          <div className="flex flex-col space-y-4 pt-2">
            <div className="pb-3 border-b border-theme-border/30">
              <span className="text-xs font-serif uppercase tracking-widest text-theme-accent block mb-1">
                Entire Villa Stay
              </span>
              <span className="text-sm font-serif text-theme-text-primary">
                {PROPERTY.priceDisplay} · 24-Hour Stay
              </span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavLinkClick}
                className="text-base font-serif tracking-[0.12em] uppercase text-theme-text-primary hover:text-theme-accent transition-colors border-b border-theme-border/30 pb-2.5"
              >
                {link.label}
              </a>
            ))}

            <a
              href={PROPERTY.phoneTel}
              className="flex items-center gap-2 text-sm text-theme-text-primary font-sans pt-1"
            >
              <Phone className="w-4 h-4 text-theme-accent" />
              <span>Call: {PROPERTY.phoneDisplay}</span>
            </a>
          </div>

          <div className="pt-4 space-y-3 border-t border-theme-border">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-theme-text-secondary">
                Appearance
              </span>
              <ThemeToggle showLabel />
            </div>

            <button
              type="button"
              onClick={handleEnquireClick}
              className="w-full py-3 bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep text-xs font-sans tracking-[0.2em] uppercase transition-colors"
            >
              ENQUIRE / BOOK · {PROPERTY.priceDisplay}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
