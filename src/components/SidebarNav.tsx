import React from 'react';
import { NavPath, Language } from '../types';
import { translations } from '../i18n/translations';

interface SidebarNavProps {
  currentPath: NavPath;
  onNavigate: (path: NavPath) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  isOffline: boolean;
  pendingSyncCount: number;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  currentPath,
  onNavigate,
  lang,
  onLanguageChange,
  isOffline,
  pendingSyncCount,
}) => {
  const t = translations[lang] || translations.en;

  const navItems: { path: NavPath; icon: string; label: string; badge?: number }[] = [
    { path: 'student-workspace', icon: 'school', label: t.workspace },
    { path: 'teacher-analytics', icon: 'analytics', label: t.analytics },
    { path: 'sync-center', icon: 'sync', label: t.syncCenter, badge: pendingSyncCount > 0 ? pendingSyncCount : undefined },
    { path: 'badges', icon: 'military_tech', label: t.badges },
    { path: 'progress', icon: 'trending_up', label: t.progress },
    { path: 'stored-lessons', icon: 'download_for_offline', label: t.offlineLessons },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-white z-50 flex flex-col border-r border-slate-200 shadow-xs transition-all">
      {/* App Header Logo */}
      <div 
        className="p-5 flex items-center gap-3.5 mb-2 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => onNavigate('welcome')}
      >
        <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-sm font-bold text-xl">
          <span className="material-symbols-outlined text-2xl">school</span>
        </div>
        <div>
          <span className="font-heading font-extrabold text-2xl text-slate-900 tracking-tight block leading-none">
            {t.appName}
          </span>
          <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600 mt-1 block">
            {isOffline ? t.offline : t.online} Learning
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3.5 flex flex-col gap-2">
        <button
          onClick={() => onNavigate('welcome')}
          className={`flex items-center w-full min-h-[46px] px-4 rounded-2xl text-left font-semibold text-sm transition-all ${
            currentPath === 'welcome'
              ? 'bg-indigo-600 text-white font-bold shadow-sm'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <span className="material-symbols-outlined mr-3 text-xl">home</span>
          <span>{t.welcomeBack}</span>
        </button>

        <div className="my-1.5 border-t border-slate-200" />

        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          return (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className={`flex items-center justify-between w-full min-h-[46px] px-4 rounded-2xl text-left font-semibold text-sm transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center">
                <span className="material-symbols-outlined mr-3 text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`px-2.5 py-0.5 text-xs rounded-full font-extrabold ${
                  isActive ? 'bg-white text-indigo-600' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Language Selector Card */}
      <div className="p-4 m-3.5 border border-slate-200 bg-slate-50 rounded-2xl">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
          🌐 Language / भाषा
        </label>
        <select
          value={lang}
          onChange={(e) => onLanguageChange(e.target.value as Language)}
          className="w-full bg-white text-slate-900 text-sm font-bold rounded-xl px-3 py-2 border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none cursor-pointer"
        >
          <option value="en">English (English)</option>
          <option value="hi">हिंदी (Hindi)</option>
          <option value="mr">मराठी (Marathi)</option>
          <option value="ta">தமிழ் (Tamil)</option>
          <option value="te">తెలుగు (Telugu)</option>
        </select>
      </div>
    </aside>
  );
};
