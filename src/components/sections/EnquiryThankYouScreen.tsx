import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Copy, Check, Phone, ArrowLeft, RotateCcw } from 'lucide-react';
import { PROPERTY } from '../../content/property';
import { EnquiryForWhatsApp, buildWhatsAppMessage, formatCalendarDate } from '../../utils/whatsappMessage';
import { trackWhatsAppClick } from '../../services/analytics';

interface EnquiryThankYouScreenProps {
  enquiry: EnquiryForWhatsApp;
  onEditDetails: () => void;
  onStartNewEnquiry: () => void;
}

export const EnquiryThankYouScreen: React.FC<EnquiryThankYouScreenProps> = ({
  enquiry,
  onEditDetails,
  onStartNewEnquiry,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const copyTimeoutRef = useRef<number | null>(null);

  const handoff = buildWhatsAppMessage(enquiry);
  const firstName = (enquiry.fullName || 'Guest').trim().split(' ')[0] || 'Guest';

  // Move focus to heading on mount and announce to screen readers
  useEffect(() => {
    if (headingRef.current) {
      headingRef.current.focus();
    }
    return () => {
      if (copyTimeoutRef.current) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyMessage = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(handoff.message);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textarea = document.createElement('textarea');
        textarea.value = handoff.message;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = window.setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Failed to copy message:', err);
    }
  };

  const handleWhatsAppHandoffClick = () => {
    trackWhatsAppClick('enquiry_handoff');
  };

  return (
    <div
      role="region"
      aria-label="Enquiry submission confirmation and WhatsApp dispatch"
      className="bg-theme-surface border border-theme-border p-6 sm:p-8 shadow-sm font-sans"
    >
      {/* Screen Reader Live Announcement */}
      <div aria-live="polite" className="sr-only">
        Enquiry step 1 complete. Step 2: Send your enquiry to the owner on WhatsApp to confirm availability.
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-3 text-xs mb-6 pb-4 border-b border-theme-border/60">
        <span className="flex items-center gap-1.5 text-theme-text-secondary">
          <span className="w-5 h-5 rounded-full border border-theme-accent text-theme-accent flex items-center justify-center font-mono text-[10px] font-bold">
            ✓
          </span>
          <span className="tracking-wide">1. Enquiry</span>
        </span>
        <span className="text-theme-border" aria-hidden="true">→</span>
        <span className="flex items-center gap-1.5 font-medium text-theme-accent">
          <span className="w-5 h-5 rounded-full bg-theme-accent text-theme-bg dark:text-theme-surface-deep flex items-center justify-center font-mono text-[10px] font-bold">
            2
          </span>
          <span className="tracking-wide">2. Send to the owner</span>
        </span>
      </div>

      {/* Heading */}
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="font-serif text-2xl sm:text-3xl text-theme-text-primary mb-3 focus:outline-none focus:ring-1 focus:ring-theme-accent"
      >
        Thank you for your enquiry, {firstName}.
      </h3>

      {/* Notice Box */}
      <div className="p-4 bg-theme-surface-raised border border-theme-accent/50 mb-6">
        <p className="text-xs sm:text-sm text-theme-text-primary leading-relaxed font-sans">
          <strong className="font-medium text-theme-accent">One more step.</strong> Your enquiry has not been sent to the owner yet. Press the button below, then press send in WhatsApp so the owner can confirm availability.
        </p>
      </div>

      {/* Primary WhatsApp Button */}
      <div className="mb-6">
        <a
          href={handoff.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsAppHandoffClick}
          aria-label="Chat on WhatsApp to send your enquiry to the owner"
          className="w-full min-h-[48px] px-6 py-3.5 bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep text-sm font-medium tracking-[0.14em] uppercase flex items-center justify-center gap-2.5 transition-colors shadow-sm rounded-sm"
        >
          <MessageCircle className="w-5 h-5 stroke-[1.75]" />
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      {/* Summary Card */}
      <div className="bg-theme-surface-raised border border-theme-border/70 p-4 sm:p-5 mb-5 space-y-2.5 text-xs">
        <div className="flex items-center justify-between border-b border-theme-border/40 pb-2">
          <span className="text-theme-text-secondary uppercase tracking-wider text-[10px]">Guest Name</span>
          <span className="font-medium text-theme-text-primary">{enquiry.fullName}</span>
        </div>

        <div className="flex items-center justify-between border-b border-theme-border/40 pb-2">
          <span className="text-theme-text-secondary uppercase tracking-wider text-[10px]">Contact Phone</span>
          <span className="font-medium text-theme-text-primary">{enquiry.phone}</span>
        </div>

        {enquiry.email && (
          <div className="flex items-center justify-between border-b border-theme-border/40 pb-2">
            <span className="text-theme-text-secondary uppercase tracking-wider text-[10px]">Email Address</span>
            <span className="font-medium text-theme-text-primary">{enquiry.email}</span>
          </div>
        )}

        <div className="flex items-center justify-between border-b border-theme-border/40 pb-2">
          <span className="text-theme-text-secondary uppercase tracking-wider text-[10px]">Check-in Date</span>
          <span className="font-medium text-theme-text-primary">{formatCalendarDate(enquiry.checkInDate)}</span>
        </div>

        <div className="flex items-center justify-between border-b border-theme-border/40 pb-2">
          <span className="text-theme-text-secondary uppercase tracking-wider text-[10px]">Check-out Date</span>
          <span className="font-medium text-theme-text-primary">{formatCalendarDate(enquiry.checkOutDate)}</span>
        </div>

        <div className="flex items-center justify-between border-b border-theme-border/40 pb-2">
          <span className="text-theme-text-secondary uppercase tracking-wider text-[10px]">Guests & Purpose</span>
          <span className="font-medium text-theme-text-primary">
            {enquiry.guests} Guests · {enquiry.purposeOfVisit}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-theme-border/40 pb-2">
          <span className="text-theme-text-secondary uppercase tracking-wider text-[10px]">Package Rate</span>
          <span className="font-medium text-theme-text-primary">
            {PROPERTY.priceDisplay} / 24 hours, entire villa
          </span>
        </div>

        {enquiry.message && enquiry.message.trim() && (
          <div className="pt-1">
            <span className="text-theme-text-secondary uppercase tracking-wider text-[10px] block mb-1">
              Your Message
            </span>
            <p className="text-theme-text-primary italic font-serif">
              “{enquiry.message.trim()}”
            </p>
            {handoff.wasMessageTruncated && (
              <p className="text-[10px] text-theme-accent mt-1">
                Note: Your message was shortened to 500 characters for the WhatsApp text.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Message Preview Block */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] uppercase tracking-wider text-theme-text-secondary font-medium">
            WhatsApp Message Preview
          </span>
          <span className="text-[10px] text-theme-text-secondary">Read-only text</span>
        </div>
        <pre className="bg-theme-bg dark:bg-theme-surface-deep border border-theme-border p-3 text-[11px] font-mono text-theme-text-secondary whitespace-pre-wrap select-all leading-relaxed max-h-40 overflow-y-auto">
          {handoff.message}
        </pre>
      </div>

      {/* Secondary Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-2 pb-4 border-b border-theme-border/40">
        <button
          type="button"
          onClick={handleCopyMessage}
          aria-label="Copy formatted WhatsApp message to clipboard"
          className="flex-1 min-w-[140px] py-2 px-3 border border-theme-border hover:border-theme-accent text-theme-text-primary hover:text-theme-accent text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-theme-accent" />
              <span>Copied to Clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Message</span>
            </>
          )}
        </button>

        <a
          href={PROPERTY.phoneTel}
          className="flex-1 min-w-[140px] py-2 px-3 border border-theme-border hover:border-theme-accent text-theme-text-primary hover:text-theme-accent text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call {PROPERTY.phoneDisplay}</span>
        </a>
      </div>

      {/* Navigation: Edit Details & Start New */}
      <div className="flex items-center justify-between pt-4 text-xs">
        <button
          type="button"
          onClick={onEditDetails}
          className="inline-flex items-center gap-1.5 text-theme-accent hover:underline underline-offset-4 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Edit my details</span>
        </button>

        <button
          type="button"
          onClick={onStartNewEnquiry}
          className="inline-flex items-center gap-1.5 text-theme-text-secondary hover:text-theme-text-primary transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start new enquiry</span>
        </button>
      </div>

      {/* Footnote per Section 4 */}
      <div className="mt-5 pt-3 border-t border-theme-border/30 text-[11px] text-theme-text-secondary leading-normal italic text-center">
        This is an availability enquiry, not a confirmed booking. Availability, and any terms for parties or functions, are confirmed by the owner.
      </div>
    </div>
  );
};
