export interface VillaSpace {
  id: string;
  name: string;
  tag: string;
  description: string;
  image: string;
  features: string[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'exterior' | 'bedrooms' | 'living' | 'kitchen' | 'amenities';
  src: string;
  alt: string;
  caption?: string;
}

export interface LocationLandmark {
  id: string;
  title: string;
  distance: string;
  duration: string;
  description: string;
}

export interface BookingEnquiry {
  id?: string;
  fullName: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  purposeOfVisit: string;
  specialRequests?: string;
  utm?: UTMData;
  createdAt?: string;
}

export interface UTMData {
  [key: string]: string | undefined;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
