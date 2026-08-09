import React, { useState } from 'react';
import { StudentCohort, Language } from '../types';
import { translations } from '../i18n/translations';

interface RemedialModalProps {
  isOpen: boolean;
  onClose: () => void;
  cohorts: StudentCohort[];
  initialStudentId?: string;
  lang: Language;
  onConfirmPush: () => void;
}

export const RemedialModal: React.FC<RemedialModalProps> = ({
  isOpen,
  onClose,
  cohorts,
  initialStudentId,
  lang,
  onConfirmPush,
}) => {
  if (!isOpen) return null;

  const t = translations[lang] || translations.en;

  const [selectedModule, setSelectedModule] = useState('cell-structure-remedial');
  const [targetStudentId, setTargetStudentId] = useState(initialStudentId || 'stu-8842');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmPush();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">send_to_mobile</span>
          </div>
          <div>
            <h2 className="font-heading text-xl font-extrabold text-slate-900">
              {t.remedialModalTitle}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Deploy targeted micro-lessons to offline student devices.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Select Module */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              {t.selectModule}
            </label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full bg-slate-50 text-sm font-bold text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="cell-structure-remedial">
                Cell Membrane & Plant Cell Remedial (NCERT Grade 8)
              </option>
              <option value="crop-production-remedial">
                Irrigation & Soil Preparation Essentials (Grade 8)
              </option>
              <option value="ecosystems-remedial">
                Food Web Energy Flow Practice (Grade 5)
              </option>
            </select>
          </div>

          {/* Target Student */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              {t.targetStudents}
            </label>
            <select
              value={targetStudentId}
              onChange={(e) => setTargetStudentId(e.target.value)}
              className="w-full bg-slate-50 text-sm font-bold text-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="all-at-risk">All High Risk Students (7 Students)</option>
              {cohorts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.studentCode}) • {c.riskLevel}
                </option>
              ))}
            </select>
          </div>

          {/* Due Date & Offline Priority */}
          <div className="p-3.5 bg-indigo-50/60 rounded-2xl border border-indigo-100 flex items-center gap-3">
            <span className="material-symbols-outlined text-indigo-600 text-xl shrink-0">
              schedule
            </span>
            <div className="text-xs text-indigo-950">
              Priority level: <span className="font-extrabold text-indigo-700">High Offline Priority</span>. Will auto-download on next local mesh sync.
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all active:scale-[0.98]"
            >
              {t.confirmPush}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
