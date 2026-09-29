import { Language } from '../types';

// Web Audio API synthesized sound effects
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    
    // First high note
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now); // C5
    osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5
    gain1.gain.setValueAtTime(0.18, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Second celebratory note
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(783.99, now + 0.12); // G5
    gain2.gain.setValueAtTime(0.2, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.45);
  } catch {
    // Graceful silent fail
  }
}

export function playErrorBuzz() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now); // Low A3
    osc.frequency.setValueAtTime(180, now + 0.1);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  } catch {
    // Graceful silent fail
  }
}

export function speakText(text: string, lang: Language = 'marathi', onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return;
  }

  // Cancel prior active speech
  window.speechSynthesis.cancel();

  // Strip transliteration in parentheses e.g. "पाणी (Paani)" -> "पाणी"
  const cleanText = text.replace(/\([^)]*\)/g, '').trim();

  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Map to BCP-47 locale tags
  let locale = 'mr-IN';
  if (lang === 'hindi') locale = 'hi-IN';
  if (lang === 'english') locale = 'en-IN';

  utterance.lang = locale;
  utterance.rate = 0.9; // Slightly slower for language learners
  utterance.pitch = 1.0;

  // Try finding voice with matching language or regional fallback
  const voices = window.speechSynthesis.getVoices();
  const directVoice = voices.find(v => v.lang.toLowerCase().startsWith(locale.toLowerCase().slice(0, 2)));
  if (directVoice) {
    utterance.voice = directVoice;
  }

  utterance.onend = () => {
    onEnd?.();
  };

  utterance.onerror = () => {
    onEnd?.();
  };

  window.speechSynthesis.speak(utterance);
}

// Compute normalized accuracy % between spoken recognition and target phrase
export function calculateAccuracy(spoken: string, target: string): number {
  const cleanSpoken = spoken.toLowerCase().replace(/[.,!?;:'"()]/g, '').trim();
  const cleanTarget = target.toLowerCase().replace(/[.,!?;:'"()]/g, '').trim();

  if (!cleanSpoken || !cleanTarget) return 0;
  if (cleanSpoken === cleanTarget) return 100;

  // Substring or inclusion check
  if (cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken)) {
    return 92;
  }

  // Word token overlap
  const spokenWords = cleanSpoken.split(/\s+/);
  const targetWords = cleanTarget.split(/\s+/);
  let matches = 0;

  for (const tw of targetWords) {
    if (spokenWords.includes(tw)) {
      matches++;
    }
  }

  if (targetWords.length > 0) {
    const wordRatio = matches / targetWords.length;
    if (wordRatio >= 0.8) return Math.round(wordRatio * 100);
  }

  // Levenshtein distance calculation
  const m = cleanSpoken.length;
  const n = cleanTarget.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (cleanSpoken[i - 1] === cleanTarget[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  const distance = dp[m][n];
  const maxLen = Math.max(m, n);
  const similarity = Math.max(0, Math.round(((maxLen - distance) / maxLen) * 100));

  return similarity;
}

// Check speech recognition support
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

// Speech recognition helper
export function startVoiceRecognition({
  lang = 'marathi',
  onResult,
  onError,
  onEnd
}: {
  lang?: Language;
  onResult: (transcript: string) => void;
  onError: (error: string) => void;
  onEnd: () => void;
}): { stop: () => void } {
  if (!isSpeechRecognitionSupported()) {
    onError('Speech recognition is not supported in this browser. You can type or use fallback testing.');
    onEnd();
    return { stop: () => {} };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognitionClass();

  let locale = 'mr-IN';
  if (lang === 'hindi') locale = 'hi-IN';
  if (lang === 'english') locale = 'en-US';

  recognition.lang = locale;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  recognition.onerror = (event: any) => {
    onError(event.error || 'Speech recognition encountered an issue.');
    onEnd();
  };

  recognition.onend = () => {
    onEnd();
  };

  try {
    recognition.start();
  } catch (err) {
    onError('Could not initialize microphone access.');
    onEnd();
  }

  return {
    stop: () => {
      try {
        recognition.stop();
      } catch {
        // ignore
      }
    }
  };
}
