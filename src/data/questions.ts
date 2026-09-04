import { QuestionItem } from '../types';

/**
 * 36 Discussion questions from the "Book Club DICE GAME" 6x6 grid.
 * Row die (1 to 6) and Column die (1 to 6).
 * Extensible for adding new languages: simply add a new language key to `text`.
 */
export const QUESTIONS_DATA: QuestionItem[] = [
  // --- ROW 1 (Row Die = 1) ---
  {
    id: 'q_1_1',
    row: 1,
    col: 1,
    category: 'reflection',
    text: {
      en: 'Did the book remind you of any other stories?',
      it: 'Il libro ti ha ricordato altre storie?',
    },
  },
  {
    id: 'q_1_2',
    row: 1,
    col: 2,
    category: 'characters',
    text: {
      en: 'Which character had the best development?',
      it: 'Quale personaggio ha avuto la migliore evoluzione?',
    },
  },
  {
    id: 'q_1_3',
    row: 1,
    col: 3,
    category: 'reflection',
    text: {
      en: 'What was your favorite part of the book?',
      it: 'Qual è stata la tua parte preferita del libro?',
    },
  },
  {
    id: 'q_1_4',
    row: 1,
    col: 4,
    category: 'characters',
    text: {
      en: 'Which character did you relate to the most?',
      it: 'Con quale personaggio ti sei immedesimato di più?',
    },
  },
  {
    id: 'q_1_5',
    row: 1,
    col: 5,
    category: 'plot',
    text: {
      en: 'What surprised you most about the plot?',
      it: 'Cosa ti ha sorpreso di più della trama?',
    },
  },
  {
    id: 'q_1_6',
    row: 1,
    col: 6,
    category: 'plot',
    text: {
      en: 'Did you find the ending satisfying?',
      it: 'Hai trovato soddisfacente il finale?',
    },
  },

  // --- ROW 2 (Row Die = 2) ---
  {
    id: 'q_2_1',
    row: 2,
    col: 1,
    category: 'emotions',
    text: {
      en: 'Was there a moment that made you emotional?',
      it: "C'è stato un momento che ti ha emozionato particolarmente?",
    },
  },
  {
    id: 'q_2_2',
    row: 2,
    col: 2,
    category: 'themes',
    text: {
      en: 'What themes stood out the most to you?',
      it: 'Quali temi ti hanno colpito maggiormente?',
    },
  },
  {
    id: 'q_2_3',
    row: 2,
    col: 3,
    category: 'author',
    text: {
      en: 'What would you ask the author if you could?',
      it: "Cosa chiederesti all'autore/autrice se ne avessi la possibilità?",
    },
  },
  {
    id: 'q_2_4',
    row: 2,
    col: 4,
    category: 'reflection',
    text: {
      en: 'How did the book challenge or affirm your beliefs?',
      it: 'In che modo il libro ha sfidato o confermato le tue convinzioni?',
    },
  },
  {
    id: 'q_2_5',
    row: 2,
    col: 5,
    category: 'characters',
    text: {
      en: 'Which minor character deserves a spin-off?',
      it: 'Quale personaggio secondario meriterebbe uno spin-off?',
    },
  },
  {
    id: 'q_2_6',
    row: 2,
    col: 6,
    category: 'themes',
    text: {
      en: 'Did the title suit the story?',
      it: 'Il titolo era adatto alla storia?',
    },
  },

  // --- ROW 3 (Row Die = 3) ---
  {
    id: 'q_3_1',
    row: 3,
    col: 1,
    category: 'themes',
    text: {
      en: 'What symbolism did you notice in the book?',
      it: 'Quale simbolismo hai notato nel libro?',
    },
  },
  {
    id: 'q_3_2',
    row: 3,
    col: 2,
    category: 'plot',
    text: {
      en: 'If you could rewrite one scene, which would it be?',
      it: 'Se potessi riscrivere una scena, quale sceglieresti?',
    },
  },
  {
    id: 'q_3_3',
    row: 3,
    col: 3,
    category: 'reflection',
    text: {
      en: 'What lessons did you take away from the book?',
      it: 'Quali lezioni o insegnamenti hai tratto dal libro?',
    },
  },
  {
    id: 'q_3_4',
    row: 3,
    col: 4,
    category: 'reflection',
    text: {
      en: 'Would you recommend this book to a friend?',
      it: 'Consiglieresti questo libro a un amico?',
    },
  },
  {
    id: 'q_3_5',
    row: 3,
    col: 5,
    category: 'plot',
    text: {
      en: 'Which part of the book felt most realistic to you?',
      it: 'Quale parte del libro ti è sembrata più realistica?',
    },
  },
  {
    id: 'q_3_6',
    row: 3,
    col: 6,
    category: 'characters',
    text: {
      en: "Was there a character you didn't like but understood?",
      it: "C'era un personaggio che non ti piaceva ma di cui hai compreso le motivazioni?",
    },
  },

  // --- ROW 4 (Row Die = 4) ---
  {
    id: 'q_4_1',
    row: 4,
    col: 1,
    category: 'author',
    text: {
      en: 'How did you like the pacing of the book?',
      it: 'Cosa ne pensi del ritmo della narrazione?',
    },
  },
  {
    id: 'q_4_2',
    row: 4,
    col: 2,
    category: 'reflection',
    text: {
      en: 'How would you cast this book as a movie?',
      it: 'Come faresti il casting se questo libro diventasse un film?',
    },
  },
  {
    id: 'q_4_3',
    row: 4,
    col: 3,
    category: 'characters',
    text: {
      en: 'Which character did you relate to most?',
      it: 'Con quale personaggio hai sentito maggiore affinità?',
    },
  },
  {
    id: 'q_4_4',
    row: 4,
    col: 4,
    category: 'author',
    text: {
      en: 'What moment would you love to discuss with the author?',
      it: "Di quale passaggio vorresti parlare direttamente con l'autore/autrice?",
    },
  },
  {
    id: 'q_4_5',
    row: 4,
    col: 5,
    category: 'characters',
    text: {
      en: 'If you could ask a character one question, what would it be?',
      it: 'Se potessi fare una sola domanda a un personaggio, quale sarebbe?',
    },
  },
  {
    id: 'q_4_6',
    row: 4,
    col: 6,
    category: 'themes',
    text: {
      en: 'What was the biggest moral dilemma in the book?',
      it: 'Qual è stato il più grande dilemma morale nel libro?',
    },
  },

  // --- ROW 5 (Row Die = 5) ---
  {
    id: 'q_5_1',
    row: 5,
    col: 1,
    category: 'reflection',
    text: {
      en: 'What would you change about the book if you could?',
      it: 'Cosa cambieresti del libro se potessi?',
    },
  },
  {
    id: 'q_5_2',
    row: 5,
    col: 2,
    category: 'author',
    text: {
      en: 'Did the book make you want to read more by this author?',
      it: "Il libro ti ha fatto venire voglia di leggere altre opere di questo autore?",
    },
  },
  {
    id: 'q_5_3',
    row: 5,
    col: 3,
    category: 'themes',
    text: {
      en: 'Do you have a favorite quote from the book?',
      it: 'Hai una citazione preferita del libro?',
    },
  },
  {
    id: 'q_5_4',
    row: 5,
    col: 4,
    category: 'reflection',
    text: {
      en: 'Did this book remind you of any other books?',
      it: 'Questo libro ti ha ricordato altri libri?',
    },
  },
  {
    id: 'q_5_5',
    row: 5,
    col: 5,
    category: 'reflection',
    text: {
      en: 'Would you reread this book?',
      it: 'Rileggeresti questo libro?',
    },
  },
  {
    id: 'q_5_6',
    row: 5,
    col: 6,
    category: 'characters',
    text: {
      en: 'Who was your least favorite character?',
      it: 'Chi è stato il personaggio che ti è piaciuto di meno?',
    },
  },

  // --- ROW 6 (Row Die = 6) ---
  {
    id: 'q_6_1',
    row: 6,
    col: 1,
    category: 'characters',
    text: {
      en: 'Who was your favorite character?',
      it: 'Chi è stato il tuo personaggio preferito?',
    },
  },
  {
    id: 'q_6_2',
    row: 6,
    col: 2,
    category: 'plot',
    text: {
      en: 'How did you feel about the ending?',
      it: 'Cosa hai provato riguardo al finale?',
    },
  },
  {
    id: 'q_6_3',
    row: 6,
    col: 3,
    category: 'author',
    text: {
      en: "What did you think of the author's writing style?",
      it: "Cosa pensi dello stile di scrittura dell'autore/autrice?",
    },
  },
  {
    id: 'q_6_4',
    row: 6,
    col: 4,
    category: 'emotions',
    text: {
      en: 'Were there any moments that surprised you?',
      it: 'Ci sono stati momenti che ti hanno colto di sorpresa?',
    },
  },
  {
    id: 'q_6_5',
    row: 6,
    col: 5,
    category: 'plot',
    text: {
      en: 'Were there any unanswered questions or loose ends?',
      it: 'Sono rimaste domande senza risposta o questioni in sospeso?',
    },
  },
  {
    id: 'q_6_6',
    row: 6,
    col: 6,
    category: 'emotions',
    text: {
      en: 'What emotions did the book evoke as you read?',
      it: 'Quali emozioni ha suscitato in te la lettura del libro?',
    },
  },
];
