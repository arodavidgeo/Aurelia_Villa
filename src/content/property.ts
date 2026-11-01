export interface PropertyData {
  name: string;
  tagline: string;
  alternateTaglines: string[];
  eyebrow: string;
  heroSupport: string;
  priceDisplay: string;
  priceValue: number;
  priceNote: string;
  pricingCardTitle: string;
  pricingIncludes: string[];
  pricingTermsNote: string;
  propertyType: string;
  locationCity: string;
  address: string;
  phoneDisplay: string;
  phoneTel: string;
  phoneRaw: string;
  whatsappNumber: string;
  whatsappPrefilledMessage: string;
  whatsappUrl: string;
  googleMapsQuery: string;
  googleMapsDirectionsUrl: string;
  confirmationNotice: string;
  features: {
    hall: string;
    bedrooms: string;
    toilets: string;
    kitchen: string;
    parking: string;
    terrace: string;
  };
  highlights: {
    title: string;
    description: string;
  }[];
  faq: {
    id: string;
    question: string;
    answer: string;
  }[];
}

const rawPhone = '9629668800';
const fullAddress =
  'Villa Aurelia, H-18, TNHB Colony, Stage - 1, Bharani Nagar, VM Chatram, Tirunelveli - 627011, Tamil Nadu, India';

const prefilledText =
  'Hello Villa Aurelia, I would like to enquire about booking the entire villa in Tirunelveli (₹7,500 / 24 Hours).';

export const PROPERTY: PropertyData = {
  name: 'Villa Aurelia',
  tagline: 'Your Space. Your Moments. Your Villa.',
  alternateTaglines: [
    'An Entire Villa. A Private Experience.',
    'Stay Together. Celebrate Together.',
  ],
  eyebrow: 'A PRIVATE VILLA STAY IN TIRUNELVELI',
  heroSupport:
    'Experience the comfort of an entire private home, thoughtfully suited for family stays, get-togethers and memorable celebrations.',
  priceDisplay: '₹7,500',
  priceValue: 7500,
  priceNote: 'for a 24-hour stay, for the entire villa',
  pricingCardTitle: 'Your Private Villa Stay',
  pricingIncludes: [
    'Entire private house (not shared with anyone else)',
    'Two air-conditioned bedrooms',
    'One spacious common living hall',
    'Two attached toilets (one Western-style, one Indian-style)',
    'One kitchen available for guest use',
    'Parking for 2 cars and 4 bikes on premises',
    'Terrace access subject to agreed access and usage rules',
  ],
  pricingTermsNote:
    'Any additional terms for parties or functions are confirmed by the property.',
  propertyType: 'One complete private house, not a hotel and not separately bookable rooms',
  locationCity: 'Tirunelveli',
  address: fullAddress,
  phoneDisplay: '96296 68800',
  phoneTel: `tel:+91${rawPhone}`,
  phoneRaw: rawPhone,
  whatsappNumber: `91${rawPhone}`,
  whatsappPrefilledMessage: prefilledText,
  whatsappUrl: `https://wa.me/91${rawPhone}?text=${encodeURIComponent(prefilledText)}`,
  googleMapsQuery: 'https://www.google.com/maps/place/8%C2%B042%2750.5%22N+77%C2%B046%2701.4%22E/@8.7140178,77.7670437,18z/data=!3m1!1e3!4m4!3m3!8m2!3d8.7140178!4d77.7670437?hl=en',
  googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=8.7140178,77.7670437',
  confirmationNotice: 'Details are confirmed by the property at the time of enquiry.',
  features: {
    hall: 'One hall, the common living and gathering area',
    bedrooms: 'Two, both air-conditioned',
    toilets: 'Two attached toilets: one Western-style, one Indian-style',
    kitchen: 'One kitchen available to guests',
    parking: '2 cars and 4 bikes',
    terrace: 'Available; suited to birthdays, family gatherings, small parties and private functions',
  },
  highlights: [
    {
      title: 'Entire Private House',
      description: 'Exclusive reservation of the full villa for your group.',
    },
    {
      title: 'Two AC Bedrooms',
      description: 'Two bedrooms, both air-conditioned with attached toilets.',
    },
    {
      title: 'Terrace for Gatherings',
      description: 'Welcoming terrace suited for family occasions & gatherings.',
    },
    {
      title: 'Parking for 2 Cars and 4 Bikes',
      description: 'Secure on-premise parking for your vehicles.',
    },
  ],
  faq: [
    {
      id: 'faq-1',
      question: 'Is the entire villa available for booking?',
      answer:
        'Yes. Villa Aurelia is offered exclusively as one complete private house. It is not a hotel and rooms are not booked separately.',
    },
    {
      id: 'faq-2',
      question: 'What is the price for a 24-hour stay?',
      answer:
        'The price is ₹7,500 for a 24-hour stay, which includes exclusive use of the entire villa.',
    },
    {
      id: 'faq-3',
      question: 'How many bedrooms are available?',
      answer:
        'There are two bedrooms in the villa, both equipped with air conditioning.',
    },
    {
      id: 'faq-4',
      question: 'Are the bedrooms air-conditioned?',
      answer:
        'Yes, both bedrooms are air-conditioned.',
    },
    {
      id: 'faq-5',
      question: 'Are attached toilets available?',
      answer:
        'Yes, there are two attached toilets: one Western-style and one Indian-style.',
    },
    {
      id: 'faq-6',
      question: 'Is a kitchen available?',
      answer:
        'Yes, one kitchen is available for guests.',
    },
    {
      id: 'faq-7',
      question: 'How many cars and bikes can be parked?',
      answer:
        'On-premises parking is available for 2 cars and 4 bikes.',
    },
    {
      id: 'faq-8',
      question: 'Can the terrace be used for celebrations?',
      answer:
        'Yes, the terrace is available and suited to birthdays, family gatherings, small parties and private functions. Event arrangements, usage terms and availability are confirmed with the property.',
    },
    {
      id: 'faq-9',
      question: 'How do I make a booking enquiry?',
      answer:
        'You can submit an availability enquiry through our online form, call us directly at 96296 68800, or message us on WhatsApp. Details and availability are confirmed by the property upon enquiry.',
    },
    {
      id: 'faq-10',
      question: 'Where is Villa Aurelia located?',
      answer:
        'Villa Aurelia is located at H-18, TNHB Colony, Stage - 1, Bharani Nagar, VM Chatram, Tirunelveli - 627011, Tamil Nadu, India.',
    },
  ],
};

