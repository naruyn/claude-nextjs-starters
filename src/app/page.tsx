import Link from "next/link";
import {
  ArrowRightIcon,
  ComponentIcon,
  MoonIcon,
  PaletteIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  ZapIcon,
} from "lucide-react";

import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/layout/container";
import { ContactForm } from "@/components/common/contact-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: ZapIcon,
    title: "Next.js 16 + React 19",
    description: "App Router, Server Components, Turbopack 기반의 최신 스택.",
  },
  {
    icon: ComponentIcon,
    title: "shadcn/ui 컴포넌트",
    description: "radix-nova 프리셋의 접근성 높은 컴포넌트 25종 이상 사전 설치.",
  },
  {
    icon: MoonIcon,
    title: "다크 모드",
    description: "next-themes 기반 라이트/다크/시스템 테마를 기본 제공.",
  },
  {
    icon: PaletteIcon,
    title: "Tailwind CSS v4",
    description: "OKLch 색상 토큰과 CSS 변수로 손쉬운 테마 커스터마이징.",
  },
  {
    icon: ShieldCheckIcon,
    title: "타입 안전 폼",
    description: "react-hook-form과 zod로 검증되는 폼 시스템 내장.",
  },
  {
    icon: SmartphoneIcon,
    title: "반응형 레이아웃",
    description: "모바일 시트 메뉴까지 포함한 헤더/푸터 레이아웃 완비.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b">
        <Container size="sm" asChild>
          <div className="flex flex-col items-center gap-6 py-20 text-center md:py-28">
            <Badge variant="secondary">v0.1 · Starter Kit</Badge>
            <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
              빠르게 시작하는
              <br />
              모던 웹 스타터킷
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground text-pretty">
              {siteConfig.description}. 프로젝트를 처음부터 설정할 필요 없이
              바로 개발을 시작하세요.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/components">
                  컴포넌트 둘러보기
                  <ArrowRightIcon />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section id="features" className="py-16 md:py-24">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">주요 기능</h2>
            <p className="mt-3 text-muted-foreground">
              실무에서 바로 쓸 수 있도록 검증된 라이브러리로 구성했습니다.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <feature.icon className="size-5" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact demo */}
      <section className="border-t bg-muted/30 py-16 md:py-24">
        <Container size="sm">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight">폼 데모</h2>
            <p className="mt-3 text-muted-foreground">
              react-hook-form + zod 검증과 토스트 알림이 연동된 예시입니다.
            </p>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>문의하기</CardTitle>
              <CardDescription>
                양식을 제출하면 검증 후 토스트가 표시됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </Container>
      </section>
    </>
  );
}
