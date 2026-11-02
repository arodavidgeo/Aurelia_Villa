import { createClient, SupabaseClient } from '@supabase/supabase-js';
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

export interface EnquiryPayload {
  id?: string;
  fullName: string;
  phone: string;
  email: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  purposeOfVisit: string;
  message?: string;
  createdAt?: string;
}

export interface ValidationErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  checkInDate?: string;
  checkOutDate?: string;
  guests?: string;
  purposeOfVisit?: string;
  general?: string;
}

export const normalizeIndianPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 10) return digits;
  if (digits.length === 12 && digits.startsWith('91')) return digits.slice(2);
  return digits;
};

export const validateEnquiryForm = (data: Partial<EnquiryPayload>): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Name: 2 to 80 characters
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your name (at least 2 characters).';
  } else if (data.fullName.trim().length > 80) {
    errors.fullName = 'Name cannot exceed 80 characters.';
  }

  // Indian phone: 10 digits with optional +91
  const cleanPhone = normalizeIndianPhone(data.phone || '');
  if (!data.phone || cleanPhone.length !== 10) {
    errors.phone = 'Please provide a valid 10-digit Indian phone number.';
  }

  // Email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  // Dates
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

  // Guests: positive integer
  if (!data.guests || data.guests < 1) {
    errors.guests = 'Please specify number of guests.';
  }

  // Purpose of visit
  if (!data.purposeOfVisit) {
    errors.purposeOfVisit = 'Please select your purpose of visit.';
  }

  return errors;
};

export const submitEnquiry = async (
  enquiryData: Omit<EnquiryPayload, 'id' | 'createdAt'>,
  honeypot: string = ''
): Promise<{ success: boolean; referenceId: string; message: string }> => {
  // Anti-spam honeypot detection
  if (honeypot && honeypot.trim().length > 0) {
    return {
      success: true,
      referenceId: `VA-${Date.now().toString(36).toUpperCase()}`,
      message: 'Thank you for your enquiry. Please send your details to the owner on WhatsApp to confirm availability.',
    };
  }

  const errors = validateEnquiryForm(enquiryData);
  if (Object.keys(errors).length > 0) {
    throw new Error(Object.values(errors)[0]);
  }

  const referenceId = `VA-${Date.now().toString().slice(-6)}`;
  const utm = getStoredUTM();

  const fullPayload: EnquiryPayload & { utm: Record<string, string | undefined> } = {
    ...enquiryData,
    phone: normalizeIndianPhone(enquiryData.phone),
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
          phone: fullPayload.phone,
          email: fullPayload.email,
          check_in_date: fullPayload.checkInDate,
          check_out_date: fullPayload.checkOutDate,
          guests: fullPayload.guests,
          purpose_of_visit: fullPayload.purposeOfVisit,
          message: fullPayload.message || null,
          utm_source: utm.utm_source || null,
          utm_medium: utm.utm_medium || null,
          utm_campaign: utm.utm_campaign || null,
          created_at: fullPayload.createdAt,
        },
      ]);

      if (error) {
        console.warn('Supabase insert failed, saving to local queue:', error);
        saveToLocalQueue(fullPayload);
      }
    } catch (err) {
      console.warn('Supabase call error, saving to local queue:', err);
      saveToLocalQueue(fullPayload);
    }
  } else {
    saveToLocalQueue(fullPayload);
  }

  trackEnquirySubmitted(fullPayload.purposeOfVisit, fullPayload.guests);

  return {
    success: true,
    referenceId,
    message: 'Thank you for your enquiry. Please send your details to the owner on WhatsApp to confirm availability.',
  };
};

const saveToLocalQueue = (enquiry: EnquiryPayload) => {
  if (typeof window === 'undefined') return;
  try {
    const existing = JSON.parse(localStorage.getItem('va_enquiries_queue') || '[]');
    existing.unshift(enquiry);
    localStorage.setItem('va_enquiries_queue', JSON.stringify(existing.slice(0, 50)));
  } catch (e) {
    console.error('Failed to save enquiry locally:', e);
  }
};
