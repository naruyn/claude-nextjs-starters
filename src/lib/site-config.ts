import type { NavGroup, NavItem } from "@/types/nav";

/**
 * 사이트 전역 설정의 단일 진실 소스(single source of truth).
 * 메타데이터와 네비게이션 데이터를 한곳에서 관리한다.
 */
export const siteConfig = {
  name: "Next Starter",
  description:
    "Next.js 16 · React 19 · Tailwind v4 · shadcn/ui 기반 모던 웹 스타터킷",
  url: "https://example.com",
  links: {
    github: "https://github.com",
    docs: "/components",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** 헤더 메인 네비게이션 */
export const mainNav: NavItem[] = [
  { title: "홈", href: "/" },
  { title: "컴포넌트", href: "/components" },
  { title: "문서", href: "https://nextjs.org/docs", external: true },
];

/** 푸터 네비게이션 그룹 */
export const footerNav: NavGroup[] = [
  {
    title: "제품",
    items: [
      { title: "기능", href: "/#features" },
      { title: "컴포넌트", href: "/components" },
      { title: "변경 이력", href: "/#" },
    ],
  },
  {
    title: "리소스",
    items: [
      { title: "Next.js 문서", href: "https://nextjs.org/docs", external: true },
      { title: "shadcn/ui", href: "https://ui.shadcn.com", external: true },
      { title: "Tailwind CSS", href: "https://tailwindcss.com", external: true },
    ],
  },
  {
    title: "회사",
    items: [
      { title: "소개", href: "/#" },
      { title: "블로그", href: "/#" },
      { title: "문의", href: "/#" },
    ],
  },
];
