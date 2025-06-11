import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
// This function merges class names and removes duplicates
// It is useful for combining Tailwind CSS classes with conditional classes
// and ensuring that the final class string is optimized.
// It uses clsx for conditional class names and tailwind-merge to handle Tailwind CSS classes.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}