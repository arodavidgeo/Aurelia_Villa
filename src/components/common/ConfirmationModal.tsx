import React, { useEffect } from 'react';
import { CheckCircle2, X, Calendar, User, Home, Mail } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const ConfirmationModal: React.FC = () => {
  const { confirmationModalData, setConfirmationModalData } = useBooking();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setConfirmationModalData(null);
      }
    };

    if (confirmationModalData) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [confirmationModalData, setConfirmationModalData]);

  if (!confirmationModalData) return null;

  const { referenceId, enquiry } = confirmationModalData;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 transition-opacity"
      onClick={() => setConfirmationModalData(null)}
    >
      <div
        className="relative w-full max-w-lg bg-theme-surface border border-theme-border p-6 sm:p-8 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setConfirmationModalData(null)}
          aria-label="Close confirmation dialog"
          className="absolute top-4 right-4 p-1.5 text-theme-text-secondary hover:text-theme-accent transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-theme-accent/15 flex items-center justify-center text-theme-accent mb-3">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-xs uppercase tracking-widest text-theme-accent font-medium mb-1">
            Enquiry Received
          </span>
          <h3
            id="confirmation-modal-title"
            className="font-serif text-2xl sm:text-3xl text-theme-text-primary"
          >
            Thank You, {enquiry.fullName}
          </h3>
          <p className="text-xs text-theme-text-secondary mt-1 font-sans">
            Reference ID:{' '}
            <span className="font-mono text-theme-accent font-medium">{referenceId}</span>
          </p>
        </div>

        <div className="bg-theme-surface-raised border border-theme-border/60 p-4 mb-6 space-y-2.5 text-xs text-theme-text-secondary font-sans">
          <div className="flex items-center justify-between border-b border-theme-border/40 pb-2">
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-theme-accent" />
              Dates:
            </span>
            <span className="text-theme-text-primary font-medium">
              {enquiry.checkInDate} to {enquiry.checkOutDate}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-theme-border/40 pb-2">
            <span className="flex items-center gap-2">
              <Home className="w-3.5 h-3.5 text-theme-accent" />
              Room Category:
            </span>
            <span className="text-theme-text-primary font-medium">
              {enquiry.preferredRoom}
            </span>
          </div>

          <div className="flex items-center justify-between border-b border-theme-border/40 pb-2">
            <span className="flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-theme-accent" />
              Guests:
            </span>
            <span className="text-theme-text-primary font-medium">
              {enquiry.guests} Guests
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-theme-accent" />
              Confirmation sent to:
            </span>
            <span className="text-theme-text-primary font-medium truncate max-w-[200px]">
              {enquiry.email}
            </span>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-theme-text-secondary text-center mb-6">
          Our reservations concierge will verify room availability and contact you via phone/WhatsApp within 2–4 hours with custom arrangements and payment options.
        </p>

        <button
          type="button"
          onClick={() => setConfirmationModalData(null)}
          className="w-full py-2.5 bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep text-xs font-medium tracking-widest uppercase transition-colors"
        >
          Close & Return to Website
        </button>
      </div>
    </div>
  );
};
