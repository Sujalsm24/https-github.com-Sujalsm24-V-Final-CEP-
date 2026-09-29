import React, { useState, useEffect } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Quiz, QuizQuestion, Language } from '../types';
import { api } from '../services/api';
import { AudioButton } from '../components/common/AudioButton';
import { playSuccessChime, playErrorBuzz } from '../services/speech';
import { fireCelebrationConfetti } from '../components/common/Confetti';
import {
  HelpCircle,
  Award,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Clock,
  ChevronRight
} from 'lucide-react';

export const QuizzesPage: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const { user, refreshUser } = useAuth();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);

  // Active quiz state
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [hasConfirmedAnswer, setHasConfirmedAnswer] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);

  // Results state
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizResults, setQuizResults] = useState<{
    correctCount: number;
    totalQuestions: number;
    percentage: number;
    xpEarned: number;
    passed: boolean;
    timeTakenSeconds: number;
  } | null>(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.getQuizzes(currentLanguage);
        setQuizzes(res.quizzes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [currentLanguage]);

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setHasConfirmedAnswer(false);
    setQuizFinished(false);
    setQuizResults(null);
    setStartTime(Date.now());
  };

  const currentQ: QuizQuestion | undefined = activeQuiz?.questions[currentQuestionIndex];

  const handleSelectOption = (index: number) => {
    if (hasConfirmedAnswer || !currentQ) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQ.id]: index }));
    setHasConfirmedAnswer(true);

    if (index === currentQ.correctAnswerIndex) {
      playSuccessChime();
    } else {
      playErrorBuzz();
    }
  };

  const handleNextQuestion = async () => {
    if (!activeQuiz) return;

    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setHasConfirmedAnswer(false);
    } else {
      // Finished quiz! Submit to server
      const timeTaken = Math.round((Date.now() - startTime) / 1000);
      try {
        const res = await api.submitQuiz(activeQuiz.id, selectedAnswers, timeTaken);
        setQuizResults({
          ...res,
          timeTakenSeconds: timeTaken
        });
        setQuizFinished(true);
        if (res.percentage >= 80) {
          playSuccessChime();
          fireCelebrationConfetti();
        }
        refreshUser();
      } catch (err) {
        console.error('Quiz submit error:', err);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Catalog view if no quiz active */}
      {!activeQuiz && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Language Quizzes
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Challenge your vocabulary, grammar, and listening skills with immediate scoring.
              </p>
            </div>

            {/* Language filter */}
            <div className="flex items-center p-1 bg-slate-100 rounded-xl">
              {(Object.keys(SUPPORTED_LANGUAGES) as Language[]).map(langKey => (
                <button
                  key={langKey}
                  onClick={() => setLanguage(langKey)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    currentLanguage === langKey
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {SUPPORTED_LANGUAGES[langKey].name}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="py-20 text-center text-slate-400 text-xs">
              Loading quizzes...
            </div>
          ) : quizzes.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <p className="text-sm font-semibold text-slate-700">No quizzes available for this language yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {quizzes.map(quiz => (
                <div
                  key={quiz.id}
                  className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                        {quiz.category}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                        <Sparkles size={12} />
                        +{quiz.rewardXp} XP
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">
                      {quiz.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {quiz.description}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                      <span>{quiz.questions.length} Questions</span>
                      <span>·</span>
                      <span className="capitalize font-medium text-slate-700">Difficulty: {quiz.difficulty}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400">Takes ~2 mins</span>
                    <button
                      onClick={() => handleStartQuiz(quiz)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Take Quiz</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Active Quiz Player */}
      {activeQuiz && !quizFinished && currentQ && (
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header & Progress */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <button
              onClick={() => setActiveQuiz(null)}
              className="text-slate-600 hover:text-slate-900 font-semibold"
            >
              Exit Quiz
            </button>
            <span className="font-semibold text-slate-700">
              Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
            </span>
          </div>

          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{
                width: `${Math.round(((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100)}%`
              }}
            />
          </div>

          {/* Question Card */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                {activeQuiz.category} Question
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {currentQ.options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentQ.id] === oIdx;
                const isCorrect = oIdx === currentQ.correctAnswerIndex;

                let btnStyle = 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 hover:border-slate-300';
                if (hasConfirmedAnswer) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 text-emerald-800 border-emerald-400 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 text-rose-800 border-rose-400 font-bold';
                  } else {
                    btnStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    disabled={hasConfirmedAnswer}
                    onClick={() => handleSelectOption(oIdx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-600 flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="font-devanagari text-base">{opt}</span>
                    </div>

                    {hasConfirmedAnswer && (
                      <div>
                        {isCorrect && <CheckCircle2 size={18} className="text-emerald-600" />}
                        {isSelected && !isCorrect && <XCircle size={18} className="text-rose-600" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answer */}
            {hasConfirmedAnswer && (
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-slate-700 space-y-1 animate-in fade-in duration-200">
                <span className="font-bold text-indigo-900 block">Explanation:</span>
                <p className="leading-relaxed">{currentQ.explanation}</p>
              </div>
            )}

            {/* Next question trigger */}
            {hasConfirmedAnswer && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>
                    {currentQuestionIndex < activeQuiz.questions.length - 1 ? 'Next Question' : 'Complete Quiz'}
                  </span>
                  <ChevronRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quiz Results Screen */}
      {quizFinished && quizResults && activeQuiz && (
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-white border border-slate-200 shadow-lg text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center mx-auto text-4xl shadow-md shadow-indigo-200">
            {quizResults.percentage >= 80 ? '🏆' : '📚'}
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Quiz Completed!
            </h2>
            <p className="text-xs text-slate-500">
              {activeQuiz.title}
            </p>
          </div>

          {/* Results grid */}
          <div className="grid grid-cols-3 gap-3 py-2 border-y border-slate-100">
            <div className="p-3 rounded-xl bg-slate-50">
              <span className="block text-[11px] text-slate-400 font-medium">Score</span>
              <span className="text-lg font-bold text-slate-900 tabular-nums">
                {quizResults.correctCount} / {quizResults.totalQuestions}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <span className="block text-[11px] text-slate-400 font-medium">Accuracy</span>
              <span className="text-lg font-bold text-indigo-600 tabular-nums">
                {quizResults.percentage}%
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50">
              <span className="block text-[11px] text-slate-400 font-medium">XP Earned</span>
              <span className="text-lg font-bold text-emerald-600 tabular-nums flex items-center justify-center gap-1">
                <Sparkles size={13} />
                +{quizResults.xpEarned}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600">
            {quizResults.percentage >= 80
              ? 'Outstanding performance! You have a great grasp of these concepts.'
              : 'Good effort! Review the words again to boost your score to 100%.'}
          </p>

          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => handleStartQuiz(activeQuiz)}
              className="w-full py-3 text-xs font-semibold text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Retry Quiz</span>
            </button>
            <button
              onClick={() => setActiveQuiz(null)}
              className="w-full py-3 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Back to Quizzes Catalog
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
