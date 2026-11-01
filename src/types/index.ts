export interface Room {
  id: string;
  name: string;
  tag: string;
  category: 'deluxe' | 'premium' | 'suite';
  description: string;
  pricePerNight: number;
  formattedPrice: string;
  image: string;
  amenities: {
    bed: string;
    guests: string;
    size: string;
    bathroom: string;
  };
  additionalFeatures?: string[];
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'rooms' | 'outdoor' | 'dining' | 'interiors' | 'surroundings';
  src: string;
  alt: string;
}

export interface LocationAttraction {
  id: string;
  title: string;
  distance: string;
  image: string;
}

export interface BookingEnquiry {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
  preferredRoom: string;
  message?: string;
  utm?: UTMData;
  createdAt?: string;
}

export interface UTMData {
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
