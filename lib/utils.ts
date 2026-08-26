/**
 * Merge class name strings, filtering out falsy values.
 * Lightweight alternative to clsx + tailwind-merge.
 */
export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

/**
 * Check if a given string is a valid HTTP/HTTPS URL.
 */
export function isValidUrl(url?: string): boolean {
  if (!url) return false;
  const trimmed = url.trim();
  if (
    trimmed === "" ||
    trimmed === "#" ||
    trimmed.toLowerCase() === "will be soon" ||
    trimmed.toLowerCase().includes("coming soon")
  ) {
    return false;
  }
  return trimmed.startsWith("http://") || trimmed.startsWith("https://");
}
