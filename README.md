# 🐙 GitPlayGround

> **Interactive Animated Git & GitHub Learning Platform**  
> Master Git internals, branching, rebasing, recovery, and GitHub Actions CI/CD through **real-time visual animations** and an **interactive in-browser terminal**.

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB.svg?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Overview & Philosophy

Git is essential for every developer, but mastering its mental model—branches as pointers, the object database (blobs, trees, commits), rebasing vs merging, and CI/CD automation—is often daunting.

**GitPlayGround** bridges that gap. Built with an authentic **GitHub Dark UI**, it provides:
- ⚡ **Interactive In-Memory Git Engine**: Run real Git CLI commands (`git commit`, `git checkout -b`, `git merge`, `git rebase`, `git cherry-pick`, `git reset`, `git reflog`).
- 🎨 **Animated Directed Acyclic Graph (DAG)**: Watch commits pop into existence, branches slide forward, and merge diamonds form with smooth 60fps spring transitions powered by Framer Motion.
- 🗂️ **3-Tier Lifecycle Visualizer**: See how files transition between Working Directory $\rightarrow$ Staging Area (Index) $\rightarrow$ Committed Snapshot.
- 🚀 **GitHub Actions CI/CD Simulator**: Run and observe automated workflow pipelines with matrix strategies, dependency caching, step spinners, and live log streaming.
- 🌐 **Bilingual (English & বাংলা)**: Full explanations and pro-tips in both Bengali and English.

---

## 🗺️ 8-Level Curriculum Roadmap

The learning path directly distills the concepts from 4 world-class video courses:

| Level | Topic | Source Course Reference | What You Learn & Practice |
|---|---|---|---|
| **01** | **Git Foundations & Internals** | [ThePrimeagen / Boot.dev](https://youtu.be/rH3zE7VlIMs) | Plumbing vs Porcelain, Blobs, Trees, Commits, `git init`, `git add`, `git commit -m` |
| **02** | **The Perfect Commit & Hygiene** | [Tower / freeCodeCamp](https://youtu.be/Uszj_k0DGsg) | Atomic commits, Conventional Commits (`feat:`, `fix:`), amending mistakes (`git commit --amend`) |
| **03** | **Branching & Merging** | [ThePrimeagen & Tower](https://youtu.be/rH3zE7VlIMs?t=2959) | Branches as 41-byte pointers, Fast-forward vs 3-Way merge diamonds |
| **04** | **Rebase & Conflict Resolution** | [ThePrimeagen & Tower](https://youtu.be/rH3zE7VlIMs?t=4621) | Linear history with `git rebase`, interactive 3-way conflict resolver modal |
| **05** | **Advanced Git Surgery** | [Tower / freeCodeCamp](https://youtu.be/qsTthZi23VE) | Cherry-picking commits (`git cherry-pick`), Stashing changes, and worktrees |
| **06** | **Time Travel, Recovery & Bisect** | [ThePrimeagen & Tower](https://youtu.be/rH3zE7VlIMs?t=5776) | Undoing with `git reset` (soft, mixed, hard), recovering lost work with `git reflog` |
| **07** | **GitHub Remote Collaboration** | [Tower & ThePrimeagen](https://youtu.be/Uszj_k0DGsg?t=1036) | Remote branches, `git push -u origin main`, Pull Requests & Code Review standards |
| **08** | **GitHub Actions CI/CD Mastery** | [Brian Douglas / freeCodeCamp](https://youtu.be/Tz7FsunBbfQ) | Full certification prep: triggers (`push`, `cron`), matrix testing, caching, workflow artifacts |

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/n0vemberain/GitPlayGround.git
cd GitPlayGround
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start local development server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict mode)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with GitHub Primer Dark theme tokens
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebration Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
