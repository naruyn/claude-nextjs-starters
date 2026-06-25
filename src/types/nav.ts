import type { LucideIcon } from "lucide-react";

/** 네비게이션 항목 (헤더/푸터/사이드바 공용) */
export interface NavItem {
  /** 화면에 표시되는 라벨 */
  title: string;
  /** 이동 경로 */
  href: string;
  /** 외부 링크 여부 (새 탭으로 열림) */
  external?: boolean;
  /** 선택적 아이콘 (lucide-react) */
  icon?: LucideIcon;
  /** 비활성화 여부 */
  disabled?: boolean;
}

/** 라벨이 있는 네비게이션 그룹 (푸터 등에서 사용) */
export interface NavGroup {
  title: string;
  items: NavItem[];
}
