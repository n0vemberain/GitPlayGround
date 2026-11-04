import React, { useState } from 'react';
import { AlertTriangle, Check, Layers, GitMerge } from 'lucide-react';
import { ConflictState } from '../../types/git';

interface ConflictModalProps {
  conflict: ConflictState;
  onResolve: (resolvedCode: string) => void;
  onAbort: () => void;
  language: 'bn' | 'en';
}

export const ConflictModal: React.FC<ConflictModalProps> = ({
  conflict,
  onResolve,
  onAbort,
  language
}) => {
  const [content, setContent] = useState<string>(
    `// CONFLICT in ${conflict.filename}\n<<<<<<< ${conflict.ourBranch}\n${conflict.ourCode}\n=======\n${conflict.theirCode}\n>>>>>>> ${conflict.theirBranch}`
  );

  const chooseOur = () => setContent(conflict.ourCode);
  const chooseTheir = () => setContent(conflict.theirCode);
  const chooseBoth = () => setContent(`${conflict.ourCode}\n// and\n${conflict.theirCode}`);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-2xl bg-gh-canvas border border-gh-border rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="bg-gh-attention/15 border-b border-gh-border p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5 text-gh-attention-fg">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div>
              <div className="font-bold text-sm text-gh-text">
                {language === 'bn' ? 'মার্জ কনফ্লিক্ট সমাধান করুন' : 'Resolve Merge Conflict'}
              </div>
              <div className="text-xs text-gh-text-muted font-mono">{conflict.filename}</div>
            </div>
          </div>
          <button
            onClick={onAbort}
            className="text-xs text-gh-text-muted hover:text-white px-2.5 py-1 rounded bg-gh-canvas-subtle border border-gh-border"
          >
            {language === 'bn' ? 'বাতিল' : 'Abort'}
          </button>
        </div>

        {/* Quick Resolution Action Buttons */}
        <div className="p-3 bg-gh-canvas-subtle border-b border-gh-border flex flex-wrap gap-2 text-xs">
          <button
            onClick={chooseOur}
            className="px-3 py-1.5 rounded-md bg-gh-canvas border border-gh-border hover:border-gh-accent text-gh-accent font-semibold transition flex items-center space-x-1"
          >
            <span>Accept Current ({conflict.ourBranch})</span>
          </button>
          <button
            onClick={chooseTheir}
            className="px-3 py-1.5 rounded-md bg-gh-canvas border border-gh-border hover:border-gh-purple text-gh-purple-fg font-semibold transition flex items-center space-x-1"
          >
            <span>Accept Incoming ({conflict.theirBranch})</span>
          </button>
          <button
            onClick={chooseBoth}
            className="px-3 py-1.5 rounded-md bg-gh-canvas border border-gh-border hover:border-gh-border-active text-gh-text font-medium transition"
          >
            <span>Accept Both Changes</span>
          </button>
        </div>

        {/* Code Diff Editor */}
        <div className="p-4 flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-56 bg-gh-canvas-inset border border-gh-border rounded-lg p-3 font-mono text-xs text-gh-text focus:outline-none focus:border-gh-accent resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Footer */}
        <div className="p-4 bg-gh-canvas-subtle border-t border-gh-border flex items-center justify-between">
          <span className="text-xs text-gh-text-muted">
            {language === 'bn'
              ? 'কমিট সম্পন্ন করতে "Mark Resolved & Commit" বাটনে চাপুন।'
              : 'Click to mark as resolved and complete the merge commit.'}
          </span>
          <button
            onClick={() => onResolve(content)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-md bg-gh-success hover:bg-gh-success-emphasis text-white text-xs font-bold shadow-md transition"
          >
            <Check className="w-4 h-4" />
            <span>{language === 'bn' ? 'কনফ্লিক্ট সমাধান ও কমিট' : 'Mark Resolved & Commit'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
