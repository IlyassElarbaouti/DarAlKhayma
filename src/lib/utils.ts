import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Price formatting utility
export function formatPrice(amount: number, currency: string = "MAD"): string {
  const formatters = {
    MAD: (amt: number) => `${amt.toLocaleString()} MAD`,
    EUR: (amt: number) => `€${amt.toLocaleString()}`,
    USD: (amt: number) => `$${amt.toLocaleString()}`,
  };

  const formatter = formatters[currency as keyof typeof formatters] || formatters.MAD;
  return formatter(amount);
}

// Date formatting utility
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}

// Calculate nights between dates
export function calculateNights(checkIn: Date, checkOut: Date): number {
  const timeDiff = checkOut.getTime() - checkIn.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
}

// Debounce utility for search
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Generate slug from string
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Truncate text utility
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

// Safe rating utilities
export function formatRating(rating?: { average: number; count: number }): {
  average: string;
  count: number;
  hasRating: boolean;
} {
  if (!rating || typeof rating.average !== 'number') {
    return {
      average: "0.0",
      count: 0,
      hasRating: false
    };
  }

  return {
    average: rating.average.toFixed(1),
    count: rating.count || 0,
    hasRating: true
  };
}

export function getRatingStars(rating?: { average: number; count: number }): number {
  if (!rating || typeof rating.average !== 'number') {
    return 0;
  }
  return Math.floor(rating.average);
}
