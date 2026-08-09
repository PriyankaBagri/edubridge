import React, { useState } from 'react';
import { StudentCohort, Language, RiskLevel } from '../types';
import { translations } from '../i18n/translations';

interface TeacherAnalyticsProps {
  cohorts: StudentCohort[];
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenRemedialModal: (studentId?: string) => void;
  onForceSync: () => void;
}

export const TeacherAnalytics: React.FC<TeacherAnalyticsProps> = ({
  cohorts,
  lang,
  onLanguageChange,
  onOpenRemedialModal,
  onForceSync,
}) => {
  const t = translations[lang] || translations.en;

  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState<RiskLevel | 'ALL'>('ALL');

  const topicsList = [
    'Crop Production',
    'Microorganisms',
    'Coal & Petroleum',
    'Cell Structure',
    'Reproduction',
    'Force & Pressure',
  ];

  const filteredCohorts = cohorts.filter((stu) => {
    const matchesName = stu.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        stu.studentCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRisk = filterRisk === 'ALL' || stu.riskLevel === filterRisk;
    return matchesName && matchesRisk;
  });

  return (
    <div className="flex flex-col w-full font-body p-4 sm:p-6 max-w-[1440px] mx-auto animate-fade-in gap-6 bg-[#f8fafc] min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-0.5">
            Teacher Dashboard • NCERT Science Grade 8
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
            {t.classAnalytics}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={lang}
            onChange={(e) => onLanguageChange(e.target.value as Language)}
            className="bg-slate-50 text-slate-900 text-xs font-bold rounded-xl px-3 py-2 border border-slate-200 outline-none cursor-pointer"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="mr">मराठी (Marathi)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="te">తెలుగు (Telugu)</option>
          </select>

          <button
            onClick={onForceSync}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-10 px-4 rounded-xl shadow-xs transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-base">sync</span>
            <span>{t.forceSync}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPI 1: Avg Ability */}
        <div className="bg-white p-6 rounded-3xl shadow-xs flex flex-col justify-between border border-slate-200">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.avgClassAbility}
            </span>
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-xl">trending_up</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-heading text-3xl font-extrabold text-slate-900">
              +1.2 θ
            </div>
            <p className="text-xs text-emerald-600 font-bold mt-1 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">arrow_upward</span>
              <span>+0.4 Theta growth this month</span>
            </p>
          </div>
        </div>

        {/* KPI 2: At Risk */}
        <div className="bg-rose-50/80 p-6 rounded-3xl shadow-xs flex flex-col justify-between border border-rose-200">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              {t.atRiskStudents}
            </span>
            <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 border border-rose-200 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-xl">warning</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-heading text-3xl font-extrabold text-rose-950">
              7 / 32
            </div>
            <p className="text-xs text-rose-700 font-bold mt-1">
              {t.requireIntervention}
            </p>
          </div>
        </div>

        {/* KPI 3: Sync Rate */}
        <div className="bg-emerald-50/80 p-6 rounded-3xl shadow-xs flex flex-col justify-between border border-emerald-200">
          <div className="flex justify-between items-start">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              {t.deviceSyncRate}
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-xl">sensors</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-heading text-3xl font-extrabold text-emerald-950">
              88%
            </div>
            <p className="text-xs text-emerald-700 font-bold mt-1">
              High offline sync efficiency
            </p>
          </div>
        </div>
      </div>

      {/* Competency Heatmap Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-slate-200 p-6 overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-2">
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-900">
              {t.competencyHeatmap}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.heatmapSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-rose-600">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              {t.critical} (&lt;50%)
            </span>
            <span className="flex items-center gap-1.5 text-amber-600">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              {t.basic} (50-75%)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              {t.proficient} (&gt;75%)
            </span>
          </div>
        </div>

        {/* Heatmap Matrix */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-400">
                <th className="py-3 px-4">Student</th>
                {topicsList.map((topic) => (
                  <th key={topic} className="py-3 px-4 text-center">
                    {topic}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cohorts.map((student) => (
                <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-bold text-sm text-slate-900 whitespace-nowrap">
                    <div>{student.name}</div>
                    <div className="text-[11px] font-normal text-slate-500">{student.studentCode}</div>
                  </td>
                  {topicsList.map((topic) => {
                    const topicData = student.topicScores.find((t) => t.topicName === topic);
                    const score = topicData ? topicData.score : 65;

                    let bgClass = 'bg-amber-100/70 text-amber-900 border border-amber-200';
                    if (score >= 75) bgClass = 'bg-emerald-100/70 text-emerald-900 border border-emerald-200';
                    if (score < 50) bgClass = 'bg-rose-100/80 text-rose-900 font-bold border border-rose-200';

                    return (
                      <td key={topic} className="py-3 px-2 text-center">
                        <div
                          title={`${student.name} - ${topic}: ${score}%`}
                          className={`mx-auto w-12 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-transform hover:scale-105 cursor-pointer ${bgClass}`}
                        >
                          {score}%
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Cohorts Management Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h2 className="font-heading text-xl font-bold text-slate-900">
              {t.studentCohorts}
            </h2>
            <p className="text-xs text-slate-500">
              Monitor individual student IRT scores and issue remedial modules.
            </p>
          </div>

          {/* Search & Filter controls */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:flex-none min-w-[220px]">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-lg">
                search
              </span>
              <input
                type="text"
                placeholder="Search student name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 text-sm text-slate-900 pl-9 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none"
              />
            </div>

            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              {(['ALL', 'HIGH RISK', 'ON TRACK', 'MONITOR'] as const).map((risk) => (
                <button
                  key={risk}
                  onClick={() => setFilterRisk(risk)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    filterRisk === risk
                      ? 'bg-white text-indigo-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {risk}
                </button>
              ))}
            </div>

            <button
              onClick={() => onOpenRemedialModal()}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-10 px-4 rounded-xl shadow-xs transition-all flex items-center gap-1.5 ml-auto md:ml-0 active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-base">send_to_mobile</span>
              <span>{t.pushRemedialModule}</span>
            </button>
          </div>
        </div>

        {/* Cohorts Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-400">
                <th className="py-3.5 px-4">Student</th>
                <th className="py-3.5 px-4">Risk Level</th>
                <th className="py-3.5 px-4">IRT Ability (θ)</th>
                <th className="py-3.5 px-4">{t.lastSync}</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCohorts.map((student) => {
                let badgeStyle = 'bg-emerald-50 text-emerald-700 border-emerald-200';
                if (student.riskLevel === 'HIGH RISK') badgeStyle = 'bg-rose-50 text-rose-700 border-rose-200';
                if (student.riskLevel === 'MONITOR') badgeStyle = 'bg-amber-50 text-amber-700 border-amber-200';

                return (
                  <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-4 font-bold text-sm text-slate-900">
                      <div>{student.name}</div>
                      <div className="text-xs text-slate-500 font-normal">{student.studentCode}</div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${badgeStyle}`}>
                        {student.riskLevel}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-bold text-sm text-slate-900">
                      {student.irtAbility > 0 ? `+${student.irtAbility}` : student.irtAbility} θ
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-slate-500">
                      {student.lastSync}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => onOpenRemedialModal(student.id)}
                        className="bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white font-bold text-xs py-1.5 px-3.5 rounded-xl transition-all border border-indigo-100"
                      >
                        Push Remedial
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
