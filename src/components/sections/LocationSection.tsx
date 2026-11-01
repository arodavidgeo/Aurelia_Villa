import React from 'react';
import { MapPin, Compass, Navigation, ExternalLink } from 'lucide-react';
import { BotanicalBranch } from '../common/BotanicalBranch';

export const LocationSection: React.FC = () => {
  const attractions = [
    {
      title: 'Local Beach',
      distance: '12 km',
      image: '/images/location-beach.png',
    },
    {
      title: 'Heritage Temple',
      distance: '18 km',
      image: '/images/location-temple.png',
    },
    {
      title: 'Scenic Viewpoint',
      distance: '25 km',
      image: '/images/location-viewpoint.png',
    },
    {
      title: 'Cultural Town',
      distance: '30 km',
      image: '/images/location-town.png',
    },
    {
      title: 'Nature Trail',
      distance: '20 km',
      image: '/images/location-trail.png',
    },
  ];

  const googleMapsDirectionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=Villa+Aurelia';

  return (
    <section id="location" className="relative py-16 sm:py-20 border-t border-theme-border/40 overflow-hidden">
      {/* Botanical detail in upper right whitespace */}
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-left mb-10 max-w-2xl">
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
            LOCATION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-theme-text-primary font-normal leading-tight mb-2">
            Find us with ease
          </h2>
          <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed font-sans">
            Located in a peaceful setting, Villa Aurelia offers easy access to nearby attractions while giving you the privacy you need for a relaxing stay.
          </p>
        </div>

        {/* Two-column info and map area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left Info Panel (5 cols) */}
          <div className="lg:col-span-5 bg-theme-surface border border-theme-border p-6 sm:p-7 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-theme-surface-raised border border-theme-border text-theme-accent shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-sans text-xs uppercase tracking-widest text-theme-accent font-medium mb-1">
                    Address
                  </h3>
                  <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                    123 Villa Aurelia, [Your Area], [City], [State]
                  </p>
                </div>
              </div>

              {/* Nearby Attractions */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-theme-surface-raised border border-theme-border text-theme-accent shrink-0">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-sans text-xs uppercase tracking-widest text-theme-accent font-medium mb-1">
                    Nearby Attractions
                  </h3>
                  <p className="text-xs text-theme-text-secondary leading-relaxed font-sans">
                    Beaches, temples, heritage sites and more
                  </p>
                </div>
              </div>

              {/* Distance from Key Locations */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-theme-surface-raised border border-theme-border text-theme-accent shrink-0">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-sans text-xs uppercase tracking-widest text-theme-accent font-medium mb-1">
                    Distance from Key Locations
                  </h3>
                  <ul className="text-xs text-theme-text-secondary space-y-1 font-sans">
                    <li>• City Center – 15 km</li>
                    <li>• Nearest Airport – 45 km</li>
                    <li>• Nearest Railway Station – 12 km</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-theme-border/60">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 border border-theme-accent text-theme-accent hover:bg-theme-accent hover:text-theme-bg dark:hover:text-theme-surface-deep text-xs font-sans tracking-[0.16em] uppercase transition-colors"
              >
                <span>GET DIRECTIONS</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Map Panel (7 cols) */}
          <div className="lg:col-span-7 bg-theme-surface border border-theme-border overflow-hidden relative min-h-[320px] shadow-sm flex flex-col">
            <div className="relative w-full h-full flex-1">
              {/* Reference styled Map preview */}
              <img
                src="/images/location-map.png"
                alt="Villa Aurelia location map showing coordinates and nearby coastal highways"
                className="w-full h-full object-cover min-h-[320px]"
              />
              {/* Map pin overlay banner */}
              <div className="absolute top-4 left-4 bg-theme-surface/95 border border-theme-border px-3 py-1.5 shadow-md flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                <span className="text-xs font-serif font-medium text-theme-text-primary">
                  Villa Aurelia
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Attraction Tiles Beneath in one row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {attractions.map((item) => (
            <div
              key={item.title}
              className="bg-theme-surface border border-theme-border p-2.5 flex flex-col group hover:border-theme-accent/60 transition-colors"
            >
              <div className="h-28 overflow-hidden border border-theme-border/50 mb-2 bg-theme-bg">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-sm text-theme-text-primary font-medium truncate">
                {item.title}
              </h3>
              <span className="text-[11px] text-theme-text-secondary font-sans mt-0.5">
                {item.distance}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
