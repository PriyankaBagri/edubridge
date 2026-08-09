import React, { useState } from 'react';
import { Lesson, Language, DailyQuest, Badge } from '../types';
import { translations } from '../i18n/translations';

interface StudentWorkspaceProps {
  lessons: Lesson[];
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onAddXp: (amount: number) => void;
  dailyQuests: DailyQuest[];
  onCompleteQuest: (id: string) => void;
  badges: Badge[];
  onOpenAiTutor: () => void;
}

export const StudentWorkspace: React.FC<StudentWorkspaceProps> = ({
  lessons,
  lang,
  onLanguageChange,
  onAddXp,
  dailyQuests,
  onCompleteQuest,
  badges,
  onOpenAiTutor,
}) => {
  const t = translations[lang] || translations.en;

  const [selectedLessonId, setSelectedLessonId] = useState<string>(lessons[0]?.id || 'ncert-cell-structure');
  const [isLowData, setIsLowData] = useState<boolean>(false);
  const [isPlayingMedia, setIsPlayingMedia] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [xpAnimation, setXpAnimation] = useState<boolean>(false);
  const [selectedPace, setSelectedPace] = useState<'basic' | 'standard' | 'advanced'>('standard');

  const currentLesson = lessons.find((l) => l.id === selectedLessonId) || lessons[0];
  const currentQuestion = currentLesson.quizQuestions[currentQuestionIndex] || currentLesson.quizQuestions[0];

  // Speech synthesis for transcript text
  const handleToggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const textToRead = currentLesson.transcript[lang]?.join(' ') || currentLesson.transcript.en.join(' ');
        const utterance = new SpeechSynthesisUtterance(textToRead);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert(t.speechNotSupported);
    }
  };

  // Handle quiz answer click
  const handleSelectOption = (index: number) => {
    if (isSubmitted) return;
    setSelectedOptionIndex(index);
    setIsSubmitted(true);

    const isCorrect = index === currentQuestion.correctAnswerIndex;
    if (isCorrect) {
      onAddXp(100);
      setXpAnimation(true);
      setTimeout(() => setXpAnimation(false), 2000);

      // Check off quiz quest
      const quest = dailyQuests.find((q) => q.id === 'dq2');
      if (quest && !quest.completed) {
        onCompleteQuest('dq2');
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentLesson.quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setCurrentQuestionIndex(0);
    }
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
  };

  const scrollToAssessment = () => {
    const el = document.getElementById('knowledge-check-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full font-body bg-[#f8fafc] min-h-screen p-4 sm:p-6 max-w-[1440px] mx-auto animate-fade-in gap-6">
      {/* Lesson Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white p-5 rounded-3xl border border-slate-200 shadow-xs gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
            <span className="material-symbols-outlined text-2xl">auto_stories</span>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-600 block">
              Active Syllabus Module
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <select
                value={selectedLessonId}
                onChange={(e) => {
                  setSelectedLessonId(e.target.value);
                  setSelectedOptionIndex(null);
                  setIsSubmitted(false);
                  setCurrentQuestionIndex(0);
                }}
                className="bg-slate-50 font-heading font-extrabold text-base text-slate-900 rounded-xl px-3 py-1.5 border border-slate-200 focus:ring-2 focus:ring-indigo-600 outline-none cursor-pointer"
              >
                {lessons.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.grade[lang] || l.grade.en}: {l.title[lang] || l.title.en}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Floating XP Animation Toast */}
        {xpAnimation && (
          <div className="bg-emerald-600 text-white font-extrabold px-5 py-2.5 rounded-full shadow-md animate-bounce flex items-center gap-2 text-xs">
            <span className="material-symbols-outlined text-yellow-300 text-base">bolt</span>
            <span>+100 XP Earned!</span>
          </div>
        )}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Lesson Player & Quiz (Span 8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Adaptive Lesson Player Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-2xl">science</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 block mb-0.5">
                  {currentLesson.grade[lang] || currentLesson.grade.en}
                </span>
                <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                  {currentLesson.title[lang] || currentLesson.title.en}
                </h1>
              </div>
            </div>

            {/* Utility Toolbar */}
            <div className="flex flex-wrap items-center gap-2 bg-slate-50 rounded-2xl p-2 shrink-0 border border-slate-200">
              {/* Language Selector */}
              <select
                value={lang}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-white text-slate-800 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="te">తెలుగు (Telugu)</option>
              </select>

              <div className="w-px h-5 bg-slate-200 hidden sm:block" />

              {/* Text to Speech */}
              <button
                onClick={handleToggleSpeech}
                title="Read transcript aloud"
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  isSpeaking
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-lg">
                  {isSpeaking ? 'volume_off' : 'volume_up'}
                </span>
              </button>

              {/* Speech to Text / AI Tutor Mic */}
              <button
                onClick={onOpenAiTutor}
                title="Ask AI Assistant"
                className="w-9 h-9 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center justify-center transition-all"
              >
                <span className="material-symbols-outlined text-lg">mic</span>
              </button>

              <div className="w-px h-5 bg-slate-200" />

              {/* Low Data Toggle */}
              <label className="flex items-center gap-2 cursor-pointer px-1">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={isLowData}
                    onChange={(e) => setIsLowData(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-indigo-600 transition-colors" />
                  <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full peer-checked:translate-x-4 transition-transform shadow-xs" />
                </div>
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  {t.lowData}
                </span>
              </label>
            </div>
          </div>

          {/* Lesson Content Area */}
          <div className="bg-white rounded-3xl shadow-xs border border-slate-200 overflow-hidden flex flex-col">
            {/* Diagram / Video Container */}
            <div className={`relative w-full aspect-video bg-slate-100 overflow-hidden transition-all ${
              isLowData ? 'grayscale contrast-125 opacity-90' : ''
            }`}>
              <img
                src={currentLesson.mediaUrl}
                alt={currentLesson.mediaAlt}
                className="w-full h-full object-cover"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent z-10 pointer-events-none" />

              {/* Play / Pause Toggle Button */}
              <button
                onClick={() => setIsPlayingMedia(!isPlayingMedia)}
                className="absolute inset-0 m-auto w-16 h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl flex items-center justify-center z-20 shadow-md hover:scale-105 transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-4xl">
                  {isPlayingMedia ? 'pause' : 'play_arrow'}
                </span>
              </button>

              {/* Duration and Captions */}
              <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                <span className="bg-white/90 text-slate-900 font-extrabold text-xs px-3.5 py-1 rounded-full backdrop-blur-md shadow-xs">
                  {currentLesson.duration}
                </span>
                <span className="bg-emerald-600 text-white font-extrabold text-xs px-3.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">closed_caption</span>
                  <span>CC EN/HI</span>
                </span>
                {isLowData && (
                  <span className="bg-indigo-600 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-xs">
                    Low Data Mode
                  </span>
                )}
              </div>
            </div>

            {/* Transcript & Text Content */}
            <div className="p-8 bg-white z-10 relative">
              <h2 className="font-heading text-xl font-bold text-slate-900 mb-3">
                {currentLesson.subtitle[lang] || currentLesson.subtitle.en}
              </h2>

              <div className="space-y-4 text-base text-slate-600 leading-relaxed">
                {(currentLesson.transcript[lang] || currentLesson.transcript.en).map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="mt-8 pt-5 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <button
                  onClick={onOpenAiTutor}
                  className="flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">smart_toy</span>
                  <span>Have questions? Ask AI Tutor</span>
                </button>

                <button
                  onClick={scrollToAssessment}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm h-12 px-6 rounded-2xl shadow-xs transition-all flex items-center gap-2 active:scale-[0.98]"
                >
                  <span>{t.continueToAssessment}</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* IRT Adaptive Knowledge Check Quiz Card */}
          <div
            id="knowledge-check-section"
            className="bg-white rounded-3xl shadow-xs border border-slate-200 p-8 relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 relative z-10 gap-4">
              <h3 className="font-heading text-xl font-extrabold text-slate-900 flex items-center gap-2.5">
                <span className="material-symbols-outlined text-indigo-600 text-2xl">quiz</span>
                <span>{t.knowledgeCheck}</span>
              </h3>

              <div className="flex items-center gap-4">
                {/* Pace / Difficulty Selector */}
                <div className="flex items-center gap-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">
                    {t.pace}:
                  </label>
                  <select
                    value={selectedPace}
                    onChange={(e) => setSelectedPace(e.target.value as any)}
                    className="bg-slate-50 text-slate-900 text-xs font-bold rounded-xl px-3 py-1.5 border border-slate-200 cursor-pointer"
                  >
                    <option value="basic">Basic</option>
                    <option value="standard">Standard</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                {/* Difficulty Bars */}
                <div className="flex flex-col items-end gap-1 hidden sm:flex">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {t.irtLevel}
                  </span>
                  <div className="flex gap-1">
                    <div className="w-6 h-2 rounded-full bg-emerald-500" />
                    <div className="w-6 h-2 rounded-full bg-emerald-500" />
                    <div className={`w-6 h-2 rounded-full transition-all ${
                      selectedPace !== 'basic' ? 'bg-emerald-500' : 'bg-slate-200'
                    }`} />
                    <div className={`w-6 h-2 rounded-full transition-all ${
                      selectedPace === 'advanced' ? 'bg-emerald-500' : 'bg-slate-200'
                    }`} />
                  </div>
                </div>
              </div>
            </div>

            {/* Question Text */}
            <div className="relative z-10">
              <div className="mb-6">
                <span className="inline-block bg-indigo-50 text-indigo-700 text-xs font-extrabold px-3.5 py-1 rounded-full mb-3 border border-indigo-100">
                  {t.question} {currentQuestionIndex + 1} {t.of} {currentLesson.quizQuestions.length}
                </span>
                <p className="font-heading text-lg font-bold text-slate-900 leading-relaxed">
                  {currentQuestion.text[lang] || currentQuestion.text.en}
                </p>
              </div>

              {/* Quiz Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {(currentQuestion.options[lang] || currentQuestion.options.en).map((optionText, idx) => {
                  const isSelected = selectedOptionIndex === idx;
                  const isCorrectAnswer = idx === currentQuestion.correctAnswerIndex;

                  let buttonStyles = 'bg-slate-50 hover:bg-indigo-50 hover:text-indigo-900 text-slate-800 border border-slate-200';
                  if (isSubmitted) {
                    if (isCorrectAnswer) {
                      buttonStyles = 'bg-emerald-50 border-2 border-emerald-600 text-emerald-900 font-bold shadow-xs';
                    } else if (isSelected && !isCorrectAnswer) {
                      buttonStyles = 'bg-rose-50 border-2 border-rose-500 text-rose-900 font-bold';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4.5 rounded-2xl transition-all cursor-pointer min-h-[56px] flex items-center justify-between ${buttonStyles}`}
                    >
                      <span className="text-sm font-semibold leading-snug">{optionText}</span>
                      {isSubmitted && isCorrectAnswer && (
                        <span className="material-symbols-outlined text-emerald-600 font-bold">check_circle</span>
                      )}
                      {isSubmitted && isSelected && !isCorrectAnswer && (
                        <span className="material-symbols-outlined text-rose-600 font-bold">cancel</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Question */}
              {isSubmitted && (
                <div className="mt-6 p-5 rounded-2xl bg-slate-50 border-l-4 border-indigo-600 animate-fade-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block mb-1">
                      Explanation / व्याख्या
                    </span>
                    <p className="text-sm text-slate-800">
                      {currentQuestion.explanation[lang] || currentQuestion.explanation.en}
                    </p>
                  </div>
                  <button
                    onClick={handleNextQuestion}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-11 px-6 rounded-xl shrink-0 transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Next Question</span>
                    <span className="material-symbols-outlined text-base">arrow_forward</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Gamification & Progress Sidebar (Span 4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Daily Quests Widget */}
          <div className="bg-white rounded-3xl shadow-xs border border-slate-200 p-6 relative overflow-hidden">
            <h3 className="font-heading text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-indigo-600">target</span>
              <span>{t.dailyQuests}</span>
            </h3>

            <div className="flex gap-4">
              {/* Vertical Progress Bar */}
              <div className="w-3 bg-slate-100 rounded-full overflow-hidden flex flex-col-reverse h-48 relative shrink-0 border border-slate-200">
                <div
                  className="w-full bg-indigo-600 transition-all duration-1000 shadow-xs"
                  style={{
                    height: `${
                      (dailyQuests.filter((q) => q.completed).length / dailyQuests.length) * 100
                    }%`,
                  }}
                />
              </div>

              {/* Quest List */}
              <div className="flex flex-col justify-between py-1 w-full gap-3">
                {dailyQuests.map((quest) => (
                  <div
                    key={quest.id}
                    className={`flex items-start gap-3 p-3 rounded-2xl transition-all ${
                      quest.completed
                        ? 'opacity-60 bg-slate-100'
                        : 'bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold ${
                        quest.completed
                          ? 'bg-emerald-600 text-white'
                          : 'border-2 border-indigo-600 text-indigo-600'
                      }`}
                    >
                      {quest.completed ? (
                        <span className="material-symbols-outlined text-sm">check</span>
                      ) : (
                        <span className="material-symbols-outlined text-xs">bolt</span>
                      )}
                    </div>
                    <div>
                      <p
                        className={`text-xs font-bold text-slate-900 ${
                          quest.completed ? 'line-through text-slate-500' : ''
                        }`}
                      >
                        {quest.title[lang] || quest.title.en}
                      </p>
                      <span className="text-[11px] font-extrabold text-indigo-600">
                        +{quest.xp} XP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Badges Card - Bento Dark Card */}
          <div className="bg-slate-900 text-white rounded-3xl shadow-xs p-6 border border-slate-800 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 relative z-10">
              <h3 className="font-heading text-lg font-bold flex items-center gap-2 text-white">
                <span className="material-symbols-outlined text-yellow-400">military_tech</span>
                <span>{t.recentBadges}</span>
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 relative z-10">
              {badges.slice(0, 2).map((badge) => (
                <div
                  key={badge.id}
                  className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-3.5 text-center border border-slate-700/80 hover:-translate-y-0.5 transition-transform cursor-pointer"
                >
                  <div className="w-12 h-12 mx-auto mb-2 relative flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 flex items-center justify-center border border-indigo-500/30">
                      <span className="material-symbols-outlined text-2xl text-yellow-400">
                        {badge.icon}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-200 truncate">
                    {badge.title[lang] || badge.title.en}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Motivational Quote Card */}
          <div className="bg-white rounded-3xl p-5 border-l-4 border-indigo-600 shadow-xs border border-slate-200 flex items-start gap-3">
            <span className="material-symbols-outlined text-indigo-600 text-2xl shrink-0">
              lightbulb
            </span>
            <p className="text-xs text-slate-600 italic leading-relaxed">
              "Education is the most powerful weapon which you can use to change the world." Keep learning!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
