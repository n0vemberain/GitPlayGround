import React from 'react';
import { User, Mail, ShieldCheck, FileCode, CheckCircle2 } from 'lucide-react';
import { GitState } from '../../types/git';

interface ConfigCardProps {
  gitState: GitState;
  language: 'bn' | 'en';
}

export const ConfigCard: React.FC<ConfigCardProps> = ({ gitState, language }) => {
  const userName = gitState.config['user.name'] || 'Not Configured';
  const userEmail = gitState.config['user.email'] || 'Not Configured';
  const isNameSet = Boolean(gitState.config['user.name']);
  const isEmailSet = Boolean(gitState.config['user.email']);

  return (
    <div className="bg-gh-canvas-subtle border border-gh-border rounded-xl p-4 shadow-lg mb-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center justify-between border-b border-gh-border/60 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gh-accent/15 border border-gh-accent/30 flex items-center justify-center text-gh-accent">
            <User className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-gh-text flex items-center space-x-1.5">
              <span>{language === 'bn' ? 'গিট গ্লোবাল আইডেন্টিটি (Git Identity)' : 'Git Global Identity'}</span>
              {(isNameSet && isEmailSet) && (
                <ShieldCheck className="w-3.5 h-3.5 text-gh-success-fg" />
              )}
            </div>
            <div className="text-[10px] text-gh-text-muted font-mono">~/.gitconfig</div>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gh-accent/10 text-gh-accent border border-gh-accent/20">
          Global Scope
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* User Card */}
        <div className="bg-gh-canvas border border-gh-border/80 rounded-lg p-3 space-y-2">
          <div className="text-[11px] font-semibold text-gh-text-muted uppercase tracking-wider flex items-center justify-between">
            <span>{language === 'bn' ? 'কমিট লেখক পরিচিতি' : 'Commit Author Signature'}</span>
            {isNameSet ? (
              <span className="text-[10px] text-gh-success-fg flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>{language === 'bn' ? 'সেট করা হয়েছে' : 'Active'}</span>
              </span>
            ) : (
              <span className="text-[10px] text-gh-attention-fg">Missing user.name</span>
            )}
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <User className="w-3.5 h-3.5 text-gh-accent shrink-0" />
            <span className="font-semibold text-gh-text truncate">
              {userName}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <Mail className="w-3.5 h-3.5 text-gh-text-muted shrink-0" />
            <span className="font-mono text-[11px] text-gh-text-muted truncate">
              {userEmail}
            </span>
          </div>
        </div>

        {/* Live ~/.gitconfig File Preview */}
        <div className="bg-gh-canvas-inset border border-gh-border/80 rounded-lg p-3">
          <div className="text-[10px] font-semibold text-gh-text-muted uppercase mb-1.5 flex items-center space-x-1">
            <FileCode className="w-3 h-3 text-gh-accent" />
            <span>~/.gitconfig File Content</span>
          </div>
          <pre className="font-mono text-[11px] leading-relaxed text-gh-text-subtle overflow-x-auto">
            <span className="text-gh-purple font-bold">[user]</span>{'\n'}
            {'    '}name = <span className="text-emerald-400 font-semibold">"{userName}"</span>{'\n'}
            {'    '}email = <span className="text-emerald-400 font-semibold">"{userEmail}"</span>
          </pre>
        </div>
      </div>
    </div>
  );
};
