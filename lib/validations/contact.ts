import { z } from "zod";

/** 문의 폼 검증 스키마 */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: "이름은 2자 이상 입력해주세요." })
    .max(50, { message: "이름은 50자 이하로 입력해주세요." }),
  email: z.email({ message: "올바른 이메일 형식이 아닙니다." }),
  message: z
    .string()
    .min(10, { message: "문의 내용은 10자 이상 입력해주세요." })
    .max(1000, { message: "문의 내용은 1000자 이하로 입력해주세요." }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
