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
                <strong>1. Check-In & Check-Out:</strong> Standard check-in time is 2:00 PM and check-out time is 11:00 AM. Early arrivals or late departures are subject to villa occupancy and require prior coordination.
              </p>
              <p>
                <strong>2. Guest Identification:</strong> Government-issued photo identification (Passport, Aadhaar, Driver’s License) is required for all registered adult guests at check-in.
              </p>
              <p>
                <strong>3. Quiet Hours:</strong> To preserve the calm and serene atmosphere of the villa, outdoor music and loud gatherings are restricted between 10:00 PM and 7:00 AM.
              </p>
              <p>
                <strong>4. Smoking & Safety:</strong> Smoking is strictly prohibited inside the bedrooms and enclosed suites. Designated outdoor smoking areas are available.
              </p>
              <p>
                <strong>5. Property Care:</strong> Guests are expected to treat the villa spaces, gardens, and amenities with care. Any damage beyond reasonable wear will be billed at actual repair or replacement cost.
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
                <strong>Free Cancellation Window:</strong> Cancellations made at least 7 days prior to the scheduled check-in date receive a 100% refund of any deposit paid.
              </p>
              <p>
                <strong>Moderate Cancellation (3 to 7 Days):</strong> Cancellations made between 3 and 7 days prior to arrival incur a 50% cancellation fee of the first night’s stay.
              </p>
              <p>
                <strong>Short Notice / No Show (Under 48 Hours):</strong> Cancellations made within 48 hours of check-in, or failure to arrive without prior notification, are non-refundable.
              </p>
              <p>
                <strong>Refund Processing:</strong> Approved refunds are credited back to the original payment source within 5–7 business days.
              </p>
              <p className="text-[11px] text-theme-text-secondary/80 italic">
                * Note: Peak season dates (December 20 – January 5) may require customized non-refundable deposit terms as communicated during reservation confirmation.
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
                <strong>Data Collection:</strong> We collect only the information necessary to facilitate your villa stay reservation: your name, contact phone, email address, dates of travel, and special preferences.
              </p>
              <p>
                <strong>Use of Information:</strong> Your personal data is used solely for reservation communications, guest hospitality coordination, and regulatory stay compliance. We never sell, rent, or trade guest personal information to third parties.
              </p>
              <p>
                <strong>Security:</strong> All enquiry transmissions are encrypted over HTTPS. Stored records are accessible strictly to authorized villa hospitality staff.
              </p>
              <p>
                <strong>Your Rights:</strong> You may request review or deletion of your booking enquiry records at any time by contacting info@villaaurelia.com.
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
              Please contact our front office at info@villaaurelia.com for detailed policy enquiries.
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

