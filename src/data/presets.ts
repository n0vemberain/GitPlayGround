import { GitState } from '../types/git';

export interface PresetScenario {
  id: string;
  nameEn: string;
  nameBn: string;
  descriptionEn: string;
  descriptionBn: string;
  state: GitState;
}

export const PRESET_SCENARIOS: PresetScenario[] = [
  {
    id: 'clean-repo',
    nameEn: 'Clean Initial Repo',
    nameBn: 'ফ্রেশ নতুন রিপোজিটরি',
    descriptionEn: 'A pristine git repo with initial commit on main.',
    descriptionBn: 'মেইন ব্রাঞ্চে মাত্র একটি ইনিশিয়াল কমিট সহ সম্পূর্ণ ফ্রেশ স্টেট।',
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
          files: { 'README.md': '# GitPlayGround', 'index.html': '<h1>Hello</h1>' },
          treeHash: 'a71e29c'
        }
      },
      branches: {
        'main': { name: 'main', targetCommitId: 'c1' }
      },
      tags: {},
      HEAD: { type: 'branch', target: 'main' },
      workingDirectory: [
        { name: 'app.js', path: 'src/app.js', content: 'console.log("Ready");', status: 'untracked' }
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
      config: { 'user.name': 'Dev', 'user.email': 'dev@example.com' },
      stashStack: [],
      activeConflict: null,
      bisectState: null
    }
  },
  {
    id: 'diverged-branches',
    nameEn: 'Diverged Branches (Merge Practice)',
    nameBn: 'ডাইভার্জড ব্রাঞ্চ (মার্জ প্র্যাকটিস)',
    descriptionEn: 'main and feature branches have both moved ahead with separate commits.',
    descriptionBn: 'উভয় ব্রাঞ্চেই আলাদা নতুন কমিট রয়েছে, ৩-ওয়ে মার্জ প্র্যাকটিসের উপযুক্ত।',
    state: {
      commits: {
        'c1': { id: 'c1', hash: 'e82b71a', message: 'Initial commit', parents: [], branch: 'main', author: 'Dev', timestamp: Date.now() - 7200000, files: {}, treeHash: 't1' },
        'c2': { id: 'c2', hash: 'b14c829', message: 'feat: setup database schema', parents: ['c1'], branch: 'main', author: 'Dev', timestamp: Date.now() - 3600000, files: {}, treeHash: 't2' },
        'c3': { id: 'c3', hash: 'f90a21d', message: 'feat: add user signup form', parents: ['c1'], branch: 'feature-signup', author: 'Dev', timestamp: Date.now() - 1800000, files: {}, treeHash: 't3' }
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
    nameEn: 'Detached HEAD State',
    nameBn: 'ডিটাচড হেড (Detached HEAD)',
    descriptionEn: 'HEAD points directly to an older commit instead of a named branch.',
    descriptionBn: 'HEAD কোনো ব্রাঞ্চের বদলে সরাসরি পুরনো কমিট সি১-এ পয়েন্ট করে আছে।',
    state: {
      commits: {
        'c1': { id: 'c1', hash: 'e82b71a', message: 'Initial commit', parents: [], branch: 'main', author: 'Dev', timestamp: Date.now() - 7200000, files: {}, treeHash: 't1' },
        'c2': { id: 'c2', hash: 'b14c829', message: 'feat: update styles', parents: ['c1'], branch: 'main', author: 'Dev', timestamp: Date.now() - 3600000, files: {}, treeHash: 't2' }
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
  }
];
