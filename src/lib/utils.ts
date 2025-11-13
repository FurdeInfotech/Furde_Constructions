import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility to extract Google Maps embed URL from a Google Maps share link
export function getGoogleMapsEmbedUrl(shareUrl: string): string {
  try {
    // Extract coordinates or place ID from various Google Maps URL formats
    const url = new URL(shareUrl);
    
    // Handle different Google Maps URL formats
    if (url.hostname === 'maps.app.goo.gl' || url.hostname === 'goo.gl') {
      // For shortened URLs, we'll use the full URL as embed source
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.4!2d${shareUrl}!3d1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzAwLjAiTiA3N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin`;
    }
    
    // For regular Google Maps URLs, extract coordinates
    const pathParts = url.pathname.split('/');
    const coordsIndex = pathParts.findIndex(part => part.startsWith('@'));
    
    if (coordsIndex !== -1) {
      const coords = pathParts[coordsIndex].substring(1).split(',');
      const lat = coords[0];
      const lng = coords[1];
      
      return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3048.4!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAwJzAwLjAiTiA3N8KwMDAnMDAuMCJF!5e0!3m2!1sen!2sin!4v1635789012345!5m2!1sen!2sin`;
    }
    
    // Fallback: return a generic embed URL
    return shareUrl.replace('maps.app.goo.gl', 'www.google.com/maps/embed?pb=');
  } catch (error) {
    console.error('Error parsing Google Maps URL:', error);
    return shareUrl;
  }
}

// Utility to format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Utility to get file extension from URL
export function getFileExtension(url: string): string {
  try {
    const pathname = new URL(url).pathname;
    return pathname.split('.').pop()?.toLowerCase() || '';
  } catch {
    return url.split('.').pop()?.toLowerCase() || '';
  }
}
