export interface Commit {
  id: string; // e.g. 'c1', 'c2'
  hash: string; // short 7-char SHA, e.g. '3a1f9bc'
  message: string;
  parents: string[]; // parent commit ids
  branch: string; // primary branch created on
  author: string;
  timestamp: number;
  files: Record<string, string>; // filename -> content snapshot
  treeHash: string;
  isMerge?: boolean;
  isCherryPick?: boolean;
  isRebase?: boolean;
}

export interface Branch {
  name: string;
  targetCommitId: string;
  isRemote?: boolean;
}

export interface Tag {
  name: string;
  targetCommitId: string;
  annotated?: boolean;
  message?: string;
}

export interface ReflogEntry {
  id: string;
  commitId: string;
  commitHash: string;
  action: string; // e.g. 'commit', 'checkout', 'rebase', 'merge', 'reset'
  description: string;
  timestamp: number;
}

export type FileStatus = 'untracked' | 'modified' | 'staged' | 'committed';

export interface FileItem {
  name: string;
  path: string;
  content: string;
  status: FileStatus;
  stagedContent?: string;
  workingContent?: string;
}

export interface GitHead {
  type: 'branch' | 'detached';
  target: string; // branch name or commit id
}

export interface RemoteRepo {
  name: string; // e.g. 'origin'
  url: string;
  branches: Record<string, string>; // branch name -> commitId
}

export interface ConflictState {
  filename: string;
  ourBranch: string;
  theirBranch: string;
  ourCode: string;
  theirCode: string;
  baseCode: string;
}

export interface GitState {
  commits: Record<string, Commit>;
  branches: Record<string, Branch>;
  tags: Record<string, Tag>;
  HEAD: GitHead;
  workingDirectory: FileItem[];
  stagingArea: FileItem[];
  reflog: ReflogEntry[];
  remotes: Record<string, RemoteRepo>;
  activeConflict: ConflictState | null;
  bisectState: {
    active: boolean;
    badCommitId?: string;
    goodCommitId?: string;
    testedCommits: string[];
    currentTestCommitId?: string;
  } | null;
}
