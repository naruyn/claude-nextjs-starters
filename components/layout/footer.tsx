import Link from "next/link";
import { LayersIcon } from "lucide-react";

import { footerNav, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/layout/container";

/**
 * 사이트 전역 푸터 (서버 컴포넌트).
 * 브랜드 영역 + 네비게이션 그룹 + 카피라이트로 구성된다.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/30">
      <Container>
        <div className="grid gap-8 py-12 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="space-y-3">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <LayersIcon className="size-5 text-primary" />
              <span>{siteConfig.name}</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>
          {footerNav.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-sm font-medium">{group.title}</h3>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={`${group.title}-${item.title}`}>
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={item.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t py-6 text-sm text-muted-foreground">
          © {year} {siteConfig.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
