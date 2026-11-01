import React, { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { BotanicalBranch } from '../common/BotanicalBranch';
import { useBooking } from '../../context/BookingContext';
import { trackBookingCTAClick } from '../../services/analytics';

export const ExperiencesSection: React.FC = () => {
  const { scrollToEnquiry } = useBooking();
  const [selectedExperience, setSelectedExperience] = useState<{
    title: string;
    description: string;
    details: string;
    image: string;
  } | null>(null);

  const experiences = [
    {
      title: 'Local Attractions',
      description: 'Explore nearby beaches, temples, heritage sites and scenic spots.',
      details:
        'Villa Aurelia is situated within comfortable reach of pristine coastal shores, centuries-old Dravidian temple architecture, and historic seaside boardwalks. Our concierge provides personalized day-itineraries with private chauffeured transfers.',
      image: '/images/experience-attractions.png',
      cta: 'EXPLORE',
    },
    {
      title: 'Food & Dining',
      description: 'Enjoy fresh, local flavours with curated dining experiences.',
      details:
        'Savour coastal delicacies and wholesome South Indian specialties prepared by our private villa chef using ingredients sourced each morning from local artisanal markets and fishermen.',
      image: '/images/experience-dining.png',
      cta: 'LEARN MORE',
    },
    {
      title: 'Unique Experiences',
      description: 'From nature walks to cultural tours, make the most of your stay.',
      details:
        'Experience guided sunrise mangrove boat safaris, bird-watching nature walks, pottery craft sessions with regional artisans, and candlelit courtyard dinners beneath starry coastal skies.',
      image: '/images/experience-unique.png',
      cta: 'DISCOVER',
    },
  ];

  const handlePlanStay = () => {
    trackBookingCTAClick('experiences_banner_plan_stay');
    scrollToEnquiry();
  };

  return (
    <section id="experiences" className="relative py-16 sm:py-20 border-t border-theme-border/40 overflow-hidden">
      {/* Botanical detail in top right whitespace */}
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-left mb-10 max-w-2xl">
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
            EXPERIENCES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-theme-text-primary font-normal leading-tight mb-2">
            More than just a stay
          </h2>
          <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed font-sans">
            Discover local experiences, peaceful surroundings and moments that make your stay unforgettable.
          </p>
        </div>

        {/* 3 Image-led Content Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {experiences.map((exp) => (
            <div
              key={exp.title}
              className="bg-theme-surface border border-theme-border p-4 flex flex-col justify-between group hover:border-theme-accent/70 transition-colors"
            >
              <div>
                <div className="h-48 sm:h-40 overflow-hidden border border-theme-border/60 mb-4 bg-theme-bg">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif text-xl text-theme-text-primary font-medium mb-2">
                  {exp.title}
                </h3>
                <p className="text-xs text-theme-text-secondary font-sans leading-relaxed mb-4">
                  {exp.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedExperience(exp)}
                className="inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.16em] uppercase text-theme-accent hover:text-theme-accent-strong transition-colors pb-0.5 border-b border-theme-accent/40 w-fit"
              >
                <span>{exp.cta}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Promotional Dark Banner */}
        <div className="relative overflow-hidden bg-olive dark:bg-espresso-deep text-ivory-raised border border-theme-border/50 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          {/* Left integrated boat image */}
          <div className="flex items-center gap-5 w-full md:w-auto">
            <div className="w-24 sm:w-32 h-16 sm:h-20 shrink-0 overflow-hidden border border-white/20">
              <img
                src="/images/experience-banner.png"
                alt="Nature and boat excursion at Villa Aurelia"
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#F4F0E6] font-normal leading-snug">
                Create memories that stay with you.
              </h3>
              <p className="text-xs text-[#D8C6A6] font-sans leading-relaxed mt-1 max-w-lg">
                Whether you seek relaxation, adventure or a touch of local culture, Villa Aurelia offers experiences for every kind of traveller.
              </p>
            </div>
          </div>

          {/* Right Action Button */}
          <button
            type="button"
            onClick={handlePlanStay}
            className="w-full md:w-auto shrink-0 px-6 py-2.5 border border-theme-accent text-theme-accent hover:bg-theme-accent hover:text-theme-bg dark:hover:text-theme-surface-deep text-xs font-sans tracking-[0.18em] uppercase transition-all duration-200"
          >
            PLAN YOUR STAY
          </button>
        </div>
      </div>

      {/* Experience Details Modal */}
      {selectedExperience && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 font-sans"
          onClick={() => setSelectedExperience(null)}
        >
          <div
            className="relative w-full max-w-lg bg-theme-surface border border-theme-border p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedExperience(null)}
              className="absolute top-4 right-4 p-1 text-theme-text-secondary hover:text-theme-accent"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs uppercase tracking-widest text-theme-accent font-medium">
              Curated Experience
            </span>
            <h3 className="font-serif text-3xl text-theme-text-primary mt-1 mb-4">
              {selectedExperience.title}
            </h3>

            <div className="h-48 overflow-hidden border border-theme-border mb-4">
              <img
                src={selectedExperience.image}
                alt={selectedExperience.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed mb-6 font-sans">
              {selectedExperience.details}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-theme-border">
              <button
                type="button"
                onClick={() => setSelectedExperience(null)}
                className="text-xs text-theme-text-secondary hover:text-theme-text-primary"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedExperience(null);
                  scrollToEnquiry();
                }}
                className="px-5 py-2 bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep text-xs font-medium tracking-wider uppercase transition-colors"
              >
                Enquire About Experiences
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
