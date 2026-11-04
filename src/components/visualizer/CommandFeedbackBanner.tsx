import React from 'react';
import { Terminal, CheckCircle2, Info, X, ArrowRight } from 'lucide-react';

export interface CommandFeedback {
  command: string;
  explanationEn: string;
  explanationBn: string;
  affectedAreaEn: string;
  affectedAreaBn: string;
}

interface CommandFeedbackBannerProps {
  feedback: CommandFeedback | null;
  language: 'bn' | 'en';
  onDismiss: () => void;
}

export const CommandFeedbackBanner: React.FC<CommandFeedbackBannerProps> = ({
  feedback,
  language,
  onDismiss
}) => {
  if (!feedback) return null;

  return (
    <div className="bg-gh-canvas-subtle border-b border-gh-border p-3.5 flex items-start justify-between animate-in slide-in-from-top duration-200 select-none shadow-md">
      <div className="flex items-start space-x-3">
        <div className="w-7 h-7 rounded-md bg-gh-accent/15 border border-gh-accent/30 flex items-center justify-center text-gh-accent shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </div>

        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold text-gh-success-fg uppercase tracking-wide flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'কমান্ড এক্সিকিউট হয়েছে:' : 'Command Executed:'}</span>
            </span>
            <code className="text-xs font-mono font-bold bg-gh-canvas-inset px-2 py-0.5 rounded text-white border border-gh-border">
              {feedback.command}
            </code>
          </div>

          <div className="text-xs text-gh-text leading-relaxed">
            <strong className="text-gh-accent font-semibold">
              {language === 'bn' ? 'অভ্যন্তরে কী ঘটলো: ' : 'Under the Hood: '}
            </strong>
            <span>{language === 'bn' ? feedback.explanationBn : feedback.explanationEn}</span>
          </div>

          <div className="text-[11px] text-gh-text-muted flex items-center space-x-1">
            <span>{language === 'bn' ? 'প্রভাবিত অঞ্চল:' : 'Affected Area:'}</span>
            <span className="text-gh-attention-fg font-medium">
              {language === 'bn' ? feedback.affectedAreaBn : feedback.affectedAreaEn}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onDismiss}
        className="text-gh-text-muted hover:text-white p-1 rounded hover:bg-gh-border/50 transition shrink-0 ml-3"
        title="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
