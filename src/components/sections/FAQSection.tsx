import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../../types';
import { BotanicalBranch } from '../common/BotanicalBranch';

export const FAQS_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What are the check-in and check-out timings?',
    answer:
      'Standard check-in time is from 2:00 PM onwards, and check-out time is by 11:00 AM. Early check-in or late check-out can be arranged subject to availability upon advance request.',
  },
  {
    id: 'faq-2',
    question: 'How do I submit an availability enquiry or reservation?',
    answer:
      'You can select your preferred travel dates and room category via our online booking enquiry form or WhatsApp concierge. Our reservations manager will immediately verify live room allocation and contact you with booking confirmation details.',
  },
  {
    id: 'faq-3',
    question: 'Are meals and breakfast provided at the villa?',
    answer:
      'Yes, we provide fresh, curated breakfast selections featuring local ingredients each morning. Lunch and dinner can be prepared upon request by our villa chef with prior notice.',
  },
  {
    id: 'faq-4',
    question: 'Is secure parking available on premises?',
    answer:
      'Yes, Villa Aurelia provides complimentary private covered parking within the gated property perimeter for all staying guests.',
  },
  {
    id: 'faq-5',
    question: 'Is high-speed Wi-Fi accessible throughout the property?',
    answer:
      'Complimentary high-speed fiber-optic Wi-Fi coverage is active across all guest bedrooms, suites, living lounges, and pool verandahs, supporting both work and leisure streaming.',
  },
  {
    id: 'faq-6',
    question: 'What is the cancellation policy?',
    answer:
      'Cancellations made 7 days or more prior to arrival receive a full refund. Cancellations made between 3 to 7 days incur a 50% one-night charge. Specific holiday peak period policies will be shared during booking confirmation.',
  },
  {
    id: 'faq-7',
    question: 'Are additional guests or children permitted?',
    answer:
      'Children of all ages are welcome at Villa Aurelia. Additional adult guests beyond standard room capacity can be accommodated in our Premium Rooms and Family Suites with an extra rollaway bed upon prior confirmation.',
  },
  {
    id: 'faq-8',
    question: 'Can the entire villa be booked exclusively for a private gathering?',
    answer:
      'Yes, exclusive full-villa takeovers are available for private family retreats and intimate occasions. Please select "Entire Villa Booking" in the enquiry form for tailored arrangements.',
  },
];

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-16 sm:py-20 border-t border-theme-border/40 overflow-hidden">
      <BotanicalBranch position="top-right" opacity={0.2} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left mb-10">
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
            COMMON QUESTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-theme-text-primary font-normal leading-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed font-sans">
            Clear, transparent details regarding your stay, check-in, dining, and policies.
          </p>
        </div>

        <div className="space-y-3 font-sans">
          {FAQS_DATA.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-theme-surface border border-theme-border overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-theme-surface-raised transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-theme-text-primary font-normal">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-theme-accent shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-theme-text-secondary leading-relaxed border-t border-theme-border/40 font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
