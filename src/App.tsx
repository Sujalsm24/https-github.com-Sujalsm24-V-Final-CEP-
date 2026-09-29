import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';

// Pages
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { DashboardPage } from './pages/DashboardPage';
import { LessonsCatalogPage } from './pages/LessonsCatalogPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { SpeakingPracticePage } from './pages/SpeakingPracticePage';
import { TranslatorPage } from './pages/TranslatorPage';
import { AITutorPage } from './pages/AITutorPage';
import { ProgressPage } from './pages/ProgressPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Language } from './types';

const MainApp: React.FC = () => {
  const { user, loading } = useAuth();
  const { setLanguage } = useLanguage();
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

  // If user is logged in and starts on landing, transition to dashboard
  const handleNavigate = (tab: string) => {
    setSelectedLessonId(null);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setCurrentTab('lesson-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectLanguageAndLearn = (lang: Language) => {
    setLanguage(lang);
    if (user) {
      handleNavigate('learn');
    } else {
      handleNavigate('auth');
    }
  };

  // Determine if sidebar should be shown (in app screens for logged in users, or explicit app tabs)
  const isAppView = [
    'dashboard',
    'learn',
    'lesson-detail',
    'quizzes',
    'speaking',
    'translator',
    'ai-tutor',
    'progress',
    'leaderboard',
    'profile',
    'admin'
  ].includes(currentTab);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl font-bold font-devanagari shadow-md shadow-indigo-200 animate-pulse">
            सेतु
          </div>
          <span className="text-xs font-semibold text-slate-500">Loading BhashaSetu...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased">
      {/* Top Bar Navigation */}
      <Navbar currentTab={currentTab} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <div className="flex-1 flex w-full">
        {/* Desktop Sidebar if in authenticated/app view */}
        {isAppView && user && (
          <Sidebar currentTab={currentTab} onNavigate={handleNavigate} />
        )}

        {/* Content Viewport */}
        <main className={`flex-1 overflow-x-hidden ${isAppView ? 'p-4 sm:p-6 lg:p-8' : ''}`}>
          {currentTab === 'landing' && (
            <LandingPage
              onNavigate={handleNavigate}
              onSelectLanguageAndLearn={handleSelectLanguageAndLearn}
            />
          )}

          {currentTab === 'auth' && (
            <AuthPage onSuccess={() => handleNavigate('dashboard')} />
          )}

          {currentTab === 'dashboard' && (
            <DashboardPage
              onNavigate={handleNavigate}
              onSelectLesson={handleSelectLesson}
            />
          )}

          {currentTab === 'learn' && (
            <LessonsCatalogPage onSelectLesson={handleSelectLesson} />
          )}

          {currentTab === 'lesson-detail' && selectedLessonId && (
            <LessonDetailPage
              lessonId={selectedLessonId}
              onBack={() => handleNavigate('learn')}
              onLessonCompleted={() => {}}
            />
          )}

          {currentTab === 'quizzes' && <QuizzesPage />}

          {currentTab === 'speaking' && <SpeakingPracticePage />}

          {currentTab === 'translator' && <TranslatorPage />}

          {currentTab === 'ai-tutor' && <AITutorPage />}

          {currentTab === 'progress' && <ProgressPage />}

          {currentTab === 'leaderboard' && <LeaderboardPage />}

          {currentTab === 'profile' && <ProfilePage />}

          {currentTab === 'admin' && (
            user?.role === 'admin' ? (
              <AdminDashboardPage />
            ) : (
              <div className="py-20 text-center space-y-3">
                <p className="text-sm font-semibold text-rose-600">Access Restricted</p>
                <p className="text-xs text-slate-500">Administrator role required to access this panel.</p>
                <button
                  onClick={() => handleNavigate('dashboard')}
                  className="px-4 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 rounded-xl"
                >
                  Return to Dashboard
                </button>
              </div>
            )
          )}

          {![
            'landing',
            'auth',
            'dashboard',
            'learn',
            'lesson-detail',
            'quizzes',
            'speaking',
            'translator',
            'ai-tutor',
            'progress',
            'leaderboard',
            'profile',
            'admin'
          ].includes(currentTab) && (
            <NotFoundPage onNavigateHome={() => handleNavigate('landing')} />
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation (only in app views) */}
      {isAppView && (
        <MobileNav currentTab={currentTab} onNavigate={handleNavigate} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </AuthProvider>
  );
}
