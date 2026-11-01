import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { GalleryPhoto } from '../../types';
import { BotanicalBranch } from '../common/BotanicalBranch';

export const GALLERY_ITEMS: GalleryPhoto[] = [
  {
    id: 'g-pool',
    title: 'Sunlit Courtyard & Private Pool',
    category: 'outdoor',
    src: '/images/gallery-pool.png',
    alt: 'Villa Aurelia swimming pool surrounded by colonial architecture and tropical palms',
  },
  {
    id: 'g-bedroom',
    title: 'Master Deluxe Bedroom Suite',
    category: 'rooms',
    src: '/images/gallery-bedroom.png',
    alt: 'Warmly lit bedroom with organic linen, teak headboard, and tranquil reading lamps',
  },
  {
    id: 'g-garden',
    title: 'Lush Courtyard Verandah',
    category: 'outdoor',
    src: '/images/gallery-garden.png',
    alt: 'Verandah corridor overlooking lush tropical gardens and terracotta rooftops',
  },
  {
    id: 'g-dining',
    title: 'Alfresco Coastal Dining Table',
    category: 'dining',
    src: '/images/gallery-dining.png',
    alt: 'Open air wooden dining setting prepared with fresh local seasonal breakfast',
  },
  {
    id: 'g-interior',
    title: 'Heritage Living Lounge',
    category: 'interiors',
    src: '/images/gallery-interior.png',
    alt: 'Intimate guest lounge with handcrafted cane chairs, warm timber accents, and soft textiles',
  },
  {
    id: 'g-outdoor',
    title: 'Shaded Garden Pavilions',
    category: 'surroundings',
    src: '/images/gallery-outdoor.png',
    alt: 'Outdoor shaded seating corner surrounded by serene greenery for quiet reading',
  },
];

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { label: 'All', value: 'all' },
    { label: 'Rooms', value: 'rooms' },
    { label: 'Outdoor', value: 'outdoor' },
    { label: 'Dining', value: 'dining' },
    { label: 'Interiors', value: 'interiors' },
    { label: 'Surroundings', value: 'surroundings' },
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : null
        );
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length
            : null
        );
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, filteredPhotos.length]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
      );
    }
  };

  return (
    <section id="gallery" className="relative py-16 sm:py-20 border-t border-theme-border/40 overflow-hidden">
      {/* Botanical detail in upper right whitespace */}
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-left mb-8 max-w-2xl">
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
            GALLERY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-theme-text-primary font-normal leading-tight mb-2">
            A glimpse of Villa Aurelia
          </h2>
          <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed font-sans">
            Explore our spaces, rooms and surroundings through a curated collection of photographs.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3.5 py-1.5 text-xs font-sans tracking-wider transition-all duration-200 border ${
                  isActive
                    ? 'bg-olive text-ivory-canvas border-olive dark:bg-gold-pale dark:text-espresso-canvas dark:border-gold-pale font-medium'
                    : 'bg-theme-surface text-theme-text-secondary border-theme-border hover:border-theme-accent hover:text-theme-text-primary'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 3 columns x 2 rows image grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative cursor-pointer overflow-hidden border border-theme-border bg-theme-surface aspect-[16/10] shadow-sm"
              role="button"
              tabIndex={0}
              aria-label={`View ${photo.title} in lightbox`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="p-2.5 bg-theme-surface text-theme-accent rounded-full shadow-md">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Full Gallery action */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => openLightbox(0)}
            className="px-6 py-2.5 border border-theme-accent text-theme-accent hover:bg-theme-accent hover:text-theme-bg dark:hover:text-theme-surface-deep text-xs font-sans tracking-[0.18em] uppercase flex items-center gap-2 transition-all duration-200"
          >
            <span>VIEW FULL GALLERY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 font-sans select-none"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close Lightbox (Esc)"
            className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-theme-accent transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            aria-label="Previous Image"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/80 hover:text-theme-accent transition-colors bg-black/40 hover:bg-black/70 border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            aria-label="Next Image"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 text-white/80 hover:text-theme-accent transition-colors bg-black/40 hover:bg-black/70 border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative border border-theme-border/60 bg-black/40 overflow-hidden max-h-[70vh]">
              <img
                src={filteredPhotos[lightboxIndex].src}
                alt={filteredPhotos[lightboxIndex].alt}
                className="max-h-[70vh] w-auto object-contain mx-auto"
              />
            </div>

            <div className="mt-4 text-center">
              <h3 className="font-serif text-lg text-white font-medium">
                {filteredPhotos[lightboxIndex].title}
              </h3>
              <p className="text-xs text-white/70 mt-1">
                Image {lightboxIndex + 1} of {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

