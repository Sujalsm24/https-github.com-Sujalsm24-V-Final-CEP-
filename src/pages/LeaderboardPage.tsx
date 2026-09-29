import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LeaderboardEntry } from '../types';
import { api } from '../services/api';
import {
  Trophy,
  Flame,
  Sparkles,
  Medal,
  Award,
  Crown
} from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'all'>('weekly');
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await api.getLeaderboard();
        setEntries(res.leaderboard);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const topThree = entries.slice(0, 3);
  const remaining = entries.slice(3);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Community Leaderboard</span>
            <Trophy size={24} className="text-amber-500" />
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Earn XP by completing lessons, taking quizzes, and speaking fluently every day.
          </p>
        </div>

        {/* Timeframe Filter Buttons */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl">
          {(['weekly', 'monthly', 'all'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                timeframe === tf
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tf === 'all' ? 'All Time' : tf}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      {topThree.length >= 3 && (
        <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 items-end max-w-2xl mx-auto">
          {/* Rank 2 (Silver) */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 text-center space-y-2 shadow-xs order-1 flex flex-col items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-lg sm:text-xl shadow-xs">
              🥈
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block truncate max-w-[100px] sm:max-w-none">
                {topThree[1].name}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Rank #2</span>
            </div>
            <div className="text-sm font-extrabold text-indigo-600 tabular-nums">
              {topThree[1].xp} XP
            </div>
          </div>

          {/* Rank 1 (Gold) */}
          <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-amber-50 via-white to-amber-50/30 border-2 border-amber-300 text-center space-y-3 shadow-md order-2 flex flex-col items-center scale-105">
            <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-amber-400 text-white flex items-center justify-center font-bold text-2xl sm:text-3xl shadow-md">
              👑
            </div>
            <div>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 block truncate max-w-[110px] sm:max-w-none">
                {topThree[0].name}
              </span>
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Champion</span>
            </div>
            <div className="text-base sm:text-lg font-black text-amber-600 tabular-nums">
              {topThree[0].xp} XP
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200 text-center space-y-2 shadow-xs order-3 flex flex-col items-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-lg sm:text-xl shadow-xs">
              🥉
            </div>
            <div>
              <span className="text-xs font-bold text-slate-900 block truncate max-w-[100px] sm:max-w-none">
                {topThree[2].name}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">Rank #3</span>
            </div>
            <div className="text-sm font-extrabold text-indigo-600 tabular-nums">
              {topThree[2].xp} XP
            </div>
          </div>
        </div>
      )}

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-6">
            <span className="w-8 text-center">Rank</span>
            <span>Learner</span>
          </div>
          <div className="flex items-center gap-8">
            <span>Streak</span>
            <span className="w-16 text-right">XP</span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {entries.map((entry, idx) => {
            const rank = idx + 1;
            const isCurrentUser = user && (entry.name === user.name || entry.id === user.id);

            return (
              <div
                key={entry.id}
                className={`p-4 flex items-center justify-between transition-colors ${
                  isCurrentUser
                    ? 'bg-indigo-50/70 border-l-4 border-l-indigo-600'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-6">
                  <span className="w-8 text-center font-bold text-xs text-slate-500 tabular-nums">
                    {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `#${rank}`}
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold">
                      {entry.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5">
                        <span>{entry.name}</span>
                        {isCurrentUser && (
                          <span className="text-[10px] text-indigo-700 font-bold bg-indigo-100 px-1.5 py-0.5 rounded">
                            You
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 capitalize">
                        {entry.selectedLanguage} Track
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8 text-xs font-semibold">
                  <div className="flex items-center gap-1 text-amber-600 tabular-nums">
                    <Flame size={13} className="fill-amber-500 text-amber-500" />
                    <span>{entry.streak}d</span>
                  </div>
                  <div className="w-16 text-right font-extrabold text-indigo-600 tabular-nums">
                    {entry.xp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
