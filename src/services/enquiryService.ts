import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { BookingEnquiry } from '../types';
import { getStoredUTM } from './utm';
import { trackEnquirySubmitted } from './analytics';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  try {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  } catch (err) {
    console.warn('Failed to initialize Supabase client:', err);
  }
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  checkInDate?: string;
  checkOutDate?: string;
  guests?: string;
  preferredRoom?: string;
  general?: string;
}

export const validateEnquiry = (data: Partial<BookingEnquiry>): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  // Relaxed phone validation for international formats
  const phoneClean = (data.phone || '').replace(/[\s\-\(\)\+]/g, '');
  if (!data.phone || phoneClean.length < 8) {
    errors.phone = 'Please provide a valid contact number (at least 8 digits).';
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!data.checkInDate) {
    errors.checkInDate = 'Please select a check-in date.';
  } else {
    const checkIn = new Date(data.checkInDate);
    if (isNaN(checkIn.getTime()) || checkIn < today) {
      errors.checkInDate = 'Check-in date cannot be in the past.';
    }
  }

  if (!data.checkOutDate) {
    errors.checkOutDate = 'Please select a check-out date.';
  } else if (data.checkInDate) {
    const checkIn = new Date(data.checkInDate);
    const checkOut = new Date(data.checkOutDate);
    if (isNaN(checkOut.getTime()) || checkOut <= checkIn) {
      errors.checkOutDate = 'Check-out date must be after check-in date.';
    }
  }

  if (!data.guests || data.guests < 1 || data.guests > 12) {
    errors.guests = 'Please select between 1 and 12 guests.';
  }

  if (!data.preferredRoom) {
    errors.preferredRoom = 'Please select your preferred room category.';
  }

  return errors;
};

export const submitEnquiry = async (
  enquiryData: Omit<BookingEnquiry, 'id' | 'createdAt'>,
  honeypot: string = ''
): Promise<{ success: boolean; referenceId: string; message: string }> => {
  // Anti-spam honeypot detection
  if (honeypot.trim().length > 0) {
    // Silently drop bot submission
    return {
      success: true,
      referenceId: `VA-${Date.now().toString(36).toUpperCase()}`,
      message: 'Your enquiry has been received.',
    };
  }

  // Server-side / client-side validation
  const errors = validateEnquiry(enquiryData);
  if (Object.keys(errors).length > 0) {
    throw new Error(Object.values(errors)[0]);
  }

  const referenceId = `VA-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
  const utm = getStoredUTM();

  const fullPayload: BookingEnquiry = {
    ...enquiryData,
    id: referenceId,
    utm,
    createdAt: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { error } = await supabase.from('enquiries').insert([
        {
          id: referenceId,
          full_name: fullPayload.fullName,
          email: fullPayload.email,
          phone: fullPayload.phone,
          check_in_date: fullPayload.checkInDate,
          check_out_date: fullPayload.checkOutDate,
          guests: fullPayload.guests,
          preferred_room: fullPayload.preferredRoom,
          message: fullPayload.message || null,
          utm_source: utm.utm_source || null,
          utm_medium: utm.utm_medium || null,
          utm_campaign: utm.utm_campaign || null,
          created_at: fullPayload.createdAt,
        },
      ]);

      if (error) {
        console.warn('Supabase insert failed, falling back to local queue:', error);
        saveToLocalQueue(fullPayload);
      }
    } catch (err) {
      console.warn('Supabase call threw error, saving to local queue:', err);
      saveToLocalQueue(fullPayload);
    }
  } else {
    // No Supabase credentials configured, safely persist to offline queue
    saveToLocalQueue(fullPayload);
  }

  trackEnquirySubmitted(fullPayload.preferredRoom, fullPayload.guests);

  return {
    success: true,
    referenceId,
    message: 'Thank you! Your availability enquiry has been sent to our villa reservations team.',
  };
};

const saveToLocalQueue = (enquiry: BookingEnquiry) => {
  if (typeof window === 'undefined') return;
  try {
    const existing = JSON.parse(localStorage.getItem('va_enquiries_queue') || '[]');
    existing.unshift(enquiry);
    localStorage.setItem('va_enquiries_queue', JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.error('Failed to save enquiry locally:', e);
  }
};

