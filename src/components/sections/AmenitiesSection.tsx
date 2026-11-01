import React from 'react';
import {
  Wifi,
  Waves,
  Coffee,
  Car,
  UtensilsCrossed,
  ShieldCheck,
  Sparkles,
  TreePine,
  Wind,
  Bath,
  Tv,
  ConciergeBell,
} from 'lucide-react';
import { BotanicalBranch } from '../common/BotanicalBranch';

export const AmenitiesSection: React.FC = () => {
  const categories = [
    {
      name: 'Villa Facilities',
      items: [
        { label: 'Swimming Pool & Sun Deck', icon: Waves },
        { label: 'Lush Courtyard Gardens', icon: TreePine },
        { label: 'Private Covered Parking', icon: Car },
        { label: '24/7 Security & Caretaker', icon: ShieldCheck },
      ],
    },
    {
      name: 'Room Comforts',
      items: [
        { label: 'Individually Controlled AC', icon: Wind },
        { label: 'High-Speed Fiber Wi-Fi', icon: Wifi },
        { label: 'Private En-Suite Bathrooms', icon: Bath },
        { label: 'Smart HD Entertainment', icon: Tv },
      ],
    },
    {
      name: 'Guest Services',
      items: [
        { label: 'Curated Local Dining', icon: UtensilsCrossed },
        { label: 'Artisanal Coffee & Tea Bar', icon: Coffee },
        { label: 'Dedicated Concierge', icon: ConciergeBell },
        { label: 'Daily Housekeeping', icon: Sparkles },
      ],
    },
  ];

  return (
    <section id="amenities" className="relative py-16 border-t border-theme-border/40 overflow-hidden">
      <BotanicalBranch position="top-right" opacity={0.2} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left mb-10 max-w-2xl">
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
            FACILITIES & COMFORTS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-theme-text-primary font-normal leading-tight mb-2">
            Crafted for effortless relaxation
          </h2>
          <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed font-sans">
            Every facility at Villa Aurelia is maintained to high hospitality standards, balancing natural serenity with modern comforts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-theme-surface border border-theme-border p-5 sm:p-6"
            >
              <h3 className="font-serif text-lg text-theme-text-primary font-medium border-b border-theme-border/50 pb-2 mb-4">
                {category.name}
              </h3>
              <ul className="space-y-3.5">
                {category.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-center gap-3 text-xs text-theme-text-secondary">
                      <div className="p-1.5 bg-theme-surface-raised border border-theme-border/60 text-theme-accent shrink-0">
                        <Icon className="w-3.5 h-3.5 stroke-[1.4]" />
                      </div>
                      <span>{item.label}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
