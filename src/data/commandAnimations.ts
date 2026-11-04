export interface AnimationStep {
  titleEn: string;
  titleBn: string;
  descriptionEn: string;
  descriptionBn: string;
}

export interface CommandAnimation {
  id: string; // e.g. '1-1', '2-4'
  command: string;
  titleEn: string;
  titleBn: string;
  visualScene: string;
  steps: AnimationStep[];
}

export const COMMAND_ANIMATIONS: Record<string, CommandAnimation> = {
  // ==========================================
  // LEVEL 1: Setup & Config
  // ==========================================
  '1-1': {
    id: '1-1',
    command: 'git config --global user.name "Your Name"',
    titleEn: 'Writing Global Author Identity',
    titleBn: 'গ্লোবাল ইউজারনেম রাইট করার মেকানিজম',
    visualScene: 'config-name',
    steps: [
      {
        titleEn: 'Step 1: Open ~/.gitconfig',
        titleBn: 'ধাপ ১: ~/.gitconfig ফাইল ওপেন',
        descriptionEn: 'Git opens the global user configuration file in your home directory.',
        descriptionBn: 'গিট আপনার হোম ডিরেক্টরিতে থাকা গ্লোবাল কনফিগারেশন ফাইল খোলে।'
      },
      {
        titleEn: 'Step 2: Append user.name',
        titleBn: 'ধাপ ২: user.name রাইট করা',
        descriptionEn: 'Writes [user] name = "Your Name" into the configuration buffer.',
        descriptionBn: 'ফাইলের [user] ব্লকে আপনার নাম রাইট করা হয়।'
      },
      {
        titleEn: 'Step 3: Stamped as Default Author',
        titleBn: 'ধাপ ৩: ডিফল্ট লেখক হিসেবে সক্রিয়',
        descriptionEn: 'Every future commit made in any repository on this machine signs with this name.',
        descriptionBn: 'এখন থেকে এই কম্পিউটারে তৈরি সমস্ত কমিটে আপনার নাম স্থায়ীভাবে সাইন হবে।'
      }
    ]
  },
  '1-2': {
    id: '1-2',
    command: 'git config --global user.email "your_email@example.com"',
    titleEn: 'Linking GitHub Contribution Email',
    titleBn: 'গিটহাব প্রোফাইল ইমেইল লিংকিং মেকানিজম',
    visualScene: 'config-email',
    steps: [
      {
        titleEn: 'Step 1: Save User Email to Config',
        titleBn: 'ধাপ ১: ইমেইল কনফিগে সেভ করা',
        descriptionEn: 'The email address is appended to ~/.gitconfig under the [user] section.',
        descriptionBn: 'ইমেইল অ্যাড্রেসটি ~/.gitconfig ফাইলের [user] সেকশনে জমা হয়।'
      },
      {
        titleEn: 'Step 2: Match Online Identity',
        titleBn: 'ধাপ ২: অনলাইন গিটহাব অ্যাকাউন্টের সাথে সংযোগ',
        descriptionEn: 'GitHub reads this email when commits are pushed to connect with your profile avatar.',
        descriptionBn: 'কোড পুশ করার পর গিটহাব এই ইমেইল দেখেই আপনার প্রোফাইল অবতার চিহ্নিত করে।'
      },
      {
        titleEn: 'Step 3: Unlock Green Contribution Squares',
        titleBn: 'ধাপ ৩: সবুজ কনট্রিবিউশন গ্রাফ সক্রিয়',
        descriptionEn: 'Your commits now earn green squares on your public GitHub activity graph!',
        descriptionBn: 'আপনার দেওয়া কমিটগুলো এখন গিটহাবের সবুজ কনট্রিবিউশন গ্রাফে যুক্ত হতে শুরু করবে!'
      }
    ]
  },
  '1-3': {
    id: '1-3',
    command: 'git init',
    titleEn: 'Repository Initialization & .git Creation',
    titleBn: 'রিপোজিটরি ইনিশিয়ালাইজেশন ও .git গঠন',
    visualScene: 'init-repo',
    steps: [
      {
        titleEn: 'Step 1: Ordinary Directory',
        titleBn: 'ধাপ ১: সাধারণ আনট্র্যাকড ফোল্ডার',
        descriptionEn: 'The directory begins as an ordinary folder with zero version tracking.',
        descriptionBn: 'শুরুতে ফোল্ডারটি একটি সাধারণ ফোল্ডার হিসেবে থাকে।'
      },
      {
        titleEn: 'Step 2: Generate Hidden .git/ Database',
        titleBn: 'ধাপ ২: লুকানো .git অবজেক্টস ডেটাবেস তৈরি',
        descriptionEn: 'Git creates the .git folder containing objects/, refs/heads, and config.',
        descriptionBn: 'গিট একটি লুকানো .git ফোল্ডার বানায় যাতে অবজেক্টস ডেটাবেস এবং রেফারেন্স থাকে।'
      },
      {
        titleEn: 'Step 3: Point HEAD to main',
        titleBn: 'ধাপ ৩: HEAD পয়েন্টার ডিফল্ট main ব্রাঞ্চে স্থাপন',
        descriptionEn: 'The HEAD reference is initialized pointing to refs/heads/main.',
        descriptionBn: 'HEAD ফাইল তৈরি হয়ে refs/heads/main ব্রাঞ্চের দিকে নির্দেশ করে।'
      }
    ]
  },
  '1-4': {
    id: '1-4',
    command: 'git clone <repo_url>',
    titleEn: 'Cloning Remote Project Over Network',
    titleBn: 'নেটওয়ার্কের মাধ্যমে ক্লাউড থেকে রিপোজিটরি ক্লোনিং',
    visualScene: 'clone-stream',
    steps: [
      {
        titleEn: 'Step 1: Handshake with GitHub Server',
        titleBn: 'ধাপ ১: গিটহাব সার্ভারের সাথে হ্যান্ডশেক',
        descriptionEn: 'Git establishes a secure connection with the remote GitHub repository URL.',
        descriptionBn: 'গিট ক্লাউড ইউআরএলের সাথে নিরাপদ সংযোগ স্থাপন করে।'
      },
      {
        titleEn: 'Step 2: Stream Packfile of Commits',
        titleBn: 'ধাপ ২: সমস্ত কমিট ও হিস্টোরি প্যাকেট ডাউনলোড',
        descriptionEn: 'All historical commits, trees, blobs, and branches stream to your local disk.',
        descriptionBn: 'প্রোজেক্টের সমস্ত কমিট, ট্রি এবং ফাইল কমপ্রেসড প্যাকেটে ডাউনলোড হয়ে আসে।'
      },
      {
        titleEn: 'Step 3: Setup origin/main & Checkout',
        titleBn: 'ধাপ ৩: origin/main ট্র্যাকিং ও ফাইল এক্সট্র্যাক্ট',
        descriptionEn: 'Configures remote origin and checks out the working tree files ready to code.',
        descriptionBn: 'রিমোট অরিজিন সেটআপ করে ফাইলগুলো আপনার ফোল্ডারে বের করে দেয়।'
      }
    ]
  },

  // ==========================================
  // LEVEL 2: Basic Workflow
  // ==========================================
  '2-1': {
    id: '2-1',
    command: 'git status',
    titleEn: '3-Tier Scanner (Working, Staging, HEAD)',
    titleBn: '৩-স্তরের স্ক্যানার: ওয়ার্কিং, স্টেজিং ও হেড',
    visualScene: 'scan-status',
    steps: [
      {
        titleEn: 'Step 1: Scan Working Directory',
        titleBn: 'ধাপ ১: ওয়ার্কিং ডিরেক্টরি স্ক্যান',
        descriptionEn: 'Compares file timestamps on disk to detect untracked and modified files.',
        descriptionBn: 'ডিস্কের ফাইলের সময় দেখে নতুন বা পরিবর্তিত ফাইল চিহ্নিত করে।'
      },
      {
        titleEn: 'Step 2: Inspect Staging Area (.git/index)',
        titleBn: 'ধাপ ২: স্টেজিং এরিয়ার ইনডেক্স যাচাই',
        descriptionEn: 'Reads the binary staging index to list files prepared for commit in green.',
        descriptionBn: 'স্টেজিং ইনডেক্স পড়ে কমিটের জন্য প্রস্তুত সবুজ ফাইলগুলো তালিকাভুক্ত করে।'
      },
      {
        titleEn: 'Step 3: Print Clean Status Report',
        titleBn: 'ধাপ ৩: সম্পূর্ণ স্ট্যাটাস রিপোর্ট প্রদর্শন',
        descriptionEn: 'Outputs the active branch name, tracking sync, and changed file paths.',
        descriptionBn: 'বর্তমান ব্রাঞ্চের নাম এবং আনট্র্যাকড/মডিফাইড ফাইলের পরিষ্কার সামারি দেখায়।'
      }
    ]
  },
  '2-2': {
    id: '2-2',
    command: 'git add <file_name>',
    titleEn: 'Selective File Staging & SHA-1 Hashing',
    titleBn: 'বাছাইকৃত ফাইল স্টেজিং ও SHA-1 হ্যাশিং',
    visualScene: 'add-file',
    steps: [
      {
        titleEn: 'Step 1: Pick Isolated Target File',
        titleBn: 'ধাপ ১: নির্দিষ্ট ফাইল বাছাই করা',
        descriptionEn: 'Isolates the target file on disk, ignoring other unrelated changes.',
        descriptionBn: 'অন্যান্য পরিবর্তন উপেক্ষা করে শুধুমাত্র নির্দিষ্ট ফাইলটিকে বেছে নেওয়া হয়।'
      },
      {
        titleEn: 'Step 2: Compress Content to Blob',
        titleBn: 'ধাপ ২: কন্টেন্ট কমপ্রেস করে ব্লব অবজেক্ট তৈরি',
        descriptionEn: 'Calculates the SHA-1 hash of the file and stores it in .git/objects/.',
        descriptionBn: 'ফাইলের কন্টেন্টের SHA-1 হ্যাশ হিসাব করে অবজেক্ট ডেটাবেসে রাখা হয়।'
      },
      {
        titleEn: 'Step 3: Add Pointer to Staging Index',
        titleBn: 'ধাপ ৩: স্টেজিং ইনডেক্সে নথিবদ্ধ',
        descriptionEn: 'Records the filename and Blob SHA in .git/index ready for commit.',
        descriptionBn: 'ফাইলের নাম এবং ব্লব হ্যাশ স্টেজিং ইনডেক্সে স্ন্যাপ করে রাখা হয়।'
      }
    ]
  },
  '2-3': {
    id: '2-3',
    command: 'git add .',
    titleEn: 'Swarm Staging of All Project Changes',
    titleBn: 'প্রোজেক্টের সমস্ত পরিবর্তন একযোগে স্টেজিং',
    visualScene: 'add-all',
    steps: [
      {
        titleEn: 'Step 1: Recursive Directory Scan',
        titleBn: 'ধাপ ১: রিকার্সিভ ডিরেক্টরি স্ক্যান',
        descriptionEn: 'Scans the entire repository tree for all modified and untracked files.',
        descriptionBn: 'পুরো রিপোজিটরির সমস্ত ফোল্ডার স্ক্যান করে সব নতুন ও পরিবর্তিত ফাইল খোঁজে।'
      },
      {
        titleEn: 'Step 2: Batch Convert Files to Blobs',
        titleBn: 'ধাপ ২: একযোগে সব ফাইলের ব্লব তৈরি',
        descriptionEn: 'Compresses all modified files into individual SHA-1 Blob objects.',
        descriptionBn: 'সমস্ত ফাইলের কন্টেন্ট কমপ্রেস করে অবজেক্ট ডেটাবেসে ব্লব বানায়।'
      },
      {
        titleEn: 'Step 3: Bulk Populate Staging Index',
        titleBn: 'ধাপ ৩: স্টেজিং এরিয়া একযোগে পূর্ণ হওয়া',
        descriptionEn: 'Fills the entire staging area at once. Everything is primed for commit!',
        descriptionBn: 'স্টেজিং এরিয়া এক মুহূর্তে সমস্ত ফাইলে লোড হয়ে কমিটের জন্য প্রস্তুত হয়!'
      }
    ]
  },
  '2-4': {
    id: '2-4',
    command: 'git commit -m "commit message"',
    titleEn: 'Permanent Commit Object & Tree Freezing',
    titleBn: 'স্থায়ী কমিট অবজেক্ট গঠন ও ট্রি স্ন্যাপশট',
    visualScene: 'commit-msg',
    steps: [
      {
        titleEn: 'Step 1: Freeze Staged Tree Snapshot',
        titleBn: 'ধাপ ১: স্টেজিং এরিয়া থেকে ট্রি অবজেক্ট তৈরি',
        descriptionEn: 'Creates a root Tree object referencing all staged Blob hashes.',
        descriptionBn: 'স্টেজিং এরিয়ার সমস্ত ব্লব মিলিয়ে একটি রুট ট্রি অবজেক্ট তৈরি করে।'
      },
      {
        titleEn: 'Step 2: Mint Commit with Parent Link',
        titleBn: 'ধাপ ২: পূর্ববর্তী কমিটের সাথে লিংক ও হ্যাশ',
        descriptionEn: 'Writes a Commit object containing author, timestamp, message, and parent SHA.',
        descriptionBn: 'লেখক, সময়, মেসেজ ও প্যারেন্ট কমিটের হ্যাশ দিয়ে নতুন কমিট অবজেক্ট বানায়।'
      },
      {
        titleEn: 'Step 3: Advance Branch & HEAD Pointer',
        titleBn: 'ধাপ ৩: ব্রাঞ্চ পয়েন্টার ও HEAD সামনে অগ্রসর',
        descriptionEn: 'Moves refs/heads/main and HEAD forward to the newly minted commit node.',
        descriptionBn: 'বর্তমান ব্রাঞ্চ পয়েন্টার এবং HEAD নতুন কমিট নোডে মসৃণভাবে এগিয়ে যায়।'
      }
    ]
  },
  '2-5': {
    id: '2-5',
    command: 'git commit -am "commit message"',
    titleEn: 'Turbo Tracked Staging & Commit Flow',
    titleBn: 'টার্বো ফ্লো: এক ধাপে স্টেজ ও কমিট',
    visualScene: 'commit-am',
    steps: [
      {
        titleEn: 'Step 1: Auto-Detect Tracked Edits',
        titleBn: 'ধাপ ১: ট্র্যাকড পরিবর্তন স্বয়ংক্রিয় শনাক্ত',
        descriptionEn: 'Detects modifications in all already-tracked files, ignoring untracked.',
        descriptionBn: 'আগে থেকে ট্র্যাকড থাকা ফাইলগুলোর পরিবর্তন স্বয়ংক্রিয়ভাবে শনাক্ত করে।'
      },
      {
        titleEn: 'Step 2: Stream Directly to Index',
        titleBn: 'ধাপ ২: সরাসরি স্টেজিং হয়ে কমিটে প্রবেশ',
        descriptionEn: 'Bypasses the manual git add command and stages changes on the fly.',
        descriptionBn: 'ম্যানুয়াল git add ছাড়াই সাথে সাথে ফাইলগুলোকে স্টেজিংয়ে নিয়ে নেয়।'
      },
      {
        titleEn: 'Step 3: Commit Milestone Created',
        titleBn: 'ধাপ ৩: দ্রুতগতির কমিট নোড তৈরি',
        descriptionEn: 'Creates the new commit node in one single developer command!',
        descriptionBn: 'এক ক্লিকেই নতুন কমিট নোড তৈরি হয়ে হিস্টোরিতে যুক্ত হয়ে যায়!'
      }
    ]
  },
  '2-6': {
    id: '2-6',
    command: 'git log --oneline --graph --all',
    titleEn: 'Terminal ASCII Commit DAG Rendering',
    titleBn: 'টার্মিনালে একলাইনের রঙিন গ্রাফ রেন্ডারিং',
    visualScene: 'log-graph',
    steps: [
      {
        titleEn: 'Step 1: Traverse Backward from HEAD',
        titleBn: 'ধাপ ১: HEAD থেকে পেছনে ট্রাভার্স',
        descriptionEn: 'Follows parent commit SHA pointers recursively across all branches.',
        descriptionBn: 'সমস্ত ব্রাঞ্চের প্যারেন্ট হ্যাশ ধরে ধরে পুরো হিস্টোরি পেছনে স্ক্যান করে।'
      },
      {
        titleEn: 'Step 2: Calculate Lane Branches (* / | \\)',
        titleBn: 'ধাপ ২: ব্রাঞ্চিং লেন হিসাব ও লাইন ড্রয়িং',
        descriptionEn: 'Determines fork and merge points, drawing ASCII branches and merge diamonds.',
        descriptionBn: 'কোন ব্রাঞ্চ কোথায় আলাদা হয়েছে বা জোড়া লেগেছে তা রঙিন লাইনে সাজায়।'
      },
      {
        titleEn: 'Step 3: Print Compact 7-Char SHA Log',
        titleBn: 'ধাপ ৩: কমপ্যাক্ট ৭ অক্ষরের হ্যাশ হিস্টোরি প্রিন্ট',
        descriptionEn: 'Outputs clean 1-line commit hashes with branch labels and commit messages.',
        descriptionBn: 'প্রতিটি কমিটের ৭ অক্ষরের হ্যাশ, ব্রাঞ্চের নাম ও মেসেজ এক লাইনে প্রিন্ট করে।'
      }
    ]
  },

  // ==========================================
  // LEVEL 3: Branching & Merging
  // ==========================================
  '3-1': {
    id: '3-1',
    command: 'git branch',
    titleEn: 'Inspecting All 41-Byte Branch References',
    titleBn: 'সমস্ত ৪১-বাইটের ব্রাঞ্চ রেফারেন্স স্ক্যান',
    visualScene: 'branch-list',
    steps: [
      {
        titleEn: 'Step 1: Read .git/refs/heads Directory',
        titleBn: 'ধাপ ১: .git/refs/heads ফোল্ডার রিড',
        descriptionEn: 'Git opens the refs directory where every branch is stored as a lightweight text file.',
        descriptionBn: 'গিট refs ফোল্ডার পড়ে যেখানে প্রতিটা ব্রাঞ্চ একটি হালকা টেক্সট ফাইল হিসেবে থাকে।'
      },
      {
        titleEn: 'Step 2: Identify Active HEAD Target',
        titleBn: 'ধাপ ২: বর্তমান সক্রিয় ব্রাঞ্চ শনাক্ত',
        descriptionEn: 'Checks where HEAD is currently attached to find the active branch.',
        descriptionBn: 'HEAD কোন ব্রাঞ্চের দিকে তাকিয়ে আছে তা দেখে বর্তমান ব্রাঞ্চ চিনে নেয়।'
      },
      {
        titleEn: 'Step 3: Highlight Active Branch with Asterisk (*)',
        titleBn: 'ধাপ ৩: সক্রিয় ব্রাঞ্চে সবুজ স্টার (*) চিহ্ন',
        descriptionEn: 'Prints all branches with green highlight and * on the active one.',
        descriptionBn: 'সব ব্রাঞ্চের তালিকা দেখিয়ে বর্তমান ব্রাঞ্চের পাশে সবুজ স্টার চিহ্ন বসায়।'
      }
    ]
  },
  '3-2': {
    id: '3-2',
    command: 'git switch -c feature (or git checkout -b)',
    titleEn: 'Branch Creation & HEAD Pointer Swing',
    titleBn: 'নতুন ব্রাঞ্চ তৈরি ও HEAD পয়েন্টারের সুইং',
    visualScene: 'switch-create',
    steps: [
      {
        titleEn: 'Step 1: Write New Branch Pointer',
        titleBn: 'ধাপ ১: নতুন ব্রাঞ্চ ফাইল তৈরি',
        descriptionEn: 'Writes current commit SHA into a new file: .git/refs/heads/feature.',
        descriptionBn: 'বর্তমান কমিটের হ্যাশ নিয়ে .git/refs/heads/feature ফাইল তৈরি করে।'
      },
      {
        titleEn: 'Step 2: Unlink HEAD from Previous Branch',
        titleBn: 'ধাপ ২: আগের ব্রাঞ্চ থেকে HEAD আনহুক',
        descriptionEn: 'HEAD safely uncouples from the main branch.',
        descriptionBn: 'HEAD আগের ব্রাঞ্চ থেকে আলতো করে বিচ্ছিন্ন হয়ে যায়।'
      },
      {
        titleEn: 'Step 3: Magnetic Snap onto New Branch',
        titleBn: 'ধাপ ৩: নতুন ব্রাঞ্চে ম্যাগনেটিক স্ন্যাপ',
        descriptionEn: 'HEAD points to the new branch. You are now working in complete isolation!',
        descriptionBn: 'HEAD নতুন ব্রাঞ্চে চুম্বকের মতো আটকে যায়। আপনার কাজ এখন সম্পূর্ণ সুরক্ষিত!'
      }
    ]
  },
  '3-3': {
    id: '3-3',
    command: 'git switch <branch_name>',
    titleEn: 'Context Switching Between Branches',
    titleBn: 'বিদ্যমান ব্রাঞ্চের মাঝে কনটেক্সট সুইচিং',
    visualScene: 'switch-existing',
    steps: [
      {
        titleEn: 'Step 1: Locate Target Branch Ref',
        titleBn: 'ধাপ ১: টার্গেট ব্রাঞ্চের লোকেশন বের করা',
        descriptionEn: 'Reads .git/refs/heads/<target> to find the commit SHA it points to.',
        descriptionBn: 'টার্গেট ব্রাঞ্চ কোন কমিটে দাঁড়িয়ে আছে তা গিট খুঁজে বের করে।'
      },
      {
        titleEn: 'Step 2: Glide HEAD to Target Commit',
        titleBn: 'ধাপ ২: HEAD পয়েন্টার উড়ে গিয়ে টার্গেটে বসা',
        descriptionEn: 'The HEAD reference swings across branch lanes to attach to the target.',
        descriptionBn: 'HEAD পয়েন্টার এক লেন থেকে উড়ে গিয়ে কাঙ্ক্ষিত ব্রাঞ্চের মাথায় বসে।'
      },
      {
        titleEn: 'Step 3: Refresh Working Directory Files',
        titleBn: 'ধাপ ৩: ফাইলগুলো টার্গেট ব্রাঞ্চের চেহারায় রূপান্তর',
        descriptionEn: 'Updates workspace files on disk to match the exact snapshot of that branch.',
        descriptionBn: 'কম্পিউটারের ফাইলগুলো ওই ব্রাঞ্চের শেষ স্ন্যাপশটের মতো বদলে যায়।'
      }
    ]
  },
  '3-4': {
    id: '3-4',
    command: 'git merge <branch_name>',
    titleEn: 'Convergence into 3-Way Merge Diamond',
    titleBn: 'দুই ব্রাঞ্চ মিলে ৩-ওয়ে মার্জ ডায়মন্ড তৈরি',
    visualScene: 'merge-branches',
    steps: [
      {
        titleEn: 'Step 1: Find Merge Base (Common Ancestor)',
        titleBn: 'ধাপ ১: কমন পূর্বপুরুষ (Merge Base) খোঁজা',
        descriptionEn: 'Traverses back to find where both branches originally split apart.',
        descriptionBn: 'উভয় ব্রাঞ্চের জন্মের মূল উৎস বা কমন পূর্বপুরুষ কমিটটি চিহ্নিত করে।'
      },
      {
        titleEn: 'Step 2: Reconcile Both Branch Changes',
        titleBn: 'ধাপ ২: উভয় ব্রাঞ্চের কোড একীভূত করা',
        descriptionEn: 'Combines file additions and edits from both branches into a unified tree.',
        descriptionBn: 'উভয় ব্রাঞ্চের নতুন কোডগুলোকে মিলিয়ে একটি সম্মিলিত ট্রি তৈরি করে।'
      },
      {
        titleEn: 'Step 3: Spawn Diamond Commit with 2 Parents',
        titleBn: 'ধাপ ৩: দুই-প্যারেন্ট বিশিষ্ট ডায়মন্ড নোড জন্ম নেওয়া',
        descriptionEn: 'Creates a special merge commit node connected to both branch tips!',
        descriptionBn: 'একটি বিশেষ মার্জ নোড তৈরি হয় যার দুটি অ্যারো উভয় ব্রাঞ্চের মাথায় যুক্ত থাকে।'
      }
    ]
  },
  '3-5': {
    id: '3-5',
    command: 'git branch -d <branch_name>',
    titleEn: 'Safe Deletion of Merged Branch Pointer',
    titleBn: 'মার্জ হওয়া ব্রাঞ্চের নিরাপদ অপসারণ',
    visualScene: 'branch-delete',
    steps: [
      {
        titleEn: 'Step 1: Safety Check for Unmerged Work',
        titleBn: 'ধাপ ১: আন-মার্জড কোড আছে কিনা নিরাপত্তা চেক',
        descriptionEn: 'Git verifies that all commits on this branch are already safely in main.',
        descriptionBn: 'গিট নিশ্চিত করে যে এই ব্রাঞ্চের সব কোড নিরাপদে মেইনে ঢুকেছে।'
      },
      {
        titleEn: 'Step 2: Delete 41-Byte Pointer File',
        titleBn: 'ধাপ ২: ৪১-বাইটের পয়েন্টার ফাইল ডিলিট',
        descriptionEn: 'Removes the text file from .git/refs/heads/<name>. Commits remain intact!',
        descriptionBn: '.git/refs/heads ফোল্ডার থেকে ফাইলটি ডিলিট হয়, কিন্তু কমিটগুলো সুরক্ষিত থাকে।'
      },
      {
        titleEn: 'Step 3: Pristine Branch Registry',
        titleBn: 'ধাপ ৩: ঝকঝকে পরিচ্ছন্ন ব্রাঞ্চ তালিকা',
        descriptionEn: 'The branch label dissolves, keeping your repository clean and organized.',
        descriptionBn: 'অপ্রয়োজনীয় ব্রাঞ্চের ট্যাগ মিলিয়ে যায় এবং তালিকা পরিচ্ছন্ন থাকে।'
      }
    ]
  },
  '3-6': {
    id: '3-6',
    command: 'git branch -m <old_name> <new_name>',
    titleEn: 'Atomic Branch Renaming Billboard Flip',
    titleBn: 'বিলবোর্ড ফ্লিপ: ব্রাঞ্চের নাম পরিবর্তন',
    visualScene: 'branch-rename',
    steps: [
      {
        titleEn: 'Step 1: Check Target Name Availability',
        titleBn: 'ধাপ ১: নতুন নামটি ফাঁকা আছে কিনা চেক',
        descriptionEn: 'Verifies no other branch already uses the target name.',
        descriptionBn: 'নতুন নামটি আগে থেকে অন্য কেউ ব্যবহার করছে কিনা দেখে নেয়।'
      },
      {
        titleEn: 'Step 2: Rename File in .git/refs/heads',
        titleBn: 'ধাপ ২: পয়েন্টার ফাইলের নাম রিনেম',
        descriptionEn: 'Renames the underlying ref file without touching any commit objects.',
        descriptionBn: 'কমিটের কোনো ক্ষতি না করে পয়েন্টার ফাইলের নাম বদলে দেওয়া হয়।'
      },
      {
        titleEn: 'Step 3: Update HEAD Symref',
        titleBn: 'ধাপ ৩: HEAD পয়েন্টার নতুন নামে আপডেট',
        descriptionEn: 'If currently checked out, HEAD points to the new branch name immediately.',
        descriptionBn: 'বর্তমান ব্রাঞ্চে থাকলে HEAD সাথে সাথে নতুন নামে পয়েন্ট করে।'
      }
    ]
  },

  // ==========================================
  // LEVEL 4: Remote & Collaboration
  // ==========================================
  '4-1': {
    id: '4-1',
    command: 'git remote add origin <url>',
    titleEn: 'Plugging Cable to GitHub Cloud Server',
    titleBn: 'গিটহাব ক্লাউড সার্ভারের সাথে ক্যাবল প্লাগইন',
    visualScene: 'remote-add',
    steps: [
      {
        titleEn: 'Step 1: Register Shorthand Name "origin"',
        titleBn: 'ধাপ ১: origin শর্টহ্যান্ড নাম রেজিস্টার',
        descriptionEn: 'Maps the nickname "origin" to the full GitHub https/ssh repository URL.',
        descriptionBn: 'গিটহাবের পুরো ইউআরএলের জন্য "origin" নামে একটি শর্টকাট তৈরি হয়।'
      },
      {
        titleEn: 'Step 2: Write to .git/config',
        titleBn: 'ধাপ ২: লোকাল .git/config ফাইলে সেভ',
        descriptionEn: 'Appends [remote "origin"] configuration into your local repository.',
        descriptionBn: 'লোকাল কনফিগে রিমোট অরিজিনের ইউআরএল স্থায়ীভাবে লিখে নেওয়া হয়।'
      },
      {
        titleEn: 'Step 3: Cloud Sync Bridge Ready',
        titleBn: 'ধাপ ৩: ক্লাউড সিঙ্ক ব্রিজ প্রস্তুত',
        descriptionEn: 'Your computer is now connected and ready to push and pull code!',
        descriptionBn: 'আপনার লোকাল মেশিন এখন ক্লাউডে কোড পাঠাতে বা নামাতে সম্পূর্ণ তৈরি!'
      }
    ]
  },
  '4-2': {
    id: '4-2',
    command: 'git push -u origin <branch_name>',
    titleEn: 'First Push Rocket & Upstream Tethering',
    titleBn: 'প্রথম পুশ রকেট ও আপস্ট্রিম ক্যাবল তৈরি',
    visualScene: 'push-upstream',
    steps: [
      {
        titleEn: 'Step 1: Package Local Commits',
        titleBn: 'ধাপ ১: লোকাল কমিটগুলো রকেটে লোড করা',
        descriptionEn: 'Bundles new commits, trees, and blobs into an upload packfile.',
        descriptionBn: 'লোকাল কমিট ও ফাইলগুলোকে আপলোড প্যাকেটে লোড করা হয়।'
      },
      {
        titleEn: 'Step 2: Launch Rocket to GitHub Cloud',
        titleBn: 'ধাপ ২: গিটহাব ক্লাউডে রকেটের উড্ডয়ন',
        descriptionEn: 'Transfers the data packets over HTTPS to GitHub\'s cloud servers.',
        descriptionBn: 'ইন্টারনেটের মাধ্যমে ডেটা প্যাকেটগুলো গিটহাবের সার্ভারে উড়ে যায়।'
      },
      {
        titleEn: 'Step 3: Anchor Upstream Tracking Tether',
        titleBn: 'ধাপ ৩: আপস্ট্রিম ট্র্যাকিং ক্যাবল যুক্ত হওয়া',
        descriptionEn: 'The -u flag creates a permanent tracking bridge: local main <-> origin/main.',
        descriptionBn: '-u ফ্ল্যাগ লোকাল ব্রাঞ্চ এবং ক্লাউড ব্রাঞ্চের মধ্যে সরাসরি সংযোগ স্থাপন করে।'
      }
    ]
  },
  '4-3': {
    id: '4-3',
    command: 'git push',
    titleEn: 'Rapid One-Click Cloud Sync Push',
    titleBn: 'এক ক্লিকে ক্লাউডে নতুন কোড পুশ',
    visualScene: 'push-sync',
    steps: [
      {
        titleEn: 'Step 1: Read Upstream Tracking Ref',
        titleBn: 'ধাপ ১: আপস্ট্রিম ট্র্যাকিং রিড করা',
        descriptionEn: 'Git looks up where this branch was previously tethered (origin/main).',
        descriptionBn: 'আগে সেট করা ট্র্যাকিং দেখে গিট বুঝে নেয় কোন ক্লাউড ব্রাঞ্চে পাঠাতে হবে।'
      },
      {
        titleEn: 'Step 2: Stream Delta Changes',
        titleBn: 'ধাপ ২: শুধুমাত্র নতুন কমিটগুলো পাঠানো',
        descriptionEn: 'Transfers only the new commits that GitHub doesn\'t have yet.',
        descriptionBn: 'গিটহাবে এখনো জমা না হওয়া শুধু নতুন কমিটগুলো ট্রান্সফার করে।'
      },
      {
        titleEn: 'Step 3: Remote origin/main Advances',
        titleBn: 'ধাপ ৩: ক্লাউডে origin/main পয়েন্টার আপডেট',
        descriptionEn: 'GitHub advances the remote branch tip. All your teammates can now pull it!',
        descriptionBn: 'গিটহাবে রিমোট পয়েন্টার এগিয়ে যায় এবং কোড সুরক্ষিত হয়।'
      }
    ]
  },
  '4-4': {
    id: '4-4',
    command: 'git fetch',
    titleEn: 'Safe Remote Download (Zero Local Disruption)',
    titleBn: 'নিরাপদ রিমোট ডাউনলোড: বর্তমান কোড স্পর্শ না করে',
    visualScene: 'fetch-metadata',
    steps: [
      {
        titleEn: 'Step 1: Query GitHub Remote Server',
        titleBn: 'ধাপ ১: গিটহাব সার্ভারে নতুন কী জমা হলো খোঁজা',
        descriptionEn: 'Asks GitHub what commits and branches teammates have pushed recently.',
        descriptionBn: 'গিটহাবের কাছে জানতে চায় টিমমেটরা নতুন কী কাজ পুশ করেছে।'
      },
      {
        titleEn: 'Step 2: Download to Hidden Remote Tracking Refs',
        titleBn: 'ধাপ ২: হিডেন origin/main ট্র্যাকিংয়ে সেভ',
        descriptionEn: 'Saves objects into .git/refs/remotes/origin/ without touching your work.',
        descriptionBn: 'আপনার বর্তমান কোডের কোনো ক্ষতি না করে লোকাল ট্র্যাকিং ফোল্ডারে রাখে।'
      },
      {
        titleEn: 'Step 3: Ready for Safe Inspection',
        titleBn: 'ধাপ ৩: নিরাপদ পর্যালোচনার জন্য প্রস্তুত',
        descriptionEn: 'You can now compare differences before deciding whether to merge!',
        descriptionBn: 'মার্জ করার আগেই আপনি দেখে নিতে পারবেন টিম কী পরিবর্তন এনেছে।'
      }
    ]
  },
  '4-5': {
    id: '4-5',
    command: 'git pull',
    titleEn: 'Two-Step Power Combo: Fetch + Auto-Merge',
    titleBn: 'দুই ধাপের পাওয়ার কম্বো: ফেচ ও অটো-মার্জ',
    visualScene: 'pull-merge',
    steps: [
      {
        titleEn: 'Step 1: Silent git fetch',
        titleBn: 'ধাপ ১: ব্যাকগ্রাউন্ডে git fetch',
        descriptionEn: 'Downloads the latest commits from the remote GitHub repository.',
        descriptionBn: 'রিমোট রিপোজিটরি থেকে নতুন সমস্ত কমিট ডাউনলোড করে আনে।'
      },
      {
        titleEn: 'Step 2: Automatic git merge',
        titleBn: 'ধাপ ২: স্বয়ংক্রিয় git merge',
        descriptionEn: 'Merges origin/main directly into your checked out local branch.',
        descriptionBn: 'ডাউনলোড হওয়া কোড সরাসরি আপনার লোকাল ব্রাঞ্চে মার্জ করে দেয়।'
      },
      {
        titleEn: 'Step 3: Local Workspace 100% Up to Date',
        titleBn: 'ধাপ ৩: লোকাল কোড সম্পূর্ণ আপ-টু-ডেট',
        descriptionEn: 'Your files refresh to include all latest collaborative changes.',
        descriptionBn: 'আপনার সমস্ত ফাইল টিমের লেটেস্ট কাজের সাথে মিলিয়ে আপডেট হয়ে যায়।'
      }
    ]
  },
  '4-6': {
    id: '4-6',
    command: 'git remote prune origin',
    titleEn: 'Pruning Scissors Trimming Dead Tracking Branches',
    titleBn: 'ছাঁটাই কাঁচি: ডিলিট হওয়া রিমোট ব্রাঞ্চ পরিষ্কার',
    visualScene: 'remote-prune',
    steps: [
      {
        titleEn: 'Step 1: Compare Local vs Cloud Branch List',
        titleBn: 'ধাপ ১: লোকাল বনাম ক্লাউড ব্রাঞ্চ তালিকা তুলনা',
        descriptionEn: 'Identifies branches that were deleted on GitHub after PR merges.',
        descriptionBn: 'গিটহাবে পিআর মার্জ হওয়ার পর মুছে ফেলা ব্রাঞ্চগুলো চিহ্নিত করে।'
      },
      {
        titleEn: 'Step 2: Snip Phantom Tracking Pointers',
        titleBn: 'ধাপ ২: মৃত ট্র্যাকিং পয়েন্টার ছেঁটে ফেলা',
        descriptionEn: 'Scissors cut away stale pointers in .git/refs/remotes/origin/.',
        descriptionBn: 'কাঁচি দিয়ে অপ্রয়োজনীয় পুরানো রিমোট রেফারেন্সগুলো কেটে বাদ দেওয়া হয়।'
      },
      {
        titleEn: 'Step 3: Clean, Ghost-Free Branch Registry',
        titleBn: 'ধাপ ৩: পরিচ্ছন্ন এবং ভূতহীন ব্রাঞ্চ রেজিস্ট্রি',
        descriptionEn: 'Your remote branch tracking registry is now 100% synchronized and tidy.',
        descriptionBn: 'আপনার রিমোট ব্রাঞ্চ ট্র্যাকিং তালিকা একদম ঝকঝকে ও পরিষ্কার।'
      }
    ]
  },

  // ==========================================
  // LEVEL 5: Undoing & Stashing
  // ==========================================
  '5-1': {
    id: '5-1',
    command: 'git restore <file_name>',
    titleEn: 'Magic Eraser: Reverting File Edits to HEAD',
    titleBn: 'ম্যাজিক ইরেজার: কোডের ভুল মুছে শেষ কমিটে ফেরা',
    visualScene: 'restore-file',
    steps: [
      {
        titleEn: 'Step 1: Read Last Committed Snapshot',
        titleBn: 'ধাপ ১: শেষ কমিটের স্ন্যাপশট রিড',
        descriptionEn: 'Git extracts the clean, uncorrupted version of the file from HEAD commit.',
        descriptionBn: 'গিট শেষ কমিট থেকে ফাইলটির নির্ভুল আসল সংস্করণ বের করে।'
      },
      {
        titleEn: 'Step 2: Erase Dirty Unstaged Lines',
        titleBn: 'ধাপ ২: ভুল কোডের লাইনগুলো মুছে ফেলা',
        descriptionEn: 'Overwrites your working tree file, throwing away accidental edits.',
        descriptionBn: 'ওয়ার্কিং ডিরেক্টরির ভুল পরিবর্তনগুলো ইরেজার দিয়ে মুছে দেয়।'
      },
      {
        titleEn: 'Step 3: Restored to Pristine State',
        titleBn: 'ধাপ ৩: ফাইল পূর্বের নির্ভেজাল অবস্থায় পুনরুদ্ধার',
        descriptionEn: 'The file matches HEAD perfectly once again. No messy edits left!',
        descriptionBn: 'ফাইলটি আবার শেষ কমিটের মতো একদম ফ্রেশ অবস্থায় ফিরে আসে!'
      }
    ]
  },
  '5-2': {
    id: '5-2',
    command: 'git restore --staged <file_name>',
    titleEn: 'Safe Extraction from Staging Area to Working Tree',
    titleBn: 'স্টেজিং এরিয়া থেকে নিরাপদে আনস্টেজ করা',
    visualScene: 'restore-staged',
    steps: [
      {
        titleEn: 'Step 1: Identify Staged File in Index',
        titleBn: 'ধাপ ১: স্টেজিং ইনডেক্সে ফাইল শনাক্তকরণ',
        descriptionEn: 'Locates the file that was mistakenly added to the staging index.',
        descriptionBn: 'ভুল করে git add করা ফাইলটিকে স্টেজিং ইনডেক্সে খুঁজে বের করে।'
      },
      {
        titleEn: 'Step 2: Pull Out of Staging Box',
        titleBn: 'ধাপ ২: স্টেজিং বক্স থেকে বের করে আনা',
        descriptionEn: 'Removes the entry from the index while keeping your code intact on disk.',
        descriptionBn: 'কোডের কোনো লাইন নষ্ট না করে ফাইলটিকে স্টেজিং বক্সের বাইরে আনে।'
      },
      {
        titleEn: 'Step 3: Status Turns from Green to Red',
        titleBn: 'ধাপ ৩: স্ট্যাটাস সবুজ থেকে নিরাপদে লাল হওয়া',
        descriptionEn: 'The file is now safely unstaged in your working directory, not ready to commit.',
        descriptionBn: 'ফাইলটি এখন আনস্টেজ অবস্থায় থাকবে, পরবর্তী কমিটে ভুল করে ঢুকবে না।'
      }
    ]
  },
  '5-3': {
    id: '5-3',
    command: 'git stash',
    titleEn: 'Stash Chest: Swallowing Dirty Work',
    titleBn: 'গোপন স্ট্যাশ সিন্দুক: অসম্পূর্ণ কোড লুকিয়ে রাখা',
    visualScene: 'stash-save',
    steps: [
      {
        titleEn: 'Step 1: Stash Chest Pops Open',
        titleBn: 'ধাপ ১: স্ট্যাশ সিন্দুক খুলে যাওয়া',
        descriptionEn: 'Git opens a hidden storage stack at refs/stash.',
        descriptionBn: 'গিট refs/stash-এ একটি গোপন স্টোরেজ বাক্স খোলে।'
      },
      {
        titleEn: 'Step 2: Vacuum Uncommitted Changes Inside',
        titleBn: 'ধাপ ২: সমস্ত অসম্পূর্ণ কাজ ভেতরে টেনে নেওয়া',
        descriptionEn: 'All dirty modifications from working directory and staging area are sucked in.',
        descriptionBn: 'ওয়ার্কিং ও স্টেজিং এরিয়ার সব অসম্পূর্ণ কোড সিন্দুকে টেনে নেওয়া হয়।'
      },
      {
        titleEn: 'Step 3: Snap Shut with Golden Lock',
        titleBn: 'ধাপ ৩: সিন্দুক লক ও ওয়ার্কস্পেস সম্পূর্ণ ক্লিন',
        descriptionEn: 'The chest locks with stash@{0} label. Your workspace is 100% clean to switch branches!',
        descriptionBn: 'বাক্স লক হয়ে যায় এবং আপনার ওয়ার্কস্পেস জরুরি কাজের জন্য একদম ক্লিন হয়ে যায়!'
      }
    ]
  },
  '5-4': {
    id: '5-4',
    command: 'git stash pop',
    titleEn: 'Stash Chest Opening & Restoring Code',
    titleBn: 'স্ট্যাশ সিন্দুক খোলা ও কোড ফিরিয়ে আনা',
    visualScene: 'stash-pop',
    steps: [
      {
        titleEn: 'Step 1: Unlock Top Stash Entry',
        titleBn: 'ধাপ ১: ওপরের স্ট্যাশ এন্ট্রি আনলক করা',
        descriptionEn: 'Accesses the most recent saved snapshot at stash@{0}.',
        descriptionBn: 'সিন্দুকে জমিয়ে রাখা সর্বশেষ কোডের স্ন্যাপশটটি বের করে আনে।'
      },
      {
        titleEn: 'Step 2: Eject Changes Back onto Workspace',
        titleBn: 'ধাপ ২: কোড আবার ওয়ার্কস্পেসে ছড়িয়ে পড়া',
        descriptionEn: 'Reapplies all saved file edits directly back into your working directory.',
        descriptionBn: 'লুকিয়ে রাখা পরিবর্তনগুলো আবার ফাইলের সঠিক লাইনে বসে যায়।'
      },
      {
        titleEn: 'Step 3: Vaporize Stash Entry',
        titleBn: 'ধাপ ৩: স্ট্যাশ মেমোরি থেকে মুছে ফেলা',
        descriptionEn: 'Drops stash@{0} from the chest stack so memory stays clean.',
        descriptionBn: 'কাজ ফিরে আসায় সিন্দুক থেকে ওই রেকর্ডটি মুছে ফেলা হয়।'
      }
    ]
  },
  '5-5': {
    id: '5-5',
    command: 'git clean -fd',
    titleEn: 'Vacuum Broom Sweeping Untracked Junk',
    titleBn: 'ভ্যাকুয়াম সুইপ: আনট্র্যাকড আবর্জনা চিরতরে পরিষ্কার',
    visualScene: 'clean-force',
    steps: [
      {
        titleEn: 'Step 1: Target Untracked Files & Folders',
        titleBn: 'ধাপ ১: ট্র্যাকিং ছাড়া আবর্জনা ফাইল চিহ্নিত',
        descriptionEn: 'Identifies temporary test outputs, logs, and scratch directories.',
        descriptionBn: 'লগ ফাইল, টেস্ট ফাইল বা অপ্রয়োজনীয় ডিরেক্টরিগুলো চিহ্নিত করে।'
      },
      {
        titleEn: 'Step 2: High-Power Industrial Vacuum',
        titleBn: 'ধাপ ২: ভ্যাকুয়াম দিয়ে এক টানে অপসারন',
        descriptionEn: 'Permanently deletes all unversioned clutter (-f force, -d directories).',
        descriptionBn: 'এক টানে সমস্ত আনট্র্যাকড ফাইল ও ফোল্ডার ডিলিট করে দেয়।'
      },
      {
        titleEn: 'Step 3: Zero Ghost Files Remaining',
        titleBn: 'ধাপ ৩: কোনো আবর্জনা অবশিষ্ট না থাকা',
        descriptionEn: 'Only tracked Git files remain on disk. Directory is pristine!',
        descriptionBn: 'শুধুমাত্র আসল গিট ফাইলগুলো থাকবে, বাকি সব আবর্জনা পরিষ্কার!'
      }
    ]
  },
  '5-6': {
    id: '5-6',
    command: 'git reset --soft HEAD~1',
    titleEn: 'Soft Rewind: Keep Code Staged, Undo Commit',
    titleBn: 'সফট রিসেট: কোড স্টেজিংয়ে রেখে কমিট আনডু',
    visualScene: 'reset-soft',
    steps: [
      {
        titleEn: 'Step 1: Target Previous Commit HEAD~1',
        titleBn: 'ধাপ ১: পেছনের কমিট HEAD~1 চিহ্নিত',
        descriptionEn: 'Git looks up the parent commit of your current commit.',
        descriptionBn: 'গিট বর্তমান কমিটের পেছনের প্যারেন্ট কমিটটি চিনে নেয়।'
      },
      {
        titleEn: 'Step 2: Rewind Branch & HEAD Pointer Backwards',
        titleBn: 'ধাপ ২: HEAD পয়েন্টার এক ধাপ পিছিয়ে যাওয়া',
        descriptionEn: 'The branch pointer moves back one node in history.',
        descriptionBn: 'ব্রাঞ্চ পয়েন্টার ও HEAD এক ধাপ পিছিয়ে পেছনের নোডে চলে যায়।'
      },
      {
        titleEn: 'Step 3: Code Preserved in Green Staging Area',
        titleBn: 'ধাপ ৩: সব কোড সবুজ স্টেজিং এরিয়ায় অক্ষত',
        descriptionEn: 'All file changes remain safely staged, ready to fix and recommit!',
        descriptionBn: 'কোডের কোনো লাইন নষ্ট না হয়ে স্টেজিংয়ে থাকে যাতে সংশোধন করে আবার কমিট দেওয়া যায়।'
      }
    ]
  },
  '5-7': {
    id: '5-7',
    command: 'git reset --hard HEAD~1',
    titleEn: 'Hard Reset: Incinerating Commit & Work',
    titleBn: 'হার্ড রিসেট: শেষ কমিট ও কোড সম্পূর্ণ ধ্বংস',
    visualScene: 'reset-hard',
    steps: [
      {
        titleEn: 'Step 1: Rewind HEAD Timeline Backwards',
        titleBn: 'ধাপ ১: টাইমলাইনে HEAD পিছিয়ে নেওয়া',
        descriptionEn: 'HEAD moves back to the previous commit node.',
        descriptionBn: 'HEAD টাইমলাইনে এক ধাপ পিছিয়ে আগের কমিটে ফিরে যায়।'
      },
      {
        titleEn: 'Step 2: Incinerate Latest Commit & Files',
        titleBn: 'ধাপ ২: শেষ কমিট এবং তার সমস্ত কোড ধ্বংস',
        descriptionEn: 'Discards all staged changes and overwrites working tree files.',
        descriptionBn: 'স্টেজিং এবং ওয়ার্কিং ডিরেক্টরির সমস্ত পরিবর্তন সম্পূর্ণ মুছে ফেলে।'
      },
      {
        titleEn: 'Step 3: Restored Perfectly to Past Commit',
        titleBn: 'ধাপ ৩: নিখুঁতভাবে অতীতের ভালো অবস্থায় ফেরা',
        descriptionEn: 'Every trace of the undone commit is wiped from your workspace.',
        descriptionBn: 'বাতিল হওয়া কমিটের কোনো চিহ্ন আর থাকে না, প্রোজেক্ট আগের ভালো অবস্থায় ফিরে যায়।'
      }
    ]
  },
  '5-8': {
    id: '5-8',
    command: 'git revert <commit_hash>',
    titleEn: 'Safe Public Reversion: Creating Inverse Commit',
    titleBn: 'নিরাপদ রিভার্ট: বিপরীত কোড দিয়ে নতুন কমিট',
    visualScene: 'revert-commit',
    steps: [
      {
        titleEn: 'Step 1: Read Target Commit Inversion',
        titleBn: 'ধাপ ১: টার্গেট কমিটের বিপরীত পরিবর্তন তৈরি',
        descriptionEn: 'Inverts the target commit: additions become deletions, deletions become additions.',
        descriptionBn: 'টার্গেট কমিটের ঠিক উল্টো কাজ করে (যোগ করা লাইন বিয়োগ, বিয়োগ করা লাইন যোগ)।'
      },
      {
        titleEn: 'Step 2: Create Brand-New Forward Commit',
        titleBn: 'ধাপ ২: সামনে এগিয়ে নতুন নিরাপদ কমিট তৈরি',
        descriptionEn: 'Never rewrites shared history! A new commit "Revert..." is born.',
        descriptionBn: 'হিস্টোরি না ভেঙে সামনে এগিয়ে একটি নতুন নিরাপদ রিভার্ট কমিট তৈরি হয়।'
      },
      {
        titleEn: 'Step 3: Safe to Push to GitHub Production',
        titleBn: 'ধাপ ৩: গিটহাবে পুশ করার জন্য ১০০% নিরাপদ',
        descriptionEn: 'Teammates can cleanly pull this revert without any git conflict errors.',
        descriptionBn: 'টিমমেটরা কোনো ঝামেলা বা কনফ্লিক্ট ছাড়া সহজেই এই রিভার্ট কোড পুল করতে পারে।'
      }
    ]
  },

  // ==========================================
  // LEVEL 6: Inspection & Debugging
  // ==========================================
  '6-1': {
    id: '6-1',
    command: 'git diff',
    titleEn: 'Unstaged Line-by-Line Code Comparator',
    titleBn: 'আন-স্টেজড কোডের লাইন-বাই-লাইন তফাত বিশ্লেষণ',
    visualScene: 'diff-working',
    steps: [
      {
        titleEn: 'Step 1: Scan Working Directory File Lines',
        titleBn: 'ধাপ ১: বর্তমান ফাইলের প্রতিটা লাইন স্ক্যান',
        descriptionEn: 'Reads what you have typed in your editor right now.',
        descriptionBn: 'আপনি এই মুহূর্তে ফাইলে যে কোড লিখেছেন তা লাইন বাই লাইন পড়ে।'
      },
      {
        titleEn: 'Step 2: Compare Against Staging Index',
        titleBn: 'ধাপ ২: স্টেজিং ইনডেক্সের সাথে তফাত বিচার',
        descriptionEn: 'Calculates the exact lines added, edited, or removed.',
        descriptionBn: 'কোন লাইন যুক্ত হলো আর কোন লাইন ডিলিট হলো তা হিসাব করে।'
      },
      {
        titleEn: 'Step 3: Render Red (-) and Green (+) Diff',
        titleBn: 'ধাপ ৩: লাল (-) ও সবুজ (+) রঙের স্পষ্ট ডিফ',
        descriptionEn: 'Highlights additions in green and deletions in red for instant self-review.',
        descriptionBn: 'নতুন লাইন সবুজ এবং মুছে ফেলা লাইন লাল রঙে সুন্দরভাবে ফুটিয়ে তোলে।'
      }
    ]
  },
  '6-2': {
    id: '6-2',
    command: 'git diff --staged',
    titleEn: 'Staged Payload Inspection Magnifier',
    titleBn: 'স্টেজিং পে-লোড অডিট: কমিটের পূর্বমুহূর্তে',
    visualScene: 'diff-staged',
    steps: [
      {
        titleEn: 'Step 1: Read Staged Blobs in Index',
        titleBn: 'ধাপ ১: স্টেজিং এরিয়ার ব্লবগুলো রিড করা',
        descriptionEn: 'Inspects the exact files queued up in .git/index.',
        descriptionBn: 'স্টেজিং ইনডেক্সে লাইন ধরে দাঁড়ানো ফাইলগুলোকে যাচাই করে।'
      },
      {
        titleEn: 'Step 2: Compare Against HEAD Commit',
        titleBn: 'ধাপ ২: শেষ কমিটের সাথে চূড়ান্ত তুলনা',
        descriptionEn: 'Compares the staged payload against the last permanent commit on branch.',
        descriptionBn: 'শেষ কমিট থেকে কী কী নতুন বিষয় কমিট হতে যাচ্ছে তা মিলিয়ে দেখে।'
      },
      {
        titleEn: 'Step 3: Final Verification Before git commit',
        titleBn: 'ধাপ ৩: কমিটের আগে ফাইনাল কোড ভেরিফিকেশন',
        descriptionEn: 'Confirms that only intended files and lines will enter the next commit milestone.',
        descriptionBn: 'নিশ্চিত করে যে কোনো ভুল বা অতিরিক্ত ফাইল বাদ রেখে সঠিক কোড কমিট হচ্ছে।'
      }
    ]
  },
  '6-3': {
    id: '6-3',
    command: 'git blame <file_name>',
    titleEn: 'Forensic Line Authorship & Commit Tracking',
    titleBn: 'ফরেনসিক অডিট: কে কখন কোন লাইন লিখেছিল',
    visualScene: 'blame-track',
    steps: [
      {
        titleEn: 'Step 1: Unroll File History Commit by Commit',
        titleBn: 'ধাপ ১: ফাইলের পেছনের সমস্ত কমিট উন্মোচন',
        descriptionEn: 'Git walks backwards through history to find when each line was touched.',
        descriptionBn: 'গিট পেছনের দিকে গিয়ে দেখে কোন তারিখে কোন কমিটে লাইনটি লেখা হয়েছিল।'
      },
      {
        titleEn: 'Step 2: Attach Author Stamp to Every Single Line',
        titleBn: 'ধাপ ২: প্রতিটি লাইনের পাশে লেখকের সিলমোহর',
        descriptionEn: 'Stamps author name, timestamp, and commit SHA next to line numbers.',
        descriptionBn: 'লাইন নম্বরের পাশে লেখকের নাম, তারিখ এবং কমিট হ্যাশ বসিয়ে দেয়।'
      },
      {
        titleEn: 'Step 3: Total Codebase Accountability',
        titleBn: 'ধাপ ৩: কোডবেসের ১০০% স্বচ্ছতা ও জবাবদিহিতা',
        descriptionEn: 'Never wonder who wrote confusing code again. You know exactly who to ask!',
        descriptionBn: 'আর কোনো কোড নিয়ে সন্দেহ নয়—সরাসরি মূল লেখকের সাথে কথা বলা সম্ভব!'
      }
    ]
  },
  '6-4': {
    id: '6-4',
    command: 'git bisect start',
    titleEn: 'Binary Search Caliper Hunting Regressions',
    titleBn: 'বাইনারি সার্চ মেকানিজম: বাগ সৃষ্টিকারী কমিট শিকার',
    visualScene: 'bisect-binary',
    steps: [
      {
        titleEn: 'Step 1: Mark Good and Bad Range',
        titleBn: 'ধাপ ১: ভালো এবং খারাপ কমিটের সীমানা নির্ধারণ',
        descriptionEn: 'You tell Git a known good commit and the current broken bad commit.',
        descriptionBn: 'আপনি গিটকে বলে দেন কোন কমিটে অ্যাপ ভালো ছিল আর কোথায় এসে ভেঙেছে।'
      },
      {
        titleEn: 'Step 2: Binary Search Caliper Halves History',
        titleBn: 'ধাপ ২: বাইনারি সার্চ মাঝখান দিয়ে দুই ভাগ করে',
        descriptionEn: 'Git checks out the exact middle commit in O(log N) efficiency.',
        descriptionBn: 'গিট শত শত কমিট বাদ দিয়ে ঠিক মাঝখানের কমিটে জাম্প করে টেস্ট করতে বলে।'
      },
      {
        titleEn: 'Step 3: Pinpoint the Exact Culprit Commit',
        titleBn: 'ধাপ ৩: মূল অপরাধী কমিটটিকে হাতেনাতে ধরা',
        descriptionEn: 'In just a few steps, Git identifies the exact commit SHA that introduced the bug!',
        descriptionBn: 'মাত্র কয়েকটি স্টেপেই গিট বলে দেয় কোন কমিটটিতে বাগ ঢুকেছিল!'
      }
    ]
  },

  // ==========================================
  // LEVEL 7: Pro-level Git
  // ==========================================
  '7-1': {
    id: '7-1',
    command: 'git commit --amend -m "updated message"',
    titleEn: 'Opening Last Commit Capsule to Insert Fixes',
    titleBn: 'শেষ কমিট ক্যাপসুল খুলে বাদ পড়া ফাইল যুক্ত করা',
    visualScene: 'commit-amend',
    steps: [
      {
        titleEn: 'Step 1: Open Previous Commit Capsule',
        titleBn: 'ধাপ ১: আগের কমিট ক্যাপসুলটি আলতো করে খোলা',
        descriptionEn: 'Accesses the current tip commit without creating an extra commit node.',
        descriptionBn: 'নতুন নোড না বানিয়ে আগের কমিট ক্যাপসুলটিকে ওপেন করা হয়।'
      },
      {
        titleEn: 'Step 2: Inject Staged Files & Reword Message',
        titleBn: 'ধাপ ২: নতুন ফাইল ঢুকিয়ে মেসেজ শুধরে নেওয়া',
        descriptionEn: 'Inserts forgotten files and updates the commit message text.',
        descriptionBn: 'ভুলে বাদ পড়া ফাইল ভেতরে ঢুকিয়ে দিয়ে কমিটের বানান ঠিক করা হয়।'
      },
      {
        titleEn: 'Step 3: Reseal Capsule with New SHA',
        titleBn: 'ধাপ ৩: ক্যাপসুল নতুন হ্যাশ দিয়ে পুনরায় সিল',
        descriptionEn: 'Reseals the commit in place with a fresh timestamp and SHA-1 hash.',
        descriptionBn: 'ক্যাপসুলটি আবার সিল হয়ে যায়—হিস্টোরি দেখতে একদম পরিচ্ছন্ন থাকে!'
      }
    ]
  },
  '7-2': {
    id: '7-2',
    command: 'git rebase -i HEAD~<number>',
    titleEn: 'Interactive Surgery Table: Squashing Commits',
    titleBn: 'অপারেশন থিয়েটার: ২০টি কমিট স্কোয়াশ করে ১টিতে রূপান্তর',
    visualScene: 'rebase-interactive',
    steps: [
      {
        titleEn: 'Step 1: Lay Commits on Surgery Table',
        titleBn: 'ধাপ ১: কমিটগুলোকে অপারেশন টেবিলে সাজানো',
        descriptionEn: 'Lists the recent commits in an interactive script with actions: pick, squash, reword.',
        descriptionBn: 'সাম্প্রতিক কমিটগুলোকে টেবিলে সাজিয়ে কমান্ড দেওয়া হয়: pick, squash, reword।'
      },
      {
        titleEn: 'Step 2: Squash Messy Commits Together',
        titleBn: 'ধাপ ২: একাধিক ছোট কমিট একসাথে গলিয়ে এক করা',
        descriptionEn: 'Combines multiple tiny commits into one clean, unified cohesive feature commit.',
        descriptionBn: 'এলোমেলো ছোট ছোট কমিটকে একসাথে মিশিয়ে একটি মজবুত কমিটে রূপান্তর করা হয়।'
      },
      {
        titleEn: 'Step 3: Professional Pristine Git History',
        titleBn: 'ধাপ ৩: প্রফেশনাল ও সুসংগঠিত গিট হিস্টোরি',
        descriptionEn: 'Your pull request now presents a beautiful, senior-developer grade history!',
        descriptionBn: 'আপনার পিআর হিস্টোরি দেখতে এখন একদম সিনিয়র ইঞ্জিনিয়ারদের মতো নিখুঁত!'
      }
    ]
  },
  '7-3': {
    id: '7-3',
    command: 'git cherry-pick <commit_hash>',
    titleEn: 'Robotic Crane Transplanting Isolated Commit',
    titleBn: 'রোবোটিক ক্রেন: নির্দিষ্ট ১টি কমিট তুলে আনা',
    visualScene: 'cherry-pick',
    steps: [
      {
        titleEn: 'Step 1: Crane Targets Specific Commit SHA',
        titleBn: 'ধাপ ১: ক্রেন দিয়ে নির্দিষ্ট কমিট টার্গেট করা',
        descriptionEn: 'Pins the exact bugfix commit on another branch without touching the rest.',
        descriptionBn: 'অন্য ব্রাঞ্চের বাকি কোড বাদ দিয়ে শুধু দরকারি বাগফিক্স কমিটটি টার্গেট করে।'
      },
      {
        titleEn: 'Step 2: Lift and Fly Across Branches',
        titleBn: 'ধাপ ২: কমিটটি বাতাসে তুলে নিজের ব্রাঞ্চে আনা',
        descriptionEn: 'Transports the commit patch across branch boundaries.',
        descriptionBn: 'কমিটের কোডটি শূন্যে উড়িয়ে নিজের বর্তমান ব্রাঞ্চের মাথায় নিয়ে আসে।'
      },
      {
        titleEn: 'Step 3: Transplant Cleanly onto Current HEAD',
        titleBn: 'ধাপ ৩: নিজের HEAD-এ নিখুঁতভাবে রোপণ করা',
        descriptionEn: 'Applies the changes cleanly onto your branch with a new commit hash!',
        descriptionBn: 'আপনার ব্রাঞ্চের সাথে সুন্দরভাবে যুক্ত হয়ে নতুন একটি কমিট তৈরি করে!'
      }
    ]
  },
  '7-4': {
    id: '7-4',
    command: 'git reflog',
    titleEn: 'Holographic Blackbox Flight Recorder Reel',
    titleBn: 'ব্ল্যাকবক্স ফ্লাইট রেকর্ডার: হারানো কোড উদ্ধার',
    visualScene: 'reflog-reel',
    steps: [
      {
        titleEn: 'Step 1: Unwind Chronological Journal Tape',
        titleBn: 'ধাপ ১: টাইম ট্রাভেলের টেপ রেকর্ডার উন্মোচন',
        descriptionEn: 'Git maintains a private journal of every time HEAD moved on this machine.',
        descriptionBn: 'HEAD যখনই যেখানে গেছে তার প্রতিটি স্টেপ এই ব্ল্যাকবক্সে রেকর্ড থাকে।'
      },
      {
        titleEn: 'Step 2: Find "Deleted" or "Lost" Commit SHAs',
        titleBn: 'ধাপ ২: ডিলিট হওয়া বা হারানো কমিটের হ্যাশ খুঁজে পাওয়া',
        descriptionEn: 'Shows commits even after git reset --hard or branch deletion (HEAD@{1}, HEAD@{2}).',
        descriptionBn: 'ভুল করে ডিলিট করে দেওয়া কমিটের আসল হ্যাশ এখান থেকে পরিষ্কার দেখা যায়।'
      },
      {
        titleEn: 'Step 3: Restore Lost Work via git reset',
        titleBn: 'ধাপ ৩: নিখোঁজ কোড মুহূর্তের মাঝে পুনরুদ্ধার',
        descriptionEn: 'You run git reset --hard HEAD@{n} and magically restore your lost code!',
        descriptionBn: 'সেই হ্যাশ দিয়ে এক কমান্ডেই হারিয়ে যাওয়া সমস্ত কোড ফিরিয়ে আনা সম্ভব!'
      }
    ]
  },

  // ==========================================
  // LEVEL 8: GitHub CLI Tools (gh)
  // ==========================================
  '8-1': {
    id: '8-1',
    command: 'gh pr create --title "feature" --body "details"',
    titleEn: 'Sealing Pull Request Envelope from Terminal',
    titleBn: 'টার্মিনাল থেকে সরাসরি পিআর এনভেলপ পাঠানো',
    visualScene: 'gh-pr-create',
    steps: [
      {
        titleEn: 'Step 1: Read Terminal Title and Body Parameters',
        titleBn: 'ধাপ ১: টার্মিনালের টাইটেল ও ডেসক্রিপশন রিড',
        descriptionEn: 'Takes your command-line arguments and structures official GitHub API payload.',
        descriptionBn: 'টার্মিনালের টাইটেল ও বডি নিয়ে অফিশিয়াল গিটহাব এপিআই পেলোড বানায়।'
      },
      {
        titleEn: 'Step 2: Dispatch Pull Request Envelope to Cloud',
        titleBn: 'ধাপ ২: গিটহাব ক্লাউডে পিআর খাম পাঠানো',
        descriptionEn: 'Communicates with GitHub.com over GraphQL/REST API securely.',
        descriptionBn: 'নিরাপদ এপিআই দিয়ে সরাসরি গিটহাব সার্ভারে পুল রিকোয়েস্ট তৈরি করে।'
      },
      {
        titleEn: 'Step 3: Receive Live PR URL (#1 Approved)',
        titleBn: 'ধাপ ৩: লাইভ পিআর লিংক ও টিম নোটিফিকেশন',
        descriptionEn: 'Returns official PR URL (https://github.com/.../pull/1) ready for team review!',
        descriptionBn: 'টার্মিনালে সরাসরি পিআরের লাইভ লিংক চলে আসে এবং টিম রিভিউ করতে পারে!'
      }
    ]
  },
  '8-2': {
    id: '8-2',
    command: 'gh repo view --web',
    titleEn: 'Launching Browser Portal from Command Line',
    titleBn: 'টার্মিনাল থেকে এক ক্লিকে ব্রাউজারে গিটহাব ওপেন',
    visualScene: 'gh-repo-view',
    steps: [
      {
        titleEn: 'Step 1: Read Origin Remote URL',
        titleBn: 'ধাপ ১: অরিজিন রিমোট ইউআরএল সংগ্রহ',
        descriptionEn: 'Resolves git@github.com:n0vemberain/GitPlayGround.git into https web format.',
        descriptionBn: 'লোকাল রিপোজিটরি থেকে গিটহাবের আসল ওয়েব অ্যাড্রেস বের করে আনে।'
      },
      {
        titleEn: 'Step 2: Trigger System Default Web Browser',
        titleBn: 'ধাপ ২: ডিফল্ট ওয়েব ব্রাউজারকে সিগন্যাল পাঠানো',
        descriptionEn: 'Executes operating system launch command to open Chrome/Safari/Firefox.',
        descriptionBn: 'অপারেটিং সিস্টেমের ডিফল্ট ব্রাউজারে পেজটি লোড করার সিগন্যাল দেয়।'
      },
      {
        titleEn: 'Step 3: Land Directly on Repository Dashboard',
        titleBn: 'ধাপ ৩: সরাসরি গিটহাব ড্যাশবোর্ডে পদার্পণ',
        descriptionEn: 'The full repository web interface opens immediately on your screen!',
        descriptionBn: 'আপনার চোখের সামনে মুহূর্তের মাঝে গিটহাবের পেজটি ভেসে ওঠে!'
      }
    ]
  }
};
