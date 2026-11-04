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
  ArrowRight
} from 'lucide-react';

export interface ExplainerStep {
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  visualType: 
    | 'config-stamp' 
    | 'init-repo' 
    | 'clone-stream' 
    | 'scan-status' 
    | 'staging-fly' 
    | 'commit-spawn' 
    | 'branch-fork' 
    | 'switch-head' 
    | 'merge-diamond' 
    | 'rebase-replay' 
    | 'stash-box' 
    | 'reset-rewind' 
    | 'bisect-divide' 
    | 'cherry-pluck' 
    | 'push-cloud'
    | 'gh-pr';
}

export interface CommandExplainerData {
  command: string;
  titleEn: string;
  titleBn: string;
  category: string;
  steps: ExplainerStep[];
}

const EXPLAINERS: Record<string, CommandExplainerData> = {
  'config': {
    command: 'git config --global user.name "Your Name"',
    titleEn: 'How Git Sets Author Identity',
    titleBn: 'গিট কীভাবে লেখক পরিচিতি সেট করে',
    category: 'Setup & Config',
    steps: [
      {
        titleEn: 'Step 1: Open Global Config',
        titleBn: 'ধাপ ১: গ্লোবাল কনফিগারেশন ফাইল ওপেন',
        descriptionEn: 'Git opens your machine-level ~/.gitconfig file in user home directory.',
        descriptionBn: 'গিট আপনার কম্পিউটারের হোম ডিরেক্টরিতে থাকা ~/.gitconfig ফাইলটি খোলে।',
        visualType: 'config-stamp'
      },
      {
        titleEn: 'Step 2: Serialize Name & Email',
        titleBn: 'ধাপ ২: নাম ও ইমেইল রাইট করা',
        descriptionEn: 'The string is formatted into INI format: [user] name = "Your Name".',
        descriptionBn: 'আপনার নাম ও ইমেইলকে [user] ব্লকে ফরম্যাট করে ফাইলে রাইট করা হয়।',
        visualType: 'config-stamp'
      },
      {
        titleEn: 'Step 3: Stamped on Every Future Commit',
        titleBn: 'ধাপ ৩: প্রতিটি পরবর্তী কমিটে লেখকের সিলমোহর',
        descriptionEn: 'Every commit you make from now on embeds this author signature into its immutable SHA-1 header.',
        descriptionBn: 'এখন থেকে তৈরি হওয়া প্রতিটি কমিটের মেটাডাটাতে এই লেখকের নাম ও ইমেইল সিলমোহর হয়ে যায়।',
        visualType: 'config-stamp'
      }
    ]
  },
  'init': {
    command: 'git init',
    titleEn: 'Repository Initialization Under the Hood',
    titleBn: 'git init-এর অভ্যন্তরীণ মেকানিজম',
    category: 'Setup',
    steps: [
      {
        titleEn: 'Step 1: Ordinary Directory',
        titleBn: 'ধাপ ১: সাধারণ ফোল্ডার',
        descriptionEn: 'You start with a regular operating system folder with no version tracking.',
        descriptionBn: 'শুরুতে এটি একটি সাধারণ ফোল্ডার যার কোনো গিট ট্র্যাকিং থাকে না।',
        visualType: 'init-repo'
      },
      {
        titleEn: 'Step 2: Materialize .git Directory',
        titleBn: 'ধাপ ২: .git ডিরেক্টরি তৈরি',
        descriptionEn: 'Git creates the hidden .git directory containing objects/, refs/, and config.',
        descriptionBn: 'গিট একটি লুকানো .git ফোল্ডার তৈরি করে যেখানে অবজেক্টস এবং রেফারেন্স সংরক্ষিত হয়।',
        visualType: 'init-repo'
      },
      {
        titleEn: 'Step 3: Point HEAD to refs/heads/main',
        titleBn: 'ধাপ ৩: HEAD পয়েন্টার ইনিশিয়ালাইজ',
        descriptionEn: 'A ref pointer file HEAD is created containing "ref: refs/heads/main".',
        descriptionBn: 'HEAD পয়েন্টার তৈরি হয়ে ডিফল্ট ব্রাঞ্চ হিসেবে main-এর দিকে তাক করে প্রস্তুত থাকে।',
        visualType: 'init-repo'
      }
    ]
  },
  'add': {
    command: 'git add .',
    titleEn: 'Staging Files: From Working Tree to Index',
    titleBn: 'স্টেজিং মেকানিজম: ফাইল থেকে ব্লব হ্যাশ ও ইনডেক্স',
    category: 'Basic Workflow',
    steps: [
      {
        titleEn: 'Step 1: Compute SHA-1 Hashing',
        titleBn: 'ধাপ ১: SHA-1 হ্যাশ তৈরি',
        descriptionEn: 'Git reads the file content and calculates a unique 40-character SHA-1 hash.',
        descriptionBn: 'গিট ফাইলের কন্টেন্ট পড়ে একটি ইউনিক ৪০ অক্ষরের হ্যাশ তৈরি করে।',
        visualType: 'staging-fly'
      },
      {
        titleEn: 'Step 2: Write Compressed Blob Object',
        titleBn: 'ধাপ ২: কমপ্রেসড ব্লব (Blob) অবজেক্ট সংরক্ষণ',
        descriptionEn: 'The file is zlib-compressed and stored in .git/objects/ as a raw Blob.',
        descriptionBn: 'ফাইলটি কমপ্রেস করে .git/objects-এ একটি ব্লব অবজেক্ট হিসেবে সেভ করা হয়।',
        visualType: 'staging-fly'
      },
      {
        titleEn: 'Step 3: Register in Staging Area (.git/index)',
        titleBn: 'ধাপ ৩: স্টেজিং ইনডেক্সে নথিবদ্ধ',
        descriptionEn: 'The filename and its new Blob hash are recorded in the binary staging index.',
        descriptionBn: 'ফাইলের নাম এবং তার ব্লব হ্যাশ স্টেজিং ইনডেক্সে যুক্ত হয়ে কমিটের জন্য প্রস্তুত হয়।',
        visualType: 'staging-fly'
      }
    ]
  },
  'commit': {
    command: 'git commit -m "message"',
    titleEn: 'How a Commit Object is Born',
    titleBn: 'কমিট অবজেক্ট কীভাবে তৈরি হয়',
    category: 'Basic Workflow',
    steps: [
      {
        titleEn: 'Step 1: Freeze Tree Object Snapshot',
        titleBn: 'ধাপ ১: ট্রি (Tree) অবজেক্ট স্ন্যাপশট',
        descriptionEn: 'Git creates a Tree object representing the staged directory structure and file hashes.',
        descriptionBn: 'স্টেজিং এরিয়ার সমস্ত ফাইল মিলিয়ে গিট একটি ট্রি স্ন্যাপশট তৈরি করে।',
        visualType: 'commit-spawn'
      },
      {
        titleEn: 'Step 2: Generate Commit Metadata',
        titleBn: 'ধাপ ২: কমিট মেটাডাটা ও প্যারেন্ট পয়েন্টার',
        descriptionEn: 'A commit object is created with Tree SHA, Parent Commit SHA, author, timestamp, and message.',
        descriptionBn: 'কমিট অবজেক্টে ট্রি হ্যাশ, পূর্ববর্তী প্যারেন্ট কমিটের হ্যাশ এবং মেসেজ সিল করা হয়।',
        visualType: 'commit-spawn'
      },
      {
        titleEn: 'Step 3: Move Branch & HEAD Forward',
        titleBn: 'ধাপ ৩: ব্রাঞ্চ পয়েন্টার ও HEAD সামনে অগ্রসর',
        descriptionEn: 'The active branch reference (refs/heads/main) updates its SHA to the new commit node.',
        descriptionBn: 'ব্রাঞ্চ পয়েন্টার এবং HEAD মসৃণভাবে নতুন কমিট নোডে এগিয়ে যায়।',
        visualType: 'commit-spawn'
      }
    ]
  },
  'branch': {
    command: 'git switch -c feature',
    titleEn: 'Branch Creation & HEAD Detachment',
    titleBn: 'ব্রাঞ্চ তৈরি ও HEAD পয়েন্টারের সুইচিং',
    category: 'Branching',
    steps: [
      {
        titleEn: 'Step 1: Write 41-Byte Ref File',
        titleBn: 'ধাপ ১: ৪১-বাইটের টেক্সট রেফারেন্স তৈরি',
        descriptionEn: 'Git simply writes the current commit hash into .git/refs/heads/feature.',
        descriptionBn: 'গিট বর্তমান কমিটের হ্যাশটি .git/refs/heads/feature ফাইলে লিখে নতুন ব্রাঞ্চ বানায়।',
        visualType: 'branch-fork'
      },
      {
        titleEn: 'Step 2: Decouple HEAD Pointer',
        titleBn: 'ধাপ ২: HEAD পয়েন্টার আনকাপল হওয়া',
        descriptionEn: 'HEAD unlinks from the previous branch pointer.',
        descriptionBn: 'HEAD আগের ব্রাঞ্চ থেকে আলাদা হয়ে যায়।',
        visualType: 'switch-head'
      },
      {
        titleEn: 'Step 3: Magnetic Snap onto New Branch',
        titleBn: 'ধাপ ৩: নতুন ব্রাঞ্চে ম্যাগনেটিক স্ন্যাপ',
        descriptionEn: 'HEAD points to refs/heads/feature. Any new commits will now advance the feature branch!',
        descriptionBn: 'HEAD নতুন ব্রাঞ্চে স্ন্যাপ হয়। এখন নতুন কমিট দিলে কেবল এই ব্রাঞ্চই সামনে এগোবে।',
        visualType: 'switch-head'
      }
    ]
  },
  'merge': {
    command: 'git merge feature',
    titleEn: '3-Way Merge Diamond Formation',
    titleBn: '৩-ওয়ে মার্জ ডায়মন্ড কীভাবে তৈরি হয়',
    category: 'Merging',
    steps: [
      {
        titleEn: 'Step 1: Locate Merge Base',
        titleBn: 'ধাপ ১: কমন পূর্বপুরুষ (Merge Base) চিহ্নিত করা',
        descriptionEn: 'Git traverses backwards through history to find the common ancestor commit of both branches.',
        descriptionBn: 'উভয় ব্রাঞ্চের কমন পূর্বপুরুষ কমিটটি গিট খুঁজে বের করে।',
        visualType: 'merge-diamond'
      },
      {
        titleEn: 'Step 2: Combine File Diffs',
        titleBn: 'ধাপ ২: উভয় ব্রাঞ্চের কোড একীভূতকরণ',
        descriptionEn: 'Changes from main and feature are unified into a new combined tree snapshot.',
        descriptionBn: 'উভয় ব্রাঞ্চের পরিবর্তনসমূহ মিলিয়ে একটি সম্পূর্ণ নতুন কম্বাইন্ড ট্রি তৈরি হয়।',
        visualType: 'merge-diamond'
      },
      {
        titleEn: 'Step 3: Spawn 2-Parent Merge Diamond',
        titleBn: 'ধাপ ৩: দুই-প্যারেন্ট বিশিষ্ট মার্জ নোড জন্ম নেওয়া',
        descriptionEn: 'A special commit node is created pointing to BOTH branch tips as its parents!',
        descriptionBn: 'একটি বিশেষ মার্জ নোড তৈরি হয় যার দুটি প্যারেন্ট অ্যারো উভয় ব্রাঞ্চের মাথায় যুক্ত থাকে।',
        visualType: 'merge-diamond'
      }
    ]
  },
  'rebase': {
    command: 'git rebase main',
    titleEn: 'Interactive Replay of Commits',
    titleBn: 'রিবেস মেকানিজম: কমিট উত্তোলন ও নতুন বেসে রোপণ',
    category: 'Rebasing',
    steps: [
      {
        titleEn: 'Step 1: Unhook Feature Commits',
        titleBn: 'ধাপ ১: ফিচার কমিটগুলো আনহুক বা উত্তোলন',
        descriptionEn: 'Git lifts the unique commits off the feature branch and stores them temporarily as patches.',
        descriptionBn: 'গিট ফিচার ব্রাঞ্চের নিজস্ব কমিটগুলোকে আগের বেস থেকে সাময়িকভাবে উঠিয়ে নেয়।',
        visualType: 'rebase-replay'
      },
      {
        titleEn: 'Step 2: Advance Base Tip',
        titleBn: 'ধাপ ২: নতুন বেসের মাথায় পয়েন্টার সরানো',
        descriptionEn: 'The branch base is aligned directly with the latest commit on main.',
        descriptionBn: 'মেইন ব্রাঞ্চের লেটেস্ট কমিটের সাথে ব্রাঞ্চের বেস সোজা করা হয়।',
        visualType: 'rebase-replay'
      },
      {
        titleEn: 'Step 3: Replay Each Commit with New SHA',
        titleBn: 'ধাপ ৩: নতুন হ্যাশ দিয়ে একে একে পুনরায় বসানো',
        descriptionEn: 'Each commit is reapplied cleanly on top of main, creating a perfectly linear history!',
        descriptionBn: 'প্রতিটি কমিট নতুন SHA হ্যাশ নিয়ে মেইনের মাথার উপরে সুন্দর সোজা লাইনে বসে যায়।',
        visualType: 'rebase-replay'
      }
    ]
  },
  'stash': {
    command: 'git stash',
    titleEn: 'Stash Chest: Saving Dirty State',
    titleBn: 'স্ট্যাশ মেকানিজম: অসম্পূর্ণ কোড গোপন বাক্সে রাখা',
    category: 'Undoing',
    steps: [
      {
        titleEn: 'Step 1: Collect Dirty Working Files',
        titleBn: 'ধাপ ১: অসম্পূর্ণ ফাইলগুলো একত্রিত করা',
        descriptionEn: 'Git scans your working tree and staging area for all uncommitted changes.',
        descriptionBn: 'গিট আপনার অসম্পূর্ণ পরিবর্তিত ফাইলগুলোকে সংগ্রহ করে।',
        visualType: 'stash-box'
      },
      {
        titleEn: 'Step 2: Pack into Hidden Stash Commit',
        titleBn: 'ধাপ ২: স্ট্যাশ কমিট বাক্সে সিল করা',
        descriptionEn: 'Files are packaged into a dangling commit stored at refs/stash.',
        descriptionBn: 'ফাইলগুলোকে একটি স্ট্যাশ কমিট অবজেক্ট বানিয়ে refs/stash বাক্সে সিল করা হয়।',
        visualType: 'stash-box'
      },
      {
        titleEn: 'Step 3: Reset Workspace to Pristine HEAD',
        titleBn: 'ধাপ ৩: ওয়ার্কস্পেস একদম ঝকঝকে ক্লিন করা',
        descriptionEn: 'Your working directory is reset to match HEAD, ready for immediate branch switching.',
        descriptionBn: 'ওয়ার্কস্পেস একদম পরিষ্কার হয়ে যায় যাতে জরুরি অন্য কাজে যাওয়া যায়।',
        visualType: 'stash-box'
      }
    ]
  },
  'push': {
    command: 'git push origin main',
    titleEn: 'Network Transport to GitHub Cloud',
    titleBn: 'গিটহাব ক্লাউডে কোড ট্রান্সপোর্টেশন মেকানিজম',
    category: 'Remote',
    steps: [
      {
        titleEn: 'Step 1: Package Local Objects',
        titleBn: 'ধাপ ১: লোকাল অবজেক্ট প্যাকফাইল তৈরি',
        descriptionEn: 'Git bundles all local commits, trees, and blobs into a compressed network packfile.',
        descriptionBn: 'লোকাল কমিট ও ফাইলগুলোকে একটি কমপ্রেসড নেটওয়ার্ক প্যাকেটে প্যাক করা হয়।',
        visualType: 'push-cloud'
      },
      {
        titleEn: 'Step 2: Stream Packfile Over HTTPS/SSH',
        titleBn: 'ধাপ ২: ক্লাউডে ডেটা প্যাকেট ট্রান্সফার',
        descriptionEn: 'Packets stream across the network wire to GitHub\'s cloud server.',
        descriptionBn: 'ডেটা প্যাকেটগুলো তারের মাধ্যমে উড়ে গিটহাবের সার্ভারে পৌঁছায়।',
        visualType: 'push-cloud'
      },
      {
        titleEn: 'Step 3: Update Remote Ref origin/main',
        titleBn: 'ধাপ ৩: রিমোট রেফারেন্স আপডেট',
        descriptionEn: 'GitHub unpacks the commits and advances the remote origin/main tracking branch!',
        descriptionBn: 'গিটহাব কোডগুলো আনপ্যাক করে origin/main পয়েন্টারকে নতুন কমিটে এগিয়ে দেয়।',
        visualType: 'push-cloud'
      }
    ]
  }
};

interface AnimatedExplainerProps {
  currentCommandHint?: string;
  language: 'bn' | 'en';
}

export const AnimatedExplainer: React.FC<AnimatedExplainerProps> = ({
  currentCommandHint,
  language
}) => {
  // Determine which explainer matches the current command or context
  const getExplainerKey = (): string => {
    if (!currentCommandHint) return 'commit';
    const c = currentCommandHint.toLowerCase();
    if (c.includes('config')) return 'config';
    if (c.includes('init')) return 'init';
    if (c.includes('add')) return 'add';
    if (c.includes('commit')) return 'commit';
    if (c.includes('switch') || c.includes('checkout') || c.includes('branch')) return 'branch';
    if (c.includes('merge')) return 'merge';
    if (c.includes('rebase')) return 'rebase';
    if (c.includes('stash')) return 'stash';
    if (c.includes('push')) return 'push';
    return 'commit';
  };

  const [activeKey, setActiveKey] = useState<string>(getExplainerKey());
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // Sync with command hint when user changes lessons
  useEffect(() => {
    const key = getExplainerKey();
    setActiveKey(key);
    setCurrentStepIndex(0);
    setIsPlaying(true);
  }, [currentCommandHint]);

  const explainer = EXPLAINERS[activeKey] || EXPLAINERS['commit'];
  const totalSteps = explainer.steps.length;
  const step = explainer.steps[currentStepIndex];

  // Auto-play timeline loop
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentStepIndex(prev => (prev + 1) % totalSteps);
    }, 3200);
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
      {/* Top Controls Bar */}
      <div className="h-10 border-b border-gh-border px-3 bg-gh-canvas-subtle flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
          <span className="font-bold text-gh-text flex items-center space-x-1">
            <span>{language === 'bn' ? '🎬 লাইভ ইন্টারনাল মেকানিজম অ্যানিমেশন' : '🎬 Live Mechanism Animation'}</span>
          </span>
          <span className="font-mono text-[10px] bg-gh-accent/15 text-gh-accent px-1.5 py-0.5 rounded border border-gh-accent/20">
            {explainer.command}
          </span>
        </div>

        {/* Video-style Player Controls */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={handlePrev}
            className="p-1 hover:bg-gh-border/50 text-gh-text-muted hover:text-gh-text rounded transition"
            title="Previous Step"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-gh-accent/20 hover:bg-gh-accent/30 text-gh-accent font-semibold transition"
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
        {/* Animated Background Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#30363d15_1px,transparent_1px),linear-gradient(to_bottom,#30363d15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Dynamic Graphic Scene per Step */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeKey}-${currentStepIndex}`}
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="w-full h-full flex flex-col items-center justify-center relative z-10"
          >
            {/* Visual Scene 1: Config Stamp */}
            {step.visualType === 'config-stamp' && (
              <div className="flex flex-col items-center space-y-4">
                <motion.div 
                  className="w-80 bg-gh-canvas border border-gh-border rounded-xl p-4 shadow-2xl relative"
                  initial={{ rotateX: 20 }}
                  animate={{ rotateX: 0 }}
                >
                  <div className="flex items-center space-x-2 border-b border-gh-border/50 pb-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="font-mono text-[11px] text-gh-text-muted ml-2">~/.gitconfig</span>
                  </div>
                  <pre className="font-mono text-xs text-gh-text-muted leading-relaxed">
                    <span className="text-gh-purple font-bold">[user]</span>{'\n'}
                    {'    '}name = <span className="text-emerald-400 font-bold">"Fatin Ishraque"</span>{'\n'}
                    {'    '}email = <span className="text-emerald-400 font-bold">"developer@example.com"</span>
                  </pre>
                  {/* Glowing Stamp Overlay */}
                  <motion.div
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="absolute -bottom-3 -right-3 bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 font-bold font-mono text-[10px] px-2.5 py-1 rounded-md shadow-lg rotate-[-8deg] flex items-center space-x-1"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>SIGNED AUTHOR</span>
                  </motion.div>
                </motion.div>
              </div>
            )}

            {/* Visual Scene 2: Init Repo */}
            {step.visualType === 'init-repo' && (
              <div className="flex items-center space-x-6">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="w-40 h-32 bg-gh-canvas border border-dashed border-gh-border rounded-xl flex flex-col items-center justify-center p-3 text-center"
                >
                  <FolderGit2 className="w-8 h-8 text-gh-text-muted mb-2" />
                  <span className="text-xs font-semibold text-gh-text">Project Folder</span>
                  <span className="text-[10px] text-gh-text-subtle">Unversioned</span>
                </motion.div>

                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <ArrowRight className="w-6 h-6 text-gh-accent" />
                </motion.div>

                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', delay: 0.2 }}
                  className="w-48 h-32 bg-gh-canvas border border-gh-accent rounded-xl p-3 shadow-xl relative overflow-hidden flex flex-col justify-between"
                >
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-gh-accent">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>.git/ Repository</span>
                  </div>
                  <div className="space-y-1 font-mono text-[10px] text-gh-text-muted pl-2 border-l border-gh-accent/30">
                    <div>├── objects/ (Database)</div>
                    <div>├── refs/heads/ (Branches)</div>
                    <div>└── HEAD (Pointer)</div>
                  </div>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded text-center font-bold">
                    ACTIVE GIT REPO
                  </span>
                </motion.div>
              </div>
            )}

            {/* Visual Scene 3: Staging Fly */}
            {step.visualType === 'staging-fly' && (
              <div className="flex items-center justify-around w-full max-w-lg">
                <div className="w-36 bg-gh-canvas border border-rose-500/40 rounded-xl p-3 text-center">
                  <div className="text-[11px] font-bold text-rose-400 mb-1">Working Tree</div>
                  <motion.div
                    animate={{ scale: [1, 0.9, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="bg-gh-canvas-subtle p-2 rounded border border-gh-border text-xs font-mono text-gh-text"
                  >
                    app.js (Modified)
                  </motion.div>
                </div>

                {/* Flying Hashed Blob Particle */}
                <motion.div
                  initial={{ x: -40, opacity: 0, scale: 0.5 }}
                  animate={{ x: 40, opacity: 1, scale: 1 }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="bg-gh-accent text-white font-mono text-[10px] px-2.5 py-1 rounded-full shadow-lg flex items-center space-x-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>SHA-1 Blob</span>
                </motion.div>

                <div className="w-36 bg-gh-canvas border border-emerald-500/40 rounded-xl p-3 text-center">
                  <div className="text-[11px] font-bold text-emerald-400 mb-1">Staging Area (.git/index)</div>
                  <motion.div 
                    initial={{ y: 5 }}
                    animate={{ y: 0 }}
                    className="bg-emerald-500/10 p-2 rounded border border-emerald-500/30 text-xs font-mono text-emerald-400"
                  >
                    e82b71... app.js
                  </motion.div>
                </div>
              </div>
            )}

            {/* Visual Scene 4: Commit Spawn */}
            {step.visualType === 'commit-spawn' && (
              <div className="flex items-center space-x-8">
                {/* Parent Commit C1 */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-gh-border border-2 border-gh-text-muted flex items-center justify-center font-mono font-bold text-xs text-white">
                    c1
                  </div>
                  <span className="font-mono text-[10px] text-gh-text-muted">e82b71a</span>
                </div>

                {/* Animated Connecting Parent Line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ duration: 0.6 }}
                  className="h-1 bg-gh-accent relative"
                >
                  <div className="absolute right-0 -top-1 w-2 h-2 border-t-2 border-r-2 border-gh-accent rotate-45" />
                </motion.div>

                {/* New Commit C2 Spawning with Spring */}
                <div className="flex flex-col items-center space-y-2 relative">
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1.2, rotate: 0 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200 }}
                    className="w-12 h-12 rounded-full bg-gh-accent border-4 border-white flex items-center justify-center font-mono font-bold text-xs text-white shadow-2xl"
                  >
                    c2
                  </motion.div>

                  {/* Sliding HEAD Badge */}
                  <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gh-accent/20 border border-gh-accent text-gh-accent font-mono font-bold text-[10px] px-2 py-0.5 rounded shadow"
                  >
                    HEAD -&gt; main
                  </motion.div>
                </div>
              </div>
            )}

            {/* Visual Scene 5: Branch Fork & Switch */}
            {(step.visualType === 'branch-fork' || step.visualType === 'switch-head') && (
              <div className="flex items-center space-x-8">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-gh-border flex items-center justify-center font-mono text-xs text-white">
                    c1
                  </div>
                </div>

                <div className="relative">
                  {/* Main lane */}
                  <div className="flex items-center space-x-6">
                    <div className="w-12 h-0.5 bg-gh-border" />
                    <div className="w-10 h-10 rounded-full bg-gh-accent flex items-center justify-center font-mono text-xs text-white">
                      c2
                    </div>
                  </div>

                  {/* Forked branch */}
                  <motion.div
                    initial={{ opacity: 0, y: -20, x: 20 }}
                    animate={{ opacity: 1, y: -35, x: 60 }}
                    transition={{ duration: 0.5 }}
                    className="absolute top-0 flex items-center space-x-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center font-mono text-xs text-white shadow-lg">
                      c3
                    </div>
                    <span className="font-mono text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded border border-purple-500/30">
                      * feature-auth
                    </span>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Visual Scene 6: Merge Diamond */}
            {step.visualType === 'merge-diamond' && (
              <div className="flex items-center space-x-6">
                <div className="w-9 h-9 rounded-full bg-gh-border flex items-center justify-center font-mono text-xs text-white">
                  c1
                </div>

                <div className="flex flex-col space-y-6">
                  <div className="w-9 h-9 rounded-full bg-gh-accent flex items-center justify-center font-mono text-xs text-white">
                    c2
                  </div>
                  <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center font-mono text-xs text-white">
                    c3
                  </div>
                </div>

                {/* Converging Diamond Merge Commit */}
                <motion.div
                  initial={{ scale: 0, rotate: 45 }}
                  animate={{ scale: 1.1, rotate: 45 }}
                  transition={{ type: 'spring' }}
                  className="w-11 h-11 bg-purple-500 border-2 border-white flex items-center justify-center shadow-2xl relative"
                >
                  <span className="-rotate-45 font-mono text-xs font-bold text-white">M</span>
                </motion.div>
              </div>
            )}

            {/* Visual Scene 7: Rebase Replay */}
            {step.visualType === 'rebase-replay' && (
              <div className="flex flex-col items-center space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-[10px] font-mono text-gh-text-muted">main:</span>
                  <div className="w-8 h-8 rounded-full bg-gh-border flex items-center justify-center text-xs">c1</div>
                  <div className="w-8 h-8 rounded-full bg-gh-border flex items-center justify-center text-xs">c2</div>
                  <div className="w-8 h-8 rounded-full bg-gh-accent flex items-center justify-center text-xs font-bold text-white">c3</div>
                </div>

                {/* Flying Rebased Commit */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1, x: [0, 40, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="flex items-center space-x-2 bg-yellow-500/20 border border-yellow-400 text-yellow-300 px-3 py-1.5 rounded-lg font-mono text-xs shadow-lg"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Replaying c4 -&gt; c4' (New SHA Hash)</span>
                </motion.div>
              </div>
            )}

            {/* Visual Scene 8: Stash Box */}
            {step.visualType === 'stash-box' && (
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-64 bg-gh-canvas border-2 border-gh-attention-fg rounded-xl p-4 shadow-2xl text-center relative"
                >
                  <div className="text-xs font-bold text-gh-attention-fg mb-2 flex items-center justify-center space-x-1.5">
                    <Layers className="w-4 h-4" />
                    <span>Hidden Stash Chest (refs/stash)</span>
                  </div>
                  <div className="space-y-1 font-mono text-[11px] text-gh-text">
                    <div className="bg-gh-canvas-subtle p-1.5 rounded border border-gh-border">
                      📦 stash@&#123;0&#125;: WIP on main (3 files)
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Visual Scene 9: Push Cloud */}
            {step.visualType === 'push-cloud' && (
              <div className="flex items-center justify-around w-full max-w-md">
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-10 h-10 rounded-full bg-gh-accent text-white flex items-center justify-center font-bold text-xs">
                    c1
                  </div>
                  <span className="font-mono text-[10px] text-gh-text-muted">Local</span>
                </div>

                {/* Flying packet */}
                <motion.div
                  animate={{ x: [-40, 40] }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  className="bg-emerald-400 text-black font-mono font-bold text-[9px] px-2 py-0.5 rounded-full shadow"
                >
                  Packfile ➔
                </motion.div>

                <div className="flex flex-col items-center space-y-1">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500 flex items-center justify-center text-purple-400 shadow-xl">
                    <Cloud className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] text-purple-300">GitHub Cloud</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step Description & Timeline Bar */}
      <div className="bg-gh-canvas-subtle border-t border-gh-border p-3.5">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-gh-accent">
              {language === 'bn' ? step.titleBn : step.titleEn}
            </span>
            <span className="text-[10px] font-mono text-gh-text-muted">
              ({currentStepIndex + 1}/{totalSteps})
            </span>
          </div>

          {/* Step Progress Dots */}
          <div className="flex items-center space-x-1.5">
            {explainer.steps.map((_, idx) => (
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
          {language === 'bn' ? step.descriptionBn : step.descriptionEn}
        </p>
      </div>
    </div>
  );
};
