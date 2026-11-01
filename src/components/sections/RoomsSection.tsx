import React, { useState } from 'react';
import { ArrowRight, BedDouble, Users, Maximize, Bath, X, Check } from 'lucide-react';
import { Room } from '../../types';
import { BotanicalBranch } from '../common/BotanicalBranch';
import { useBooking } from '../../context/BookingContext';
import { trackBookingCTAClick } from '../../services/analytics';

export const ROOMS_DATA: Room[] = [
  {
    id: 'deluxe-room',
    name: 'Deluxe Room',
    tag: 'Classic Comfort',
    category: 'deluxe',
    description: 'A cosy and elegant room with modern comforts, perfect for a peaceful stay.',
    pricePerNight: 4500,
    formattedPrice: '₹4,500',
    image: '/images/room-deluxe.png',
    amenities: {
      bed: 'King Bed',
      guests: '2 Guests',
      size: '28 m²',
      bathroom: 'Private Bathroom',
    },
    additionalFeatures: [
      'Individually controlled climate cooling',
      'Artisanal organic bath essentials',
      'High-speed fiber optic Wi-Fi',
      'Courtyard garden views',
      'Complimentary morning brew station',
      'Daily housekeeping service',
    ],
  },
  {
    id: 'premium-room',
    name: 'Premium Room',
    tag: 'Spacious & Refined',
    category: 'premium',
    description: 'Spacious and refined, with beautiful views and premium amenities.',
    pricePerNight: 5500,
    formattedPrice: '₹5,500',
    image: '/images/room-premium.png',
    amenities: {
      bed: 'King Bed',
      guests: '2-3 Guests',
      size: '35 m²',
      bathroom: 'Private Bathroom',
    },
    additionalFeatures: [
      'Private veranda with seating',
      'Walk-in rain shower & soaking tub',
      'High-speed fiber optic Wi-Fi',
      'Mini refrigerator & espresso bar',
      'Handcrafted teak wood furnishings',
      'Dedicated concierge assistance',
    ],
  },
  {
    id: 'family-suite',
    name: 'Family Suite',
    tag: 'Expansive Retreat',
    category: 'suite',
    description: 'Ideal for families, with extra space and thoughtful comforts.',
    pricePerNight: 8500,
    formattedPrice: '₹8,500',
    image: '/images/room-family.png',
    amenities: {
      bed: '2 King Beds',
      guests: '4-5 Guests',
      size: '50 m²',
      bathroom: 'Private Bathroom',
    },
    additionalFeatures: [
      'Two interconnecting master bedrooms',
      'Private family lounge & dining area',
      'Two en-suite private bathrooms',
      'Direct access to pool courtyard',
      'Smart entertainment display',
      'Personalized breakfast service included',
    ],
  },
];

export const RoomsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'deluxe' | 'premium' | 'suite'>('all');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const { scrollToEnquiry } = useBooking();

  const filterOptions = [
    { label: 'All Rooms', value: 'all' },
    { label: 'Deluxe Room', value: 'deluxe' },
    { label: 'Premium Room', value: 'premium' },
    { label: 'Family Suite', value: 'suite' },
  ];

  const filteredRooms =
    activeFilter === 'all'
      ? ROOMS_DATA
      : ROOMS_DATA.filter((r) => r.category === activeFilter);

  const handleEnquireRoom = (roomName: string) => {
    trackBookingCTAClick(`room_${roomName.toLowerCase().replace(/ /g, '_')}`);
    setSelectedRoom(null);
    scrollToEnquiry(roomName);
  };

  return (
    <section id="stay" className="relative py-16 sm:py-20 border-t border-theme-border/40 overflow-hidden">
      {/* Botanical detail in upper right whitespace */}
      <BotanicalBranch position="top-right" opacity={0.3} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-left mb-8 sm:mb-10 max-w-2xl">
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
            ROOMS & SUITES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-theme-text-primary font-normal leading-tight mb-2">
            Thoughtfully designed for real rest
          </h2>
          <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed font-sans">
            Elegant, comfortable rooms with modern amenities and a touch of timeless charm.
          </p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-2.5 mb-8">
          {filterOptions.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value as typeof activeFilter)}
                className={`px-4 py-1.5 text-xs font-sans tracking-wider transition-all duration-200 border ${
                  isActive
                    ? 'bg-olive text-ivory-canvas border-olive dark:bg-gold-pale dark:text-espresso-canvas dark:border-gold-pale font-medium'
                    : 'bg-theme-surface/70 text-theme-text-secondary border-theme-border/70 hover:border-theme-accent hover:text-theme-text-primary'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* 3 Horizontal Room Rows */}
        <div className="space-y-4 sm:space-y-5">
          {filteredRooms.map((room) => (
            <div
              key={room.id}
              className="bg-theme-surface border border-theme-border hover:border-theme-accent/60 transition-colors p-4 sm:p-5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 group"
            >
              {/* Room Image */}
              <div className="w-full lg:w-64 h-48 lg:h-36 shrink-0 overflow-hidden border border-theme-border/40 relative">
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Room Details & Amenities */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-serif text-xl sm:text-2xl text-theme-text-primary font-medium">
                    {room.name}
                  </h3>
                  <span className="text-[10px] uppercase font-sans tracking-widest text-theme-accent px-2 py-0.5 bg-theme-surface-raised border border-theme-border/40">
                    {room.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-theme-text-secondary font-sans leading-relaxed mb-4 max-w-2xl">
                  {room.description}
                </p>

                {/* Amenity Icons Row */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-theme-text-secondary font-sans">
                  <span className="flex items-center gap-1.5">
                    <BedDouble className="w-3.5 h-3.5 text-theme-accent" />
                    {room.amenities.bed}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-theme-accent" />
                    {room.amenities.guests}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Maximize className="w-3.5 h-3.5 text-theme-accent" />
                    {room.amenities.size}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath className="w-3.5 h-3.5 text-theme-accent" />
                    {room.amenities.bathroom}
                  </span>
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center border-t lg:border-t-0 pt-4 lg:pt-0 border-theme-border/50 shrink-0 min-w-[170px]">
                <div className="text-left lg:text-right mb-0 lg:mb-3">
                  <span className="font-serif text-2xl text-theme-text-primary font-normal">
                    {room.formattedPrice}
                  </span>
                  <span className="text-xs text-theme-text-secondary font-sans block">
                    / night (plus taxes)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedRoom(room)}
                  className="px-4 py-2 border border-theme-accent text-theme-accent hover:bg-theme-accent hover:text-theme-bg dark:hover:text-theme-surface-deep text-xs font-sans tracking-[0.16em] uppercase flex items-center gap-2 transition-all duration-200"
                >
                  <span>VIEW DETAILS</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Room Detail Modal */}
      {selectedRoom && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 font-sans"
          onClick={() => setSelectedRoom(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-theme-surface border border-theme-border p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedRoom(null)}
              aria-label="Close Room Details"
              className="absolute top-4 right-4 p-1 text-theme-text-secondary hover:text-theme-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-theme-accent font-medium">
                {selectedRoom.tag}
              </span>
              <h3 className="font-serif text-3xl text-theme-text-primary mt-1">
                {selectedRoom.name}
              </h3>
              <p className="text-xs text-theme-text-secondary mt-1">
                Starting from <span className="text-theme-text-primary font-medium">{selectedRoom.formattedPrice}</span> per night
              </p>
            </div>

            <div className="h-64 overflow-hidden border border-theme-border mb-6">
              <img
                src={selectedRoom.image}
                alt={selectedRoom.name}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed mb-6">
              {selectedRoom.description} Thoughtfully curated with natural textiles, soothing lighting, and artisanal touches to provide uncompromised rest during your stay at Villa Aurelia.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-theme-surface-raised border border-theme-border/60 mb-6 text-xs text-theme-text-secondary">
              <div>
                <span className="block text-[10px] text-theme-accent uppercase">Bedding</span>
                {selectedRoom.amenities.bed}
              </div>
              <div>
                <span className="block text-[10px] text-theme-accent uppercase">Occupancy</span>
                {selectedRoom.amenities.guests}
              </div>
              <div>
                <span className="block text-[10px] text-theme-accent uppercase">Room Size</span>
                {selectedRoom.amenities.size}
              </div>
              <div>
                <span className="block text-[10px] text-theme-accent uppercase">En-Suite</span>
                {selectedRoom.amenities.bathroom}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-serif uppercase tracking-widest text-theme-text-primary mb-3">
                Included Amenities & Privileges
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-theme-text-secondary">
                {selectedRoom.additionalFeatures?.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-theme-accent shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-theme-border">
              <span className="text-xs text-theme-text-secondary italic">
                * Real-time availability verified upon enquiry submission.
              </span>
              <button
                type="button"
                onClick={() => handleEnquireRoom(selectedRoom.name)}
                className="w-full sm:w-auto px-6 py-2.5 bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep text-xs font-medium tracking-widest uppercase transition-colors"
              >
                Enquire For {selectedRoom.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
