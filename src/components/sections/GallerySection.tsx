import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn, Grid3X3, Film } from 'lucide-react';
import { VILLA_PHOTOS, ManifestPhoto } from '../../content/imageManifest';
import { BotanicalBranch } from '../common/BotanicalBranch';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'strip'>('grid');
  const prefersReduced = useReducedMotion();

  const stripRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const scrollLeftRef = useRef<number>(0);
  const movedDistanceRef = useRef<number>(0);
  const openerRef = useRef<HTMLElement | null>(null);

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

  // Dragging logic for horizontal strip
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!stripRef.current) return;
    isDraggingRef.current = true;
    startXRef.current = e.pageX - stripRef.current.offsetLeft;
    scrollLeftRef.current = stripRef.current.scrollLeft;
    movedDistanceRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !stripRef.current) return;
    const x = e.pageX - stripRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    movedDistanceRef.current = Math.abs(x - startXRef.current);
    stripRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const scrollStrip = (direction: 'left' | 'right') => {
    if (!stripRef.current) return;
    const amount = direction === 'left' ? -380 : 380;
    stripRef.current.scrollBy({ left: amount, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  // Keyboard navigation & Esc listener for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredPhotos.length : null));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : null
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

  // Preload neighbouring images in lightbox
  useEffect(() => {
    if (lightboxIndex === null || typeof window === 'undefined') return;
    const nextIdx = (lightboxIndex + 1) % filteredPhotos.length;
    const prevIdx = (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    [nextIdx, prevIdx].forEach((i) => {
      const p = filteredPhotos[i];
      if (p) {
        const img = new Image();
        img.src = p.src;
      }
    });
  }, [lightboxIndex, filteredPhotos]);

  const openLightbox = (index: number, e?: React.SyntheticEvent) => {
    if (movedDistanceRef.current > 6) {
      // Prevent accidental opening when user was dragging
      return;
    }
    if (e && e.currentTarget instanceof HTMLElement) {
      openerRef.current = e.currentTarget;
    }
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    if (openerRef.current) {
      openerRef.current.focus();
    }
  };

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  // Touch swipe handling in lightbox
  const touchStartXRef = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartXRef.current;
    if (Math.abs(diff) > 45) {
      if (diff < 0) nextImage();
      else prevImage();
    }
  };

  return (
    <section id="gallery" className="relative py-16 sm:py-24 border-t border-theme-border/40 overflow-hidden font-sans">
      <BotanicalBranch position="top-right" opacity={0.25} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="text-left max-w-2xl">
            <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-theme-accent font-medium mb-2 block">
              GALLERY & INTERIORS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-theme-text-primary font-normal leading-tight mb-2">
              A Glimpse Inside Villa Aurelia
            </h2>
            <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed font-sans">
              Authentic photographs of the private residence, common hall, AC bedrooms, kitchen, and attached restrooms.
            </p>
          </div>

          {/* View Mode Toggle: Grid vs Filmstrip */}
          <div className="flex items-center gap-1 p-1 bg-theme-surface border border-theme-border self-start md:self-end">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              aria-label="Switch to Editorial Grid view"
              className={`p-1.5 text-xs flex items-center gap-1.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-theme-surface-raised text-theme-accent font-medium shadow-sm'
                  : 'text-theme-text-secondary hover:text-theme-text-primary'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('strip')}
              aria-label="Switch to Panoramic Filmstrip view"
              className={`p-1.5 text-xs flex items-center gap-1.5 transition-colors ${
                viewMode === 'strip'
                  ? 'bg-theme-surface-raised text-theme-accent font-medium shadow-sm'
                  : 'text-theme-text-secondary hover:text-theme-text-primary'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Filmstrip</span>
            </button>
          </div>
        </div>

        {/* Live Region for Screen Readers */}
        <div aria-live="polite" className="sr-only">
          Showing {activeFilter} photos, {filteredPhotos.length} items visible.
        </div>

        {/* Category Filter Buttons */}
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

        {/* View Mode 1: Panoramic Draggable Filmstrip */}
        {viewMode === 'strip' && (
          <div className="relative mb-6">
            <div
              ref={stripRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              tabIndex={0}
              aria-label="Draggable photo filmstrip, use left and right arrow keys to scroll"
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') scrollStrip('right');
                if (e.key === 'ArrowLeft') scrollStrip('left');
              }}
              className="flex gap-4 overflow-x-auto pb-4 cursor-grab active:cursor-grabbing select-none no-scrollbar scroll-smooth snap-x snap-mandatory focus:outline-none focus:ring-1 focus:ring-theme-accent"
            >
              {filteredPhotos.map((photo: ManifestPhoto, index: number) => (
                <div
                  key={photo.id}
                  onClick={(e) => openLightbox(index, e)}
                  data-cursor="view"
                  className="snap-start shrink-0 w-[300px] sm:w-[380px] aspect-[4/3] bg-theme-surface border border-theme-border relative overflow-hidden group shadow-sm"
                >
                  <picture>
                    <source type="image/webp" srcSet={photo.srcSet} sizes="380px" />
                    <img
                      src={photo.srcJpg}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                      width={photo.width}
                      height={photo.height}
                    />
                  </picture>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-between">
                    <span className="self-end p-1.5 bg-theme-surface text-theme-accent">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#D0AE78] block">
                        {photo.category}
                      </span>
                      <h4 className="font-serif text-sm text-[#F1E5D2]">{photo.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Strip Scroll Controls */}
            <div className="flex items-center justify-end gap-2 mt-3">
              <button
                type="button"
                onClick={() => scrollStrip('left')}
                aria-label="Scroll filmstrip left"
                className="p-2 bg-theme-surface border border-theme-border text-theme-text-primary hover:border-theme-accent transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollStrip('right')}
                aria-label="Scroll filmstrip right"
                className="p-2 bg-theme-surface border border-theme-border text-theme-text-primary hover:border-theme-accent transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* View Mode 2: Editorial Asymmetric Grid */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {filteredPhotos.map((photo: ManifestPhoto, index: number) => {
              const isFeature = index === 0;
              return (
                <div
                  key={photo.id}
                  onClick={(e) => openLightbox(index, e)}
                  data-cursor="view"
                  className={`group relative cursor-pointer overflow-hidden border border-theme-border bg-theme-surface shadow-sm ${
                    isFeature ? 'sm:col-span-2 aspect-[16/10] sm:aspect-[16/9]' : 'aspect-[4/3]'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={`View photo: ${photo.title} in lightbox`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(index, e);
                    }
                  }}
                >
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={photo.srcSet}
                      sizes={isFeature ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                    />
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
                    <span className="self-end p-2 bg-theme-surface text-theme-accent shadow-sm">
                      <ZoomIn className="w-4 h-4" />
                    </span>
                    <div>
                      <span className="text-[10px] uppercase font-sans tracking-widest text-[#D0AE78] block">
                        {photo.category}
                      </span>
                      <h4 className="font-serif text-sm sm:text-base text-[#F1E5D2] font-medium">
                        {photo.title}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal (Solid Opaque Background, Focus Trapped, Touch-Swipable) */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${filteredPhotos[lightboxIndex].title}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 transition-opacity duration-200"
          onClick={closeLightbox}
        >
          {/* Lightbox Controls */}
          <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
            <span className="text-xs text-white/70 font-sans tracking-widest">
              {lightboxIndex + 1} / {filteredPhotos.length}
            </span>
            <button
              type="button"
              onClick={closeLightbox}
              className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close photo viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors z-50"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center Image Container */}
          <div
            className="relative max-w-5xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <picture key={filteredPhotos[lightboxIndex].id}>
              <source type="image/webp" srcSet={filteredPhotos[lightboxIndex].srcSet} sizes="90vw" />
              <img
                src={filteredPhotos[lightboxIndex].srcJpg}
                alt={filteredPhotos[lightboxIndex].alt}
                className="max-h-[75vh] max-w-[90vw] object-contain shadow-2xl border border-white/10"
                width={filteredPhotos[lightboxIndex].width}
                height={filteredPhotos[lightboxIndex].height}
              />
            </picture>

            <div className="mt-3 text-center px-4 max-w-xl">
              <h3 className="font-serif text-lg text-white font-medium">
                {filteredPhotos[lightboxIndex].title}
              </h3>
              <p className="text-xs text-white/70 font-sans mt-1">
                {filteredPhotos[lightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
