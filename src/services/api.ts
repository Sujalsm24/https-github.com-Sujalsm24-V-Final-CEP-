import { User, Lesson, Quiz, Language } from '../types';

const TOKEN_KEY = 'bhashasetu_auth_token';

export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string | null) {
  if (typeof window === 'undefined') return;
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_KEY);
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(endpoint, {
    ...options,
    headers
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: 'An unexpected error occurred.' }));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Auth
  async register(data: { name: string; email: string; password: string; confirmPassword?: string; preferredLanguage?: Language }): Promise<{ token: string; user: User }> {
    return request<{ token: string; user: User }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async login(data: { email: string; password: string }): Promise<{ token: string; user: User }> {
    return request<{ token: string; user: User }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async getMe(): Promise<{ user: User }> {
    return request<{ user: User }>('/api/auth/me');
  },

  async updateProfile(data: { name?: string; selectedLanguage?: Language; dailyGoalMinutes?: number }): Promise<{ user: User }> {
    return request<{ user: User }>('/api/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
  },

  // Lessons
  async getLessons(params?: { language?: string; level?: string }): Promise<{ lessons: Lesson[] }> {
    const query = new URLSearchParams();
    if (params?.language) query.set('language', params.language);
    if (params?.level) query.set('level', params.level);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return request<{ lessons: Lesson[] }>(`/api/lessons${qs}`);
  },

  async getLesson(id: string): Promise<{ lesson: Lesson }> {
    return request<{ lesson: Lesson }>(`/api/lessons/${id}`);
  },

  async createLesson(lesson: Partial<Lesson>): Promise<{ lesson: Lesson }> {
    return request<{ lesson: Lesson }>('/api/lessons', {
      method: 'POST',
      body: JSON.stringify(lesson)
    });
  },

  async updateLesson(id: string, lesson: Partial<Lesson>): Promise<{ lesson: Lesson }> {
    return request<{ lesson: Lesson }>(`/api/lessons/${id}`, {
      method: 'PUT',
      body: JSON.stringify(lesson)
    });
  },

  async deleteLesson(id: string): Promise<{ message: string; lesson: Lesson }> {
    return request<{ message: string; lesson: Lesson }>(`/api/lessons/${id}`, {
      method: 'DELETE'
    });
  },

  // Quizzes
  async getQuizzes(language?: string): Promise<{ quizzes: Quiz[] }> {
    const qs = language ? `?language=${language}` : '';
    return request<{ quizzes: Quiz[] }>(`/api/quizzes${qs}`);
  },

  async getQuiz(id: string): Promise<{ quiz: Quiz }> {
    return request<{ quiz: Quiz }>(`/api/quizzes/${id}`);
  },

  async submitQuiz(id: string, answers: Record<string, number>, timeTakenSeconds: number) {
    return request<{
      correctCount: number;
      totalQuestions: number;
      percentage: number;
      xpEarned: number;
      passed: boolean;
    }>(`/api/quizzes/${id}/submit`, {
      method: 'POST',
      body: JSON.stringify({ answers, timeTakenSeconds })
    });
  },

  // Progress
  async completeLesson(lessonId: string, timeSpentMinutes = 10) {
    return request<{ success: boolean; user: Partial<User>; xpEarned: number }>('/api/progress/complete-lesson', {
      method: 'POST',
      body: JSON.stringify({ lessonId, timeSpentMinutes })
    });
  },

  // Leaderboard
  async getLeaderboard() {
    return request<{ leaderboard: Array<{ id: string; name: string; xp: number; streak: number; selectedLanguage: Language; rank: number }> }>('/api/leaderboard');
  },

  // Translator
  async translate(text: string, sourceLang: Language, targetLang: Language) {
    return request<{ translatedText: string; provider: string }>('/api/translate', {
      method: 'POST',
      body: JSON.stringify({ text, sourceLang, targetLang })
    });
  },

  // AI Assistant (BhashaBuddy)
  async askBhashaBuddy(message: string, targetLanguage: Language) {
    return request<{ reply: string; provider: string }>('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, targetLanguage })
    });
  },

  // Admin
  async getAdminStats() {
    return request<{
      totalUsers: number;
      activeLearners: number;
      totalLessons: number;
      quizAttempts: number;
      completionRate: string;
    }>('/api/admin/stats');
  },

  async getAdminUsers() {
    return request<{ users: User[] }>('/api/admin/users');
  },

  async deleteUser(id: string) {
    return request<{ message: string; id: string }>(`/api/admin/users/${id}`, {
      method: 'DELETE'
    });
  },

  async updateUserRole(id: string, role: 'student' | 'admin') {
    return request<{ message: string; user: { id: string; role: string } }>(`/api/admin/users/${id}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role })
    });
  }
};
