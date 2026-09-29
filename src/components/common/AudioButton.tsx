import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakText } from '../../services/speech';
import { Language } from '../../types';

interface AudioButtonProps {
  text: string;
  lang?: Language;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabel?: boolean;
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  lang = 'marathi',
  size = 'md',
  className = '',
  showLabel = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;

    setIsPlaying(true);
    speakText(text, lang, () => {
      setIsPlaying(false);
    });
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base'
  }[size];

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 22
  }[size];

  return (
    <button
      type="button"
      onClick={handleSpeak}
      title={`Listen to pronunciation of "${text}"`}
      aria-label={`Pronounce ${text}`}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full transition-colors active:scale-95 ${
        isPlaying
          ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300'
          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-900 border border-indigo-200/60'
      } ${sizeClasses} ${className}`}
    >
      {isPlaying ? (
        <Volume2 size={iconSizes} className="animate-pulse" />
      ) : (
        <Volume2 size={iconSizes} />
      )}
      {showLabel && <span className="font-medium">{isPlaying ? 'Playing...' : 'Listen'}</span>}
    </button>
  );
};
