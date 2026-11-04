import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/layout/Header';
import { GitGraph } from './components/visualizer/GitGraph';
import { LifecycleView } from './components/visualizer/LifecycleView';
import { ActionsRunner } from './components/visualizer/ActionsRunner';
import { ConfigCard } from './components/visualizer/ConfigCard';
import { AnimatedExplainer } from './components/visualizer/AnimatedExplainer';
import { CommandFeedbackBanner, CommandFeedback } from './components/visualizer/CommandFeedbackBanner';
import { Terminal } from './components/terminal/Terminal';
import { LessonPanel } from './components/curriculum/LessonPanel';
import { ConflictModal } from './components/curriculum/ConflictModal';
import { SuccessModal } from './components/curriculum/SuccessModal';
import { CURRICULUM } from './data/curriculum';
import { PresetScenario } from './data/presets';
import { VirtualGit } from './engine/VirtualGit';
import { GitState } from './types/git';
import { generateFeedback } from './engine/feedbackHelper';
import { loadStoredProgress, saveStoredProgress } from './config/firebase';
import { GitCommit, Workflow, FlaskConical, X, Play, Film } from 'lucide-react';

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

  // Active Practice Lab Scenario
  const [activeScenario, setActiveScenario] = useState<PresetScenario | null>(null);

  // Command Execution Feedback
  const [commandFeedback, setCommandFeedback] = useState<CommandFeedback | null>(null);

  // UI Tabs & Modals (3 tabs: graph, animation, actions)
  const [rightTab, setRightTab] = useState<'graph' | 'animation' | 'actions'>('graph');
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
    }
  }, [currentLesson, gitState, commandHistory, completedLessonIds]);

  // Check tasks whenever gitState or commandHistory changes
  useEffect(() => {
    evaluateTasks();
  }, [gitState, commandHistory, evaluateTasks]);

  // Terminal command callback
  const handleCommandExecuted = (cmd: string) => {
    setCommandHistory(prev => [...prev, cmd]);
    setCommandFeedback(generateFeedback(cmd));
    syncGitState();
  };

  // Quick run from UI
  const handleQuickRun = (cmd: string) => {
    setQuickCommand(cmd);
    setCommandFeedback(generateFeedback(cmd));
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
    setActiveScenario(null);
    setCommandFeedback(null);
    syncGitState();
  };

  // Load Preset Lab Scenario
  const handleLoadPreset = (preset: PresetScenario) => {
    git.setState(preset.state);
    setActiveScenario(preset);
    setCommandFeedback({
      command: `[Scenario Loaded] ${preset.nameEn}`,
      explanationEn: preset.purposeEn,
      explanationBn: preset.purposeBn,
      affectedAreaEn: `Lab: ${preset.nameEn}`,
      affectedAreaBn: `ল্যাব: ${preset.nameBn}`
    });
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
      {/* Top Navigation Header */}
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

      {/* Active Lab Scenario Banner */}
      {activeScenario && (
        <div className="bg-gh-attention/15 border-b border-gh-attention/30 px-4 py-2.5 flex items-center justify-between text-xs animate-in slide-in-from-top duration-200 z-20">
          <div className="flex items-center space-x-2.5">
            <FlaskConical className="w-4 h-4 text-gh-attention-fg shrink-0" />
            <div>
              <span className="font-bold text-gh-attention-fg">
                {language === 'bn' ? `🔬 প্র্যাকটিস ল্যাব সক্রিয়: ${activeScenario.nameBn}` : `🔬 Active Practice Lab: ${activeScenario.nameEn}`}
              </span>
              <span className="text-gh-text-muted ml-2 hidden sm:inline">
                {language === 'bn' ? activeScenario.purposeBn : activeScenario.purposeEn}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuickRun(activeScenario.suggestedCommand)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded bg-gh-attention/20 text-gh-attention-fg hover:bg-gh-attention/30 border border-gh-attention/30 font-mono text-[11px] font-semibold transition"
            >
              <Play className="w-2.5 h-2.5 fill-current" />
              <span>{activeScenario.suggestedCommand}</span>
            </button>
            <button
              onClick={() => setActiveScenario(null)}
              className="p-1 text-gh-text-muted hover:text-white rounded"
              title="Exit Lab"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Command Feedback Banner (What Just Happened) */}
      <CommandFeedbackBanner
        feedback={commandFeedback}
        language={language}
        onDismiss={() => setCommandFeedback(null)}
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
          {/* Visualizer Tab Switcher (3 Tabs) */}
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
                <span>{language === 'bn' ? 'কমিট গ্রাফ ও লাইফসাইকেল' : 'Commit Graph & Lifecycle'}</span>
              </button>

              <button
                onClick={() => setRightTab('animation')}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                  rightTab === 'animation'
                    ? 'bg-gh-canvas-subtle text-rose-400 border border-gh-border shadow-sm'
                    : 'text-gh-text-muted hover:text-gh-text'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-rose-400" />
                <span>{language === 'bn' ? '🎬 লাইভ অ্যানিমেশন প্লেয়ার' : '🎬 Live Animation Player'}</span>
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
                <span>GitHub Actions (L8)</span>
              </button>
            </div>

            <div className="text-[11px] text-gh-text-subtle font-mono hidden sm:inline">
              HEAD: <span className="text-gh-accent">{git.getCurrentCommitId()}</span>
            </div>
          </div>

          {/* View Container */}
          <div className="flex-1 flex flex-col overflow-hidden p-3 overflow-y-auto custom-scrollbar">
            {/* Tab 1: Live Interactive Commit Graph + 3-Tier Lifecycle */}
            {rightTab === 'graph' && (
              <>
                {/* Visual callout button to jump to animated explainer */}
                <div className="bg-gh-canvas border border-gh-border/80 rounded-lg p-2.5 mb-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs">
                    <Film className="w-4 h-4 text-rose-400" />
                    <span className="text-gh-text font-medium">
                      {language === 'bn' 
                        ? `এই পাঠের মেকানিজম কীভাবে ব্যাকএন্ডে চলে দেখতে চান?` 
                        : `Want to watch how this command works under the hood?`}
                    </span>
                  </div>
                  <button
                    onClick={() => setRightTab('animation')}
                    className="flex items-center space-x-1 px-3 py-1 rounded bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 border border-rose-500/30 text-xs font-semibold transition"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{language === 'bn' ? 'অ্যানিমেশন দেখুন' : 'Watch Animation'}</span>
                  </button>
                </div>

                {/* Show ConfigCard prominently on Level 1 */}
                {currentLevelId === 1 && (
                  <ConfigCard gitState={gitState} language={language} />
                )}

                {/* Animated Commit Graph DAG */}
                <div className="flex-1 min-h-[280px] bg-gh-canvas rounded-xl border border-gh-border overflow-hidden mb-3">
                  <GitGraph gitState={gitState} />
                </div>

                {/* 3-Tier Working Tree / Staging / Repo Lifecycle */}
                <LifecycleView
                  gitState={gitState}
                  onQuickAdd={(file) => handleQuickRun(`git add ${file}`)}
                />
              </>
            )}

            {/* Tab 2: Video-like Step-by-Step Animated Explainer */}
            {rightTab === 'animation' && (
              <AnimatedExplainer
                currentCommandHint={currentLesson.quickCommands[0] || currentLesson.summaryEn}
                language={language}
              />
            )}

            {/* Tab 3: GitHub Actions CI/CD Runner */}
            {rightTab === 'actions' && (
              <ActionsRunner language={language} />
            )}
          </div>
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

      {/* Success Modal */}
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
