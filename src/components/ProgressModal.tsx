import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';

interface ProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ProgressModal: React.FC<ProgressModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  if (!isOpen) return null;

  const t = translations[lang] || translations.en;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
      <div className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#2b5bb5] text-2xl">trending_up</span>
            <h2 className="font-heading text-xl font-bold text-[#1a1c1c]">{t.progress}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f3f3f3] text-[#5a4138] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-[#f3f3f3] p-4 rounded-xl">
            <span className="text-xs font-bold uppercase text-[#5a4138]">Overall Mastery</span>
            <div className="font-heading text-3xl font-bold text-[#1a1c1c] mt-1">84%</div>
            <p className="text-xs text-[#186a22] font-semibold mt-1">NCERT Grade 8 Science syllabus</p>
          </div>

          <div className="space-y-3">
            <h3 className="font-heading text-sm font-bold text-[#1a1c1c]">Weekly Activity</h3>
            <div className="flex justify-between items-end h-32 bg-[#f9f9f9] p-4 rounded-xl border border-[#e3bfb2]/30">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                const heights = ['60%', '80%', '100%', '40%', '90%', '70%', '85%'];
                return (
                  <div key={day} className="flex flex-col items-center gap-2 flex-1">
                    <div
                      className="w-4 bg-[#2b5bb5] rounded-t-md shadow-sm"
                      style={{ height: heights[idx] }}
                    />
                    <span className="text-[10px] font-bold text-[#5a4138]">{day}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
