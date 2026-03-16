export type CircleKey = "frontend" | "backend" | "devops";
export type HitZone = CircleKey | "fs-be" | "fs-do" | "be-do" | "all";

export type CirclePoint = {
  cx: number;
  cy: number;
};

export type DomainCircle = {
  key: CircleKey;
  title: string;
  sub: string;
  skillRows: string[][];
  lx: number;
  ly: number;
};

export type IntersectionLabel = {
  x: number;
  y: number;
  lines: string[];
  center?: boolean;
};

export type HitArea = {
  id: HitZone;
  cx: number;
  cy: number;
  r: number;
};
