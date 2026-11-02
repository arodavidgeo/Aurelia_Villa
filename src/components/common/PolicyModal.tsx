import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, Ban, AlertCircle } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const PolicyModal: React.FC = () => {
  const { activePolicyModal, setActivePolicyModal } = useBooking();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePolicyModal(null);
      }
    };

    if (activePolicyModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePolicyModal, setActivePolicyModal]);

  if (!activePolicyModal) return null;

  const renderContent = () => {
    switch (activePolicyModal) {
      case 'terms':
        return (
          <>
            <div className="flex items-center gap-2 text-theme-accent mb-2">
              <FileText className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-medium">Terms of Stay</span>
            </div>
            <h3 className="font-serif text-2xl text-theme-text-primary mb-4">
              Villa Aurelia Terms & House Rules
            </h3>
            <div className="space-y-4 text-xs text-theme-text-secondary leading-relaxed font-sans">
              <p>
                <strong>1. Exclusive Private Booking:</strong> Villa Aurelia is rented as an entire private residence (Hall, 2 AC Bedrooms, 2 Attached Toilets, Guest Kitchen, Parking, and Terrace). Rooms are not booked separately to unrelated guests.
              </p>
              <p>
                <strong>2. Check-In & Check-Out Schedule:</strong> A standard reservation covers a full 24-hour exclusive stay at ₹7,500. Exact check-in and check-out timing is confirmed by the property at the time of enquiry.
              </p>
              <p>
                <strong>3. Guest Identification:</strong> Government-issued photo identification (Aadhaar, Passport, Driver’s License) is required for primary guests upon arrival.
              </p>
              <p>
                <strong>4. Community & Neighbourhood Courtesy:</strong> Located in residential TNHB Colony, guests are kindly requested to maintain respectful sound levels, especially during evening and nighttime hours.
              </p>
              <p>
                <strong>5. Terrace & Gathering Guidelines:</strong> The open terrace can host birthdays, celebrations, and family gatherings. Event plans, guest counts, and setup requirements are confirmed by the property at the time of enquiry.
              </p>
              <p>
                <strong>6. Property Care & Security Deposit:</strong> Guests are requested to care for the home and appliances. Refundable security deposit requirements, if any, are confirmed by the property at the time of enquiry.
              </p>
            </div>
          </>
        );

      case 'cancellation':
        return (
          <>
            <div className="flex items-center gap-2 text-theme-accent mb-2">
              <Ban className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-medium">Cancellation & Refunds</span>
            </div>
            <h3 className="font-serif text-2xl text-theme-text-primary mb-4">
              Cancellation & Refund Policy
            </h3>
            <div className="space-y-4 text-xs text-theme-text-secondary leading-relaxed font-sans">
              <p>
                <strong>Advance Booking & Confirmation:</strong> All reservations are arranged directly with the host. Advance payment, reservation deposit, and reschedule options are confirmed by the property at the time of enquiry.
              </p>
              <p>
                <strong>Cancellation Window:</strong> Specific cancellation terms and eligible refund timelines are confirmed by the property at the time of enquiry.
              </p>
              <p>
                <strong>Direct Coordination:</strong> For any modifications, date adjustments, or queries regarding an existing reservation, please reach the property directly at +91 96296 68800 or via WhatsApp.
              </p>
            </div>
          </>
        );

      case 'privacy':
        return (
          <>
            <div className="flex items-center gap-2 text-theme-accent mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-medium">Privacy Protection</span>
            </div>
            <h3 className="font-serif text-2xl text-theme-text-primary mb-4">
              Villa Aurelia Privacy Policy
            </h3>
            <div className="space-y-4 text-xs text-theme-text-secondary leading-relaxed font-sans">
              <p>
                <strong>WhatsApp Transmission & Privacy:</strong> Details entered into our availability enquiry form are formatted into a WhatsApp message that you choose to send directly to the property owner. You remain in complete control of sending the message from your own WhatsApp account.
              </p>
              <p>
                <strong>Local Storage & Record Keeping:</strong> Enquiry details may be temporarily cached in session storage on your device solely to maintain your screen on page reload. Where database connectivity is active, enquiries may be recorded in a secured audit log for host availability tracking. Information is never sold, shared, or distributed to third parties. <em>[Draft policy; subject to formal legal review by the property owner.]</em>
              </p>
              <p>
                <strong>Direct Communication:</strong> Sending your enquiry via WhatsApp connects you directly with the villa owner (+91 96296 68800) who verifies and confirms availability.
              </p>
            </div>
          </>
        );

      default:
        return (
          <div className="text-center py-6">
            <AlertCircle className="w-8 h-8 text-theme-accent mx-auto mb-2" />
            <h4 className="font-serif text-xl text-theme-text-primary">Policy Information</h4>
            <p className="text-xs text-theme-text-secondary mt-2">
              Please contact Villa Aurelia directly at +91 96296 68800 for any specific questions.
            </p>
          </div>
        );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 transition-opacity"
      onClick={() => setActivePolicyModal(null)}
    >
      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-theme-surface border border-theme-border p-6 sm:p-8 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setActivePolicyModal(null)}
          aria-label="Close policy dialog"
          className="absolute top-4 right-4 p-1.5 text-theme-text-secondary hover:text-theme-accent transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {renderContent()}

        <div className="mt-6 pt-4 border-t border-theme-border flex justify-end">
          <button
            type="button"
            onClick={() => setActivePolicyModal(null)}
            className="px-5 py-2 bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep text-xs font-medium tracking-wider uppercase transition-colors"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

