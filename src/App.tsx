/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useQuestionExtractor } from './hooks/useQuestionExtractor';
import { Header } from './components/Header';
import { QuestionCard } from './components/QuestionCard';
import { Controls } from './components/Controls';
import { BoardGrid } from './components/BoardGrid';
import { HistoryList } from './components/HistoryList';
import { AboutModal } from './components/AboutModal';

export default function App() {
  const {
    language,
    setLanguage,
    supportedLanguages,
    soundEnabled,
    setSoundEnabled,
    allQuestions,
    drawnQuestions,
    drawnIds,
    currentQuestion,
    isRolling,
    rollingDice,
    isFinished,
    viewMode,
    setViewMode,
    totalCount,
    drawnCount,
    remainingCount,
    progressPercentage,
    drawNextQuestion,
    selectQuestion,
    resetSession,
    goToPrevious,
    goToNext,
    t,
  } = useQuestionExtractor();

  // Determine if previous/next in history is possible
  const currentHistoryIndex = currentQuestion
    ? drawnIds.indexOf(currentQuestion.id)
    : -1;
  const canGoPrevious = currentHistoryIndex > 0;
  const canGoNext =
    currentHistoryIndex >= 0 && currentHistoryIndex < drawnIds.length - 1;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#4A443F]">
      {/* Header bar */}
      <Header
        t={t}
        language={language}
        languages={supportedLanguages}
        onSelectLanguage={setLanguage}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8">
        <div className="mx-auto max-w-5xl space-y-6">
          {/* Controls Bar: Primary Draw Button & Progress */}
          <Controls
            t={t}
            isRolling={isRolling}
            isFinished={isFinished}
            drawnCount={drawnCount}
            totalCount={totalCount}
            remainingCount={remainingCount}
            progressPercentage={progressPercentage}
            viewMode={viewMode}
            onToggleViewMode={() =>
              setViewMode(viewMode === 'card' ? 'grid' : 'card')
            }
            onDraw={drawNextQuestion}
            onReset={resetSession}
          />

          {/* Active View: Card vs Board Grid */}
          {viewMode === 'card' ? (
            <div className="space-y-6">
              {/* Main Drawn Question Card */}
              <QuestionCard
                question={currentQuestion}
                language={language}
                t={t}
                isRolling={isRolling}
                rollingDice={rollingDice}
                drawnCount={drawnCount}
                totalCount={totalCount}
                isFinished={isFinished}
                canGoPrevious={canGoPrevious}
                canGoNext={canGoNext}
                onGoPrevious={goToPrevious}
                onGoNext={goToNext}
                onDraw={drawNextQuestion}
                onReset={resetSession}
              />

              {/* History list accordion */}
              <HistoryList
                drawnQuestions={drawnQuestions}
                currentId={currentQuestion?.id || null}
                language={language}
                t={t}
                onSelectQuestion={selectQuestion}
              />
            </div>
          ) : (
            <div className="space-y-6">
              {/* Selected Question preview snippet if any */}
              {currentQuestion && (
                <div className="mx-auto max-w-5xl">
                  <QuestionCard
                    question={currentQuestion}
                    language={language}
                    t={t}
                    isRolling={isRolling}
                    rollingDice={rollingDice}
                    drawnCount={drawnCount}
                    totalCount={totalCount}
                    isFinished={isFinished}
                    canGoPrevious={canGoPrevious}
                    canGoNext={canGoNext}
                    onGoPrevious={goToPrevious}
                    onGoNext={goToNext}
                    onDraw={drawNextQuestion}
                    onReset={resetSession}
                  />
                </div>
              )}

              {/* Full 6x6 Board Grid replicating the photo */}
              <BoardGrid
                questions={allQuestions}
                drawnIds={drawnIds}
                currentId={currentQuestion?.id || null}
                language={language}
                t={t}
                onSelectQuestion={selectQuestion}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E0D8] bg-[#FAF7F2] py-6 text-center text-xs text-[#9A8F81]">
        <p className="font-serif">
          Book Club Dice Game &bull; 36 Domande &bull; Estrazione casuale senza ripetizioni
        </p>
      </footer>
    </div>
  );
}
