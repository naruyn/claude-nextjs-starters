# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> **⚠️ 코드 작성 전 필독 (최우선 규칙).** 이 프로젝트는 **Next.js 16.2.9 / React 19.2.4**로, 학습 데이터의 Next.js와 API·관례·파일 구조가 다를 수 있습니다. Next.js 관련 코드를 작성하기 전에 반드시 `node_modules/next/dist/docs/`의 해당 가이드(`01-app`, `02-pages`, `03-architecture`)를 먼저 읽으세요.

## 명령어

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run lint     # ESLint (flat config: eslint.config.mjs)

# E2E 테스트 — package.json 스크립트 없이 npx로 직접 실행
npx playwright test                       # 전체
npx playwright test tests/example.spec.ts # 단일 파일
npx playwright test -g "has title"        # 테스트 이름으로
npx playwright test --project=chromium    # 특정 브라우저 (chromium/firefox/webkit)
npx playwright show-report                # HTML 리포트

# UI 컴포넌트는 직접 파일을 만들지 말고 CLI로 추가 (radix-nova 스타일로 생성됨)
npx shadcn add <component>                # 예: npx shadcn add button
```

## 기술 스택에서 비자명한 점

- **`src/` 디렉토리 레이아웃** — 앱 코드는 모두 `src/` 아래에 있습니다(`src/app`, `src/components`, `src/lib`, `src/hooks`, `src/types`). 단, `public/`·`tests/`와 설정 파일(`package.json`, `next.config.ts`, `tsconfig.json`, `components.json` 등)은 **루트에 그대로** 둡니다. shadcn `components.json`의 `tailwind.css`도 `src/app/globals.css`를 가리킵니다.
- **Tailwind CSS v4** — `@tailwindcss/postcss` 사용, **`tailwind.config` 파일 없음**. 디자인 토큰·다크모드 변수는 모두 `src/app/globals.css`의 `@theme inline` 블록과 CSS 변수로 정의 (`@import "shadcn/tailwind.css"` 포함).
- **shadcn/ui `radix-nova` 스타일** (`components.json`), 아이콘은 `lucide-react`. 일반 shadcn과 관례가 다름 → 아래 "radix-nova 관례" 참조.
- **zod v4** + `react-hook-form` + `sonner` 조합으로 폼/검증/토스트 처리.
- **next-themes**로 다크모드, **Playwright**로 E2E.

## 아키텍처

### 설정의 단일 진실 소스: `src/lib/site-config.ts`
사이트 메타데이터(`siteConfig`), 헤더 네비(`mainNav`), 푸터 네비(`footerNav`)를 한곳에서 정의합니다. `src/app/layout.tsx`의 `metadata`와 `src/components/layout/*`이 모두 이 파일을 소비하므로, **네비게이션 링크나 사이트 정보를 바꿀 때는 컴포넌트가 아니라 이 파일을 먼저 수정**하세요. 네비 타입은 `src/types/nav.ts`(`NavItem`, `NavGroup`).

### 레이아웃 구조
`src/app/layout.tsx`가 `ThemeProvider`로 전체를 감싸고 `Header → main → Footer → Toaster` 순서로 렌더링합니다. 폰트 Geist는 `--font-sans` / `--font-geist-mono` CSS 변수로 주입되며, 이 변수명이 `globals.css`의 `@theme` 토큰(`--font-sans`, `--font-mono`)과 정합되어야 합니다.

### 디렉토리 규칙
- `src/components/ui/` — shadcn 생성 프리미티브. **직접 편집 지양, CLI로 관리.**
- `src/components/layout/` — Header, Footer, MainNav, MobileNav, Container
- `src/components/providers/` — ThemeProvider 등 컨텍스트 프로바이더
- `src/components/common/` — 앱 고유 합성 컴포넌트 (ThemeToggle, ContactForm 등)
- `src/lib/validations/` — zod 스키마 (예: `contact.ts`)
- `src/hooks/` — 커스텀 훅 (`use-mounted.ts` 등) · `src/types/` — 공유 타입
- 라우트: `src/app/page.tsx`(홈), `src/app/components/page.tsx`(컴포넌트 쇼케이스)
- 경로 별칭: `@/*` → `src/` (`@/components`, `@/lib`, `@/hooks`, `@/types`)

### radix-nova 관례 (중요)
- Radix 프리미티브는 개별 `@radix-ui/react-*`가 아니라 **통합 패키지에서 import**: `import { Dialog as DialogPrimitive } from "radix-ui"`
- 폼은 `Form` 컴포넌트가 아니라 **`Field` 컴포넌트 군**(`Field`, `FieldLabel`, `FieldError`, `FieldGroup`, `FieldDescription`)을 사용. `cn()`(`src/lib/utils.ts`)으로 클래스 병합, `cva` + `data-slot` 속성으로 스타일 변형 구성.

### 폼 패턴
`useForm` + `zodResolver(schema)`로 검증(스키마는 `src/lib/validations/`에 분리), 제출 결과는 `sonner`의 `toast`로 피드백. 전체 예시는 `src/components/common/contact-form.tsx`.

## 컨벤션
전역 규칙(한국어 주석·커밋·문서, 영어 식별자, 들여쓰기 2칸, camelCase)에 더해 이 프로젝트는 **TypeScript strict**를 사용합니다.
