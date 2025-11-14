"use client";

import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Download,
  ExternalLink,
  Phone,
  Mail,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { TextAnimate } from "@/components/magicui/text-animate";
import { useRef, useState } from "react";
import LoanCalculator from "@/components/loan-calulator";
import { BlurFade } from "@/components/magicui/blur-fade";
import { cn, getGoogleMapsEmbedUrl } from "@/lib/utils";
import BanksMarquee from "@/components/banks";
import { useProject } from "@/hooks/useProjects";
import { useParams, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const { project, loading, error } = useProject(projectId);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const hasScrollTarget = !loading && !error && !!project;
  const { scrollYProgress } = useScroll({
    target: hasScrollTarget ? scrollContainerRef : undefined,
    offset: ["start start", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 0]);
  const backdropBlur = useTransform(scrollYProgress, [0, 0.2], [12, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden flex flex-col w-full md:px-6 px-3 py-5 gap-4">
        <div className="relative w-full h-[100vh] rounded-4xl overflow-hidden">
          <Skeleton className="w-full h-full" />
          <div className="absolute inset-0 z-10 flex justify-center items-center flex-col space-y-5 px-6">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "The requested project could not be found."}
          </p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const coverImage = project.coverImage || "/placeholder-project.jpg";

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col w-full md:px-6 px-3 py-5 gap-4">
      {/* Hero Section */}
      <div
        ref={scrollContainerRef}
        id="scroll-container"
        className="relative w-full h-[100vh] rounded-4xl overflow-hidden"
      >
        <motion.div
          className="absolute flex justify-center items-center flex-col space-y-5 h-full w-full inset-0 z-10 px-6 text-white"
          style={{
            backgroundColor: useTransform(
              backgroundOpacity,
              (value) => `rgba(0, 0, 0, ${value})`
            ),
            backdropFilter: useTransform(
              backdropBlur,
              (value) => `blur(${value}px)`
            ),
            opacity: textOpacity,
          }}
        >
          <Badge
            variant={
              project.status === "ongoing"
                ? "onGoing"
                : project.status === "completed"
                  ? "completed"
                  : "default"
            }
          >
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>

          <h1 className="md:text-8xl text-5xl font-bold text-center heading">
            {project.name}
          </h1>

          <div className="flex items-center space-x-2">
            <MapPin className="w-6 h-6" />
            <span className="md:text-xl text-lg">{project.address}</span>
          </div>

          {project.tagline && (
            <p className="md:text-2xl text-lg text-center max-w-2xl">
              {project.tagline}
            </p>
          )}

          {project.startingPrice && (
            <div className="text-center">
              <p className="text-lg opacity-90">Starting from</p>
              <p className="text-3xl font-bold text-[#CA6F1E]">
                {project.startingPrice}
              </p>
            </div>
          )}
        </motion.div>

        {/* Background Image */}
        <div className="absolute inset-0">
          {project.coverImage ? (
            <Image
              src={coverImage}
              alt={project.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-400 flex items-center justify-center">
              <div className="text-center text-gray-600">
                <div className="text-6xl mb-4">🏗️</div>
                <p className="text-2xl font-medium">{project.name}</p>
                <p className="text-lg">Image Coming Soon</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project Details Section */}
      <div className="w-full space-y-8 py-8">
        {/* Project Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <BlurFade delay={0.2}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#CA6F1E]" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{project.address}</p>
              </CardContent>
            </Card>
          </BlurFade>

          <BlurFade delay={0.3}>
            <Card>
              <CardHeader>
                <CardTitle>Property Types</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{project.types}</p>
              </CardContent>
            </Card>
          </BlurFade>

          {project.startingPrice && (
            <BlurFade delay={0.4}>
              <Card>
                <CardHeader>
                  <CardTitle>Starting Price</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-[#CA6F1E]">
                    {project.startingPrice}
                  </p>
                </CardContent>
              </Card>
            </BlurFade>
          )}
        </div>

        {/* Description */}
        <BlurFade delay={0.5}>
          <Card>
            <CardHeader>
              <CardTitle>About {project.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                {project.description}
              </p>
              {project.badge && (
                <div className="mt-4">
                  <Badge
                    variant="outline"
                    className="text-[#CA6F1E] border-[#CA6F1E]"
                  >
                    {project.badge}
                  </Badge>
                </div>
              )}
            </CardContent>
          </Card>
        </BlurFade>

        {/* Image Gallery */}
        {project.images && project.images.length > 0 && (
          <BlurFade delay={0.6}>
            <Card>
              <CardHeader>
                <CardTitle>Project Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                  {project.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden"
                    >
                      <Image
                        src={image}
                        alt={`${project.name} - Image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        )}

        {/* Brochures Section */}
        {project.brochures && project.brochures.length > 0 && (
          <BlurFade delay={0.7}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-[#CA6F1E]" />
                  Download Brochures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.brochures.map((brochure, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="justify-start h-auto p-4"
                      asChild
                    >
                      <a
                        href={brochure}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3"
                      >
                        <Download className="w-5 h-5 text-[#CA6F1E]" />
                        <div className="text-left">
                          <p className="font-medium">
                            Project Brochure {index + 1}
                          </p>
                          <p className="text-sm text-gray-500">PDF Download</p>
                        </div>
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        )}

        {/* Google Map */}
        {project.googleMapLink && (
          <BlurFade delay={0.8}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#CA6F1E]" />
                  Location Map
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <iframe
                      src={getGoogleMapsEmbedUrl(project.googleMapLink)}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    />
                  </div>
                  <Button variant="outline" asChild>
                    <a
                      href={project.googleMapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open in Google Maps
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </BlurFade>
        )}

        {/* Contact Section */}
        <BlurFade delay={0.9}>
          <Card>
            <CardHeader>
              <CardTitle>Interested in {project.name}?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <Button className="flex items-center gap-2 bg-[#CA6F1E] hover:bg-[#B8611A]">
                  <Phone className="w-4 h-4" />
                  Call Now
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Send Inquiry
                </Button>
              </div>
            </CardContent>
          </Card>
        </BlurFade>

        {/* Loan Calculator */}
        <BlurFade delay={1.0}>
          <LoanCalculator />
        </BlurFade>

        {/* Banks Marquee */}
        <BlurFade delay={1.1}>
          <BanksMarquee />
        </BlurFade>
      </div>
    </div>
  );
}
