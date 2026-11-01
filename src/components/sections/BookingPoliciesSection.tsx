import React from 'react';
import { Check, ShieldCheck, Clock, FileText } from 'lucide-react';
import { PROPERTY } from '../../content/property';

export const BookingPoliciesSection: React.FC = () => {
  return (
    <section id="policies" className="relative py-16 sm:py-20 border-t border-theme-border/40 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Pricing Feature Card */}
          <div data-reveal className="lg:col-span-6 bg-theme-surface border border-theme-border p-6 sm:p-8 shadow-sm">
            <span className="text-[11px] uppercase tracking-widest text-theme-accent font-medium block mb-1">
              {PROPERTY.pricingCardTitle}
            </span>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-serif text-4xl sm:text-5xl text-theme-text-primary font-normal">
                {PROPERTY.priceDisplay}
              </span>
              <span className="text-xs text-theme-text-secondary font-sans">
                / {PROPERTY.priceNote}
              </span>
            </div>

            {/* Fine Gold Rule Drawing Across */}
            <div className="w-full h-[1px] bg-theme-border/60 mb-6 overflow-hidden">
              <div className="gold-rule-draw h-full bg-theme-accent" />
            </div>

            <h4 className="font-serif text-base text-theme-text-primary font-medium mb-3">
              Included In Your Exclusive Stay:
            </h4>

            <ul className="space-y-2.5 text-xs text-theme-text-secondary mb-6">
              {PROPERTY.pricingIncludes.map((inc) => (
                <li key={inc} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-theme-accent shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>

            <div className="p-3 bg-theme-surface-raised border border-theme-border/70 text-xs text-theme-text-secondary">
              {PROPERTY.pricingTermsNote}
            </div>
          </div>

          {/* Right Policies & Owner Confirmation Information */}
          <div className="lg:col-span-6 space-y-5">
            <div className="p-5 bg-theme-surface border border-theme-border">
              <div className="flex items-center gap-2 mb-2 text-theme-accent">
                <Clock className="w-4 h-4" />
                <h4 className="font-serif text-base text-theme-text-primary font-medium">
                  Stay Schedule & Timings
                </h4>
              </div>
              <p className="text-xs text-theme-text-secondary leading-relaxed">
                Check-in and check-out timings, early arrivals and late departures are confirmed directly by the property at the time of your enquiry.
              </p>
            </div>

            <div className="p-5 bg-theme-surface border border-theme-border">
              <div className="flex items-center gap-2 mb-2 text-theme-accent">
                <ShieldCheck className="w-4 h-4" />
                <h4 className="font-serif text-base text-theme-text-primary font-medium">
                  Cancellations & House Guidelines
                </h4>
              </div>
              <p className="text-xs text-theme-text-secondary leading-relaxed">
                Security deposits, cancellation terms, and general property usage guidelines are confirmed with the property at the time of booking.
              </p>
            </div>

            <div className="p-5 bg-theme-surface border border-theme-border">
              <div className="flex items-center gap-2 mb-2 text-theme-accent">
                <FileText className="w-4 h-4" />
                <h4 className="font-serif text-base text-theme-text-primary font-medium">
                  Transparent Package Guarantee
                </h4>
              </div>
              <p className="text-xs text-theme-text-secondary leading-relaxed">
                No hidden per-room markups or unexpected resort surcharges. You reserve the entire villa directly under one clear agreement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
