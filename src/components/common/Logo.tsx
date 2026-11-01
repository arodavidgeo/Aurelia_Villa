import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'header' | 'footer';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'header' }) => {
  const isFooter = variant === 'footer';

  return (
    <a
      href="#"
      className={`inline-flex items-center gap-3.5 group select-none ${className}`}
      aria-label="Villa Aurelia — Return to top"
    >
      {/* SVG Monogram Seal */}
      <svg
        viewBox="0 0 48 48"
        className={isFooter ? 'w-11 h-11' : 'w-9 h-9'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer and Inner Circle */}
        <circle
          cx="24"
          cy="24"
          r="22"
          className="stroke-theme-accent transition-colors duration-200"
          strokeWidth="1.2"
        />
        <circle
          cx="24"
          cy="24"
          r="19"
          className="stroke-theme-accent/60 transition-colors duration-200"
          strokeWidth="0.75"
          strokeDasharray="2 2"
        />
        {/* Monogram letters V and A */}
        <text
          x="24"
          y="29"
          textAnchor="middle"
          className="font-serif text-[18px] font-medium fill-current transition-colors duration-200"
          style={{ letterSpacing: '-0.03em' }}
        >
          VA
        </text>
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col text-left leading-none">
        <span
          className={`font-serif italic text-theme-accent text-[12px] tracking-wide mb-0.5 ${
            isFooter ? 'text-center' : ''
          }`}
        >
          villa
        </span>
        <span
          className={`font-serif tracking-[0.22em] font-medium ${
            isFooter ? 'text-2xl tracking-[0.25em]' : 'text-lg'
          } uppercase text-current`}
        >
          AURELIA
        </span>
        <span
          className={`text-[8px] tracking-[0.28em] uppercase text-theme-accent/90 mt-1 font-sans ${
            isFooter ? 'text-center text-[9px]' : ''
          }`}
        >
          SERENITY • COMFORT • MEMORIES
        </span>
      </div>
    </a>
  );
};
