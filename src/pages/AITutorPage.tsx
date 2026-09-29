import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { ChatMessage, Language } from '../types';
import { api } from '../services/api';
import { AudioButton } from '../components/common/AudioButton';
import { startVoiceRecognition } from '../services/speech';
import {
  Bot,
  Send,
  Mic,
  RotateCcw,
  Sparkles,
  User,
  Copy,
  Check,
  HelpCircle
} from 'lucide-react';

export const AITutorPage: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: `नमस्कार! I am **BhashaBuddy 🤖**, your personal AI language tutor for Marathi, Hindi, and English.

How can I help you today? You can ask me how to say phrases, explain grammar rules, help with Barakhadi, or practice real-life market conversations!`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const suggestedQuestions = [
    'How do I say Good Morning in Marathi?',
    'What is the difference between "तुम्ही" and "तू"?',
    'How do I ask for directions to the railway station?',
    'Explain the Marathi Barakhadi for the letter "क".',
    'Teach me common Marathi phrases for bargaining in a vegetable market.'
  ];

  const handleSendMessage = async (textToSend = inputText) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const res = await api.askBhashaBuddy(userMsg.text, currentLanguage);
      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: res.reply,
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `bot_err_${Date.now()}`,
        sender: 'assistant',
        text: 'I apologize, I encountered a temporary connection issue. Please try asking again!',
        timestamp: 'Just now'
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `init_${Date.now()}`,
        sender: 'assistant',
        text: `Conversation cleared! How can I assist your ${SUPPORTED_LANGUAGES[currentLanguage].name} learning today? 🌟`,
        timestamp: 'Just now'
      }
    ]);
  };

  const handleVoiceInput = () => {
    setIsRecording(true);
    startVoiceRecognition({
      lang: 'english',
      onResult: (transcript) => {
        setInputText(transcript);
        handleSendMessage(transcript);
      },
      onError: () => {
        const sample = 'How do I say Good Morning in Marathi?';
        setInputText(sample);
        handleSendMessage(sample);
      },
      onEnd: () => {
        setIsRecording(false);
      }
    });
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-purple-200">
            <Bot size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>BhashaBuddy 🤖</span>
              <span className="text-[11px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                AI Tutor
              </span>
            </h1>
            <p className="text-xs text-slate-500">
              Native linguistic explanations, transliterations, and conversation coaching.
            </p>
          </div>
        </div>

        {/* Clear & Language Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleClearChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Suggested Questions Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-semibold shrink-0">Try asking:</span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(q)}
            className="px-3 py-1.5 rounded-full bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 font-medium whitespace-nowrap transition-colors border border-indigo-200/60 shrink-0"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Thread Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 min-h-[440px] max-h-[580px] overflow-y-auto space-y-4">
        {messages.map(msg => {
          const isBot = msg.sender === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              {isBot && (
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                  <Bot size={16} />
                </div>
              )}

              <div
                className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 space-y-2 text-xs sm:text-sm leading-relaxed ${
                  isBot
                    ? 'bg-slate-50 text-slate-900 border border-slate-200/80'
                    : 'bg-indigo-600 text-white rounded-tr-xs'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">
                  {msg.text}
                </div>

                {isBot && (
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                    <AudioButton text={msg.text} lang={currentLanguage} size="sm" showLabel />

                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.text)}
                      className="p-1 text-slate-400 hover:text-slate-700 transition-colors"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    </button>
                  </div>
                )}
              </div>

              {!isBot && (
                <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-1 text-xs font-bold">
                  {user?.name?.charAt(0) || <User size={15} />}
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0">
              <Bot size={16} />
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-2 text-xs text-slate-500">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
              <span>BhashaBuddy is formulating a cultural answer...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input box */}
      <div className="flex items-center gap-2 p-2 bg-white rounded-2xl border border-slate-300 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
        <button
          type="button"
          onClick={handleVoiceInput}
          disabled={isRecording}
          className={`p-2.5 rounded-xl border transition-all ${
            isRecording
              ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
          }`}
          title="Speak into microphone"
        >
          <Mic size={18} />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSendMessage();
            }
          }}
          placeholder="Ask anything in English or local language (e.g. 'How do I say Good Morning in Marathi?')"
          className="flex-1 text-xs sm:text-sm text-slate-900 bg-transparent px-2 focus:outline-none"
        />

        <button
          type="button"
          onClick={() => handleSendMessage()}
          disabled={loading || !inputText.trim()}
          className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white disabled:opacity-50 transition-colors shadow-xs cursor-pointer"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};
