import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Layers, 
  GitBranch, 
  GitCommit, 
  FolderGit2, 
  Cloud, 
  CheckCircle2, 
  Terminal,
  ShieldCheck,
  Search,
  ArrowRight,
  ArrowDown,
  ArrowUp,
  FileText,
  Database,
  Copy,
  Scissors,
  Trash2,
  RefreshCw,
  GitPullRequest,
  Eye,
  Archive,
  User,
  Mail,
  Link2,
  Binary,
  History,
  Lock,
  Plus,
  Minus,
  Check
} from 'lucide-react';
import { COMMAND_ANIMATIONS, CommandAnimation } from '../../data/commandAnimations';

interface AnimatedExplainerProps {
  lessonId?: string;
  currentCommandHint?: string;
  language: 'en' | 'bn';
}

export const AnimatedExplainer: React.FC<AnimatedExplainerProps> = ({
  lessonId,
  currentCommandHint = '',
  language
}) => {
  // Determine the active animation data
  const findExplainer = (): CommandAnimation => {
    if (lessonId && COMMAND_ANIMATIONS[lessonId]) {
      return COMMAND_ANIMATIONS[lessonId];
    }
    // Fallback search by command hint
    const hint = currentCommandHint.trim().toLowerCase();
    const found = Object.values(COMMAND_ANIMATIONS).find(anim => 
      hint.includes(anim.command.toLowerCase().split(' ')[1] || '') ||
      anim.command.toLowerCase().includes(hint)
    );
    return found || COMMAND_ANIMATIONS['2-4']; // fallback to commit-msg
  };

  const [activeExplainer, setActiveExplainer] = useState<CommandAnimation>(findExplainer());
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Sync when lessonId or hint changes
  useEffect(() => {
    const next = findExplainer();
    setActiveExplainer(next);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  }, [lessonId, currentCommandHint]);

  const totalSteps = activeExplainer.steps.length;
  const currentStep = activeExplainer.steps[currentStepIndex] || activeExplainer.steps[0];

  // Auto-advance loop when playing
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStepIndex(prev => (prev + 1) % totalSteps);
    }, 3400);
    return () => clearInterval(timer);
  }, [isPlaying, totalSteps, currentStepIndex]);

  const handleNext = () => {
    setCurrentStepIndex(prev => (prev + 1) % totalSteps);
  };

  const handlePrev = () => {
    setCurrentStepIndex(prev => (prev - 1 + totalSteps) % totalSteps);
  };

  return (
    <div className="flex flex-col h-full bg-gh-canvas-inset border border-gh-border rounded-xl overflow-hidden select-none shadow-xl">
      {/* Top Header Bar & Video Controls */}
      <div className="h-11 border-b border-gh-border px-3.5 bg-gh-canvas-subtle flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2.5 overflow-hidden">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-gh-text text-xs whitespace-nowrap">
            {language === 'bn' ? activeExplainer.titleBn : activeExplainer.titleEn}
          </span>
          <span className="font-mono text-[10px] bg-gh-accent/15 text-gh-accent px-2 py-0.5 rounded border border-gh-accent/25 truncate max-w-[200px]">
            {activeExplainer.command}
          </span>
        </div>

        {/* Video Player Controls */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <button
            onClick={handlePrev}
            className="p-1 hover:bg-gh-border/50 text-gh-text-muted hover:text-gh-text rounded transition"
            title="Previous Step"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-gh-accent/20 hover:bg-gh-accent/30 text-gh-accent font-semibold transition"
          >
            {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
            <span className="text-[10px]">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={handleNext}
            className="p-1 hover:bg-gh-border/50 text-gh-text-muted hover:text-gh-text rounded transition"
            title="Next Step"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => { setCurrentStepIndex(0); setIsPlaying(true); }}
            className="p-1 hover:bg-gh-border/50 text-gh-text-muted hover:text-gh-text rounded transition ml-1"
            title="Replay from Step 1"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Animation Stage */}
      <div className="flex-1 relative flex items-center justify-center p-6 overflow-hidden bg-gradient-to-b from-gh-canvas-inset to-gh-canvas">
        {/* Subtle Architectural Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#30363d12_1px,transparent_1px),linear-gradient(to_bottom,#30363d12_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeExplainer.id}-${currentStepIndex}`}
            initial={{ opacity: 0, scale: 0.94, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -8 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full h-full flex flex-col items-center justify-center relative z-10"
          >
            {/* 1-1: config-name */}
            {activeExplainer.visualScene === 'config-name' && (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-84 bg-gh-canvas border border-gh-border rounded-xl p-4 shadow-2xl relative">
                  <div className="flex items-center justify-between border-b border-gh-border pb-2 mb-3">
                    <span className="font-mono text-[11px] text-gh-text-muted flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-gh-accent" /> ~/.gitconfig
                    </span>
                    <span className="text-[10px] bg-gh-accent/15 text-gh-accent px-1.5 py-0.5 rounded font-mono">GLOBAL</span>
                  </div>
                  <div className="font-mono text-xs space-y-1">
                    <div className="text-purple-400">[user]</div>
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-emerald-400 pl-4 bg-emerald-500/10 py-1 rounded border border-emerald-500/30 flex items-center justify-between"
                    >
                      <span>name = &quot;Your Name&quot;</span>
                      <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="mr-2">
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      </motion.span>
                    </motion.div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-gh-text-muted font-mono bg-gh-canvas-subtle px-3 py-1.5 rounded-full border border-gh-border">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> All future commits signed with this author
                </div>
              </div>
            )}

            {/* 1-2: config-email */}
            {activeExplainer.visualScene === 'config-email' && (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-6">
                  <div className="w-48 bg-gh-canvas border border-gh-border rounded-xl p-3 shadow-xl">
                    <div className="flex items-center gap-1.5 text-[11px] text-gh-text-muted mb-2 font-mono">
                      <Mail className="w-3.5 h-3.5 text-purple-400" /> Git Config
                    </div>
                    <div className="font-mono text-[11px] text-purple-300">email = user@example.com</div>
                  </div>
                  <motion.div animate={{ x: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                    <ArrowRight className="w-5 h-5 text-gh-accent" />
                  </motion.div>
                  <div className="w-48 bg-gh-canvas border border-gh-border rounded-xl p-3 shadow-xl flex flex-col items-center">
                    <div className="text-[11px] text-gh-text-muted mb-1 font-mono">GitHub Profile</div>
                    {/* Simulated Contribution Squares */}
                    <div className="grid grid-cols-4 gap-1 p-1 bg-gh-canvas-inset rounded border border-gh-border">
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                        <div key={i} className="w-3 h-3 rounded-xs bg-emerald-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-emerald-400 font-mono">Contribution squares activated!</span>
              </div>
            )}

            {/* 1-3: init-repo */}
            {activeExplainer.visualScene === 'init-repo' && (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative flex items-center justify-center">
                  <div className="w-48 h-32 rounded-2xl border-2 border-dashed border-gh-border flex flex-col items-center justify-center p-3">
                    <FolderGit2 className="w-8 h-8 text-gh-text-muted mb-1" />
                    <span className="font-mono text-xs text-gh-text-muted">project_folder/</span>
                  </div>
                  <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="absolute bg-emerald-500/20 border-2 border-emerald-500 rounded-xl px-4 py-2 text-emerald-300 font-mono text-xs shadow-2xl flex items-center gap-2"
                  >
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span>.git/ [objects, refs, HEAD]</span>
                  </motion.div>
                </div>
                <div className="font-mono text-xs text-gh-accent flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Initialized empty Git repository on main
                </div>
              </div>
            )}

            {/* 1-4: clone-stream */}
            {activeExplainer.visualScene === 'clone-stream' && (
              <div className="flex items-center justify-around w-full max-w-md">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500 flex items-center justify-center text-purple-400 shadow-xl">
                    <Cloud className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-[11px] text-purple-300">GitHub Remote</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <motion.div
                    animate={{ x: [-20, 20] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                    className="bg-emerald-400 text-black font-mono font-bold text-[10px] px-2.5 py-1 rounded-full shadow"
                  >
                    Packfile ➔
                  </motion.div>
                  <span className="text-[10px] text-gh-text-muted font-mono">objects & refs</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-2xl bg-gh-accent/20 border border-gh-accent flex items-center justify-center text-gh-accent shadow-xl">
                    <FolderGit2 className="w-7 h-7" />
                  </div>
                  <span className="font-mono text-[11px] text-gh-accent">Local Clone</span>
                </div>
              </div>
            )}

            {/* 2-1: scan-status */}
            {activeExplainer.visualScene === 'scan-status' && (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-36 bg-gh-canvas border border-amber-500/50 rounded-xl p-3 shadow-lg">
                    <div className="text-[10px] font-mono text-amber-400 mb-2">WORKING TREE</div>
                    <div className="space-y-1 font-mono text-[11px]">
                      <div className="text-rose-400 flex items-center gap-1"><Minus className="w-3 h-3" /> modified: app.js</div>
                      <div className="text-rose-400 flex items-center gap-1"><Minus className="w-3 h-3" /> untracked: test.js</div>
                    </div>
                  </div>
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}>
                    <Search className="w-6 h-6 text-gh-accent" />
                  </motion.div>
                  <div className="w-36 bg-gh-canvas border border-emerald-500/50 rounded-xl p-3 shadow-lg">
                    <div className="text-[10px] font-mono text-emerald-400 mb-2">STAGING AREA</div>
                    <div className="space-y-1 font-mono text-[11px]">
                      <div className="text-emerald-400 flex items-center gap-1"><Plus className="w-3 h-3" /> staged: style.css</div>
                    </div>
                  </div>
                </div>
                <span className="font-mono text-xs text-gh-text-muted">Working directory clean inspection</span>
              </div>
            )}

            {/* 2-2: add-file */}
            {activeExplainer.visualScene === 'add-file' && (
              <div className="flex items-center justify-center gap-8 w-full">
                <div className="w-36 p-3 bg-gh-canvas border border-gh-border rounded-xl text-center">
                  <span className="text-[10px] font-mono text-gh-text-muted">Working Dir</span>
                  <div className="text-xs font-mono text-rose-400 mt-1">index.html</div>
                </div>
                <motion.div
                  animate={{ x: [0, 40, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 px-2 py-1 rounded font-mono text-[10px] flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" /> SHA-1 Blob ➔
                </motion.div>
                <div className="w-36 p-3 bg-gh-canvas border border-emerald-500/50 rounded-xl text-center shadow-lg shadow-emerald-500/10">
                  <span className="text-[10px] font-mono text-emerald-400">Staging Index</span>
                  <div className="text-xs font-mono text-emerald-400 mt-1 font-bold">staged: index.html</div>
                </div>
              </div>
            )}

            {/* 2-3: add-all */}
            {activeExplainer.visualScene === 'add-all' && (
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center gap-8">
                  <div className="w-32 p-2.5 bg-gh-canvas border border-rose-500/40 rounded-xl space-y-1 font-mono text-[10px]">
                    <div className="text-rose-400">fileA.ts</div>
                    <div className="text-rose-400">fileB.css</div>
                    <div className="text-rose-400">fileC.json</div>
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="p-2 bg-emerald-500/20 text-emerald-400 rounded-full border border-emerald-500"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                  <div className="w-32 p-2.5 bg-gh-canvas border border-emerald-500/50 rounded-xl space-y-1 font-mono text-[10px] shadow-lg shadow-emerald-500/10">
                    <div className="text-emerald-400">✔ fileA.ts</div>
                    <div className="text-emerald-400">✔ fileB.css</div>
                    <div className="text-emerald-400">✔ fileC.json</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400">Entire working tree captured in index snapshot</span>
              </div>
            )}

            {/* 2-4: commit-msg */}
            {activeExplainer.visualScene === 'commit-msg' && (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gh-border flex items-center justify-center font-mono font-bold text-xs text-gh-text-muted">
                    c1
                  </div>
                  <div className="w-8 h-0.5 bg-gh-border" />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 10 }}
                    className="w-14 h-14 rounded-full bg-emerald-500 flex flex-col items-center justify-center font-mono font-bold text-xs text-black shadow-xl shadow-emerald-500/25 ring-4 ring-emerald-500/30"
                  >
                    c2
                    <span className="text-[8px] font-normal">7fa28c</span>
                  </motion.div>
                </div>
                <div className="bg-gh-canvas border border-gh-border px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-300 shadow">
                  &quot;commit message&quot; ➔ Parent: c1
                </div>
              </div>
            )}

            {/* 2-5: commit-am */}
            {activeExplainer.visualScene === 'commit-am' && (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gh-canvas border border-rose-500/40 rounded-xl text-center font-mono text-xs text-rose-300">
                    Tracked Files
                  </div>
                  <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
                    <div className="px-2 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/40 rounded text-[10px] font-mono">
                      Bypass Staging ➔
                    </div>
                  </motion.div>
                  <div className="w-12 h-12 rounded-full bg-purple-500 text-black font-mono font-bold text-xs flex items-center justify-center shadow-lg">
                    c3
                  </div>
                </div>
                <span className="text-xs font-mono text-purple-300">Auto-stages tracked modifications and snapshots directly</span>
              </div>
            )}

            {/* 2-6: log-graph */}
            {activeExplainer.visualScene === 'log-graph' && (
              <div className="w-80 bg-gh-canvas border border-gh-border rounded-xl p-3 shadow-xl font-mono text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400">
                  <span>*</span> <span className="text-yellow-400">9b2f1a</span> <span className="text-white">(HEAD -&gt; main)</span> feat: auth
                </div>
                <div className="flex items-center gap-2 text-purple-400 pl-2">
                  <span>|</span> <span className="text-yellow-400">8e4d20</span> style: navbar
                </div>
                <div className="flex items-center gap-2 text-gh-text-muted pl-2">
                  <span>*</span> <span className="text-yellow-400">5a1c09</span> initial commit
                </div>
              </div>
            )}

            {/* 3-1: branch-list */}
            {activeExplainer.visualScene === 'branch-list' && (
              <div className="w-72 bg-gh-canvas border border-gh-border rounded-xl p-3 shadow-xl space-y-2">
                <div className="flex items-center justify-between p-2 rounded bg-emerald-500/10 border border-emerald-500/40">
                  <span className="font-mono text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> * main
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono">ACTIVE</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-gh-canvas-subtle border border-gh-border">
                  <span className="font-mono text-xs text-gh-text-muted flex items-center gap-1.5">
                    <GitBranch className="w-3.5 h-3.5" /> feature-login
                  </span>
                </div>
              </div>
            )}

            {/* 3-2: switch-create */}
            {activeExplainer.visualScene === 'switch-create' && (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-gh-border flex items-center justify-center font-mono font-bold text-xs text-gh-text">
                    c1
                  </div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring' }}
                    className="flex flex-col items-center"
                  >
                    <div className="bg-purple-500 text-black px-2.5 py-1 rounded font-mono font-bold text-xs shadow-lg">
                      feature*
                    </div>
                    <ArrowDown className="w-4 h-4 text-purple-400" />
                    <div className="w-12 h-12 rounded-full bg-purple-500 text-black flex items-center justify-center font-mono font-bold text-xs shadow-xl">
                      c2
                    </div>
                  </motion.div>
                </div>
                <span className="text-xs font-mono text-purple-300">HEAD magnetically detached from main and pinned to new branch</span>
              </div>
            )}

            {/* 3-3: switch-existing */}
            {activeExplainer.visualScene === 'switch-existing' && (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-8">
                  <div className="p-3 bg-gh-canvas border border-gh-border rounded-xl text-center">
                    <div className="text-xs font-mono text-gh-text-muted">branch: main</div>
                  </div>
                  <motion.div animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <div className="px-2 py-1 bg-gh-accent text-white rounded font-mono text-[10px] font-bold">
                      HEAD ➔
                    </div>
                  </motion.div>
                  <div className="p-3 bg-gh-canvas border border-emerald-500/50 rounded-xl text-center shadow-lg shadow-emerald-500/10">
                    <div className="text-xs font-mono text-emerald-400 font-bold">branch: feature</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-gh-accent">Working tree smoothly swaps out files to match feature snapshot</span>
              </div>
            )}

            {/* 3-4: merge-branches */}
            {activeExplainer.visualScene === 'merge-branches' && (
              <div className="flex flex-col items-center space-y-3">
                <div className="relative flex items-center justify-center w-64 h-24">
                  <div className="absolute left-4 top-2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-mono text-[10px] text-white">main</div>
                  <div className="absolute left-4 bottom-2 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-mono text-[10px] text-white">feat</div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="absolute right-4 w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-mono text-xs font-bold text-white shadow-2xl ring-2 ring-white/20"
                  >
                    Merge
                  </motion.div>
                  {/* Joining lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <line x1="48" y1="20" x2="190" y2="48" stroke="#388bfd" strokeWidth="2" strokeDasharray="3 3" />
                    <line x1="48" y1="76" x2="190" y2="48" stroke="#a371f7" strokeWidth="2" strokeDasharray="3 3" />
                  </svg>
                </div>
                <span className="text-xs font-mono text-purple-300">3-Way Merge Commit with two parent pointers created</span>
              </div>
            )}

            {/* 3-5: branch-delete */}
            {activeExplainer.visualScene === 'branch-delete' && (
              <div className="flex flex-col items-center space-y-3">
                <div className="relative p-4 bg-gh-canvas border border-gh-border rounded-xl">
                  <motion.div
                    animate={{ opacity: [1, 0.2, 0], scale: [1, 0.95, 0.9] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="flex items-center gap-2 bg-rose-500/20 text-rose-300 border border-rose-500/40 px-3 py-1.5 rounded font-mono text-xs"
                  >
                    <Trash2 className="w-4 h-4 text-rose-400" />
                    <span>Deleted refs/heads/feature</span>
                  </motion.div>
                </div>
                <span className="text-xs font-mono text-emerald-400">Safely pruned pointer — commits preserved in history</span>
              </div>
            )}

            {/* 3-6: branch-rename */}
            {activeExplainer.visualScene === 'branch-rename' && (
              <div className="flex items-center gap-4">
                <div className="px-3 py-1.5 bg-gh-canvas border border-gh-border rounded font-mono text-xs text-gh-text-muted line-through">
                  old-branch
                </div>
                <ArrowRight className="w-4 h-4 text-gh-accent" />
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="px-3 py-1.5 bg-emerald-500/20 border border-emerald-500 text-emerald-300 rounded font-mono text-xs font-bold shadow"
                >
                  new-name
                </motion.div>
              </div>
            )}

            {/* 4-1: remote-add */}
            {activeExplainer.visualScene === 'remote-add' && (
              <div className="flex items-center justify-around w-full max-w-sm">
                <div className="flex flex-col items-center gap-1 font-mono text-xs">
                  <div className="w-12 h-12 rounded-xl bg-gh-canvas border border-gh-border flex items-center justify-center text-gh-accent">
                    <FolderGit2 className="w-6 h-6" />
                  </div>
                  <span>Local</span>
                </div>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <Link2 className="w-6 h-6 text-purple-400" />
                </motion.div>
                <div className="flex flex-col items-center gap-1 font-mono text-xs">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500 flex items-center justify-center text-purple-300">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <span>origin</span>
                </div>
              </div>
            )}

            {/* 4-2: push-upstream */}
            {activeExplainer.visualScene === 'push-upstream' && (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center gap-6">
                  <div className="font-mono text-xs text-gh-accent">local: main</div>
                  <motion.div animate={{ y: [-4, 4, -4] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                    <ArrowUp className="w-5 h-5 text-emerald-400" />
                  </motion.div>
                  <div className="font-mono text-xs text-purple-300">origin/main [Tracking]</div>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/30">
                  Branch &apos;main&apos; set up to track remote &apos;origin/main&apos;
                </span>
              </div>
            )}

            {/* 4-3: push-sync */}
            {activeExplainer.visualScene === 'push-sync' && (
              <div className="flex items-center justify-around w-full max-w-sm">
                <div className="w-10 h-10 rounded-full bg-gh-accent text-white flex items-center justify-center font-mono font-bold text-xs">
                  c3
                </div>
                <motion.div
                  animate={{ x: [-20, 20] }}
                  transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                  className="bg-emerald-400 text-black font-mono font-bold text-[9px] px-2 py-0.5 rounded-full"
                >
                  Push ➔
                </motion.div>
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500 flex items-center justify-center text-purple-400">
                  <Cloud className="w-6 h-6" />
                </div>
              </div>
            )}

            {/* 4-4: fetch-metadata */}
            {activeExplainer.visualScene === 'fetch-metadata' && (
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500 flex items-center justify-center text-purple-300">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <motion.div animate={{ x: [10, -10] }} transition={{ repeat: Infinity, duration: 1 }}>
                    <ArrowRight className="w-5 h-5 text-purple-400 rotate-180" />
                  </motion.div>
                  <div className="font-mono text-xs text-purple-300 border border-purple-500/40 p-2 rounded">
                    origin/main updated
                  </div>
                </div>
                <span className="text-xs font-mono text-gh-text-muted">Working files untouched — remote references refreshed</span>
              </div>
            )}

            {/* 4-5: pull-merge */}
            {activeExplainer.visualScene === 'pull-merge' && (
              <div className="flex items-center gap-3 font-mono text-xs">
                <div className="p-2 bg-gh-canvas border border-gh-border rounded text-purple-400">1. Fetch</div>
                <ArrowRight className="w-4 h-4 text-gh-text-muted" />
                <div className="p-2 bg-emerald-500/20 border border-emerald-500 rounded text-emerald-300 font-bold">2. Merge HEAD</div>
              </div>
            )}

            {/* 4-6: remote-prune */}
            {activeExplainer.visualScene === 'remote-prune' && (
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-gh-canvas border border-gh-border rounded-xl font-mono text-xs space-y-1">
                  <div className="text-gh-text-muted">[deleted] (none) -&gt; origin/old-feat</div>
                </div>
                <span className="text-xs font-mono text-rose-400">Pruned ghost remote branches from local cache</span>
              </div>
            )}

            {/* 5-1: restore-file */}
            {activeExplainer.visualScene === 'restore-file' && (
              <div className="flex items-center gap-6 font-mono text-xs">
                <div className="p-3 bg-gh-canvas border border-rose-500/50 rounded-xl text-rose-300">
                  Dirty Working File
                </div>
                <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}>
                  <RefreshCw className="w-5 h-5 text-emerald-400" />
                </motion.div>
                <div className="p-3 bg-gh-canvas border border-emerald-500/50 rounded-xl text-emerald-300">
                  Clean Restored State
                </div>
              </div>
            )}

            {/* 5-2: restore-staged */}
            {activeExplainer.visualScene === 'restore-staged' && (
              <div className="flex items-center gap-6 font-mono text-xs">
                <div className="p-3 bg-gh-canvas border border-emerald-500/50 rounded-xl text-emerald-300">
                  Staging Index
                </div>
                <ArrowRight className="w-5 h-5 text-gh-accent" />
                <div className="p-3 bg-gh-canvas border border-gh-border rounded-xl text-gh-text">
                  Unstaged Working Dir
                </div>
              </div>
            )}

            {/* 5-3: clean-force */}
            {activeExplainer.visualScene === 'clean-force' && (
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center gap-2">
                  <Trash2 className="w-6 h-6 text-rose-400" />
                  <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="font-mono text-xs text-rose-400">
                    Removing build/ dist/ untracked.log
                  </motion.div>
                </div>
                <span className="text-xs font-mono text-gh-text-muted">Untracked clutter completely vaporized</span>
              </div>
            )}

            {/* 5-4: reset-soft */}
            {activeExplainer.visualScene === 'reset-soft' && (
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gh-border flex items-center justify-center font-mono font-bold text-xs text-gh-text">c1</div>
                  <motion.div animate={{ x: [-10, 0] }} transition={{ duration: 0.5 }}>
                    <div className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 border border-yellow-500 rounded font-mono text-[10px]">
                      HEAD rolls back ➔
                    </div>
                  </motion.div>
                  <div className="w-10 h-10 rounded-full bg-rose-500/30 flex items-center justify-center font-mono text-xs text-gh-text-muted">c2</div>
                </div>
                <span className="text-xs font-mono text-emerald-400">Changes safely kept staged in index!</span>
              </div>
            )}

            {/* 5-5: reset-hard */}
            {activeExplainer.visualScene === 'reset-hard' && (
              <div className="flex flex-col items-center space-y-3">
                <div className="p-3 bg-rose-500/10 border border-rose-500/40 rounded-xl text-center">
                  <div className="font-mono text-xs text-rose-400 font-bold mb-1">Time Machine Rewind</div>
                  <div className="text-[11px] font-mono text-gh-text-muted">HEAD, Staging Index &amp; Working Tree rewound to snapshot</div>
                </div>
              </div>
            )}

            {/* 5-6: revert-commit */}
            {activeExplainer.visualScene === 'revert-commit' && (
              <div className="flex items-center gap-4 font-mono text-xs">
                <div className="w-10 h-10 rounded-full bg-rose-500/40 flex items-center justify-center text-rose-200">c2 (bug)</div>
                <ArrowRight className="w-4 h-4 text-gh-text-muted" />
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-black font-bold flex items-center justify-center shadow-lg">
                  c3 (inv)
                </div>
              </div>
            )}

            {/* 5-7: stash-save */}
            {activeExplainer.visualScene === 'stash-save' && (
              <div className="flex items-center gap-6">
                <div className="font-mono text-xs text-rose-300">WIP uncommitted</div>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <Archive className="w-6 h-6 text-purple-400" />
                </motion.div>
                <div className="font-mono text-xs text-purple-300 bg-purple-500/10 border border-purple-500/40 px-3 py-1.5 rounded">
                  stash@&#123;0&#125;
                </div>
              </div>
            )}

            {/* 5-8: stash-pop */}
            {activeExplainer.visualScene === 'stash-pop' && (
              <div className="flex items-center gap-6">
                <div className="font-mono text-xs text-purple-300 bg-purple-500/10 border border-purple-500/40 px-3 py-1.5 rounded">
                  stash@&#123;0&#125;
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-400" />
                <div className="font-mono text-xs text-emerald-400 font-bold">
                  Restored onto clean branch!
                </div>
              </div>
            )}

            {/* 6-1: diff-working */}
            {activeExplainer.visualScene === 'diff-working' && (
              <div className="w-80 bg-gh-canvas border border-gh-border rounded-xl p-3 font-mono text-xs space-y-1">
                <div className="text-gh-text-muted">--- a/src/app.ts</div>
                <div className="text-gh-text-muted">+++ b/src/app.ts</div>
                <div className="text-rose-400 bg-rose-500/10 px-1 rounded">- const timeout = 1000;</div>
                <div className="text-emerald-400 bg-emerald-500/10 px-1 rounded">+ const timeout = 5000;</div>
              </div>
            )}

            {/* 6-2: diff-staged */}
            {activeExplainer.visualScene === 'diff-staged' && (
              <div className="w-80 bg-gh-canvas border border-emerald-500/40 rounded-xl p-3 font-mono text-xs space-y-1">
                <div className="text-emerald-400 font-bold mb-1">STAGED FOR COMMIT:</div>
                <div className="text-rose-400 bg-rose-500/10 px-1 rounded">- let attempts = 1;</div>
                <div className="text-emerald-400 bg-emerald-500/10 px-1 rounded">+ let attempts = 3;</div>
              </div>
            )}

            {/* 6-3: blame-track */}
            {activeExplainer.visualScene === 'blame-track' && (
              <div className="w-84 bg-gh-canvas border border-gh-border rounded-xl p-3 font-mono text-[11px] space-y-1.5">
                <div className="flex items-center justify-between text-gh-text-muted">
                  <span className="text-yellow-400">8f21c0 (Alice 2d ago)</span>
                  <span className="text-gh-text">function authenticate() &#123;</span>
                </div>
                <div className="flex items-center justify-between text-gh-text-muted">
                  <span className="text-purple-400">7a43b1 (Bob 1hr ago)</span>
                  <span className="text-gh-text">  validateToken(jwt);</span>
                </div>
              </div>
            )}

            {/* 6-4: bisect-binary */}
            {activeExplainer.visualScene === 'bisect-binary' && (
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">Good</span>
                  <div className="w-8 h-0.5 bg-gh-border" />
                  <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                    <Binary className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                  <div className="w-8 h-0.5 bg-gh-border" />
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-400 font-mono text-[10px]">Bad</span>
                </div>
                <span className="font-mono text-xs text-yellow-300">Binary search isolates offending commit in O(log N)</span>
              </div>
            )}

            {/* 7-1: commit-amend */}
            {activeExplainer.visualScene === 'commit-amend' && (
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gh-border flex items-center justify-center font-mono text-xs text-gh-text-muted line-through">
                  c2
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-14 h-14 rounded-full bg-emerald-500 text-black font-bold flex flex-col items-center justify-center font-mono text-xs shadow-xl"
                >
                  c2&apos;
                  <span className="text-[8px] font-normal">rewritten</span>
                </motion.div>
              </div>
            )}

            {/* 7-2: rebase-interactive */}
            {activeExplainer.visualScene === 'rebase-interactive' && (
              <div className="w-80 bg-gh-canvas border border-gh-border rounded-xl p-3 font-mono text-xs space-y-1">
                <div className="text-emerald-400">pick 4a1bc9 feat: landing page</div>
                <div className="text-purple-400">squash 8b31a2 fix typo in hero</div>
                <div className="text-yellow-400">reword e9103c update readme</div>
                <div className="text-rose-400">drop 71ff24 debug log statement</div>
              </div>
            )}

            {/* 7-3: cherry-pick */}
            {activeExplainer.visualScene === 'cherry-pick' && (
              <div className="flex flex-col items-center space-y-3">
                <div className="flex items-center gap-8">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-purple-400">feature</span>
                    <div className="w-10 h-10 rounded-full bg-purple-500 text-black font-bold flex items-center justify-center font-mono text-xs mt-1">
                      c_hot
                    </div>
                  </div>
                  <motion.div animate={{ y: [-10, 10, -10] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                    <Scissors className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-blue-400">main</span>
                    <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center font-mono text-xs mt-1">
                      c_copy
                    </div>
                  </div>
                </div>
                <span className="text-xs font-mono text-gh-accent">Transplanted isolated commit directly onto target HEAD</span>
              </div>
            )}

            {/* 7-4: reflog-reel */}
            {activeExplainer.visualScene === 'reflog-reel' && (
              <div className="w-80 bg-gh-canvas border border-gh-border rounded-xl p-3 font-mono text-xs space-y-1">
                <div className="flex items-center gap-2 text-emerald-400">
                  <History className="w-3.5 h-3.5" /> HEAD@&#123;0&#125;: commit: feat auth
                </div>
                <div className="flex items-center gap-2 text-yellow-400 pl-5">
                  HEAD@&#123;1&#125;: reset: moving to HEAD~1
                </div>
                <div className="flex items-center gap-2 text-purple-400 pl-5">
                  HEAD@&#123;2&#125;: checkout: moving to main
                </div>
              </div>
            )}

            {/* 8-1: gh-pr-create */}
            {activeExplainer.visualScene === 'gh-pr-create' && (
              <div className="w-80 bg-gh-canvas border border-gh-border rounded-xl p-3.5 shadow-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <GitPullRequest className="w-4 h-4" /> Open Pull Request #42
                </div>
                <div className="font-mono text-[11px] text-gh-text-muted">
                  Merging <span className="text-purple-400">feature</span> into <span className="text-blue-400">main</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-emerald-300 bg-emerald-500/10 px-2 py-1 rounded">
                  <CheckCircle2 className="w-3 h-3" /> CI Checks passed (3/3)
                </div>
              </div>
            )}

            {/* 8-2: gh-repo-view */}
            {activeExplainer.visualScene === 'gh-repo-view' && (
              <div className="w-80 bg-gh-canvas border border-gh-border rounded-xl p-3.5 shadow-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-gh-text">user/GitPlayGround</span>
                  <span className="text-[10px] bg-gh-accent/20 text-gh-accent px-1.5 py-0.5 rounded font-mono">Public</span>
                </div>
                <p className="text-[11px] text-gh-text-muted leading-tight">Interactive Animated Git learning platform</p>
                <div className="flex items-center gap-4 text-[10px] font-mono text-gh-text-muted pt-1">
                  <span>★ 1.2k stars</span>
                  <span>⑂ 240 forks</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step Description & Timeline Dots */}
      <div className="bg-gh-canvas-subtle border-t border-gh-border p-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gh-accent">
              {language === 'bn' ? currentStep.titleBn : currentStep.titleEn}
            </span>
            <span className="text-[10px] font-mono text-gh-text-muted">
              ({currentStepIndex + 1}/{totalSteps})
            </span>
          </div>

          {/* Step Progress Dots */}
          <div className="flex items-center space-x-1.5">
            {activeExplainer.steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStepIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-6 bg-gh-accent'
                    : 'w-1.5 bg-gh-border hover:bg-gh-text-muted'
                }`}
              />
            ))}
          </div>
        </div>

        <p className="text-xs text-gh-text-muted leading-relaxed">
          {language === 'bn' ? currentStep.descriptionBn : currentStep.descriptionEn}
        </p>
      </div>
    </div>
  );
};
