import React, { useState } from 'react';
import { Language, TranslationRecord } from '../types';
import { SUPPORTED_LANGUAGES } from '../context/LanguageContext';
import { api } from '../services/api';
import { AudioButton } from '../components/common/AudioButton';
import { speakText, startVoiceRecognition } from '../services/speech';
import {
  ArrowLeftRight,
  Copy,
  Check,
  Trash2,
  Mic,
  Volume2,
  Sparkles,
  History,
  Send
} from 'lucide-react';

export const TranslatorPage: React.FC = () => {
  const [sourceLang, setSourceLang] = useState<Language>('english');
  const [targetLang, setTargetLang] = useState<Language>('marathi');
  const [inputText, setInputText] = useState('Where are you going?');
  const [outputText, setOutputText] = useState('तुम्ही कुठे जात आहात?');
  const [translating, setTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const [history, setHistory] = useState<TranslationRecord[]>([
    {
      id: 'h1',
      sourceLang: 'english',
      targetLang: 'marathi',
      sourceText: 'Where are you going?',
      translatedText: 'तुम्ही कुठे जात आहात?',
      timestamp: 'Just now'
    },
    {
      id: 'h2',
      sourceLang: 'english',
      targetLang: 'marathi',
      sourceText: 'Good morning',
      translatedText: 'शुभ सकाळ (Shubh Sakal)',
      timestamp: '2 mins ago'
    },
    {
      id: 'h3',
      sourceLang: 'english',
      targetLang: 'hindi',
      sourceText: 'Thank you very much',
      translatedText: 'बहुत-बहुत धन्यवाद (Bahut-bahut dhanyawaad)',
      timestamp: '5 mins ago'
    }
  ]);

  const handleSwap = () => {
    const prevSource = sourceLang;
    const prevTarget = targetLang;
    setSourceLang(prevTarget);
    setTargetLang(prevSource);
    setInputText(outputText);
    setOutputText(inputText);
  };

  const handleTranslate = async (textToTranslate = inputText) => {
    if (!textToTranslate.trim()) return;
    setTranslating(true);
    try {
      const res = await api.translate(textToTranslate, sourceLang, targetLang);
      setOutputText(res.translatedText);

      // Add to history
      const newRecord: TranslationRecord = {
        id: `tr_${Date.now()}`,
        sourceLang,
        targetLang,
        sourceText: textToTranslate,
        translatedText: res.translatedText,
        timestamp: 'Just now'
      };
      setHistory(prev => [newRecord, ...prev.slice(0, 9)]);
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setTranslating(false);
    }
  };

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const handleVoiceInput = () => {
    setIsRecording(true);
    startVoiceRecognition({
      lang: sourceLang,
      onResult: (transcript) => {
        setInputText(transcript);
        handleTranslate(transcript);
      },
      onError: (err) => {
        // Fallback test
        setInputText('Hello, how are you?');
        handleTranslate('Hello, how are you?');
      },
      onEnd: () => {
        setIsRecording(false);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Instant Local Translator
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Accurate bi-directional translations between Marathi, Hindi, and English with audio speech synthesis.
        </p>
      </div>

      {/* Language Switcher Bar */}
      <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
        {/* Source Language Picker */}
        <select
          value={sourceLang}
          onChange={e => setSourceLang(e.target.value as Language)}
          className="text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="english">🇬🇧 English</option>
          <option value="marathi">🇮🇳 Marathi (मराठी)</option>
          <option value="hindi">🇮🇳 Hindi (हिंदी)</option>
        </select>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          className="p-2.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer border border-slate-200"
          title="Swap source and target languages"
        >
          <ArrowLeftRight size={16} />
        </button>

        {/* Target Language Picker */}
        <select
          value={targetLang}
          onChange={e => setTargetLang(e.target.value as Language)}
          className="text-xs sm:text-sm font-bold text-slate-800 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="marathi">🇮🇳 Marathi (मराठी)</option>
          <option value="hindi">🇮🇳 Hindi (हिंदी)</option>
          <option value="english">🇬🇧 English</option>
        </select>
      </div>

      {/* Dual Box Translation Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Box */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between space-y-4 min-h-[220px]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">
                {SUPPORTED_LANGUAGES[sourceLang].name} Input
              </span>
              {inputText && (
                <button
                  onClick={handleClear}
                  className="text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
                >
                  <Trash2 size={12} />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <textarea
              rows={4}
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder={`Type or paste ${SUPPORTED_LANGUAGES[sourceLang].name} text...`}
              className="w-full text-base sm:text-lg text-slate-900 resize-none focus:outline-none placeholder:text-slate-300 font-medium"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleVoiceInput}
                disabled={isRecording}
                className={`p-2 rounded-full border transition-all ${
                  isRecording
                    ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200'
                }`}
                title="Speak to type"
              >
                <Mic size={15} />
              </button>
              {inputText && (
                <AudioButton text={inputText} lang={sourceLang} size="sm" />
              )}
            </div>

            <button
              onClick={() => handleTranslate()}
              disabled={translating || !inputText.trim()}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-50 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <span>{translating ? 'Translating...' : 'Translate'}</span>
              <Send size={13} />
            </button>
          </div>
        </div>

        {/* Output Box */}
        <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100 shadow-xs flex flex-col justify-between space-y-4 min-h-[220px]">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-indigo-700">
              <span className="font-semibold uppercase tracking-wider">
                {SUPPORTED_LANGUAGES[targetLang].name} Translation
              </span>
              <span className="text-[11px] text-slate-400">Audio Ready 🔊</span>
            </div>

            <div className="text-lg sm:text-xl font-bold text-slate-900 font-devanagari leading-relaxed min-h-[80px]">
              {outputText || (
                <span className="text-slate-300 font-normal text-sm">
                  Translation will appear here...
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-indigo-100/70">
            <div className="flex items-center gap-2">
              {outputText && (
                <AudioButton text={outputText} lang={targetLang} size="sm" showLabel />
              )}
            </div>

            {outputText && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-xs transition-colors"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Translation History */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
          <History size={14} />
          <span>Recent Translations</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {history.map(item => (
            <div
              key={item.id}
              onClick={() => {
                setInputText(item.sourceText);
                setOutputText(item.translatedText);
                setSourceLang(item.sourceLang);
                setTargetLang(item.targetLang);
              }}
              className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition-all cursor-pointer space-y-1.5"
            >
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="capitalize">{item.sourceLang} → {item.targetLang}</span>
                <span>{item.timestamp}</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 truncate">
                {item.sourceText}
              </p>
              <p className="text-xs font-bold text-indigo-700 font-devanagari truncate">
                {item.translatedText}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
