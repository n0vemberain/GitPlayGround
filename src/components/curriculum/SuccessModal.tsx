import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, ArrowRight, Award, CheckCircle2, RotateCcw } from 'lucide-react';
import { Lesson, Level } from '../../types/curriculum';

interface SuccessModalProps {
  lesson: Lesson;
  level: Level;
  language: 'bn' | 'en';
  onNext: () => void;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  lesson,
  level,
  language,
  onNext,
  onClose
}) => {
  useEffect(() => {
    // Fire confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if canvas-confetti fails in headless or non-canvas env
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-gh-canvas border border-gh-border rounded-xl shadow-2xl overflow-hidden p-6 text-center select-none">
        <div className="w-16 h-16 bg-gh-success/15 text-gh-success-fg rounded-full flex items-center justify-center mx-auto mb-4 border border-gh-success/30">
          <Trophy className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold text-gh-text mb-1 tracking-tight">
          {language === 'bn' ? 'অসাধারণ! চ্যালেঞ্জ সম্পন্ন হয়েছে 🎉' : 'Awesome! Challenge Completed 🎉'}
        </h3>
        <p className="text-xs text-gh-text-muted mb-4">
          {language === 'bn' ? lesson.titleBn : lesson.titleEn}
        </p>

        <div className="bg-gh-canvas-subtle border border-gh-border rounded-lg p-3.5 mb-5 text-left text-xs space-y-2">
          <div className="flex items-center space-x-2 text-gh-success-fg font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>{language === 'bn' ? 'সকল অবজেক্টিভ সফলভাবে অর্জিত' : 'All Objectives Achieved'}</span>
          </div>
          <div className="text-gh-text-muted text-[11px] leading-relaxed">
            {language === 'bn'
              ? 'আপনি গিটের অত্যন্ত গুরুত্বপূর্ণ একটি দক্ষতা সফলভাবে আয়ত্ত করেছেন।'
              : 'You have mastered a foundational Git concept covered in the curriculum.'}
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-3 rounded-md bg-gh-canvas-subtle border border-gh-border text-gh-text text-xs font-semibold hover:border-gh-border-active transition"
          >
            {language === 'bn' ? 'এখানেই প্র্যাকটিস রাখুন' : 'Stay Here'}
          </button>
          <button
            onClick={onNext}
            className="flex-1 py-2 px-3 rounded-md bg-gh-success hover:bg-gh-success-emphasis text-white text-xs font-bold shadow-md transition flex items-center justify-center space-x-1.5"
          >
            <span>{language === 'bn' ? 'পরবর্তী পাঠ' : 'Next Lesson'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
