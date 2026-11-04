import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { GitGraph } from './components/visualizer/GitGraph';
import { LifecycleView } from './components/visualizer/LifecycleView';
import { ActionsRunner } from './components/visualizer/ActionsRunner';
import { Terminal } from './components/terminal/Terminal';
import { LessonPanel } from './components/curriculum/LessonPanel';
import { ConflictModal } from './components/curriculum/ConflictModal';
import { SuccessModal } from './components/curriculum/SuccessModal';
import { CURRICULUM } from './data/curriculum';
import { PresetScenario } from './data/presets';
import { VirtualGit } from './engine/VirtualGit';
import { GitState } from './types/git';
import { loadStoredProgress, saveStoredProgress } from './config/firebase';
import { GitCommit, Workflow, Layers, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const initialStored = useMemo(() => loadStoredProgress(), []);

  // Git Core Engine State
  const [git] = useState(() => new VirtualGit());
  const [gitState, setGitState] = useState<GitState>(() => git.getState());
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  // Navigation & Progress State
  const [currentLevelId, setCurrentLevelId] = useState<number>(initialStored.currentLevelId || 1);
  const [currentLessonId, setCurrentLessonId] = useState<string>(initialStored.currentLessonId || '1-1');
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>(initialStored.completedLessonIds || []);
  const [mode, setMode] = useState<'challenge' | 'sandbox'>('challenge');
  const [language, setLanguage] = useState<'bn' | 'en'>(initialStored.language || 'bn');

  // UI Tabs & Modals
  const [rightTab, setRightTab] = useState<'graph' | 'actions'>('graph');
  const [quickCommand, setQuickCommand] = useState<string | undefined>(undefined);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  // Sync state helper
  const syncGitState = useCallback(() => {
    setGitState(git.getState());
  }, [git]);

  // Find active level and lesson
  const currentLevel = CURRICULUM.find(l => l.id === currentLevelId) || CURRICULUM[0];
  const currentLesson = currentLevel.lessons.find(l => l.id === currentLessonId) || currentLevel.lessons[0];

  // Auto-switch to Actions tab when user selects Level 8
  useEffect(() => {
    if (currentLevelId === 8) {
      setRightTab('actions');
    }
  }, [currentLevelId]);

  // Save progress changes
  useEffect(() => {
    saveStoredProgress({
      completedLessonIds,
      currentLevelId,
      currentLessonId,
      language
    });
  }, [completedLessonIds, currentLevelId, currentLessonId, language]);

  // Evaluate task objectives dynamically
  const evaluateTasks = useCallback(() => {
    let allDone = true;
    currentLesson.tasks.forEach(task => {
      if (!task.isCompleted) {
        const passed = task.check(gitState, commandHistory);
        if (passed) {
          task.isCompleted = true;
        } else {
          allDone = false;
        }
      }
    });

    if (allDone && currentLesson.tasks.length > 0 && !completedLessonIds.includes(currentLesson.id)) {
      setCompletedLessonIds(prev => [...prev, currentLesson.id]);
      setShowSuccessModal(true);
    }
  }, [currentLesson, gitState, commandHistory, completedLessonIds]);

  // Check tasks whenever gitState or commandHistory changes
  useEffect(() => {
    evaluateTasks();
  }, [gitState, commandHistory, evaluateTasks]);

  // Terminal command callback
  const handleCommandExecuted = (cmd: string) => {
    setCommandHistory(prev => [...prev, cmd]);
    syncGitState();
  };

  // Quick run from UI
  const handleQuickRun = (cmd: string) => {
    setQuickCommand(cmd);
  };

  // Lesson Navigation
  const allLessonsFlat = useMemo(() => {
    return CURRICULUM.flatMap(lvl => lvl.lessons.map(lsn => ({ levelId: lvl.id, lesson: lsn })));
  }, []);

  const currentFlatIndex = allLessonsFlat.findIndex(item => item.lesson.id === currentLesson.id);
  const hasNextLesson = currentFlatIndex < allLessonsFlat.length - 1;
  const hasPrevLesson = currentFlatIndex > 0;

  const goToNextLesson = () => {
    if (hasNextLesson) {
      const next = allLessonsFlat[currentFlatIndex + 1];
      setCurrentLevelId(next.levelId);
      setCurrentLessonId(next.lesson.id);
      setShowSuccessModal(false);
      // Reset tasks completion flags for clean start
      next.lesson.tasks.forEach(t => t.isCompleted = false);
    }
  };

  const goToPrevLesson = () => {
    if (hasPrevLesson) {
      const prev = allLessonsFlat[currentFlatIndex - 1];
      setCurrentLevelId(prev.levelId);
      setCurrentLessonId(prev.lesson.id);
    }
  };

  // Reset Repo
  const handleResetRepo = () => {
    git.init();
    syncGitState();
  };

  // Load Preset
  const handleLoadPreset = (preset: PresetScenario) => {
    git.setState(preset.state);
    syncGitState();
  };

  // Conflict Resolution
  const handleResolveConflict = (resolvedCode: string) => {
    if (gitState.activeConflict) {
      git.add(gitState.activeConflict.filename);
      git.commit(`Merge branch '${gitState.activeConflict.theirBranch}' (resolved conflicts)`);
      git.setState({ ...git.getState(), activeConflict: null });
      syncGitState();
    }
  };

  const isAllTasksComplete = currentLesson.tasks.length > 0 && currentLesson.tasks.every(t => t.isCompleted);

  return (
    <div className="flex flex-col h-screen w-screen bg-gh-canvas text-gh-text overflow-hidden font-sans">
      {/* Top Navigation */}
      <Header
        currentLevelId={currentLevelId}
        currentLessonId={currentLessonId}
        onSelectLevel={(lvlId, lsnId) => {
          setCurrentLevelId(lvlId);
          setCurrentLessonId(lsnId);
        }}
        completedLessonIds={completedLessonIds}
        mode={mode}
        onToggleMode={setMode}
        language={language}
        onToggleLanguage={() => setLanguage(prev => prev === 'bn' ? 'en' : 'bn')}
        onResetRepo={handleResetRepo}
        onLoadPreset={handleLoadPreset}
        gitState={gitState}
      />

      {/* Main Split View Area */}
      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* Left Panel: Guide & Terminal (5 cols) */}
        <div className="col-span-12 lg:col-span-5 border-r border-gh-border flex flex-col overflow-hidden bg-gh-canvas">
          {mode === 'challenge' && (
            <LessonPanel
              currentLevel={currentLevel}
              currentLesson={currentLesson}
              language={language}
              onQuickRunCommand={handleQuickRun}
              onNextLesson={goToNextLesson}
              onPrevLesson={goToPrevLesson}
              isAllTasksComplete={isAllTasksComplete}
              hasNextLesson={hasNextLesson}
              hasPrevLesson={hasPrevLesson}
            />
          )}

          {/* Interactive Shell Terminal */}
          <Terminal
            git={git}
            onCommandExecuted={handleCommandExecuted}
            quickCommandToRun={quickCommand}
            onClearQuickCommand={() => setQuickCommand(undefined)}
          />
        </div>

        {/* Right Panel: Animated Visualizer (7 cols) */}
        <div className="col-span-12 lg:col-span-7 flex flex-col overflow-hidden bg-gh-canvas-inset">
          {/* Visualizer Tab Switcher */}
          <div className="h-10 bg-gh-canvas border-b border-gh-border px-3 flex items-center justify-between select-none">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setRightTab('graph')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  rightTab === 'graph'
                    ? 'bg-gh-canvas-subtle text-gh-accent border border-gh-border shadow-sm'
                    : 'text-gh-text-muted hover:text-gh-text'
                }`}
              >
                <GitCommit className="w-3.5 h-3.5" />
                <span>Git Graph & 3-Tier Lifecycle</span>
              </button>
              <button
                onClick={() => setRightTab('actions')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  rightTab === 'actions'
                    ? 'bg-gh-canvas-subtle text-gh-attention-fg border border-gh-border shadow-sm'
                    : 'text-gh-text-muted hover:text-gh-text'
                }`}
              >
                <Workflow className="w-3.5 h-3.5" />
                <span>GitHub Actions CI/CD (L8)</span>
              </button>
            </div>

            <div className="text-[11px] text-gh-text-subtle font-mono hidden sm:inline">
              HEAD: <span className="text-gh-accent">{git.getCurrentCommitId()}</span>
            </div>
          </div>

          {/* Tab 1: Animated Commit Graph + Lifecycle */}
          {rightTab === 'graph' ? (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <GitGraph gitState={gitState} />
              </div>
              <LifecycleView
                gitState={gitState}
                onQuickAdd={(file) => handleQuickRun(`git add ${file}`)}
              />
            </div>
          ) : (
            /* Tab 2: GitHub Actions Runner */
            <ActionsRunner language={language} />
          )}
        </div>
      </div>

      {/* Merge Conflict Resolution Modal */}
      {gitState.activeConflict && (
        <ConflictModal
          conflict={gitState.activeConflict}
          onResolve={handleResolveConflict}
          onAbort={() => git.setState({ ...git.getState(), activeConflict: null })}
          language={language}
        />
      )}

      {/* Success / Level Completion Modal */}
      {showSuccessModal && (
        <SuccessModal
          lesson={currentLesson}
          level={currentLevel}
          language={language}
          onNext={goToNextLesson}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </div>
  );
};
