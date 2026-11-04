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
        output: `Available Git Commands in GitPlayGround:
  git init                       Initialize new repository
  git status                     Show the working tree status
  git add <file> | . | -A        Add file contents to the staging area
  git commit -m "<msg>"          Record changes to the repository
  git commit --amend -m "<msg>"  Amend the previous commit
  git branch [<name>] [-d <name>]List, create, or delete branches
  git checkout <branch> | -b <br>Switch branches or create new branch
  git switch <branch> | -c <br>  Switch branches
  git merge <branch>             Join two or more development histories together
  git rebase <branch>            Reapply commits on top of another base tip
  git cherry-pick <commit>       Apply changes from existing commit
  git reset [--soft|--mixed|--hard] Reset current HEAD to specified state
  git reflog                     Manage reflog information
  git log                        Show commit logs
  git tag [<name>]               Create or list tags
  git push [remote] [branch]     Update remote refs along with associated objects
  clear                          Clear the terminal screen
  help                           Display this help manual`,
        isError: false
      };
    }

    if (trimmed === 'ls') {
      const state = this.git.getState();
      const files = [
        ...state.workingDirectory.map(f => f.name),
        ...state.stagingArea.map(f => f.name)
      ];
      return { output: files.length > 0 ? files.join('   ') : 'README.md   index.html', isError: false };
    }

    if (!trimmed.startsWith('git')) {
      return {
        output: `command not found: ${trimmed.split(' ')[0]}. Try "git <command>" or "help".`,
        isError: true
      };
    }

    // Split arguments while preserving quoted strings
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
        case 'init': {
          const res = this.git.init();
          return { output: res.output, isError: !res.success };
        }
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

          for (let i = 1; i < args.length; i++) {
            if (args[i] === '-m' && args[i + 1]) {
              message = args[i + 1];
              i++;
            } else if (args[i] === '--amend') {
              isAmend = true;
            } else if (args[i].startsWith('-m=')) {
              message = args[i].substring(3);
            }
          }
          const res = this.git.commit(message, isAmend);
          return { output: res.output, isError: !res.success };
        }
        case 'branch': {
          if (args[1] === '-d' || args[1] === '-D') {
            const delName = args[2];
            const res = this.git.branch(undefined, delName);
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
              return { output: 'fatal: missing branch name for -b', isError: true };
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
        case 'rebase': {
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
        case 'reflog': {
          const res = this.git.reflog();
          return { output: res.output, isError: !res.success };
        }
        case 'log': {
          const res = this.git.log();
          return { output: res.output, isError: !res.success };
        }
        case 'tag': {
          const tagName = args[1];
          const res = this.git.tag(tagName);
          return { output: res.output, isError: !res.success };
        }
        case 'push': {
          const remote = args[1] && !args[1].startsWith('-') ? args[1] : 'origin';
          let branch = args[2];
          if (args[1] === '-u') {
            branch = args[3];
          }
          const res = this.git.push(remote, branch);
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
