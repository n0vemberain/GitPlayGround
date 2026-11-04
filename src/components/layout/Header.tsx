import React, { useState } from 'react';
import { 
  GitBranch, 
  Terminal as TerminalIcon, 
  Globe, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  Sliders,
  User as UserIcon
} from 'lucide-react';
import { CURRICULUM } from '../../data/curriculum';
import { PRESET_SCENARIOS, PresetScenario } from '../../data/presets';
import { GitState } from '../../types/git';

interface HeaderProps {
  currentLevelId: number;
  currentLessonId: string;
  onSelectLevel: (levelId: number, lessonId: string) => void;
  completedLessonIds: string[];
  mode: 'challenge' | 'sandbox';
  onToggleMode: (mode: 'challenge' | 'sandbox') => void;
  language: 'bn' | 'en';
  onToggleLanguage: () => void;
  onResetRepo: () => void;
  onLoadPreset: (preset: PresetScenario) => void;
  gitState: GitState;
}

export const Header: React.FC<HeaderProps> = ({
  currentLevelId,
  currentLessonId,
  onSelectLevel,
  completedLessonIds,
  mode,
  onToggleMode,
  language,
  onToggleLanguage,
  onResetRepo,
  onLoadPreset,
  gitState
}) => {
  const [showLevelMenu, setShowLevelMenu] = useState(false);
  const [showPresetsMenu, setShowPresetsMenu] = useState(false);

  const currentLevel = CURRICULUM.find(l => l.id === currentLevelId) || CURRICULUM[0];
  const totalLessons = CURRICULUM.reduce((acc, l) => acc + l.lessons.length, 0);
  const progressPercent = Math.round((completedLessonIds.length / totalLessons) * 100);

  return (
    <header className="h-14 bg-gh-canvas-subtle border-b border-gh-border px-4 flex items-center justify-between select-none z-30 relative">
      {/* Left: Brand & Title */}
      <div className="flex items-center space-x-3">
        <a 
          href="https://github.com/n0vemberain/GitPlayGround" 
          target="_blank" 
          rel="noreferrer"
          className="flex items-center space-x-2 text-gh-text hover:text-white transition"
        >
          <div className="w-8 h-8 rounded-full bg-gh-border flex items-center justify-center text-white shadow-sm hover:scale-105 transition-transform">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </div>
          <span className="font-bold text-base tracking-tight hidden sm:inline">GitPlayGround</span>
        </a>
        <span className="text-gh-border-active hidden md:inline text-xs font-mono px-2 py-0.5 rounded bg-gh-accent/10 border border-gh-accent/20">
          v1.0 • Animated Learning
        </span>

        {/* Level Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => { setShowLevelMenu(!showLevelMenu); setShowPresetsMenu(false); }}
            className="flex items-center space-x-2 bg-gh-canvas border border-gh-border px-3 py-1.5 rounded-md text-xs font-medium text-gh-text hover:border-gh-border-active transition"
          >
            <span className="w-2 h-2 rounded-full bg-gh-success-fg animate-pulse" />
            <span className="font-semibold text-gh-accent">Level {currentLevel.number}:</span>
            <span className="max-w-[130px] sm:max-w-[200px] truncate">
              {language === 'bn' ? currentLevel.titleBn : currentLevel.titleEn}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-gh-text-muted" />
          </button>

          {showLevelMenu && (
            <div className="absolute top-full left-0 mt-1 w-80 bg-gh-canvas-subtle border border-gh-border rounded-lg shadow-2xl p-2 z-50 max-h-96 overflow-y-auto">
              <div className="text-[11px] font-semibold text-gh-text-muted uppercase px-2 py-1">
                {language === 'bn' ? '৮-লেভেল রোডম্যাপ' : '8-Level Roadmap'}
              </div>
              {CURRICULUM.map(level => {
                const isSelected = level.id === currentLevelId;
                const levelDoneCount = level.lessons.filter(l => completedLessonIds.includes(l.id)).length;
                const isFullyDone = levelDoneCount === level.lessons.length;

                return (
                  <div key={level.id} className="mb-1">
                    <div 
                      onClick={() => {
                        onSelectLevel(level.id, level.lessons[0].id);
                        setShowLevelMenu(false);
                      }}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition text-xs ${
                        isSelected ? 'bg-gh-accent/15 text-gh-accent font-medium' : 'hover:bg-gh-border/30 text-gh-text'
                      }`}
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <span className="font-mono text-xs opacity-75">{level.number}</span>
                        <span className="truncate">{language === 'bn' ? level.titleBn : level.titleEn}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {isFullyDone ? (
                          <CheckCircle2 className="w-4 h-4 text-gh-success-fg" />
                        ) : (
                          <span className="text-[10px] text-gh-text-muted font-mono">{levelDoneCount}/{level.lessons.length}</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Middle: Mode Switcher (Challenge vs Sandbox) */}
      <div className="hidden lg:flex items-center bg-gh-canvas p-1 rounded-lg border border-gh-border">
        <button
          onClick={() => onToggleMode('challenge')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs font-medium transition ${
            mode === 'challenge'
              ? 'bg-gh-accent/20 text-gh-accent border border-gh-accent/30 shadow-sm'
              : 'text-gh-text-muted hover:text-gh-text'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'গাইডেড চ্যালেঞ্জ' : 'Guided Challenge'}</span>
        </button>
        <button
          onClick={() => onToggleMode('sandbox')}
          className={`flex items-center space-x-1.5 px-3 py-1 rounded text-xs font-medium transition ${
            mode === 'sandbox'
              ? 'bg-gh-accent/20 text-gh-accent border border-gh-accent/30 shadow-sm'
              : 'text-gh-text-muted hover:text-gh-text'
          }`}
        >
          <TerminalIcon className="w-3.5 h-3.5" />
          <span>{language === 'bn' ? 'ওপেন স্যান্ডবক্স' : 'Open Sandbox'}</span>
        </button>
      </div>

      {/* Right: Controls & Actions */}
      <div className="flex items-center space-x-2">
        {/* Preset Scenarios Menu */}
        <div className="relative">
          <button
            onClick={() => { setShowPresetsMenu(!showPresetsMenu); setShowLevelMenu(false); }}
            className="flex items-center space-x-1 bg-gh-canvas border border-gh-border px-2.5 py-1.5 rounded-md text-xs text-gh-text hover:border-gh-border-active transition"
            title={language === 'bn' ? 'রেডিমেড সিনারিও লোড করুন' : 'Load preset scenarios'}
          >
            <Sliders className="w-3.5 h-3.5 text-gh-text-muted" />
            <span className="hidden sm:inline">{language === 'bn' ? 'সিনারিও' : 'Presets'}</span>
          </button>

          {showPresetsMenu && (
            <div className="absolute top-full right-0 mt-1 w-72 bg-gh-canvas-subtle border border-gh-border rounded-lg shadow-2xl p-2 z-50">
              <div className="text-[11px] font-semibold text-gh-text-muted uppercase px-2 py-1">
                {language === 'bn' ? 'প্র্যাকটিস সিনারিও' : 'Practice Scenarios'}
              </div>
              {PRESET_SCENARIOS.map(preset => (
                <div
                  key={preset.id}
                  onClick={() => {
                    onLoadPreset(preset);
                    setShowPresetsMenu(false);
                  }}
                  className="p-2 rounded-md hover:bg-gh-border/40 cursor-pointer text-xs transition"
                >
                  <div className="font-semibold text-gh-text">
                    {language === 'bn' ? preset.nameBn : preset.nameEn}
                  </div>
                  <div className="text-[11px] text-gh-text-muted mt-0.5">
                    {language === 'bn' ? preset.descriptionBn : preset.descriptionEn}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reset Sandbox */}
        <button
          onClick={onResetRepo}
          className="p-1.5 bg-gh-canvas border border-gh-border rounded-md text-gh-text-muted hover:text-gh-danger-fg hover:border-gh-danger/40 transition"
          title={language === 'bn' ? 'রিপোজিটরি রিসেট করুন' : 'Reset Sandbox to Clean State'}
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Language Switcher */}
        <button
          onClick={onToggleLanguage}
          className="flex items-center space-x-1 bg-gh-canvas border border-gh-border px-2.5 py-1.5 rounded-md text-xs font-mono text-gh-text hover:border-gh-accent transition"
          title="Toggle Language (বাংলা / English)"
        >
          <Globe className="w-3.5 h-3.5 text-gh-accent" />
          <span className="font-semibold">{language === 'bn' ? 'বাং' : 'EN'}</span>
        </button>

        {/* Guest / Progress pill */}
        <div className="hidden sm:flex items-center space-x-1.5 bg-gh-canvas border border-gh-border px-2.5 py-1.5 rounded-md text-xs text-gh-text font-mono">
          <UserIcon className="w-3.5 h-3.5 text-gh-success-fg" />
          <span>Guest</span>
          <span className="text-gh-success-fg font-semibold">({progressPercent}%)</span>
        </div>
      </div>
    </header>
  );
};
