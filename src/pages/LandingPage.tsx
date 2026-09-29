import React from 'react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Language } from '../types';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Mic,
  HelpCircle,
  Bot,
  Languages,
  CheckCircle2,
  Users,
  Award
} from 'lucide-react';
import { AudioButton } from '../components/common/AudioButton';

interface LandingPageProps {
  onNavigate: (tab: string) => void;
  onSelectLanguageAndLearn: (lang: Language) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onSelectLanguageAndLearn }) => {
  const { setLanguage } = useLanguage();
  const { user } = useAuth();

  const handleLanguageCardClick = (lang: Language) => {
    setLanguage(lang);
    if (user) {
      onNavigate('learn');
    } else {
      onSelectLanguageAndLearn(lang);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100/80 text-indigo-800 text-xs font-semibold">
                <Sparkles size={14} className="text-indigo-600" />
                <span>Empowering India with Local Language Fluency</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
                Learn Local Languages. <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-600 bg-clip-text text-transparent">
                  Connect With People.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Learn Marathi, Hindi, and English through interactive bite-sized lessons, quizzes, real-time speech pronunciation practice, and AI tutoring.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onNavigate(user ? 'dashboard' : 'auth')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-md shadow-indigo-200 transition-all cursor-pointer"
                >
                  <span>Start Learning Free</span>
                  <ArrowRight size={16} />
                </button>
                <a
                  href="#languages"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors shadow-xs"
                >
                  <span>Explore Languages</span>
                </a>
              </div>

              {/* Trust markers */}
              <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">50+</div>
                  <div className="text-xs text-slate-500 font-medium">Bite-sized Lessons</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">150+</div>
                  <div className="text-xs text-slate-500 font-medium">Vocabulary Cards</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">100%</div>
                  <div className="text-xs text-slate-500 font-medium">Interactive Audio</div>
                </div>
              </div>
            </div>

            {/* Right Interactive Learning Mockup Stage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 p-6 space-y-5">
                {/* Header of mockup */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-400" />
                    <span className="w-3 h-3 rounded-full bg-amber-400" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                    Interactive Lesson Preview
                  </span>
                </div>

                {/* Devanagari interactive practice card */}
                <div className="p-5 rounded-xl bg-gradient-to-br from-indigo-50 via-white to-purple-50/40 border border-indigo-100 text-center space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    Marathi Vowels · स्वर
                  </div>
                  <div className="text-6xl font-black text-slate-900 font-devanagari">
                    अ
                  </div>
                  <div className="text-sm font-medium text-slate-600">
                    Transliteration: <span className="font-semibold text-slate-900">A</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    अ for <strong>अननस</strong> (Pineapple)
                  </p>
                  <div className="pt-1 flex items-center justify-center gap-3">
                    <AudioButton text="अननस" lang="marathi" size="md" showLabel />
                  </div>
                </div>

                {/* Floating Quiz Sample */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2">
                  <div className="text-xs font-medium text-slate-500">Quick Knowledge Check:</div>
                  <p className="text-xs font-semibold text-slate-900">
                    "What is the Marathi word for Water?"
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 font-bold border border-emerald-300 flex items-center justify-between">
                      <span className="font-devanagari">पाणी</span>
                      <CheckCircle2 size={13} className="text-emerald-600" />
                    </div>
                    <div className="p-2 rounded-lg bg-white text-slate-600 border border-slate-200 font-devanagari">
                      घर
                    </div>
                  </div>
                </div>

                {/* BhashaBuddy mini callout */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 text-purple-900 border border-purple-200/60 text-xs">
                  <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
                    <Bot size={16} />
                  </div>
                  <div>
                    <p className="font-semibold">BhashaBuddy AI Tutor</p>
                    <p className="text-purple-700 text-[11px]">Ready 24/7 to answer grammar and phrases!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Language Selection Grid */}
      <section id="languages" className="py-16 md:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Choose Your Learning Path
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Structured step-by-step curricula crafted by native linguists for maximum conversational retention.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Marathi Card */}
            <div className="group rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl">
                    🇮🇳
                  </div>
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                    22 Lessons
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span>Marathi</span>
                    <span className="text-base font-normal text-slate-500 font-devanagari">(मराठी)</span>
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    Master the foundational script, Vowels, Consonants, Barakhadi, and everyday market & travel conversations in Maharashtra.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Beginner: Alphabets, Numbers & Colors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>Intermediate: Grammar, Tenses & Rickshaw Travel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span>Advanced: Sant Literature & Proverbs</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleLanguageCardClick('marathi')}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors text-center"
                >
                  Start Learning Marathi
                </button>
              </div>
            </div>

            {/* Hindi Card */}
            <div className="group rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-2xl">
                    🇮🇳
                  </div>
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                    16 Lessons
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span>Hindi</span>
                    <span className="text-base font-normal text-slate-500 font-devanagari">(हिंदी)</span>
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    Speak fluently across North and Central India with Varnamala, daily household items, market bargaining, and professional etiquette.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Beginner: Swar, Vyanjan & Relations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>Intermediate: Verbs, Dining & Directions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span>Advanced: Idioms & Workplace Hindi</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleLanguageCardClick('hindi')}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors text-center"
                >
                  Start Learning Hindi
                </button>
              </div>
            </div>

            {/* English Card */}
            <div className="group rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-lg transition-all p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-2xl">
                    🇬🇧
                  </div>
                  <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                    15 Lessons
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <span>English</span>
                    <span className="text-base font-normal text-slate-500">(Global)</span>
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    Build rock-solid confidence in professional emails, job interviews, international travel, and modern conversational fluency.
                  </p>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Beginner: Phonics, Daily Greetings & Objects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>Intermediate: The 5 Ws, Dining & Transit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span>Advanced: Workplace Emails & Native Idioms</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleLanguageCardClick('english')}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors text-center"
                >
                  Start Learning English
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Feature Pillars */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Built for Real Indian Conversation
            </h2>
            <p className="mt-3 text-base text-slate-600">
              Not just rote memorization. Practice listening, speaking, reading, and culture with immediate audio feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Mic size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Speech Pronunciation Practice</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Speak directly into your microphone. Our speech recognition engine scores your pronunciation and gives instant accuracy feedback.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Bot size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">BhashaBuddy AI Tutor</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ask any question in plain English or local tongue. Get Devanagari script, phonetics, and real-life examples on demand.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <HelpCircle size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Adaptive Quizzes & XP</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reinforce vocabulary with instant green/red answer checks, detailed cultural explanations, and weekly leaderboard rankings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <BookOpen size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">6 Interactive Formats</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Flashcards, matching pairs, multiple-choice, fill in blanks, listening drills, and voice practice inside every lesson.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Languages size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">3-Way Instant Translator</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Translate seamlessly between Marathi, Hindi, and English with voice audio, copy affordance, and personal history tracking.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Award size={20} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Streaks & Gamification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Keep the flame alive with daily streak counters, unlocking celebratory badges as you progress from Beginner to Language Master.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">BhashaSetu</span>
            <span>· Local Language Learning Platform</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('learn')} className="hover:text-slate-900 transition-colors">
              Lessons
            </button>
            <button onClick={() => onNavigate('quizzes')} className="hover:text-slate-900 transition-colors">
              Quizzes
            </button>
            <button onClick={() => onNavigate('translator')} className="hover:text-slate-900 transition-colors">
              Translator
            </button>
            <button onClick={() => onNavigate('ai-tutor')} className="hover:text-slate-900 transition-colors">
              AI Tutor
            </button>
          </div>
          <div>
            © {new Date().getFullYear()} BhashaSetu. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
