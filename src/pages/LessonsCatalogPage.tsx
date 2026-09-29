import React, { useState, useEffect } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Lesson, LessonLevel, Language } from '../types';
import { api } from '../services/api';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Filter
} from 'lucide-react';

interface LessonsCatalogPageProps {
  onSelectLesson: (id: string) => void;
}

export const LessonsCatalogPage: React.FC<LessonsCatalogPageProps> = ({ onSelectLesson }) => {
  const { currentLanguage, setLanguage } = useLanguage();
  const { user } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [levelFilter, setLevelFilter] = useState<'all' | LessonLevel>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.getLessons({ language: currentLanguage });
        setLessons(res.lessons);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [currentLanguage]);

  const completedIds = user?.completedLessons || [];

  const filteredLessons = lessons.filter(lesson => {
    if (levelFilter !== 'all' && lesson.level !== levelFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = lesson.title.toLowerCase().includes(q);
      const matchMarathi = lesson.marathiTitle?.toLowerCase().includes(q) || false;
      const matchDesc = lesson.description.toLowerCase().includes(q);
      return matchTitle || matchMarathi || matchDesc;
    }
    return true;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header with Language Selector Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Language Curriculum
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Choose your language track and advance through structured difficulty tiers.
          </p>
        </div>

        {/* 3 Language Track Selector */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl">
          {(Object.keys(SUPPORTED_LANGUAGES) as Language[]).map(langKey => {
            const isSelected = currentLanguage === langKey;
            const meta = SUPPORTED_LANGUAGES[langKey];
            return (
              <button
                key={langKey}
                onClick={() => setLanguage(langKey)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{meta.flag}</span>
                <span>{meta.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Level Filter Buttons */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors capitalize ${
                levelFilter === lvl
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {lvl === 'all' ? 'All Lessons' : lvl}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search lessons or topics..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-xs">
          Loading lessons catalog...
        </div>
      ) : filteredLessons.length === 0 ? (
        <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8 space-y-2">
          <BookOpen size={32} className="mx-auto text-slate-300" />
          <p className="text-sm font-semibold text-slate-700">No lessons found</p>
          <p className="text-xs text-slate-500">Try adjusting your search or level filters.</p>
        </div>
      ) : (
        /* Lessons Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredLessons.map(lesson => {
            const isCompleted = completedIds.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className="group relative p-6 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Category and duration header */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[11px]">
                      Module {lesson.order} · {lesson.category}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                      <Clock size={12} />
                      {lesson.durationMinutes} min
                    </span>
                  </div>

                  {/* Title & Native script */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {lesson.title}
                    </h3>
                    {lesson.marathiTitle && (
                      <p className="text-xs font-semibold text-slate-600 font-devanagari mt-0.5">
                        {lesson.marathiTitle}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {lesson.description}
                  </p>

                  {/* Metadata: items preview */}
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1">
                    {lesson.characters && (
                      <span>{lesson.characters.length} characters</span>
                    )}
                    {lesson.vocabulary && (
                      <span>{lesson.vocabulary.length} vocab words</span>
                    )}
                    {lesson.flashcards && (
                      <span>{lesson.flashcards.length} cards</span>
                    )}
                  </div>
                </div>

                {/* Card footer */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="capitalize text-slate-500 font-medium">
                    Level: {lesson.level}
                  </span>

                  {isCompleted ? (
                    <span className="flex items-center gap-1 font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                      <CheckCircle2 size={13} />
                      Completed
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
                      <span>Start Module</span>
                      <ArrowRight size={13} />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
