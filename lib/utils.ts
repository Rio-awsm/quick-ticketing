import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateTicketCode(): string {
  return Math.floor(1000 + Math.random() * 9000).toString();
}