import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { Language } from '../types';
import { ALL_BADGES } from '../data/seedData';
import {
  User as UserIcon,
  Flame,
  Sparkles,
  Award,
  Settings,
  Bell,
  Lock,
  Save,
  CheckCircle2,
  Globe
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const { currentLanguage, setLanguage } = useLanguage();

  const [name, setName] = useState(user?.name || 'Aditi Deshmukh');
  const [selectedLang, setSelectedLang] = useState<Language>(user?.selectedLanguage || 'marathi');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(user?.dailyGoalMinutes || 20);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      name,
      selectedLanguage: selectedLang,
      dailyGoalMinutes
    });
    setLanguage(selectedLang);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleChangePassword = () => {
    setPasswordMsg('Password security reset link has been dispatched to your email.');
    setTimeout(() => setPasswordMsg(null), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Banner / User Avatar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 text-white flex items-center justify-center font-bold text-3xl shadow-lg shadow-indigo-200 shrink-0">
          {name.charAt(0).toUpperCase()}
        </div>

        <div className="space-y-3 flex-1 text-center sm:text-left">
          <div>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900">{name}</h1>
              <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                {user?.role || 'student'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{user?.email || 'learner@bhashasetu.com'}</p>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-lg border border-amber-200/60">
              <Flame size={14} className="fill-amber-500 text-amber-500" />
              <span>{user?.streak || 7} Day Streak</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200/60">
              <Sparkles size={14} />
              <span>{user?.xp || 420} XP Total</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200/60">
              <Award size={14} />
              <span>Learner Tier 2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Settings size={18} className="text-slate-500" />
            <h2 className="text-lg font-bold text-slate-900">Profile & Study Preferences</h2>
          </div>
          {saveSuccess && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <CheckCircle2 size={14} />
              <span>Saved successfully!</span>
            </div>
          )}
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Learning Language
              </label>
              <select
                value={selectedLang}
                onChange={e => setSelectedLang(e.target.value as Language)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="marathi">🇮🇳 Marathi (मराठी)</option>
                <option value="hindi">🇮🇳 Hindi (हिंदी)</option>
                <option value="english">🇬🇧 English</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Daily Study Goal Target
              </label>
              <select
                value={dailyGoalMinutes}
                onChange={e => setDailyGoalMinutes(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value={10}>10 Minutes / Day (Casual)</option>
                <option value={15}>15 Minutes / Day (Regular)</option>
                <option value={20}>20 Minutes / Day (Dedicated)</option>
                <option value={30}>30 Minutes / Day (Intensive)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Daily Practice Reminders
              </label>
              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="notif_toggle"
                  checked={notificationsEnabled}
                  onChange={e => setNotificationsEnabled(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <label htmlFor="notif_toggle" className="text-xs text-slate-700 cursor-pointer">
                  Send streak notifications & study reminders
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleChangePassword}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
            >
              <Lock size={13} />
              <span>Change Password</span>
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>

          {passwordMsg && (
            <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-800">
              {passwordMsg}
            </div>
          )}
        </form>
      </div>

      {/* Earned Badges Showcase */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Your Earned Badges</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {ALL_BADGES.map(badge => {
            const isUnlocked = user?.badges?.includes(badge.id) || badge.id === 'first_lesson';
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center space-y-1.5 ${
                  isUnlocked
                    ? 'bg-gradient-to-b from-indigo-50/50 to-white border-indigo-200 shadow-xs'
                    : 'bg-slate-50 border-slate-200 opacity-40 grayscale'
                }`}
              >
                <div className="text-2xl">{badge.icon}</div>
                <h4 className="text-xs font-bold text-slate-900">{badge.title}</h4>
                <p className="text-[10px] text-slate-500">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
