import React from 'react';
import { Dices, RotateCcw, LayoutGrid, CreditCard, Sparkles } from 'lucide-react';
import { TranslationDictionary } from '../types';

interface ControlsProps {
  t: TranslationDictionary;
  isRolling: boolean;
  isFinished: boolean;
  drawnCount: number;
  totalCount: number;
  remainingCount: number;
  progressPercentage: number;
  viewMode: 'card' | 'grid';
  onToggleViewMode: () => void;
  onDraw: () => void;
  onReset: () => void;
}

export const Controls: React.FC<ControlsProps> = ({
  t,
  isRolling,
  isFinished,
  drawnCount,
  totalCount,
  remainingCount,
  progressPercentage,
  viewMode,
  onToggleViewMode,
  onDraw,
  onReset,
}) => {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-4 pt-4">
      {/* Primary Action Row */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        {/* Main Draw Button */}
        <button
          type="button"
          id="main-draw-button"
          onClick={onDraw}
          disabled={isRolling || isFinished}
          className="group relative flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[#8A9A5B] hover:bg-[#78884E] px-8 py-3.5 text-base sm:text-lg font-semibold text-white shadow-[0_4px_16px_rgba(138,154,91,0.3)] active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all"
        >
          <Dices
            className={`h-6 w-6 text-white transition-transform duration-300 ${
              isRolling ? 'animate-spin' : 'group-hover:rotate-12'
            }`}
          />
          <span>{isRolling ? t.drawing : isFinished ? t.allDrawnTitle : t.drawButton}</span>
          {!isRolling && !isFinished && (
            <span className="hidden sm:inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white">
              {remainingCount} restanti
            </span>
          )}
        </button>

        {/* View Switcher Toggle */}
        <button
          type="button"
          id="toggle-view-mode-button"
          onClick={onToggleViewMode}
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#E5E0D8] bg-white px-5 py-3.5 text-sm font-semibold text-[#4A443F] shadow-xs hover:bg-[#F3F0EB] active:scale-98 transition-all"
        >
          {viewMode === 'card' ? (
            <>
              <LayoutGrid className="h-4 w-4 text-[#9A8F81]" />
              <span>{t.boardView}</span>
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 text-[#9A8F81]" />
              <span>{t.cardView}</span>
            </>
          )}
        </button>

        {/* Reset Session Button */}
        {drawnCount > 0 && (
          <button
            type="button"
            id="reset-session-button"
            onClick={onReset}
            disabled={isRolling}
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-[#E5E0D8] bg-white px-4 py-3.5 text-sm font-medium text-[#9A8F81] hover:text-[#D97757] hover:border-[#D97757]/40 hover:bg-[#D97757]/10 active:scale-98 transition-all"
            title={t.resetButton}
          >
            <RotateCcw className="h-4 w-4" />
            <span className="sm:hidden">{t.resetButton}</span>
          </button>
        )}
      </div>

      {/* Progress & Stats Bar */}
      <div
        id="session-progress-container"
        className="rounded-2xl border border-[#E5E0D8] bg-white p-4 shadow-[0_4px_20px_rgba(74,68,63,0.04)]"
      >
        <div className="flex items-center justify-between text-xs font-semibold text-[#4A443F] mb-2.5">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#8A9A5B]" />
            <span>{t.progressLabel}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>
              <strong className="text-[#2D2A26]">{drawnCount}</strong> / {totalCount}{' '}
              {t.drawnLabel}
            </span>
            <span className="text-[#E5E0D8]">|</span>
            <span className="text-[#D97757] font-medium">
              <strong>{remainingCount}</strong> {t.remainingLabel}
            </span>
          </div>
        </div>

        {/* Linear progress bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#F3F0EB]">
          <div
            className="h-full bg-[#8A9A5B] transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
