import React from 'react';

interface BotanicalBranchProps {
  className?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  opacity?: number;
}

export const BotanicalBranch: React.FC<BotanicalBranchProps> = ({
  className = '',
  position = 'top-right',
  opacity = 0.35,
}) => {
  const positionClasses = {
    'top-right': 'top-0 right-0',
    'top-left': 'top-0 left-0 -scale-x-100',
    'bottom-right': 'bottom-0 right-0 -scale-y-100',
    'bottom-left': 'bottom-0 left-0 -scale-x-100 -scale-y-100',
  }[position];

  return (
    <div
      className={`absolute pointer-events-none select-none z-0 overflow-hidden ${positionClasses} ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <svg
        width="220"
        height="180"
        viewBox="0 0 220 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-36 h-28 sm:w-52 sm:h-44 text-theme-accent transition-colors duration-300"
      >
        {/* Main stem curve */}
        <path
          d="M210 10 C 170 20, 110 50, 40 130"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Branch 1 */}
        <path
          d="M170 24 C 150 15, 130 18, 120 28 C 135 38, 155 35, 170 24 Z"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        {/* Branch 2 */}
        <path
          d="M145 36 C 130 50, 135 70, 150 78 C 160 62, 155 45, 145 36 Z"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        {/* Branch 3 */}
        <path
          d="M115 55 C 95 48, 80 58, 75 70 C 90 78, 108 70, 115 55 Z"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        {/* Branch 4 */}
        <path
          d="M92 78 C 82 98, 92 115, 108 120 C 114 102, 104 86, 92 78 Z"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        {/* Branch 5 */}
        <path
          d="M68 98 C 48 95, 38 108, 35 122 C 50 128, 65 118, 68 98 Z"
          fill="currentColor"
          fillOpacity="0.25"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        {/* Small leaf bud */}
        <path
          d="M45 125 C 32 140, 40 152, 50 155 C 55 142, 50 132, 45 125 Z"
          fill="currentColor"
          fillOpacity="0.3"
          stroke="currentColor"
          strokeWidth="0.8"
        />
      </svg>
    </div>
  );
};

