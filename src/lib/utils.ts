import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getGoogleMapsEmbedUrl(url: string): Promise<string> {
  if (!url) return "";

  try {
    // Get final URL by expanding short links on the server
    const res = await fetch("/api/expand-map", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();
    const finalUrl = data.finalUrl || url;

    // Extract @lat,lng from final URL
    const match = finalUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

    if (match) {
      const lat = match[1];
      const lng = match[2];

      // Use safe embed URL that never fails
      return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
    }

    return "";
  } catch (err) {
    console.error(err);
    return "";
  }
}
