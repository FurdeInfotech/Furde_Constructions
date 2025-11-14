import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGoogleMapsEmbedUrl(url: string): string {
  if (!url) return "";
  // Only trust explicit embed URLs to avoid X-Frame-Options issues
  if (url.includes("/maps/embed?")) {
    return url;
  }
  // For regular Google Maps links we don't attempt to transform them,
  // as they often can't be safely iframed.
  return "";
}
