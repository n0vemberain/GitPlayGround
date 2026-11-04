import { Level } from '../types/curriculum';

export const CURRICULUM: Level[] = [
  {
    id: 1,
    number: '01',
    titleEn: 'Git Foundations & Internals',
    titleBn: 'গিট ফাউন্ডেশন ও ইন্টারনালস',
    subtitleEn: 'How Git stores data: Blobs, Trees, Commits & Your First Repo',
    subtitleBn: 'গিট কীভাবে ডেটা রাখে: ব্লব, ট্রি, কমিট ও প্রথম রিপোজিটরি',
    iconName: 'Database',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    videoCourseTitle: 'ThePrimeagen / Boot.dev: Git and GitHub - Full Course',
    videoUrl: 'https://youtu.be/rH3zE7VlIMs',
    lessons: [
      {
        id: '1-1',
        levelId: 1,
        order: 1,
        titleEn: 'Git Internals: Plumbing vs Porcelain',
        titleBn: 'গিট ইন্টারনালস: প্লাম্বিং বনাম পোরসেলিন',
        summaryEn: 'Understand how Git is a content-addressable filesystem made of Blobs, Trees, and Commits.',
        summaryBn: 'জানুন কীভাবে গিট ব্লব, ট্রি এবং কমিট অবজেক্ট দিয়ে কোডের হিস্টোরি সংরক্ষণ করে।',
        explanationEn: `In Git, every file content is hashed using SHA-1 into a **Blob** (Binary Large Object). Folders are stored as **Trees** containing pointers to Blobs or other Trees. A **Commit** is simply metadata (author, timestamp, commit message) pointing to a root Tree and parent Commits! Porcelain commands (like \`git commit\`) are user-friendly interfaces built on top of low-level plumbing commands.`,
        explanationBn: `গিটের ভেতরে ফাইলগুলো সরাসরি ফাইলের নামে নয়, বরং তাদের কন্টেন্টের SHA-1 হ্যাশ দিয়ে **Blob** হিসেবে সংরক্ষিত হয়। ডিরেক্টরিগুলোকে বলা হয় **Tree**। আর প্রতিটি **Commit** হলো একটি মেটাডেটা যা একটি রুট ট্রি এবং তার পূর্ববর্তী প্যারেন্ট কমিটের দিকে পয়েন্ট করে।`,
        videoTimestamp: '20:58',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=1258',
        quickCommands: ['git status', 'git log'],
        tasks: [
          {
            id: 't-1-1-1',
            descriptionEn: 'Check the repository status with git status',
            descriptionBn: 'git status কমান্ড লিখে রিপোজিটরির বর্তমান অবস্থা দেখুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git status'))
          },
          {
            id: 't-1-1-2',
            descriptionEn: 'View the commit log using git log',
            descriptionBn: 'git log কমান্ড চালিয়ে বিদ্যমান কমিট দেখুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git log'))
          }
        ],
        tipsEn: [
          'Run "git status" to see modified and untracked files.',
          'Notice how commit "c1" has a 7-character hexadecimal SHA hash.'
        ],
        tipsBn: [
          'টার্মিনালে "git status" লিখে এন্টার চাপুন।',
          'কমিট c1-এর ওপর মাউস নিলে তার ইউনিক হ্যাশ এবং মেটাডেটা দেখতে পাবেন।'
        ]
      },
      {
        id: '1-2',
        levelId: 1,
        order: 2,
        titleEn: 'Staging Area & The First Commit',
        titleBn: 'স্টেজিং এরিয়া ও প্রথম কমিট',
        summaryEn: 'Learn the two-step commit process: Working Directory -> Staging Area -> Repository.',
        summaryBn: 'শিখুন কীভাবে ফাইল ওয়ার্কিং ডিরেক্টরি থেকে স্টেজিং এরিয়া এবং তারপর কমিট হয়।',
        explanationEn: `Git does not automatically commit changes from your workspace. First, you stage files using \`git add <file>\` (or \`git add .\`). Staging prepares an exact snapshot in the index. Then \`git commit -m "message"\` commits that snapshot permanently into the DAG graph!`,
        explanationBn: `গিট সরাসরি ফাইল কমিট করে না। প্রথমে \`git add .\` দিয়ে ফাইল স্টেজিং এরিয়ায় নিতে হয়। এরপর \`git commit -m "মেসেজ"\` দিলে একটি নতুন কমিট তৈরি হয় এবং গ্রাফের নোড সামনে এগিয়ে যায়।`,
        videoTimestamp: '12:01',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=721',
        quickCommands: ['git add .', 'git commit -m "feat: add app script"'],
        tasks: [
          {
            id: 't-1-2-1',
            descriptionEn: 'Stage all modified files using git add .',
            descriptionBn: 'git add . দিয়ে পরিবর্তনগুলো স্টেজ করুন',
            isCompleted: false,
            check: (state, history) => state.stagingArea.length > 0 || history.some(c => c.trim().startsWith('git add'))
          },
          {
            id: 't-1-2-2',
            descriptionEn: 'Create a commit with a descriptive message using git commit -m "..."',
            descriptionBn: 'git commit -m "মেসেজ" দিয়ে নতুন কমিট সম্পন্ন করুন',
            isCompleted: false,
            check: (state, _history) => Object.keys(state.commits).length >= 2
          }
        ],
        tipsEn: [
          'Use "git add ." to stage files.',
          'Always write clear, meaningful commit messages.'
        ],
        tipsBn: [
          'আগে "git add ." রান করুন, তারপর "git commit -m \'feat: my commit\'" দিন।',
          'ডানপাশের এনিমেশনে লক্ষ্য করুন কীভাবে স্টেজিং থেকে ফাইল কমিট নোডে পরিণত হয়।'
        ]
      }
    ]
  },
  {
    id: 2,
    number: '02',
    titleEn: 'The Perfect Commit & Hygiene',
    titleBn: 'পারফেক্ট কমিট ও টিম হাইজিন',
    subtitleEn: 'Atomic commits, conventional commit syntax, and amending mistakes',
    subtitleBn: 'অ্যাটমিক কমিট, কনভেনশনাল কমিট সিনট্যাক্স এবং কমিট সংশোধন',
    iconName: 'Sparkles',
    badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
    videoCourseTitle: 'Tower / freeCodeCamp: Git for Professionals Tutorial',
    videoUrl: 'https://youtu.be/Uszj_k0DGsg',
    lessons: [
      {
        id: '2-1',
        levelId: 2,
        order: 1,
        titleEn: 'Atomic Commits & Conventional Commits',
        titleBn: 'অ্যাটমিক কমিট ও কনভেনশনাল কমিট',
        summaryEn: 'Why each commit should do only ONE logical thing and how to name them.',
        summaryBn: 'কেন প্রতিটি কমিটে শুধুমাত্র একটি নির্দিষ্ট কাজ থাকা উচিত এবং নাম দেওয়ার নিয়ম।',
        explanationEn: `Professional software engineers make **Atomic Commits**: small, focused commits addressing one task or bug. Use Conventional Commits formatting:
- \`feat: add user authentication\`
- \`fix: prevent null pointer on login\`
- \`refactor: optimize database query\`
- \`docs: update API documentation\``,
        explanationBn: `প্রফেশনাল ডেভেলপাররা সবসময় **Atomic Commits** তৈরি করেন। একটি কমিটে একসাথে বাগ ফিক্স এবং নতুন ফিচার মেলানো যাবে না। কমিট প্রিফিক্স হিসেবে feat, fix, docs, refactor ইত্যাদি ব্যবহার করুন।`,
        videoTimestamp: '01:27',
        videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=87',
        quickCommands: ['git add .', 'git commit -m "feat(ui): add navbar component"'],
        tasks: [
          {
            id: 't-2-1-1',
            descriptionEn: 'Create an atomic commit with a prefix like feat: or fix:',
            descriptionBn: 'feat: অথবা fix: প্রিফিক্স দিয়ে একটি কনভেনশনাল কমিট করুন',
            isCompleted: false,
            check: (state, history) => {
              const lastCommit = Object.values(state.commits).slice(-1)[0];
              return (
                lastCommit &&
                (lastCommit.message.startsWith('feat') ||
                  lastCommit.message.startsWith('fix') ||
                  lastCommit.message.startsWith('chore'))
              ) || history.some(h => /git commit -m ["'](feat|fix|chore|docs)/.test(h));
            }
          }
        ],
        tipsEn: [
          'Try: git commit -m "feat: implement user profile header"'
        ],
        tipsBn: [
          'চেষ্টা করুন: git commit -m "feat: add user profile page"'
        ]
      },
      {
        id: '2-2',
        levelId: 2,
        order: 2,
        titleEn: 'Amending Commits (git commit --amend)',
        titleBn: 'কমিট সংশোধন (git commit --amend)',
        summaryEn: 'Fix a typo in your commit message or add a forgotten file without creating a new commit.',
        summaryBn: 'আগের কমিটের বানান ঠিক করা বা ভুলে যাওয়া ফাইল যুক্ত করার টেকনিক।',
        explanationEn: `Did you make a typo in the last commit message or forget to include a file? Instead of making an ugly "fix typo" commit, use \`git commit --amend -m "new message"\`! Git replaces the tip commit in-place while keeping your Git history clean and professional.`,
        explanationBn: `যদি আগের কমিটের মেসেজে ভুল থাকে অথবা কোনো ফাইল যোগ করতে ভুলে যান, তবে নতুন আরেকটি কমিট না করে \`git commit --amend -m "সঠিক মেসেজ"\` দিয়ে পূর্বের কমিটটি আপডেট করে নিতে পারেন।`,
        videoTimestamp: '06:12',
        videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=372',
        quickCommands: ['git commit --amend -m "feat: corrected commit description"'],
        tasks: [
          {
            id: 't-2-2-1',
            descriptionEn: 'Amend the last commit using git commit --amend -m "..."',
            descriptionBn: 'git commit --amend -m "..." দিয়ে আগের কমিটটি সংশোধন করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('--amend'))
          }
        ],
        tipsEn: ['Run: git commit --amend -m "feat: perfect commit message"'],
        tipsBn: ['চালিয়ে দেখুন: git commit --amend -m "feat: updated message"']
      }
    ]
  },
  {
    id: 3,
    number: '03',
    titleEn: 'Branching & Merging',
    titleBn: 'ব্রাঞ্চিং ও মার্জিং',
    subtitleEn: 'Lightweight pointers, Fast-forward vs 3-Way merge diamonds',
    subtitleBn: 'ব্রাঞ্চিং মেকানিক্স, ফাস্ট-ফরওয়ার্ড এবং ৩-ওয়ে মার্জ',
    iconName: 'GitBranch',
    badgeColor: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
    videoCourseTitle: 'ThePrimeagen & Tower: Branching Strategies',
    videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=2959',
    lessons: [
      {
        id: '3-1',
        levelId: 3,
        order: 1,
        titleEn: 'Creating & Switching Branches',
        titleBn: 'ব্রাঞ্চ তৈরি ও সুইচ করা',
        summaryEn: 'A branch is simply a 41-byte text file in .git/refs/heads containing a commit SHA!',
        summaryBn: 'ব্রাঞ্চ আসলে কোনো ভারী জিনিস নয়, শুধু একটি ৪১-বাইটের টেক্সট পয়েন্টার।',
        explanationEn: `In Git, branches are virtually free. Creating a branch (\`git branch feature\`) simply writes the current commit hash into a new file. Switching with \`git checkout -b <name>\` or \`git switch -c <name>\` creates the branch and points \`HEAD\` to it!`,
        explanationBn: `গিটের ব্রাঞ্চ অত্যন্ত হালকা। \`git checkout -b feature\` লিখলে এক কমান্ডেই একটি নতুন ব্রাঞ্চ তৈরি হয়ে তাতে সুইচ হয়ে যায়। অ্যানিমেশনে লক্ষ্য করুন কীভাবে HEAD নতুন ব্রাঞ্চে চলে যায়।`,
        videoTimestamp: '49:19',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=2959',
        quickCommands: ['git checkout -b feature-auth', 'git commit -m "feat: login route"'],
        tasks: [
          {
            id: 't-3-1-1',
            descriptionEn: 'Create and checkout a new branch named "feature-auth"',
            descriptionBn: 'feature-auth নামে নতুন ব্রাঞ্চ তৈরি করে সুইচ করুন',
            isCompleted: false,
            check: (state, _history) => Boolean(state.branches['feature-auth'] && state.HEAD.target === 'feature-auth')
          },
          {
            id: 't-3-1-2',
            descriptionEn: 'Make at least one commit on the new branch',
            descriptionBn: 'নতুন ব্রাঞ্চে কমপক্ষে একটি কমিট তৈরি করুন',
            isCompleted: false,
            check: (state, _history) => {
              const b = state.branches['feature-auth'];
              return Boolean(b && b.targetCommitId !== 'c1');
            }
          }
        ],
        tipsEn: ['Run: git checkout -b feature-auth', 'Then: git commit -m "feat: login form"'],
        tipsBn: ['রান করুন: git checkout -b feature-auth', 'এরপর: git commit -m "feat: login form"']
      },
      {
        id: '3-2',
        levelId: 3,
        order: 2,
        titleEn: 'Fast-Forward vs 3-Way Merge',
        titleBn: 'ফাস্ট-ফরওয়ার্ড বনাম ৩-ওয়ে মার্জ',
        summaryEn: 'Watch how Git joins branch histories together seamlessly.',
        summaryBn: 'দেখুন কীভাবে গিট আলাদা ব্রাঞ্চের পরিবর্তনসমূহ মূল ব্রাঞ্চে মার্জ করে।',
        explanationEn: `When the main branch has no new commits, Git performs a **Fast-Forward Merge**: it simply moves the \`main\` pointer ahead to the feature commit! But when both branches have diverged with separate commits, Git creates a **3-Way Merge Commit** with two parents.`,
        explanationBn: `যদি মেইন ব্রাঞ্চে নতুন কোনো কমিট না থাকে, তবে গিট **Fast-Forward** মার্জ করে শুধু পয়েন্টারকে এগিয়ে দেয়। আর যদি উভয় ব্রাঞ্চেই নতুন কমিট থাকে, তবে গিট একটি দুই-প্যারেন্ট বিশিষ্ট **3-Way Merge Commit** তৈরি করে।`,
        videoTimestamp: '01:03:27',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=3807',
        quickCommands: ['git checkout main', 'git merge feature-auth'],
        tasks: [
          {
            id: 't-3-2-1',
            descriptionEn: 'Switch back to the main branch using git checkout main',
            descriptionBn: 'git checkout main দিয়ে মেইন ব্রাঞ্চে ফেরত যান',
            isCompleted: false,
            check: (state, _history) => state.HEAD.target === 'main'
          },
          {
            id: 't-3-2-2',
            descriptionEn: 'Merge feature-auth into main using git merge feature-auth',
            descriptionBn: 'git merge feature-auth দিয়ে মেইন ব্রাঞ্চে মার্জ করুন',
            isCompleted: false,
            check: (state, _history) => {
              const mainCommitId = state.branches['main']?.targetCommitId;
              const featCommitId = state.branches['feature-auth']?.targetCommitId;
              return Boolean(mainCommitId && featCommitId && (mainCommitId === featCommitId || state.commits[mainCommitId]?.isMerge));
            }
          }
        ],
        tipsEn: ['First checkout main: git checkout main', 'Then merge: git merge feature-auth'],
        tipsBn: ['প্রথমে: git checkout main', 'তারপর: git merge feature-auth']
      }
    ]
  },
  {
    id: 4,
    number: '04',
    titleEn: 'Rebase & Conflict Resolution',
    titleBn: 'রিবেস ও কনফ্লিক্ট সমাধান',
    subtitleEn: 'Keeping linear history and resolving <<<<<<< HEAD conflicts',
    subtitleBn: 'লিনিয়ার হিস্টোরি রক্ষা এবং মার্জ কনফ্লিক্ট সমাধান',
    iconName: 'GitPullRequest',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    videoCourseTitle: 'ThePrimeagen & Tower: Merge vs Rebase',
    videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=4621',
    lessons: [
      {
        id: '4-1',
        levelId: 4,
        order: 1,
        titleEn: 'Linear History with git rebase',
        titleBn: 'git rebase দিয়ে লিনিয়ার হিস্টোরি',
        summaryEn: 'Replay commits onto a new base commit for clean, branch-free logs.',
        summaryBn: 'অপ্রয়োজনীয় মার্জ কমিট ছাড়া হিস্টোরিকে সুন্দর এক লাইনে রাখার জন্য রিবেস শিখুন।',
        explanationEn: `Instead of creating messy merge diamonds, \`git rebase <base>\` unbinds your branch commits, sets the base branch tip as the new starting point, and replays each of your commits on top of it with brand new SHA hashes! This gives your project a pristine, linear commit history.`,
        explanationBn: `অপ্রয়োজনীয় মার্জ কমিটের জটলা এড়াতে \`git rebase <base>\` ব্যবহার করা হয়। এটি আপনার ব্রাঞ্চের কমিটগুলোকে নতুন বেস ব্রাঞ্চের মাথার উপরে একে একে নতুন হ্যাশ দিয়ে বসিয়ে দেয়।`,
        videoTimestamp: '01:17:01',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=4621',
        quickCommands: ['git checkout -b feature-payment', 'git commit -m "feat: stripe checkout"', 'git rebase main'],
        tasks: [
          {
            id: 't-4-1-1',
            descriptionEn: 'Create a new feature branch and make a commit',
            descriptionBn: 'একটি নতুন ব্রাঞ্চ তৈরি করে তাতে কমিট করুন',
            isCompleted: false,
            check: (state, _history) => Object.keys(state.branches).length >= 3
          },
          {
            id: 't-4-1-2',
            descriptionEn: 'Rebase your feature branch on top of main with git rebase main',
            descriptionBn: 'git rebase main কমান্ড চালিয়ে ব্রাঞ্চটি মেইনের ওপর রিবেস করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git rebase main'))
          }
        ],
        tipsEn: ['Run: git rebase main to replay your commits cleanly.'],
        tipsBn: ['রান করুন: git rebase main']
      }
    ]
  },
  {
    id: 5,
    number: '05',
    titleEn: 'Advanced Git Surgery',
    titleBn: 'অ্যাডভান্সড গিট সার্জারি',
    subtitleEn: 'Interactive Rebase (-i), Cherry-Picking, Stashing & Worktrees',
    subtitleBn: 'ইন্টারেক্টিভ রিবেস, চেরি-পিকিং, স্ট্যাশ ও ওয়ার্কট্রি',
    iconName: 'Wrench',
    badgeColor: 'border-rose-500/40 text-rose-400 bg-rose-500/10',
    videoCourseTitle: 'Tower / freeCodeCamp: Advanced Git Tutorial',
    videoUrl: 'https://youtu.be/qsTthZi23VE',
    lessons: [
      {
        id: '5-1',
        levelId: 5,
        order: 1,
        titleEn: 'Cherry-Picking Commits (git cherry-pick)',
        titleBn: 'চেরি-পিকিং (git cherry-pick)',
        summaryEn: 'Pluck a specific commit from any branch and apply it onto your current branch.',
        summaryBn: 'অন্য যেকোনো ব্রাঞ্চ থেকে নির্দিষ্ট একটি দরকারি কমিট নিজের ব্রাঞ্চে টেনে আনা।',
        explanationEn: `Imagine your teammate fixed a critical bug on an unmerged experimental branch. You do not want their whole branch, only that single bugfix! With \`git cherry-pick <commit-hash>\`, Git extracts that exact commit and replays it cleanly onto your current HEAD.`,
        explanationBn: `ধরুন অন্য একটি ব্রাঞ্চে দরকারি একটি বাগ ফিক্স করা আছে, কিন্তু পুরো ব্রাঞ্চটি এখনো রেডি নয়। আপনি শুধু ওই একটি কমিট নিজের ব্রাঞ্চে নিয়ে আসতে চান। এর জন্য ব্যবহার করবেন \`git cherry-pick <commit-hash>\`।`,
        videoTimestamp: '08:54',
        videoUrl: 'https://youtu.be/qsTthZi23VE?t=534',
        quickCommands: ['git cherry-pick c1'],
        tasks: [
          {
            id: 't-5-1-1',
            descriptionEn: 'Cherry pick a commit using git cherry-pick <commit-id>',
            descriptionBn: 'git cherry-pick <commit-id> দিয়ে নির্দিষ্ট কমিট পিক করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git cherry-pick'))
          }
        ],
        tipsEn: ['Try: git cherry-pick c1'],
        tipsBn: ['টার্মিনালে লিখুন: git cherry-pick c1']
      }
    ]
  },
  {
    id: 6,
    number: '06',
    titleEn: 'Time Travel, Recovery & Bisect',
    titleBn: 'টাইম ট্রাভেল, রিকভারি ও বাইসেক্ট',
    subtitleEn: 'Reset (soft/mixed/hard), Reflog safety net, and Git Bisect debugging',
    subtitleBn: 'রিসেট (সফট/মিক্সড/হার্ড), রেফলগ ও গিট বাইসেক্ট দিয়ে বাগ অনুসন্ধান',
    iconName: 'RotateCcw',
    badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
    videoCourseTitle: 'ThePrimeagen & Tower: Recovery & Bisect',
    videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=5776',
    lessons: [
      {
        id: '6-1',
        levelId: 6,
        order: 1,
        titleEn: 'Undoing with git reset (--soft, --mixed, --hard)',
        titleBn: 'git reset দিয়ে পরিবর্তন আনডু করা',
        summaryEn: 'Understand the three tiers of resetting HEAD and when to use each.',
        summaryBn: 'সফট, মিক্সড এবং হার্ড রিসেটের পার্থক্য এবং সঠিক ব্যবহারের ক্ষেত্র।',
        explanationEn: `When you need to undo commits:
- \`--soft\`: Moves HEAD back; leaves all your file changes staged in the index ready to re-commit.
- \`--mixed\` (default): Moves HEAD back; unstages changes to the working directory.
- \`--hard\`: Danger! Discards both staged and uncommitted working directory changes.`,
        explanationBn: `ভুল কমিট আনডু করার জন্য:
- \`--soft\`: কমিট বাতিল করে ফাইলগুলোকে স্টেজিং এরিয়াতে রেখে দেয়।
- \`--mixed\`: কমিট বাতিল করে ফাইলগুলোকে আনস্টেজে পাঠায়।
- \`--hard\`: সব বাতিল করে একদম পূর্বের অবস্থায় ফিরিয়ে নেয়।`,
        videoTimestamp: '01:36:16',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=5776',
        quickCommands: ['git reset --soft HEAD~1', 'git reset --hard HEAD'],
        tasks: [
          {
            id: 't-6-1-1',
            descriptionEn: 'Use git reset to move HEAD back one commit',
            descriptionBn: 'git reset দিয়ে HEAD পূর্বের কমিটে পিছিয়ে নিন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git reset'))
          }
        ],
        tipsEn: ['Try: git reset --soft HEAD~1'],
        tipsBn: ['চালিয়ে দেখুন: git reset --soft HEAD~1']
      },
      {
        id: '6-2',
        levelId: 6,
        order: 2,
        titleEn: 'Git Reflog: The Life Saver',
        titleBn: 'গিট রেফলগ: ডেটা পুনরুদ্ধারের জীবনরক্ষাকারী',
        summaryEn: 'Recover commits or branches even after accidental git reset --hard or branch deletion.',
        summaryBn: 'ভুল করে মুছে ফেলা বা হারিয়ে যাওয়া ব্রাঞ্চ ও কমিট উদ্ধারের ব্রহ্মাস্ত্র।',
        explanationEn: `Did you accidentally run \`git reset --hard\` and lose your work? Don't panic! Git records every single movement of \`HEAD\` in the **Reflog**. With \`git reflog\`, you can see the history of HEAD positions and restore any state via \`git reset --hard HEAD@{n}\`!`,
        explanationBn: `যদি ভুল করে কোনো ব্রাঞ্চ বা কমিট মুছে ফেলেন, ভয় নেই! গিট প্রতিটা HEAD মুভমেন্টের রেকর্ড **Reflog**-এ জমা রাখে। \`git reflog\` লিখে আগের হ্যাশ দেখে যেকোনো মুহূর্তে তা ফিরিয়ে আনা সম্ভব।`,
        videoTimestamp: '02:32:14',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=9134',
        quickCommands: ['git reflog'],
        tasks: [
          {
            id: 't-6-2-1',
            descriptionEn: 'Inspect the reference log using git reflog',
            descriptionBn: 'git reflog কমান্ড লিখে HEAD-এর অ্যাকশন হিস্টোরি দেখুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git reflog'))
          }
        ],
        tipsEn: ['Run: git reflog to see all recent HEAD changes.'],
        tipsBn: ['টার্মিনালে লিখুন: git reflog']
      }
    ]
  },
  {
    id: 7,
    number: '07',
    titleEn: 'GitHub Remote & Team Collaboration',
    titleBn: 'গিটহাব রিমোট ও টিম কোলাবোরেশন',
    subtitleEn: 'Remotes, Push/Pull mechanics, Forking & Pull Request reviews',
    subtitleBn: 'রিমোট রিপোজিটরিতে কোড পুশ/পুল, ফোর্ক এবং পিআর রিভিউ',
    iconName: 'Globe',
    badgeColor: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
    videoCourseTitle: 'Tower & ThePrimeagen: Professional Remote Workflows',
    videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=1036',
    lessons: [
      {
        id: '7-1',
        levelId: 7,
        order: 1,
        titleEn: 'Pushing to Remotes (git push)',
        titleBn: 'রিমোটে পুশ করা (git push)',
        summaryEn: 'Publish your local commits up to GitHub remote branches.',
        summaryBn: 'নিজের লোকাল কমিটগুলো গিটহাবের রিমোট ব্রাঞ্চে আপলোড করুন।',
        explanationEn: `A remote is simply a hosted copy of your repository on GitHub (usually named \`origin\`). When you run \`git push -u origin main\`, Git uploads your commits to GitHub and sets up upstream branch tracking!`,
        explanationBn: `রিমোট হলো ক্লাউডে (যেমন GitHub) থাকা আপনার রিপোজিটরির কপি। \`git push -u origin main\` কমান্ড দিয়ে লোকাল কমিটগুলো গিটহাবে পাঠানো হয়।`,
        videoTimestamp: '01:46:23',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=6383',
        quickCommands: ['git push origin main'],
        tasks: [
          {
            id: 't-7-1-1',
            descriptionEn: 'Push commits to the remote origin using git push origin main',
            descriptionBn: 'git push origin main কমান্ড দিয়ে কোড রিমোটে পুশ করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git push'))
          }
        ],
        tipsEn: ['Run: git push origin main'],
        tipsBn: ['চালিয়ে দেখুন: git push origin main']
      }
    ]
  },
  {
    id: 8,
    number: '08',
    titleEn: 'GitHub Actions CI/CD Mastery',
    titleBn: 'গিটহাব অ্যাকশনস সিআই/সিডি মাস্টারি',
    subtitleEn: 'Full Certification course: Triggers, Matrix builds, Caching & Pipelines',
    subtitleBn: 'সার্টিফিকেশন কোর্স: ওয়ার্কফ্লো ট্রিগার, ম্যাট্রিক্স বিল্ড ও ক্যাশিং',
    iconName: 'Workflow',
    badgeColor: 'border-yellow-500/40 text-yellow-400 bg-yellow-500/10',
    videoCourseTitle: 'Brian Douglas / freeCodeCamp: GitHub Actions Certification Course',
    videoUrl: 'https://youtu.be/Tz7FsunBbfQ',
    lessons: [
      {
        id: '8-1',
        levelId: 8,
        order: 1,
        titleEn: 'Workflows, Triggers & Matrix Builds',
        titleBn: 'ওয়ার্কফ্লো, ট্রিগার ও ম্যাট্রিক্স বিল্ড',
        summaryEn: 'Automate testing across multiple OS and runtime versions with CI/CD.',
        summaryBn: 'অটোমেটেড টেস্ট ও একাধিক নোড ভার্সনে ম্যাট্রিক্স রানার দিয়ে সফটওয়্যার যাচাই।',
        explanationEn: `GitHub Actions automates your developer lifecycle directly inside your repository. Workflows are defined in \`.github/workflows/*.yml\`. 
Key features tested on the certification exam:
- **Triggers**: \`push\`, \`pull_request\`, scheduled \`cron\`, or manual \`workflow_dispatch\`.
- **Matrix Strategy**: Run identical test suites simultaneously on Node 18, 20, and 22 across Ubuntu and macOS!
- **Caching**: Speed up runs using \`actions/cache\` for npm dependencies.`,
        explanationBn: `GitHub Actions-এর মাধ্যমে কোড পুশ বা পিআর করার সাথে সাথেই টেস্ট, লিন্টার এবং ডিপ্লয়মেন্ট স্বয়ংক্রিয়ভাবে চালানো যায়। এই সার্টিফিকেশন কোর্সের মূল অংশ হলো ম্যাট্রিক্স স্ট্র্যাটেজি, ডিপেন্ডেন্সি ক্যাশিং এবং সিক্রেট ম্যানেজমেন্ট।`,
        videoTimestamp: '00:14:07',
        videoUrl: 'https://youtu.be/Tz7FsunBbfQ?t=847',
        quickCommands: ['echo "Triggering Actions CI Runner"'],
        tasks: [
          {
            id: 't-8-1-1',
            descriptionEn: 'Inspect or run the GitHub Actions CI pipeline simulator',
            descriptionBn: 'ডানপাশের Actions ট্যাবে গিয়ে সিআই/সিডি পাইপলাইন রানার টেস্ট করুন',
            isCompleted: false,
            check: (_state, _history) => true // Automatically verifiable or on action run
          }
        ],
        tipsEn: ['Switch to the "GitHub Actions" tab on the right panel to watch the pipeline execute.'],
        tipsBn: ['ডানপাশের "GitHub Actions" ট্যাবে ক্লিক করে লাইভ পাইপলাইনের স্পিনার ও কনসোল লগ দেখুন।']
      }
    ]
  }
];
