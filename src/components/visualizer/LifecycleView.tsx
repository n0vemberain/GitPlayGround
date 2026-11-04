import React from 'react';
import { GitState, FileItem } from '../../types/git';
import { FolderGit2, Layers, CheckCircle2, ArrowRight, FileCode, PlusCircle, RotateCcw } from 'lucide-react';

interface LifecycleViewProps {
  gitState: GitState;
  onQuickAdd?: (filename: string) => void;
}

export const LifecycleView: React.FC<LifecycleViewProps> = ({ gitState, onQuickAdd }) => {
  const currentCommit = gitState.commits[
    gitState.HEAD.type === 'branch'
      ? gitState.branches[gitState.HEAD.target]?.targetCommitId || 'c1'
      : gitState.HEAD.target
  ];

  const committedFiles = currentCommit ? Object.keys(currentCommit.files) : [];

  return (
    <div className="h-44 border-t border-gh-border bg-gh-canvas p-3 flex flex-col justify-between select-none">
      <div className="flex items-center justify-between text-xs mb-2">
        <span className="font-semibold text-gh-text flex items-center space-x-1.5">
          <Layers className="w-3.5 h-3.5 text-gh-accent" />
          <span>3-Tier Architecture Lifecycle</span>
        </span>
        <span className="text-[11px] text-gh-text-muted font-mono">Working Tree ➔ Index / Staging ➔ HEAD</span>
      </div>

      <div className="grid grid-cols-3 gap-3 flex-1 overflow-hidden">
        {/* Tier 1: Working Directory */}
        <div className="bg-gh-canvas-subtle border border-gh-border rounded-md p-2 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-semibold text-gh-text-muted border-b border-gh-border/50 pb-1 mb-1">
            <span className="flex items-center space-x-1 text-rose-400">
              <FolderGit2 className="w-3 h-3" />
              <span>Working Directory</span>
            </span>
            <span className="bg-rose-500/10 text-rose-400 font-mono px-1.5 rounded text-[10px]">
              {gitState.workingDirectory.length}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1">
            {gitState.workingDirectory.length === 0 ? (
              <div className="text-[10px] text-gh-text-subtle italic text-center mt-3">Clean working directory</div>
            ) : (
              gitState.workingDirectory.map(file => (
                <div key={file.name} className="flex items-center justify-between bg-gh-canvas px-2 py-1 rounded text-[11px] border border-gh-border/40">
                  <span className="font-mono text-rose-300 truncate">{file.name}</span>
                  {onQuickAdd && (
                    <button
                      onClick={() => onQuickAdd(file.name)}
                      className="text-gh-accent hover:text-white p-0.5"
                      title="Run git add"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tier 2: Staging Area (Index) */}
        <div className="bg-gh-canvas-subtle border border-gh-border rounded-md p-2 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-semibold text-gh-text-muted border-b border-gh-border/50 pb-1 mb-1">
            <span className="flex items-center space-x-1 text-emerald-400">
              <Layers className="w-3 h-3" />
              <span>Staging Area (.git/index)</span>
            </span>
            <span className="bg-emerald-500/10 text-emerald-400 font-mono px-1.5 rounded text-[10px]">
              {gitState.stagingArea.length}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1">
            {gitState.stagingArea.length === 0 ? (
              <div className="text-[10px] text-gh-text-subtle italic text-center mt-3">No staged changes</div>
            ) : (
              gitState.stagingArea.map(file => (
                <div key={file.name} className="flex items-center justify-between bg-gh-canvas px-2 py-1 rounded text-[11px] border border-gh-border/40">
                  <span className="font-mono text-emerald-300 truncate">{file.name}</span>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1 rounded">staged</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tier 3: Repository (Committed in HEAD) */}
        <div className="bg-gh-canvas-subtle border border-gh-border rounded-md p-2 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between text-[11px] font-semibold text-gh-text-muted border-b border-gh-border/50 pb-1 mb-1">
            <span className="flex items-center space-x-1 text-gh-accent">
              <CheckCircle2 className="w-3 h-3" />
              <span>Committed (HEAD: {currentCommit?.hash || 'c1'})</span>
            </span>
            <span className="bg-gh-accent/10 text-gh-accent font-mono px-1.5 rounded text-[10px]">
              {committedFiles.length}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1">
            {committedFiles.map(filename => (
              <div key={filename} className="flex items-center justify-between bg-gh-canvas px-2 py-1 rounded text-[11px] border border-gh-border/40">
                <span className="font-mono text-gh-text truncate">{filename}</span>
                <span className="text-[9px] text-gh-text-muted">committed</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
