export type SupportedLanguage = 'it' | 'en' | string;

export interface LanguageOption {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export type QuestionCategory =
  | 'characters'
  | 'plot'
  | 'emotions'
  | 'author'
  | 'themes'
  | 'reflection';

export interface QuestionItem {
  id: string; // e.g. "q_1_1"
  row: number; // 1 to 6 (row die)
  col: number; // 1 to 6 (column die)
  category: QuestionCategory;
  text: Record<string, string>; // { it: '...', en: '...', ... }
}

export interface TranslationDictionary {
  appTitle: string;
  appSubtitle: string;
  tagline: string;
  rulesTitle: string;
  rulesDesc: string;
  drawButton: string;
  drawing: string;
  resetButton: string;
  resetConfirm: string;
  resetDone: string;
  allDrawnTitle: string;
  allDrawnDesc: string;
  reshuffle: string;
  remainingLabel: string;
  drawnLabel: string;
  progressLabel: string;
  historyTitle: string;
  historyEmpty: string;
  boardView: string;
  cardView: string;
  rowDie: string;
  colDie: string;
  questionNumber: string;
  copyQuestion: string;
  copied: string;
  selectLanguage: string;
  quickDraw: string;
  diceRollMode: string;
  soundOn: string;
  soundOff: string;
  previousQuestion: string;
  nextQuestion: string;
  filterAll: string;
  categoryLabels: Record<QuestionCategory, string>;
  diceCoordinates: string;
  clickToInspect: string;
  activeQuestion: string;
  alreadyDrawn: string;
  notDrawnYet: string;
}
