import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomString(numCharacters: number = 4): string {
  return Math.random()
    .toString(36)
    .substring(2, numCharacters + 2);
}
