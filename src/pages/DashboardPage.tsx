import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { Lesson } from '../types';
import { api } from '../services/api';
import {
  Flame,
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Play,
  Mic,
  Bot,
  TrendingUp
} from 'lucide-react';

interface DashboardPageProps {
  onNavigate: (tab: string) => void;
  onSelectLesson: (lessonId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate, onSelectLesson }) => {
  const { user } = useAuth();
  const { currentLanguage } = useLanguage();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
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

  // Find next uncompleted lesson
  const completedIds = user?.completedLessons || [];
  const nextLesson = lessons.find(l => !completedIds.includes(l.id)) || lessons[0];
  const completedCount = completedIds.length;
  const totalLessons = lessons.length || 20;
  const progressPercent = Math.min(100, Math.round((completedCount / (totalLessons || 1)) * 100));

  const recommendedLessons = lessons.slice(0, 6);

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white shadow-lg shadow-indigo-200/50">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-medium text-indigo-100">
            <span>Active Language:</span>
            <span className="font-bold text-white">{SUPPORTED_LANGUAGES[currentLanguage].name}</span>
            <span className="font-devanagari text-white/90">({SUPPORTED_LANGUAGES[currentLanguage].nativeName})</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {user?.name || 'Learner'}! 👋
          </h1>
          <p className="text-sm text-indigo-100 max-w-xl">
            You're on a roll today. Practice speaking and complete your daily goal to extend your streak!
          </p>
        </div>

        {/* Action button */}
        {nextLesson && (
          <button
            onClick={() => onSelectLesson(nextLesson.id)}
            className="self-start md:self-center inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <Play size={15} className="fill-indigo-700" />
            <span>Resume: {nextLesson.title.split('–')[0]}</span>
          </button>
        )}
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Lessons Completed */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Lessons Completed</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
            {completedCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Out of {totalLessons} modules
          </div>
        </div>

        {/* Stat 2: Current Streak */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Current Streak</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Flame size={18} className="fill-amber-500 text-amber-500" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums flex items-baseline gap-1">
            <span>{user?.streak || 7}</span>
            <span className="text-sm font-semibold text-slate-500">days</span>
          </div>
          <div className="text-[11px] text-amber-600 font-medium mt-1">
            🔥 Keep it up today!
          </div>
        </div>

        {/* Stat 3: Quiz Score */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Quiz Average</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
            86%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Across {user?.xp || 420} XP earned
          </div>
        </div>

        {/* Stat 4: Learning Progress */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Track Progress</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
            {progressPercent}%
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Continue Learning + Daily Goal Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Learning Box (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider text-indigo-600">
                Continue Learning
              </span>
              <span>{SUPPORTED_LANGUAGES[currentLanguage].name} Track</span>
            </div>
            {nextLesson ? (
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">
                  {nextLesson.title}
                </h3>
                {nextLesson.marathiTitle && (
                  <p className="text-sm font-semibold text-slate-600 font-devanagari">
                    {nextLesson.marathiTitle}
                  </p>
                )}
                <p className="text-xs text-slate-600 line-clamp-2">
                  {nextLesson.description}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-500">All current lessons completed! Check back soon or review past modules.</p>
            )}
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Progress in current level</span>
              <span className="font-bold text-slate-900 tabular-nums">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            {nextLesson && (
              <button
                onClick={() => onSelectLesson(nextLesson.id)}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue Lesson</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Daily Goal Box (1 col) */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Flame size={15} className="fill-amber-500 text-amber-500" />
                Daily Goal
              </span>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                Active
              </span>
            </div>

            <div className="text-center py-4">
              <div className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {user?.todayStudyMinutes || 15} <span className="text-base font-normal text-slate-500">/ {user?.dailyGoalMinutes || 20} min</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {((user?.todayStudyMinutes || 15) >= (user?.dailyGoalMinutes || 20))
                  ? '🎉 Daily goal achieved! Keep practicing for extra XP.'
                  : `Only ${(user?.dailyGoalMinutes || 20) - (user?.todayStudyMinutes || 15)} more minutes to complete today's target!`}
              </p>
            </div>

            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, Math.round(((user?.todayStudyMinutes || 15) / (user?.dailyGoalMinutes || 20)) * 100))}%`
                }}
              />
            </div>
          </div>

          {/* Quick shortcuts */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => onNavigate('speaking')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 text-slate-700 hover:text-indigo-700 font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Mic size={14} />
              <span>Voice Drill</span>
            </button>
            <button
              onClick={() => onNavigate('ai-tutor')}
              className="p-2 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200/80 text-slate-700 hover:text-purple-700 font-medium flex items-center justify-center gap-1.5 transition-colors"
            >
              <Bot size={14} />
              <span>BhashaBuddy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Lessons Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recommended Lessons</h3>
            <p className="text-xs text-slate-500">Curated modules matching your current skill pace</p>
          </div>
          <button
            onClick={() => onNavigate('learn')}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
          >
            <span>View All ({lessons.length})</span>
            <ArrowRight size={13} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedLessons.map(lesson => {
            const isCompleted = completedIds.includes(lesson.id);
            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className="group p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-500">
                      Module {lesson.order} · {lesson.category}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle2 size={12} />
                        Done
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock size={11} />
                        {lesson.durationMinutes}m
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {lesson.title}
                  </h4>
                  {lesson.marathiTitle && (
                    <p className="text-xs text-slate-500 font-devanagari">
                      {lesson.marathiTitle}
                    </p>
                  )}
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {lesson.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="capitalize font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
                    {lesson.level}
                  </span>
                  <span className="font-semibold text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    Start <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
