import React from 'react';
import { Volume2, VolumeX, HelpCircle, BookOpen } from 'lucide-react';
import { LanguageOption, TranslationDictionary } from '../types';
import { LanguageSelector } from './LanguageSelector';

interface HeaderProps {
  t: TranslationDictionary;
  language: string;
  languages: LanguageOption[];
  onSelectLanguage: (code: string) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  t,
  language,
  languages,
  onSelectLanguage,
  soundEnabled,
  onToggleSound,
  onOpenRules,
}) => {
  return (
    <header className="relative border-b border-[#E5E0D8] bg-[#FAF7F2]/90 backdrop-blur-md pt-6 pb-5 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Top utility bar */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5 text-[#4A443F]">
            <div className="w-8 h-8 rounded-full bg-[#8A9A5B] flex items-center justify-center text-white shadow-xs">
              <BookOpen className="h-4 w-4 text-white" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9A8F81]">
              Literary Dice Randomizer
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              id="toggle-sound-button"
              onClick={onToggleSound}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E0D8] bg-white text-[#9A8F81] shadow-xs hover:text-[#4A443F] hover:bg-[#F3F0EB] active:scale-95 transition-all"
              title={soundEnabled ? t.soundOn : t.soundOff}
              aria-label={soundEnabled ? t.soundOn : t.soundOff}
            >
              {soundEnabled ? (
                <Volume2 className="h-4 w-4 text-[#4A443F]" />
              ) : (
                <VolumeX className="h-4 w-4 text-[#9A8F81]" />
              )}
            </button>

            <LanguageSelector
              currentLanguage={language}
              languages={languages}
              onSelectLanguage={onSelectLanguage}
              label={t.selectLanguage}
            />
          </div>
        </div>

        {/* Brand identity matching the photo */}
        <div className="text-center pt-2 pb-1">
          <h1
            className="font-script text-5xl sm:text-6xl text-[#2D2A26] tracking-wide select-none transform -rotate-1"
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            {t.appTitle}
          </h1>
          <p className="mt-1 font-playfair text-xl sm:text-2xl font-bold tracking-widest text-[#8A9A5B] uppercase">
            {t.appSubtitle}
          </p>
          <p className="mx-auto mt-2 max-w-xl text-sm sm:text-base text-[#9A8F81] leading-relaxed font-serif italic">
            "{t.tagline}"
          </p>
        </div>
      </div>
    </header>
  );
};
