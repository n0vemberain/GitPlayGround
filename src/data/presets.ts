import { GitState } from '../types/git';

export interface PresetScenario {
  id: string;
  nameEn: string;
  nameBn: string;
  subtitleEn: string;
  subtitleBn: string;
  descriptionEn: string;
  descriptionBn: string;
  purposeEn: string;
  purposeBn: string;
  suggestedActionEn: string;
  suggestedActionBn: string;
  suggestedCommand: string;
  state: GitState;
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'clean-repo',
    nameEn: 'Pristine Starting Repo',
    nameBn: 'ফ্রেশ নতুন রিপোজিটরি',
    subtitleEn: 'Standard starting repository with single commit',
    subtitleBn: 'মেইন ব্রাঞ্চে মাত্র ১টি কমিট সহ সম্পূর্ণ ফ্রেশ স্টেট',
    descriptionEn: 'A clean repository ready for exploring basic workflow commands.',
    descriptionBn: 'বেসিক কমান্ডগুলো স্বাধীনভাবে প্র্যাকটিস করার জন্য একদম ফ্রেশ রিপোজিটরি।',
    purposeEn: 'Use this to start from scratch and test git add, git commit, and git branch.',
    purposeBn: 'নতুন করে শুরু করে git add, git commit বা ব্রাঞ্চিং নিজে নিজে প্র্যাকটিস করতে এটি ব্যবহার করুন।',
    suggestedActionEn: 'Create a new feature branch and make a commit.',
    suggestedActionBn: 'একটি নতুন ব্রাঞ্চ তৈরি করুন এবং কমিট দিন।',
    suggestedCommand: 'git switch -c my-feature',
    state: {
      commits: {
        'c1': {
          id: 'c1',
          hash: 'e82b71a',
          message: 'Initial commit: add project files',
          parents: [],
          branch: 'main',
          author: 'Octocat <octo@github.com>',
          timestamp: Date.now() - 3600000,
          files: { 'README.md': '# GitPlayGround', 'index.html': '<h1>Hello</h1>', 'app.js': 'console.log("Hello Git");' },
          treeHash: 'a71e29c'
        }
      },
      branches: {
        'main': { name: 'main', targetCommitId: 'c1' }
      },
      tags: {},
      HEAD: { type: 'branch', target: 'main' },
      workingDirectory: [
        { name: 'auth.js', path: 'src/auth.js', content: 'export function login() {}', status: 'untracked' }
      ],
      stagingArea: [],
      reflog: [
        {
          id: 'ref-1',
          commitId: 'c1',
          commitHash: 'e82b71a',
          action: 'commit (initial)',
          description: 'commit (initial): Initial commit',
          timestamp: Date.now() - 3600000
        }
      ],
      remotes: {
        'origin': {
          name: 'origin',
          url: 'https://github.com/n0vemberain/GitPlayGround.git',
          branches: { 'main': 'c1' }
        }
      },
      config: { 'user.name': 'Fatin Ishraque', 'user.email': 'developer@example.com' },
      stashStack: [],
      activeConflict: null,
      bisectState: null
    }
  },
  {
    id: 'diverged-branches',
    nameEn: 'Merge & 3-Way Diamond Lab',
    nameBn: 'মার্জ ও ৩-ওয়ে ডায়মন্ড ল্যাব',
    subtitleEn: 'Two diverged branches with separate commits',
    subtitleBn: 'উভয় ব্রাঞ্চেই আলাদা নতুন কমিট রয়েছে (৩-ওয়ে মার্জ টেস্ট)',
    descriptionEn: 'Both main and feature-signup have moved forward independently.',
    descriptionBn: 'মেইন এবং ফিচার ব্রাঞ্চ আলাদা আলাদা কমিট নিয়ে এগিয়ে গেছে।',
    purposeEn: 'Practice merging diverged histories and watch the 3-Way merge commit diamond form.',
    purposeBn: 'আলাদা হয়ে যাওয়া দুটি ব্রাঞ্চ কীভাবে ৩-ওয়ে মার্জের মাধ্যমে এক হয় তা ভিজ্যুয়ালি দেখতে এটি ব্যবহার করুন।',
    suggestedActionEn: 'Merge feature-signup into main to create a 3-way merge diamond.',
    suggestedActionBn: 'feature-signup ব্রাঞ্চকে main-এ মার্জ করে মার্জ ডায়মন্ড তৈরি করুন।',
    suggestedCommand: 'git merge feature-signup',
    state: {
      commits: {
        'c1': { id: 'c1', hash: 'e82b71a', message: 'Initial commit', parents: [], branch: 'main', author: 'Dev', timestamp: Date.now() - 7200000, files: { 'app.js': 'console.log("v1");' }, treeHash: 't1' },
        'c2': { id: 'c2', hash: 'b14c829', message: 'feat: setup database schema', parents: ['c1'], branch: 'main', author: 'Dev', timestamp: Date.now() - 3600000, files: { 'app.js': 'console.log("v1-db");' }, treeHash: 't2' },
        'c3': { id: 'c3', hash: 'f90a21d', message: 'feat: add user signup form', parents: ['c1'], branch: 'feature-signup', author: 'Dev', timestamp: Date.now() - 1800000, files: { 'app.js': 'console.log("v1-signup");' }, treeHash: 't3' }
      },
      branches: {
        'main': { name: 'main', targetCommitId: 'c2' },
        'feature-signup': { name: 'feature-signup', targetCommitId: 'c3' }
      },
      tags: {},
      HEAD: { type: 'branch', target: 'main' },
      workingDirectory: [],
      stagingArea: [],
      reflog: [],
      remotes: {},
      config: { 'user.name': 'Dev', 'user.email': 'dev@example.com' },
      stashStack: [],
      activeConflict: null,
      bisectState: null
    }
  },
  {
    id: 'detached-head',
    nameEn: 'Detached HEAD Recovery Lab',
    nameBn: 'ডিটাচড হেড রিকভারি ল্যাব',
    subtitleEn: 'HEAD pointing to raw commit hash instead of branch',
    subtitleBn: 'HEAD সরাসরি পুরনো কমিটে পয়েন্ট করে আছে (ব্রাঞ্চ ছাড়া)',
    descriptionEn: 'You checked out an old commit directly. Any new commits made here will be orphaned!',
    descriptionBn: 'আপনি সরাসরি একটি পুরনো কমিটে আছেন। এখান থেকে কীভাবে নতুন ব্রাঞ্চ বানিয়ে নিরাপদে কাজে ফিরবেন তা শিখুন।',
    purposeEn: 'Learn how to rescue a detached HEAD state by creating a new named branch.',
    purposeBn: 'ডিটাচড হেড অবস্থায় পড়লে কীভাবে git switch -c দিয়ে নতুন ব্রাঞ্চ বানিয়ে কাজ উদ্ধার করতে হয় তা প্র্যাকটিস করুন।',
    suggestedActionEn: 'Create a new branch from this commit to save your work.',
    suggestedActionBn: 'এই পজিশন থেকে একটি নতুন ব্রাঞ্চ বানিয়ে সেভ করুন।',
    suggestedCommand: 'git switch -c recovery-branch',
    state: {
      commits: {
        'c1': { id: 'c1', hash: 'e82b71a', message: 'Initial commit (v1)', parents: [], branch: 'main', author: 'Dev', timestamp: Date.now() - 7200000, files: {}, treeHash: 't1' },
        'c2': { id: 'c2', hash: 'b14c829', message: 'feat: experimental feature', parents: ['c1'], branch: 'main', author: 'Dev', timestamp: Date.now() - 3600000, files: {}, treeHash: 't2' }
      },
      branches: {
        'main': { name: 'main', targetCommitId: 'c2' }
      },
      tags: { 'v1.0': { name: 'v1.0', targetCommitId: 'c1' } },
      HEAD: { type: 'detached', target: 'c1' },
      workingDirectory: [],
      stagingArea: [],
      reflog: [],
      remotes: {},
      config: { 'user.name': 'Dev', 'user.email': 'dev@example.com' },
      stashStack: [],
      activeConflict: null,
      bisectState: null
    }
  },
  {
    id: 'stash-lab',
    nameEn: 'Dirty Workspace & Stashing Lab',
    nameBn: 'ডার্টি ওয়ার্কস্পেস ও স্ট্যাশ ল্যাব',
    subtitleEn: 'Modified uncommitted files ready for git stash',
    subtitleBn: 'অসম্পূর্ণ পরিবর্তন জমা আছে, git stash দিয়ে লুকানোর ল্যাব',
    descriptionEn: 'Workspace contains dirty changes in both working tree and staging area.',
    descriptionBn: 'ওয়ার্কিং ডিরেক্টরিতে অসমাপ্ত কোড রয়েছে যা কমিট না করে সাময়িক লুকিয়ে রাখা দরকার।',
    purposeEn: 'Practice saving in-progress work with git stash, inspecting a clean tree, then restoring with git stash pop.',
    purposeBn: 'git stash দিয়ে কোড স্ট্যাশ করা এবং git stash pop দিয়ে ফিরিয়ে আনার পুরো চক্রটি প্র্যাকটিস করুন।',
    suggestedActionEn: 'Stash your current dirty changes to get a clean tree.',
    suggestedActionBn: 'বর্তমান অসম্পূর্ণ পরিবর্তনগুলো git stash দিয়ে সাময়িক সেভ করুন।',
    suggestedCommand: 'git stash',
    state: {
      commits: {
        'c1': { id: 'c1', hash: 'e82b71a', message: 'Initial commit', parents: [], branch: 'main', author: 'Dev', timestamp: Date.now() - 3600000, files: {}, treeHash: 't1' }
      },
      branches: { 'main': { name: 'main', targetCommitId: 'c1' } },
      tags: {},
      HEAD: { type: 'branch', target: 'main' },
      workingDirectory: [
        { name: 'payment.js', path: 'src/payment.js', content: '// Half-implemented Stripe integration', status: 'modified' },
        { name: 'temp.log', path: 'temp.log', content: 'debug log info', status: 'untracked' }
      ],
      stagingArea: [
        { name: 'cart.js', path: 'src/cart.js', content: '// In-progress cart code', status: 'staged' }
      ],
      reflog: [],
      remotes: {},
      config: { 'user.name': 'Dev', 'user.email': 'dev@example.com' },
      stashStack: [],
      activeConflict: null,
      bisectState: null
    }
  }
];
