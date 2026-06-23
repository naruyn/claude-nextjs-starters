# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> **위 import가 가장 중요한 규칙입니다.** 이 프로젝트는 Next.js 16.2.9를 사용하며 학습 데이터의 Next.js와 API·관례·파일 구조가 다를 수 있습니다. Next.js 관련 코드를 작성하기 전에 반드시 `node_modules/next/dist/docs/`(`01-app`, `02-pages`, `03-architecture`)의 해당 가이드를 먼저 읽으세요.

## 명령어

```bash
npm run dev      # 개발 서버 (http://localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버
npm run lint     # ESLint (eslint-config-next)

npx playwright test                       # 전체 E2E 테스트
npx playwright test tests/example.spec.ts # 단일 파일 실행
npx playwright test -g "has title"        # 테스트 이름으로 단일 실행
npx playwright test --project=chromium    # 특정 브라우저만
npx playwright show-report                # HTML 리포트 보기
```

UI 컴포넌트 추가는 직접 파일을 만들지 말고 CLI를 사용하세요:

```bash
npx shadcn add <component>   # 예: npx shadcn add button
```

## 기술 스택

- **Next.js 16.2.9** (App Router, RSC 기본) · **React 19.2.4**
- **Tailwind CSS v4** — `@tailwindcss/postcss` 사용, 별도 `tailwind.config` 없음. 토큰은 `app/globals.css`의 CSS 변수로 정의
- **shadcn/ui** — `radix-nova` 스타일 (`components.json` 참조), 아이콘은 `lucide-react`
- **react-hook-form + zod v4 + sonner** — 폼/검증/토스트 조합
- **next-themes** — 다크모드
- **Playwright** — E2E 테스트 (chromium/firefox/webkit)

## 아키텍처

### 설정의 단일 진실 소스: `lib/site-config.ts`
사이트 메타데이터(`siteConfig`), 헤더 네비(`mainNav`), 푸터 네비(`footerNav`)를 한곳에서 정의합니다. `app/layout.tsx`의 `metadata`와 `components/layout/*`이 모두 이 파일을 소비하므로, **네비게이션 링크나 사이트 정보를 바꿀 때는 컴포넌트가 아니라 이 파일을 먼저 수정**하세요. 네비 타입은 `types/nav.ts`(`NavItem`, `NavGroup`)에 정의되어 있습니다.

### 레이아웃 구조
`app/layout.tsx`가 `ThemeProvider`로 전체를 감싸고 `Header → main → Footer → Toaster` 순서로 렌더링합니다. 폰트는 Geist를 `--font-sans` / `--font-geist-mono` CSS 변수로 주입합니다 (`--font-sans`가 shadcn 토큰과 정합되어야 함).

### 디렉토리 규칙
- `components/ui/` — shadcn 생성 프리미티브 (직접 편집 지양, CLI로 관리)
- `components/layout/` — Header, Footer, MainNav, MobileNav, Container
- `components/providers/` — ThemeProvider 등 컨텍스트 프로바이더
- `components/common/` — 앱 고유 합성 컴포넌트 (ThemeToggle, ContactForm 등)
- `lib/validations/` — zod 스키마 (예: `contact.ts`)
- `hooks/` — 커스텀 훅 (`use-mounted.ts` 등)
- `types/` — 공유 타입
- 경로 별칭: `@/*` → 프로젝트 루트 (`@/components`, `@/lib`, `@/hooks`, `@/types`)

### radix-nova 컴포넌트 관례 (중요)
- Radix 프리미티브는 개별 `@radix-ui/react-*`가 아니라 통합 패키지에서 import: `import { Dialog as DialogPrimitive } from "radix-ui"`
- 폼은 `Form` 컴포넌트가 아니라 **`Field` 컴포넌트 군**(`Field`, `FieldLabel`, `FieldError`, `FieldGroup`, `FieldDescription`)을 사용합니다. 패턴은 `components/common/contact-form.tsx` 참조
- 클라이언트 컴포넌트는 `"use client"`, 클래스 병합은 `cn()`(`lib/utils.ts`), 스타일 변형은 `class-variance-authority`(cva)와 `data-slot` 속성으로 구성

### 폼 패턴
`react-hook-form`의 `useForm` + `zodResolver(schema)`로 검증하고, zod 스키마는 `lib/validations/`에 분리합니다. 제출 결과는 `sonner`의 `toast`로 피드백합니다. 전체 예시는 `components/common/contact-form.tsx`.

## 컨벤션
- 코드 주석·커밋 메시지·문서: 한국어 / 변수·함수명: 영어
- 들여쓰기 2칸, TypeScript strict, 변수 camelCase
