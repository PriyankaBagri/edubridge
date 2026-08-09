export type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te';

export type NavPath = 
  | 'welcome'
  | 'student-workspace' 
  | 'teacher-analytics' 
  | 'sync-center' 
  | 'badges' 
  | 'progress' 
  | 'stored-lessons';

export type RiskLevel = 'HIGH RISK' | 'ON TRACK' | 'MONITOR';

export interface QuizQuestion {
  id: string;
  text: Record<Language, string>;
  options: Record<Language, string[]>;
  correctAnswerIndex: number;
  explanation: Record<Language, string>;
}

export interface Lesson {
  id: string;
  grade: Record<Language, string>;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  duration: string;
  mediaUrl: string;
  mediaAlt: string;
  hasCC: boolean;
  transcript: Record<Language, string[]>;
  quizQuestions: QuizQuestion[];
  difficultyLevel: number; // 1 to 4
}

export interface StudentCohort {
  id: string;
  studentCode: string;
  name: string;
  riskLevel: RiskLevel;
  irtAbility: number; // theta score
  lastSync: string;
  topicScores: {
    topicName: string;
    score: number; // 0 to 100
    status: 'critical' | 'basic' | 'proficient';
  }[];
}

export interface Badge {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  category: 'science' | 'sync' | 'quiz' | 'streak';
  color: 'tertiary' | 'primary' | 'secondary';
  unlocked: boolean;
  unlockedAt?: string;
}

export interface SyncQueueItem {
  id: string;
  type: 'quiz' | 'video' | 'analytics' | 'remedial';
  title: Record<Language, string>;
  details: Record<Language, string>;
  size: string;
  status: 'pending' | 'syncing' | 'completed';
  color: string;
}

export interface DailyQuest {
  id: string;
  title: Record<Language, string>;
  xp: number;
  completed: boolean;
  progress?: number;
  maxProgress?: number;
}
