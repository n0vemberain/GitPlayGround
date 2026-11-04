import { CommandFeedback } from '../components/visualizer/CommandFeedbackBanner';

export const generateFeedback = (cmd: string): CommandFeedback => {
  const trimmed = cmd.trim();

  if (trimmed.includes('user.name')) {
    return {
      command: trimmed,
      explanationEn: 'Your global author name was written into ~/.gitconfig. All future commits created on this machine will sign with this name.',
      explanationBn: 'আপনার ইউজারনেমটি ~/.gitconfig ফাইলে স্থায়ীভাবে সেভ হয়েছে। এখন থেকে আপনি যত কমিট করবেন তার মেটাডাটায় আপনার নাম লেখক হিসেবে দেখা যাবে।',
      affectedAreaEn: 'Global Configuration (~/.gitconfig)',
      affectedAreaBn: 'গ্লোবাল কনফিগারেশন ফাইল (~/.gitconfig)'
    };
  }

  if (trimmed.includes('user.email')) {
    return {
      command: trimmed,
      explanationEn: 'Your authentication email was saved. GitHub matches this email with your GitHub profile account to attribute green contribution graph squares!',
      explanationBn: 'আপনার অথেনটিকেশন ইমেইল সংরক্ষিত হয়েছে। গিটহাব এই ইমেইলের মাধ্যমেই কমিটগুলোকে আপনার অনলাইন প্রোফাইলের সবুজ কনট্রিবিউশন গ্রাফের সাথে লিংক করে।',
      affectedAreaEn: 'Global Configuration (~/.gitconfig)',
      affectedAreaBn: 'গ্লোবাল কনফিগারেশন ফাইল (~/.gitconfig)'
    };
  }

  if (trimmed === 'git init') {
    return {
      command: trimmed,
      explanationEn: 'Created the hidden .git directory containing objects database, refs/heads, and HEAD pointer. The folder is now a live Git repository.',
      explanationBn: 'একটি নতুন লুকানো .git ডিরেক্টরি তৈরি হয়েছে। এর ভেতরে অবজেক্টস ডেটাবেস, ব্রাঞ্চ রেফারেন্স এবং HEAD পয়েন্টার প্রস্তুত হয়েছে।',
      affectedAreaEn: 'Root Directory (.git/)',
      affectedAreaBn: 'রুট ডিরেক্টরি (.git/ ফোল্ডার)'
    };
  }

  if (trimmed.startsWith('git add')) {
    return {
      command: trimmed,
      explanationEn: 'File content was hashed into SHA-1 blob objects and registered in the staging index (.git/index). Changes are now staged for the next commit snapshot.',
      explanationBn: 'ফাইলের কন্টেন্টগুলোকে SHA-1 ব্লব অবজেক্টে হ্যাশ করে স্টেজিং ইনডেক্সে (.git/index) রেজিস্টার করা হয়েছে। ফাইলগুলো এখন কমিট করার জন্য প্রস্তুত।',
      affectedAreaEn: 'Staging Area (.git/index)',
      affectedAreaBn: 'স্টেজিং এরিয়া (Index)'
    };
  }

  if (trimmed.startsWith('git commit')) {
    return {
      command: trimmed,
      explanationEn: 'Created a new commit object pointing to a root tree snapshot. The active branch pointer and HEAD advanced forward to this new commit node.',
      explanationBn: 'একটি নতুন স্থায়ী কমিট অবজেক্ট ও রুট ট্রি তৈরি হয়েছে। বর্তমান সক্রিয় ব্রাঞ্চ পয়েন্টার এবং HEAD স্বয়ংক্রিয়ভাবে নতুন কমিট নোডে এগিয়ে গেছে।',
      affectedAreaEn: 'Commit History Graph (DAG)',
      affectedAreaBn: 'কমিট হিস্টোরি গ্রাফ (DAG)'
    };
  }

  if (trimmed.startsWith('git switch -c') || trimmed.startsWith('git checkout -b')) {
    return {
      command: trimmed,
      explanationEn: 'Created a new 41-byte branch reference file in .git/refs/heads/ and pointed HEAD to it. You are now working on the new isolated branch.',
      explanationBn: 'নতুন ব্রাঞ্চের জন্য একটি টেক্সট পয়েন্টার তৈরি হয়েছে এবং HEAD সেটির দিকে ঘুরে গেছে। এখন আপনি সম্পূর্ণ আইসোলেটেড নতুন ব্রাঞ্চে কাজ করছেন।',
      affectedAreaEn: 'Branch Reference & HEAD Pointer',
      affectedAreaBn: 'ব্রাঞ্চ রেফারেন্স ও HEAD পয়েন্টার'
    };
  }

  if (trimmed.startsWith('git merge')) {
    return {
      command: trimmed,
      explanationEn: 'Calculated common ancestor commit and joined the branch histories. If diverged, a 3-way merge commit with two parent pointers was created.',
      explanationBn: 'উভয় ব্রাঞ্চের পূর্বপুরুষ হিস্টোরি মিলিয়ে ব্রাঞ্চগুলোকে মার্জ করা হয়েছে। হিস্টোরি আলাদা থাকলে দুই-প্যারেন্ট বিশিষ্ট মার্জ নোড তৈরি হয়েছে।',
      affectedAreaEn: 'Active Branch Tip & Commit Tree',
      affectedAreaBn: 'অ্যাক্টিভ ব্রাঞ্চ এবং কমিট ট্রি'
    };
  }

  if (trimmed.startsWith('git restore --staged')) {
    return {
      command: trimmed,
      explanationEn: 'Removed file from the staging index without discarding your file edits in the working directory.',
      explanationBn: 'ফাইলের কোড নষ্ট না করে ফাইলটিকে স্টেজিং ইনডেক্স থেকে নিরাপদে আনস্টেজ করে ওয়ার্কিং ডিরেক্টরিতে রাখা হয়েছে।',
      affectedAreaEn: 'Staging Area (Index)',
      affectedAreaBn: 'স্টেজিং এরিয়া'
    };
  }

  if (trimmed.startsWith('git restore')) {
    return {
      command: trimmed,
      explanationEn: 'Discarded local unstaged edits in the working tree and restored the file to match the last committed version.',
      explanationBn: 'ওয়ার্কিং ডিরেক্টরির আন-কমিটেড পরিবর্তনগুলো বাতিল করে ফাইলটিকে শেষ কমিটের অবস্থায় ফেরত নেওয়া হয়েছে।',
      affectedAreaEn: 'Working Directory',
      affectedAreaBn: 'ওয়ার্কিং ডিরেক্টরি'
    };
  }

  if (trimmed === 'git stash') {
    return {
      command: trimmed,
      explanationEn: 'Saved current uncommitted dirty changes into the stash stack and cleaned the working tree back to HEAD.',
      explanationBn: 'বর্তমান অসম্পূর্ণ পরিবর্তনগুলোকে স্ট্যাশ মেমোরিতে নিরাপদে জমিয়ে রেখে আপনার ওয়ার্কস্পেসকে সম্পূর্ণ ক্লিন করা হয়েছে।',
      affectedAreaEn: 'Stash Stack (.git/refs/stash)',
      affectedAreaBn: 'স্ট্যাশ স্ট্যাক'
    };
  }

  if (trimmed === 'git stash pop') {
    return {
      command: trimmed,
      explanationEn: 'Restored your stashed changes back into the working tree and removed the top entry from the stash stack.',
      explanationBn: 'স্ট্যাশ করে রাখা পরিবর্তনগুলো আবার কোডে ফেরত এসেছে এবং স্ট্যাশ মেমোরি থেকে সরিয়ে দেওয়া হয়েছে।',
      affectedAreaEn: 'Working Directory & Stash Stack',
      affectedAreaBn: 'ওয়ার্কিং ডিরেক্টরি ও স্ট্যাশ মেমোরি'
    };
  }

  if (trimmed.startsWith('git reset')) {
    return {
      command: trimmed,
      explanationEn: 'Moved HEAD and current branch pointer backwards to target commit. Reflog recorded this movement as a safety net.',
      explanationBn: 'HEAD এবং ব্রাঞ্চ পয়েন্টারটিকে পেছনের কমিটে পিছিয়ে নেওয়া হয়েছে। রেফলগ-এ এই মুভমেন্টের রেকর্ড সেভ রয়েছে।',
      affectedAreaEn: 'HEAD Pointer & Branch Reference',
      affectedAreaBn: 'HEAD পয়েন্টার ও হিস্টোরি'
    };
  }

  return {
    command: trimmed,
    explanationEn: `Executed ${trimmed} successfully. System state updated in repository.`,
    explanationBn: `${trimmed} কমান্ড সফলভাবে সম্পন্ন হয়েছে এবং সিস্টেমের স্টেট আপডেট হয়েছে।`,
    affectedAreaEn: 'Repository State',
    affectedAreaBn: 'রিপোজিটরি স্টেট'
  };
};
