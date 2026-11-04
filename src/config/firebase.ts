// Firebase configuration with local storage fallback for guest mode

export interface AppUser {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
  isAnonymous: boolean;
}

const LOCAL_STORAGE_KEY = 'gitplayground_progress_v1';

export const loadStoredProgress = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading progress from local storage', e);
  }
  return {
    completedLessonIds: [],
    currentLevelId: 1,
    currentLessonId: '1-1',
    unlockedBadges: ['git-novice'],
    xp: 50,
    language: 'bn'
  };
};

export const saveStoredProgress = (progress: unknown) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving progress to local storage', e);
  }
};
