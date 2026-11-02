import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Users,
  ArrowRight,
  Home,
  Wind,
  Car,
  PartyPopper,
} from 'lucide-react';
import { BotanicalBranch } from '../common/BotanicalBranch';
import { useBooking } from '../../context/BookingContext';
import { PROPERTY } from '../../content/property';
import { trackBookingCTAClick } from '../../services/analytics';

export const HomeHero: React.FC = () => {
  const {
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    guests,
    setGuests,
    scrollToEnquiry,
  } = useBooking();

  const [dateError, setDateError] = useState<string>('');
  const todayStr = new Date().toISOString().split('T')[0];

  const handleEnquireStripSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDateError('');

    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);
      if (checkOut <= checkIn) {
        setDateError('Check-out date must be after check-in date.');
        return;
      }
    }

    trackBookingCTAClick('hero_booking_strip');
    scrollToEnquiry();
  };

  const highlightIcons = [Home, Wind, PartyPopper, Car];

  return (
    <section id="home" className="relative pt-4 sm:pt-6 pb-10 sm:pb-12 overflow-hidden">
      <BotanicalBranch position="top-left" opacity={0.25} className="-translate-x-6" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Hero Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-4 z-10">
            <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-3">
              {PROPERTY.eyebrow}
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-normal leading-[1.1] text-theme-text-primary tracking-tight mb-4">
              Your Space. <br />
              Your Moments. <br />
              <span className="text-theme-accent italic">Your Villa.</span>
            </h1>

            <p className="text-sm sm:text-base font-sans text-theme-text-secondary leading-relaxed max-w-md mb-4">
              {PROPERTY.heroSupport}
            </p>

            {/* Price Badge Block */}
            <div className="mb-5 p-3.5 bg-theme-surface border border-theme-border/80 w-fit">
              <span className="text-xs uppercase tracking-wider text-theme-text-secondary block font-sans">
                Exclusive Package
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="font-serif text-3xl sm:text-4xl text-theme-text-primary font-normal">
                  {PROPERTY.priceDisplay}
                </span>
                <span className="text-xs text-theme-text-secondary font-sans">
                  / 24-hour exclusive villa stay
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#explore"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep text-xs font-sans tracking-[0.16em] uppercase transition-colors shadow-sm"
              >
                <span>Explore the Villa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => scrollToEnquiry()}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-theme-accent text-theme-accent hover:bg-theme-accent hover:text-theme-bg dark:hover:text-theme-surface-deep text-xs font-sans tracking-[0.16em] uppercase transition-colors"
              >
                <span>Enquire / Book</span>
              </button>
            </div>
          </div>

          {/* Right Image Column (Authentic Villa Exterior & Gated Entry) */}
          <div className="lg:col-span-7 relative z-10">
            <div className="relative overflow-hidden border border-theme-border shadow-md aspect-[4/3] sm:aspect-[16/11] bg-theme-surface">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/villa/villa-aurelia-exterior-01-480w.webp 480w, /images/villa/villa-aurelia-exterior-01-800w.webp 800w, /images/villa/villa-aurelia-exterior-01.webp 1086w"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
                <img
                  src="/images/villa/villa-aurelia-exterior-01.jpg"
                  alt="Villa Aurelia private gated villa exterior with stone compound wall, entry gate, and covered terrace pavilion in Tirunelveli"
                  fetchPriority="high"
                  loading="eager"
                  className="w-full h-full object-cover object-[50%_30%]"
                  width={1086}
                  height={1448}
                />
              </picture>
            </div>
          </div>
        </div>

        {/* Grounded Reservation Enquiry Strip */}
        <div className="relative z-20 mt-6 lg:mt-8 max-w-5xl mx-auto">
          <form
            onSubmit={handleEnquireStripSubmit}
            className="bg-theme-surface border border-theme-border p-4 sm:p-6 shadow-sm font-sans"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-theme-border/50">
              <span className="text-[10px] tracking-[0.2em] uppercase text-theme-accent font-medium">
                Reserve Your Stay — ₹7,500 / 24 Hours Exclusive
              </span>
              <span className="text-[10px] text-theme-text-secondary hidden sm:inline">
                Direct Host Confirmation
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              {/* Check-in */}
              <div className="flex flex-col">
                <label
                  htmlFor="hero-check-in"
                  className="text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1.5 flex items-center gap-1.5"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-theme-accent" />
                  Check-in Date
                </label>
                <input
                  id="hero-check-in"
                  type="date"
                  min={todayStr}
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full bg-theme-bg dark:bg-theme-surface-raised border border-theme-border px-3 py-2 text-xs text-theme-text-primary focus:border-theme-accent outline-none transition-colors"
                />
              </div>

              {/* Check-out */}
              <div className="flex flex-col">
                <label
                  htmlFor="hero-check-out"
                  className="text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1.5 flex items-center gap-1.5"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-theme-accent" />
                  Check-out Date
                </label>
                <input
                  id="hero-check-out"
                  type="date"
                  min={checkInDate || todayStr}
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full bg-theme-bg dark:bg-theme-surface-raised border border-theme-border px-3 py-2 text-xs text-theme-text-primary focus:border-theme-accent outline-none transition-colors"
                />
              </div>

              {/* Guests */}
              <div className="flex flex-col">
                <label
                  htmlFor="hero-guests"
                  className="text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1.5 flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-theme-accent" />
                  Number of Guests
                </label>
                <select
                  id="hero-guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-theme-bg dark:bg-theme-surface-raised border border-theme-border px-3 py-2 text-xs text-theme-text-primary focus:border-theme-accent outline-none transition-colors"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={6}>6 Guests</option>
                  <option value={8}>8+ Guests (Full House)</option>
                </select>
              </div>

              {/* Action Button */}
              <div className="flex flex-col justify-end pt-1 sm:pt-0">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep text-xs font-medium tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm"
                >
                  <span>Enquire Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {dateError && (
              <p className="text-red-500 text-xs mt-2.5 text-center font-sans">
                {dateError}
              </p>
            )}

            <div className="mt-3 pt-2.5 border-t border-theme-border/40 text-[11px] text-theme-text-secondary text-center italic">
              * Villa Aurelia is offered as an entire private house. Booking enquiries are subject to availability and confirmation by the property.
            </div>
          </form>
        </div>

        {/* 4 Highlights with Line Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 pt-6 border-t border-theme-border/40 font-sans">
          {PROPERTY.highlights.map((item, idx) => {
            const Icon = highlightIcons[idx] || Home;
            return (
              <div
                key={item.title}
                className="bg-theme-surface border border-theme-border p-4 flex flex-col items-start"
              >
                <div className="w-8 h-8 flex items-center justify-center text-theme-accent mb-2.5 p-1.5 bg-theme-surface-raised border border-theme-border/60">
                  <Icon className="w-4 h-4 stroke-[1.5]" />
                </div>
                <h3 className="text-xs font-serif font-medium uppercase tracking-wider text-theme-text-primary mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-theme-text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
