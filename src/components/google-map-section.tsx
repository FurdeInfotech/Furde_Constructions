// src/components/google-map-section.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getGoogleMapsEmbedUrl } from "@/lib/utils";

interface GoogleMapSectionProps {
  googleMapLink: string;
}

export function GoogleMapSection({ googleMapLink }: GoogleMapSectionProps) {
  const [embedUrl, setEmbedUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadEmbedUrl = useCallback(async () => {
    try {
      setLoading(true);
      const url = await getGoogleMapsEmbedUrl(googleMapLink);
      if (url) {
        setEmbedUrl(url);
      } else {
        setError("Could not load map. Please try the direct link below.");
      }
    } catch (err) {
      console.error("Error loading map:", err);
      setError("Failed to load map. Please try the direct link below.");
    } finally {
      setLoading(false);
    }
  }, [googleMapLink]);

  useEffect(() => {
    loadEmbedUrl();
  }, [loadEmbedUrl]);

  return (
    <div className="flex flex-col mt-4 px-4 max-w-full pb-10 space-y-4">
      <h2 className="text-3xl font-bold">Location Map</h2>
      
      {loading ? (
        <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center">
          <div className="animate-pulse text-gray-500">Loading map...</div>
        </div>
      ) : error ? (
        <div className="aspect-video rounded-2xl overflow-hidden bg-red-50 border border-red-100 flex items-center justify-center text-red-600 p-4 text-center">
          {error}
        </div>
      ) : embedUrl ? (
        <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-2xl"
            title="Project Location on Google Maps"
          />
        </div>
      ) : null}

      <Button variant="outline" asChild>
        <a
          href={googleMapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          Open in Google Maps
        </a>
      </Button>
    </div>
  );
}