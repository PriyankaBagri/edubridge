import React from 'react';
import { NavPath, Language } from '../types';
import { translations } from '../i18n/translations';

interface WelcomeHubProps {
  onNavigate: (path: NavPath) => void;
  lang: Language;
  isOffline: boolean;
  onToggleOffline: () => void;
  onForceSync: () => void;
}

export const WelcomeHub: React.FC<WelcomeHubProps> = ({
  onNavigate,
  lang,
  isOffline,
  onToggleOffline,
  onForceSync,
}) => {
  const t = translations[lang] || translations.en;

  return (
    <div className="flex flex-col w-full font-body p-6 max-w-[1280px] mx-auto animate-fade-in gap-8">
      {/* Top Header Banner */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-8 bg-white rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-indigo-600 font-bold uppercase tracking-widest text-xs mb-2 block">
            Next-Gen Learning Interface
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.welcomeBack}
          </h1>
          <p className="text-base text-slate-500 mt-2 max-w-xl leading-relaxed">
            {t.welcomeSubtitle}
          </p>
        </div>

        {/* Status Badge */}
        <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-extrabold text-xs uppercase tracking-wider transition-all shrink-0 ${
          isOffline 
            ? 'bg-rose-100 text-rose-800 border border-rose-200' 
            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
        }`}>
          <span className="material-symbols-outlined text-base">
            {isOffline ? 'cloud_off' : 'wifi'}
          </span>
          <span>
            {isOffline ? t.offlineContentSaved : t.systemOnlineSynced}
          </span>
        </div>
      </header>

      {/* Main Role Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Student Workspace Card (Span 8) */}
        <article className="col-span-1 md:col-span-8 bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all group relative overflow-hidden min-h-[340px]">
          {/* Background Decorative Gradient / Graphic */}
          <div className="absolute top-0 right-0 p-8 opacity-5 text-indigo-600 pointer-events-none">
            <span className="material-symbols-outlined text-[160px]">school</span>
          </div>

          <div className="flex flex-col gap-5 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <span className="material-symbols-outlined text-3xl">menu_book</span>
              </div>
              <div>
                <span className="text-indigo-600 font-bold uppercase tracking-widest text-[11px]">Primary Workspace</span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {t.studentWorkspace}
                </h2>
              </div>
            </div>

            <p className="text-slate-600 text-base max-w-md leading-relaxed">
              {t.studentDesc}
            </p>

            {/* Progress Goal Widget */}
            <div className="flex flex-col gap-2 mt-2 max-w-sm bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>{t.todaysGoal}</span>
                <span className="text-emerald-600 font-extrabold">75% Complete</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[75%] rounded-full transition-all duration-1000" />
              </div>
            </div>
          </div>

          <div className="mt-8 relative z-10 flex items-center gap-4">
            <button
              onClick={() => onNavigate('student-workspace')}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm h-12 px-8 rounded-2xl shadow-sm transition-all active:scale-[0.98] w-full sm:w-auto min-w-[200px]"
            >
              <span>{t.startLearning}</span>
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </article>

        {/* Teacher Hub Card (Span 4) - Bento Indigo Highlight Card */}
        <article className="col-span-1 md:col-span-4 bg-indigo-600 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-sm min-h-[340px] relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col gap-4 relative z-10">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-indigo-200 uppercase tracking-widest">Instructor Portal</span>
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <span className="material-symbols-outlined text-white text-xl">groups</span>
              </div>
            </div>

            <h2 className="font-heading text-2xl font-extrabold leading-tight">
              {t.teacherHub}
            </h2>

            <p className="text-sm text-indigo-100 leading-relaxed">
              {t.teacherDesc}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3 relative z-10">
            {/* Quick Stat */}
            <div className="flex items-center justify-between bg-white/10 p-3.5 rounded-2xl backdrop-blur-md border border-white/20">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-100">
                {t.pendingReviews}
              </span>
              <span className="font-heading text-2xl font-extrabold text-white">
                12
              </span>
            </div>

            <button
              onClick={() => onNavigate('teacher-analytics')}
              className="flex items-center justify-center gap-2 bg-white text-indigo-600 hover:bg-slate-100 font-extrabold text-sm h-12 px-6 rounded-2xl shadow-sm transition-all active:scale-[0.98] w-full mt-1"
            >
              <span>{t.openDashboard}</span>
              <span className="material-symbols-outlined text-lg">analytics</span>
            </button>
          </div>
        </article>

        {/* Data Synchronization Bottom Card (Span 12) - Bento Slate Dark Card */}
        <article className="col-span-1 md:col-span-12 bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm border border-slate-800">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-sm shrink-0">
              <span className="material-symbols-outlined text-3xl animate-spin" style={{ animationDuration: '6s' }}>
                sync
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-400">Edge Sync Status</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-white mt-0.5">
                {t.dataSynchronization}
              </h3>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                {t.lastSynced}: Today at 08:45 AM. {t.ensureConnectionNotice}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={onToggleOffline}
              className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm h-12 px-6 rounded-2xl border border-slate-700 shadow-xs transition-colors active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-lg">
                {isOffline ? 'wifi' : 'wifi_off'}
              </span>
              <span>{isOffline ? t.testOnline : t.testOffline}</span>
            </button>

            <button
              onClick={onForceSync}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm h-12 px-6 rounded-2xl shadow-sm transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-lg">cloud_sync</span>
              <span>{t.forceSync}</span>
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};
