import React from 'react';
import { Check, Eye } from 'lucide-react';
import { QuestionItem, TranslationDictionary } from '../types';
import { DiceVisualizer } from './DiceVisualizer';

interface BoardGridProps {
  questions: QuestionItem[];
  drawnIds: string[];
  currentId: string | null;
  language: string;
  t: TranslationDictionary;
  onSelectQuestion: (question: QuestionItem) => void;
}

export const BoardGrid: React.FC<BoardGridProps> = ({
  questions,
  drawnIds,
  currentId,
  language,
  t,
  onSelectQuestion,
}) => {
  const drawnSet = new Set(drawnIds);

  // Group questions into 6 rows of 6 columns
  const gridRows = [1, 2, 3, 4, 5, 6].map((rowNum) => {
    return [1, 2, 3, 4, 5, 6].map((colNum) => {
      return questions.find((q) => q.row === rowNum && q.col === colNum)!;
    });
  });

  return (
    <div
      id="board-grid-section"
      className="mx-auto w-full max-w-5xl rounded-[32px] sm:rounded-[40px] border border-[#E5E0D8] bg-white p-6 sm:p-8 shadow-[0_20px_50px_rgba(74,68,63,0.08)]"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#E5E0D8] pb-4 mb-4">
        <div>
          <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#2D2A26]">
            {t.boardView}
          </h2>
          <p className="text-xs sm:text-sm text-[#9A8F81]">
            {t.clickToInspect} &bull; 6x6 Matrix (36 {t.questionNumber.toLowerCase()}s)
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border-2 border-[#8A9A5B] bg-[#8A9A5B]/20" />
            <span className="text-[#4A443F] font-medium">{t.activeQuestion}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-[#E5E0D8] bg-[#F3F0EB]" />
            <span className="text-[#9A8F81] font-medium">{t.alreadyDrawn}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm border border-[#E5E0D8] bg-white" />
            <span className="text-[#4A443F] font-medium">{t.notDrawnYet}</span>
          </div>
        </div>
      </div>

      {/* Grid Table */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[720px]">
          {/* Top header row with column dice 1..6 */}
          <div className="grid grid-cols-[64px_repeat(6,1fr)] gap-2 mb-2 items-center text-center">
            <div className="flex items-center justify-center font-bold text-[#9A8F81] text-xs uppercase tracking-wider">
              Riga \ Col
            </div>
            {[1, 2, 3, 4, 5, 6].map((colVal) => (
              <div
                key={`col-dice-${colVal}`}
                className="flex flex-col items-center justify-center p-1"
              >
                <DiceVisualizer value={colVal} size="sm" />
              </div>
            ))}
          </div>

          {/* Rows 1..6 */}
          {gridRows.map((rowQuestions, rowIdx) => {
            const rowVal = rowIdx + 1;
            return (
              <div
                key={`row-${rowVal}`}
                className="grid grid-cols-[64px_repeat(6,1fr)] gap-2 mb-2 items-stretch"
              >
                {/* Row Header Die */}
                <div className="flex items-center justify-center p-1 bg-[#FAF7F2] rounded-xl border border-[#E5E0D8]">
                  <DiceVisualizer value={rowVal} size="sm" />
                </div>

                {/* 6 Cells */}
                {rowQuestions.map((q) => {
                  if (!q) return null;
                  const isDrawn = drawnSet.has(q.id);
                  const isCurrent = currentId === q.id;
                  const text = q.text[language] || q.text['en'];

                  return (
                    <button
                      key={q.id}
                      type="button"
                      id={`cell-${q.row}-${q.col}`}
                      onClick={() => onSelectQuestion(q)}
                      className={`group relative flex flex-col justify-between rounded-xl border p-2.5 text-left transition-all ${
                        isCurrent
                          ? 'border-2 border-[#8A9A5B] bg-[#8A9A5B]/10 shadow-xs ring-2 ring-[#8A9A5B]/30 z-10 text-[#2D2A26]'
                          : isDrawn
                          ? 'border-[#E5E0D8] bg-[#F3F0EB]/60 text-[#9A8F81] hover:bg-[#F3F0EB]'
                          : 'border-[#E5E0D8] bg-white text-[#4A443F] hover:border-[#8A9A5B]/50 hover:shadow-xs'
                      }`}
                    >
                      {/* Cell badges */}
                      <div className="flex items-center justify-between gap-1 mb-1 text-[10px] font-mono">
                        <span
                          className={`font-semibold ${
                            isCurrent
                              ? 'text-[#8A9A5B]'
                              : isDrawn
                              ? 'text-[#9A8F81]'
                              : 'text-[#9A8F81]'
                          }`}
                        >
                          [{q.row},{q.col}]
                        </span>
                        {isDrawn && (
                          <span
                            className="inline-flex items-center gap-0.5 text-[#8A9A5B] font-bold"
                            title={t.alreadyDrawn}
                          >
                            <Check className="h-3 w-3" />
                          </span>
                        )}
                        {isCurrent && (
                          <span className="inline-flex items-center gap-0.5 text-[#8A9A5B] font-bold">
                            <Eye className="h-3 w-3" />
                          </span>
                        )}
                      </div>

                      {/* Question Text */}
                      <p
                        className={`font-serif text-xs line-clamp-3 leading-snug ${
                          isCurrent
                            ? 'font-semibold text-[#2D2A26]'
                            : isDrawn
                            ? 'text-[#9A8F81] line-through/50'
                            : 'text-[#4A443F]'
                        }`}
                      >
                        {text}
                      </p>

                      {/* Subtle hover prompt */}
                      <div className="mt-1 flex items-center justify-end text-[9px] text-[#9A8F81] opacity-0 group-hover:opacity-100 transition-opacity">
                        Visualizza &rarr;
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
