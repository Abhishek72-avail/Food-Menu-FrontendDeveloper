import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomPrice(): number {
  return Number((Math.random() * (20 - 8) + 8).toFixed(2));
}