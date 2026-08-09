import React, { useState } from 'react';
import { SyncQueueItem, Language } from '../types';
import { translations } from '../i18n/translations';

interface SyncCenterProps {
  queue: SyncQueueItem[];
  lang: Language;
  onSyncAll: () => void;
  onSyncItem: (id: string) => void;
  isOffline: boolean;
}

export const SyncCenter: React.FC<SyncCenterProps> = ({
  queue,
  lang,
  onSyncAll,
  onSyncItem,
  isOffline,
}) => {
  const t = translations[lang] || translations.en;

  const [autoSync, setAutoSync] = useState(true);
  const [isSyncingAll, setIsSyncingAll] = useState(false);

  const handleSyncClick = () => {
    setIsSyncingAll(true);
    setTimeout(() => {
      onSyncAll();
      setIsSyncingAll(false);
    }, 1200);
  };

  const pendingCount = queue.filter((item) => item.status === 'pending').length;

  return (
    <div className="flex flex-col w-full font-body p-4 sm:p-6 max-w-[1240px] mx-auto animate-fade-in gap-6 bg-[#f8fafc] min-h-screen">
      {/* Offline Mode Status Banner */}
      <div className={`rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs border ${
        isOffline 
          ? 'bg-rose-50 border-rose-200 text-rose-950'
          : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs shrink-0 ${
            isOffline ? 'bg-rose-600 text-white' : 'bg-indigo-600 text-white'
          }`}>
            <span className="material-symbols-outlined text-3xl">
              {isOffline ? 'wifi_off' : 'cloud_sync'}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-widest ${isOffline ? 'text-rose-700' : 'text-indigo-600'}`}>
                {isOffline ? t.offlineMode : t.systemOnlineSynced}
              </span>
              <span className={`w-2 h-2 rounded-full animate-ping ${isOffline ? 'bg-rose-500' : 'bg-indigo-600'}`} />
            </div>
            <h1 className="font-heading text-2xl font-extrabold mt-0.5 text-slate-900">
              {pendingCount > 0 ? `${pendingCount} Items Pending Sync` : 'All Data Synchronized'}
            </h1>
            <p className="text-xs text-slate-500 mt-1 max-w-md">
              {t.ensureConnectionNotice}
            </p>
          </div>
        </div>

        <button
          onClick={handleSyncClick}
          disabled={isSyncingAll || pendingCount === 0}
          className={`flex items-center justify-center gap-2 font-bold text-sm h-12 px-8 rounded-2xl shadow-xs transition-all active:scale-[0.98] ${
            isSyncingAll || pendingCount === 0
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
          }`}
        >
          <span className={`material-symbols-outlined text-xl ${isSyncingAll ? 'animate-spin' : ''}`}>
            sync
          </span>
          <span>{isSyncingAll ? 'Syncing...' : t.syncNow}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sync Queue List (Span 8) */}
        <div className="lg:col-span-8 bg-white rounded-3xl shadow-xs border border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-heading text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600">queue</span>
              <span>{t.syncQueue}</span>
            </h2>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
              {pendingCount} {t.pending}
            </span>
          </div>

          <div className="space-y-3">
            {queue.map((item) => {
              const isItemPending = item.status === 'pending';
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-300 transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-xl">
                        {item.type === 'quiz' ? 'quiz' : item.type === 'video' ? 'movie' : 'analytics'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-sm text-slate-900">
                        {item.title[lang] || item.title.en}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {item.details[lang] || item.details.en}
                      </p>
                    </div>
                  </div>

                  <button
                    disabled={!isItemPending}
                    onClick={() => onSyncItem(item.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isItemPending
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer'
                        : 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default'
                    }`}
                  >
                    {isItemPending ? 'Sync Item' : 'Synced ✓'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Local Storage & Settings (Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Storage Breakdown Card */}
          <div className="bg-white rounded-3xl shadow-xs border border-slate-200 p-6">
            <h2 className="font-heading text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600">sd_card</span>
              <span>{t.localStorage}</span>
            </h2>

            <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
              <span>8.4 GB {t.used}</span>
              <span>16.0 GB Total</span>
            </div>

            {/* Storage Meter Bar */}
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex mb-6 border border-slate-200">
              <div className="h-full bg-indigo-600 w-[50%]" title="Lessons (6.4 GB)" />
              <div className="h-full bg-blue-500 w-[20%]" title="Media (1.2 GB)" />
              <div className="h-full bg-emerald-500 w-[10%]" title="System (0.8 GB)" />
            </div>

            <div className="space-y-2.5 text-xs font-semibold text-slate-600">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                  {t.lessons}
                </span>
                <span className="font-bold text-slate-900">6.4 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  {t.media}
                </span>
                <span className="font-bold text-slate-900">1.2 GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  {t.system}
                </span>
                <span className="font-bold text-slate-900">0.8 GB</span>
              </div>
            </div>
          </div>

          {/* Auto-Sync Settings Switch */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <h3 className="font-heading text-sm font-bold text-slate-900 mb-3">
              {t.settings}
            </h3>

            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-slate-900">{t.autoSyncData}</p>
                <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                  {t.autoSyncDesc}
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={autoSync}
                  onChange={(e) => setAutoSync(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
