---
description: '새 React 컴포넌트 파일을 프로젝트 관례에 맞춰 생성합니다'
argument-hint: <component-name>
allowed-tools:
  [
    'Read',
    'Write',
    'Bash(ls:*)',
  ]
---

# Claude 명령어: Add Component

새 React 컴포넌트 파일을 이 프로젝트의 관례(kebab-case 파일명, `function` 선언, `React.ComponentProps`, `cn()`, `data-slot`, named export, 한국어 JSDoc)에 맞춰 생성합니다.

## 사용법

```
/add-component <component-name>
```

- 예: `/add-component user-card`, `/add-component MainSidebar`, `/add-component query-provider`

## 프로세스

1. **인자 파싱**: `$1`을 컴포넌트 이름으로 사용한다. 비어 있으면 사용자에게 이름을 묻는다.
2. **이름 정규화**:
   - 파일명 → kebab-case (`UserCard` / `user-card` 입력 모두 `user-card.tsx`)
   - 컴포넌트명 → PascalCase (`UserCard`)
   - `data-slot` 값 → kebab-case (`user-card`)
3. **디렉토리 추론**: 아래 "디렉토리 추론 규칙"에 따라 대상 디렉토리를 결정한다 (`components/` 기준).
4. **타입 질문**: 서버 컴포넌트 / 클라이언트 컴포넌트(`"use client"`) 중 무엇으로 만들지 AskUserQuestion으로 묻는다.
5. **중복 방지**: 대상 경로에 파일이 이미 있으면 덮어쓰지 않고 알린 뒤 중단한다.
6. **파일 생성**: 아래 템플릿으로 `Write` 한다. `ComponentName`, `component-name` 자리표시자를 정규화된 이름으로 치환한다.
7. **안내**: 생성 경로와 import 예시를 한 줄로 출력한다.
   - 예: `import { UserCard } from "@/components/common/user-card";`

## 디렉토리 추론 규칙

컴포넌트 이름 패턴으로 적절한 디렉토리를 선택한다. 매칭되는 규칙이 없으면 기본값 `components/common/`을 쓴다.

- `*-nav`, `header`, `footer`, `*-sidebar` → components/layout/
- `*-provider`                            → components/providers/
- (그 외)                                  → components/common/  (기본값)
layout/providers/common의 용도는 CLAUDE.md의 "디렉토리 규칙" 참고

## 템플릿 (최소)

**서버 컴포넌트 (기본):**

```tsx
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * ComponentName — TODO: 컴포넌트 용도를 한 줄로 설명.
 */
export function ComponentName({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="component-name" className={cn(className)} {...props}>
      {/* TODO: 구현 */}
    </div>
  );
}
```

**클라이언트 컴포넌트:** 위 템플릿 맨 첫 줄에 `"use client";`와 빈 줄을 추가한다.

## 참고사항

- 이 프로젝트 컴포넌트 관례의 기준 예시는 `components/layout/container.tsx`다.
- 스타일 변형(variants)이 필요하면 생성 후 `class-variance-authority`(cva)로 직접 확장한다.
- shadcn 프리미티브(`components/ui/`)는 이 커맨드 대상이 아니다. `npx shadcn add <component>`를 사용한다.
