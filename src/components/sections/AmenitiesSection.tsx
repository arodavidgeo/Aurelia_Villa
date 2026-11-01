import React from 'react';
import { Home, Wind, Bath, UtensilsCrossed, Car, Bike, PartyPopper } from 'lucide-react';
import { BotanicalBranch } from '../common/BotanicalBranch';
import { PROPERTY } from '../../content/property';

export const AmenitiesSection: React.FC = () => {
  const accommodationList = [
    { title: 'Entire Private House', desc: 'Exclusive use of the whole villa for your group alone', icon: Home },
    { title: 'Two AC Bedrooms', desc: 'Both bedrooms equipped with climate cooling air conditioning', icon: Wind },
    { title: 'One Living Hall', desc: 'Common living and gathering space with sectional sofa seating', icon: Home },
    { title: 'Two Attached Toilets', desc: 'One Western-style and one Indian-style attached toilet', icon: Bath },
  ];

  const facilitiesList = [
    { title: 'Guest Kitchen', desc: 'Dedicated kitchen with granite counter, sink and pantry shelves', icon: UtensilsCrossed },
    { title: 'Parking for 2 Cars', desc: 'Secured parking space within the villa perimeter for two four-wheelers', icon: Car },
    { title: 'Parking for 4 Bikes', desc: 'Designated parking for up to four two-wheelers inside premises', icon: Bike },
    { title: 'Terrace Access', desc: 'Rooftop pavilion suited for gatherings and celebrations', icon: PartyPopper },
  ];

  return (
    <section id="amenities" className="relative py-16 sm:py-20 border-t border-theme-border/40 overflow-hidden font-sans">
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left mb-12 max-w-2xl">
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
            VERIFIED AMENITIES & FACILITIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-theme-text-primary font-normal leading-tight mb-2">
            Everything Included With Your Stay
          </h2>
          <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed">
            All listed accommodation spaces and facilities are included under the single {PROPERTY.priceDisplay} 24-hour exclusive stay package.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Group 1: Accommodation */}
          <div className="bg-theme-surface border border-theme-border p-6 sm:p-7 shadow-sm">
            <h3 className="font-serif text-xl sm:text-2xl text-theme-text-primary font-normal border-b border-theme-border/60 pb-3 mb-6">
              Accommodation Spaces
            </h3>
            <div className="space-y-4">
              {accommodationList.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <div className="p-2 bg-theme-surface-raised border border-theme-border text-theme-accent shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif text-theme-text-primary font-medium tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-xs text-theme-text-secondary mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Group 2: Facilities */}
          <div className="bg-theme-surface border border-theme-border p-6 sm:p-7 shadow-sm">
            <h3 className="font-serif text-xl sm:text-2xl text-theme-text-primary font-normal border-b border-theme-border/60 pb-3 mb-6">
              Villa Facilities
            </h3>
            <div className="space-y-4">
              {facilitiesList.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex items-start gap-3.5">
                    <div className="p-2 bg-theme-surface-raised border border-theme-border text-theme-accent shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif text-theme-text-primary font-medium tracking-wide">
                        {item.title}
                      </h4>
                      <p className="text-xs text-theme-text-secondary mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
