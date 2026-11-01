import React from 'react';
import { MapPin, Phone, MessageCircle, ExternalLink, Navigation } from 'lucide-react';
import { BotanicalBranch } from '../common/BotanicalBranch';
import { PROPERTY } from '../../content/property';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="relative py-16 sm:py-20 border-t border-theme-border/40 overflow-hidden font-sans">
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left mb-10 max-w-2xl">
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
            LOCATION & ACCESS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-theme-text-primary font-normal leading-tight mb-2">
            Where to Find Villa Aurelia
          </h2>
          <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed">
            Conveniently situated in Bharani Nagar, VM Chatram, Tirunelveli with peaceful surroundings and private on-premises parking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details Panel */}
          <div className="lg:col-span-5 bg-theme-surface border border-theme-border p-6 sm:p-7 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-theme-surface-raised border border-theme-border text-theme-accent shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-serif uppercase tracking-widest text-theme-text-primary font-medium mb-1">
                    Villa Address
                  </h3>
                  <p className="text-xs text-theme-text-secondary leading-relaxed">
                    {PROPERTY.address}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-theme-surface-raised border border-theme-border text-theme-accent shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-serif uppercase tracking-widest text-theme-text-primary font-medium mb-1">
                    Phone Inquiries
                  </h3>
                  <a
                    href={PROPERTY.phoneTel}
                    className="text-xs text-theme-text-secondary hover:text-theme-accent transition-colors block"
                  >
                    {PROPERTY.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 bg-theme-surface-raised border border-theme-border text-theme-accent shrink-0 mt-0.5">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-serif uppercase tracking-widest text-theme-text-primary font-medium mb-1">
                    WhatsApp Chat
                  </h3>
                  <a
                    href={PROPERTY.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-theme-text-secondary hover:text-theme-accent transition-colors block underline underline-offset-2"
                  >
                    Chat directly with our reservations concierge
                  </a>
                </div>
              </div>

              {/* Vehicle Parking Info */}
              <div className="p-3 bg-theme-surface-raised border border-theme-border/60 text-xs text-theme-text-secondary">
                <strong className="text-theme-text-primary">Parking Access:</strong> Secure private parking for 2 cars and 4 bikes is available inside the gated villa compound.
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-theme-border flex flex-wrap items-center gap-3">
              <a
                href={PROPERTY.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep text-xs font-sans tracking-[0.16em] uppercase transition-colors shadow-sm"
              >
                <span>Get Directions</span>
                <Navigation className="w-3.5 h-3.5" />
              </a>

              <a
                href={PROPERTY.googleMapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-theme-border text-theme-text-secondary hover:text-theme-text-primary text-xs font-sans tracking-wider uppercase transition-colors"
              >
                <span>Open in Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Map Panel */}
          <div className="lg:col-span-7 bg-theme-surface border border-theme-border overflow-hidden min-h-[380px] flex flex-col shadow-sm relative">
            <iframe
              title="Villa Aurelia Tirunelveli Exact Location Map"
              src="https://maps.google.com/maps?q=8.7140178,77.7670437&z=17&t=m&hl=en&output=embed"
              className="w-full h-full min-h-[380px] border-0"
              loading="lazy"
            />
            <div className="p-3 bg-theme-surface border-t border-theme-border text-[11px] text-theme-text-secondary flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-theme-accent shrink-0" />
                <span>Exact Coordinates: 8°42'50.5"N 77°46'01.4"E (VM Chatram, Tirunelveli)</span>
              </div>
              <span className="text-theme-accent font-medium">Tamil Nadu 627011</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
