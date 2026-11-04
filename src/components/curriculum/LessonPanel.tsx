import React from 'react';
import { Lesson, Level } from '../../types/curriculum';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Play, 
  ExternalLink, 
  ChevronRight, 
  ChevronLeft, 
  Lightbulb, 
  Terminal,
  Trophy
} from 'lucide-react';

interface LessonPanelProps {
  currentLevel: Level;
  currentLesson: Lesson;
  language: 'bn' | 'en';
  onQuickRunCommand: (command: string) => void;
  onNextLesson: () => void;
  onPrevLesson: () => void;
  isAllTasksComplete: boolean;
  hasNextLesson: boolean;
  hasPrevLesson: boolean;
}

export const LessonPanel: React.FC<LessonPanelProps> = ({
  currentLevel,
  currentLesson,
  language,
  onQuickRunCommand,
  onNextLesson,
  onPrevLesson,
  isAllTasksComplete,
  hasNextLesson,
  hasPrevLesson
}) => {
  return (
    <div className="flex-1 flex flex-col bg-gh-canvas overflow-y-auto p-4 select-none custom-scrollbar">
      {/* Level & Video Source Pill */}
      <div className="flex items-center justify-between border-b border-gh-border/60 pb-3 mb-3">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-xs font-bold text-gh-accent bg-gh-accent/10 px-2 py-0.5 rounded border border-gh-accent/20">
            Level {currentLevel.number}
          </span>
          <span className="text-xs text-gh-text-muted">
            {language === 'bn' ? currentLevel.subtitleBn : currentLevel.subtitleEn}
          </span>
        </div>

        {currentLesson.videoUrl && (
          <a
            href={currentLesson.videoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 text-[11px] text-gh-attention-fg hover:underline bg-gh-attention/10 px-2 py-0.5 rounded border border-gh-attention/20 transition"
            title="Watch in YouTube course"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Video ({currentLesson.videoTimestamp || 'YouTube'})</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        )}
      </div>

      {/* Lesson Title */}
      <div className="mb-3">
        <h2 className="text-base font-bold text-gh-text tracking-tight flex items-center space-x-2">
          <BookOpen className="w-4 h-4 text-gh-accent" />
          <span>{language === 'bn' ? currentLesson.titleBn : currentLesson.titleEn}</span>
        </h2>
        <p className="text-xs text-gh-text-muted mt-1 leading-relaxed">
          {language === 'bn' ? currentLesson.summaryBn : currentLesson.summaryEn}
        </p>
      </div>

      {/* Conceptual Explanation Box */}
      <div className="bg-gh-canvas-subtle border border-gh-border rounded-lg p-3.5 mb-4 text-xs leading-relaxed text-gh-text">
        <div className="whitespace-pre-line">
          {language === 'bn' ? currentLesson.explanationBn : currentLesson.explanationEn}
        </div>
      </div>

      {/* Interactive Objectives Checklist */}
      <div className="border border-gh-border rounded-lg p-3.5 bg-gh-canvas-inset mb-4">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-gh-text flex items-center space-x-1.5">
            <Trophy className="w-3.5 h-3.5 text-gh-attention-fg" />
            <span>{language === 'bn' ? 'চ্যালেঞ্জ অবজেক্টিভস' : 'Challenge Objectives'}</span>
          </span>
          {isAllTasksComplete && (
            <span className="text-[11px] font-semibold text-gh-success-fg flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'bn' ? 'সম্পন্ন হয়েছে!' : 'Completed!'}</span>
            </span>
          )}
        </div>

        <div className="space-y-2">
          {currentLesson.tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-start space-x-2.5 p-2 rounded-md text-xs transition border ${
                task.isCompleted
                  ? 'bg-gh-success/10 border-gh-success/30 text-gh-text'
                  : 'bg-gh-canvas border-gh-border/50 text-gh-text-muted'
              }`}
            >
              {task.isCompleted ? (
                <CheckCircle2 className="w-4 h-4 text-gh-success-fg shrink-0 mt-0.5" />
              ) : (
                <Circle className="w-4 h-4 text-gh-text-subtle shrink-0 mt-0.5" />
              )}
              <span className={task.isCompleted ? 'line-through text-gh-text-muted' : ''}>
                {language === 'bn' ? task.descriptionBn : task.descriptionEn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Run Suggested Commands */}
      {currentLesson.quickCommands && currentLesson.quickCommands.length > 0 && (
        <div className="mb-4">
          <div className="text-[11px] font-semibold text-gh-text-muted uppercase mb-2 flex items-center space-x-1">
            <Terminal className="w-3.5 h-3.5 text-gh-accent" />
            <span>{language === 'bn' ? 'সরাসরি রান করার জন্য ক্লিক করুন:' : 'Click to Quick-Run:'}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentLesson.quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => onQuickRunCommand(cmd)}
                className="flex items-center space-x-1.5 bg-gh-canvas-subtle hover:bg-gh-accent/15 border border-gh-border hover:border-gh-accent text-gh-accent px-2.5 py-1.5 rounded-md font-mono text-xs transition"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{cmd}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tips & Pro Tricks */}
      <div className="bg-gh-attention/10 border border-gh-attention/20 rounded-md p-3 mb-4 text-xs text-gh-attention-fg">
        <div className="flex items-center space-x-1.5 font-bold mb-1">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'প্রো টিপস' : 'Pro Tip'}</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-gh-text-muted text-[11px]">
          {(language === 'bn' ? currentLesson.tipsBn : currentLesson.tipsEn).map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="mt-auto pt-3 border-t border-gh-border flex items-center justify-between">
        <button
          onClick={onPrevLesson}
          disabled={!hasPrevLesson}
          className={`flex items-center space-x-1 px-3 py-1.5 rounded-md text-xs font-medium border transition ${
            hasPrevLesson
              ? 'border-gh-border bg-gh-canvas-subtle text-gh-text hover:border-gh-border-active'
              : 'border-transparent text-gh-text-subtle cursor-not-allowed opacity-50'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'পূর্ববর্তী' : 'Previous'}</span>
        </button>

        <button
          onClick={onNextLesson}
          disabled={!hasNextLesson}
          className={`flex items-center space-x-1 px-3.5 py-1.5 rounded-md text-xs font-semibold shadow-sm transition ${
            hasNextLesson
              ? isAllTasksComplete
                ? 'bg-gh-success text-white hover:bg-gh-success-emphasis'
                : 'bg-gh-accent text-white hover:bg-gh-accent-emphasis'
              : 'border border-gh-border text-gh-text-subtle cursor-not-allowed opacity-50'
          }`}
        >
          <span>{language === 'bn' ? 'পরবর্তী পাঠ' : 'Next Lesson'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
