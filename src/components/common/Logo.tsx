import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'header' | 'footer' | 'large';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'header' }) => {
  const isFooter = variant === 'footer';
  const isLarge = variant === 'large';

  return (
    <a
      href="#"
      className={`inline-flex items-center gap-3.5 sm:gap-4 group select-none py-1 ${className}`}
      aria-label="Villa Aurelia — Return to top"
    >
      <div
        className={`relative overflow-hidden transition-transform duration-200 group-hover:scale-105 border border-theme-border/70 shrink-0 rounded-full shadow-sm ${
          isFooter
            ? 'w-20 h-20 sm:w-24 sm:h-24 p-2 bg-[#FFFDF8]'
            : isLarge
            ? 'w-24 h-24 sm:w-28 sm:h-28 p-2 bg-[#FFFDF8]'
            : 'w-12 h-12 sm:w-14 sm:h-14 p-1 bg-[#FFFDF8]'
        }`}
        style={{ width: isFooter ? undefined : undefined }}
      >
        <img
          src="/logo/villa-aurelia-logo.png"
          alt="Villa Aurelia — Serenity, Comfort, Memories"
          className="w-full h-full object-contain"
          width={800}
          height={800}
        />
      </div>

      <div className="flex flex-col text-left leading-none justify-center">
        <span className="font-serif italic text-theme-accent text-xs sm:text-sm tracking-wider mb-0.5">
          villa
        </span>
        <span
          className={`font-serif tracking-[0.24em] font-medium uppercase text-theme-text-primary ${
            isFooter ? 'text-2xl sm:text-3xl tracking-[0.26em]' : 'text-lg sm:text-xl'
          }`}
        >
          AURELIA
        </span>
        <span
          className={`text-[9px] sm:text-[10px] tracking-[0.28em] uppercase text-theme-accent mt-1 font-sans font-medium ${
            isFooter ? 'text-xs tracking-[0.3em]' : ''
          }`}
        >
          TIRUNELVELI
        </span>
      </div>
    </a>
  );
};
