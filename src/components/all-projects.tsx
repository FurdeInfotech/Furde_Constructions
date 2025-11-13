'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useProjects } from "@/hooks/useProjects";
import ProjectCard from "./project-card";
import ProjectCardSkeleton from "./project-card-skeleton";
import { Skeleton } from "./ui/skeleton";

export default function AllProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { projects, loading, error } = useProjects();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Handle error state
  if (error) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">
          Failed to Load Projects
        </h2>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  // Calculate dynamic height based on number of projects
  const projectCount = projects.length || 6; // Default to 6 for loading state
  const containerHeight = `${projectCount * 100}vh`;

  // Pre-calculate transforms for all projects (up to a reasonable limit)
  const maxProjects = Math.max(projectCount, 10); // Support up to 10 projects
  const cardTransforms = Array.from({ length: maxProjects }, (_, index) => {
    const step = 1 / maxProjects;
    const startProgress = index * step;
    const endProgress = (index + 1) * step;
    
    const y = useTransform(
      scrollYProgress,
      [startProgress, endProgress, Math.min(endProgress + step, 1)],
      [index * 80, 0, -80]
    );
    
    const scale = useTransform(
      scrollYProgress,
      [startProgress, endProgress, Math.min(endProgress + step, 1)],
      [0.9, 1, 0.9]
    );
    
    const opacity = useTransform(
      scrollYProgress,
      [startProgress, endProgress, Math.min(endProgress + step, 1)],
      [0.7, 1, 0.7]
    );
    
    const zIndex = useTransform(
      scrollYProgress,
      [startProgress, endProgress],
      [10, 30]
    );

    return { y, scale, opacity, zIndex };
  });

  return (
    <div className="w-full">
      <div className="text-center py-16">
        <h1 className="section-heading mb-4">All Projects</h1>
        <p className="md:text-2xl text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our complete portfolio of residential and commercial projects
        </p>
      </div>

      <div ref={containerRef} className="relative" style={{ height: containerHeight }}>
        {loading ? (
          // Show skeleton loading for multiple cards
          Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton
              key={index}
              style={{
                y: cardTransforms[index]?.y,
                scale: cardTransforms[index]?.scale,
                opacity: cardTransforms[index]?.opacity,
                zIndex: cardTransforms[index]?.zIndex,
              }}
            />
          ))
        ) : projects.length === 0 ? (
          // No projects state
          <div className="sticky top-16 h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🏗️</div>
              <h3 className="text-2xl font-semibold mb-2">No Projects Found</h3>
              <p className="text-gray-600">Check back later for new projects.</p>
            </div>
          </div>
        ) : (
          // Show actual project cards
          projects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              style={{
                y: cardTransforms[index]?.y,
                scale: cardTransforms[index]?.scale,
                opacity: cardTransforms[index]?.opacity,
                zIndex: cardTransforms[index]?.zIndex,
              }}
            />
          ))
        )}
      </div>

      {/* Project Statistics */}
      {!loading && projects.length > 0 && (
        <div className="py-16 bg-gray-50 rounded-2xl mt-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Our Portfolio</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#CA6F1E] mb-2">
                  {projects.length}
                </div>
                <p className="text-gray-600">Total Projects</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#CA6F1E] mb-2">
                  {projects.filter(p => p.status === 'completed').length}
                </div>
                <p className="text-gray-600">Completed</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#CA6F1E] mb-2">
                  {projects.filter(p => p.status === 'ongoing').length}
                </div>
                <p className="text-gray-600">Ongoing</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
