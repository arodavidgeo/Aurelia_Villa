import React from 'react';
import { ArrowLeft, Home } from 'lucide-react';
import { Logo } from '../common/Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import { BotanicalBranch } from '../common/BotanicalBranch';

export const NotFoundPage: React.FC<{ onReturnHome: () => void }> = ({ onReturnHome }) => {
  return (
    <div className="min-h-screen bg-theme-bg text-theme-text-primary flex flex-col justify-between relative overflow-hidden font-sans">
      <BotanicalBranch position="top-right" opacity={0.3} />
      <BotanicalBranch position="bottom-left" opacity={0.3} />

      {/* Header */}
      <header className="py-6 px-4 sm:px-8 border-b border-theme-border/50 flex items-center justify-between relative z-10">
        <Logo />
        <ThemeToggle />
      </header>

      {/* Main 404 Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-16 relative z-10 max-w-xl mx-auto">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-theme-accent mb-2">
          ERROR 404
        </span>

        <h1 className="font-serif text-5xl sm:text-6xl text-theme-text-primary mb-4">
          A Peaceful Dead End
        </h1>

        <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed mb-8">
          The villa page or pathway you are seeking does not exist or may have been repositioned. Allow us to guide you back to our serene grounds.
        </p>

        <button
          type="button"
          onClick={onReturnHome}
          className="inline-flex items-center gap-2.5 px-6 py-3 bg-theme-accent hover:bg-theme-accent-strong text-theme-bg dark:text-theme-surface-deep text-xs font-medium tracking-widest uppercase transition-colors shadow-sm"
        >
          <Home className="w-4 h-4" />
          <span>Return to Villa Aurelia</span>
          <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
        </button>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center text-xs text-theme-text-secondary border-t border-theme-border/40 relative z-10">
        © {new Date().getFullYear()} Villa Aurelia. All rights reserved.
      </footer>
    </div>
  );
};

