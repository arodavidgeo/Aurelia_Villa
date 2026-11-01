import React from 'react';
import { Clock, ShieldAlert, CreditCard, Users, FileCheck } from 'lucide-react';

export const BookingPoliciesSection: React.FC = () => {
  const policies = [
    {
      title: 'Check-in & Check-out',
      icon: Clock,
      details: [
        'Check-in: From 2:00 PM onwards',
        'Check-out: By 11:00 AM',
        'Valid government ID required at check-in',
      ],
    },
    {
      title: 'Payment & Advance',
      icon: CreditCard,
      details: [
        '50% deposit required upon confirmation',
        'Balance payable upon arrival at villa',
        'UPI, NetBanking & major cards accepted',
      ],
    },
    {
      title: 'Cancellation Policy',
      icon: ShieldAlert,
      details: [
        'Full refund up to 7 days before arrival',
        '50% refund 3 to 7 days before arrival',
        'Non-refundable within 48 hours of check-in',
      ],
    },
    {
      title: 'Guest & House Rules',
      icon: Users,
      details: [
        'Quiet hours: 10:00 PM – 7:00 AM',
        'Non-smoking indoors (smoking in outdoor areas)',
        'Pets not permitted to protect garden ecosystem',
      ],
    },
  ];

  return (
    <section id="policies" className="relative py-16 border-t border-theme-border/40 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-10 max-w-2xl">
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
            STAY POLICIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-theme-text-primary font-normal leading-tight mb-2">
            Clear, transparent policies
          </h2>
          <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed font-sans">
            We believe in honest hospitality without hidden surprises. Below are our verified property guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {policies.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="bg-theme-surface border border-theme-border p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="p-2 w-fit bg-theme-surface-raised border border-theme-border text-theme-accent mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif text-lg text-theme-text-primary font-medium mb-3">
                    {p.title}
                  </h3>
                  <ul className="space-y-1.5 text-xs text-theme-text-secondary">
                    {p.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-1.5">
                        <span className="text-theme-accent mt-0.5">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Transparency Note */}
        <div className="mt-8 p-4 bg-theme-surface border border-theme-border/60 flex items-start gap-3 text-xs text-theme-text-secondary">
          <FileCheck className="w-4 h-4 text-theme-accent shrink-0 mt-0.5" />
          <div>
            <strong className="text-theme-text-primary">Transparent Pricing Commitment:</strong> All published rates are subject to standard applicable state hospitality goods and service tax (GST 12% / 18% as applicable). No booking fees, hidden resort surcharges, or mandatory service levies are charged.
          </div>
        </div>
      </div>
    </section>
  );
};

