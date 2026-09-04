import { useState, useEffect, useCallback, useMemo } from 'react';
import { QUESTIONS_DATA } from '../data/questions';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../data/languages';
import { QuestionItem, TranslationDictionary } from '../types';
import { soundManager } from '../utils/audio';

const STORAGE_KEY = 'bookclub_dice_session_v1';

export function useQuestionExtractor() {
  // Current active language (defaults to 'it', with 'en' available and easily extensible)
  const [language, setLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bookclub_lang');
      if (saved && UI_TRANSLATIONS[saved]) return saved;
      // Default to Italian as requested in prompt, fallback to English if browser preference
      return 'it';
    }
    return 'it';
  });

  // Sound toggle
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bookclub_sound');
      return saved !== 'false';
    }
    return true;
  });

  // List of IDs that have already been drawn in the current session
  const [drawnIds, setDrawnIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed.drawnIds)) {
            return parsed.drawnIds;
          }
        }
      } catch (e) {
        console.error('Failed to parse saved session', e);
      }
    }
    return [];
  });

  // Current active question ID
  const [currentId, setCurrentId] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.currentId) return parsed.currentId;
        }
      } catch (e) {
        console.error('Failed to parse currentId', e);
      }
    }
    return null;
  });

  // Rolling / animating state
  const [isRolling, setIsRolling] = useState(false);
  // Rolling dice preview values
  const [rollingDice, setRollingDice] = useState<{ row: number; col: number }>({
    row: 1,
    col: 1,
  });

  // Active view mode: 'card' or 'grid'
  const [viewMode, setViewMode] = useState<'card' | 'grid'>('card');

  // Sync session state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          drawnIds,
          currentId,
        })
      );
    } catch (e) {
      console.warn('localStorage error', e);
    }
  }, [drawnIds, currentId]);

  // Sync language to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('bookclub_lang', language);
    } catch (e) {
      console.warn('localStorage error', e);
    }
  }, [language]);

  // Sync sound setting
  useEffect(() => {
    try {
      localStorage.setItem('bookclub_sound', String(soundEnabled));
    } catch (e) {
      console.warn('localStorage error', e);
    }
  }, [soundEnabled]);

  // Translation bundle for UI
  const t: TranslationDictionary = useMemo(() => {
    return UI_TRANSLATIONS[language] || UI_TRANSLATIONS['it'];
  }, [language]);

  // All 36 questions
  const allQuestions = QUESTIONS_DATA;
  const totalCount = allQuestions.length;

  // Remaining questions not yet drawn
  const remainingQuestions = useMemo(() => {
    const drawnSet = new Set(drawnIds);
    return allQuestions.filter((q) => !drawnSet.has(q.id));
  }, [allQuestions, drawnIds]);

  // Current question object
  const currentQuestion = useMemo(() => {
    if (!currentId) return null;
    return allQuestions.find((q) => q.id === currentId) || null;
  }, [allQuestions, currentId]);

  // Currently drawn questions in chronological order
  const drawnQuestions = useMemo(() => {
    const map = new Map(allQuestions.map((q) => [q.id, q]));
    return drawnIds
      .map((id) => map.get(id))
      .filter((q): q is QuestionItem => !!q);
  }, [allQuestions, drawnIds]);

  const isFinished = remainingQuestions.length === 0;

  // Core drawing method ensuring NO REPETITION
  const drawNextQuestion = useCallback(() => {
    if (isRolling || isFinished) return;

    // Filter available questions (GUARANTEED NO REPETITION)
    const available = QUESTIONS_DATA.filter((q) => !drawnIds.includes(q.id));
    if (available.length === 0) return;

    // Pick random element uniformly from remaining pool
    const randomIndex = Math.floor(Math.random() * available.length);
    const chosen = available[randomIndex];

    setIsRolling(true);
    if (soundEnabled) {
      soundManager.playDiceRoll();
    }

    // Tumble dice effect for 650ms
    const interval = setInterval(() => {
      setRollingDice({
        row: Math.floor(Math.random() * 6) + 1,
        col: Math.floor(Math.random() * 6) + 1,
      });
    }, 75);

    setTimeout(() => {
      clearInterval(interval);
      setRollingDice({ row: chosen.row, col: chosen.col });
      setCurrentId(chosen.id);
      setDrawnIds((prev) => [...prev, chosen.id]);
      setIsRolling(false);
      if (soundEnabled) {
        soundManager.playChime();
      }
    }, 650);
  }, [isRolling, isFinished, drawnIds, soundEnabled]);

  // Direct select (e.g. from grid click)
  const selectQuestion = useCallback((question: QuestionItem) => {
    setCurrentId(question.id);
    setDrawnIds((prev) => {
      if (prev.includes(question.id)) return prev;
      return [...prev, question.id];
    });
    setRollingDice({ row: question.row, col: question.col });
  }, []);

  // Reset round
  const resetSession = useCallback(() => {
    if (drawnIds.length > 0) {
      if (window.confirm(t.resetConfirm)) {
        setDrawnIds([]);
        setCurrentId(null);
        if (soundEnabled) {
          soundManager.playClick();
        }
      }
    }
  }, [drawnIds.length, t.resetConfirm, soundEnabled]);

  // Navigate to previous question in history
  const goToPrevious = useCallback(() => {
    if (!currentId || drawnIds.length <= 1) return;
    const currentIndex = drawnIds.indexOf(currentId);
    if (currentIndex > 0) {
      const prevId = drawnIds[currentIndex - 1];
      const prevQ = allQuestions.find((q) => q.id === prevId);
      if (prevQ) {
        setCurrentId(prevId);
        setRollingDice({ row: prevQ.row, col: prevQ.col });
        if (soundEnabled) soundManager.playClick();
      }
    }
  }, [currentId, drawnIds, allQuestions, soundEnabled]);

  // Navigate to next question in history
  const goToNext = useCallback(() => {
    if (!currentId || drawnIds.length === 0) return;
    const currentIndex = drawnIds.indexOf(currentId);
    if (currentIndex >= 0 && currentIndex < drawnIds.length - 1) {
      const nextId = drawnIds[currentIndex + 1];
      const nextQ = allQuestions.find((q) => q.id === nextId);
      if (nextQ) {
        setCurrentId(nextId);
        setRollingDice({ row: nextQ.row, col: nextQ.col });
        if (soundEnabled) soundManager.playClick();
      }
    }
  }, [currentId, drawnIds, allQuestions, soundEnabled]);

  return {
    language,
    setLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
    soundEnabled,
    setSoundEnabled,
    allQuestions,
    remainingQuestions,
    drawnQuestions,
    drawnIds,
    currentQuestion,
    isRolling,
    rollingDice,
    isFinished,
    viewMode,
    setViewMode,
    totalCount,
    drawnCount: drawnIds.length,
    remainingCount: remainingQuestions.length,
    progressPercentage: Math.round((drawnIds.length / totalCount) * 100),
    drawNextQuestion,
    selectQuestion,
    resetSession,
    goToPrevious,
    goToNext,
    t,
  };
}
