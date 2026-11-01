import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Espresso Mode'}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Espresso Mode'}
      className={`inline-flex items-center gap-2 px-2.5 py-1.5 border border-theme-border/60 hover:border-theme-accent text-theme-text-secondary hover:text-theme-accent transition-all duration-200 text-xs tracking-wider uppercase font-sans ${className}`}
    >
      {isDark ? (
        <Sun className="w-3.5 h-3.5 text-theme-accent transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-3.5 h-3.5 text-theme-accent transition-transform hover:-rotate-12" />
      )}
      {showLabel && (
        <span className="text-[11px] font-medium tracking-wider">
          {isDark ? 'Light' : 'Espresso'}
        </span>
      )}
    </button>
  );
};

