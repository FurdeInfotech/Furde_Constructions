"use client";

import { Badge } from "@/components/ui/badge";
import { MapPin, PercentCircle, ArrowLeft, Download, ExternalLink, Lock, Unlock } from 'lucide-react';
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TextAnimate } from "@/components/magicui/text-animate";
import LoanCalculator from "@/components/loan-calulator";
import { BlurFade } from "@/components/magicui/blur-fade";
import BanksMarquee from "@/components/banks";
import { getGoogleMapsEmbedUrl } from "@/lib/utils";
import { useProject, type Project } from "@/hooks/useProjects";
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import ContactUsForm from "@/components/contact-us-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MahaRera from "@/components/maha-rera";

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  const { project, loading, error } = useProject(projectId);

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

  return <ProjectDetailContent project={project} />;
}

function ProjectDetailContent({ project }: { project: Project }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [brochuresUnlocked, setBrochuresUnlocked] = useState(false);
  const [brochureDialogOpen, setBrochureDialogOpen] = useState(false);
  const [pendingBrochureUrl, setPendingBrochureUrl] = useState<string | null>(
    null
  );
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 0]);
  const backdropBlur = useTransform(scrollYProgress, [0, 0.2], [12, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const coverImage = project.coverImage || "/placeholder-project.jpg";

  useEffect(() => {
    if (typeof window === "undefined") return;
    const unlocked = window.localStorage.getItem("brochure_unlocked");
    setBrochuresUnlocked(unlocked === "true");
  }, []);

  const handleBrochureClick = (brochureUrl: string) => {
    if (brochuresUnlocked) {
      if (typeof window !== "undefined") {
        window.open(brochureUrl, "_blank");
      }
      return;
    }

    setPendingBrochureUrl(brochureUrl);
    setBrochureDialogOpen(true);
  };

  const handleBrochureFormSuccess = () => {
    setBrochuresUnlocked(true);
    
    if (typeof window !== "undefined") {
      window.localStorage.setItem("brochure_unlocked", "true");
    }

    if (pendingBrochureUrl && typeof window !== "undefined") {
      window.open(pendingBrochureUrl, "_blank");
    }

    setTimeout(() => {
      setBrochureDialogOpen(false);
      setPendingBrochureUrl(null);
    }, 800);
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col w-full md:px-6 px-3 py-5 gap-4">
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
          <TextAnimate
            as="h1"
            animation="blurInUp"
            by="word"
            delay={0.2}
            duration={0.8}
            className="font-bold md:text-6xl text-3xl heading text-center"
            startOnView={true}
            once={false}
          >
            {project.name}
          </TextAnimate>

          <motion.div
            className="flex flex-row justify-center items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: false }}
          >
            <MapPin className="w-6 h-6 mr-2 text-[#CA6F1E]" strokeWidth={2.5} />
            <TextAnimate
              as="h2"
              animation="slideUp"
              by="word"
              delay={0.8}
              duration={0.6}
              className="md:text-3xl text-xl"
              startOnView={true}
              once={false}
            >
              {project.address}
            </TextAnimate>
          </motion.div>

          <TextAnimate
            as="h2"
            animation="fadeIn"
            by="word"
            delay={1.2}
            duration={0.5}
            className="md:text-3xl text-xl mt-10"
            startOnView={true}
            once={false}
          >
            {project.types}
          </TextAnimate>

          {project.startingPrice && (
            <TextAnimate
              as="h2"
              animation="blurInUp"
              by="word"
              delay={1.5}
              duration={0.6}
              className="md:text-3xl text-xl"
              startOnView={true}
              once={false}
            >
              {`Starting at ${project.startingPrice}`}
            </TextAnimate>
          )}
        </motion.div>

        <Image
          src={coverImage || "/placeholder.svg"}
          alt="Hero Image"
          fill
          className="object-cover"
          priority
        />
      </div>

      <motion.div
        className="flex justify-center items-center py-5 flex-col space-y-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: false, margin: "-100px" }}
      >
        <TextAnimate
          as="h1"
          animation="blurInUp"
          by="word"
          delay={0.2}
          duration={0.8}
          className="font-bold md:text-6xl text-3xl heading"
          startOnView={true}
          once={false}
        >
          {project.name}
        </TextAnimate>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: false }}
        >
          <Badge
            variant={"onGoing"}
            className="[&>svg]:size-4 font-bold text-base"
          >
            <PercentCircle strokeWidth={2.3} size={30} /> {project.badge}
          </Badge>
        </motion.div>

        <TextAnimate
          as="h1"
          animation="slideUp"
          by="word"
          delay={0.8}
          duration={0.6}
          className="primary-text section-heading mt-12"
          startOnView={true}
          once={false}
        >
          {project.tagline}
        </TextAnimate>

        <TextAnimate
          as="p"
          animation="blurInUp"
          by="word"
          delay={1.0}
          duration={1.2}
          className="mt-5 text-base md:text-xl secondary-text leading-relaxed text-center"
          startOnView={true}
          once={false}
        >
          {project.description}
        </TextAnimate>
      </motion.div>

      <div className="flex flex-col mt-10 px-4 max-w-full py-10">
        <h1 className="text-4xl font-bold mb-8">Project Gallery</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {project.images.map((image, index) => (
            <BlurFade key={index} delay={0.1 + index * 0.05} inView>
              <img
                src={image || "/placeholder.svg"}
                alt={`${project.name} image ${index + 1}`}
                className="w-full h-full object-cover rounded-2xl aspect-[4/3]"
              />
            </BlurFade>
          ))}
        </div>
      </div>

      {project.brochures && project.brochures.length > 0 && (
        <div className="flex flex-col mt-4 px-4 max-w-full pb-10">
          <h2 className="text-3xl font-bold mb-2">Brochures</h2>
          <p className="text-sm text-gray-600 mb-4">
            {brochuresUnlocked
              ? "Click any brochure to download the PDF."
              : "Fill the form once to unlock and download all brochures for this project."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.brochures.map((brochure, index) => (
              <BlurFade key={index} delay={0.1 + index * 0.05} inView>
                <button
                  type="button"
                  onClick={() => handleBrochureClick(brochure)}
                  className="w-full h-full"
                >
                  <div className="aspect-[4/3]">
                    <div className="relative overflow-hidden flex items-center gap-3 w-full h-full rounded-2xl border border-gray-200 bg-black/70 shadow-sm hover:shadow-md transition-all p-4">
                      <div
                        className="absolute inset-0 bg-cover bg-center blur-sm opacity-30"
                        style={{ backgroundImage: "url('/brochure.webp')" }}
                      />
                      <div className="relative flex items-center gap-3 w-full  justify-center flex-col">
                        {brochuresUnlocked ? (
                          <Download className="w-10 h-10 text-white flex-shrink-0" />
                        ) : (
                          <Lock className="w-10 h-10 text-white flex-shrink-0" />
                        )}
                        <div className="text-center text-white">
                          <p className="font-semibold">
                            Project Brochure {index + 1}
                          </p>
                          <p className="text-sm text-gray-200">
                            {brochuresUnlocked
                              ? "Download PDF"
                              : "Click to unlock & download"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </BlurFade>
            ))}
          </div>

          <Dialog
            open={brochureDialogOpen}
            onOpenChange={setBrochureDialogOpen}
          >
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Unlock Project Brochure</DialogTitle>
              </DialogHeader>
              <ContactUsForm
                mode="brochure"
                onSuccess={handleBrochureFormSuccess}
              />
            </DialogContent>
          </Dialog>
        </div>
      )}

      {project.googleMapLink && (
        <div className="flex flex-col mt-4 px-4 max-w-full pb-10 space-y-4">
          <h2 className="text-3xl font-bold">Location Map</h2>
          {getGoogleMapsEmbedUrl(project.googleMapLink) && (
            <div className="aspect-video rounded-2xl overflow-hidden">
              <iframe
                src={getGoogleMapsEmbedUrl(project.googleMapLink)}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>
          )}
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
      )}

      { project.name === "Furde Heights" ? <MahaRera/> : <></>}

      <LoanCalculator />
      <BanksMarquee />
    </div>
  );
}
