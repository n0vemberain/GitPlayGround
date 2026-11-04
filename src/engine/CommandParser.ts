import { VirtualGit } from './VirtualGit';

export interface CommandResult {
  output: string;
  isError: boolean;
  clearTerminal?: boolean;
}

export class CommandParser {
  private git: VirtualGit;

  constructor(gitInstance: VirtualGit) {
    this.git = gitInstance;
  }

  public setGitInstance(gitInstance: VirtualGit) {
    this.git = gitInstance;
  }

  public execute(rawInput: string): CommandResult {
    const trimmed = rawInput.trim();
    if (!trimmed) {
      return { output: '', isError: false };
    }

    if (trimmed === 'clear') {
      return { output: '', isError: false, clearTerminal: true };
    }

    if (trimmed === 'help') {
      return {
        output: `Available Commands in GitPlayGround (40 Commands in 8 Levels):
  1. Setup & Config:     git config --global user.name / user.email, git init, git clone
  2. Basic Workflow:     git status, git add, git commit -m / -am, git log --oneline --graph --all
  3. Branching & Merge:  git branch, git switch -c, git switch, git merge, git branch -d, git branch -m
  4. Remote & Sync:      git remote add, git push -u, git push, git fetch, git pull, git remote prune
  5. Undoing & Stash:    git restore, git restore --staged, git stash, git stash pop, git clean -fd, git reset --soft/--hard, git revert
  6. Inspection/Debug:   git diff, git diff --staged, git blame, git bisect start
  7. Pro Git:            git commit --amend, git rebase -i, git cherry-pick, git reflog
  8. GitHub CLI (gh):    gh pr create, gh repo view --web`,
        isError: false
      };
    }

    if (trimmed === 'ls') {
      const state = this.git.getState();
      const files = [
        ...state.workingDirectory.map(f => f.name),
        ...state.stagingArea.map(f => f.name)
      ];
      return { output: files.length > 0 ? files.join('   ') : 'README.md   index.html   app.js', isError: false };
    }

    // --- GitHub CLI (gh) Commands ---
    if (trimmed.startsWith('gh ')) {
      const ghArgs = this.tokenize(trimmed.substring(3).trim());
      const sub = ghArgs[0];

      if (sub === 'pr' && ghArgs[1] === 'create') {
        let title = 'feature update';
        let body = 'details';
        for (let i = 2; i < ghArgs.length; i++) {
          if (ghArgs[i] === '--title' && ghArgs[i + 1]) {
            title = ghArgs[i + 1];
            i++;
          } else if (ghArgs[i] === '--body' && ghArgs[i + 1]) {
            body = ghArgs[i + 1];
            i++;
          }
        }
        const res = this.git.ghPrCreate(title, body);
        return { output: res.output, isError: !res.success };
      }

      if (sub === 'repo' && ghArgs[1] === 'view') {
        const isWeb = ghArgs.includes('--web');
        const res = this.git.ghRepoView(isWeb);
        return { output: res.output, isError: !res.success };
      }

      return {
        output: `gh: unrecognized gh command '${trimmed}'. Try 'gh pr create' or 'gh repo view --web'.`,
        isError: true
      };
    }

    if (!trimmed.startsWith('git')) {
      return {
        output: `command not found: ${trimmed.split(' ')[0]}. Try "git <command>" or "help".`,
        isError: true
      };
    }

    // Split git arguments preserving quotes
    const args = this.tokenize(trimmed.substring(4).trim());
    if (args.length === 0) {
      return {
        output: 'usage: git [--version] [--help] [-C <path>] [-c <name>=<value>]\n           <command> [<args>]',
        isError: false
      };
    }

    const subCommand = args[0];

    try {
      switch (subCommand) {
        // --- 1. SETUP & CONFIG ---
        case 'config': {
          let isGlobal = false;
          let key = '';
          let value = '';

          for (let i = 1; i < args.length; i++) {
            if (args[i] === '--global') isGlobal = true;
            else if (args[i] === '--list' || args[i] === '-l') {
              return { output: this.git.getConfig().output, isError: false };
            } else if (!key) {
              key = args[i];
            } else if (!value) {
              value = args[i];
            }
          }

          if (key && value) {
            const res = this.git.setConfig(key, value);
            return { output: res.output, isError: !res.success };
          }
          if (key) {
            const res = this.git.getConfig(key);
            return { output: res.output, isError: !res.success };
          }
          return { output: this.git.getConfig().output, isError: false };
        }

        case 'init': {
          const res = this.git.init();
          return { output: res.output, isError: !res.success };
        }

        case 'clone': {
          const url = args[1] || 'https://github.com/n0vemberain/GitPlayGround.git';
          const res = this.git.clone(url);
          return { output: res.output, isError: !res.success };
        }

        // --- 2. BASIC WORKFLOW ---
        case 'status': {
          const res = this.git.status();
          return { output: res.output, isError: !res.success };
        }

        case 'add': {
          const target = args[1] || '.';
          const res = this.git.add(target);
          return { output: res.output, isError: !res.success };
        }

        case 'commit': {
          let message = 'Update';
          let isAmend = false;
          let isAllModified = false;

          for (let i = 1; i < args.length; i++) {
            if ((args[i] === '-m' || args[i] === '-am') && args[i + 1]) {
              message = args[i + 1];
              if (args[i] === '-am') isAllModified = true;
              i++;
            } else if (args[i] === '--amend') {
              isAmend = true;
            } else if (args[i].startsWith('-m=')) {
              message = args[i].substring(3);
            } else if (args[i].startsWith('-am=')) {
              message = args[i].substring(4);
              isAllModified = true;
            }
          }

          if (isAllModified) {
            const res = this.git.commitAll(message);
            return { output: res.output, isError: !res.success };
          }

          const res = this.git.commit(message, isAmend);
          return { output: res.output, isError: !res.success };
        }

        case 'log': {
          const isCompact = args.includes('--oneline');
          const res = this.git.log(isCompact);
          return { output: res.output, isError: !res.success };
        }

        // --- 3. BRANCHING & MERGING ---
        case 'branch': {
          if (args[1] === '-d' || args[1] === '-D') {
            const delName = args[2];
            const res = this.git.branch(undefined, delName);
            return { output: res.output, isError: !res.success };
          }
          if (args[1] === '-m') {
            const oldName = args[2];
            const newName = args[3];
            if (!newName) {
              // rename current branch to oldName
              const curr = this.git.getCurrentBranchName() || 'main';
              const res = this.git.renameBranch(curr, oldName);
              return { output: res.output, isError: !res.success };
            }
            const res = this.git.renameBranch(oldName, newName);
            return { output: res.output, isError: !res.success };
          }
          const branchName = args[1];
          const res = this.git.branch(branchName);
          return { output: res.output, isError: !res.success };
        }

        case 'checkout':
        case 'switch': {
          if (args[1] === '-b' || args[1] === '-c') {
            const newBranch = args[2];
            if (!newBranch) {
              return { output: 'fatal: missing branch name', isError: true };
            }
            const res = this.git.checkout(newBranch, true);
            return { output: res.output, isError: !res.success };
          }
          const target = args[1];
          if (!target) {
            return { output: 'fatal: missing branch or commit argument', isError: true };
          }
          const res = this.git.checkout(target, false);
          return { output: res.output, isError: !res.success };
        }

        case 'merge': {
          const targetBranch = args[1];
          if (!targetBranch) {
            return { output: 'fatal: No remote repository specified to merge.', isError: true };
          }
          const res = this.git.merge(targetBranch);
          return { output: res.output, isError: !res.success };
        }

        // --- 4. REMOTE & SYNC ---
        case 'remote': {
          if (args[1] === 'add') {
            const name = args[2] || 'origin';
            const url = args[3] || 'https://github.com/n0vemberain/GitPlayGround.git';
            const res = this.git.remoteAdd(name, url);
            return { output: res.output, isError: !res.success };
          }
          if (args[1] === 'prune') {
            const name = args[2] || 'origin';
            const res = this.git.remotePrune(name);
            return { output: res.output, isError: !res.success };
          }
          return { output: 'origin', isError: false };
        }

        case 'push': {
          let remote = 'origin';
          let branch: string | undefined = undefined;

          for (let i = 1; i < args.length; i++) {
            if (args[i] === '-u') {
              remote = args[i + 1] || 'origin';
              branch = args[i + 2];
              i += 2;
            } else if (!branch && args[i] !== 'origin') {
              branch = args[i];
            }
          }
          const res = this.git.push(remote, branch);
          return { output: res.output, isError: !res.success };
        }

        case 'fetch': {
          const remote = args[1] || 'origin';
          const res = this.git.fetch(remote);
          return { output: res.output, isError: !res.success };
        }

        case 'pull': {
          const res = this.git.pull();
          return { output: res.output, isError: !res.success };
        }

        // --- 5. UNDOING & STASHING ---
        case 'restore': {
          const isStaged = args.includes('--staged');
          const targetFile = args.find(a => !a.startsWith('--') && a !== 'restore') || 'app.js';
          const res = this.git.restore(targetFile, isStaged);
          return { output: res.output, isError: !res.success };
        }

        case 'stash': {
          if (args[1] === 'pop') {
            const res = this.git.stashPop();
            return { output: res.output, isError: !res.success };
          }
          const res = this.git.stash();
          return { output: res.output, isError: !res.success };
        }

        case 'clean': {
          const res = this.git.clean();
          return { output: res.output, isError: !res.success };
        }

        case 'reset': {
          let mode: 'soft' | 'mixed' | 'hard' = 'mixed';
          let target = 'HEAD';

          for (let i = 1; i < args.length; i++) {
            if (args[i] === '--soft') mode = 'soft';
            else if (args[i] === '--hard') mode = 'hard';
            else if (args[i] === '--mixed') mode = 'mixed';
            else target = args[i];
          }

          const res = this.git.reset(mode, target);
          return { output: res.output, isError: !res.success };
        }

        case 'revert': {
          const commit = args[1] || 'HEAD';
          const res = this.git.revert(commit);
          return { output: res.output, isError: !res.success };
        }

        // --- 6. INSPECTION & DEBUGGING ---
        case 'diff': {
          const isStaged = args.includes('--staged');
          const res = this.git.diff(isStaged);
          return { output: res.output || 'No differences found.', isError: false };
        }

        case 'blame': {
          const fileName = args[1] || 'README.md';
          const res = this.git.blame(fileName);
          return { output: res.output, isError: !res.success };
        }

        case 'bisect': {
          const action = args[1] || 'start';
          const arg = args[2];
          const res = this.git.bisect(action, arg);
          return { output: res.output, isError: !res.success };
        }

        // --- 7. PRO-LEVEL GIT ---
        case 'rebase': {
          if (args[1] === '-i' || args[1] === '--interactive') {
            const target = args[2] || 'HEAD~3';
            const count = parseInt(target.replace('HEAD~', ''), 10) || 3;
            const res = this.git.interactiveRebase(count);
            return { output: res.output, isError: !res.success };
          }
          const baseBranch = args[1];
          if (!baseBranch) {
            return { output: 'fatal: No upstream branch specified to rebase against.', isError: true };
          }
          const res = this.git.rebase(baseBranch);
          return { output: res.output, isError: !res.success };
        }

        case 'cherry-pick': {
          const commit = args[1];
          if (!commit) {
            return { output: 'fatal: commit revision is required for cherry-pick.', isError: true };
          }
          const res = this.git.cherryPick(commit);
          return { output: res.output, isError: !res.success };
        }

        case 'reflog': {
          const res = this.git.reflog();
          return { output: res.output, isError: !res.success };
        }

        case 'tag': {
          const tagName = args[1];
          const res = this.git.tag(tagName);
          return { output: res.output, isError: !res.success };
        }

        default:
          return {
            output: `git: '${subCommand}' is not a git command. See 'help'.`,
            isError: true
          };
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return { output: `error: ${message}`, isError: true };
    }
  }

  private tokenize(str: string): string[] {
    const tokens: string[] = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = '';

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if ((char === '"' || char === "'") && (!inQuotes || quoteChar === char)) {
        inQuotes = !inQuotes;
        quoteChar = inQuotes ? char : '';
      } else if (char === ' ' && !inQuotes) {
        if (current.length > 0) {
          tokens.push(current);
          current = '';
        }
      } else {
        current += char;
      }
    }

    if (current.length > 0) {
      tokens.push(current);
    }

    return tokens;
  }
}
