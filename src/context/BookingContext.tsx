import React, { createContext, useContext, useState } from 'react';
import { BookingEnquiry, Room } from '../types';

interface BookingContextType {
  checkInDate: string;
  setCheckInDate: (date: string) => void;
  checkOutDate: string;
  setCheckOutDate: (date: string) => void;
  guests: number;
  setGuests: (guests: number) => void;
  preferredRoom: string;
  setPreferredRoom: (room: string) => void;
  selectedRoomForModal: Room | null;
  setSelectedRoomForModal: (room: Room | null) => void;
  confirmationModalData: { referenceId: string; enquiry: Partial<BookingEnquiry> } | null;
  setConfirmationModalData: (data: { referenceId: string; enquiry: Partial<BookingEnquiry> } | null) => void;
  activePolicyModal: string | null;
  setActivePolicyModal: (policy: string | null) => void;
  scrollToEnquiry: (prefillRoom?: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [guests, setGuests] = useState<number>(2);
  const [preferredRoom, setPreferredRoom] = useState<string>('');
  const [selectedRoomForModal, setSelectedRoomForModal] = useState<Room | null>(null);
  const [confirmationModalData, setConfirmationModalData] = useState<{
    referenceId: string;
    enquiry: Partial<BookingEnquiry>;
  } | null>(null);
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

  const scrollToEnquiry = (prefillRoom?: string) => {
    if (prefillRoom) {
      setPreferredRoom(prefillRoom);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Focus on first input after scroll
      setTimeout(() => {
        const input = document.getElementById('enquiry-name');
        input?.focus();
      }, 500);
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
        preferredRoom,
        setPreferredRoom,
        selectedRoomForModal,
        setSelectedRoomForModal,
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

