/**
 * Merge class name strings, filtering out falsy values.
 * Lightweight alternative to clsx + tailwind-merge.
 */
export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}
