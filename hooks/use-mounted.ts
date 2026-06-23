"use client";

import { useEffect, useState } from "react";

/**
 * 컴포넌트가 클라이언트에서 마운트되었는지 여부를 반환한다.
 * 테마 토글처럼 SSR/CSR 렌더링이 달라 hydration mismatch가 발생할 수 있는 곳에서 사용한다.
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // 마운트 직후 1회만 플래그를 올려 SSR/CSR 불일치를 방지하는 표준 패턴
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return mounted;
}
