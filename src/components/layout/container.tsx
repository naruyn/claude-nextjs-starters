import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full px-4 sm:px-6 lg:px-8", {
  variants: {
    size: {
      default: "max-w-screen-xl",
      sm: "max-w-3xl",
      lg: "max-w-screen-2xl",
      full: "max-w-none",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

/**
 * 페이지 콘텐츠의 가로 폭과 패딩을 표준화하는 레이아웃 컨테이너.
 * `asChild`로 임의의 태그(section, main 등)에 적용할 수 있다.
 */
function Container({
  className,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof containerVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      data-slot="container"
      className={cn(containerVariants({ size }), className)}
      {...props}
    />
  );
}

export { Container, containerVariants };
