import React, { useState, useRef, useEffect } from 'react';
import { Home, Wind, UtensilsCrossed, PartyPopper, Car, ArrowRight, ExternalLink } from 'lucide-react';
import { BotanicalBranch } from '../common/BotanicalBranch';
import { PROPERTY } from '../../content/property';
import { useBooking } from '../../context/BookingContext';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ExplorerArea {
  id: string;
  name: string;
  icon: React.ElementType;
  title: string;
  tagline: string;
  description: string;
  photo?: {
    webp: string;
    jpg: string;
    srcSet: string;
    alt: string;
    width: number;
    height: number;
  };
  hasPhoto: boolean;
  featureList: string[];
}

export const VillaExplorerSection: React.FC = () => {
  const { scrollToEnquiry } = useBooking();
  const prefersReduced = useReducedMotion();
  const tabListRef = useRef<HTMLDivElement>(null);

  const areas: ExplorerArea[] = [
    {
      id: 'hall',
      name: 'Hall',
      icon: Home,
      title: 'Spacious Common Living Hall',
      tagline: PROPERTY.features.hall,
      description:
        'A spacious central gathering area furnished with a sectional sofa and coffee table. Suited for family conversations and group downtime.',
      hasPhoto: true,
      photo: {
        webp: '/images/villa/villa-aurelia-living-room.webp',
        jpg: '/images/villa/villa-aurelia-living-room.jpg',
        srcSet: '/images/villa/villa-aurelia-living-room-480w.webp 480w, /images/villa/villa-aurelia-living-room.webp 768w',
        alt: 'Villa Aurelia common living hall with sectional sofa and coffee table',
        width: 768,
        height: 1024,
      },
      featureList: [
        'Central group living space',
        'Sectional sofa and coffee table',
        'Natural daylight and ceiling fans',
      ],
    },
    {
      id: 'bedroom-1',
      name: 'Bedroom 1',
      icon: Wind,
      title: 'Air-Conditioned Bedroom 1',
      tagline: 'Private AC Bedroom with Attached Restroom',
      description:
        'Air-conditioned bedroom fitted with solid wooden double bed and peaceful windows. Attached to a private restroom with rainfall shower.',
      hasPhoto: true,
      photo: {
        webp: '/images/villa/villa-aurelia-bedroom-01.webp',
        jpg: '/images/villa/villa-aurelia-bedroom-01.jpg',
        srcSet: '/images/villa/villa-aurelia-bedroom-01-480w.webp 480w, /images/villa/villa-aurelia-bedroom-01-800w.webp 800w, /images/villa/villa-aurelia-bedroom-01.webp 1086w',
        alt: 'Air-conditioned Bedroom 1 at Villa Aurelia with double bed and climate cooling',
        width: 1086,
        height: 1448,
      },
      featureList: [
        'Climate-controlled split air conditioning',
        'Attached private restroom',
        'Solid wood double bed and fresh linens',
      ],
    },
    {
      id: 'bedroom-2',
      name: 'Bedroom 2',
      icon: Wind,
      title: 'Air-Conditioned Bedroom 2',
      tagline: 'Second Private AC Bedroom',
      description:
        'Second air-conditioned bedroom with solid wood slatted double bed, ceiling fan, and open shelving niches for convenient luggage storage.',
      hasPhoto: true,
      photo: {
        webp: '/images/villa/villa-aurelia-bedroom-02.webp',
        jpg: '/images/villa/villa-aurelia-bedroom-02.jpg',
        srcSet: '/images/villa/villa-aurelia-bedroom-02-480w.webp 480w, /images/villa/villa-aurelia-bedroom-02-800w.webp 800w, /images/villa/villa-aurelia-bedroom-02.webp 1086w',
        alt: 'Air-conditioned Bedroom 2 at Villa Aurelia with wooden bed and open shelving',
        width: 1086,
        height: 1448,
      },
      featureList: [
        'Individual climate control air conditioning',
        'Attached bathroom access',
        'Built-in wardrobe storage niches',
      ],
    },
    {
      id: 'kitchen',
      name: 'Kitchen',
      icon: UtensilsCrossed,
      title: 'Equipped Guest Kitchen',
      tagline: PROPERTY.features.kitchen,
      description:
        'A dedicated food preparation space with black granite countertop, stainless steel sink with water tap, and multi-tier pantry shelves.',
      hasPhoto: true,
      photo: {
        webp: '/images/villa/villa-aurelia-kitchen-01.webp',
        jpg: '/images/villa/villa-aurelia-kitchen-01.jpg',
        srcSet: '/images/villa/villa-aurelia-kitchen-01-480w.webp 480w, /images/villa/villa-aurelia-kitchen-01-800w.webp 800w, /images/villa/villa-aurelia-kitchen-01.webp 1086w',
        alt: 'Guest kitchen at Villa Aurelia with granite countertop and wash sink',
        width: 1086,
        height: 1448,
      },
      featureList: [
        'L-shaped granite cooking counter',
        'Stainless steel wash sink and tap',
        'Multi-tier pantry storage shelving',
      ],
    },
    {
      id: 'terrace',
      name: 'Terrace',
      icon: PartyPopper,
      title: 'Rooftop Covered Terrace',
      tagline: PROPERTY.features.terrace,
      description:
        'Open-air rooftop terrace with overhead protective pavilion canopy. Suited for birthdays, family get-togethers, small celebrations, and private functions.',
      hasPhoto: true,
      photo: {
        webp: '/images/villa/villa-aurelia-terrace-night.webp',
        jpg: '/images/villa/villa-aurelia-terrace-night.jpg',
        srcSet: '/images/villa/villa-aurelia-terrace-night-480w.webp 480w, /images/villa/villa-aurelia-terrace-night-800w.webp 800w, /images/villa/villa-aurelia-terrace-night.webp 1024w',
        alt: 'Villa Aurelia rooftop terrace illuminated at night for celebrations',
        width: 1024,
        height: 576,
      },
      featureList: [
        'Covered pavilion canopy for shade and breeze',
        'Private separate exterior staircase access',
        'Event usage confirmed with the property',
      ],
    },
    {
      id: 'parking',
      name: 'Parking',
      icon: Car,
      title: 'On-Premises Gated Parking',
      tagline: PROPERTY.features.parking,
      description:
        'Dedicated secure parking space inside the gated villa compound accommodating up to 2 cars and 4 two-wheeler bikes in complete safety.',
      hasPhoto: true,
      photo: {
        webp: '/images/villa/villa-aurelia-exterior-01.webp',
        jpg: '/images/villa/villa-aurelia-exterior-01.jpg',
        srcSet: '/images/villa/villa-aurelia-exterior-01-480w.webp 480w, /images/villa/villa-aurelia-exterior-01-800w.webp 800w, /images/villa/villa-aurelia-exterior-01.webp 1086w',
        alt: 'Gated parking and entry boundary at Villa Aurelia',
        width: 1086,
        height: 1448,
      },
      featureList: [
        'Space for 2 cars and 4 bikes',
        'Enclosed within compound walls',
        'Secure locking main entrance gate',
      ],
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const activeArea = areas[activeIndex];

  // Keyboard roving tabindex navigation (Left, Right, Home, End)
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % areas.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + areas.length) % areas.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = areas.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    setActiveIndex(nextIndex);
    const tabs = tabListRef.current?.querySelectorAll<HTMLButtonElement>('[role="tab"]');
    tabs?.[nextIndex]?.focus();
  };

  // Preload next and previous images
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const preloadIndexes = [
      (activeIndex + 1) % areas.length,
      (activeIndex - 1 + areas.length) % areas.length,
    ];
    preloadIndexes.forEach((idx) => {
      const area = areas[idx];
      if (area.photo) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.as = 'image';
        link.href = area.photo.webp;
        document.head.appendChild(link);
      }
    });
  }, [activeIndex]);

  return (
    <section id="explore" className="relative py-16 sm:py-24 border-t border-theme-border/40 overflow-hidden font-sans">
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-left mb-8 max-w-2xl">
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
            INTERACTIVE EXPLORER
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-tight text-theme-text-primary mb-3">
            Explore the <span className="text-theme-accent italic">Spaces of Villa Aurelia.</span>
          </h2>
          <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed">
            Select an area to explore genuine photographs and verified spatial details. Every space is included in your ₹7,500 exclusive stay.
          </p>
        </div>

        {/* Tab Row (role="tablist" with 44px touch targets on mobile) */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Villa Aurelia Spaces"
          className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar border-b border-theme-border/50 scroll-smooth"
        >
          {areas.map((area, idx) => {
            const isSelected = idx === activeIndex;
            const Icon = area.icon;
            return (
              <button
                key={area.id}
                role="tab"
                id={`tab-${area.id}`}
                aria-selected={isSelected}
                aria-controls={`panel-${area.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveIndex(idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                data-cursor="explore"
                className={`flex items-center gap-2 px-4 py-3 min-h-[44px] text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap shrink-0 border-b-2 relative ${
                  isSelected
                    ? 'border-theme-accent text-theme-accent bg-theme-surface'
                    : 'border-transparent text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-surface/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{area.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Panel */}
        <div
          role="tabpanel"
          id={`panel-${activeArea.id}`}
          aria-labelledby={`tab-${activeArea.id}`}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-theme-surface border border-theme-border p-6 sm:p-8 lg:p-10 shadow-sm"
        >
          {/* Left Visual Area */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden border border-theme-border/70 aspect-[4/3] bg-theme-surface-deep">
              {activeArea.hasPhoto && activeArea.photo ? (
                <picture key={activeArea.id}>
                  <source type="image/webp" srcSet={activeArea.photo.srcSet} sizes="(max-width: 1024px) 100vw, 55vw" />
                  <img
                    src={activeArea.photo.jpg}
                    alt={activeArea.photo.alt}
                    width={activeArea.photo.width}
                    height={activeArea.photo.height}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      prefersReduced ? '' : 'hover:scale-105'
                    }`}
                    style={{ objectPosition: '50% 55%' }}
                  />
                </picture>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-theme-surface-raised">
                  <span className="font-serif text-2xl text-theme-text-primary mb-2">{activeArea.title}</span>
                  <p className="text-xs text-theme-text-secondary max-w-sm mb-4">{activeArea.description}</p>
                  <span className="text-[11px] font-mono text-theme-accent">Photograph to be confirmed by property</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Descriptive Content */}
          <div className="lg:col-span-5 flex flex-col justify-between" aria-live="polite">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-theme-accent font-medium mb-1.5 block">
                SPACE {activeIndex + 1} OF {areas.length}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-theme-text-primary mb-2 font-normal">
                {activeArea.title}
              </h3>
              <p className="text-xs text-theme-accent font-medium mb-4">
                {activeArea.tagline}
              </p>
              <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed mb-6">
                {activeArea.description}
              </p>

              {/* Verified Features */}
              <div className="space-y-2 mb-8 pt-4 border-t border-theme-border/50">
                {activeArea.featureList.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs text-theme-text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-theme-accent shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-theme-border/50">
              <button
                type="button"
                onClick={() => scrollToEnquiry()}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep text-xs font-medium tracking-[0.16em] uppercase transition-colors shadow-sm"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="#gallery"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs border border-theme-border text-theme-text-secondary hover:text-theme-text-primary transition-colors tracking-wider uppercase"
              >
                <span>View In Gallery</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

