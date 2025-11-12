'use client';

import { useEffect, useRef } from 'react';

interface GoogleMapProps {
  src: string;
  className?: string;
  height?: string;
}

export function GoogleMap({ src, className = '', height = '300px' }: GoogleMapProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract coordinates or place ID from Google Maps link
  const getEmbedUrl = (url: string) => {
    try {
      // If it's already an embed URL, return as is
      if (url.includes('embed')) {
        return url;
      }

      // Extract coordinates from various Google Maps URL formats
      let embedUrl = 'https://www.google.com/maps/embed?pb=';
      
      // Handle different URL formats
      if (url.includes('@')) {
        const coords = url.split('@')[1]?.split(',');
        if (coords && coords.length >= 2) {
          const lat = coords[0];
          const lng = coords[1];
          embedUrl = `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${lat},${lng}&zoom=15`;
        }
      } else if (url.includes('place/')) {
        const placeId = url.split('place/')[1]?.split('/')[0];
        if (placeId) {
          embedUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(placeId)}`;
        }
      }
      
      // Fallback: use the original URL in an iframe (may not work due to X-Frame-Options)
      return url;
    } catch (error) {
      console.error('Error processing Google Maps URL:', error);
      return url;
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <iframe
        ref={iframeRef}
        src={getEmbedUrl(src)}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps"
        className="rounded-lg"
      />
    </div>
  );
}

// Simple component that just opens Google Maps in a new tab
export function GoogleMapLink({ 
  url, 
  children, 
  className = "text-blue-600 hover:text-blue-800 underline" 
}: { 
  url: string; 
  children: React.ReactNode; 
  className?: string; 
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
}
