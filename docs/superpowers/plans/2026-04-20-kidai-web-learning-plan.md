# kidAI Web Learning Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 어린이를 위한 혼합형 웹 학습 도우미를 Next.js 웹 앱으로 구현해, 홈에서 과목 선택과 추천 문제 시작이 가능하고 학습 화면에서 힌트 중심 AI 대화를 제공한다.

**Architecture:** App Router 기반 Next.js 앱으로 시작한다. 홈 화면과 학습 화면을 분리하고, 과목/문제/AI 응답 규칙은 `lib` 아래의 순수 데이터/로직 모듈로 둔다. 최근 학습 기록은 브라우저 `localStorage`에 저장하고, 첫 버전 AI 응답은 난이도별 규칙 기반 모의 응답으로 만든다.

**Tech Stack:** Next.js, React, TypeScript, Vitest, Testing Library

---

## File Structure

- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `next-env.d.ts`
- Create: `.gitignore`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/learn/[subject]/page.tsx`
- Create: `app/globals.css`
- Create: `components/subject-card.tsx`
- Create: `components/question-composer.tsx`
- Create: `components/recommended-problem-card.tsx`
- Create: `components/recent-learning-list.tsx`
- Create: `components/problem-panel.tsx`
- Create: `components/chat-panel.tsx`
- Create: `components/difficulty-selector.tsx`
- Create: `lib/data/subjects.ts`
- Create: `lib/data/problems.ts`
- Create: `lib/ai/session.ts`
- Create: `lib/storage/recent-learning.ts`
- Create: `tests/lib/ai/session.test.ts`
- Create: `tests/lib/storage/recent-learning.test.ts`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`

## Chunk 1: Scaffold The App

### Task 1: Create project manifest and base config

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `next-env.d.ts`
- Create: `.gitignore`

- [ ] **Step 1: Write the failing verification expectation**

Document the expected commands before writing files:
- `npm run test` should fail because the project is not scaffolded yet
- `npm run build` should fail because `package.json` does not exist yet

- [ ] **Step 2: Run the failing verification**

Run: `npm run test`
Expected: shell error indicating missing `package.json`

Run: `npm run build`
Expected: shell error indicating missing `package.json`

- [ ] **Step 3: Write the minimal project scaffold**

Create:
- `package.json` with `dev`, `build`, `test` scripts
- Next/React/TypeScript dependencies
- Vitest and Testing Library dev dependencies
- `.gitignore` for `.next`, `node_modules`, `.superpowers`, coverage files

- [ ] **Step 4: Verify manifest exists and scripts parse**

Run: `npm install`
Expected: dependency install completes successfully

Run: `npm run test`
Expected: test runner starts and reports no tests or missing source tests, not manifest errors

### Task 2: Create base app shell

**Files:**
- Create: `app/layout.tsx`
- Create: `app/globals.css`

- [ ] **Step 1: Write a minimal render expectation**

Define the shell expectation:
- app layout renders global styles
- page body uses a bright kid-friendly theme without adding dark-mode complexity

- [ ] **Step 2: Implement the shell**

Create a root layout with:
- Korean metadata for the app title
- global font stack that is playful but readable
- body wrapper for the learning app

- [ ] **Step 3: Verify the app compiles**

Run: `npm run build`
Expected: Next.js build progresses past layout resolution without missing file errors

## Chunk 2: Add Core Learning Logic

### Task 3: Add AI response builder with TDD

**Files:**
- Create: `lib/ai/session.ts`
- Create: `tests/lib/ai/session.test.ts`

- [ ] **Step 1: Write the failing tests**

Cover:
- difficulty changes the explanation tone and depth
- response order is always `hint`, `explanation`, `summary`
- each subject can produce a valid mock response

- [ ] **Step 2: Run the focused test**

Run: `npm run test -- tests/lib/ai/session.test.ts`
Expected: FAIL because `lib/ai/session.ts` does not exist

- [ ] **Step 3: Implement the minimal response builder**

Add a pure function that accepts:
- subject
- difficulty
- prompt or problem text

Return a deterministic object with:
- `hint`
- `explanation`
- `summary`

- [ ] **Step 4: Re-run the focused test**

Run: `npm run test -- tests/lib/ai/session.test.ts`
Expected: PASS

### Task 4: Add recent learning storage with TDD

**Files:**
- Create: `lib/storage/recent-learning.ts`
- Create: `tests/lib/storage/recent-learning.test.ts`

- [ ] **Step 1: Write the failing tests**

Cover:
- adding a recent item saves subject, title, and timestamp
- list returns most recent first
- list length is capped to a small number such as 5

- [ ] **Step 2: Run the focused test**

Run: `npm run test -- tests/lib/storage/recent-learning.test.ts`
Expected: FAIL because the storage module does not exist

- [ ] **Step 3: Implement the minimal storage helpers**

Add browser-safe helpers for:
- `getRecentLearning()`
- `saveRecentLearning(entry)`

Use graceful fallback when `window` is unavailable.

- [ ] **Step 4: Re-run the focused test**

Run: `npm run test -- tests/lib/storage/recent-learning.test.ts`
Expected: PASS

### Task 5: Add subject and problem seed data

**Files:**
- Create: `lib/data/subjects.ts`
- Create: `lib/data/problems.ts`

- [ ] **Step 1: Define the minimum data shape**

Keep the shapes small:
- subject key
- display name
- short description
- recommended problem prompt

- [ ] **Step 2: Implement four subject entries and one recommended problem per subject**

Subjects:
- 국어
- 영어
- 수학
- 과학

- [ ] **Step 3: Verify imports are stable**

Run: `npm run build`
Expected: data modules type-check and compile cleanly

## Chunk 3: Build The Home Screen

### Task 6: Create reusable home components

**Files:**
- Create: `components/subject-card.tsx`
- Create: `components/question-composer.tsx`
- Create: `components/recommended-problem-card.tsx`
- Create: `components/recent-learning-list.tsx`

- [ ] **Step 1: Define prop contracts inline in each component file**

Keep each component single-purpose:
- subject navigation
- free-form question input
- one recommended problem card
- recent activity list

- [ ] **Step 2: Implement minimal accessible components**

Requirements:
- keyboard accessible buttons/links
- clear Korean labels
- no abstraction layer shared across unrelated components

- [ ] **Step 3: Verify import graph**

Run: `npm run build`
Expected: components compile without circular or missing imports

### Task 7: Implement the mixed dashboard home page

**Files:**
- Create: `app/page.tsx`

- [ ] **Step 1: Define the expected page content**

The home page must show:
- 4 subject cards
- `오늘의 질문` input area
- one recommended problem
- recent learning list

- [ ] **Step 2: Implement the page**

Compose the home from the reusable components and seeded data.

- [ ] **Step 3: Verify the home page**

Run: `npm run build`
Expected: home page compiles

Run: `npm run dev`
Expected: local server starts and home page renders

## Chunk 4: Build The Learning Screen

### Task 8: Create learning screen components

**Files:**
- Create: `components/problem-panel.tsx`
- Create: `components/chat-panel.tsx`
- Create: `components/difficulty-selector.tsx`

- [ ] **Step 1: Define responsibilities**

- `problem-panel.tsx`: selected subject and recommended problem content
- `difficulty-selector.tsx`: `쉬움`, `보통`, `도전` 선택
- `chat-panel.tsx`: hint, explanation, summary display and follow-up input

- [ ] **Step 2: Implement the components**

Keep UI simple:
- two-column layout on desktop
- stacked layout on mobile
- bright, clear, child-friendly visual language

- [ ] **Step 3: Verify the components**

Run: `npm run build`
Expected: learning components compile cleanly

### Task 9: Implement subject learning route

**Files:**
- Create: `app/learn/[subject]/page.tsx`

- [ ] **Step 1: Define page behavior**

The route must:
- resolve the subject from the URL
- show the problem panel
- allow difficulty switching
- show AI response in `hint -> explanation -> summary` order

- [ ] **Step 2: Implement the route**

Use seeded subject/problem data and the response builder.

- [ ] **Step 3: Persist recent learning when route loads or question starts**

Use `saveRecentLearning` with the current subject and active prompt.

- [ ] **Step 4: Verify the learning route**

Run: `npm run build`
Expected: dynamic route compiles

Run: `npm run dev`
Expected: navigating to `/learn/math`-style routes works for all four subjects

## Chunk 5: Final Verification

### Task 10: Run project-wide verification

**Files:**
- Verify only

- [ ] **Step 1: Run unit tests**

Run: `npm run test`
Expected: all tests pass

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: production build succeeds

- [ ] **Step 3: Manual smoke-check**

Run: `npm run dev`
Expected:
- home screen shows all required sections
- each subject card opens a learning page
- difficulty changes the response wording
- recent learning updates after use

- [ ] **Step 4: Commit**

If this directory becomes a git repo before execution:

```bash
git add .
git commit -m "feat: build kidAI learning web app"
```

If git is still unavailable, skip commit and report that repository initialization is still missing.
