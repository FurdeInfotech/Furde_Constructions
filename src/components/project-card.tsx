'use client';

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import AnimatedArrowButton from "./ui/animated-button";
import Link from "next/link";
import { Project } from "@/hooks/useProjects";

interface ProjectCardProps {
  project: Project;
  style?: any;
  className?: string;
  showViewButton?: boolean;
}

export default function ProjectCard({ 
  project, 
  style, 
  className,
  showViewButton = true 
}: ProjectCardProps) {
  // Fallback for missing cover image
  const coverImage = project.coverImage || '/placeholder-project.jpg';
  
  return (
    <motion.div
      className={`sticky top-16 h-screen flex items-center justify-center md:px-10 px-5 ${className}`}
      style={style}
    >
      <Card className="w-full md:max-w-8xl md:h-[50rem] max-w-full h-[40rem] shadow-2xl border-0 rounded-3xl relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-black/10" />
        
        <div className="absolute inset-0">
          {project.coverImage ? (
            <Image
              src={coverImage}
              alt={`${project.name} Building`}
              fill
              className="object-cover rounded-3xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-3xl flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🏗️</div>
                <p className="text-lg font-medium">{project.name}</p>
                <p className="text-sm">Image Coming Soon</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="absolute md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:left-auto md:right-16 md:translate-x-0 bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-2xl p-6 md:shadow-2xl shadow:lg md:min-w-md md:max-w-md min-w-xs max-w-fit">
          <div className="mb-3">
            <Badge variant={project.status === "ongoing" ? "onGoing" : project.status === "completed" ? "completed" : "default"}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </Badge>
          </div>

          <h2 className="md:text-2xl text-lg font-semibold heading mb-3 line-clamp-2">
            {project.name}
          </h2>

          <div className="flex items-start mb-4 w-full">
            <MapPin
              className="w-6 h-6 mr-2 text-[#CA6F1E] flex-shrink-0 mt-0.5"
              strokeWidth={2.5}
            />
            <span className="md:text-lg text-sm secondary-text line-clamp-2">
              {project.address}
            </span>
          </div>
          
          {project.types && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 font-medium">Property Types:</p>
              <p className="text-sm text-gray-800">{project.types}</p>
            </div>
          )}
          
          {project.startingPrice && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 font-medium">Starting Price:</p>
              <p className="text-lg font-semibold text-[#CA6F1E]">{project.startingPrice}</p>
            </div>
          )}
          
          {showViewButton && (
            <div className="w-full flex justify-end md:mt-6 mt-6">
              <Link href={`/projects/${project._id}`}>
                <AnimatedArrowButton className="bg-white">
                  View Details
                </AnimatedArrowButton>
              </Link>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
