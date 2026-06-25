import type { Metadata } from "next";
import { RocketIcon } from "lucide-react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "컴포넌트",
  description: "스타터킷에 포함된 shadcn/ui 컴포넌트 갤러리",
};

export default function ComponentsPage() {
  return (
    <Container size="lg" className="py-12 md:py-16">
      {/* Page header */}
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">컴포넌트 갤러리</h1>
        <p className="text-muted-foreground">
          스타터킷에 사전 설치된 주요 shadcn/ui 컴포넌트 예시입니다.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Button</CardTitle>
            <CardDescription>다양한 변형과 크기</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </CardContent>
        </Card>

        {/* Badges & Avatar */}
        <Card>
          <CardHeader>
            <CardTitle>Badge & Avatar</CardTitle>
            <CardDescription>상태 표시와 프로필</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap items-center gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Separator orientation="vertical" className="h-6" />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </CardContent>
        </Card>

        {/* Alert */}
        <Card>
          <CardHeader>
            <CardTitle>Alert</CardTitle>
            <CardDescription>인라인 알림</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <RocketIcon />
              <AlertTitle>새 버전이 출시되었습니다.</AlertTitle>
              <AlertDescription>
                지금 업데이트하여 최신 기능을 사용해보세요.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Overlays */}
        <Card>
          <CardHeader>
            <CardTitle>Dialog & Tooltip</CardTitle>
            <CardDescription>오버레이 상호작용</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">다이얼로그 열기</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>정말 진행하시겠어요?</DialogTitle>
                  <DialogDescription>
                    이 작업은 되돌릴 수 없습니다.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">취소</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button>확인</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">툴팁 호버</Button>
                </TooltipTrigger>
                <TooltipContent>도움말 텍스트입니다.</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Tabs</CardTitle>
            <CardDescription>탭 네비게이션</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account">
              <TabsList>
                <TabsTrigger value="account">계정</TabsTrigger>
                <TabsTrigger value="password">비밀번호</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="pt-3 text-sm text-muted-foreground">
                계정 설정을 관리합니다.
              </TabsContent>
              <TabsContent value="password" className="pt-3 text-sm text-muted-foreground">
                비밀번호를 변경합니다.
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Accordion */}
        <Card>
          <CardHeader>
            <CardTitle>Accordion</CardTitle>
            <CardDescription>접이식 콘텐츠</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>무료로 사용할 수 있나요?</AccordionTrigger>
                <AccordionContent>
                  네, 이 스타터킷은 자유롭게 사용할 수 있습니다.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>다크 모드를 지원하나요?</AccordionTrigger>
                <AccordionContent>
                  네, 헤더의 테마 토글로 전환할 수 있습니다.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Form controls */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Form Controls</CardTitle>
            <CardDescription>입력 컨트롤 모음</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="demo-input">이메일</Label>
              <Input id="demo-input" type="email" placeholder="you@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="demo-select">국가</Label>
              <Select>
                <SelectTrigger id="demo-select">
                  <SelectValue placeholder="선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kr">대한민국</SelectItem>
                  <SelectItem value="us">미국</SelectItem>
                  <SelectItem value="jp">일본</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="demo-check" />
              <Label htmlFor="demo-check">약관에 동의합니다</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch id="demo-switch" />
              <Label htmlFor="demo-switch">알림 받기</Label>
            </div>
            <RadioGroup defaultValue="standard" className="sm:col-span-2">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="standard" id="r-standard" />
                <Label htmlFor="r-standard">스탠다드</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="pro" id="r-pro" />
                <Label htmlFor="r-pro">프로</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}
