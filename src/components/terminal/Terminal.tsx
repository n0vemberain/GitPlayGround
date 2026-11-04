import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Trash2 } from 'lucide-react';
import { CommandParser } from '../../engine/CommandParser';
import { VirtualGit } from '../../engine/VirtualGit';

interface TerminalProps {
  git: VirtualGit;
  onCommandExecuted: (command: string) => void;
  quickCommandToRun?: string;
  onClearQuickCommand?: () => void;
}

interface HistoryItem {
  id: string;
  command: string;
  output: string;
  isError: boolean;
  timestamp: number;
}

const COMMON_COMMANDS = [
  'git status',
  'git add .',
  'git commit -m ""',
  'git branch',
  'git checkout -b',
  'git merge',
  'git rebase',
  'git cherry-pick',
  'git reset --soft HEAD~1',
  'git reflog',
  'git log',
  'git push origin main',
  'clear',
  'help'
];

export const Terminal: React.FC<TerminalProps> = ({
  git,
  onCommandExecuted,
  quickCommandToRun,
  onClearQuickCommand
}) => {
  const [parser] = useState(() => new CommandParser(git));
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'init-1',
      command: 'git status',
      output: `On branch main\nYour branch is up to date with 'origin/main'.\n\nnothing to commit, working tree clean`,
      isError: false,
      timestamp: Date.now()
    }
  ]);
  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const [commandHistoryList, setCommandHistoryList] = useState<string[]>(['git status']);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Sync parser with latest git instance
  useEffect(() => {
    parser.setGitInstance(git);
  }, [git, parser]);

  // Handle external one-click quick commands from lessons
  useEffect(() => {
    if (quickCommandToRun) {
      runCommand(quickCommandToRun);
      if (onClearQuickCommand) onClearQuickCommand();
    }
  }, [quickCommandToRun]);

  // Scroll to bottom on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const result = parser.execute(trimmed);

    if (result.clearTerminal) {
      setHistory([]);
    } else {
      setHistory(prev => [
        ...prev,
        {
          id: `cmd-${Date.now()}-${Math.random()}`,
          command: trimmed,
          output: result.output,
          isError: result.isError,
          timestamp: Date.now()
        }
      ]);
    }

    setCommandHistoryList(prev => [trimmed, ...prev]);
    setCommandIndex(-1);
    setInput('');
    onCommandExecuted(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistoryList.length > 0 && commandIndex < commandHistoryList.length - 1) {
        const nextIndex = commandIndex + 1;
        setCommandIndex(nextIndex);
        setInput(commandHistoryList[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex > 0) {
        const nextIndex = commandIndex - 1;
        setCommandIndex(nextIndex);
        setInput(commandHistoryList[nextIndex]);
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Autocomplete command or branch
      const trimmed = input.trim();
      const match = COMMON_COMMANDS.find(c => c.startsWith(trimmed));
      if (match) {
        setInput(match);
      } else {
        // Autocomplete branch names
        const branches = Object.keys(git.getState().branches);
        const lastWord = input.split(' ').pop() || '';
        const branchMatch = branches.find(b => b.startsWith(lastWord));
        if (branchMatch) {
          const parts = input.split(' ');
          parts[parts.length - 1] = branchMatch;
          setInput(parts.join(' '));
        }
      }
    }
  };

  const currentBranch = git.getCurrentBranchName() || 'detached';

  return (
    <div 
      className="flex-1 flex flex-col bg-gh-canvas-inset font-mono text-xs overflow-hidden select-text border-t border-gh-border/60"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal Title Bar */}
      <div className="h-9 bg-gh-canvas-subtle border-b border-gh-border px-3 flex items-center justify-between text-gh-text-muted select-none">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-3.5 h-3.5 text-gh-accent" />
          <span className="font-semibold text-gh-text text-[11px]">GitPlayGround Interactive Shell</span>
          <span className="text-[10px] bg-gh-border/50 text-gh-accent px-1.5 py-0.5 rounded">
            branch: {currentBranch}
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setHistory([]); }}
          className="p-1 hover:text-white hover:bg-gh-border/40 rounded transition"
          title="Clear Terminal"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Terminal History Logs */}
      <div className="flex-1 p-3 overflow-y-auto space-y-2.5 custom-scrollbar">
        <div className="text-gh-text-muted text-[11px]">
          Type <span className="text-gh-accent font-semibold">help</span> to view available commands. Press <span className="text-gh-accent font-semibold">Tab</span> for autocomplete.
        </div>

        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center space-x-2 text-gh-text font-medium">
              <span className="text-gh-success-fg">➜</span>
              <span className="text-gh-accent">gitplayground</span>
              <span className="text-gh-text-subtle font-mono text-[10px]">({currentBranch})</span>
              <span className="text-white">$ {item.command}</span>
            </div>
            {item.output && (
              <pre
                className={`whitespace-pre-wrap pl-5 text-[11px] leading-relaxed ${
                  item.isError ? 'text-gh-danger-fg' : 'text-gh-text-muted'
                }`}
              >
                {item.output}
              </pre>
            )}
          </div>
        ))}

        {/* Active Command Line Input */}
        <div className="flex items-center space-x-2 text-gh-text pt-1">
          <span className="text-gh-success-fg font-bold">➜</span>
          <span className="text-gh-accent font-semibold">gitplayground</span>
          <span className="text-gh-text-subtle text-[10px]">({currentBranch})</span>
          <span className="text-gh-text">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-white font-mono placeholder:text-gh-text-subtle"
            placeholder="git commit -m 'feat: my changes'..."
            autoFocus
            spellCheck={false}
          />
          <CornerDownLeft className="w-3 h-3 text-gh-text-subtle mr-1" />
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  );
};
