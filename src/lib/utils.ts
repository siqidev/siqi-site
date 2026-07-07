import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// client/src/lib/utils.ts と同一実装。
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
