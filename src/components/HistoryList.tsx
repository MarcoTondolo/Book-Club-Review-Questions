import React, { useState } from 'react';
import { History, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import { QuestionItem, TranslationDictionary } from '../types';

interface HistoryListProps {
  drawnQuestions: QuestionItem[];
  currentId: string | null;
  language: string;
  t: TranslationDictionary;
  onSelectQuestion: (question: QuestionItem) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({
  drawnQuestions,
  currentId,
  language,
  t,
  onSelectQuestion,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (drawnQuestions.length === 0) {
    return null;
  }

  // Reverse so the newest drawn questions appear at the top
  const reversedList = [...drawnQuestions].reverse();

  return (
    <div
      id="history-list-section"
      className="mx-auto w-full max-w-3xl rounded-2xl sm:rounded-3xl border border-[#E5E0D8] bg-white p-4 shadow-[0_4px_20px_rgba(74,68,63,0.04)]"
    >
      <button
        type="button"
        id="toggle-history-accordion"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <History className="h-4 w-4 text-[#9A8F81]" />
          <span className="text-sm font-bold text-[#2D2A26]">
            {t.historyTitle}
          </span>
          <span className="rounded-full bg-[#8A9A5B]/15 px-2.5 py-0.5 text-xs font-semibold text-[#4E5C2D]">
            {drawnQuestions.length}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-[#9A8F81]">
          <span>{isExpanded ? 'Riduci' : 'Mostra tutte'}</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="mt-3 divide-y divide-[#E5E0D8]/60 border-t border-[#E5E0D8] pt-2">
          <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
            {reversedList.map((q, index) => {
              const originalIndex = drawnQuestions.length - index;
              const isCurrent = q.id === currentId;
              const text = q.text[language] || q.text['en'];

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => onSelectQuestion(q)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl p-2.5 text-left text-xs transition-colors ${
                    isCurrent
                      ? 'bg-[#F3F0EB] text-[#2D2A26] font-medium'
                      : 'hover:bg-[#FAF7F2] text-[#4A443F]'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#E5E0D8] font-mono text-[10px] font-bold text-[#4A443F]">
                      {originalIndex}
                    </span>
                    <span className="font-serif line-clamp-1">{text}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 text-[#9A8F81]">
                    <span className="font-mono text-[10px]">
                      [{q.row},{q.col}]
                    </span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
