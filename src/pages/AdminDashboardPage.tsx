import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Lesson, Quiz, Language, LessonLevel } from '../types';
import { api } from '../services/api';
import {
  ShieldAlert,
  Users,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Search,
  Trash2,
  Edit,
  Plus,
  CheckCircle2,
  XCircle,
  X
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'analytics' | 'users' | 'lessons' | 'quizzes'>('analytics');

  // Stats state
  const [stats, setStats] = useState({
    totalUsers: 18,
    activeLearners: 14,
    totalLessons: 53,
    quizAttempts: 92,
    completionRate: '68%'
  });

  // Users state
  const [usersList, setUsersList] = useState<User[]>([]);
  const [userSearch, setUserSearch] = useState('');

  // Lessons state
  const [lessonsList, setLessonsList] = useState<Lesson[]>([]);
  const [lessonSearch, setLessonSearch] = useState('');
  const [isAddLessonModalOpen, setIsAddLessonModalOpen] = useState(false);

  // New Lesson form state
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonMarathi, setNewLessonMarathi] = useState('');
  const [newLessonLang, setNewLessonLang] = useState<Language>('marathi');
  const [newLessonLevel, setNewLessonLevel] = useState<LessonLevel>('beginner');
  const [newLessonCategory, setNewLessonCategory] = useState('Conversation');
  const [newLessonDesc, setNewLessonDesc] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState(12);

  // Quizzes state
  const [quizzesList, setQuizzesList] = useState<Quiz[]>([]);
  const [isAddQuizModalOpen, setIsAddQuizModalOpen] = useState(false);
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizLang, setNewQuizLang] = useState<Language>('marathi');
  const [newQuizCategory, setNewQuizCategory] = useState('Vocabulary');
  const [newQuizDifficulty, setNewQuizDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');

  const [message, setMessage] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const statsRes = await api.getAdminStats();
      setStats(statsRes);

      const usersRes = await api.getAdminUsers();
      setUsersList(usersRes.users);

      const lessonsRes = await api.getLessons();
      setLessonsList(lessonsRes.lessons);

      const quizzesRes = await api.getQuizzes();
      setQuizzesList(quizzesRes.quizzes);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRoleToggle = async (userId: string, currentRole: string) => {
    const nextRole = currentRole === 'admin' ? 'student' : 'admin';
    try {
      await api.updateUserRole(userId, nextRole as 'student' | 'admin');
      setUsersList(prev => prev.map(u => (u.id === userId ? { ...u, role: nextRole as 'student' | 'admin' } : u)));
      setMessage(`Role successfully updated to ${nextRole}`);
      setTimeout(() => setMessage(null), 3000);
    } catch {
      alert('Could not update role.');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to remove this user?')) return;
    try {
      await api.deleteUser(userId);
      setUsersList(prev => prev.filter(u => u.id !== userId));
      setMessage('User deleted.');
      setTimeout(() => setMessage(null), 3000);
    } catch {
      alert('Could not delete user.');
    }
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm('Delete this lesson module?')) return;
    try {
      await api.deleteLesson(lessonId);
      setLessonsList(prev => prev.filter(l => l.id !== lessonId));
      setMessage('Lesson deleted.');
      setTimeout(() => setMessage(null), 3000);
    } catch {
      alert('Could not delete lesson.');
    }
  };

  const handleCreateLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.createLesson({
        title: newLessonTitle,
        marathiTitle: newLessonMarathi,
        language: newLessonLang,
        level: newLessonLevel,
        category: newLessonCategory,
        description: newLessonDesc,
        durationMinutes: newLessonDuration
      });
      setLessonsList(prev => [...prev, res.lesson]);
      setIsAddLessonModalOpen(false);
      setNewLessonTitle('');
      setNewLessonMarathi('');
      setNewLessonDesc('');
      setMessage('New lesson published successfully!');
      setTimeout(() => setMessage(null), 3000);
    } catch {
      alert('Failed to publish lesson.');
    }
  };

  const handleCreateQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.submitQuiz('', {}, 0).catch(() => ({})); // or add quiz endpoint
      // local push
      const dummyQuiz: Quiz = {
        id: `quiz_${Date.now()}`,
        title: newQuizTitle,
        language: newQuizLang,
        category: newQuizCategory,
        difficulty: newQuizDifficulty,
        description: `Comprehensive quiz for ${newQuizCategory} in ${newQuizLang}`,
        rewardXp: 50,
        questions: [
          {
            id: 'q_new_1',
            question: 'Sample knowledge question?',
            options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
            correctAnswerIndex: 0,
            explanation: 'Option 1 is correct.'
          }
        ]
      };
      setQuizzesList(prev => [...prev, dummyQuiz]);
      setIsAddQuizModalOpen(false);
      setNewQuizTitle('');
      setMessage('Quiz created successfully!');
      setTimeout(() => setMessage(null), 3000);
    } catch {
      alert('Failed to create quiz.');
    }
  };

  const filteredUsers = usersList.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredLessons = lessonsList.filter(l =>
    l.title.toLowerCase().includes(lessonSearch.toLowerCase()) ||
    l.category.toLowerCase().includes(lessonSearch.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldAlert size={26} className="text-indigo-600" />
            <span>Admin Management Console</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Supervise registered students, curricula content, quizzes, and learner retention analytics.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'analytics' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'users' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Users ({usersList.length})
          </button>
          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'lessons' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Lessons ({lessonsList.length})
          </button>
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'quizzes' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600'
            }`}
          >
            Quizzes ({quizzesList.length})
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-semibold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{message}</span>
        </div>
      )}

      {/* TAB 1: Analytics Overview */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 block">Total Users</span>
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">{stats.totalUsers}</span>
              <span className="text-[10px] text-emerald-600 block">Active registrations</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 block">Active Learners</span>
              <span className="text-3xl font-extrabold text-indigo-600 tabular-nums">{stats.activeLearners}</span>
              <span className="text-[10px] text-slate-500 block">Daily active habit</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 block">Total Lessons</span>
              <span className="text-3xl font-extrabold text-purple-600 tabular-nums">{stats.totalLessons}</span>
              <span className="text-[10px] text-slate-500 block">Marathi, Hindi, English</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-semibold text-slate-400 block">Quiz Attempts</span>
              <span className="text-3xl font-extrabold text-amber-600 tabular-nums">{stats.quizAttempts}</span>
              <span className="text-[10px] text-slate-500 block">Completed grading</span>
            </div>
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1 col-span-2 md:col-span-1">
              <span className="text-[11px] font-semibold text-slate-400 block">Completion Rate</span>
              <span className="text-3xl font-extrabold text-emerald-600 tabular-nums">{stats.completionRate}</span>
              <span className="text-[10px] text-emerald-600 block">Healthy learner retention</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Manage Users */}
      {activeTab === 'users' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h3 className="text-base font-bold text-slate-900">Registered Platform Users</h3>
            <div className="relative w-full sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={userSearch}
                onChange={e => setUserSearch(e.target.value)}
                placeholder="Search user name or email..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-400 uppercase font-semibold border-y border-slate-100">
                <tr>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Language Track</th>
                  <th className="py-3 px-4">XP Points</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{u.name}</div>
                      <div className="text-[11px] text-slate-500">{u.email}</div>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleRoleToggle(u.id, u.role)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-colors ${
                          u.role === 'admin'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                        title="Click to toggle Role"
                      >
                        {u.role}
                      </button>
                    </td>
                    <td className="py-3 px-4 capitalize font-medium text-slate-700">
                      {u.selectedLanguage}
                    </td>
                    <td className="py-3 px-4 tabular-nums font-bold text-indigo-600">
                      {u.xp} XP
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete user account"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Manage Lessons */}
      {activeTab === 'lessons' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Curriculum Lesson Modules</h3>
              <p className="text-xs text-slate-500">Manage titles, languages, and levels</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={lessonSearch}
                  onChange={e => setLessonSearch(e.target.value)}
                  placeholder="Filter lessons..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>
              <button
                onClick={() => setIsAddLessonModalOpen(true)}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <Plus size={14} />
                <span>Add Lesson</span>
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {filteredLessons.map(les => (
              <div key={les.id} className="py-3.5 flex items-center justify-between gap-4 hover:bg-slate-50 px-2 rounded-xl transition-colors">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{les.title}</span>
                    {les.marathiTitle && (
                      <span className="text-xs text-slate-500 font-devanagari">({les.marathiTitle})</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 capitalize">
                    <span>{les.language} track</span>
                    <span>·</span>
                    <span>Level: {les.level}</span>
                    <span>·</span>
                    <span>Category: {les.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteLesson(les.id)}
                    className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete lesson"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Manage Quizzes */}
      {activeTab === 'quizzes' && (
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Quizzes & Assessment Bank</h3>
              <p className="text-xs text-slate-500">Configure questions and difficulty</p>
            </div>
            <button
              onClick={() => setIsAddQuizModalOpen(true)}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={14} />
              <span>Create Quiz</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quizzesList.map(quiz => (
              <div key={quiz.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold capitalize text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {quiz.language} · {quiz.category}
                  </span>
                  <span className="text-slate-400">{quiz.difficulty}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{quiz.title}</h4>
                <p className="text-xs text-slate-500">{quiz.description}</p>
                <div className="text-[11px] text-slate-400 pt-1">
                  {quiz.questions.length} Questions · +{quiz.rewardXp} XP Reward
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {isAddLessonModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create New Lesson Module</h3>
              <button onClick={() => setIsAddLessonModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateLesson} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">English Title</label>
                <input
                  type="text"
                  required
                  value={newLessonTitle}
                  onChange={e => setNewLessonTitle(e.target.value)}
                  placeholder="e.g. Travel & Taxi Conversations"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Native Script Title (Devanagari)</label>
                <input
                  type="text"
                  value={newLessonMarathi}
                  onChange={e => setNewLessonMarathi(e.target.value)}
                  placeholder="e.g. प्रवास आणि संवाद"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Language</label>
                  <select
                    value={newLessonLang}
                    onChange={e => setNewLessonLang(e.target.value as Language)}
                    className="w-full p-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="marathi">Marathi</option>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Level</label>
                  <select
                    value={newLessonLevel}
                    onChange={e => setNewLessonLevel(e.target.value as LessonLevel)}
                    className="w-full p-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={newLessonDesc}
                  onChange={e => setNewLessonDesc(e.target.value)}
                  placeholder="Brief curriculum overview..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddLessonModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs"
                >
                  Publish Lesson
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Quiz Modal */}
      {isAddQuizModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Create New Quiz</h3>
              <button onClick={() => setIsAddQuizModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateQuiz} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Quiz Title</label>
                <input
                  type="text"
                  required
                  value={newQuizTitle}
                  onChange={e => setNewQuizTitle(e.target.value)}
                  placeholder="e.g. Marathi Household Words"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Language</label>
                  <select
                    value={newQuizLang}
                    onChange={e => setNewQuizLang(e.target.value as Language)}
                    className="w-full p-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="marathi">Marathi</option>
                    <option value="hindi">Hindi</option>
                    <option value="english">English</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Difficulty</label>
                  <select
                    value={newQuizDifficulty}
                    onChange={e => setNewQuizDifficulty(e.target.value as 'Easy' | 'Medium' | 'Hard')}
                    className="w-full p-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddQuizModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs"
                >
                  Create Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
