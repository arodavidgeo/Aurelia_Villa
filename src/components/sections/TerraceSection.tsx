import React from 'react';
import { PartyPopper, CalendarCheck, Users, Sparkles, ArrowRight } from 'lucide-react';
import { BotanicalBranch } from '../common/BotanicalBranch';
import { useBooking } from '../../context/BookingContext';

export const TerraceSection: React.FC = () => {
  const { scrollToEnquiry, setPurposeOfVisit } = useBooking();

  const handleEventEnquiry = (purpose: string) => {
    if (setPurposeOfVisit) {
      setPurposeOfVisit(purpose);
    }
    scrollToEnquiry();
  };

  const useCases = [
    {
      title: 'Birthday Celebrations',
      desc: 'Open rooftop setting for intimate birthday gatherings with family and close friends.',
      icon: PartyPopper,
    },
    {
      title: 'Family Get-Togethers',
      desc: 'Spacious terrace environment allowing large families to sit together in privacy.',
      icon: Users,
    },
    {
      title: 'Private Functions',
      desc: 'Reserved exclusively for your invited guests without external interference.',
      icon: CalendarCheck,
    },
    {
      title: 'Small Parties & Milestones',
      desc: 'Welcoming ambiance under natural evening ventilation for memorable occasions.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="terrace" className="relative py-10 sm:py-14 border-t border-theme-border/40 overflow-hidden font-sans">
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
              TERRACE & CELEBRATIONS
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.6rem] font-normal leading-tight text-theme-text-primary mb-3">
              Make Room for <span className="text-theme-accent italic">Beautiful Moments.</span>
            </h2>

            <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed mb-6">
              From intimate family gatherings to special celebrations, the terrace at Villa Aurelia offers a welcoming setting to bring people together.
            </p>

            {/* Use Case Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
              {useCases.map((uc) => {
                const Icon = uc.icon;
                return (
                  <div
                    key={uc.title}
                    className="p-3.5 bg-theme-surface border border-theme-border"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className="w-3.5 h-3.5 text-theme-accent" />
                      <h4 className="font-serif text-sm font-medium text-theme-text-primary">
                        {uc.title}
                      </h4>
                    </div>
                    <p className="text-[11px] text-theme-text-secondary leading-snug">
                      {uc.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Property Confirmation Notice */}
            <div className="p-3.5 bg-theme-surface border border-theme-border/70 mb-6 text-xs text-theme-text-secondary">
              <strong className="text-theme-text-primary">Note on Events:</strong> Event arrangements, usage terms and availability are confirmed with the property.
            </div>

            {/* CTA */}
            <div>
              <button
                type="button"
                onClick={() => handleEventEnquiry('Birthday Celebration')}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep text-xs font-medium tracking-[0.16em] uppercase transition-colors shadow-sm"
              >
                <span>Enquire About An Event</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Image: Illuminated Terrace Pavilion & Villa at Night */}
          <div className="lg:col-span-6">
            <div className="overflow-hidden border border-theme-border shadow-md aspect-[16/10] sm:aspect-[4/3] bg-theme-surface relative">
              <picture>
                <source
                  type="image/webp"
                  srcSet="/images/villa/villa-aurelia-terrace-night-480w.webp 480w, /images/villa/villa-aurelia-terrace-night-800w.webp 800w, /images/villa/villa-aurelia-terrace-night.webp 1024w"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <img
                  src="/images/villa/villa-aurelia-terrace-night.jpg"
                  alt="Villa Aurelia illuminated at night with warm architectural lights on the compound wall, staircase, and upper terrace canopy"
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                  width={1024}
                  height={576}
                />
              </picture>
              <div className="absolute bottom-3 left-3 bg-theme-surface border border-theme-border px-3 py-1 text-[11px] font-serif text-theme-text-primary shadow-sm">
                Illuminated Terrace Canopy at Night
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

