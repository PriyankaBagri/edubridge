import React, { useState } from 'react';
import { NavPath, Language, StudentCohort, SyncQueueItem, DailyQuest, Badge } from './types';
import { mockLessons, mockCohorts, mockSyncQueue, mockDailyQuests, mockBadges } from './data/mockData';
import { SidebarNav } from './components/SidebarNav';
import { Header } from './components/Header';
import { WelcomeHub } from './components/WelcomeHub';
import { StudentWorkspace } from './components/StudentWorkspace';
import { TeacherAnalytics } from './components/TeacherAnalytics';
import { SyncCenter } from './components/SyncCenter';
import { RemedialModal } from './components/RemedialModal';
import { AITutorModal } from './components/AITutorModal';
import { BadgesModal } from './components/BadgesModal';
import { ProgressModal } from './components/ProgressModal';
import { OfflineLessonsModal } from './components/OfflineLessonsModal';

export default function App() {
  const [currentPath, setCurrentPath] = useState<NavPath>('welcome');
  const [lang, setLang] = useState<Language>('en');
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const [xp, setXp] = useState<number>(1240);
  const [streakDays] = useState<number>(14);

  // Modals state
  const [isRemedialModalOpen, setIsRemedialModalOpen] = useState(false);
  const [selectedStudentForRemedial, setSelectedStudentForRemedial] = useState<string | undefined>(undefined);
  const [isAiTutorModalOpen, setIsAiTutorModalOpen] = useState(false);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isStoredLessonsModalOpen, setIsStoredLessonsModalOpen] = useState(false);

  // Application Data State
  const [cohorts] = useState<StudentCohort[]>(mockCohorts);
  const [queue, setQueue] = useState<SyncQueueItem[]>(mockSyncQueue);
  const [dailyQuests, setDailyQuests] = useState<DailyQuest[]>(mockDailyQuests);
  const [badges] = useState<Badge[]>(mockBadges);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleNavigate = (path: NavPath) => {
    if (path === 'badges') {
      setIsBadgesModalOpen(true);
      return;
    }
    if (path === 'progress') {
      setIsProgressModalOpen(true);
      return;
    }
    if (path === 'stored-lessons') {
      setIsStoredLessonsModalOpen(true);
      return;
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddXp = (amount: number) => {
    setXp((prev) => prev + amount);
  };

  const handleCompleteQuest = (id: string) => {
    setDailyQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: true } : q))
    );
  };

  const handleSyncAll = () => {
    setQueue((prev) => prev.map((item) => ({ ...item, status: 'completed' })));
    showToast('All offline assessments and analytics synchronized with main server! ✓');
  };

  const handleSyncItem = (id: string) => {
    setQueue((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: 'completed' } : item))
    );
    showToast('Sync item uploaded successfully! ✓');
  };

  const handleOpenRemedialModal = (studentId?: string) => {
    setSelectedStudentForRemedial(studentId);
    setIsRemedialModalOpen(true);
  };

  const handleConfirmPushRemedial = () => {
    showToast('Remedial learning module successfully deployed to target devices! ✓');
  };

  const pendingSyncCount = queue.filter((item) => item.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] font-body flex">
      {/* Sidebar Drawer */}
      <SidebarNav
        currentPath={currentPath}
        onNavigate={handleNavigate}
        lang={lang}
        onLanguageChange={setLang}
        isOffline={isOffline}
        pendingSyncCount={pendingSyncCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-72 pt-16 flex flex-col min-h-screen">
        {/* Header */}
        <Header
          lang={lang}
          onLanguageChange={setLang}
          isOffline={isOffline}
          onToggleOffline={() => {
            setIsOffline(!isOffline);
            showToast(!isOffline ? 'Switched to Offline Mode (Content Cached) 📶' : 'Switched to Online Mode 🟢');
          }}
          xp={xp}
          streakDays={streakDays}
          onOpenAiTutor={() => setIsAiTutorModalOpen(true)}
        />

        {/* Global Action Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-8 z-50 bg-[#186a22] text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-xl animate-fade-in flex items-center gap-2 border border-white/20">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* View Switcher */}
        <main className="flex-1 pb-12">
          {currentPath === 'welcome' && (
            <WelcomeHub
              onNavigate={handleNavigate}
              lang={lang}
              isOffline={isOffline}
              onToggleOffline={() => setIsOffline(!isOffline)}
              onForceSync={handleSyncAll}
            />
          )}

          {currentPath === 'student-workspace' && (
            <StudentWorkspace
              lessons={mockLessons}
              lang={lang}
              onLanguageChange={setLang}
              onAddXp={handleAddXp}
              dailyQuests={dailyQuests}
              onCompleteQuest={handleCompleteQuest}
              badges={badges}
              onOpenAiTutor={() => setIsAiTutorModalOpen(true)}
            />
          )}

          {currentPath === 'teacher-analytics' && (
            <TeacherAnalytics
              cohorts={cohorts}
              lang={lang}
              onLanguageChange={setLang}
              onOpenRemedialModal={handleOpenRemedialModal}
              onForceSync={handleSyncAll}
            />
          )}

          {currentPath === 'sync-center' && (
            <SyncCenter
              queue={queue}
              lang={lang}
              onSyncAll={handleSyncAll}
              onSyncItem={handleSyncItem}
              isOffline={isOffline}
            />
          )}
        </main>
      </div>

      {/* Modals & Slide-over Drawers */}
      <RemedialModal
        isOpen={isRemedialModalOpen}
        onClose={() => setIsRemedialModalOpen(false)}
        cohorts={cohorts}
        initialStudentId={selectedStudentForRemedial}
        lang={lang}
        onConfirmPush={handleConfirmPushRemedial}
      />

      <AITutorModal
        isOpen={isAiTutorModalOpen}
        onClose={() => setIsAiTutorModalOpen(false)}
        lang={lang}
      />

      <BadgesModal
        isOpen={isBadgesModalOpen}
        onClose={() => setIsBadgesModalOpen(false)}
        badges={badges}
        lang={lang}
      />

      <ProgressModal
        isOpen={isProgressModalOpen}
        onClose={() => setIsProgressModalOpen(false)}
        lang={lang}
      />

      <OfflineLessonsModal
        isOpen={isStoredLessonsModalOpen}
        onClose={() => setIsStoredLessonsModalOpen(false)}
        lessons={mockLessons}
        lang={lang}
      />
    </div>
  );
}
