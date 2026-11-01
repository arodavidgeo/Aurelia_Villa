import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { BotanicalBranch } from '../common/BotanicalBranch';

export const TheVillaSection: React.FC = () => {
  const [showStoryModal, setShowStoryModal] = useState<boolean>(false);

  const pillars = [
    {
      title: 'Architecture',
      description: 'A blend of classic design and modern comfort.',
      image: '/images/villa-architecture.png',
    },
    {
      title: 'Lush Gardens',
      description: 'Open spaces and greenery to relax and unwind.',
      image: '/images/villa-gardens.png',
    },
    {
      title: 'Common Spaces',
      description: 'Beautiful lounge and outdoor seating areas.',
      image: '/images/villa-common-spaces.png',
    },
    {
      title: 'Dining Experience',
      description: 'Fresh, local flavours with a home-style touch.',
      image: '/images/villa-dining.png',
    },
  ];

  return (
    <section id="the-villa" className="relative py-16 sm:py-20 border-t border-theme-border/40 overflow-hidden">
      {/* Botanical Flourish */}
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Feature Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Left Text */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-3">
              THE VILLA
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal leading-tight text-theme-text-primary mb-4">
              A home of <span className="text-theme-accent italic">serenity</span> and charm
            </h2>

            <p className="text-xs sm:text-sm text-theme-text-secondary font-sans leading-relaxed mb-6">
              Villa Aurelia is a beautifully designed retreat that blends elegant architecture, lush greenery and warm hospitality. Every corner is crafted to help you slow down, unwind and feel at home.
            </p>

            <button
              type="button"
              onClick={() => setShowStoryModal(true)}
              className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.18em] uppercase text-theme-text-primary hover:text-theme-accent group transition-colors pb-1 border-b border-theme-accent/40 w-fit"
            >
              <span>OUR STORY</span>
              <ArrowRight className="w-3.5 h-3.5 text-theme-accent transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Large Photograph */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden border border-theme-border/60 aspect-[16/10] shadow-sm">
              <img
                src="/images/villa-architecture-main.png"
                alt="Villa Aurelia colonial-inspired villa courtyard and veranda seating"
                loading="lazy"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* 4 Compact Image-and-Caption Items in a single row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item) => (
            <div key={item.title} className="flex flex-col group">
              <div className="h-44 sm:h-36 overflow-hidden border border-theme-border/60 mb-3 bg-theme-surface">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif text-lg text-theme-text-primary font-medium mb-1">
                {item.title}
              </h3>
              <p className="text-xs text-theme-text-secondary font-sans leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Story Modal */}
      {showStoryModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 font-sans"
          onClick={() => setShowStoryModal(false)}
        >
          <div
            className="relative w-full max-w-lg bg-theme-surface border border-theme-border p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowStoryModal(false)}
              className="absolute top-4 right-4 p-1 text-theme-text-secondary hover:text-theme-accent"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-widest text-theme-accent font-medium">
              Heritage & Vision
            </span>
            <h3 className="font-serif text-3xl text-theme-text-primary mt-1 mb-4">
              The Story of Villa Aurelia
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-theme-text-secondary leading-relaxed font-sans">
              <p>
                Conceived as a private sanctuary away from fast-paced urban life, Villa Aurelia was built with respect for traditional coastal architecture, local terracotta tiles, and rich reclaimed teakwood.
              </p>
              <p>
                Our philosophy centers on “unhurried mornings” — breakfasts prepared with fresh local harvest, quiet verandahs shaded by frangipani trees, and evenings spent listening to the rustle of leaves around our open courtyard.
              </p>
              <p>
                Whether you visit for deep creative focus, intimate family time, or a quiet solo retreat, we welcome you as an honoured guest in our private sanctuary.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-theme-border flex justify-end">
              <button
                type="button"
                onClick={() => setShowStoryModal(false)}
                className="px-5 py-2 bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep text-xs font-medium tracking-wider uppercase transition-colors"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

