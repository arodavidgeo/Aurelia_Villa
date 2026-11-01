import React from 'react';
import { Home, Wind, Bath, UtensilsCrossed, Car, PartyPopper, ArrowRight } from 'lucide-react';
import { BotanicalBranch } from '../common/BotanicalBranch';
import { PROPERTY } from '../../content/property';
import { useBooking } from '../../context/BookingContext';

export const TheVillaSection: React.FC = () => {
  const { scrollToEnquiry } = useBooking();

  const spaces = [
    {
      title: 'Spacious Common Hall',
      subtitle: PROPERTY.features.hall,
      description:
        'A comfortable central living space furnished with a large sectional L-shaped sofa, central coffee table, and ceiling fan—ideal for family conversations, unwinding, and shared downtime.',
      image: '/images/villa/villa-aurelia-living-room.webp',
      alt: 'Villa Aurelia common living hall with plush sectional sofa and coffee table',
      secondaryImage: '/images/villa/villa-aurelia-hall-01.webp',
      secondaryAlt: 'Villa Aurelia living room perspective with wall niches',
      icon: Home,
    },
    {
      title: 'Two Air-Conditioned Bedrooms',
      subtitle: PROPERTY.features.bedrooms,
      description:
        'Two private bedrooms, both fully air-conditioned for reliable cooling. Each room features solid wooden double beds, fresh linens, window grilles, and attached toilet access.',
      image: '/images/villa/villa-aurelia-bedroom-01.webp',
      alt: 'Air-conditioned bedroom at Villa Aurelia with double bed and climate cooling',
      secondaryImage: '/images/villa/villa-aurelia-bedroom-02.webp',
      secondaryAlt: 'Second air-conditioned bedroom at Villa Aurelia with built-in storage',
      icon: Wind,
    },
    {
      title: 'Two Attached Toilets',
      subtitle: PROPERTY.features.toilets,
      description:
        'Two attached toilets for complete privacy and convenience—one fitted with a Western-style commode, modern tiled walls, storage water geyser, and rainfall shower; the second fitted with an Indian-style toilet.',
      image: '/images/villa/villa-aurelia-bathroom-western.webp',
      alt: 'Attached Western restroom at Villa Aurelia with water geyser and commode',
      secondaryImage: '/images/villa/villa-aurelia-bathroom-indian.webp',
      secondaryAlt: 'Attached Indian-style restroom at Villa Aurelia with shower fixture',
      icon: Bath,
    },
    {
      title: 'Guest Kitchen',
      subtitle: PROPERTY.features.kitchen,
      description:
        'A dedicated kitchen space with a polished black granite L-shaped countertop, stainless steel sink with water tap, tiled backsplash, and multi-tier pantry shelves available for guest convenience.',
      image: '/images/villa/villa-aurelia-kitchen-01.webp',
      alt: 'Guest kitchen counter and wash area at Villa Aurelia',
      icon: UtensilsCrossed,
    },
    {
      title: 'On-Premises Parking',
      subtitle: PROPERTY.features.parking,
      description:
        'Secure gated on-site parking accommodation inside the compound with space for 2 cars and 4 two-wheeler bikes, ensuring safe vehicle storage during your stay.',
      image: '/images/villa/villa-aurelia-exterior-01.webp',
      alt: 'Gated parking and entry boundary at Villa Aurelia',
      icon: Car,
    },
    {
      title: 'Terrace for Gatherings',
      subtitle: PROPERTY.features.terrace,
      description:
        'A rooftop open-air terrace with overhead protective pavilion canopy. Suited for birthdays, family get-togethers, small celebrations, and private functions under the evening breeze.',
      image: '/images/villa/villa-aurelia-terrace-night.webp',
      alt: 'Upper-level illuminated terrace canopy at night at Villa Aurelia',
      icon: PartyPopper,
    },
  ];

  return (
    <section id="the-villa" className="relative py-16 sm:py-20 border-t border-theme-border/40 overflow-hidden font-sans">
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div data-reveal className="text-left mb-12 max-w-3xl">
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
            THE PROPERTY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-tight text-theme-text-primary mb-3">
            An Entire Private Villa. <br className="hidden sm:inline" />
            <span className="text-theme-accent italic">A Complete Home for Your Group.</span>
          </h2>
          <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed">
            Villa Aurelia is reserved exclusively as one complete private house. It is not a hotel and rooms are never booked separately. You enjoy full private access to the hall, two AC bedrooms, kitchen, attached toilets, parking, and terrace.
          </p>

          <div className="mt-4 p-3 bg-theme-surface border border-theme-border/70 inline-block text-xs text-theme-text-primary font-medium">
            Package Rate: <span className="font-serif text-base text-theme-accent font-normal">{PROPERTY.priceDisplay}</span> for a 24-hour exclusive stay
          </div>
        </div>

        {/* 6 Spaces Walkthrough Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {spaces.map((space) => {
            const Icon = space.icon;
            return (
              <div
                key={space.title}
                data-reveal
                className="bg-theme-surface border border-theme-border flex flex-col justify-between overflow-hidden shadow-sm hover:border-theme-accent/60 transition-colors group"
              >
                <div>
                  {/* Photo Frame */}
                  <div className="h-56 overflow-hidden bg-theme-surface-deep relative">
                    <img
                      src={space.image}
                      alt={space.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      width={1086}
                      height={1448}
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 bg-theme-surface-raised border border-theme-border text-theme-accent shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h3 className="font-serif text-xl text-theme-text-primary font-medium">
                        {space.title}
                      </h3>
                    </div>

                    <p className="text-xs font-medium text-theme-accent mb-2">
                      {space.subtitle}
                    </p>

                    <p className="text-xs text-theme-text-secondary leading-relaxed">
                      {space.description}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    type="button"
                    onClick={() => scrollToEnquiry()}
                    className="inline-flex items-center gap-1.5 text-xs text-theme-accent hover:text-theme-accent-strong uppercase tracking-wider font-medium border-b border-theme-accent/40 pb-0.5"
                  >
                    <span>Enquire Availability</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
