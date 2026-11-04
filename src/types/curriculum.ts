import { GitState } from './git';

export interface ObjectiveTask {
  id: string;
  descriptionEn: string;
  descriptionBn: string;
  isCompleted: boolean;
  check: (state: GitState, commandHistory: string[]) => boolean;
}

export interface Lesson {
  id: string;
  levelId: number;
  order: number;
  titleEn: string;
  titleBn: string;
  summaryEn: string;
  summaryBn: string;
  whyUseThisEn: string;
  whyUseThisBn: string;
  explanationEn: string;
  explanationBn: string;
  videoTimestamp?: string;
  videoUrl?: string;
  videoSourceTitle?: string;
  quickCommands: string[];
  initialState?: Partial<GitState>;
  tasks: ObjectiveTask[];
  tipsEn: string[];
  tipsBn: string[];
}

export interface Level {
  id: number;
  number: string; // '01', '02', etc.
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  iconName: string;
  badgeColor: string;
  videoCourseTitle: string;
  videoUrl: string;
  lessons: Lesson[];
}

export interface UserProgress {
  completedLessonIds: string[];
  currentLevelId: number;
  currentLessonId: string;
  unlockedBadges: string[];
  xp: number;
  language: 'bn' | 'en';
}
