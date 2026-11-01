import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { VILLA_PHOTOS, ManifestPhoto } from '../../content/imageManifest';
import { BotanicalBranch } from '../common/BotanicalBranch';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Available filters from authenticated villa photos
  const availableCategories = ['All', 'Living Hall', 'Bedrooms', 'Kitchen', 'Restrooms', 'Terrace & Exterior'];

  const filteredPhotos =
    activeFilter === 'All'
      ? VILLA_PHOTOS
      : activeFilter === 'Living Hall'
      ? VILLA_PHOTOS.filter((p) => p.category === 'Hall')
      : activeFilter === 'Bedrooms'
      ? VILLA_PHOTOS.filter((p) => p.category === 'Bedroom 1' || p.category === 'Bedroom 2')
      : activeFilter === 'Kitchen'
      ? VILLA_PHOTOS.filter((p) => p.category === 'Kitchen')
      : activeFilter === 'Restrooms'
      ? VILLA_PHOTOS.filter((p) => p.category.startsWith('Toilet'))
      : activeFilter === 'Terrace & Exterior'
      ? VILLA_PHOTOS.filter((p) => p.category === 'Exterior' || p.category === 'Terrace')
      : VILLA_PHOTOS;

  // Keyboard navigation & Esc listener
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
    <section id="gallery" className="relative py-16 sm:py-20 border-t border-theme-border/40 overflow-hidden font-sans">
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left mb-8 max-w-2xl">
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
            GALLERY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-theme-text-primary font-normal leading-tight mb-2">
            A Glimpse Inside Villa Aurelia
          </h2>
          <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed font-sans">
            Authentic photographs of the private residence, hall, air-conditioned bedrooms, kitchen, and bathroom.
          </p>
        </div>

        {/* Aria live announcement */}
        <div aria-live="polite" className="sr-only">
          Showing {activeFilter} photos, {filteredPhotos.length} items visible.
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {availableCategories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 text-xs font-sans tracking-wider transition-all duration-200 border ${
                  isActive
                    ? 'bg-theme-accent text-theme-bg dark:text-theme-surface-deep border-theme-accent font-medium shadow-sm'
                    : 'bg-theme-surface text-theme-text-secondary border-theme-border hover:border-theme-accent hover:text-theme-text-primary'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Photos Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredPhotos.map((photo: ManifestPhoto, index: number) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative cursor-pointer overflow-hidden border border-theme-border bg-theme-surface aspect-[4/3] shadow-sm"
              role="button"
              tabIndex={0}
              aria-label={`View photo: ${photo.title} in lightbox`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
            >
              <picture>
                <source type="image/webp" srcSet={photo.srcSet} sizes="(max-width: 768px) 100vw, 33vw" />
                <img
                  src={photo.srcJpg}
                  alt={photo.alt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: photo.focalPoint }}
                  width={photo.width}
                  height={photo.height}
                />
              </picture>

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4">
                <span className="self-end p-2 bg-theme-surface/90 text-theme-accent rounded-sm shadow-md">
                  <ZoomIn className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[10px] uppercase font-sans tracking-widest text-[#D0AE78] block">
                    {photo.category}
                  </span>
                  <h4 className="font-serif text-sm text-[#F1E5D2] font-medium">
                    {photo.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
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

          {/* Image & Caption */}
          <div
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative border border-theme-border/60 bg-black/40 overflow-hidden max-h-[70vh]">
              <img
                src={filteredPhotos[lightboxIndex].src}
                alt={filteredPhotos[lightboxIndex].alt}
                className="max-h-[70vh] w-auto object-contain mx-auto"
                width={filteredPhotos[lightboxIndex].width}
                height={filteredPhotos[lightboxIndex].height}
              />
            </div>

            <div className="mt-4 text-center">
              <span className="text-[10px] uppercase font-sans tracking-widest text-[#D0AE78] block">
                {filteredPhotos[lightboxIndex].category}
              </span>
              <h3 className="font-serif text-lg text-white font-medium mt-0.5">
                {filteredPhotos[lightboxIndex].title}
              </h3>
              <p className="text-xs text-white/70 max-w-lg mt-1 font-sans">
                {filteredPhotos[lightboxIndex].description}
              </p>
              <p className="text-[11px] text-white/50 mt-1">
                Photo {lightboxIndex + 1} of {filteredPhotos.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
