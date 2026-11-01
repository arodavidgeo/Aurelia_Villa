import React, { createContext, useContext, useState } from 'react';
import { EnquiryPayload } from '../services/enquiryService';

interface BookingContextType {
  checkInDate: string;
  setCheckInDate: (date: string) => void;
  checkOutDate: string;
  setCheckOutDate: (date: string) => void;
  guests: number;
  setGuests: (guests: number) => void;
  purposeOfVisit: string;
  setPurposeOfVisit: (purpose: string) => void;
  confirmationModalData: { referenceId: string; enquiry: Partial<EnquiryPayload> } | null;
  setConfirmationModalData: (data: { referenceId: string; enquiry: Partial<EnquiryPayload> } | null) => void;
  activePolicyModal: string | null;
  setActivePolicyModal: (policy: string | null) => void;
  scrollToEnquiry: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [guests, setGuests] = useState<number>(4);
  const [purposeOfVisit, setPurposeOfVisit] = useState<string>('Family Stay');
  const [confirmationModalData, setConfirmationModalData] = useState<{
    referenceId: string;
    enquiry: Partial<EnquiryPayload>;
  } | null>(null);
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

  const scrollToEnquiry = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('enquiry-name');
        input?.focus();
      }, 400);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        checkInDate,
        setCheckInDate,
        checkOutDate,
        setCheckOutDate,
        guests,
        setGuests,
        purposeOfVisit,
        setPurposeOfVisit,
        confirmationModalData,
        setConfirmationModalData,
        activePolicyModal,
        setActivePolicyModal,
        scrollToEnquiry,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
