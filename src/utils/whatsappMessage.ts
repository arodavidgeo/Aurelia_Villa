import { PROPERTY } from '../content/property';

export interface EnquiryForWhatsApp {
  fullName: string;
  phone: string;
  email?: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number | string;
  purposeOfVisit: string;
  message?: string;
}

export interface WhatsAppHandoffResult {
  message: string;
  url: string;
  wasMessageTruncated: boolean;
}

/**
 * Clean control characters while preserving valid line breaks and unicode
 */
const sanitizeField = (value: string | undefined | null): string => {
  if (!value) return '';
  return value.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
};

/**
 * Format a calendar date string (YYYY-MM-DD) as 'Fri, 6 Nov 2026'
 * treating it as a plain calendar date to avoid timezone shift.
 */
export const formatCalendarDate = (dateStr: string | undefined | null): string => {
  if (!dateStr || typeof dateStr !== 'string') return 'Not specified';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;

  const [yearStr, monthStr, dayStr] = parts;
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return dateStr;

  const d = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  if (isNaN(d.getTime())) return dateStr;

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const weekday = weekdays[d.getUTCDay()];
  const dayNum = d.getUTCDate();
  const monthName = months[d.getUTCMonth()];
  const yearNum = d.getUTCFullYear();

  return `${weekday}, ${dayNum} ${monthName} ${yearNum}`;
};

/**
 * Pure function to construct the WhatsApp message and link for Villa Aurelia
 * following the exact plain-text specifications (no accidental markdown, clean linebreaks).
 */
export const buildWhatsAppMessage = (enquiry: EnquiryForWhatsApp): WhatsAppHandoffResult => {
  const name = sanitizeField(enquiry.fullName) || 'Guest';
  const phone = sanitizeField(enquiry.phone) || 'Not provided';
  const rawEmail = sanitizeField(enquiry.email);
  const email = rawEmail.length > 0 ? rawEmail : 'Not provided';

  const checkIn = formatCalendarDate(enquiry.checkInDate);
  const checkOut = formatCalendarDate(enquiry.checkOutDate);

  const guests = sanitizeField(String(enquiry.guests || '1'));
  const purpose = sanitizeField(enquiry.purposeOfVisit) || 'Stay';

  const rawMessage = sanitizeField(enquiry.message);
  let wasMessageTruncated = false;
  let finalMessage = rawMessage || 'None';

  if (rawMessage.length > 500) {
    finalMessage = rawMessage.slice(0, 500).trim();
    wasMessageTruncated = true;
  }

  // Exact template per Section 5
  const lines = [
    'Hello Villa Aurelia, I would like to check availability.',
    '',
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
    `Check-in: ${checkIn}`,
    `Check-out: ${checkOut}`,
    `Guests: ${guests}`,
    `Purpose: ${purpose}`,
    `Message: ${finalMessage}`,
    '',
    `Package: ${PROPERTY.priceDisplay} for a 24-hour stay (entire villa)`,
    'Please let me know if these dates are available. Thank you.',
    '',
    'Sent from the Villa Aurelia website',
  ];

  const fullText = lines.join('\n');
  const url = `https://wa.me/${PROPERTY.whatsappNumber}?text=${encodeURIComponent(fullText)}`;

  return {
    message: fullText,
    url,
    wasMessageTruncated,
  };
};
