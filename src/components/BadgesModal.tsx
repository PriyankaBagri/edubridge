import React from 'react';
import { Badge, Language } from '../types';
import { translations } from '../i18n/translations';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
  lang: Language;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  badges,
  lang,
}) => {
  if (!isOpen) return null;

  const t = translations[lang] || translations.en;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
      <div className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a43700] text-2xl">military_tech</span>
            <h2 className="font-heading text-xl font-bold text-[#1a1c1c]">{t.badges}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f3f3f3] text-[#5a4138] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="space-y-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${
                b.unlocked
                  ? 'bg-[#f7fff1] border-[#358438]/40 shadow-sm'
                  : 'bg-[#f3f3f3] border-[#dadada] opacity-60'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${
                b.unlocked ? 'bg-[#358438] text-yellow-300' : 'bg-[#a0a0a0] text-white'
              }`}>
                <span className="material-symbols-outlined text-2xl">{b.icon}</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-sm text-[#1a1c1c]">
                  {b.title[lang] || b.title.en}
                </h3>
                <p className="text-xs text-[#5a4138] mt-0.5">
                  {b.description[lang] || b.description.en}
                </p>
                {b.unlocked && (
                  <span className="text-[10px] font-bold text-[#186a22] mt-1 block">
                    Unlocked {b.unlockedAt}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
