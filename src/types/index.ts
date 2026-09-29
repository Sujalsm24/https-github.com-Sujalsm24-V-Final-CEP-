export type Language = 'marathi' | 'hindi' | 'english';

export type UserRole = 'student' | 'admin';

export type LessonLevel = 'beginner' | 'intermediate' | 'advanced';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  selectedLanguage: Language;
  xp: number;
  streak: number;
  lastActiveDate?: string;
  completedLessons: string[];
  badges: string[];
  dailyGoalMinutes: number;
  todayStudyMinutes: number;
  createdAt: string;
}

export interface VocabularyItem {
  id: string;
  word: string;
  transliteration: string;
  meaning: string;
  category?: string;
  audioText?: string;
  exampleSentence?: string;
  exampleTranslation?: string;
}

export interface CharacterItem {
  char: string;
  transliteration: string;
  exampleWord: string;
  exampleMeaning: string;
  pronunciationHint: string;
}

export interface BarakhadiRow {
  consonant: string;
  vowelCombinations: {
    symbol: string;
    char: string;
    transliteration: string;
  }[];
}

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface Flashcard {
  id: string;
  front: string;
  transliteration: string;
  back: string;
  hint?: string;
  example?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  audioPrompt?: string;
}

export interface Lesson {
  id: string;
  title: string;
  marathiTitle?: string;
  language: Language;
  category: string;
  level: LessonLevel;
  order: number;
  description: string;
  durationMinutes: number;
  characters?: CharacterItem[];
  vocabulary?: VocabularyItem[];
  barakhadi?: BarakhadiRow[];
  flashcards?: Flashcard[];
  quizQuestions?: QuizQuestion[];
  matchPairs?: MatchPair[];
  fillInBlanks?: {
    id: string;
    sentence: string;
    missingWord: string;
    options: string[];
    translation: string;
  }[];
  speakingPhrases?: {
    id: string;
    phrase: string;
    transliteration: string;
    meaning: string;
  }[];
}

export interface Quiz {
  id: string;
  title: string;
  language: Language;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  questions: QuizQuestion[];
  rewardXp: number;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTakenSeconds: number;
  xpEarned: number;
  completedAt: string;
}

export interface UserProgress {
  userId: string;
  completedLessons: string[];
  lessonScores: Record<string, number>;
  totalXp: number;
  streak: number;
  level: string;
  quizAttempts: QuizAttempt[];
  vocabularyLearned: number;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  streak: number;
  selectedLanguage: Language;
  avatarColor?: string;
  rank?: number;
}

export interface TranslationRecord {
  id: string;
  sourceLang: Language;
  targetLang: Language;
  sourceText: string;
  translatedText: string;
  timestamp: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  transliteration?: string;
  translation?: string;
  timestamp: string;
}
