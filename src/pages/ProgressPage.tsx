import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ALL_BADGES } from '../data/seedData';
import {
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
  BarChart2,
  Calendar
} from 'lucide-react';

export const ProgressPage: React.FC = () => {
  const { user } = useAuth();

  const completedCount = user?.completedLessons.length || 3;
  const totalLessons = 53; // across all 3 tracks
  const progressPercent = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  // Study hours data for Mon-Sun
  const weeklyStudyHours = [
    { day: 'Mon', minutes: 25, height: 75 },
    { day: 'Tue', minutes: 30, height: 90 },
    { day: 'Wed', minutes: 20, height: 60 },
    { day: 'Thu', minutes: 35, height: 100 },
    { day: 'Fri', minutes: 25, height: 75 },
    { day: 'Sat', minutes: 15, height: 45 },
    { day: 'Sun', minutes: user?.todayStudyMinutes || 20, height: 60 }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Learning Analytics & Progress
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Detailed metrics of your speech accuracy, study habits, vocabulary retention, and quiz grades.
        </p>
      </div>

      {/* 5 Key Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Metric 1: Overall Progress */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block">Overall Progress</span>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            68%
          </div>
          <div className="text-[11px] text-emerald-600 font-medium">
            ↑ 12% this month
          </div>
        </div>

        {/* Metric 2: Lessons */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block">Lessons Completed</span>
          <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
            34 / 50
          </div>
          <div className="text-[11px] text-slate-500">
            Across 3 tracks
          </div>
        </div>

        {/* Metric 3: Quiz Average */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block">Quiz Average</span>
          <div className="text-2xl font-extrabold text-indigo-600 tabular-nums">
            86%
          </div>
          <div className="text-[11px] text-slate-500">
            18 quizzes taken
          </div>
        </div>

        {/* Metric 4: Vocabulary */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <span className="text-[11px] font-semibold text-slate-400 block">Vocabulary Words</span>
          <div className="text-2xl font-extrabold text-purple-600 tabular-nums">
            450+
          </div>
          <div className="text-[11px] text-slate-500">
            Words mastered
          </div>
        </div>

        {/* Metric 5: Speaking Accuracy */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 col-span-2 md:col-span-1">
          <span className="text-[11px] font-semibold text-slate-400 block">Speaking Score</span>
          <div className="text-2xl font-extrabold text-amber-600 tabular-nums">
            72%
          </div>
          <div className="text-[11px] text-slate-500">
            Speech Recognition
          </div>
        </div>
      </div>

      {/* Interactive Charts Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Weekly Learning Time Bar Chart */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Weekly Learning Time (Minutes)</h3>
              <p className="text-[11px] text-slate-500">Target: 20 min/day</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              <Calendar size={13} />
              <span>This Week</span>
            </div>
          </div>

          <div className="pt-6 pb-2">
            <div className="h-44 flex items-end justify-between gap-3">
              {weeklyStudyHours.map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                  <div className="text-[10px] text-slate-400 tabular-nums">{bar.minutes}m</div>
                  <div className="w-full bg-slate-100 rounded-t-lg h-36 flex items-end justify-center overflow-hidden">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        bar.day === 'Sun' ? 'bg-indigo-600' : 'bg-indigo-400/80 hover:bg-indigo-500'
                      }`}
                      style={{ height: `${bar.height}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chart 2: Skill Area Mastery Distribution */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Skill Competency Breakdown</h3>
          <p className="text-[11px] text-slate-500">Evaluated across vocabulary, grammar, listening & pronunciation</p>

          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-700">Vocabulary & Flashcards</span>
                <span className="font-bold text-slate-900 tabular-nums">92%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-700">Grammar & Sentence Structure</span>
                <span className="font-bold text-slate-900 tabular-nums">84%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '84%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-700">Speaking & Pronunciation</span>
                <span className="font-bold text-slate-900 tabular-nums">72%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '72%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-700">Daily Conversation Fluency</span>
                <span className="font-bold text-slate-900 tabular-nums">65%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges and Milestones Section */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Achievements & Badges</h3>
            <p className="text-xs text-slate-500">Milestones unlocked throughout your language learning journey</p>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
            {user?.badges?.length || 2} / {ALL_BADGES.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
          {ALL_BADGES.map(b => {
            const isUnlocked = user?.badges?.includes(b.id) || b.id === 'first_lesson';
            return (
              <div
                key={b.id}
                className={`p-4 rounded-xl border text-center space-y-2 transition-all ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-indigo-50/50 to-white border-indigo-200/80 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 opacity-50 grayscale'
                }`}
              >
                <div className="text-3xl mx-auto">{b.icon}</div>
                <h4 className="text-xs font-bold text-slate-900">{b.title}</h4>
                <p className="text-[11px] text-slate-500 leading-tight">{b.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
