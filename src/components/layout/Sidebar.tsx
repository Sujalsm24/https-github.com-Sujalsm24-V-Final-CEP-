import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, SUPPORTED_LANGUAGES } from '../../context/LanguageContext';
import {
  LayoutDashboard,
  BookOpen,
  HelpCircle,
  Mic,
  Languages,
  Bot,
  TrendingUp,
  Trophy,
  User as UserIcon,
  ShieldAlert,
  Flame,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onNavigate }) => {
  const { user } = useAuth();
  const { currentLanguage } = useLanguage();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'learn', label: 'Lessons', icon: BookOpen },
    { id: 'quizzes', label: 'Quizzes', icon: HelpCircle },
    { id: 'speaking', label: 'Speaking', icon: Mic },
    { id: 'translator', label: 'Translator', icon: Languages },
    { id: 'ai-tutor', label: 'BhashaBuddy', icon: Bot, highlight: true },
    { id: 'progress', label: 'My Progress', icon: TrendingUp },
    { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
    { id: 'profile', label: 'Profile', icon: UserIcon }
  ];

  if (user?.role === 'admin') {
    menuItems.push({ id: 'admin', label: 'Admin Panel', icon: ShieldAlert, highlight: false });
  }

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-4rem)] p-4 shrink-0">
      {/* Current Language Summary Card */}
      <div className="p-3 mb-4 rounded-xl bg-gradient-to-br from-indigo-50/80 to-purple-50/50 border border-indigo-100">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span>Active Track</span>
          <span className="font-semibold text-indigo-700">{SUPPORTED_LANGUAGES[currentLanguage].name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl">{SUPPORTED_LANGUAGES[currentLanguage].flag}</span>
          <div>
            <h4 className="text-sm font-bold text-slate-900 font-devanagari">
              {SUPPORTED_LANGUAGES[currentLanguage].nativeName}
            </h4>
            <p className="text-[11px] text-slate-500">
              {SUPPORTED_LANGUAGES[currentLanguage].totalLessons} Lessons Available
            </p>
          </div>
        </div>
      </div>

      {/* Main navigation list */}
      <nav className="flex-1 space-y-1">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={17} className={isActive ? 'text-white' : 'text-slate-500'} />
                <span>{item.label}</span>
              </div>
              {item.highlight && !isActive && (
                <span className="flex items-center gap-1 text-[10px] text-purple-700 bg-purple-100 px-1.5 py-0.5 rounded font-medium">
                  AI
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Streak & Level Mini Deck */}
      {user && (
        <div className="mt-auto pt-4 border-t border-slate-100">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Weekly Streak</span>
              <span className="flex items-center gap-1 font-bold text-amber-600 tabular-nums">
                <Flame size={13} className="fill-amber-500 text-amber-500" />
                {user.streak} Days
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Total Points</span>
              <span className="flex items-center gap-1 font-bold text-indigo-600 tabular-nums">
                <Sparkles size={13} />
                {user.xp} XP
              </span>
            </div>
            {/* Daily study bar */}
            <div className="pt-1">
              <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                <span>Daily Goal</span>
                <span className="tabular-nums font-medium text-slate-700">
                  {user.todayStudyMinutes}/{user.dailyGoalMinutes}m
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min(100, Math.round((user.todayStudyMinutes / (user.dailyGoalMinutes || 20)) * 100))}%`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
