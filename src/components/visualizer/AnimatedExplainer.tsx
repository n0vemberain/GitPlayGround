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
  Check,
  Zap,
  Gauge,
  AlertTriangle,
  FolderOpen
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
  // Determine active animation data
  const findExplainer = (): CommandAnimation => {
    if (lessonId && COMMAND_ANIMATIONS[lessonId]) {
      return COMMAND_ANIMATIONS[lessonId];
    }
    const hint = currentCommandHint.trim().toLowerCase();
    const found = Object.values(COMMAND_ANIMATIONS).find(anim => 
      hint.includes(anim.command.toLowerCase().split(' ')[1] || '') ||
      anim.command.toLowerCase().includes(hint)
    );
    return found || COMMAND_ANIMATIONS['2-4'];
  };

  const [activeExplainer, setActiveExplainer] = useState<CommandAnimation>(findExplainer());
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<0.5 | 1 | 2>(1);

  // Sync when lessonId or hint changes
  useEffect(() => {
    const next = findExplainer();
    setActiveExplainer(next);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  }, [lessonId, currentCommandHint]);

  const totalSteps = activeExplainer.steps.length;
  const currentStep = activeExplainer.steps[currentStepIndex] || activeExplainer.steps[0];

  // Auto-play timer adjusted for selected speed
  useEffect(() => {
    if (!isPlaying) return;
    const baseDuration = 4000;
    const stepDuration = baseDuration / speed;
    const timer = setInterval(() => {
      setCurrentStepIndex(prev => (prev + 1) % totalSteps);
    }, stepDuration);
    return () => clearInterval(timer);
  }, [isPlaying, totalSteps, currentStepIndex, speed]);

  const handleNext = () => {
    setCurrentStepIndex(prev => (prev + 1) % totalSteps);
  };

  const handlePrev = () => {
    setCurrentStepIndex(prev => (prev - 1 + totalSteps) % totalSteps);
  };

  // Step names helper
  const getStepBadge = (idx: number) => {
    if (language === 'bn') {
      if (idx === 0) return 'ধাপ ১: পূর্বাবস্থা (Before)';
      if (idx === 1) return 'ধাপ ২: মেকানিজম (Action)';
      return 'ধাপ ৩: চূড়ান্ত ফলাফল (Result)';
    }
    if (idx === 0) return 'Step 1: Before State';
    if (idx === 1) return 'Step 2: Action / Mechanism';
    return 'Step 3: Resulting State';
  };

  const getPhaseTag = () => {
    if (currentStepIndex === 0) {
      return {
        textBn: 'পূর্বাবস্থা (Initial Condition)',
        textEn: 'Initial Condition (Before)',
        color: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
      };
    }
    if (currentStepIndex === 1) {
      return {
        textBn: 'অভ্যন্তরীণ মেকানিজম চলাকালীন অবস্থা',
        textEn: 'Internal Mechanism in Action',
        color: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      };
    }
    return {
      textBn: 'চূড়ান্ত ফলাফল ও ফাইলসিস্টেম স্টেট',
      textEn: 'Final Result & Filesystem State',
      color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    };
  };

  const phaseTag = getPhaseTag();

  return (
    <div className="flex flex-col h-full min-h-[400px] bg-gh-canvas-inset border border-gh-border rounded-xl overflow-hidden select-none shadow-2xl">
      {/* Top Header Bar & Video Controls */}
      <div className="h-11 border-b border-gh-border px-3.5 bg-gh-canvas-subtle flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center space-x-2.5 overflow-hidden">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-gh-text text-xs whitespace-nowrap">
            {language === 'bn' ? activeExplainer.titleBn : activeExplainer.titleEn}
          </span>
          <span className="font-mono text-[10px] bg-gh-accent/15 text-gh-accent px-2 py-0.5 rounded border border-gh-accent/25 truncate max-w-[200px] hidden sm:inline">
            {activeExplainer.command}
          </span>
        </div>

        {/* Video Player Controls */}
        <div className="flex items-center space-x-1.5 shrink-0">
          {/* Speed Toggle */}
          <button
            onClick={() => setSpeed(s => s === 1 ? 0.5 : s === 0.5 ? 2 : 1)}
            className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-gh-canvas hover:bg-gh-border text-gh-text-muted hover:text-white border border-gh-border font-mono text-[10px] transition mr-1"
            title="Playback Speed"
          >
            <Gauge className="w-3 h-3 text-gh-accent" />
            <span>{speed}x</span>
          </button>

          <button
            onClick={handlePrev}
            className="p-1 hover:bg-gh-border text-gh-text-muted hover:text-gh-text rounded transition"
            title="Previous Step"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-1 px-2.5 py-0.5 rounded bg-gh-accent/20 hover:bg-gh-accent/30 text-gh-accent font-semibold transition border border-gh-accent/30"
          >
            {isPlaying ? <Pause className="w-3 h-3 fill-current" /> : <Play className="w-3 h-3 fill-current" />}
            <span className="text-[10px]">{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={handleNext}
            className="p-1 hover:bg-gh-border text-gh-text-muted hover:text-gh-text rounded transition"
            title="Next Step"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => { setCurrentStepIndex(0); setIsPlaying(true); }}
            className="p-1 hover:bg-gh-border text-gh-text-muted hover:text-gh-text rounded transition ml-1"
            title="Replay from Step 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Step Tabs Scrubber Bar */}
      <div className="bg-gh-canvas border-b border-gh-border/60 px-3 py-1.5 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-1.5 overflow-x-auto custom-scrollbar">
          {activeExplainer.steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setCurrentStepIndex(idx); setIsPlaying(false); }}
              className={`px-3 py-1 rounded-md text-[11px] font-semibold transition flex items-center space-x-1.5 whitespace-nowrap ${
                idx === currentStepIndex
                  ? 'bg-gh-accent text-white shadow-md'
                  : 'bg-gh-canvas-subtle text-gh-text-muted hover:text-gh-text border border-gh-border/60'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${idx === currentStepIndex ? 'bg-white' : 'bg-gh-text-subtle'}`} />
              <span>{getStepBadge(idx)}</span>
            </button>
          ))}
        </div>

        {/* Phase Pill */}
        <div className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${phaseTag.color} font-bold hidden md:inline`}>
          {language === 'bn' ? phaseTag.textBn : phaseTag.textEn}
        </div>
      </div>

      {/* Main Dynamic Animation Stage */}
      <div className="flex-1 relative flex items-center justify-center p-6 overflow-hidden bg-gradient-to-b from-gh-canvas-inset via-gh-canvas to-gh-canvas">
        {/* Subtle Architectural Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#30363d15_1px,transparent_1px),linear-gradient(to_bottom,#30363d15_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeExplainer.id}-${currentStepIndex}`}
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full h-full flex flex-col items-center justify-center relative z-10"
          >
            {/* ============================================================ */}
            {/* 1-1: config-name */}
            {/* ============================================================ */}
            {activeExplainer.visualScene === 'config-name' && (
              <div className="w-full max-w-md">
                {currentStepIndex === 0 && (
                  <div className="p-4 bg-gh-canvas border border-amber-500/40 rounded-xl space-y-3 shadow-xl">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-mono font-bold">
                      <span className="flex items-center gap-1.5"><AlertTriangle className="w-4 h-4" /> Step 1: Author Missing</span>
                      <span className="bg-amber-500/20 px-2 py-0.5 rounded">~/.gitconfig</span>
                    </div>
                    <div className="p-3 bg-gh-canvas-inset rounded-lg font-mono text-xs text-gh-text-muted space-y-1">
                      <div>[user]</div>
                      <div className="text-rose-400 pl-4 font-bold">name = (NOT SET)</div>
                    </div>
                    <p className="text-[11px] text-gh-text-muted">Without an author name, Git will throw an error or default to your system user.</p>
                  </div>
                )}
                {currentStepIndex === 1 && (
                  <div className="p-4 bg-gh-canvas border border-blue-500/50 rounded-xl space-y-3 shadow-xl">
                    <div className="flex items-center justify-between text-xs text-blue-400 font-mono font-bold">
                      <span className="flex items-center gap-1.5"><Terminal className="w-4 h-4" /> Step 2: Writing Global Config</span>
                      <span className="bg-blue-500/20 px-2 py-0.5 rounded">WRITING BUFFER</span>
                    </div>
                    <div className="p-3 bg-gh-canvas-inset rounded-lg font-mono text-xs text-gh-text space-y-1">
                      <div className="text-purple-400">[user]</div>
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="text-emerald-400 pl-4 bg-emerald-500/10 p-1 rounded font-bold"
                      >
                        name = &quot;Your Name&quot; <span className="animate-pulse">|</span>
                      </motion.div>
                    </div>
                    <p className="text-[11px] text-blue-300">Git appends the string to your machine&apos;s ~/.gitconfig file.</p>
                  </div>
                )}
                {currentStepIndex >= 2 && (
                  <div className="p-4 bg-gh-canvas border border-emerald-500/50 rounded-xl space-y-3 shadow-xl">
                    <div className="flex items-center justify-between text-xs text-emerald-400 font-mono font-bold">
                      <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Step 3: Verified Author Identity</span>
                      <span className="bg-emerald-500/20 px-2 py-0.5 rounded">ACTIVE</span>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30 flex items-center justify-between">
                      <div className="font-mono text-xs text-emerald-300">
                        <div className="font-bold">Author: Your Name</div>
                        <div className="text-[10px] text-emerald-400/80">Every future commit is signed with this name</div>
                      </div>
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* 1-2: config-email */}
            {/* ============================================================ */}
            {activeExplainer.visualScene === 'config-email' && (
              <div className="w-full max-w-lg">
                {currentStepIndex === 0 && (
                  <div className="p-4 bg-gh-canvas border border-amber-500/40 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-amber-400 font-mono font-bold flex items-center justify-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Step 1: Commits Unlinked to GitHub
                    </div>
                    <div className="flex items-center justify-center gap-2 p-3 bg-gh-canvas-inset rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gh-border flex items-center justify-center text-gh-text-muted font-bold text-xs">?</div>
                      <div className="text-left font-mono text-xs text-gh-text-muted">
                        <div>user.email = (unset)</div>
                        <div className="text-[10px] text-rose-400">0 GitHub Contributions Earned</div>
                      </div>
                    </div>
                  </div>
                )}
                {currentStepIndex === 1 && (
                  <div className="p-4 bg-gh-canvas border border-blue-500/50 rounded-xl space-y-3 shadow-xl">
                    <div className="text-xs text-blue-400 font-mono font-bold flex items-center gap-1.5">
                      <Mail className="w-4 h-4" /> Step 2: Saving Authenticated Email
                    </div>
                    <div className="flex items-center justify-center gap-4 py-2">
                      <div className="p-2.5 bg-gh-canvas-inset rounded border border-gh-border font-mono text-xs text-purple-300">
                        email = you@example.com
                      </div>
                      <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
                        <ArrowRight className="w-5 h-5 text-emerald-400" />
                      </motion.div>
                      <div className="p-2.5 bg-gh-canvas-inset rounded border border-gh-border font-mono text-xs text-emerald-300">
                        GitHub Profile Matching
                      </div>
                    </div>
                  </div>
                )}
                {currentStepIndex >= 2 && (
                  <div className="p-4 bg-gh-canvas border border-emerald-500/50 rounded-xl space-y-3 shadow-xl">
                    <div className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Step 3: Green Squares Unlocked!
                    </div>
                    <div className="flex items-center justify-between p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30">
                      <div className="font-mono text-xs text-emerald-300">
                        <div className="font-bold">Verified GitHub Contributor</div>
                        <div className="text-[10px] text-emerald-400/80">Commits directly credit your public activity graph</div>
                      </div>
                      <div className="grid grid-cols-4 gap-1">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                          <div key={i} className="w-3.5 h-3.5 rounded-xs bg-emerald-500" />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* 1-3: init-repo */}
            {/* ============================================================ */}
            {activeExplainer.visualScene === 'init-repo' && (
              <div className="w-full max-w-md">
                {currentStepIndex === 0 && (
                  <div className="p-4 bg-gh-canvas border border-gh-border rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-gh-text-muted font-mono font-bold">Step 1: Ordinary Directory</div>
                    <div className="w-40 h-28 mx-auto rounded-2xl border-2 border-dashed border-gh-border flex flex-col items-center justify-center p-2">
                      <FolderOpen className="w-8 h-8 text-gh-text-muted mb-1" />
                      <span className="font-mono text-xs text-gh-text-muted">my-project/</span>
                    </div>
                    <span className="text-[11px] text-gh-text-muted">Ordinary operating system folder. Zero version history tracking.</span>
                  </div>
                )}
                {currentStepIndex === 1 && (
                  <div className="p-4 bg-gh-canvas border border-blue-500/50 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-blue-400 font-mono font-bold">Step 2: Materializing .git/ Database</div>
                    <motion.div 
                      initial={{ scale: 0.8 }} 
                      animate={{ scale: 1 }} 
                      className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/30 flex items-center justify-center gap-3"
                    >
                      <Database className="w-6 h-6 text-blue-400 animate-spin" />
                      <div className="text-left font-mono text-xs text-blue-200">
                        <div className="font-bold">Creating .git Subdirectories:</div>
                        <div className="text-[10px] text-blue-300">objects/ • refs/heads • config • HEAD</div>
                      </div>
                    </motion.div>
                  </div>
                )}
                {currentStepIndex >= 2 && (
                  <div className="p-4 bg-gh-canvas border border-emerald-500/50 rounded-xl space-y-3 shadow-xl">
                    <div className="text-xs text-emerald-400 font-mono font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Step 3: Git Repository Initialized</span>
                      <span className="bg-emerald-500/20 px-2 py-0.5 rounded">READY</span>
                    </div>
                    <div className="p-3 bg-gh-canvas-inset rounded-lg font-mono text-xs space-y-1.5 border border-gh-border">
                      <div className="text-emerald-400 font-bold">HEAD ➔ refs/heads/main</div>
                      <div className="text-gh-text-muted text-[11px]">Repository ready to track, stage, and record immutable snapshots.</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* 2-1: scan-status */}
            {/* ============================================================ */}
            {activeExplainer.visualScene === 'scan-status' && (
              <div className="w-full max-w-lg">
                {currentStepIndex === 0 && (
                  <div className="p-4 bg-gh-canvas border border-amber-500/40 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-amber-400 font-mono font-bold">Step 1: Uninspected Working Directory</div>
                    <p className="text-xs text-gh-text-muted">You edited code in your editor, but Git has not yet classified what changed.</p>
                    <div className="p-3 bg-gh-canvas-inset rounded-lg font-mono text-xs text-gh-text-muted">
                      Status: Unknown diffs in files
                    </div>
                  </div>
                )}
                {currentStepIndex === 1 && (
                  <div className="p-4 bg-gh-canvas border border-blue-500/50 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-blue-400 font-mono font-bold flex items-center justify-center gap-1.5">
                      <Search className="w-4 h-4 animate-spin" /> Step 2: 3-Tier Radar Laser Scan
                    </div>
                    <div className="flex items-center justify-around py-3 font-mono text-xs">
                      <div className="p-2 bg-rose-500/10 border border-rose-500/30 rounded text-rose-300">Working Tree</div>
                      <ArrowRight className="w-4 h-4 text-gh-text-muted" />
                      <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded text-emerald-300">Staging Area</div>
                      <ArrowRight className="w-4 h-4 text-gh-text-muted" />
                      <div className="p-2 bg-purple-500/10 border border-purple-500/30 rounded text-purple-300">HEAD Snapshot</div>
                    </div>
                  </div>
                )}
                {currentStepIndex >= 2 && (
                  <div className="p-4 bg-gh-canvas border border-emerald-500/50 rounded-xl space-y-3 shadow-xl">
                    <div className="text-xs text-emerald-400 font-mono font-bold flex items-center justify-between">
                      <span>Step 3: Instant Triage Breakdown</span>
                      <span className="bg-emerald-500/20 px-2 py-0.5 rounded text-[10px]">ANALYZED</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                      <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                        <div className="text-rose-400 font-bold mb-1">Unstaged Changes:</div>
                        <div className="text-rose-300 text-[11px]">- app.js (modified)</div>
                        <div className="text-rose-300 text-[11px]">- test.js (untracked)</div>
                      </div>
                      <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                        <div className="text-emerald-400 font-bold mb-1">Changes to Commit:</div>
                        <div className="text-emerald-300 text-[11px]">+ style.css (staged)</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* 2-2 & 2-3: add-file & add-all */}
            {/* ============================================================ */}
            {(activeExplainer.visualScene === 'add-file' || activeExplainer.visualScene === 'add-all') && (
              <div className="w-full max-w-lg">
                {currentStepIndex === 0 && (
                  <div className="p-4 bg-gh-canvas border border-rose-500/40 rounded-xl space-y-3 shadow-xl">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-rose-400 font-bold">Step 1: Files Unstaged in Working Directory</span>
                      <span className="bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded text-[10px]">DIRTY</span>
                    </div>
                    <div className="p-3 bg-gh-canvas-inset rounded-lg font-mono text-xs text-rose-400 border border-rose-500/20">
                      <div>✖ index.html (modified - not staged for commit)</div>
                      <div>✖ app.js (untracked)</div>
                    </div>
                    <p className="text-[11px] text-gh-text-muted">Files exist on disk, but Git will NOT include them in the next commit yet.</p>
                  </div>
                )}
                {currentStepIndex === 1 && (
                  <div className="p-4 bg-gh-canvas border border-blue-500/50 rounded-xl space-y-3 shadow-xl">
                    <div className="text-xs text-blue-400 font-mono font-bold flex items-center gap-1.5">
                      <FileText className="w-4 h-4" /> Step 2: Hashing File into SHA-1 Blob &amp; Moving to Index
                    </div>
                    <div className="flex items-center justify-center gap-4 py-2">
                      <div className="p-2.5 bg-gh-canvas-inset rounded border border-rose-500/40 font-mono text-xs text-rose-300">
                        Working Dir
                      </div>
                      <motion.div animate={{ x: [0, 20, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                        <div className="bg-emerald-500 text-black px-2.5 py-1 rounded font-mono font-bold text-[10px]">
                          SHA-1 Blob ➔
                        </div>
                      </motion.div>
                      <div className="p-2.5 bg-gh-canvas-inset rounded border border-emerald-500/40 font-mono text-xs text-emerald-300">
                        Staging Area
                      </div>
                    </div>
                  </div>
                )}
                {currentStepIndex >= 2 && (
                  <div className="p-4 bg-gh-canvas border border-emerald-500/50 rounded-xl space-y-3 shadow-xl">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-bold flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Step 3: Staged in Index Ready for Commit</span>
                      <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded text-[10px]">STAGED</span>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-lg font-mono text-xs text-emerald-300 border border-emerald-500/30">
                      <div>✔ index.html (changes to be committed)</div>
                      <div>✔ app.js (ready for commit snapshot)</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* 2-4: commit-msg */}
            {/* ============================================================ */}
            {activeExplainer.visualScene === 'commit-msg' && (
              <div className="w-full max-w-lg">
                {currentStepIndex === 0 && (
                  <div className="p-4 bg-gh-canvas border border-gh-border rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-gh-text-muted font-mono font-bold">Step 1: Staged Files Waiting at Parent Commit</div>
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gh-accent text-white flex items-center justify-center font-bold text-xs font-mono">c1</div>
                      <div className="text-left font-mono text-xs text-emerald-400 bg-emerald-500/10 p-2 rounded border border-emerald-500/30">
                        Staging Index: 2 files staged
                      </div>
                    </div>
                  </div>
                )}
                {currentStepIndex === 1 && (
                  <div className="p-4 bg-gh-canvas border border-blue-500/50 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-blue-400 font-mono font-bold">Step 2: Freezing Staging Tree &amp; Signing Metadata</div>
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30 font-mono text-xs text-blue-200">
                      <div>Tree SHA: 4b825dc...</div>
                      <div>Author: Your Name &lt;email&gt;</div>
                      <div>Parent: c1</div>
                    </div>
                  </div>
                )}
                {currentStepIndex >= 2 && (
                  <div className="p-4 bg-gh-canvas border border-emerald-500/50 rounded-xl space-y-3 shadow-xl">
                    <div className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Step 3: New Immutable Snapshot Spawned!
                    </div>
                    <div className="flex items-center justify-center gap-4 py-2">
                      <div className="w-10 h-10 rounded-full bg-gh-border text-gh-text-muted flex items-center justify-center font-bold text-xs font-mono">c1</div>
                      <ArrowRight className="w-4 h-4 text-gh-text-muted" />
                      <div className="w-14 h-14 rounded-full bg-emerald-500 text-black flex flex-col items-center justify-center font-bold text-xs font-mono shadow-2xl ring-4 ring-emerald-500/30">
                        c2
                        <span className="text-[8px] font-normal">7fa28c</span>
                      </div>
                    </div>
                    <div className="text-center font-mono text-xs text-emerald-300">HEAD ➔ main ➔ c2 (snapshot complete)</div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* 3-2 & 3-3: switch-create & switch-existing */}
            {/* ============================================================ */}
            {(activeExplainer.visualScene === 'switch-create' || activeExplainer.visualScene === 'switch-existing') && (
              <div className="w-full max-w-lg">
                {currentStepIndex === 0 && (
                  <div className="p-4 bg-gh-canvas border border-gh-border rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-gh-text-muted font-mono font-bold">Step 1: Currently on Main Branch</div>
                    <div className="p-3 bg-gh-canvas-inset rounded-lg font-mono text-xs text-gh-accent font-bold">
                      HEAD ➔ main (pointing to c1)
                    </div>
                  </div>
                )}
                {currentStepIndex === 1 && (
                  <div className="p-4 bg-gh-canvas border border-blue-500/50 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-blue-400 font-mono font-bold">Step 2: Minting New Branch Reference</div>
                    <div className="flex items-center justify-center gap-3 py-2">
                      <span className="font-mono text-xs text-gh-text-muted">refs/heads/main</span>
                      <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1 }}>
                        <GitBranch className="w-5 h-5 text-purple-400" />
                      </motion.div>
                      <span className="font-mono text-xs text-purple-300 font-bold bg-purple-500/20 px-2.5 py-1 rounded border border-purple-500/40">
                        refs/heads/feature
                      </span>
                    </div>
                  </div>
                )}
                {currentStepIndex >= 2 && (
                  <div className="p-4 bg-gh-canvas border border-emerald-500/50 rounded-xl space-y-3 shadow-xl">
                    <div className="text-xs text-emerald-400 font-mono font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Step 3: HEAD Snaps to New Branch</span>
                      <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-[10px]">SWITCHED</span>
                    </div>
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30 text-center font-mono text-xs">
                      <div className="text-purple-300 font-bold">HEAD ➔ refs/heads/feature</div>
                      <div className="text-[11px] text-gh-text-muted mt-1">Working tree is safely switched to feature. All future commits go to feature!</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* 3-4: merge-branches */}
            {/* ============================================================ */}
            {activeExplainer.visualScene === 'merge-branches' && (
              <div className="w-full max-w-lg">
                {currentStepIndex === 0 && (
                  <div className="p-4 bg-gh-canvas border border-gh-border rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-gh-text-muted font-mono font-bold">Step 1: Two Diverged Branches</div>
                    <div className="flex items-center justify-around font-mono text-xs">
                      <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 rounded text-blue-300">main: c2 (auth)</div>
                      <div className="p-2.5 bg-purple-500/10 border border-purple-500/30 rounded text-purple-300">feature: c3 (navbar)</div>
                    </div>
                  </div>
                )}
                {currentStepIndex === 1 && (
                  <div className="p-4 bg-gh-canvas border border-blue-500/50 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-blue-400 font-mono font-bold">Step 2: 3-Way Common Ancestor Calculation</div>
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30 font-mono text-xs text-blue-200">
                      Comparing Ancestor c1 against main (c2) and feature (c3)...
                    </div>
                  </div>
                )}
                {currentStepIndex >= 2 && (
                  <div className="p-4 bg-gh-canvas border border-emerald-500/50 rounded-xl space-y-3 shadow-xl">
                    <div className="text-xs text-emerald-400 font-mono font-bold flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Step 3: Merge Commit Forged</span>
                      <span className="bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded text-[10px]">MERGED</span>
                    </div>
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30 text-center font-mono text-xs">
                      <div className="text-purple-300 font-bold">Merge Commit c4 (Parents: c2, c3)</div>
                      <div className="text-[11px] text-gh-text-muted mt-1">Both features now unified safely in main history.</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* 5-4 & 5-5: reset-soft & reset-hard */}
            {/* ============================================================ */}
            {(activeExplainer.visualScene === 'reset-soft' || activeExplainer.visualScene === 'reset-hard') && (
              <div className="w-full max-w-lg">
                {currentStepIndex === 0 && (
                  <div className="p-4 bg-gh-canvas border border-gh-border rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-gh-text-muted font-mono font-bold">Step 1: Commit c2 Created Pre-maturely</div>
                    <div className="flex items-center justify-center gap-4 font-mono text-xs">
                      <div className="w-10 h-10 rounded-full bg-gh-border flex items-center justify-center text-gh-text">c1</div>
                      <ArrowRight className="w-4 h-4 text-gh-text-muted" />
                      <div className="w-12 h-12 rounded-full bg-rose-500/40 border border-rose-500 text-rose-200 flex items-center justify-center font-bold">c2</div>
                    </div>
                  </div>
                )}
                {currentStepIndex === 1 && (
                  <div className="p-4 bg-gh-canvas border border-blue-500/50 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-blue-400 font-mono font-bold">Step 2: Rewinding HEAD &amp; Branch Pointer to c1</div>
                    <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30 font-mono text-xs text-yellow-300">
                      HEAD~1 rewinds branch pointer backwards from c2 to c1...
                    </div>
                  </div>
                )}
                {currentStepIndex >= 2 && (
                  <div className="p-4 bg-gh-canvas border border-emerald-500/50 rounded-xl space-y-3 shadow-xl">
                    <div className="text-xs font-mono font-bold flex items-center justify-between">
                      <span className="text-emerald-400">Step 3: Snapshot Difference</span>
                      <span className="text-[10px] bg-gh-border px-2 py-0.5 rounded font-mono">RESULT</span>
                    </div>
                    {activeExplainer.visualScene === 'reset-soft' ? (
                      <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30 font-mono text-xs text-emerald-300">
                        <div className="font-bold">✔ Soft Reset: Changes kept staged!</div>
                        <div className="text-[11px] text-emerald-400/80">Files from c2 are preserved in Staging Index ready to recommit.</div>
                      </div>
                    ) : (
                      <div className="p-3 bg-rose-500/10 rounded-lg border border-rose-500/30 font-mono text-xs text-rose-300">
                        <div className="font-bold">✖ Hard Reset: Changes completely erased!</div>
                        <div className="text-[11px] text-rose-400/80">Staging Area &amp; Working Tree are forcefully wiped clean to c1.</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* 5-7 & 5-8: stash-save & stash-pop */}
            {/* ============================================================ */}
            {(activeExplainer.visualScene === 'stash-save' || activeExplainer.visualScene === 'stash-pop') && (
              <div className="w-full max-w-lg">
                {currentStepIndex === 0 && (
                  <div className="p-4 bg-gh-canvas border border-amber-500/40 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-amber-400 font-mono font-bold">Step 1: Unfinished Work in Progress (WIP)</div>
                    <div className="p-3 bg-rose-500/10 rounded-lg border border-rose-500/30 font-mono text-xs text-rose-300">
                      Uncommitted edits blocking branch switch!
                    </div>
                  </div>
                )}
                {currentStepIndex === 1 && (
                  <div className="p-4 bg-gh-canvas border border-blue-500/50 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-blue-400 font-mono font-bold">Step 2: Sliding Work into Encrypted Lockbox</div>
                    <div className="flex items-center justify-center gap-3 py-2">
                      <Archive className="w-6 h-6 text-purple-400 animate-bounce" />
                      <span className="font-mono text-xs text-purple-300 font-bold">Saving to stash@&#123;0&#125; stack</span>
                    </div>
                  </div>
                )}
                {currentStepIndex >= 2 && (
                  <div className="p-4 bg-gh-canvas border border-emerald-500/50 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-emerald-400 font-mono font-bold">Step 3: Clean Working Tree / Restored State</div>
                    <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30 font-mono text-xs text-emerald-300">
                      Working tree is completely pristine and ready!
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* 6-4: bisect-binary */}
            {/* ============================================================ */}
            {activeExplainer.visualScene === 'bisect-binary' && (
              <div className="w-full max-w-lg">
                {currentStepIndex === 0 && (
                  <div className="p-4 bg-gh-canvas border border-gh-border rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-gh-text-muted font-mono font-bold">Step 1: Bug Discovered across 7 Commits</div>
                    <div className="flex items-center justify-center gap-2 font-mono text-xs">
                      <span className="p-1 rounded bg-emerald-500/20 text-emerald-400">c1 (Good)</span>
                      <span>...</span>
                      <span className="p-1 rounded bg-rose-500/20 text-rose-400">c7 (Bad)</span>
                    </div>
                  </div>
                )}
                {currentStepIndex === 1 && (
                  <div className="p-4 bg-gh-canvas border border-blue-500/50 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-blue-400 font-mono font-bold">Step 2: Binary Search Tests Midpoint (c4)</div>
                    <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30 font-mono text-xs text-yellow-300">
                      Midpoint c4 tested ➔ Bug exists! Range narrowed to c1..c4.
                    </div>
                  </div>
                )}
                {currentStepIndex >= 2 && (
                  <div className="p-4 bg-gh-canvas border border-emerald-500/50 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-emerald-400 font-mono font-bold">Step 3: Offending Commit Isolated!</div>
                    <div className="p-3 bg-rose-500/10 rounded-lg border border-rose-500/30 font-mono text-xs text-rose-300">
                      Culprit found at c3 in O(log N) steps!
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* 7-3: cherry-pick */}
            {/* ============================================================ */}
            {activeExplainer.visualScene === 'cherry-pick' && (
              <div className="w-full max-w-lg">
                {currentStepIndex === 0 && (
                  <div className="p-4 bg-gh-canvas border border-gh-border rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-gh-text-muted font-mono font-bold">Step 1: Bugfix Trapped in Feature Branch</div>
                    <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30 font-mono text-xs text-purple-300">
                      Commit c_hot exists on feature branch, but you cannot merge the whole feature yet.
                    </div>
                  </div>
                )}
                {currentStepIndex === 1 && (
                  <div className="p-4 bg-gh-canvas border border-blue-500/50 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-blue-400 font-mono font-bold">Step 2: Robotic Crane Plucks Isolated Diff</div>
                    <div className="flex items-center justify-center gap-3 py-2">
                      <Scissors className="w-6 h-6 text-yellow-400 animate-pulse" />
                      <span className="font-mono text-xs text-yellow-300">Extracting patch diff of c_hot...</span>
                    </div>
                  </div>
                )}
                {currentStepIndex >= 2 && (
                  <div className="p-4 bg-gh-canvas border border-emerald-500/50 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-emerald-400 font-mono font-bold">Step 3: Twin Commit Forged on Main</div>
                    <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30 font-mono text-xs text-emerald-300">
                      c_copy applied to main branch cleanly without merging feature!
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ============================================================ */}
            {/* DEFAULT FALLBACK SCENE (For any other command) */}
            {/* ============================================================ */}
            {![
              'config-name', 'config-email', 'init-repo', 'scan-status',
              'add-file', 'add-all', 'commit-msg', 'switch-create',
              'switch-existing', 'merge-branches', 'reset-soft',
              'reset-hard', 'stash-save', 'stash-pop', 'bisect-binary',
              'cherry-pick'
            ].includes(activeExplainer.visualScene) && (
              <div className="w-full max-w-lg">
                {currentStepIndex === 0 && (
                  <div className="p-4 bg-gh-canvas border border-amber-500/40 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-amber-400 font-mono font-bold flex items-center justify-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" /> Step 1: Initial State Before Execution
                    </div>
                    <div className="p-3 bg-gh-canvas-inset rounded-lg font-mono text-xs text-gh-text-muted">
                      {activeExplainer.command} is ready to be invoked.
                    </div>
                  </div>
                )}
                {currentStepIndex === 1 && (
                  <div className="p-4 bg-gh-canvas border border-blue-500/50 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-blue-400 font-mono font-bold flex items-center justify-center gap-1.5">
                      <Terminal className="w-4 h-4 animate-spin" /> Step 2: Internal Mechanism in Motion
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30 font-mono text-xs text-blue-300">
                      Git engine processes filesystem buffers and metadata.
                    </div>
                  </div>
                )}
                {currentStepIndex >= 2 && (
                  <div className="p-4 bg-gh-canvas border border-emerald-500/50 rounded-xl space-y-3 shadow-xl text-center">
                    <div className="text-xs text-emerald-400 font-mono font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Step 3: Verified Final State
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/30 font-mono text-xs text-emerald-300">
                      Changes successfully recorded in Git internal database.
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step Description & Key Takeaway Footer */}
      <div className="bg-gh-canvas-subtle border-t border-gh-border p-3.5 shrink-0">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gh-accent flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-gh-accent" />
              <span>{language === 'bn' ? currentStep.titleBn : currentStep.titleEn}</span>
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
                onClick={() => { setCurrentStepIndex(idx); setIsPlaying(false); }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentStepIndex
                    ? 'w-7 bg-gh-accent'
                    : 'w-2 bg-gh-border hover:bg-gh-text-muted'
                }`}
                title={`Jump to Step ${idx + 1}`}
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
