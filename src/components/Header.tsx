import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface HeaderProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  xp: number;
  streakDays: number;
  onOpenAiTutor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onLanguageChange,
  isOffline,
  onToggleOffline,
  xp,
  streakDays,
  onOpenAiTutor,
}) => {
  const t = translations[lang] || translations.en;

  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-white/90 backdrop-blur-md z-40 px-6 flex items-center justify-between border-b border-slate-200 shadow-xs">
      {/* Left: Status & Rewards */}
      <div className="flex items-center gap-4">
        {/* Connectivity Mode Pill - Clickable to Toggle */}
        <button
          onClick={onToggleOffline}
          title="Click to toggle Offline / Online test mode"
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            isOffline
              ? 'bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
          }`}
        >
          <span className="material-symbols-outlined text-sm">
            {isOffline ? 'wifi_off' : 'check_circle'}
          </span>
          <span>{isOffline ? t.offline : t.online}</span>
        </button>

        {/* Gamification Stats */}
        <div className="flex items-center gap-3 ml-2">
          <div className="flex items-center gap-1.5 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200/80 font-bold text-xs text-slate-800">
            <span className="material-symbols-outlined text-amber-500 text-lg animate-bounce">
              bolt
            </span>
            <span>{xp.toLocaleString()} XP</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200/80 font-bold text-xs text-slate-800">
            <span className="material-symbols-outlined text-indigo-600 text-lg">
              local_fire_department
            </span>
            <span>{streakDays} Days</span>
          </div>
        </div>
      </div>

      {/* Right: AI Assistant, Notifications, Language, Profile */}
      <div className="flex items-center gap-3">
        {/* Ask AI Assistant Button */}
        <button
          onClick={onOpenAiTutor}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-full transition-all shadow-xs"
        >
          <span className="material-symbols-outlined text-sm">smart_toy</span>
          <span className="hidden sm:inline">{t.askAiTutor}</span>
        </button>

        {/* Language Select Quick Dropdown */}
        <div className="relative hidden md:block">
          <select
            value={lang}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="bg-slate-100 text-slate-800 text-xs font-bold rounded-full px-3 py-1.5 border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none cursor-pointer"
          >
            <option value="en">EN</option>
            <option value="hi">HI (हिंदी)</option>
            <option value="mr">MR (मराठी)</option>
            <option value="ta">TA (தமிழ்)</option>
            <option value="te">TE (తెలుగు)</option>
          </select>
        </div>

        {/* Notifications Icon */}
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
          <span className="material-symbols-outlined text-xl">notifications</span>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full" />
        </button>

        {/* Profile Avatar */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="text-right hidden lg:block">
            <div className="text-xs font-bold text-slate-900">{t.studentName}</div>
            <div className="text-[11px] font-medium text-slate-500">{t.levelScholar}</div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
            alt="Profile"
            className="w-9 h-9 rounded-full border-2 border-indigo-600 object-cover shadow-xs"
          />
        </div>
      </div>
    </header>
  );
};
