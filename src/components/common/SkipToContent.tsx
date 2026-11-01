import React from 'react';

export const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-theme-surface focus:text-theme-text-primary focus:border focus:border-theme-accent focus:shadow-md font-sans text-xs tracking-wider uppercase"
    >
      Skip to main content
    </a>
  );
};
