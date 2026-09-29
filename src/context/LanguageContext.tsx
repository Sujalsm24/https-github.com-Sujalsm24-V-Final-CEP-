import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { useAuth } from './AuthContext';

interface LanguageMeta {
  code: Language;
  name: string;
  nativeName: string;
  script: string;
  flag: string;
  sampleGreeting: string;
  totalLessons: number;
}

export const SUPPORTED_LANGUAGES: Record<Language, LanguageMeta> = {
  marathi: {
    code: 'marathi',
    name: 'Marathi',
    nativeName: 'मराठी',
    script: 'Devanagari',
    flag: '🇮🇳',
    sampleGreeting: 'नमस्कार',
    totalLessons: 22
  },
  hindi: {
    code: 'hindi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    script: 'Devanagari',
    flag: '🇮🇳',
    sampleGreeting: 'नमस्ते',
    totalLessons: 16
  },
  english: {
    code: 'english',
    name: 'English',
    nativeName: 'English',
    script: 'Latin',
    flag: '🇬🇧',
    sampleGreeting: 'Hello',
    totalLessons: 15
  }
};

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  languageMeta: LanguageMeta;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('marathi');

  useEffect(() => {
    if (user?.selectedLanguage) {
      setCurrentLanguage(user.selectedLanguage);
    }
  }, [user]);

  const languageMeta = SUPPORTED_LANGUAGES[currentLanguage];

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        setLanguage: setCurrentLanguage,
        languageMeta
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
