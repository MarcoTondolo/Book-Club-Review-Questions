import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Copy,
  Check,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Dices,
} from 'lucide-react';
import { QuestionItem, TranslationDictionary } from '../types';
import { DiceVisualizer } from './DiceVisualizer';

interface QuestionCardProps {
  question: QuestionItem | null;
  language: string;
  t: TranslationDictionary;
  isRolling: boolean;
  rollingDice: { row: number; col: number };
  drawnCount: number;
  totalCount: number;
  isFinished: boolean;
  canGoPrevious: boolean;
  canGoNext: boolean;
  onGoPrevious: () => void;
  onGoNext: () => void;
  onDraw: () => void;
  onReset: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  language,
  t,
  isRolling,
  rollingDice,
  drawnCount,
  totalCount,
  isFinished,
  canGoPrevious,
  canGoNext,
  onGoPrevious,
  onGoNext,
  onDraw,
  onReset,
}) => {
  const [copied, setCopied] = useState(false);

  // Active question text in current language with English fallback
  const questionText = question
    ? question.text[language] || question.text['en'] || ''
    : '';

  // English original subtitle if viewing in another language (very helpful for book club references!)
  const originalEnglishText =
    question && language !== 'en' ? question.text['en'] : null;

  const handleCopy = () => {
    if (!questionText) return;
    navigator.clipboard.writeText(questionText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const categoryName = question
    ? t.categoryLabels[question.category] || question.category
    : '';

  // Category badge color
  const getCategoryColor = (cat?: string) => {
    switch (cat) {
      case 'characters':
        return 'bg-[#F3F0EB] text-[#4A443F] border-[#E5E0D8]';
      case 'plot':
        return 'bg-[#8A9A5B]/15 text-[#4E5C2D] border-[#8A9A5B]/30';
      case 'emotions':
        return 'bg-[#D97757]/15 text-[#A84728] border-[#D97757]/30';
      case 'author':
        return 'bg-[#F3F0EB] text-[#4A443F] border-[#E5E0D8]';
      case 'themes':
        return 'bg-[#8A9A5B]/15 text-[#4E5C2D] border-[#8A9A5B]/30';
      case 'reflection':
      default:
        return 'bg-[#F3F0EB] text-[#4A443F] border-[#E5E0D8]';
    }
  };

  const progressPercent = totalCount > 0 ? (drawnCount / totalCount) * 100 : 0;

  return (
    <div
      id="main-question-card-container"
      className="relative mx-auto w-full max-w-3xl"
    >
      <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-[#E5E0D8] bg-white p-6 sm:p-10 shadow-[0_20px_50px_rgba(74,68,63,0.08)] transition-all">
        {/* Top subtle progress bar accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FAF7F2]">
          <div
            className="h-full bg-[#8A9A5B] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Top bar: Question number & Category & Copy */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E0D8] pb-4 pt-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E0D8] bg-[#F3F0EB] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#4A443F]">
              <Sparkles className="h-3.5 w-3.5 text-[#8A9A5B]" />
              {question
                ? `${t.questionNumber} ${drawnCount}/${totalCount}`
                : `${t.appTitle} ${t.appSubtitle}`}
            </span>

            {question && (
              <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${getCategoryColor(
                  question.category
                )}`}
              >
                {categoryName}
              </span>
            )}
          </div>

          {/* Quick history jump arrows & Copy action */}
          <div className="flex items-center gap-1.5">
            {drawnCount > 1 && (
              <>
                <button
                  type="button"
                  id="prev-question-button"
                  onClick={onGoPrevious}
                  disabled={!canGoPrevious || isRolling}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E0D8] bg-white text-[#9A8F81] hover:text-[#4A443F] hover:bg-[#F3F0EB] disabled:opacity-40 disabled:pointer-events-none transition-all"
                  title={t.previousQuestion}
                  aria-label={t.previousQuestion}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  id="next-question-button"
                  onClick={onGoNext}
                  disabled={!canGoNext || isRolling}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E0D8] bg-white text-[#9A8F81] hover:text-[#4A443F] hover:bg-[#F3F0EB] disabled:opacity-40 disabled:pointer-events-none transition-all"
                  title={t.nextQuestion}
                  aria-label={t.nextQuestion}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {question && (
              <button
                type="button"
                id="copy-question-button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#E5E0D8] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#4A443F] hover:bg-[#F3F0EB] active:scale-95 transition-all"
                title={t.copyQuestion}
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#8A9A5B]" />
                    <span className="text-[#8A9A5B] font-bold">{t.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5 text-[#9A8F81]" />
                    <span>{t.copyQuestion}</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Dice Visualizer Area */}
        <div className="my-6 flex items-center justify-center gap-6 sm:gap-10">
          <DiceVisualizer
            value={isRolling ? rollingDice.row : question?.row || 1}
            label={t.rowDie}
            isRolling={isRolling}
            size="md"
          />
          <div className="flex flex-col items-center justify-center text-[#9A8F81]">
            <span className="text-sm font-bold uppercase tracking-widest text-[#9A8F81]">
              +
            </span>
          </div>
          <DiceVisualizer
            value={isRolling ? rollingDice.col : question?.col || 1}
            label={t.colDie}
            isRolling={isRolling}
            size="md"
          />
        </div>

        {/* Content Box */}
        <div className="min-h-[140px] flex items-center justify-center py-2 px-2 text-center">
          <AnimatePresence mode="wait">
            {isRolling ? (
              <motion.div
                key="rolling"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center gap-3 py-4"
              >
                <Dices className="h-8 w-8 text-[#8A9A5B] animate-spin" />
                <p className="font-playfair text-lg font-medium text-[#4A443F] italic">
                  {t.drawing}
                </p>
              </motion.div>
            ) : isFinished && !question ? (
              <motion.div
                key="all-drawn"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-4 text-center"
              >
                <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#2D2A26]">
                  {t.allDrawnTitle}
                </h3>
                <p className="mt-2 text-[#9A8F81] max-w-md mx-auto">
                  {t.allDrawnDesc}
                </p>
                <button
                  type="button"
                  id="reshuffle-completed-button"
                  onClick={onReset}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#8A9A5B] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#78884E] active:scale-95 transition-all"
                >
                  {t.reshuffle}
                </button>
              </motion.div>
            ) : question ? (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full space-y-3"
              >
                <blockquote
                  id="active-question-text"
                  className="font-playfair text-xl sm:text-2xl lg:text-3xl font-bold leading-snug text-[#2D2A26] tracking-tight"
                >
                  "{questionText}"
                </blockquote>

                {originalEnglishText && (
                  <p className="text-xs sm:text-sm font-serif italic text-[#9A8F81]">
                    Original: "{originalEnglishText}"
                  </p>
                )}

                <div className="pt-2 text-xs font-mono font-medium text-[#9A8F81]">
                  Grid Coordinate: [{t.rowDie}: {question.row} | {t.colDie}:{' '}
                  {question.col}]
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-6 text-center"
              >
                <p className="font-playfair text-xl sm:text-2xl text-[#4A443F] italic">
                  {t.historyEmpty}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-[#9A8F81]">
                  36 domande disponibili &bull; Nessuna ripetizione garantita
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
