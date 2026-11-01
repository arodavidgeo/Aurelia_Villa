import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Users,
  ArrowRight,
  Sparkles,
  Trees,
  Compass,
  HeartHandshake,
} from 'lucide-react';
import { BotanicalBranch } from '../common/BotanicalBranch';
import { useBooking } from '../../context/BookingContext';
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

  const handleCheckAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    setDateError('');

    if (!checkInDate) {
      setDateError('Please select a check-in date.');
      return;
    }

    if (!checkOutDate) {
      setDateError('Please select a check-out date.');
      return;
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (checkOut <= checkIn) {
      setDateError('Check-out date must be after check-in date.');
      return;
    }

    trackBookingCTAClick('hero_booking_strip');
    scrollToEnquiry();
  };

  const features = [
    {
      title: 'ELEGANT ROOMS',
      description: 'Comfortable and stylish stays',
      icon: Sparkles,
    },
    {
      title: 'PEACEFUL SURROUNDINGS',
      description: 'Green spaces and quiet corners',
      icon: Trees,
    },
    {
      title: 'CURATED EXPERIENCES',
      description: 'Local culture and attractions',
      icon: Compass,
    },
    {
      title: 'PERSONALISED HOSPITALITY',
      description: 'A stay tailored to you',
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="home" className="relative pt-6 sm:pt-10 pb-16 overflow-hidden">
      {/* Botanical Flourish on the far left */}
      <BotanicalBranch position="top-left" opacity={0.3} className="-translate-x-6" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetrical Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center pr-0 lg:pr-4 z-10">
            <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-3">
              A BOUTIQUE VILLA STAY
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.6rem] font-normal leading-[1.08] text-theme-text-primary tracking-tight mb-5">
              A quieter <br />
              kind of <span className="text-theme-accent italic">luxury.</span>
            </h1>

            <p className="text-sm sm:text-base font-sans text-theme-text-secondary leading-relaxed max-w-md mb-8">
              Thoughtfully appointed rooms. Unhurried mornings. A stay that feels entirely your own.
            </p>

            <a
              href="#the-villa"
              className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.18em] uppercase text-theme-text-primary hover:text-theme-accent group transition-colors pb-1 border-b border-theme-accent/40 w-fit"
            >
              <span>DISCOVER THE VILLA</span>
              <ArrowRight className="w-3.5 h-3.5 text-theme-accent transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right Image Column (7 cols) */}
          <div className="lg:col-span-7 relative z-10">
            <div className="relative overflow-hidden border border-theme-border/60 aspect-[16/10] sm:aspect-[16/9] shadow-sm">
              <img
                src="/images/hero-courtyard.png"
                alt="Villa Aurelia sunlit courtyard swimming pool, architecture, and lush tropical greenery"
                loading="eager"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Horizontal Booking Strip */}
        <div className="relative z-20 mt-8 lg:-mt-10 max-w-5xl mx-auto">
          <form
            onSubmit={handleCheckAvailability}
            className="bg-theme-surface border border-theme-border p-4 sm:p-5 shadow-md"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              {/* Check-in */}
              <div className="flex flex-col">
                <label
                  htmlFor="hero-check-in"
                  className="text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1.5 flex items-center gap-1.5"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-theme-accent" />
                  Check-in
                </label>
                <input
                  id="hero-check-in"
                  type="date"
                  min={todayStr}
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="w-full bg-theme-bg dark:bg-theme-surface-raised border border-theme-border/80 px-3 py-2 text-xs text-theme-text-primary focus:border-theme-accent outline-none transition-colors"
                />
              </div>

              {/* Check-out */}
              <div className="flex flex-col">
                <label
                  htmlFor="hero-check-out"
                  className="text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1.5 flex items-center gap-1.5"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-theme-accent" />
                  Check-out
                </label>
                <input
                  id="hero-check-out"
                  type="date"
                  min={checkInDate || todayStr}
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="w-full bg-theme-bg dark:bg-theme-surface-raised border border-theme-border/80 px-3 py-2 text-xs text-theme-text-primary focus:border-theme-accent outline-none transition-colors"
                />
              </div>

              {/* Guests */}
              <div className="flex flex-col">
                <label
                  htmlFor="hero-guests"
                  className="text-[10px] tracking-wider uppercase text-theme-text-secondary font-medium mb-1.5 flex items-center gap-1.5"
                >
                  <Users className="w-3.5 h-3.5 text-theme-accent" />
                  Guests
                </label>
                <select
                  id="hero-guests"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-theme-bg dark:bg-theme-surface-raised border border-theme-border/80 px-3 py-2 text-xs text-theme-text-primary focus:border-theme-accent outline-none transition-colors"
                >
                  <option value={1}>1 Guest</option>
                  <option value={2}>2 Guests</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests</option>
                  <option value={5}>5 Guests</option>
                  <option value={6}>6+ Guests</option>
                </select>
              </div>

              {/* Action Button */}
              <div className="flex flex-col justify-end pt-1 sm:pt-0">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep text-xs font-medium tracking-[0.16em] uppercase flex items-center justify-center gap-2 transition-colors duration-200 shadow-sm"
                >
                  <span>CHECK AVAILABILITY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {dateError && (
              <p className="text-red-500 text-xs mt-2.5 text-center font-sans">
                {dateError}
              </p>
            )}
          </form>
        </div>

        {/* 4 Compact Feature Summaries */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-14 pt-8 border-t border-theme-border/40">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col items-center text-center px-2">
                <div className="w-9 h-9 flex items-center justify-center text-theme-accent mb-2.5">
                  <Icon className="w-5 h-5 stroke-[1.4]" />
                </div>
                <h3 className="font-sans text-[11px] sm:text-xs font-medium tracking-[0.16em] uppercase text-theme-text-primary mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-theme-text-secondary leading-snug font-sans">
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
