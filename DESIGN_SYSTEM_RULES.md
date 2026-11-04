# GitPlayGround Design System & Figma MCP Integration Rules

This document outlines the design architecture, tokens, components, styling conventions, and patterns used across **GitPlayGround** to facilitate seamless integration with Figma designs via Model Context Protocol (MCP).

---

## 1. Token Definitions

Design tokens are centralized in `tailwind.config.js` under the `gh` (GitHub Dark theme) namespace.

### Color Palette

| Token Name | Hex Code / Value | Usage Description |
| :--- | :--- | :--- |
| `gh-canvas` | `#0d1117` | Primary application background |
| `gh-canvas-subtle` | `#161b22` | Header, side panels, cards, and modal headers |
| `gh-canvas-inset` | `#010409` | Terminal background, code inputs, inset containers |
| `gh-canvas-overlay` | `#1f242c` | Dropdown menus, tooltips, flyout popovers |
| `gh-border` | `#30363d` | Standard borders, dividers, separators |
| `gh-border-muted` | `#21262d` | Subtle borders, inner card separators |
| `gh-border-active` | `#58a6ff` | Focused inputs, active borders, selection outlines |
| `gh-text` | `#e6edf3` | Primary body and heading text |
| `gh-text-muted` | `#848d97` | Secondary text, timestamps, labels |
| `gh-text-subtle` | `#6e7681` | Inactive icons, subtle commit descriptions |
| `gh-accent` | `#58a6ff` | Primary interactive color, links, HEAD indicators |
| `gh-accent-emphasis`| `#1f6feb` | Active buttons, primary CTA states |
| `gh-success` | `#238636` | Staged files, green contribution squares |
| `gh-success-fg` | `#3fb950` | Success badges, checkmark icons |
| `gh-danger` | `#da3633` | Merge conflict banners, hard resets, error alerts |
| `gh-danger-fg` | `#f85149` | Unstaged changes, deletion highlights |
| `gh-attention` | `#9e6a03` | Warning alerts, rebase badges, video course tags |
| `gh-attention-fg` | `#d29922` | Warning text, modified status |
| `gh-purple` | `#8957e5` | Merge commit nodes, GitHub Actions workflows |
| `gh-purple-fg` | `#a371f7` | Pull request badges, remote tracking tags |

### Typography

- **System Sans**: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif`
  - Applied to all UI text, headings, buttons, and instructional cards.
- **System Monospace**: `ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, "Liberation Mono", monospace`
  - Applied to terminal commands, file paths, Git hashes (`#58a6ff`), and diff views.

### Spacing & Grid System

- Follows Tailwind's 4px scale (`p-1` = 4px, `p-2` = 8px, `p-3` = 12px, `p-4` = 16px, `p-6` = 24px).
- Panel heights:
  - Header: fixed `h-14` (56px)
  - Subheaders / Control bars: fixed `h-9` or `h-10` (36px–40px)
  - Modals: constrained to `max-w-2xl` or `max-w-4xl` with backdrop blur.

---

## 2. Component Library Architecture

Components are organized by functional domain in `src/components/`:

```
src/components/
├── curriculum/          # Learning content & interaction
│   ├── LessonPanel.tsx  # Curriculum roadmap, objective checklist, Quick Run
│   ├── ConflictModal.tsx# Interactive 3-way merge conflict editor
│   └── SuccessModal.tsx # Lesson completion modal with fireworks/badges
├── layout/
│   └── Header.tsx       # Top navigation, level selector, sandbox toggle, language
├── terminal/
│   └── Terminal.tsx     # Simulated interactive zsh/bash shell with history
└── visualizer/
    ├── GitGraph.tsx     # Animated Directed Acyclic Graph (DAG) for commits
    ├── LifecycleView.tsx# 3-Tier file lifecycle (Working -> Staging -> Committed)
    ├── AnimatedExplainer.tsx # Step-by-step video-style internal animation engine
    ├── ActionsRunner.tsx# Simulated GitHub Actions CI/CD pipeline
    ├── ConfigCard.tsx   # Visual card for ~/.gitconfig user identity
    └── CommandFeedbackBanner.tsx # Real-time "Under the Hood" explanation
```

### Key Component Patterns

1. **State-Driven Rendering**: Components consume `gitState: GitState` directly from `VirtualGit` engine without mutating parent state.
2. **Bilingual Prop Pattern**: All user-facing components accept `language: 'bn' | 'en'` and display localized strings.
3. **Framer Motion Animations**:
   - `AnimatePresence` for mounting/unmounting modals and animated steps.
   - Spring physics (`type: 'spring', damping: 20`) for interactive commit nodes.
   - Keyframe timelines (`animate={{ scale: [1, 1.1, 1] }}`) for active pointers and indicators.

---

## 3. Frameworks & Libraries

- **UI Framework**: React 19 (`react`, `react-dom`) with TypeScript.
- **Styling**: Tailwind CSS 3 (`tailwindcss`, `postcss`, `autoprefixer`).
- **Animation**: Framer Motion 12 (`framer-motion`).
- **Icons**: Lucide React (`lucide-react`) + Custom GitHub Octocat SVG.
- **Build System**: Vite 6 (`vite`, `@vitejs/plugin-react`).

---

## 4. Asset Management

- **Zero Heavy Assets**: The application avoids external heavy static assets to ensure zero-latency in-browser loading.
- **Vector-First**: All diagrams, nodes, and icons are rendered as inline SVGs or React SVG components.
- **Gradients**: Custom CSS mesh gradients are used for subtle depth:
  `bg-gradient-to-b from-gh-canvas-inset to-gh-canvas`.

---

## 5. Icon System

- Powered by `lucide-react` with standardized sizes:
  - Micro / Inline: `w-3 h-3` (12px)
  - Small / Button: `w-3.5 h-3.5` or `w-4 h-4` (14px–16px)
  - Medium / Headers: `w-5 h-5` (20px)
  - Feature / Hero: `w-7 h-7` or `w-8 h-8` (28px–32px)
- **Octocat Brand Icon**: Implemented as pure inline SVG matching the official GitHub brand mark.

---

## 6. Styling Approach

- **Dark-First Architecture**: Application defaults to GitHub Dark mode (`color-scheme: dark`).
- **Utility-First**: 100% Tailwind utility classes.
- **Custom Scrollbar**: Defined in `src/styles/index.css` using WebKit scrollbar pseudo-elements with `#30363d` thumb and `#58a6ff` hover.
- **Card Container Pattern**:
  ```tsx
  <div className="bg-gh-canvas border border-gh-border rounded-xl p-4 shadow-xl">
    {/* Content */}
  </div>
  ```

---

## 7. Project Structure

```
GitPlayGround/
├── src/
│   ├── components/       # UI Components (layout, curriculum, visualizer, terminal)
│   ├── config/           # Firebase & local storage persistence
│   ├── data/
│   │   ├── curriculum.ts # 40 lessons structured across 8 progressive levels
│   │   ├── presets.ts    # 10 realistic practice scenarios (detached HEAD, merge conflict)
│   │   └── commandAnimations.ts # 40 detailed step-by-step animation definitions
│   ├── engine/
│   │   ├── VirtualGit.ts # Pure TypeScript in-memory Git repository engine
│   │   ├── CommandParser.ts # Real Git command parser (git, gh, flags)
│   │   ├── VirtualActions.ts # GitHub Actions YAML parser & runner
│   │   └── feedbackHelper.ts # "Under the Hood" explanation generator
│   ├── types/            # TypeScript interfaces (git.ts, curriculum.ts, actions.ts)
│   ├── styles/           # Tailwind CSS global styles (index.css)
│   ├── App.tsx           # Main workspace orchestration & split-screen layout
│   └── main.tsx          # Application entrypoint
├── tailwind.config.js    # Design tokens & color system
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies & build scripts
```
