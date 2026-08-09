import React from 'react';
import { Lesson, Language } from '../types';
import { translations } from '../i18n/translations';

interface OfflineLessonsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lessons: Lesson[];
  lang: Language;
}

export const OfflineLessonsModal: React.FC<OfflineLessonsModalProps> = ({
  isOpen,
  onClose,
  lessons,
  lang,
}) => {
  if (!isOpen) return null;

  const t = translations[lang] || translations.en;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
      <div className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#186a22] text-2xl">download_for_offline</span>
            <h2 className="font-heading text-xl font-bold text-[#1a1c1c]">{t.offlineLessons}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f3f3f3] text-[#5a4138] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="space-y-3">
          {lessons.map((l) => (
            <div key={l.id} className="p-4 rounded-xl bg-[#f9f9f9] border border-[#e3bfb2]/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#a43700] block">
                  {l.grade[lang] || l.grade.en}
                </span>
                <h3 className="font-heading font-bold text-sm text-[#1a1c1c]">
                  {l.title[lang] || l.title.en}
                </h3>
                <span className="text-xs text-[#5a4138]">Saved for offline • 12.4 MB</span>
              </div>
              <span className="material-symbols-outlined text-[#186a22]">check_circle</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
