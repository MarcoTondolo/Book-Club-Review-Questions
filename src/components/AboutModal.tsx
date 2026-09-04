import React from 'react';
import { X, BookOpen, Dices, ShieldCheck, Languages } from 'lucide-react';
import { TranslationDictionary } from '../types';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationDictionary;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null;

  return (
    <div
      id="about-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#4A443F]/40 p-4 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        id="about-modal-content"
        className="relative w-full max-w-lg rounded-[32px] border border-[#E5E0D8] bg-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(74,68,63,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          id="close-about-modal"
          onClick={onClose}
          className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E0D8] bg-white text-[#9A8F81] hover:text-[#4A443F] hover:bg-[#F3F0EB] transition-colors"
          aria-label="Chiudi"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8A9A5B] text-white shadow-xs">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-playfair text-xl font-bold text-[#2D2A26]">
              {t.appTitle} - {t.appSubtitle}
            </h3>
            <p className="text-xs text-[#9A8F81] font-serif">Regole del gioco & Architettura</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-[#4A443F] leading-relaxed font-serif">
          <div className="rounded-2xl border border-[#E5E0D8] bg-[#FAF7F2] p-4 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#2D2A26]">
              <Dices className="h-4 w-4 text-[#8A9A5B]" />
              <span>{t.rulesTitle}</span>
            </div>
            <p className="text-[#4A443F] text-xs sm:text-sm">{t.rulesDesc}</p>
          </div>

          <div className="space-y-2.5 text-xs text-[#4A443F]">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 text-[#8A9A5B] shrink-0 mt-0.5" />
              <p>
                <strong>Nessuna ripetizione:</strong> Ogni domanda viene estratta esattamente 1 volta. Una volta completate le 36 caselle, la sessione può essere rimescolata.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <Languages className="h-4 w-4 text-[#D97757] shrink-0 mt-0.5" />
              <p>
                <strong>Multilingua modulare:</strong> Attualmente disponibile in <em>Italiano</em> e <em>Inglese</em>, con struttura dati pronta all'aggiunta istantanea di altre lingue.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[#8A9A5B] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#78884E] shadow-sm active:scale-95 transition-all"
          >
            Ho capito
          </button>
        </div>
      </div>
    </div>
  );
};
