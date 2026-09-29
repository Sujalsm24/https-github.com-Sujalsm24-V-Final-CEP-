import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, SUPPORTED_LANGUAGES } from '../../context/LanguageContext';
import { Language } from '../../types';
import { Flame, Sparkles, Menu, X, ChevronDown, User as UserIcon, LogOut, Shield } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, onNavigate }) => {
  const { user, logout } = useAuth();
  const { currentLanguage, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', authRequired: true },
    { id: 'learn', label: 'Lessons', authRequired: false },
    { id: 'quizzes', label: 'Quizzes', authRequired: false },
    { id: 'speaking', label: 'Speaking', authRequired: false },
    { id: 'translator', label: 'Translator', authRequired: false },
    { id: 'ai-tutor', label: 'BhashaBuddy', authRequired: false },
    { id: 'leaderboard', label: 'Leaderboard', authRequired: false }
  ];

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-purple-600 flex items-center justify-center text-white shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform">
              <span className="font-bold text-lg font-devanagari">सेतु</span>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                BhashaSetu
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks
            .filter(link => !link.authRequired || (link.authRequired && user))
            .map(link => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`transition-colors py-1 relative hover:text-slate-900 ${
                    isActive ? 'text-indigo-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                  )}
                </button>
              );
            })}
          {user?.role === 'admin' && (
            <button
              onClick={() => onNavigate('admin')}
              className={`flex items-center gap-1.5 transition-colors py-1 hover:text-slate-900 ${
                currentTab === 'admin' ? 'text-indigo-600 font-semibold' : 'text-slate-600'
              }`}
            >
              <Shield size={15} />
              <span>Admin</span>
            </button>
          )}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200/80"
              aria-label="Select target language"
            >
              <span>{SUPPORTED_LANGUAGES[currentLanguage].flag}</span>
              <span className="hidden sm:inline font-medium text-slate-800">
                {SUPPORTED_LANGUAGES[currentLanguage].name}
              </span>
              <span className="text-[11px] text-slate-500 font-devanagari">
                ({SUPPORTED_LANGUAGES[currentLanguage].nativeName})
              </span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Target Language
                </div>
                {(Object.keys(SUPPORTED_LANGUAGES) as Language[]).map(langKey => {
                  const item = SUPPORTED_LANGUAGES[langKey];
                  const isCurrent = currentLanguage === langKey;
                  return (
                    <button
                      key={langKey}
                      onClick={() => handleSelectLanguage(langKey)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                        isCurrent
                          ? 'bg-indigo-50 text-indigo-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{item.flag}</span>
                        <span>{item.name}</span>
                        <span className="text-slate-400 font-devanagari">({item.nativeName})</span>
                      </div>
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* User state / Quick profile or Login button */}
          {user ? (
            <div className="relative flex items-center gap-2">
              {/* Gamification chips */}
              <div className="hidden sm:flex items-center gap-2.5 text-xs">
                <div className="flex items-center gap-1 font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                  <Flame size={14} className="fill-amber-500 text-amber-500" />
                  <span className="tabular-nums">{user.streak}d</span>
                </div>
                <div className="flex items-center gap-1 font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200/60">
                  <Sparkles size={14} />
                  <span className="tabular-nums">{user.xp} XP</span>
                </div>
              </div>

              {/* User Dropdown trigger */}
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-2 text-xs font-medium text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-xs">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden md:inline max-w-[110px] truncate">{user.name}</span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-50">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {user.role}
                      </span>
                      <span className="text-[11px] text-slate-500">· {user.xp} XP</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('profile');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 text-left"
                  >
                    <UserIcon size={14} />
                    <span>My Profile & Settings</span>
                  </button>
                  {user.role === 'admin' && (
                    <button
                      onClick={() => {
                        onNavigate('admin');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-indigo-700 hover:bg-indigo-50 text-left font-medium"
                    >
                      <Shield size={14} />
                      <span>Admin Dashboard</span>
                    </button>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                      onNavigate('landing');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left border-t border-slate-100"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('auth')}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('auth')}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg shadow-sm shadow-indigo-200 transition-all whitespace-nowrap"
              >
                Start Learning
              </button>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2">
          {navLinks
            .filter(link => !link.authRequired || (link.authRequired && user))
            .map(link => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  currentTab === link.id
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          {user?.role === 'admin' && (
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-indigo-700 bg-indigo-50/50"
            >
              Admin Dashboard
            </button>
          )}
          {!user && (
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  onNavigate('auth');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center text-sm font-semibold text-white bg-indigo-600 rounded-lg shadow-sm"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
