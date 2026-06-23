import Link from "next/link";
import { LayersIcon } from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/layout/container";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/common/theme-toggle";

/**
 * 사이트 전역 헤더 (서버 컴포넌트).
 * sticky + backdrop-blur, 로고 / 데스크톱 네비 / 우측 액션(테마 토글 + 모바일 메뉴)으로 구성된다.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <Container>
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <LayersIcon className="size-5 text-primary" />
              <span>{siteConfig.name}</span>
            </Link>
            <MainNav />
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
