import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { LanguageOption } from '../types';

interface LanguageSelectorProps {
  currentLanguage: string;
  languages: LanguageOption[];
  onSelectLanguage: (code: string) => void;
  label?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  languages,
  onSelectLanguage,
  label,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeLang =
    languages.find((l) => l.code === currentLanguage) || languages[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        id="language-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-full border border-[#E5E0D8] bg-white px-3.5 py-1.5 text-sm font-medium text-[#4A443F] shadow-xs hover:border-[#D1C9BE] hover:bg-[#F3F0EB] focus:outline-none focus:ring-2 focus:ring-[#8A9A5B]/30 active:scale-98 transition-all"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="h-4 w-4 text-[#9A8F81]" />
        <span className="text-base leading-none">{activeLang.flag}</span>
        <span className="font-semibold text-[#2D2A26]">{activeLang.name}</span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-[#9A8F81] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          id="language-dropdown-menu"
          className="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-2xl border border-[#E5E0D8] bg-white p-1.5 shadow-lg shadow-[#4A443F]/5 ring-1 ring-black/5 focus:outline-none animate-in fade-in zoom-in-95 duration-100"
        >
          {label && (
            <div className="px-2.5 py-1.5 text-[11px] font-semibold text-[#9A8F81] uppercase tracking-wider">
              {label}
            </div>
          )}
          {languages.map((lang) => {
            const isSelected = lang.code === currentLanguage;
            return (
              <button
                key={lang.code}
                id={`lang-option-${lang.code}`}
                onClick={() => {
                  onSelectLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-2.5 py-2 text-sm font-medium transition-colors ${
                  isSelected
                    ? 'bg-[#F3F0EB] text-[#2D2A26] font-semibold'
                    : 'text-[#4A443F] hover:bg-[#F3F0EB]/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg leading-none">{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                </div>
                {isSelected && <Check className="h-4 w-4 text-[#8A9A5B]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
