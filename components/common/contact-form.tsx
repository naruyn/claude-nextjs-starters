"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { contactSchema, type ContactFormValues } from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

/**
 * react-hook-form + zod 검증 + sonner 토스트를 결합한 예시 문의 폼.
 * 실제 제출 로직(서버 액션/API 호출)은 onSubmit 자리에 연결하면 된다.
 */
export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    // 데모: 실제 전송 대신 짧은 지연 후 성공 토스트
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("문의가 접수되었습니다.", {
      description: `${values.name}님, 빠른 시일 내에 답변드리겠습니다.`,
    });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="name">이름</FieldLabel>
          <Input
            id="name"
            placeholder="홍길동"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">이메일</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError errors={[errors.email]} />
        </Field>

        <Field data-invalid={!!errors.message}>
          <FieldLabel htmlFor="message">문의 내용</FieldLabel>
          <Textarea
            id="message"
            rows={4}
            placeholder="무엇을 도와드릴까요?"
            aria-invalid={!!errors.message}
            {...register("message")}
          />
          <FieldDescription>10자 이상 입력해주세요.</FieldDescription>
          <FieldError errors={[errors.message]} />
        </Field>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "전송 중..." : "문의 보내기"}
        </Button>
      </FieldGroup>
    </form>
  );
}
