import { Level } from '../types/curriculum';

export const CURRICULUM: Level[] = [
  // ==========================================
  // LEVEL 1: Setup & Config
  // ==========================================
  {
    id: 1,
    number: '01',
    titleEn: 'Setup & Configuration',
    titleBn: 'ইনিশিয়ালাইজেশন ও কনফিগারেশন',
    subtitleEn: 'User identity, global config, repository initialization & cloning',
    subtitleBn: 'ইউজার আইডেন্টিটি, কনফিগারেশন, রিপোজিটরি তৈরি ও ক্লোনিং',
    iconName: 'Settings',
    badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
    videoCourseTitle: 'ThePrimeagen / Boot.dev: Git and GitHub - Full Course',
    videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=171',
    lessons: [
      {
        id: '1-1',
        levelId: 1,
        order: 1,
        titleEn: '1.1 Configure Global Username',
        titleBn: '১.১ গ্লোবাল ইউজারনেম কনফিগারেশন',
        summaryEn: 'git config --global user.name "Your Name"',
        summaryBn: 'গিটহাবে কমিটের জন্য গ্লোবাল ইউজারনেম কনফিগার করে।',
        whyUseThisEn: 'Git records the author of every commit. If you do not configure your name, Git may reject commits or attribute your work to generic system defaults, making team collaboration confusing.',
        whyUseThisBn: 'কমিটের লেখক হিসেবে আপনার নাম যুক্ত না করলে গিটহাবে আপনার কোনো পরিচিতি থাকবে না এবং কোড কে লিখেছে তা কোনো টিম মেম্বার বুঝতে পারবে না।',
        explanationEn: `Every Git commit permanently embeds the author's identity. Running \`git config --global user.name "Your Name"\` writes your author name into ~/.gitconfig. Notice the visual Git Identity card updates in real-time!`,
        explanationBn: `গিটের প্রতিটি কমিটে লেখকের নাম রেকর্ড থাকে। \`git config --global user.name "Your Name"\` কমান্ডের মাধ্যমে আপনার সমস্ত রিপোজিটরির জন্য গ্লোবাল ইউজারনেম সেট করা হয়। ডানপাশে লক্ষ্য করুন আপনার গিট আইডেন্টিটি কার্ড সাথে সাথে আপডেট হচ্ছে!`,
        videoTimestamp: '02:51',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=171',
        quickCommands: ['git config --global user.name "Fatin Ishraque"'],
        tasks: [
          {
            id: 't-1-1-1',
            descriptionEn: 'Set global username using git config --global user.name "..."',
            descriptionBn: 'git config --global user.name "..." দিয়ে নাম সেট করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('config') && c.includes('user.name'))
          }
        ],
        tipsEn: ['Run: git config --global user.name "Your Name"'],
        tipsBn: ['রান করুন: git config --global user.name "Your Name"']
      },
      {
        id: '1-2',
        levelId: 1,
        order: 2,
        titleEn: '1.2 Configure Global Email',
        titleBn: '১.২ গ্লোবাল ইমেইল কনফিগারেশন',
        summaryEn: 'git config --global user.email "your_email@example.com"',
        summaryBn: 'গিটহাব অ্যাকাউন্টের সাথে যুক্ত অথেনটিকেশন ইমেইল সেট করে।',
        whyUseThisEn: 'GitHub connects your local commits to your online profile exclusively through this email address. Without it, you will not receive credit on your green GitHub contribution graph!',
        whyUseThisBn: 'গিটহাব অ্যাকাউন্টের সাথে লোকাল কমিট লিংক করতে এটি বাধ্যতামূলক। এই ইমেইল না দিলে গিটহাবে আপনার গ্রিন কনট্রিবিউশন গ্রাফে স্কোর যুক্ত হবে না।',
        explanationEn: `GitHub matches local commits with your GitHub profile account via this email. Setting this guarantees that every push you make earns you green activity blocks on GitHub.`,
        explanationBn: `আপনার গিটহাব প্রোফাইলের অবদানের গ্রাফ তৈরি করতে ইমেইল অ্যাড্রেস অত্যন্ত জরুরি। \`git config --global user.email "your_email@example.com"\` দিয়ে লোকাল কাজের সাথে গিটহাব অ্যাকাউন্ট লিংক করুন।`,
        videoTimestamp: '04:12',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=252',
        quickCommands: ['git config --global user.email "developer@example.com"'],
        tasks: [
          {
            id: 't-1-2-1',
            descriptionEn: 'Set global email using git config --global user.email "..."',
            descriptionBn: 'git config --global user.email "..." দিয়ে ইমেইল সেট করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('config') && c.includes('user.email'))
          }
        ],
        tipsEn: ['Run: git config --global user.email "you@example.com"'],
        tipsBn: ['টার্মিনালে চালান: git config --global user.email "your_email@example.com"']
      },
      {
        id: '1-3',
        levelId: 1,
        order: 3,
        titleEn: '1.3 Initialize Local Repository',
        titleBn: '১.৩ লোকাল রিপোজিটরি ইনিশিয়ালাইজেশন',
        summaryEn: 'git init',
        summaryBn: 'বর্তমান ফোল্ডারটিকে লোকাল গিট রিপোজিটরি হিসেবে ইনিশিয়ালাইজ করে।',
        whyUseThisEn: 'Turns any standard directory into a version-controlled repository. Without running this, Git commands will fail with "fatal: not a git repository".',
        whyUseThisBn: 'ফোল্ডারটিকে গিট রিপোজিটরিতে রূপান্তর করতে। এটি না চালালে কোনো গিট ট্র্যাকিং শুরু হতে পারে না এবং fatal error দেখায়।',
        explanationEn: `Running \`git init\` creates a hidden \`.git\` directory in your project root containing objects, refs, and the HEAD pointer. This transforms any regular folder into a version-controlled Git repository!`,
        explanationBn: `যেকোনো ফোল্ডারকে গিট রিপোজিটরিতে রূপান্তর করতে \`git init\` কমান্ড চালানো হয়। এটি ফোল্ডারে একটি লুকানো \`.git\` ডিরেক্টরি তৈরি করে যেখানে হিস্টোরি ও অবজেক্ট সংরক্ষিত থাকে।`,
        videoTimestamp: '12:01',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=721',
        quickCommands: ['git init'],
        tasks: [
          {
            id: 't-1-3-1',
            descriptionEn: 'Initialize repository with git init',
            descriptionBn: 'git init কমান্ড দিয়ে রিপোজিটরি শুরু করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim() === 'git init')
          }
        ],
        tipsEn: ['Run "git init" to create the .git directory.'],
        tipsBn: ['রান করুন: git init']
      },
      {
        id: '1-4',
        levelId: 1,
        order: 4,
        titleEn: '1.4 Clone Remote Repository',
        titleBn: '১.৪ রিমোট রিপোজিটরি ক্লোন করা',
        summaryEn: 'git clone <repo_url>',
        summaryBn: 'রিমোট গিটহাব রিপোজিটরি লোকাল ডিরেক্টরিতে ডাউনলোড/ক্লোন করে আনে।',
        whyUseThisEn: 'Instantly download an entire existing team project or open-source repository with full historical commits, branches, and remote tracking configured.',
        whyUseThisBn: 'টিমের অন্য কারো বা ওপেন সোর্স প্রোজেক্টের সমস্ত কোড এবং হিস্টোরি এক ক্লিকে নিজের কম্পিউটারে ডাউনলোড করে সরাসরি কাজ শুরু করতে।',
        explanationEn: `To copy an existing project from GitHub onto your machine with its entire commit history and branches, use \`git clone <repo_url>\`. Git automatically sets up the \`origin\` remote for you!`,
        explanationBn: `গিটহাবে থাকা যেকোনো প্রোজেক্টের সমস্ত কোড এবং হিস্টোরি নিজের কম্পিউটারে ডাউনলোড করতে \`git clone <repo_url>\` ব্যবহার করা হয়।`,
        videoTimestamp: '15:40',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=940',
        quickCommands: ['git clone https://github.com/n0vemberain/GitPlayGround.git'],
        tasks: [
          {
            id: 't-1-4-1',
            descriptionEn: 'Clone repository using git clone <url>',
            descriptionBn: 'git clone দিয়ে রিমোট রিপোজিটরি ক্লোন করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git clone'))
          }
        ],
        tipsEn: ['Try: git clone https://github.com/n0vemberain/GitPlayGround.git'],
        tipsBn: ['চালিয়ে দেখুন: git clone https://github.com/n0vemberain/GitPlayGround.git']
      }
    ]
  },

  // ==========================================
  // LEVEL 2: Basic Workflow
  // ==========================================
  {
    id: 2,
    number: '02',
    titleEn: 'Basic Workflow & Commits',
    titleBn: 'ট্র্যাকিং, স্ট্যাটাস ও কমিট',
    subtitleEn: 'Inspecting workspace status, staging files & saving commit history',
    subtitleBn: 'স্ট্যাটাস দেখা, ফাইল স্টেজ করা এবং হিস্টোরি গ্রাফ অবলোকন',
    iconName: 'Layers',
    badgeColor: 'border-blue-500/40 text-blue-400 bg-blue-500/10',
    videoCourseTitle: 'ThePrimeagen & Tower: Basic Workflow',
    videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=87',
    lessons: [
      {
        id: '2-1',
        levelId: 2,
        order: 1,
        titleEn: '2.1 Check Workspace Status',
        titleBn: '২.১ ওয়ার্কস্পেসের স্ট্যাটাস পরীক্ষা',
        summaryEn: 'git status',
        summaryBn: 'ওয়ার্কিং ডিরেক্টরি এবং স্টেজিং এরিয়ার বর্তমান অবস্থা (আনট্র্যাকড, মডিফাইড ফাইল ইত্যাদি) দেখায়।',
        whyUseThisEn: 'Avoid committing accidental secret keys, logs, or unreviewed files. Running this before staging gives you 100% clarity on what changed.',
        whyUseThisBn: 'কমিট করার আগে কোন ফাইলে পরিবর্তন হয়েছে আর কোন ফাইল ভুল করে যুক্ত হচ্ছে তা নিখুঁতভাবে চেক করতে এটি অপরিহার্য।',
        explanationEn: `\`git status\` is the most frequently run Git command. It tells you which branch you are on, which files are untracked (red), modified, or staged in the index ready to be committed (green).`,
        explanationBn: `গিটের সবচেয়ে প্রয়োজনীয় কমান্ড \`git status\`। এটি বলে দেয় আপনি কোন ব্রাঞ্চে আছেন, কোন ফাইলগুলো নতুন (আনট্র্যাকড) এবং কোন ফাইলগুলো স্টেজিং এরিয়াতে প্রস্তুত আছে।`,
        videoTimestamp: '01:27',
        videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=87',
        quickCommands: ['git status'],
        tasks: [
          {
            id: 't-2-1-1',
            descriptionEn: 'Check status using git status',
            descriptionBn: 'git status কমান্ড দিয়ে স্ট্যাটাস দেখুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git status'))
          }
        ],
        tipsEn: ['Run "git status" at any time to inspect your files.'],
        tipsBn: ['টার্মিনালে "git status" লিখুন।']
      },
      {
        id: '2-2',
        levelId: 2,
        order: 2,
        titleEn: '2.2 Stage Specific File',
        titleBn: '২.২ নির্দিষ্ট ফাইল স্টেজ করা',
        summaryEn: 'git add <file_name>',
        summaryBn: 'নির্দিষ্ট ফাইলকে স্টেজিং এরিয়ায় যুক্ত করে।',
        whyUseThisEn: 'Enables atomic commits. If you changed 5 files for two different features, stage only the related files so each commit has a single focused purpose.',
        whyUseThisBn: 'অপ্রয়োজনীয় ফাইল বাদ দিয়ে কেবল যে ফাইলটি কমিট করতে চান তা বাছাই করে স্টেজ করতে \`git add <file>\` ব্যবহার করা হয়।',
        explanationEn: `Rather than adding all files indiscriminately, \`git add <file_name>\` stages only the specific file you want in the upcoming commit. This allows you to create precise, atomic commits!`,
        explanationBn: `সব ফাইল একসাথে স্টেজ না করে শুধু একটি নির্দিষ্ট ফাইলকে পরবর্তী কমিটের জন্য প্রস্তুত করতে \`git add <file_name>\` কমান্ড ব্যবহার করা হয়।`,
        videoTimestamp: '03:10',
        videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=190',
        quickCommands: ['git add app.js'],
        tasks: [
          {
            id: 't-2-2-1',
            descriptionEn: 'Stage specific file with git add <file>',
            descriptionBn: 'git add <file_name> দিয়ে নির্দিষ্ট ফাইল স্টেজ করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git add') && !c.includes('.'))
          }
        ],
        tipsEn: ['Run: git add app.js'],
        tipsBn: ['চালিয়ে দেখুন: git add app.js']
      },
      {
        id: '2-3',
        levelId: 2,
        order: 3,
        titleEn: '2.3 Stage All Changes',
        titleBn: '২.৩ সমস্ত ফাইল একসাথে স্টেজ করা',
        summaryEn: 'git add .',
        summaryBn: 'সমস্ত পরিবর্তিত ও নতুন ফাইলকে একবারে স্টেজিং এরিয়ায় নিয়ে যায়।',
        whyUseThisEn: 'When all your modifications belong to the same logical feature, stage everything instantly with a single command.',
        whyUseThisBn: 'সমস্ত নতুন ও পরিবর্তিত ফাইলকে এক সেকেন্ডে কমিটের জন্য প্রস্তুত করতে \`git add .\` কমান্ড ব্যবহার করা হয়।',
        explanationEn: `\`git add .\` scans your entire working directory recursively and adds all new, modified, and untracked files into the staging index at once!`,
        explanationBn: `প্রোজেক্টের সমস্ত নতুন ও পরিবর্তিত ফাইল একসাথে এক ক্লিকে স্টেজিং এরিয়ায় পাঠাতে \`git add .\` কমান্ড ব্যবহার করা হয়।`,
        videoTimestamp: '05:22',
        videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=322',
        quickCommands: ['git add .'],
        tasks: [
          {
            id: 't-2-3-1',
            descriptionEn: 'Stage all files with git add .',
            descriptionBn: 'git add . দিয়ে সমস্ত ফাইল স্টেজ করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim() === 'git add .')
          }
        ],
        tipsEn: ['Run: git add .'],
        tipsBn: ['রান করুন: git add .']
      },
      {
        id: '2-4',
        levelId: 2,
        order: 4,
        titleEn: '2.4 Commit with Descriptive Message',
        titleBn: '২.৪ অর্থপূর্ণ মেসেজ সহ কমিট তৈরি',
        summaryEn: 'git commit -m "commit message"',
        summaryBn: 'স্টেজিং এরিয়ার পরিবর্তনগুলো একটি অর্থপূর্ণ মেসেজ সহ লোকাল হিস্ট্রিতে সেভ করে।',
        whyUseThisEn: 'Permanent milestone in code history. If a bug appears 6 months later, good commit messages let you understand why changes were made.',
        whyUseThisBn: 'কোডের একটি নির্দিষ্ট স্ন্যাপশট হিস্টোরিতে স্থায়ীভাবে সেভ করে রাখতে যাতে ভবিষ্যতে যেকোনো সময় ফিরে আসা যায়।',
        explanationEn: `\`git commit -m "commit message"\` takes the staged snapshot and creates a permanent commit node in your repository's Directed Acyclic Graph (DAG) with author metadata, timestamp, and unique SHA-1 hash.`,
        explanationBn: `স্টেজিং এরিয়ার ফাইলগুলোকে স্থায়ীভাবে গিট হিস্টোরিতে রেকর্ড করতে \`git commit -m "মেসেজ"\` ব্যবহার করা হয়। এটি একটি নতুন কমিট নোড তৈরি করে।`,
        videoTimestamp: '08:00',
        videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=480',
        quickCommands: ['git commit -m "feat: implement navigation navbar"'],
        tasks: [
          {
            id: 't-2-4-1',
            descriptionEn: 'Commit changes with git commit -m "..."',
            descriptionBn: 'git commit -m "..." দিয়ে নতুন কমিট করুন',
            isCompleted: false,
            check: (state, _history) => Object.keys(state.commits).length >= 2
          }
        ],
        tipsEn: ['Try: git commit -m "feat: add user login"'],
        tipsBn: ['চালিয়ে দেখুন: git commit -m "feat: user dashboard"']
      },
      {
        id: '2-5',
        levelId: 2,
        order: 5,
        titleEn: '2.5 Stage & Commit in One Step',
        titleBn: '২.৫ এক ধাপে স্টেজ ও কমিট (git commit -am)',
        summaryEn: 'git commit -am "commit message"',
        summaryBn: 'ট্র্যাকড ফাইলগুলোর মডিফিকেশন এক কমান্ডে স্টেজ ও কমিট করে।',
        whyUseThisEn: 'Save developer keystrokes! Skip "git add" for already-tracked files and commit immediately in a single rapid command.',
        whyUseThisBn: 'বারবার git add না লিখে সময় বাঁচাতে ট্র্যাকড ফাইলগুলো এক কমান্ডেই স্টেজ ও কমিট করার জন্য।',
        explanationEn: `Shortcut! \`git commit -am "message"\` automatically stages all modified tracked files and commits them in a single step without needing to run \`git add\` first (note: untracked new files still require git add).`,
        explanationBn: `শর্টকাট কৌশল! আগে থেকে ট্র্যাকড থাকা ফাইলগুলোর পরিবর্তন স্বয়ংক্রিয়ভাবে স্টেজ ও কমিট করার জন্য \`git commit -am "মেসেজ"\` ব্যবহার করা হয়।`,
        videoTimestamp: '09:45',
        videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=585',
        quickCommands: ['git commit -am "fix: resolve layout spacing issue"'],
        tasks: [
          {
            id: 't-2-5-1',
            descriptionEn: 'Use git commit -am "..." to stage and commit',
            descriptionBn: 'git commit -am "..." কমান্ড দিয়ে একবারে কমিট করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('commit -am'))
          }
        ],
        tipsEn: ['Run: git commit -am "fix: correct typo in hero banner"'],
        tipsBn: ['রান করুন: git commit -am "fix: updated navbar"']
      },
      {
        id: '2-6',
        levelId: 2,
        order: 6,
        titleEn: '2.6 View Compact Graph Log',
        titleBn: '২.৬ কমপ্যাক্ট একলাইনের গ্রাফ হিস্টোরি',
        summaryEn: 'git log --oneline --graph --all',
        summaryBn: 'পুরো প্রোজেক্টের কমিট হিস্ট্রি একটি কমপ্যাক্ট একলাইনের গ্রাফিক্যাল ফরম্যাটে দেখায়।',
        whyUseThisEn: 'See how branches branch out, where merges joined, and where HEAD currently points without needing heavy GUI tools.',
        whyUseThisBn: 'প্রোজেক্টের সমস্ত ব্রাঞ্চ এবং কমিট কীভাবে জোড়া লেগে আছে তা টার্মিনালেই পরিষ্কার এক লাইনে দেখতে।',
        explanationEn: `The ultimate terminal visualization! \`git log --oneline --graph --all\` draws an ASCII commit graph showing all branches, merges, tags, and commit hashes on a single line per commit.`,
        explanationBn: `টার্মিনালে পুরো প্রোজেক্টের সমস্ত ব্রাঞ্চ ও কমিটের গ্রাফিক্যাল ট্রি এক লাইনে দেখতে \`git log --oneline --graph --all\` কমান্ডটি ব্যবহার করা হয়।`,
        videoTimestamp: '11:15',
        videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=675',
        quickCommands: ['git log --oneline --graph --all'],
        tasks: [
          {
            id: 't-2-6-1',
            descriptionEn: 'Run git log --oneline --graph --all',
            descriptionBn: 'git log --oneline --graph --all চালিয়ে সম্পূর্ণ গ্রাফ দেখুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('log') && c.includes('--oneline'))
          }
        ],
        tipsEn: ['Run: git log --oneline --graph --all'],
        tipsBn: ['টার্মিনালে লিখুন: git log --oneline --graph --all']
      }
    ]
  },

  // ==========================================
  // LEVEL 3: Branching & Merging
  // ==========================================
  {
    id: 3,
    number: '03',
    titleEn: 'Branching & Merging',
    titleBn: 'ব্রাঞ্চিং ও মার্জিং',
    subtitleEn: 'Lightweight branch pointers, switching contexts, and joining histories',
    subtitleBn: 'ব্রাঞ্চ তৈরি, সুইচ করা, মার্জ এবং নাম পরিবর্তন',
    iconName: 'GitBranch',
    badgeColor: 'border-purple-500/40 text-purple-400 bg-purple-500/10',
    videoCourseTitle: 'ThePrimeagen & Tower: Branching Mastery',
    videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=2959',
    lessons: [
      {
        id: '3-1',
        levelId: 3,
        order: 1,
        titleEn: '3.1 List All Branches',
        titleBn: '৩.১ লোকাল ব্রাঞ্চের তালিকা দেখা',
        summaryEn: 'git branch',
        summaryBn: 'লোকাল সব ব্রাঞ্চের তালিকা দেখায় এবং সক্রিয় ব্রাঞ্চ চিহ্নিত করে।',
        whyUseThisEn: 'Confirm which branch you are on before making edits to avoid writing experimental code directly on production main branch.',
        whyUseThisBn: 'বর্তমানে আপনি কোন ব্রাঞ্চে আছেন এবং অন্য কী কী ব্রাঞ্চ আছে তা দেখে ভুল ব্রাঞ্চে কোড লেখা এড়াতে।',
        explanationEn: `Running \`git branch\` lists all branches in your repository. The current active branch checked out by \`HEAD\` is marked with an asterisk (*) and highlighted in green.`,
        explanationBn: `\`git branch\` কমান্ড আপনার লোকাল সব ব্রাঞ্চের তালিকা দেখায়। আপনি বর্তমানে যে ব্রাঞ্চে আছেন তার পাশে সবুজ রঙের স্টার (*) চিহ্ন থাকে।`,
        videoTimestamp: '49:19',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=2959',
        quickCommands: ['git branch'],
        tasks: [
          {
            id: 't-3-1-1',
            descriptionEn: 'List branches with git branch',
            descriptionBn: 'git branch কমান্ড চালিয়ে ব্রাঞ্চের তালিকা দেখুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim() === 'git branch')
          }
        ],
        tipsEn: ['Run "git branch" to see all local branches.'],
        tipsBn: ['চালিয়ে দেখুন: git branch']
      },
      {
        id: '3-2',
        levelId: 3,
        order: 2,
        titleEn: '3.2 Create & Switch to New Branch',
        titleBn: '৩.২ নতুন ব্রাঞ্চ তৈরি ও সাথে সাথে সুইচ',
        summaryEn: 'git switch -c <branch_name> (বা git checkout -b <branch_name>)',
        summaryBn: 'নতুন একটি ব্রাঞ্চ তৈরি করে তাৎক্ষণিকভাবে সেই ব্রাঞ্চে সুইচ করে।',
        whyUseThisEn: 'Isolate your work. If your feature breaks or is cancelled, the main branch remains completely safe and deployable.',
        whyUseThisBn: 'মূল কোড অক্ষত রেখে নতুন কোনো ফিচারের কাজ আলাদা ব্রাঞ্চে নিরাপদে শুরু করার জন্য।',
        explanationEn: `Modern Git introduces \`git switch -c <name>\` (or classic \`git checkout -b <name>\`). It creates a new branch pointer at the current commit and points \`HEAD\` to it in one seamless action!`,
        explanationBn: `নতুন ব্রাঞ্চ তৈরি ও সুইচ করার আধুনিক কমান্ড \`git switch -c <name>\` (বা \`git checkout -b <name>\`)। ডানপাশের অ্যানিমেশনে লক্ষ্য করুন কীভাবে HEAD নতুন ব্রাঞ্চে চলে যায়।`,
        videoTimestamp: '52:30',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=3150',
        quickCommands: ['git switch -c feature-auth', 'git commit -m "feat: user login logic"'],
        tasks: [
          {
            id: 't-3-2-1',
            descriptionEn: 'Create and switch to a branch using git switch -c or git checkout -b',
            descriptionBn: 'নতুন ব্রাঞ্চ বানিয়ে সুইচ করুন (git switch -c feature-auth)',
            isCompleted: false,
            check: (state, _history) => Boolean(state.branches['feature-auth'] && state.HEAD.target === 'feature-auth')
          }
        ],
        tipsEn: ['Run: git switch -c feature-auth'],
        tipsBn: ['রান করুন: git switch -c feature-auth']
      },
      {
        id: '3-3',
        levelId: 3,
        order: 3,
        titleEn: '3.3 Switch Existing Branch',
        titleBn: '৩.৩ বিদ্যমান অন্য ব্রাঞ্চে সুইচ করা',
        summaryEn: 'git switch <branch_name> (বা git checkout <branch_name>)',
        summaryBn: 'বিদ্যমান অন্য একটি ব্রাঞ্চে সুইচ করে।',
        whyUseThisEn: 'Easily jump between features, review a teammate\'s branch, or return to main without disrupting ongoing tasks.',
        whyUseThisBn: 'অন্য কোনো ব্রাঞ্চের কোড পরীক্ষা করতে বা মূল ব্রাঞ্চে ফিরে যেতে এক ক্লিকে সুইচ করার জন্য।',
        explanationEn: `To switch between already existing branches, use \`git switch <branch_name>\` (or \`git checkout <branch_name>\`). Git updates your working tree files to match the tip of that branch.`,
        explanationBn: `আগে থেকেই থাকা অন্য কোনো ব্রাঞ্চে চলে যেতে \`git switch <branch_name>\` বা \`git checkout <branch_name>\` ব্যবহার করুন।`,
        videoTimestamp: '55:10',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=3310',
        quickCommands: ['git switch main'],
        tasks: [
          {
            id: 't-3-3-1',
            descriptionEn: 'Switch back to main with git switch main or git checkout main',
            descriptionBn: 'git switch main দিয়ে মূল ব্রাঞ্চে ফিরে যান',
            isCompleted: false,
            check: (state, _history) => state.HEAD.target === 'main'
          }
        ],
        tipsEn: ['Run: git switch main'],
        tipsBn: ['টার্মিনালে চালান: git switch main']
      },
      {
        id: '3-4',
        levelId: 3,
        order: 4,
        titleEn: '3.4 Merge Branch into Active Branch',
        titleBn: '৩.৪ ব্রাঞ্চ মার্জ করা',
        summaryEn: 'git merge <branch_name>',
        summaryBn: 'নির্দিষ্ট ব্রাঞ্চের সমস্ত পরিবর্তন বর্তমান অ্যাক্টিভ ব্রাঞ্চে মার্জ করে।',
        whyUseThisEn: 'Incorporate completed and tested features back into your production main branch.',
        whyUseThisBn: 'ফিচার ব্রাঞ্চে তৈরি করা কোড সফলভাবে পরীক্ষা শেষে মূল প্রোজেক্টে একীভূত করতে।',
        explanationEn: `\`git merge <branch_name>\` brings changes from another branch into your current checked-out branch. If history has diverged, Git generates a 3-way merge commit diamond connecting both branches!`,
        explanationBn: `অন্য ব্রাঞ্চের কাজগুলো বর্তমান ব্রাঞ্চে একীভূত করতে \`git merge <branch_name>\` কমান্ড দেওয়া হয়। এটি ফাস্ট-ফরওয়ার্ড অথবা ৩-ওয়ে মার্জ নোড তৈরি করে।`,
        videoTimestamp: '01:03:27',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=3807',
        quickCommands: ['git merge feature-auth'],
        tasks: [
          {
            id: 't-3-4-1',
            descriptionEn: 'Merge feature-auth into main using git merge feature-auth',
            descriptionBn: 'git merge feature-auth দিয়ে মার্জ সম্পন্ন করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git merge'))
          }
        ],
        tipsEn: ['Run: git merge feature-auth'],
        tipsBn: ['চালিয়ে দেখুন: git merge feature-auth']
      },
      {
        id: '3-5',
        levelId: 3,
        order: 5,
        titleEn: '3.5 Safely Delete Branch',
        titleBn: '৩.৫ ব্রাঞ্চ নিরাপদে ডিলিট করা',
        summaryEn: 'git branch -d <branch_name>',
        summaryBn: 'মার্জ হয়ে যাওয়া অপ্রয়োজনীয় লোকাল ব্রাঞ্চ নিরাপদে ডিলিট করে।',
        whyUseThisEn: 'Prevent branch clutter. Repositories with dozens of stale branches confuse developers and slow down branch searches.',
        whyUseThisBn: 'কাজ শেষ হয়ে যাওয়া অপ্রয়োজনীয় ব্রাঞ্চ ডিলিট করে ব্রাঞ্চ তালিকা পরিষ্কার ও ঝামেলামুক্ত রাখতে।',
        explanationEn: `Once a feature branch is merged into \`main\`, its pointer is no longer needed. \`git branch -d <branch_name>\` deletes the branch safely (it refuses to delete if there are unmerged commits).`,
        explanationBn: `ফিচার ব্রাঞ্চের কাজ মার্জ হয়ে গেলে অপ্রয়োজনীয় ব্রাঞ্চ নিরাপদে মুছে ফেলতে \`git branch -d <branch_name>\` ব্যবহার করুন।`,
        videoTimestamp: '01:12:40',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=4360',
        quickCommands: ['git branch -d feature-auth'],
        tasks: [
          {
            id: 't-3-5-1',
            descriptionEn: 'Delete merged branch using git branch -d <name>',
            descriptionBn: 'git branch -d feature-auth দিয়ে ব্রাঞ্চ মুছে ফেলুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('branch -d'))
          }
        ],
        tipsEn: ['Run: git branch -d feature-auth'],
        tipsBn: ['রান করুন: git branch -d feature-auth']
      },
      {
        id: '3-6',
        levelId: 3,
        order: 6,
        titleEn: '3.6 Rename a Branch',
        titleBn: '৩.৬ ব্রাঞ্চের নাম পরিবর্তন (রিনেম)',
        summaryEn: 'git branch -m <old_name> <new_name>',
        summaryBn: 'কোনো ব্রাঞ্চের নাম পরিবর্তন (রিনেম) করে।',
        whyUseThisEn: 'Fix typos in branch names or rename branches to conform to team Jira/issue ticket conventions (e.g. feat-102-auth).',
        whyUseThisBn: 'ভুল নামে ব্রাঞ্চ বানালে বা টিমের নিয়মানুযায়ী টিকিটের নাম অনুযায়ী ব্রাঞ্চের নাম ঠিক করতে।',
        explanationEn: `Did you name a branch incorrectly or want to follow convention? \`git branch -m <old_name> <new_name>\` renames the branch pointer without losing any commit history!`,
        explanationBn: `কোনো ব্রাঞ্চের নাম পরিবর্তন করার জন্য \`git branch -m <old_name> <new_name>\` ব্যবহার করা হয়।`,
        videoTimestamp: '01:15:20',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=4520',
        quickCommands: ['git branch -m dev development'],
        tasks: [
          {
            id: 't-3-6-1',
            descriptionEn: 'Rename branch using git branch -m',
            descriptionBn: 'git branch -m দিয়ে ব্রাঞ্চ রিনেম করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('branch -m'))
          }
        ],
        tipsEn: ['Try: git branch -m main production (or test branch)'],
        tipsBn: ['চালিয়ে দেখুন: git branch -m dev development']
      }
    ]
  },

  // ==========================================
  // LEVEL 4: Remote & Collaboration
  // ==========================================
  {
    id: 4,
    number: '04',
    titleEn: 'Remote & GitHub Collaboration',
    titleBn: 'রিমোট রিপোজিটরি ও সিঙ্কিং',
    subtitleEn: 'Linking remotes, pushing commits, fetching, pulling & pruning',
    subtitleBn: 'গিটহাব রিমোট লিংক করা, পুশ, ফেচ, পুল এবং প্রুন করা',
    iconName: 'Globe',
    badgeColor: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
    videoCourseTitle: 'Tower & ThePrimeagen: Remote Collaboration',
    videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=1036',
    lessons: [
      {
        id: '4-1',
        levelId: 4,
        order: 1,
        titleEn: '4.1 Add Remote Origin',
        titleBn: '৪.১ রিমোট অরিজিন যুক্ত করা',
        summaryEn: 'git remote add origin <repo_url>',
        summaryBn: 'লোকাল রিপোজিটরির সাথে রিমোট গিটহাব রিপোজিটরি লিংক করে।',
        whyUseThisEn: 'Connect your local machine to GitHub so code can be backed up to the cloud and shared with your team.',
        whyUseThisBn: 'নিজের লোকাল কোড গিটহাবের ক্লাউড রিপোজিটরির সাথে যুক্ত করতে যাতে ব্যাকআপ ও টিমের সাথে কাজ করা যায়।',
        explanationEn: `\`git remote add origin <repo_url>\` connects your local repository to a hosted GitHub repository under the shorthand nickname \`origin\`.`,
        explanationBn: `নিজের লোকাল রিপোজিটরির সাথে ক্লাউডে থাকা গিটহাবের রিমোট রিপোজিটরি লিংক করতে \`git remote add origin <repo_url>\` ব্যবহার করা হয়।`,
        videoTimestamp: '17:16',
        videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=1036',
        quickCommands: ['git remote add origin https://github.com/n0vemberain/GitPlayGround.git'],
        tasks: [
          {
            id: 't-4-1-1',
            descriptionEn: 'Link remote repository with git remote add origin <url>',
            descriptionBn: 'git remote add origin <url> দিয়ে রিমোট যুক্ত করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('remote add'))
          }
        ],
        tipsEn: ['Run: git remote add origin https://github.com/n0vemberain/GitPlayGround.git'],
        tipsBn: ['চালিয়ে দেখুন: git remote add origin <url>']
      },
      {
        id: '4-2',
        levelId: 4,
        order: 2,
        titleEn: '4.2 Push with Upstream Tracking',
        titleBn: '৪.২ প্রথমবার পুশ ও আপস্ট্রিম ট্র্যাকিং',
        summaryEn: 'git push -u origin <branch_name>',
        summaryBn: 'প্রথমবার লোকাল ব্রাঞ্চের কোড গিটহাবে পুশ করে আপস্ট্রিম ট্র্যাকিং সেট করে।',
        whyUseThisEn: 'Sets up a permanent two-way sync tunnel between your local branch and GitHub. Future pushes will only need "git push".',
        whyUseThisBn: 'লোকাল ব্রাঞ্চের সাথে রিমোট ব্রাঞ্চের স্থায়ী ট্র্যাকিং চ্যানেল তৈরি করতে যাতে পরবর্তীতে শুধু \`git push\` লিখলেই কাজ হয়।',
        explanationEn: `The \`-u\` (or \`--set-upstream\`) flag establishes a link between your local branch and \`origin/<branch>\`. In all future pushes, you only need to type \`git push\`!`,
        explanationBn: `প্রথমবার কোড গিটহাবে পুশ করার সময় \`-u\` ফ্ল্যাগ দিলে লোকাল ব্রাঞ্চের সাথে রিমোট ব্রাঞ্চের ট্র্যাকিং তৈরি হয়ে যায়। পরবর্তীতে শুধু \`git push\` লিখলেই কাজ হবে।`,
        videoTimestamp: '19:40',
        videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=1180',
        quickCommands: ['git push -u origin main'],
        tasks: [
          {
            id: 't-4-2-1',
            descriptionEn: 'Push with upstream using git push -u origin main',
            descriptionBn: 'git push -u origin main দিয়ে পুশ করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('push -u'))
          }
        ],
        tipsEn: ['Run: git push -u origin main'],
        tipsBn: ['রান করুন: git push -u origin main']
      },
      {
        id: '4-3',
        levelId: 4,
        order: 3,
        titleEn: '4.3 Quick Push to Remote',
        titleBn: '৪.৩ সহজে পুশ করা (git push)',
        summaryEn: 'git push',
        summaryBn: 'আপস্ট্রিম সেট করা থাকলে পরবর্তী সময়ে এক ক্লিকে রিমোট রিপোজিটরিতে লোকাল কমিটগুলো পুশ করে।',
        whyUseThisEn: 'Sync your committed work to GitHub so CI/CD pipelines run and other developers can see your changes.',
        whyUseThisBn: 'নতুন করা কমিটগুলো দ্রুত গিটহাবে পাঠাতে যাতে অটোমেটেড CI/CD রান হয় এবং টিম কোড পায়।',
        explanationEn: `Once upstream is configured, running a simple \`git push\` uploads all your latest local commits to GitHub effortlessly.`,
        explanationBn: `আপস্ট্রিম সেট থাকলে পরবর্তীতে নতুন কোনো কমিট করার পর সরাসরি \`git push\` কমান্ড দিয়ে এক ক্লিকে গিটহাবে পাঠিয়ে দেওয়া যায়।`,
        videoTimestamp: '21:10',
        videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=1270',
        quickCommands: ['git push'],
        tasks: [
          {
            id: 't-4-3-1',
            descriptionEn: 'Push commits with git push',
            descriptionBn: 'git push কমান্ড চালান',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim() === 'git push')
          }
        ],
        tipsEn: ['Run: git push'],
        tipsBn: ['টার্মিনালে চালান: git push']
      },
      {
        id: '4-4',
        levelId: 4,
        order: 4,
        titleEn: '4.4 Fetch Remote Changes Safely',
        titleBn: '৪.৪ রিমোট ডেটা ফেচ করা (git fetch)',
        summaryEn: 'git fetch',
        summaryBn: 'রিমোটের লেটেস্ট মেটাডাটা ও কমিট হিস্ট্রি ডাউনলোড করে লোকাল কোডে কোনো পরিবর্তন না ঘটিয়েই।',
        whyUseThisEn: 'Inspect what teammates have pushed without risking unexpected merge conflicts in your uncommitted files.',
        whyUseThisBn: 'নিজের চলমান কোডের কোনো ক্ষতি না করে অনলাইনে অন্যরা নতুন কী কোড জমা দিয়েছে তা নিরাপদে দেখার জন্য।',
        explanationEn: `\`git fetch\` downloads all remote branches and commits without touching your local files or active working tree. It is the safe way to inspect what teammates have pushed!`,
        explanationBn: `\`git fetch\` কমান্ড আপনার বর্তমান ফাইলের কোনো ক্ষতি না করে রিমোটের লেটেস্ট কমিট ও ব্রাঞ্চগুলো ডাউনলোড করে আনে যাতে আপনি তা রিভিউ করতে পারেন।`,
        videoTimestamp: '22:30',
        videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=1350',
        quickCommands: ['git fetch'],
        tasks: [
          {
            id: 't-4-4-1',
            descriptionEn: 'Fetch remote metadata with git fetch',
            descriptionBn: 'git fetch কমান্ড চালান',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git fetch'))
          }
        ],
        tipsEn: ['Run: git fetch'],
        tipsBn: ['চালিয়ে দেখুন: git fetch']
      },
      {
        id: '4-5',
        levelId: 4,
        order: 5,
        titleEn: '4.5 Pull & Auto-Merge Remote Code',
        titleBn: '৪.৫ লেটেস্ট কোড পুল ও মার্জ (git pull)',
        summaryEn: 'git pull',
        summaryBn: 'রিমোট ব্রাঞ্চ থেকে লেটেস্ট কোড এনে স্বয়ংক্রিয়ভাবে লোকাল ব্রাঞ্চে মার্জ করে (fetch + merge)।',
        whyUseThisEn: 'Stay updated with your team\'s progress and ensure your branch is not building on top of obsolete code.',
        whyUseThisBn: 'রিমোটের নতুন কোড এনে নিজের বর্তমান ব্রাঞ্চের সাথে একীভূত করে সবসময় লেটেস্ট অবস্থায় থাকতে।',
        explanationEn: `\`git pull\` is essentially \`git fetch\` followed immediately by \`git merge\`. It pulls down your team's changes and merges them into your current local branch.`,
        explanationBn: `\`git pull\` মূলত \`fetch\` এবং \`merge\`-এর সমন্বয়। এটি রিমোটের কোড এনে সরাসরি আপনার বর্তমান লোকাল ব্রাঞ্চে মার্জ করে দেয়।`,
        videoTimestamp: '24:00',
        videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=1440',
        quickCommands: ['git pull'],
        tasks: [
          {
            id: 't-4-5-1',
            descriptionEn: 'Pull latest code using git pull',
            descriptionBn: 'git pull কমান্ড দিয়ে রিমোটের কোড আনুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git pull'))
          }
        ],
        tipsEn: ['Run: git pull'],
        tipsBn: ['টার্মিনালে চালান: git pull']
      },
      {
        id: '4-6',
        levelId: 4,
        order: 6,
        titleEn: '4.6 Prune Deleted Remote Branches',
        titleBn: '৪.৬ ডিলিট হওয়া রিমোট ব্রাঞ্চ ট্র্যাকিং প্রুন করা',
        summaryEn: 'git remote prune origin',
        summaryBn: 'রিমোটে ডিলিট হয়ে যাওয়া ব্রাঞ্চগুলোর অবশিষ্টাংশ লোকাল ট্র্যাকিং লিস্ট থেকে পরিষ্কার করে।',
        whyUseThisEn: 'When PRs are merged and branches deleted on GitHub, prune removes phantom tracking pointers from your machine.',
        whyUseThisBn: 'গিটহাবে মুছে যাওয়া পুরনো ব্রাঞ্চগুলোর অপ্রয়োজনীয় রেকর্ড লোকাল তালিকা থেকে সাফ করে ক্লিন রাখতে।',
        explanationEn: `When a PR is merged and deleted on GitHub, local tracking pointers like \`origin/old-feature\` linger. \`git remote prune origin\` cleans up these dead references!`,
        explanationBn: `গিটহাবে পিআর মার্জ হওয়ার পর রিমোট ব্রাঞ্চ মুছে ফেলা হলেও লোকাল মেশিনে তার রেফারেন্স থেকে যায়। \`git remote prune origin\` দিয়ে এই মৃত ব্রাঞ্চগুলো লোকাল ট্র্যাকিং থেকে সাফ করুন।`,
        videoTimestamp: '26:15',
        videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=1575',
        quickCommands: ['git remote prune origin'],
        tasks: [
          {
            id: 't-4-6-1',
            descriptionEn: 'Prune stale remote branches using git remote prune origin',
            descriptionBn: 'git remote prune origin কমান্ড চালান',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('remote prune'))
          }
        ],
        tipsEn: ['Run: git remote prune origin'],
        tipsBn: ['রান করুন: git remote prune origin']
      }
    ]
  },

  // ==========================================
  // LEVEL 5: Undoing & Stashing
  // ==========================================
  {
    id: 5,
    number: '05',
    titleEn: 'Undoing, Stashing & Cleanup',
    titleBn: 'আনডু, স্ট্যাশ ও ক্লিনআপ',
    subtitleEn: 'Discarding changes, restoring files, stashing WIP, and resets',
    subtitleBn: 'ফাইল রিস্টোর, সাময়িক স্ট্যাশ, ক্লিনআপ, সফট/হার্ড রিসেট ও রিভার্ট',
    iconName: 'RotateCcw',
    badgeColor: 'border-amber-500/40 text-amber-400 bg-amber-500/10',
    videoCourseTitle: 'ThePrimeagen & Tower: Recovery Workflows',
    videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=5776',
    lessons: [
      {
        id: '5-1',
        levelId: 5,
        order: 1,
        titleEn: '5.1 Discard Local File Changes',
        titleBn: '৫.১ ফাইলের লোকাল পরিবর্তন বাতিল (git restore)',
        summaryEn: 'git restore <file_name>',
        summaryBn: 'আন-কমিটেড কোনো ফাইলের লোকাল পরিবর্তনগুলো বাতিল করে আগের অবস্থায় ফেরত নেয়।',
        whyUseThisEn: 'If an experimental code tweak went wrong and broke your tests, wipe out the edits and start over cleanly.',
        whyUseThisBn: 'ফাইলে কোনো ভুল কোড লিখে টেস্ট ফেইল করলে পরিবর্তনগুলো বাতিল করে ফ্রেশ আগের অবস্থায় ফিরতে।',
        explanationEn: `Accidentally modified a file and want to throw away your unsaved changes? \`git restore <file>\` reverts the working directory file to match the last commit.`,
        explanationBn: `কোনো ফাইলে ভুল পরিবর্তন করে ফেললে এবং তা বাতিল করে শেষ কমিটের অবস্থায় ফিরিয়ে নিতে \`git restore <file_name>\` ব্যবহার করুন।`,
        videoTimestamp: '01:30:10',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=5410',
        quickCommands: ['git restore app.js'],
        tasks: [
          {
            id: 't-5-1-1',
            descriptionEn: 'Discard file modifications with git restore <file>',
            descriptionBn: 'git restore app.js দিয়ে পরিবর্তন বাতিল করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.startsWith('git restore') && !c.includes('--staged'))
          }
        ],
        tipsEn: ['Run: git restore app.js'],
        tipsBn: ['চালিয়ে দেখুন: git restore app.js']
      },
      {
        id: '5-2',
        levelId: 5,
        order: 2,
        titleEn: '5.2 Unstage a File from Index',
        titleBn: '৫.২ স্টেজিং এরিয়া থেকে আনস্টেজ করা',
        summaryEn: 'git restore --staged <file_name>',
        summaryBn: 'স্টেজিং এরিয়া (git add) থেকে কোনো ফাইলকে নিরাপদে আনস্টেজ করে।',
        whyUseThisEn: 'If you accidentally staged a secret file like .env, unstage it immediately before you commit and leak credentials!',
        whyUseThisBn: 'ভুল করে কোনো পাসওয়ার্ড বা সিক্রেট ফাইল git add করে ফেললে কমিটের আগেই তাকে নিরাপদে আনস্টেজ করতে।',
        explanationEn: `Did you mistakenly run \`git add\` on a file? \`git restore --staged <file>\` removes it from the staging area while leaving your file contents intact in the working tree.`,
        explanationBn: `ভুল করে কোনো ফাইল \`git add\` করে ফেললে ফাইলটির পরিবর্তন নষ্ট না করে স্টেজিং থেকে সরিয়ে আনতে \`git restore --staged <file_name>\` কমান্ড চালান।`,
        videoTimestamp: '01:32:00',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=5520',
        quickCommands: ['git restore --staged app.js'],
        tasks: [
          {
            id: 't-5-2-1',
            descriptionEn: 'Unstage file using git restore --staged <file>',
            descriptionBn: 'git restore --staged app.js চালিয়ে আনস্টেজ করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('restore --staged'))
          }
        ],
        tipsEn: ['Run: git restore --staged app.js'],
        tipsBn: ['টার্মিনালে চালান: git restore --staged app.js']
      },
      {
        id: '5-3',
        levelId: 5,
        order: 3,
        titleEn: '5.3 Stash In-Progress Changes',
        titleBn: '৫.৩ অসমাপ্ত কাজ সাময়িক স্ট্যাশ করা',
        summaryEn: 'git stash',
        summaryBn: 'অসমাপ্ত কাজ সাময়িকভাবে স্টোর করে ওয়ার্কিং ডিরেক্টরি একদম ক্লিন অবস্থায় নেয়।',
        whyUseThisEn: 'Production has a critical bug and you must switch branches immediately, but your feature is half-written and not ready to commit.',
        whyUseThisBn: 'জরুরি অন্য কাজ করতে হবে কিন্তু বর্তমান ফিচারের কোড এখনো অসম্পূর্ণ—তখন কোড না মুছে নিরাপদে লুকিয়ে রাখতে।',
        explanationEn: `Need to switch branches urgently to fix a hotfix, but your current feature isn't ready to commit? \`git stash\` saves your dirty state to a stack and leaves you with a clean working tree!`,
        explanationBn: `অর্ধেক করা কাজ কমিট না করে সাময়িকভাবে লুকিয়ে রাখতে \`git stash\` ব্যবহার করা হয়। এটি আপনার ওয়ার্কস্পেসকে একদম ক্লিন করে দেয় যাতে জরুরি কাজ সেরে নেওয়া যায়।`,
        videoTimestamp: '03:32:31',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=12751',
        quickCommands: ['git stash'],
        tasks: [
          {
            id: 't-5-3-1',
            descriptionEn: 'Save dirty work with git stash',
            descriptionBn: 'git stash দিয়ে সাময়িক পরিবর্তন সেভ করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim() === 'git stash')
          }
        ],
        tipsEn: ['Run: git stash'],
        tipsBn: ['রান করুন: git stash']
      },
      {
        id: '5-4',
        levelId: 5,
        order: 4,
        titleEn: '5.4 Pop Stashed Changes Back',
        titleBn: '৫.৪ স্ট্যাশ করা কাজ ফিরিয়ে আনা (git stash pop)',
        summaryEn: 'git stash pop',
        summaryBn: 'স্ট্যাশ করে রাখা সাময়িক পরিবর্তনগুলো আবার ফিরিয়ে আনে এবং স্ট্যাশ মেমোরি থেকে মুছে ফেলে।',
        whyUseThisEn: 'Resume work exactly where you left off after finishing a hotfix or switching back from another branch.',
        whyUseThisBn: 'অন্য জরুরি কাজ শেষ করে আগের কাজে ফিরে এসে লুকিয়ে রাখা কোড আবার ফিরিয়ে নিয়ে কাজ চালিয়ে যেতে।',
        explanationEn: `When you return to your feature branch, run \`git stash pop\`. It applies your saved changes back to your working directory and drops them from the stash stack.`,
        explanationBn: `অন্য কাজ শেষ করে আগের কাজে ফিরে এলে \`git stash pop\` কমান্ড দিলে স্ট্যাশ করে রাখা পরিবর্তনগুলো আবার কোডে ফিরে আসে এবং মেমোরি থেকে মুছে যায়।`,
        videoTimestamp: '03:36:10',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=12970',
        quickCommands: ['git stash pop'],
        tasks: [
          {
            id: 't-5-4-1',
            descriptionEn: 'Restore stashed files with git stash pop',
            descriptionBn: 'git stash pop চালিয়ে কোড ফিরিয়ে আনুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim() === 'git stash pop')
          }
        ],
        tipsEn: ['Run: git stash pop'],
        tipsBn: ['চালিয়ে দেখুন: git stash pop']
      },
      {
        id: '5-5',
        levelId: 5,
        order: 5,
        titleEn: '5.5 Clean Untracked Files',
        titleBn: '৫.৫ আনট্র্যাকড ফাইল ও ফোল্ডার পরিষ্কার',
        summaryEn: 'git clean -fd',
        summaryBn: 'ওয়ার্কিং ডিরেক্টরি থেকে ট্র্যাকিং-এ না থাকা (untracked) ফাইল ও ফোল্ডার একবারে মুছে ফেলে।',
        whyUseThisEn: 'Wipe away temporary test files, local build output dumps, and scratch files that were never tracked.',
        whyUseThisBn: 'টেস্টিংয়ের সময় তৈরি হওয়া আবর্জনা ফাইল বা টেস্ট ডিরেক্টরিগুলো এক ক্লিকে চিরতরে মুছে ফেলে রিপো ক্লিন রাখতে।',
        explanationEn: `\`git clean -fd\` removes untracked files (\`-f\` for force) and directories (\`-d\`) from your workspace, wiping away generated junk, build outputs, or scratch files.`,
        explanationBn: `গিট ট্র্যাকিংয়ে না থাকা অপ্রয়োজনীয় ফাইল ও ফোল্ডার একবারে মুছে পরিষ্কার করতে \`git clean -fd\` কমান্ড দেওয়া হয়।`,
        videoTimestamp: '01:34:50',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=5690',
        quickCommands: ['git clean -fd'],
        tasks: [
          {
            id: 't-5-5-1',
            descriptionEn: 'Clean untracked files with git clean -fd',
            descriptionBn: 'git clean -fd কমান্ড চালান',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('clean -fd'))
          }
        ],
        tipsEn: ['Run: git clean -fd'],
        tipsBn: ['টার্মিনালে চালান: git clean -fd']
      },
      {
        id: '5-6',
        levelId: 5,
        order: 6,
        titleEn: '5.6 Soft Reset (Keep Changes Staged)',
        titleBn: '৫.৬ সফট রিসেট (স্টেজিং অক্ষত রেখে কমিট বাতিল)',
        summaryEn: 'git reset --soft HEAD~1',
        summaryBn: 'সর্বশেষ কমিটটি আনডু করে দেয়, তবে কোডের পরিবর্তনগুলো স্টেজিং এরিয়াতে অক্ষত রাখে।',
        whyUseThisEn: 'Undo an accidental commit without losing a single character of code! You can split changes or re-commit with a better message.',
        whyUseThisBn: 'কমিট বাতিল করার পরও কোডের একটি লাইনও না হারিয়ে স্টেজিংয়ে রেখে আবার পরিমার্জন করে কমিট করতে।',
        explanationEn: `\`git reset --soft HEAD~1\` rewinds the HEAD pointer back by one commit, but leaves all the file modifications staged in the index ready to be recommitted immediately!`,
        explanationBn: `সর্বশেষ কমিটটি বাতিল করার পরও যদি কোডের পরিবর্তনগুলো স্টেজিং এরিয়াতে রেখে দিতে চান, তবে \`git reset --soft HEAD~1\` ব্যবহার করুন।`,
        videoTimestamp: '01:36:16',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=5776',
        quickCommands: ['git reset --soft HEAD~1'],
        tasks: [
          {
            id: 't-5-6-1',
            descriptionEn: 'Perform soft reset with git reset --soft HEAD~1',
            descriptionBn: 'git reset --soft HEAD~1 কমান্ড চালান',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('reset --soft'))
          }
        ],
        tipsEn: ['Run: git reset --soft HEAD~1'],
        tipsBn: ['রান করুন: git reset --soft HEAD~1']
      },
      {
        id: '5-7',
        levelId: 5,
        order: 7,
        titleEn: '5.7 Hard Reset (Discard Everything)',
        titleBn: '৫.৭ হার্ড রিসেট (সম্পূর্ণ পরিবর্তন মুছে পূর্বের কমিটে ফেরা)',
        summaryEn: 'git reset --hard HEAD~1',
        summaryBn: 'সর্বশেষ কমিট এবং সেটির পরিবর্তন সম্পূর্ণ মুছে আগের কমিটে ফিরে যায়।',
        whyUseThisEn: 'When an experiment completely failed and you want to completely obliterate all commits and code back to the previous good state.',
        whyUseThisBn: 'ভুল পথে এগোনো শেষ কমিটটি কোডের পরিবর্তন সহ সম্পূর্ণ ধ্বংস করে দিয়ে পূর্বের ভালো কমিটে ফিরে যেতে।',
        explanationEn: `Danger zone! \`git reset --hard HEAD~1\` completely wipes out the latest commit AND discards all uncommitted modifications from your working directory.`,
        explanationBn: `সতর্কতা! \`git reset --hard HEAD~1\` কমান্ড দিলে শেষ কমিটের সমস্ত ফাইল ও পরিবর্তন সম্পূর্ণ ধ্বংস হয়ে গিট একদম পূর্ববর্তী কমিটের অবস্থায় ফিরে যায়।`,
        videoTimestamp: '01:40:20',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=6020',
        quickCommands: ['git reset --hard HEAD~1'],
        tasks: [
          {
            id: 't-5-7-1',
            descriptionEn: 'Perform hard reset with git reset --hard HEAD~1',
            descriptionBn: 'git reset --hard HEAD~1 কমান্ড চালান',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('reset --hard'))
          }
        ],
        tipsEn: ['Run: git reset --hard HEAD~1'],
        tipsBn: ['চালিয়ে দেখুন: git reset --hard HEAD~1']
      },
      {
        id: '5-8',
        levelId: 5,
        order: 8,
        titleEn: '5.8 Safely Revert a Public Commit',
        titleBn: '৫.৮ নিরাপদ রিভার্ট কমিট তৈরি (git revert)',
        summaryEn: 'git revert <commit_hash>',
        summaryBn: 'পূর্বের একটি নির্দিষ্ট কমিটের বিপরীত পরিবর্তন এনে নতুন একটি নিরাপদ কমিট তৈরি করে।',
        whyUseThisEn: 'The correct, professional way to undo a bug that has already been pushed to GitHub. Unlike reset, it never rewrites shared history.',
        whyUseThisBn: 'গিটহাবে অলরেডি পুশ করা পাবলিক ব্রাঞ্চের ভুল কমিট টিমমেটদের হিস্টোরি না ভেঙে নতুন বিপরীত কমিটের মাধ্যমে বাতিল করতে।',
        explanationEn: `Never rewrite public shared branches! Instead of reset, use \`git revert <commit_hash>\`. It creates a brand-new commit that inverses the changes of the target commit, preserving project history.`,
        explanationBn: `যেসব কমিট ইতোমধ্যে গিটহাবে পুশ হয়ে গেছে সেগুলো ডিলিট করা ঠিক নয়। \`git revert <commit_hash>\` পূর্বের কমিটের বিপরীত পরিবর্তন এনে নতুন একটি নিরাপদ কমিট তৈরি করে।`,
        videoTimestamp: '03:44:22',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=13462',
        quickCommands: ['git revert c1'],
        tasks: [
          {
            id: 't-5-8-1',
            descriptionEn: 'Revert commit using git revert <commit>',
            descriptionBn: 'git revert c1 দিয়ে রিভার্ট কমিট তৈরি করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git revert'))
          }
        ],
        tipsEn: ['Run: git revert c1'],
        tipsBn: ['টার্মিনালে চালান: git revert c1']
      }
    ]
  },

  // ==========================================
  // LEVEL 6: Inspection & Debugging
  // ==========================================
  {
    id: 6,
    number: '06',
    titleEn: 'Inspection & Debugging',
    titleBn: 'ডিবাগিং ও কোড ট্র্যাকিং',
    subtitleEn: 'Line-by-line diffs, blame annotations, and binary searching bugs with Bisect',
    subtitleBn: 'ডিফ দেখা, লাইন-বাই-লাইন ব্লেইম এবং বাইসেক্ট দিয়ে বাগ অনুসন্ধান',
    iconName: 'Search',
    badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10',
    videoCourseTitle: 'Tower & ThePrimeagen: Advanced Inspection & Bisect',
    videoUrl: 'https://youtu.be/qsTthZi23VE?t=1770',
    lessons: [
      {
        id: '6-1',
        levelId: 6,
        order: 1,
        titleEn: '6.1 View Unstaged File Diffs',
        titleBn: '৬.১ আন-স্টেজড ফাইলের লাইন-বাই-লাইন তফাত',
        summaryEn: 'git diff',
        summaryBn: 'আন-স্টেজড পরিবর্তনের লাইন-বাই-লাইন তফাত দেখায়।',
        whyUseThisEn: 'Perform self-review before running git add to spot leftover debug console.logs or syntax mistakes.',
        whyUseThisBn: 'স্টেজ করার আগে ফাইলে কোন কোন লাইন পরিবর্তন হয়েছে তা নিখুঁতভাবে চেক করে টেস্ট ডিবাগ কোড বাদ দিতে।',
        explanationEn: `\`git diff\` compares your current working directory against the staging index, showing exact added lines (+) in green and removed lines (-) in red.`,
        explanationBn: `\`git diff\` কমান্ড আপনার আন-স্টেজড কোডের প্রতিটি লাইন-বাই-লাইন পরিবর্তন (কোন লাইন যুক্ত বা বাদ দেওয়া হয়েছে) রঙিন আকারে প্রদর্শন করে।`,
        videoTimestamp: '29:30',
        videoUrl: 'https://youtu.be/qsTthZi23VE?t=1770',
        quickCommands: ['git diff'],
        tasks: [
          {
            id: 't-6-1-1',
            descriptionEn: 'Inspect working differences with git diff',
            descriptionBn: 'git diff কমান্ড দিয়ে কোড ডিফারেন্স দেখুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim() === 'git diff')
          }
        ],
        tipsEn: ['Run: git diff'],
        tipsBn: ['চালিয়ে দেখুন: git diff']
      },
      {
        id: '6-2',
        levelId: 6,
        order: 2,
        titleEn: '6.2 View Staged Changes Diff',
        titleBn: '৬.২ স্টেজিং এরিয়ায় থাকা কোডের তফাত',
        summaryEn: 'git diff --staged',
        summaryBn: 'স্টেজিং এরিয়ায় রাখা পরিবর্তনের সাথে শেষ কমিটের তুলনা প্রদর্শন করে।',
        whyUseThisEn: 'Final check of the exact payload that will be written into the next commit snapshot.',
        whyUseThisBn: 'কমিট করার আগে স্টেজিং এরিয়ায় কোন কোন পরিবর্তন জমা হয়েছে তা শেষবারের মতো যাচাই করতে।',
        explanationEn: `Before you commit, review exactly what will go into the commit! \`git diff --staged\` (or \`--cached\`) compares your staging area against the last commit.`,
        explanationBn: `কমিট করার আগে স্টেজিং এরিয়ায় কোন কোন পরিবর্তন যুক্ত করা হয়েছে তা শেষ কমিটের সাথে মিলিয়ে দেখতে \`git diff --staged\` কমান্ড চালান।`,
        videoTimestamp: '31:00',
        videoUrl: 'https://youtu.be/qsTthZi23VE?t=1860',
        quickCommands: ['git diff --staged'],
        tasks: [
          {
            id: 't-6-2-1',
            descriptionEn: 'Inspect staged differences with git diff --staged',
            descriptionBn: 'git diff --staged কমান্ড চালান',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('diff --staged') || c.includes('diff --cached'))
          }
        ],
        tipsEn: ['Run: git diff --staged'],
        tipsBn: ['টার্মিনালে চালান: git diff --staged']
      },
      {
        id: '6-3',
        levelId: 6,
        order: 3,
        titleEn: '6.3 Trace Line Authorship with Git Blame',
        titleBn: '৬.৩ কে কোন লাইন লিখেছিল তা জানা (git blame)',
        summaryEn: 'git blame <file_name>',
        summaryBn: 'একটি ফাইলের প্রতিটি সিঙ্গেল লাইন কে, কখন এবং কোন কমিট হ্যাশে লিখেছিল তা বিস্তারিত ট্র্যাক করে।',
        whyUseThisEn: 'Find out which commit introduced a confusing piece of logic so you can read the commit message or ask the original author.',
        whyUseThisBn: 'কোডের কোনো লাইনের পেছনের কারণ বা কোন ইঞ্জিনিয়ার কখন লাইনটি লিখেছিল তা বিস্তারিত জানতে।',
        explanationEn: `Wondering why a line of code was written or who introduced it? \`git blame <file_name>\` prints the commit hash, author name, and timestamp for every single line in a file!`,
        explanationBn: `ফাইলের কোনো একটি নির্দিষ্ট লাইন কে লিখেছে এবং কোন তারিখে লিখেছিল তা বিস্তারিত জানতে \`git blame <file_name>\` ব্যবহার করুন।`,
        videoTimestamp: '32:15',
        videoUrl: 'https://youtu.be/qsTthZi23VE?t=1935',
        quickCommands: ['git blame README.md'],
        tasks: [
          {
            id: 't-6-3-1',
            descriptionEn: 'Run git blame on a file',
            descriptionBn: 'git blame README.md চালিয়ে লেখকের তথ্য দেখুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git blame'))
          }
        ],
        tipsEn: ['Run: git blame README.md'],
        tipsBn: ['চালিয়ে দেখুন: git blame README.md']
      },
      {
        id: '6-4',
        levelId: 6,
        order: 4,
        titleEn: '6.4 Find Buggy Commits via Binary Search (Bisect)',
        titleBn: '৬.৪ বাইনারি সার্চ দিয়ে বাগ খোঁজা (git bisect)',
        summaryEn: 'git bisect start',
        summaryBn: 'কোডবেসে বাগ ঢোকার সঠিক কমিটটি খুঁজতে বাইনারি সার্চ মেকানিজম চালু করে।',
        whyUseThisEn: 'Instead of manually testing 500 commits, git bisect tests log2(500) ≈ 9 commits to find the exact commit that broke production.',
        whyUseThisBn: 'শত শত কমিটের মাঝে কোন নির্দিষ্ট কমিটে বাগ ঢুকেছিল তা ম্যানুয়ালি না খুঁজে বাইনারি সার্চ দিয়ে কয়েক সেকেন্ডে বের করতে।',
        explanationEn: `When a bug appeared somewhere in hundreds of commits, don't test them one by one! \`git bisect start\` uses binary search: you tell Git a "good" commit and a "bad" commit, and Git automatically pinpoints the exact commit that introduced the bug in $O(\\log N)$ steps!`,
        explanationBn: `শত শত কমিটের মাঝে কোন নির্দিষ্ট কমিটে বাগ ঢুকেছে তা বের করতে \`git bisect start\` বাইনারি সার্চ মেকানিজম চালু করে খুব দ্রুত অপরাধী কমিটটি শনাক্ত করে দেয়।`,
        videoTimestamp: '03:54:53',
        videoUrl: 'https://youtu.be/rH3zE7VlIMs?t=14093',
        quickCommands: ['git bisect start'],
        tasks: [
          {
            id: 't-6-4-1',
            descriptionEn: 'Start bisect debugging with git bisect start',
            descriptionBn: 'git bisect start কমান্ড দিয়ে বাইসেক্ট শুরু করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('bisect start'))
          }
        ],
        tipsEn: ['Run: git bisect start'],
        tipsBn: ['টার্মিনালে লিখুন: git bisect start']
      }
    ]
  },

  // ==========================================
  // LEVEL 7: Pro-level Git
  // ==========================================
  {
    id: 7,
    number: '07',
    titleEn: 'Pro-level Git Surgery',
    titleBn: 'অ্যাডভান্সড মেকানিজম ও ট্রাবলশুটিং',
    subtitleEn: 'Amending commits, interactive rebasing, cherry-picking & the Reflog safety net',
    subtitleBn: 'কমিট সংশোধন, ইন্টারেক্টিভ রিবেস, চেরি-পিক এবং রেফলগ রিকভারি',
    iconName: 'Wrench',
    badgeColor: 'border-rose-500/40 text-rose-400 bg-rose-500/10',
    videoCourseTitle: 'Tower / freeCodeCamp: Advanced Git Tutorial',
    videoUrl: 'https://youtu.be/qsTthZi23VE',
    lessons: [
      {
        id: '7-1',
        levelId: 7,
        order: 1,
        titleEn: '7.1 Amend Last Commit',
        titleBn: '৭.১ শেষ কমিট সংশোধন (git commit --amend)',
        summaryEn: 'git commit --amend -m "updated message"',
        summaryBn: 'সর্বশেষ কমিটের মেসেজ এডিট করা বা বাদ পড়া ফাইল শেষ কমিটের ভেতরে ঢুকিয়ে দেওয়া।',
        whyUseThisEn: 'Avoid ugly "fix typo" or "forgot icon" commits cluttering your pull request history before pushing.',
        whyUseThisBn: 'নতুন করে "ফিক্স টাইপো" টাইপের বাজে কমিট তৈরি না করে শেষ কমিটের ভেতরেই বাদ পড়া ফাইল বা মেসেজ শুধরে নিতে।',
        explanationEn: `Spotted a typo in your last commit message or forgot a small file? \`git commit --amend -m "updated message"\` updates the previous commit in place without bloating the history with unnecessary commits.`,
        explanationBn: `আগের কমিটের বানান ঠিক করা বা ভুলে যাওয়া কোনো ফাইল ওই শেষ কমিটেই ঢুকিয়ে দিতে \`git commit --amend -m "updated message"\` ব্যবহার করুন।`,
        videoTimestamp: '06:12',
        videoUrl: 'https://youtu.be/Uszj_k0DGsg?t=372',
        quickCommands: ['git commit --amend -m "feat: corrected commit description"'],
        tasks: [
          {
            id: 't-7-1-1',
            descriptionEn: 'Amend last commit using git commit --amend -m "..."',
            descriptionBn: 'git commit --amend -m "..." দিয়ে শেষ কমিট সংশোধন করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('commit --amend'))
          }
        ],
        tipsEn: ['Run: git commit --amend -m "feat: perfect commit message"'],
        tipsBn: ['চালিয়ে দেখুন: git commit --amend -m "feat: updated message"']
      },
      {
        id: '7-2',
        levelId: 7,
        order: 2,
        titleEn: '7.2 Interactive Rebase & Squash',
        titleBn: '৭.২ ইন্টারেক্টিভ রিবেসিং (git rebase -i)',
        summaryEn: 'git rebase -i HEAD~<number>',
        summaryBn: 'ইন্টারেক্টিভ রিবেসিং মোড ওপেন করে; যার মাধ্যমে কমিট স্কোয়াশ (Squash), রি-অর্ডার বা এডিট করা যায়।',
        whyUseThisEn: 'Clean up messy exploratory commits into clean, reviewable pull requests before asking teammates to review.',
        whyUseThisBn: 'টিমমেটদের কাছে পিআর পাঠানোর আগে ২০টি এলোমেলো কমিটকে স্কোয়াশ করে মাত্র ১টি বা ২টি সুসংগঠিত কমিটে রূপান্তর করতে।',
        explanationEn: `The scalpel of Git history! \`git rebase -i HEAD~3\` launches interactive rebase mode. You can combine multiple tiny commits into one clean commit (\`squash\`), rewrite messages (\`reword\`), or drop commits completely.`,
        explanationBn: `গিটের সবচেয়ে পাওয়ারফুল টুল \`git rebase -i HEAD~3\`। এটি দিয়ে একাধিক ছোটখাটো কমিটকে একটি সুন্দর কমিটে যুক্ত (Squash) করা, কমিটের ক্রম পরিবর্তন বা অপ্রয়োজনীয় কমিট মুছে ফেলা যায়।`,
        videoTimestamp: '01:23',
        videoUrl: 'https://youtu.be/qsTthZi23VE?t=83',
        quickCommands: ['git rebase -i HEAD~3'],
        tasks: [
          {
            id: 't-7-2-1',
            descriptionEn: 'Trigger interactive rebase with git rebase -i HEAD~3',
            descriptionBn: 'git rebase -i HEAD~3 কমান্ড দিয়ে ইন্টারেক্টিভ রিবেস টেস্ট করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('rebase -i'))
          }
        ],
        tipsEn: ['Run: git rebase -i HEAD~3'],
        tipsBn: ['টার্মিনালে চালান: git rebase -i HEAD~3']
      },
      {
        id: '7-3',
        levelId: 7,
        order: 3,
        titleEn: '7.3 Cherry-Pick Specific Commits',
        titleBn: '৭.৩ নির্দিষ্ট কমিট টেনে আনা (git cherry-pick)',
        summaryEn: 'git cherry-pick <commit_hash>',
        summaryBn: 'পুরো ব্রাঞ্চ মার্জ না করে অন্য ব্রাঞ্চ থেকে শুধু নির্দিষ্ট একটি কমিটের পরিবর্তন নিয়ে আসে।',
        whyUseThisEn: 'Port a single urgent hotfix or useful commit from an experimental branch without pulling in all unfinished broken code.',
        whyUseThisBn: 'অন্যের অসম্পূর্ণ ব্রাঞ্চ থেকে শুধু আপনার প্রয়োজনীয় নির্দিষ্ট ১টি বাগফিক্স কমিট নিজের ব্রাঞ্চে টেনে আনতে।',
        explanationEn: `Need just one bugfix from an unmerged feature branch? \`git cherry-pick <commit_hash>\` copies that exact commit and replays it cleanly onto your current checked-out branch.`,
        explanationBn: `অন্য ব্রাঞ্চ থেকে পুরো ব্রাঞ্চ মার্জ না করে শুধু নির্দিষ্ট একটি প্রয়োজনীয় কমিটের কোড নিজের ব্রাঞ্চে টেনে আনতে \`git cherry-pick <commit_hash>\` ব্যবহার করুন।`,
        videoTimestamp: '08:54',
        videoUrl: 'https://youtu.be/qsTthZi23VE?t=534',
        quickCommands: ['git cherry-pick c1'],
        tasks: [
          {
            id: 't-7-3-1',
            descriptionEn: 'Cherry pick a commit using git cherry-pick <commit>',
            descriptionBn: 'git cherry-pick c1 দিয়ে নির্দিষ্ট কমিট পিক করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git cherry-pick'))
          }
        ],
        tipsEn: ['Run: git cherry-pick c1'],
        tipsBn: ['চালিয়ে দেখুন: git cherry-pick c1']
      },
      {
        id: '7-4',
        levelId: 7,
        order: 4,
        titleEn: '7.4 Reflog: Recover Lost Work',
        titleBn: '৭.৪ গিট রেফলগ দিয়ে হারিয়ে যাওয়া কোড উদ্ধার',
        summaryEn: 'git reflog',
        summaryBn: 'হেডের প্রতিটি স্টেপ ট্র্যাক করে; ভুল করে মুছে ফেলা কমিট বা ব্রাঞ্চ রিকভার করতে সাহায্য করে।',
        whyUseThisEn: 'The ultimate safety net! Commits and branches deleted by mistake are still alive in the reflog for up to 90 days.',
        whyUseThisBn: 'ভুল করে কোনো ব্রাঞ্চ বা কমিট ডিলিট করে ফেললেও হতাশ না হয়ে এই ব্ল্যাকবক্স লগ থেকে নিখোঁজ কোড পুনরুদ্ধার করতে।',
        explanationEn: `Accidentally ran \`git reset --hard\` or deleted a branch? Commits are not deleted immediately! \`git reflog\` records every movement of \`HEAD\`. You can retrieve your lost commit hash and restore it!`,
        explanationBn: `ভুল করে কোনো ব্রাঞ্চ বা কমিট মুছে ফেললেও গিট তার হিস্টোরি **Reflog**-এ জমা রাখে। \`git reflog\` দিয়ে আগের হ্যাশ দেখে যেকোনো মুহূর্তে তা ফিরিয়ে আনা যায়।`,
        videoTimestamp: '12:10',
        videoUrl: 'https://youtu.be/qsTthZi23VE?t=730',
        quickCommands: ['git reflog'],
        tasks: [
          {
            id: 't-7-4-1',
            descriptionEn: 'Inspect the reference log with git reflog',
            descriptionBn: 'git reflog চালিয়ে হিস্টোরি লগ দেখুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('git reflog'))
          }
        ],
        tipsEn: ['Run: git reflog'],
        tipsBn: ['রান করুন: git reflog']
      }
    ]
  },

  // ==========================================
  // LEVEL 8: GitHub CLI Tools (gh)
  // ==========================================
  {
    id: 8,
    number: '08',
    titleEn: 'GitHub CLI Tools (gh Automation)',
    titleBn: 'GitHub CLI টুলস (Terminal Automation gh)',
    subtitleEn: 'Command-line Pull Requests, web repository viewers, and automated CI/CD pipelines',
    subtitleBn: 'টার্মিনাল থেকে সরাসরি পুল রিকোয়েস্ট তৈরি এবং গিটহাব অটোমেশন',
    iconName: 'Terminal',
    badgeColor: 'border-yellow-500/40 text-yellow-400 bg-yellow-500/10',
    videoCourseTitle: 'Brian Douglas / freeCodeCamp: GitHub Certification & Automation',
    videoUrl: 'https://youtu.be/Tz7FsunBbfQ',
    lessons: [
      {
        id: '8-1',
        levelId: 8,
        order: 1,
        titleEn: '8.1 Create Pull Request via Terminal',
        titleBn: '৮.১ টার্মিনাল থেকেই সরাসরি পিআর (PR) তৈরি',
        summaryEn: 'gh pr create --title "feature update" --body "details"',
        summaryBn: 'ব্রাউজারে না গিয়ে সরাসরি টার্মিনাল থেকেই গিটহাবে পুল রিকোয়েস্ট তৈরি করে।',
        whyUseThisEn: 'Speed up workflow by opening Pull Requests in 2 seconds directly where you code, without context-switching to browser tabs.',
        whyUseThisBn: 'ব্রাউজার ওপেন করে বাটন না খুঁজে সরাসরি টার্মিনাল থেকেই দ্রুত প্রফেশনাল পুল রিকোয়েস্ট তৈরি করার জন্য।',
        explanationEn: `With GitHub CLI (\`gh\`), developers never need to leave their terminal! \`gh pr create --title "feature update" --body "details"\` creates an official GitHub Pull Request right from the command line.`,
        explanationBn: `ব্রাউজারে গিটহাব ডট কম ওপেন না করেই সরাসরি টার্মিনাল থেকে পুল রিকোয়েস্ট (PR) পাঠাতে \`gh pr create --title "..." --body "..."\` ব্যবহার করা হয়।`,
        videoTimestamp: '00:14:07',
        videoUrl: 'https://youtu.be/Tz7FsunBbfQ?t=847',
        quickCommands: ['gh pr create --title "feat: user dashboard" --body "Added dashboard stats"'],
        tasks: [
          {
            id: 't-8-1-1',
            descriptionEn: 'Create a PR using gh pr create --title "..." --body "..."',
            descriptionBn: 'gh pr create কমান্ড দিয়ে পুল রিকোয়েস্ট তৈরি করুন',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.trim().startsWith('gh pr create'))
          }
        ],
        tipsEn: ['Run: gh pr create --title "feat: new feature" --body "PR details"'],
        tipsBn: ['চালিয়ে দেখুন: gh pr create --title "feature update" --body "details"']
      },
      {
        id: '8-2',
        levelId: 8,
        order: 2,
        titleEn: '8.2 Open Repository in Browser via CLI',
        titleBn: '৮.২ ব্রাউজারে রিপোজিটরি ওপেন করা (gh repo view --web)',
        summaryEn: 'gh repo view --web',
        summaryBn: 'লোকাল টার্মিনাল থেকেই সরাসরি ডিফল্ট ব্রাউজারে বর্তমান প্রজেক্টটির গিটহাব রিপোজিটরি ওপেন করে।',
        whyUseThisEn: 'Jump straight to your repository settings, actions tab, or PR list in your web browser with one fast command.',
        whyUseThisBn: 'এক ক্লিকে ব্রাউজারে বর্তমান প্রোজেক্টের গিটহাব পেজটি খুলে সেটিংস বা পিআর দেখতে।',
        explanationEn: `Instantly open your project's repository on GitHub.com in your default web browser directly from your terminal using \`gh repo view --web\`!`,
        explanationBn: `টার্মিনালে কাজ করার সময় সরাসরি এক কমান্ডে আপনার ডিফল্ট ব্রাউজারে বর্তমান প্রোজেক্টের গিটহাব পেজটি খুলতে \`gh repo view --web\` ব্যবহার করুন।`,
        videoTimestamp: '00:29:08',
        videoUrl: 'https://youtu.be/Tz7FsunBbfQ?t=1748',
        quickCommands: ['gh repo view --web'],
        tasks: [
          {
            id: 't-8-2-1',
            descriptionEn: 'Open repository with gh repo view --web',
            descriptionBn: 'gh repo view --web কমান্ড চালান',
            isCompleted: false,
            check: (_state, history) => history.some(c => c.includes('repo view'))
          }
        ],
        tipsEn: ['Run: gh repo view --web'],
        tipsBn: ['টার্মিনালে চালান: gh repo view --web']
      }
    ]
  }
];
