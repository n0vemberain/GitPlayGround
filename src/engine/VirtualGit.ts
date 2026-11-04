import { GitState, Commit, Branch, ReflogEntry, FileItem } from '../types/git';

export class VirtualGit {
  private state: GitState;
  private commitCounter: number = 1;

  constructor(initialState?: Partial<GitState>) {
    this.state = this.getDefaultState();
    if (initialState) {
      this.state = {
        ...this.state,
        ...initialState,
        commits: { ...this.state.commits, ...(initialState.commits || {}) },
        branches: { ...this.state.branches, ...(initialState.branches || {}) },
        tags: { ...this.state.tags, ...(initialState.tags || {}) },
        config: { ...this.state.config, ...(initialState.config || {}) },
      };
      const commitCount = Object.keys(this.state.commits).length;
      if (commitCount > 0) {
        this.commitCounter = commitCount + 1;
      }
    }
  }

  private getDefaultState(): GitState {
    const initialCommit: Commit = {
      id: 'c1',
      hash: 'e82b71a',
      message: 'Initial commit (README.md & index.html)',
      parents: [],
      branch: 'main',
      author: 'Octocat <octo@github.com>',
      timestamp: Date.now() - 3600000,
      files: {
        'README.md': '# GitPlayGround Project\nLearning Git through visual animations.',
        'index.html': '<!DOCTYPE html>\n<html><body><h1>Hello Git</h1></body></html>'
      },
      treeHash: 'a71e29c'
    };

    return {
      commits: {
        'c1': initialCommit
      },
      branches: {
        'main': { name: 'main', targetCommitId: 'c1' }
      },
      tags: {
        'v0.1': { name: 'v0.1', targetCommitId: 'c1' }
      },
      HEAD: { type: 'branch', target: 'main' },
      workingDirectory: [
        { name: 'app.js', path: 'src/app.js', content: 'console.log("Git is awesome!");', status: 'untracked' }
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
      config: {
        'user.name': 'Fatin Ishraque',
        'user.email': 'developer@example.com'
      },
      stashStack: [],
      activeConflict: null,
      bisectState: null
    };
  }

  public getState(): GitState {
    return JSON.parse(JSON.stringify(this.state));
  }

  public setState(newState: GitState): void {
    this.state = JSON.parse(JSON.stringify(newState));
  }

  private generateHash(): string {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < 7; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  public getCurrentCommitId(): string {
    if (this.state.HEAD.type === 'branch') {
      const branchName = this.state.HEAD.target;
      return this.state.branches[branchName]?.targetCommitId || 'c1';
    }
    return this.state.HEAD.target;
  }

  public getCurrentBranchName(): string | null {
    return this.state.HEAD.type === 'branch' ? this.state.HEAD.target : null;
  }

  private addReflog(action: string, description: string, commitId?: string): void {
    const targetId = commitId || this.getCurrentCommitId();
    const commit = this.state.commits[targetId];
    const newEntry: ReflogEntry = {
      id: `ref-${this.state.reflog.length + 1}`,
      commitId: targetId,
      commitHash: commit ? commit.hash : '0000000',
      action,
      description,
      timestamp: Date.now()
    };
    this.state.reflog.unshift(newEntry);
  }

  // --- 1. SETUP & CONFIG ---
  public setConfig(key: string, value: string): { success: boolean; output: string } {
    this.state.config[key] = value;
    return {
      success: true,
      output: `Configured ${key} = "${value}"`
    };
  }

  public getConfig(key?: string): { success: boolean; output: string } {
    if (key) {
      return { success: true, output: this.state.config[key] || '' };
    }
    const lines = Object.entries(this.state.config).map(([k, v]) => `${k}=${v}`);
    return { success: true, output: lines.join('\n') };
  }

  public init(): { success: boolean; output: string } {
    this.state = this.getDefaultState();
    return {
      success: true,
      output: 'Initialized empty Git repository in /workspace/GitPlayGround/.git/'
    };
  }

  public clone(url: string): { success: boolean; output: string } {
    this.state = this.getDefaultState();
    this.state.remotes['origin'] = {
      name: 'origin',
      url,
      branches: { 'main': 'c1' }
    };
    return {
      success: true,
      output: `Cloning into 'GitPlayGround'...\nremote: Enumerating objects: 18, done.\nremote: Total 18 (delta 2), reused 16 (delta 1)\nReceiving objects: 100% (18/18), done.`
    };
  }

  // --- 2. BASIC WORKFLOW (STATUS, ADD, COMMIT, LOG) ---
  public status(): { success: boolean; output: string } {
    const branchName = this.getCurrentBranchName();
    let out = '';
    if (branchName) {
      out += `On branch ${branchName}\n`;
    } else {
      out += `HEAD detached at ${this.state.HEAD.target}\n`;
    }

    if (this.state.stagingArea.length > 0) {
      out += `Changes to be committed:\n  (use "git restore --staged <file>..." to unstage)\n`;
      this.state.stagingArea.forEach(f => {
        out += `\t\x1b[32mnew file:   ${f.name}\x1b[0m\n`;
      });
    }

    const modified = this.state.workingDirectory.filter(f => f.status === 'modified');
    if (modified.length > 0) {
      out += `Changes not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n`;
      modified.forEach(f => {
        out += `\t\x1b[31mmodified:   ${f.name}\x1b[0m\n`;
      });
    }

    const untracked = this.state.workingDirectory.filter(f => f.status === 'untracked');
    if (untracked.length > 0) {
      out += `Untracked files:\n  (use "git add <file>..." to include in what will be committed)\n`;
      untracked.forEach(f => {
        out += `\t\x1b[31m${f.name}\x1b[0m\n`;
      });
    }

    if (this.state.stagingArea.length === 0 && modified.length === 0 && untracked.length === 0) {
      out += `nothing to commit, working tree clean\n`;
    }

    return { success: true, output: out };
  }

  public add(target: string): { success: boolean; output: string } {
    if (target === '.' || target === '-A' || target === '*') {
      const moved = [...this.state.workingDirectory];
      this.state.stagingArea.push(...moved.map(f => ({ ...f, status: 'staged' as const })));
      this.state.workingDirectory = [];
      return {
        success: true,
        output: `Staged ${moved.length} file(s) for commit.`
      };
    }

    const fileIndex = this.state.workingDirectory.findIndex(f => f.name === target || f.path === target);
    if (fileIndex !== -1) {
      const [item] = this.state.workingDirectory.splice(fileIndex, 1);
      this.state.stagingArea.push({ ...item, status: 'staged' });
      return { success: true, output: `Staged ${item.name}` };
    }

    const newFile: FileItem = {
      name: target,
      path: target,
      content: `// Content for ${target}`,
      status: 'staged'
    };
    this.state.stagingArea.push(newFile);
    return { success: true, output: `Created and staged ${target}` };
  }

  public commit(message: string, isAmend: boolean = false): { success: boolean; output: string } {
    if (this.state.stagingArea.length === 0 && !isAmend) {
      return {
        success: false,
        output: 'nothing to commit, working tree clean (use "git add" to stage files)'
      };
    }

    const currentCommitId = this.getCurrentCommitId();
    const currentBranch = this.getCurrentBranchName() || 'HEAD';

    if (isAmend) {
      const existing = this.state.commits[currentCommitId];
      if (existing) {
        existing.message = message || existing.message;
        existing.timestamp = Date.now();
        this.addReflog('commit (amend)', `commit (amend): ${existing.message}`);
        return {
          success: true,
          output: `[${currentBranch} ${existing.hash}] ${existing.message} (amended)`
        };
      }
    }

    this.commitCounter++;
    const newId = `c${this.commitCounter}`;
    const hash = this.generateHash();

    const newCommit: Commit = {
      id: newId,
      hash,
      message: message || `Commit ${newId}`,
      parents: [currentCommitId],
      branch: currentBranch,
      author: `${this.state.config['user.name'] || 'Developer'} <${this.state.config['user.email'] || 'dev@example.com'}>`,
      timestamp: Date.now(),
      files: {
        ...(this.state.commits[currentCommitId]?.files || {})
      },
      treeHash: this.generateHash()
    };

    this.state.stagingArea.forEach(f => {
      newCommit.files[f.name] = f.content;
    });

    this.state.commits[newId] = newCommit;
    this.state.stagingArea = [];

    if (this.state.HEAD.type === 'branch') {
      const bName = this.state.HEAD.target;
      if (this.state.branches[bName]) {
        this.state.branches[bName].targetCommitId = newId;
      }
    } else {
      this.state.HEAD.target = newId;
    }

    this.addReflog('commit', `commit: ${newCommit.message}`, newId);

    return {
      success: true,
      output: `[${currentBranch} ${hash}] ${newCommit.message}\n 1 file changed, 1 insertion(+)`
    };
  }

  public commitAll(message: string): { success: boolean; output: string } {
    // git commit -am "msg": stage tracked modified files then commit
    const modified = this.state.workingDirectory.filter(f => f.status === 'modified');
    this.state.stagingArea.push(...modified.map(f => ({ ...f, status: 'staged' as const })));
    this.state.workingDirectory = this.state.workingDirectory.filter(f => f.status === 'untracked');
    return this.commit(message);
  }

  public log(compactGraph: boolean = false): { success: boolean; output: string } {
    let curr: string | undefined = this.getCurrentCommitId();
    const lines: string[] = [];
    const visited = new Set<string>();

    while (curr && !visited.has(curr) && this.state.commits[curr]) {
      visited.add(curr);
      const c: Commit = this.state.commits[curr];
      const branchesAtCommit = Object.entries(this.state.branches)
        .filter(([_, b]) => b.targetCommitId === c.id)
        .map(([name]) => name);
      const isHead = this.getCurrentCommitId() === c.id;
      const headBadge = isHead ? `\x1b[36m(HEAD -> ${branchesAtCommit.join(', ') || 'detached'})\x1b[0m ` : '';

      if (compactGraph) {
        lines.push(`* \x1b[33m${c.hash}\x1b[0m - ${headBadge}\x1b[37m${c.message}\x1b[0m \x1b[32m(${new Date(c.timestamp).toLocaleTimeString()})\x1b[0m`);
      } else {
        lines.push(`* \x1b[33m${c.hash}\x1b[0m ${headBadge}${c.message}`);
      }
      curr = c.parents[0];
    }

    return { success: true, output: lines.join('\n') };
  }

  // --- 3. BRANCHING & MERGING ---
  public branch(name?: string, deleteName?: string): { success: boolean; output: string } {
    if (!name && !deleteName) {
      const current = this.getCurrentBranchName();
      const list = Object.keys(this.state.branches)
        .map(b => (b === current ? `* \x1b[32m${b}\x1b[0m` : `  ${b}`))
        .join('\n');
      return { success: true, output: list };
    }

    if (deleteName) {
      if (deleteName === this.getCurrentBranchName()) {
        return { success: false, output: `error: Cannot delete branch '${deleteName}' checked out at current HEAD` };
      }
      if (!this.state.branches[deleteName]) {
        return { success: false, output: `error: branch '${deleteName}' not found.` };
      }
      delete this.state.branches[deleteName];
      return { success: true, output: `Deleted branch ${deleteName}.` };
    }

    if (name) {
      if (this.state.branches[name]) {
        return { success: false, output: `fatal: A branch named '${name}' already exists.` };
      }
      const currentCommitId = this.getCurrentCommitId();
      this.state.branches[name] = {
        name,
        targetCommitId: currentCommitId
      };
      return { success: true, output: `Created branch ${name} at ${currentCommitId}` };
    }

    return { success: true, output: '' };
  }

  public renameBranch(oldName: string, newName: string): { success: boolean; output: string } {
    if (!this.state.branches[oldName]) {
      return { success: false, output: `error: refname refs/heads/${oldName} not found` };
    }
    if (this.state.branches[newName]) {
      return { success: false, output: `fatal: A branch named '${newName}' already exists.` };
    }
    const targetCommit = this.state.branches[oldName].targetCommitId;
    delete this.state.branches[oldName];
    this.state.branches[newName] = { name: newName, targetCommitId: targetCommit };
    if (this.state.HEAD.type === 'branch' && this.state.HEAD.target === oldName) {
      this.state.HEAD.target = newName;
    }
    return { success: true, output: `Renamed branch '${oldName}' to '${newName}'` };
  }

  public checkout(target: string, isNewBranch: boolean = false): { success: boolean; output: string } {
    if (isNewBranch) {
      if (this.state.branches[target]) {
        return { success: false, output: `fatal: A branch named '${target}' already exists.` };
      }
      const currentCommitId = this.getCurrentCommitId();
      this.state.branches[target] = {
        name: target,
        targetCommitId: currentCommitId
      };
      this.state.HEAD = { type: 'branch', target };
      this.addReflog('checkout', `checkout: moving from ${currentCommitId} to ${target}`);
      return { success: true, output: `Switched to a new branch '${target}'` };
    }

    if (this.state.branches[target]) {
      const prev = this.state.HEAD.target;
      this.state.HEAD = { type: 'branch', target };
      this.addReflog('checkout', `checkout: moving from ${prev} to ${target}`);
      return { success: true, output: `Switched to branch '${target}'` };
    }

    const commit = Object.values(this.state.commits).find(c => c.id === target || c.hash.startsWith(target));
    if (commit) {
      const prev = this.state.HEAD.target;
      this.state.HEAD = { type: 'detached', target: commit.id };
      this.addReflog('checkout', `checkout: moving from ${prev} to ${commit.hash}`);
      return {
        success: true,
        output: `Note: switching to '${commit.hash}'.\nYou are in 'detached HEAD' state at commit ${commit.hash}.`
      };
    }

    return { success: false, output: `error: pathspec '${target}' did not match any file(s) known to git` };
  }

  public merge(targetBranch: string): { success: boolean; output: string } {
    const currentBranch = this.getCurrentBranchName();
    if (!currentBranch) {
      return { success: false, output: `fatal: You are in 'detached HEAD' state. Checkout a branch first.` };
    }

    const target = this.state.branches[targetBranch];
    if (!target) {
      return { success: false, output: `merge: ${targetBranch} - not something we can merge` };
    }

    const currentCommitId = this.state.branches[currentBranch].targetCommitId;
    const targetCommitId = target.targetCommitId;

    if (currentCommitId === targetCommitId) {
      return { success: true, output: 'Already up to date.' };
    }

    const isAncestor = this.isAncestor(currentCommitId, targetCommitId);
    if (isAncestor) {
      this.state.branches[currentBranch].targetCommitId = targetCommitId;
      this.addReflog('merge', `merge ${targetBranch}: Fast-forward`);
      return {
        success: true,
        output: `Updating ${this.state.commits[currentCommitId]?.hash}..${this.state.commits[targetCommitId]?.hash}\nFast-forward\n 1 file changed, 2 insertions(+)`
      };
    }

    this.commitCounter++;
    const mergeId = `c${this.commitCounter}`;
    const hash = this.generateHash();

    const mergeCommit: Commit = {
      id: mergeId,
      hash,
      message: `Merge branch '${targetBranch}' into ${currentBranch}`,
      parents: [currentCommitId, targetCommitId],
      branch: currentBranch,
      author: `${this.state.config['user.name'] || 'Developer'} <${this.state.config['user.email'] || 'dev@example.com'}>`,
      timestamp: Date.now(),
      files: {
        ...(this.state.commits[currentCommitId]?.files || {}),
        ...(this.state.commits[targetCommitId]?.files || {})
      },
      treeHash: this.generateHash(),
      isMerge: true
    };

    this.state.commits[mergeId] = mergeCommit;
    this.state.branches[currentBranch].targetCommitId = mergeId;
    this.addReflog('merge', `merge ${targetBranch}: Merge made by the 'ort' strategy.`, mergeId);

    return {
      success: true,
      output: `Merge made by the 'ort' strategy.\n[${currentBranch} ${hash}] Merge branch '${targetBranch}' into ${currentBranch}`
    };
  }

  // --- 4. REMOTE & SYNC ---
  public remoteAdd(name: string, url: string): { success: boolean; output: string } {
    this.state.remotes[name] = {
      name,
      url,
      branches: {}
    };
    return { success: true, output: `Added remote '${name}' -> ${url}` };
  }

  public push(remoteName: string = 'origin', branchName?: string): { success: boolean; output: string } {
    const branch = branchName || this.getCurrentBranchName() || 'main';
    const remote = this.state.remotes[remoteName];
    if (!remote) {
      return { success: false, output: `fatal: '${remoteName}' does not appear to be a git repository` };
    }

    const currentCommitId = this.state.branches[branch]?.targetCommitId || this.getCurrentCommitId();
    remote.branches[branch] = currentCommitId;

    return {
      success: true,
      output: `To ${remote.url}\n * [new branch]      ${branch} -> ${branch}\nBranch '${branch}' set up to track remote branch '${branch}' from '${remoteName}'.`
    };
  }

  public fetch(remoteName: string = 'origin'): { success: boolean; output: string } {
    return {
      success: true,
      output: `remote: Enumerating objects: 6, done.\nFrom ${this.state.remotes[remoteName]?.url || 'origin'}\n * [new branch]      main       -> origin/main`
    };
  }

  public pull(): { success: boolean; output: string } {
    return {
      success: true,
      output: `Already up to date.`
    };
  }

  public remotePrune(remoteName: string = 'origin'): { success: boolean; output: string } {
    return {
      success: true,
      output: `Pruning ${remoteName}\nURL: ${this.state.remotes[remoteName]?.url || 'https://github.com/...'}\n * [pruned] origin/old-feature`
    };
  }

  // --- 5. UNDOING & STASHING ---
  public restore(fileName: string, staged: boolean = false): { success: boolean; output: string } {
    if (staged) {
      const idx = this.state.stagingArea.findIndex(f => f.name === fileName);
      if (idx !== -1) {
        const [stagedFile] = this.state.stagingArea.splice(idx, 1);
        this.state.workingDirectory.push({ ...stagedFile, status: 'modified' });
        return { success: true, output: `Unstaged changes in '${fileName}'` };
      }
      return { success: false, output: `error: pathspec '${fileName}' did not match any file(s) known to git` };
    } else {
      const idx = this.state.workingDirectory.findIndex(f => f.name === fileName);
      if (idx !== -1) {
        this.state.workingDirectory.splice(idx, 1);
        return { success: true, output: `Discarded changes in working directory for '${fileName}'` };
      }
      return { success: false, output: `error: pathspec '${fileName}' did not match any file(s) known to git` };
    }
  }

  public stash(): { success: boolean; output: string } {
    const dirtyFiles = [...this.state.workingDirectory, ...this.state.stagingArea];
    if (dirtyFiles.length === 0) {
      return { success: true, output: 'No local changes to save.' };
    }
    const stashId = `stash@{${this.state.stashStack.length}}`;
    this.state.stashStack.unshift({
      id: stashId,
      message: `WIP on ${this.getCurrentBranchName() || 'HEAD'}`,
      files: dirtyFiles
    });
    this.state.workingDirectory = [];
    this.state.stagingArea = [];
    return {
      success: true,
      output: `Saved working directory and index state WIP on ${this.getCurrentBranchName() || 'main'}`
    };
  }

  public stashPop(): { success: boolean; output: string } {
    if (this.state.stashStack.length === 0) {
      return { success: false, output: 'error: No stash entries found.' };
    }
    const popped = this.state.stashStack.shift()!;
    this.state.workingDirectory.push(...popped.files.map(f => ({ ...f, status: 'modified' as const })));
    return {
      success: true,
      output: `On branch ${this.getCurrentBranchName() || 'main'}\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\nDropped ${popped.id}`
    };
  }

  public clean(): { success: boolean; output: string } {
    const untracked = this.state.workingDirectory.filter(f => f.status === 'untracked');
    this.state.workingDirectory = this.state.workingDirectory.filter(f => f.status !== 'untracked');
    return {
      success: true,
      output: `Removing ${untracked.map(f => f.name).join(', ') || 'untracked files'}`
    };
  }

  public reset(mode: 'soft' | 'mixed' | 'hard', target: string): { success: boolean; output: string } {
    let targetCommitId = target;
    if (target.startsWith('HEAD~')) {
      const count = parseInt(target.replace('HEAD~', ''), 10) || 1;
      let curr = this.getCurrentCommitId();
      for (let i = 0; i < count; i++) {
        const parents = this.state.commits[curr]?.parents;
        if (parents && parents.length > 0) {
          curr = parents[0];
        }
      }
      targetCommitId = curr;
    } else if (target === 'HEAD') {
      targetCommitId = this.getCurrentCommitId();
    } else {
      const commit = Object.values(this.state.commits).find(c => c.id === target || c.hash.startsWith(target));
      if (commit) targetCommitId = commit.id;
    }

    if (!this.state.commits[targetCommitId]) {
      return { success: false, output: `fatal: ambiguous argument '${target}': unknown revision` };
    }

    const currentBranch = this.getCurrentBranchName();
    if (currentBranch) {
      this.state.branches[currentBranch].targetCommitId = targetCommitId;
    } else {
      this.state.HEAD.target = targetCommitId;
    }

    if (mode === 'hard') {
      this.state.stagingArea = [];
      this.state.workingDirectory = [];
    } else if (mode === 'mixed') {
      this.state.workingDirectory.push(...this.state.stagingArea.map(f => ({ ...f, status: 'modified' as const })));
      this.state.stagingArea = [];
    }

    this.addReflog('reset', `reset: moving to ${targetCommitId}`, targetCommitId);

    return {
      success: true,
      output: `HEAD is now at ${this.state.commits[targetCommitId].hash} ${this.state.commits[targetCommitId].message}`
    };
  }

  public revert(commitIdentifier: string): { success: boolean; output: string } {
    const target = Object.values(this.state.commits).find(
      c => c.id === commitIdentifier || c.hash.startsWith(commitIdentifier)
    );
    if (!target) {
      return { success: false, output: `fatal: bad revision '${commitIdentifier}'` };
    }

    this.commitCounter++;
    const newId = `c${this.commitCounter}`;
    const hash = this.generateHash();
    const currentCommitId = this.getCurrentCommitId();
    const currentBranch = this.getCurrentBranchName() || 'HEAD';

    const revertCommit: Commit = {
      id: newId,
      hash,
      message: `Revert "${target.message}"`,
      parents: [currentCommitId],
      branch: currentBranch,
      author: `${this.state.config['user.name'] || 'Developer'} <${this.state.config['user.email'] || 'dev@example.com'}>`,
      timestamp: Date.now(),
      files: { ...(this.state.commits[currentCommitId]?.files || {}) },
      treeHash: this.generateHash()
    };

    this.state.commits[newId] = revertCommit;
    if (this.state.HEAD.type === 'branch') {
      this.state.branches[currentBranch].targetCommitId = newId;
    } else {
      this.state.HEAD.target = newId;
    }

    this.addReflog('revert', `revert: Revert "${target.message}"`, newId);
    return {
      success: true,
      output: `[${currentBranch} ${hash}] Revert "${target.message}"\n 1 file changed, 1 deletion(-)`
    };
  }

  // --- 6. INSPECTION & DEBUGGING (DIFF, BLAME, BISECT) ---
  public diff(staged: boolean = false): { success: boolean; output: string } {
    if (staged) {
      if (this.state.stagingArea.length === 0) return { success: true, output: '' };
      return {
        success: true,
        output: `diff --git a/${this.state.stagingArea[0].name} b/${this.state.stagingArea[0].name}\n--- a/${this.state.stagingArea[0].name}\n+++ b/${this.state.stagingArea[0].name}\n@@ -1,2 +1,3 @@\n+ ${this.state.stagingArea[0].content}`
      };
    } else {
      if (this.state.workingDirectory.length === 0) return { success: true, output: '' };
      return {
        success: true,
        output: `diff --git a/${this.state.workingDirectory[0].name} b/${this.state.workingDirectory[0].name}\n--- a/${this.state.workingDirectory[0].name}\n+++ b/${this.state.workingDirectory[0].name}\n@@ -1 +1,2 @@\n+ ${this.state.workingDirectory[0].content}`
      };
    }
  }

  public blame(fileName: string): { success: boolean; output: string } {
    const commit = this.state.commits[this.getCurrentCommitId()];
    const author = this.state.config['user.name'] || 'Fatin Ishraque';
    return {
      success: true,
      output: `${commit?.hash || 'e82b71a'} (${author} 2026-11-05 1) // Content of ${fileName}\n${commit?.hash || 'e82b71a'} (${author} 2026-11-05 2) export default function init() {}\n${commit?.hash || 'e82b71a'} (${author} 2026-11-05 3) console.log("GitPlayGround ready");`
    };
  }

  public bisect(action: string, arg?: string): { success: boolean; output: string } {
    if (action === 'start') {
      this.state.bisectState = {
        active: true,
        testedCommits: [],
        badCommitId: this.getCurrentCommitId()
      };
      return {
        success: true,
        output: `status: waiting for good and bad commits\nBisecting: 6 revisions left to test after this (roughly 3 steps)`
      };
    }
    if (action === 'reset') {
      this.state.bisectState = null;
      return { success: true, output: `Bisect session reset. Back to HEAD.` };
    }
    return { success: true, output: `Bisecting: testing commit ${arg || 'c1'}` };
  }

  // --- 7. PRO-LEVEL GIT (REBASE -i, CHERRY-PICK, REFLOG) ---
  public rebase(baseBranch: string): { success: boolean; output: string } {
    const currentBranch = this.getCurrentBranchName();
    if (!currentBranch) {
      return { success: false, output: `fatal: You are in 'detached HEAD' state.` };
    }
    const base = this.state.branches[baseBranch];
    if (!base) {
      return { success: false, output: `fatal: invalid upstream '${baseBranch}'` };
    }

    const currentCommitId = this.state.branches[currentBranch].targetCommitId;
    const baseCommitId = base.targetCommitId;

    if (currentCommitId === baseCommitId) {
      return { success: true, output: `Current branch ${currentBranch} is up to date.` };
    }

    const branchCommits = this.getCommitsOnBranch(currentCommitId, baseCommitId);
    let parentId = baseCommitId;

    branchCommits.forEach(c => {
      this.commitCounter++;
      const rebasedId = `c${this.commitCounter}`;
      const rebasedCommit: Commit = {
        ...c,
        id: rebasedId,
        hash: this.generateHash(),
        parents: [parentId],
        branch: currentBranch,
        isRebase: true
      };
      this.state.commits[rebasedId] = rebasedCommit;
      parentId = rebasedId;
    });

    this.state.branches[currentBranch].targetCommitId = parentId;
    this.addReflog('rebase', `rebase (finish): returning to refs/heads/${currentBranch}`, parentId);

    return {
      success: true,
      output: `Successfully rebased and updated refs/heads/${currentBranch}.`
    };
  }

  public interactiveRebase(n: number = 3): { success: boolean; output: string } {
    return {
      success: true,
      output: `Executing interactive rebase against HEAD~${n}...\nCommands: pick, reword, edit, squash, fixup, drop\nSuccessfully squashed and rebased HEAD~${n}.`
    };
  }

  public cherryPick(commitIdentifier: string): { success: boolean; output: string } {
    const target = Object.values(this.state.commits).find(
      c => c.id === commitIdentifier || c.hash.startsWith(commitIdentifier)
    );

    if (!target) {
      return { success: false, output: `fatal: bad revision '${commitIdentifier}'` };
    }

    const currentCommitId = this.getCurrentCommitId();
    const currentBranch = this.getCurrentBranchName() || 'HEAD';

    this.commitCounter++;
    const newId = `c${this.commitCounter}`;
    const hash = this.generateHash();

    const newCommit: Commit = {
      ...target,
      id: newId,
      hash,
      parents: [currentCommitId],
      branch: currentBranch,
      message: `${target.message} (cherry picked from commit ${target.hash})`,
      timestamp: Date.now(),
      isCherryPick: true
    };

    this.state.commits[newId] = newCommit;

    if (this.state.HEAD.type === 'branch') {
      this.state.branches[currentBranch].targetCommitId = newId;
    } else {
      this.state.HEAD.target = newId;
    }

    this.addReflog('cherry-pick', `cherry-pick: ${newCommit.message}`, newId);

    return {
      success: true,
      output: `[${currentBranch} ${hash}] ${newCommit.message}`
    };
  }

  public reflog(): { success: boolean; output: string } {
    const lines = this.state.reflog.map((entry, idx) => {
      return `\x1b[33m${entry.commitHash}\x1b[0m \x1b[34mHEAD@{${idx}}:\x1b[0m ${entry.description}`;
    });
    return { success: true, output: lines.join('\n') };
  }

  public tag(name?: string): { success: boolean; output: string } {
    if (!name) {
      const tagList = Object.keys(this.state.tags).join('\n');
      return { success: true, output: tagList };
    }
    const curr = this.getCurrentCommitId();
    this.state.tags[name] = { name, targetCommitId: curr };
    return { success: true, output: `Created tag '${name}' at ${curr}` };
  }

  // --- 8. GITHUB CLI TOOLS (gh) ---
  public ghPrCreate(title: string, body: string): { success: boolean; output: string } {
    return {
      success: true,
      output: `Creating pull request for ${this.getCurrentBranchName() || 'main'} into main in n0vemberain/GitPlayGround\nhttps://github.com/n0vemberain/GitPlayGround/pull/1\nTitle: "${title || 'Feature update'}"\nBody: "${body || 'Details'}"`
    };
  }

  public ghRepoView(web: boolean = false): { success: boolean; output: string } {
    if (web) {
      return {
        success: true,
        output: `Opening github.com/n0vemberain/GitPlayGround in your browser...`
      };
    }
    return {
      success: true,
      output: `n0vemberain/GitPlayGround\nInteractive Animated Git & GitHub Learning Platform\nURL: https://github.com/n0vemberain/GitPlayGround`
    };
  }

  // --- Helpers ---
  private isAncestor(ancestorId: string, descendentId: string): boolean {
    if (ancestorId === descendentId) return true;
    const queue = [descendentId];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const id = queue.shift()!;
      if (id === ancestorId) return true;
      visited.add(id);
      const c = this.state.commits[id];
      if (c && c.parents) {
        c.parents.forEach(p => {
          if (!visited.has(p)) queue.push(p);
        });
      }
    }
    return false;
  }

  private getCommitsOnBranch(headId: string, baseId: string): Commit[] {
    const result: Commit[] = [];
    let curr: string | undefined = headId;
    while (curr && curr !== baseId && this.state.commits[curr]) {
      result.unshift(this.state.commits[curr]);
      curr = this.state.commits[curr].parents[0];
    }
    return result;
  }
}
