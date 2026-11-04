# 🐙 GitPlayGround

> **Interactive Animated Git & GitHub Learning Platform**  
> Master Git internals, branching, rebasing, recovery, and GitHub Actions CI/CD through **real-time visual animations** and an **interactive in-browser terminal**.

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF.svg?style=flat&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB.svg?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC.svg?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Overview & Features

**GitPlayGround** transforms command-line Git operations into an intuitive, visually stunning experience with an authentic **GitHub Dark UI**:
- ⚡ **Interactive Virtual Git Engine**: Fully simulated in-memory Git repository supporting all 40 essential Git and GitHub CLI commands.
- 🎨 **Animated Directed Acyclic Graph (DAG)**: Real-time spring physics for commit bubbles, branch pointers, merge diamonds, and glowing `HEAD` tags.
- 🗂️ **3-Tier Lifecycle Visualizer**: Live file movements between **Working Directory** $\rightarrow$ **Staging Area (Index)** $\rightarrow$ **Committed Snapshot**.
- 🚀 **GitHub Actions CI/CD Runner**: Visual workflow pipeline execution with matrix jobs, step spinners, duration tracking, and console log streams.
- 🌐 **Bilingual (English & বাংলা)**: Complete bilingual guides, explanations, and challenge checklists.

---

## 🗺️ 8-Level Curriculum Roadmap (40 Essential Commands)

### লেভেল ১: ইনিশিয়ালাইজেশন ও কনফিগারেশন (Setup & Config)
* **১.১** `git config --global user.name "Your Name"` — গিটহাবে কমিটের জন্য গ্লোবাল ইউজারনেম কনফিগার করে।
* **১.২** `git config --global user.email "your_email@example.com"` — গিটহাব অ্যাকাউন্টের সাথে যুক্ত অথেনটিকেশন ইমেইল সেট করে।
* **১.৩** `git init` — বর্তমান ফোল্ডারটিকে লোকাল গিট রিপোজিটরি হিসেবে ইনিশিয়ালাইজ করে।
* **১.৪** `git clone <repo_url>` — রিমোট গিটহাব রিপোজিটরি লোকাল ডিরেক্টরিতে ডাউনলোড/ক্লোন করে আনে।

---

### লেভেল ২: ট্র্যাকিং, স্ট্যাটাস ও কমিট (Basic Workflow)
* **২.১** `git status` — ওয়ার্কিং ডিরেক্টরি এবং স্টেজিং এরিয়ার বর্তমান অবস্থা (আনট্র্যাকড, মডিফাইড ফাইল ইত্যাদি) দেখায়।
* **২.২** `git add <file_name>` — নির্দিষ্ট ফাইলকে স্টেজিং এরিয়ায় যুক্ত করে।
* **২.৩** `git add .` — সমস্ত পরিবর্তিত ও নতুন ফাইলকে একবারে স্টেজিং এরিয়ায় নিয়ে যায়।
* **২.৪** `git commit -m "commit message"` — স্টেজিং এরিয়ার পরিবর্তনগুলো একটি অর্থপূর্ণ মেসেজ সহ লোকাল হিস্ট্রিতে সেভ করে।
* **২.৫** `git commit -am "commit message"` — ট্র্যাকড ফাইলগুলোর মডিফিকেশন এক কমান্ডে স্টেজ ও কমিট করে।
* **২.৬** `git log --oneline --graph --all` — পুরো প্রোজেক্টের কমিট হিস্ট্রি একটি কমপ্যাক্ট একলাইনের গ্রাফিক্যাল ফরম্যাটে দেখায়।

---

### লেভেল ৩: ব্রাঞ্চিং ও মার্জিং (Branching & Merging)
* **৩.১** `git branch` — লোকাল সব ব্রাঞ্চের তালিকা দেখায় এবং সক্রিয় ব্রাঞ্চ চিহ্নিত করে।
* **৩.২** `git switch -c <branch_name>` *(বা `git checkout -b <branch_name>`)* — নতুন ব্রাঞ্চ তৈরি করে তাৎক্ষণিকভাবে সুইচ করে।
* **৩.৩** `git switch <branch_name>` *(বা `git checkout <branch_name>`)* — বিদ্যমান অন্য একটি ব্রাঞ্চে সুইচ করে।
* **৩.৪** `git merge <branch_name>` — নির্দিষ্ট ব্রাঞ্চের সমস্ত পরিবর্তন বর্তমান অ্যাক্টিভ ব্রাঞ্চে মার্জ করে।
* **৩.৫** `git branch -d <branch_name>` — মার্জ হয়ে যাওয়া অপ্রয়োজনীয় লোকাল ব্রাঞ্চ নিরাপদে ডিলিট করে।
* **৩.৬** `git branch -m <old_name> <new_name>` — কোনো ব্রাঞ্চের নাম পরিবর্তন (রিনেম) করে।

---

### লেভেল ৪: রিমোট রিপোজিটরি ও সিঙ্কিং (Remote & GitHub Collaboration)
* **৪.১** `git remote add origin <repo_url>` — লোকাল রিপোজিটরির সাথে রিমোট গিটহাব রিপোজিটরি লিংক করে।
* **৪.২** `git push -u origin <branch_name>` — প্রথমবার লোকাল ব্রাঞ্চের কোড গিটহাবে পুশ করে আপস্ট্রিম ট্র্যাকিং সেট করে।
* **৪.৩** `git push` — আপস্ট্রিম সেট করা থাকলে পরবর্তী সময়ে এক ক্লিকে রিমোট রিপোজিটরিতে লোকাল কমিটগুলো পুশ করে।
* **৪.৪** `git fetch` — রিমোটের লেটেস্ট মেটাডাটা ও কমিট হিস্ট্রি ডাউনলোড করে লোকাল কোডে কোনো পরিবর্তন না ঘটিয়েই।
* **৪.৫** `git pull` — রিমোট ব্রাঞ্চ থেকে লেটেস্ট কোড এনে স্বয়ংক্রিয়ভাবে লোকাল ব্রাঞ্চে মার্জ করে (`fetch` + `merge`)।
* **৪.৬** `git remote prune origin` — রিমোটে ডিলিট হয়ে যাওয়া ব্রাঞ্চগুলোর অবশিষ্টাংশ লোকাল ট্র্যাকিং লিস্ট থেকে পরিষ্কার করে।

---

### লেভেল ৫: আনডু, স্ট্যাশ ও ক্লিনআপ (Undoing & Stashing)
* **৫.১** `git restore <file_name>` — আন-কমিটেড কোনো ফাইলের লোকাল পরিবর্তনগুলো বাতিল করে আগের অবস্থায় ফেরত নেয়।
* **৫.২** `git restore --staged <file_name>` — স্টেজিং এরিয়া (`git add`) থেকে কোনো ফাইলকে নিরাপদে আনস্টেজ করে।
* **৫.৩** `git stash` — অসমাপ্ত কাজ সাময়িকভাবে স্টোর করে ওয়ার্কিং ডিরেক্টরি একদম ক্লিন অবস্থায় নেয়।
* **৫.৪** `git stash pop` — স্ট্যাশ করে রাখা সাময়িক পরিবর্তনগুলো আবার ফিরিয়ে আনে এবং স্ট্যাশ মেমোরি থেকে মুছে ফেলে।
* **৫.৫** `git clean -fd` — ওয়ার্কিং ডিরেক্টরি থেকে ট্র্যাকিং-এ না থাকা (untracked) ফাইল ও ফোল্ডার একবারে মুছে ফেলে।
* **৫.৬** `git reset --soft HEAD~1` — সর্বশেষ কমিটটি আনডু করে দেয়, তবে কোডের পরিবর্তনগুলো স্টেজিং এরিয়াতে অক্ষত রাখে।
* **৫.৭** `git reset --hard HEAD~1` — সর্বশেষ কমিট এবং সেটির পরিবর্তন সম্পূর্ণ মুছে আগের কমিটে ফিরে যায়।
* **৫.৮** `git revert <commit_hash>` — পূর্বের একটি নির্দিষ্ট কমিটের বিপরীত পরিবর্তন এনে নতুন একটি নিরাপদ কমিট তৈরি করে।

---

### লেভেল ৬: ডিবাগিং ও কোড ট্র্যাকিং (Inspection & Debugging)
* **৬.১** `git diff` — আন-স্টেজড পরিবর্তনের লাইন-বাই-লাইন তফাত দেখায়।
* **৬.২** `git diff --staged` — স্টেজিং এরিয়ায় রাখা পরিবর্তনের সাথে শেষ কমিটের তুলনা প্রদর্শন করে।
* **৬.৩** `git blame <file_name>` — একটি ফাইলের প্রতিটি সিঙ্গেল লাইন কে, কখন এবং কোন কমিট হ্যাশে লিখেছিল তা বিস্তারিত ট্র্যাক করে।
* **৬.৪** `git bisect start` — কোডবেসে বাগ ঢোকার সঠিক কমিটটি খুঁজতে বাইনারি সার্চ মেকানিজম চালু করে।

---

### লেভেল ৭: অ্যাডভান্সড মেকানিজম ও ট্রাবলশুটিং (Pro-level Git)
* **৭.১** `git commit --amend -m "updated message"` — সর্বশেষ কমিটের মেসেজ এডিট করা বা বাদ পড়া ফাইল শেষ কমিটের ভেতরে ঢুকিয়ে দেওয়া।
* **৭.২** `git rebase -i HEAD~<number>` — ইন্টারেক্টিভ রিবেসিং মোড ওপেন করে; যার মাধ্যমে কমিট স্কোয়াশ (Squash), রি-অর্ডার বা এডিট করা যায়।
* **৭.৩** `git cherry-pick <commit_hash>` — পুরো ব্রাঞ্চ মার্জ না করে অন্য ব্রাঞ্চ থেকে শুধু নির্দিষ্ট একটি কমিটের পরিবর্তন নিয়ে আসে।
* **৭.৪** `git reflog` — হেডের প্রতিটি স্টেপ ট্র্যাক করে; ভুল করে মুছে ফেলা কমিট বা ব্রাঞ্চ রিকভার করতে সাহায্য করে।

---

### লেভেল ৮: GitHub CLI টুলস (Terminal Automation `gh`)
* **৮.১** `gh pr create --title "feature update" --body "details"` — ব্রাউজারে না গিয়ে সরাসরি টার্মিনাল থেকেই গিটহাবে পুল রিকোয়েস্ট তৈরি করে।
* **৮.২** `gh repo view --web` — লোকাল টার্মিনাল থেকেই সরাসরি ডিফল্ট ব্রাউজারে বর্তমান প্রজেক্টটির গিটহাব রিপোজিটরি ওপেন করে।

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/n0vemberain/GitPlayGround.git
cd GitPlayGround

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📄 License
MIT License.
