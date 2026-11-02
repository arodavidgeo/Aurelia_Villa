import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { PROPERTY } from '../../content/property';
import { BotanicalBranch } from '../common/BotanicalBranch';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="relative py-10 sm:py-14 border-t border-theme-border/40 overflow-hidden font-sans">
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left mb-6">
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
            QUESTIONS & ANSWERS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-theme-text-primary font-normal leading-tight mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed">
            Direct, verified facts about reserving Villa Aurelia in Tirunelveli.
          </p>
        </div>

        <div className="space-y-3 font-sans">
          {PROPERTY.faq.map((item, idx) => {
            const isOpen = openId === item.id;
            const contentId = `faq-content-${idx}`;
            const headerId = `faq-header-${idx}`;

            return (
              <div
                key={item.id}
                className="bg-theme-surface border border-theme-border overflow-hidden transition-colors shadow-sm"
              >
                <button
                  id={headerId}
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={contentId}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-theme-surface-raised transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg text-theme-text-primary font-normal">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-theme-accent shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div
                    id={contentId}
                    role="region"
                    aria-labelledby={headerId}
                    className="px-5 pb-4 pt-1 text-xs sm:text-sm text-theme-text-secondary leading-relaxed border-t border-theme-border/40"
                  >
                    {item.answer}
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
