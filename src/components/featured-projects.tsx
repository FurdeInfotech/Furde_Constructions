"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedArrowButton from "./ui/animated-button";
import Link from "next/link";
import { useProjects, getFeaturedProjects } from "@/hooks/useProjects";
import ProjectCard from "./project-card";
import ProjectCardSkeleton from "./project-card-skeleton";

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { projects, loading, error } = useProjects();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Get featured projects (Furde Heights, Amar Vishwa, Vidyavihar)
  const featuredProjects = getFeaturedProjects(projects);

  // Card 1: Active from 0 to 0.25, then slides behind with proper spacing
  const card1Y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75],
    [0, -80, -160, -240]
  );
  const card1Scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75],
    [1, 0.9, 0.8, 0.7]
  );
  const card1Opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75],
    [1, 0.8, 0.6, 0.4]
  );
  const card1Z = useTransform(scrollYProgress, [0, 0.25], [30, 5]);

  // Card 2: Starts behind, becomes active from 0.25 to 0.5, then slides behind with spacing
  const card2Y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [80, 0, -80, -160, -240]
  );
  const card2Scale = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.9, 1, 0.9, 0.8, 0.7]
  );
  const card2Opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0.7, 1, 0.8, 0.6, 0.4]
  );
  const card2Z = useTransform(scrollYProgress, [0, 0.25, 0.5], [20, 30, 5]);

  // Card 3: Starts behind, becomes active from 0.5 to 0.75, then moves up with spacing for next section
  const card3Y = useTransform(
    scrollYProgress,
    [0, 0.5, 0.75, 1],
    [160, 80, 0, -120]
  );
  const card3Scale = useTransform(
    scrollYProgress,
    [0, 0.5, 0.75, 1],
    [0.8, 0.9, 1, 0.8]
  );
  const card3Opacity = useTransform(
    scrollYProgress,
    [0, 0.5, 0.75, 1],
    [0.5, 0.7, 1, 0.6]
  );
  const card3Z = useTransform(
    scrollYProgress,
    [-1, 0.5, 1, 1],
    [10, 30, 10, 5]
  );

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

  return (
    <div className="">
      <h2 className=" text-center mt-16 section-heading">Featured Projects</h2>
      <p className=" md:text-5xl text-3xl text-center mt-10">
        Discover some of our projects
      </p>

      <div ref={containerRef} className="relative h-[400vh] md:mt-10 mt-0">
        {loading ? (
          // Show skeleton loading for 3 cards
          <>
            <ProjectCardSkeleton
              style={{
                y: card1Y,
                scale: card1Scale,
                opacity: card1Opacity,
                zIndex: card1Z,
              }}
            />
            <ProjectCardSkeleton
              style={{
                y: card2Y,
                scale: card2Scale,
                opacity: card2Opacity,
                zIndex: card2Z,
              }}
            />
            <ProjectCardSkeleton
              style={{
                y: card3Y,
                scale: card3Scale,
                opacity: card3Opacity,
                zIndex: card3Z,
              }}
            />
          </>
        ) : (
          // Show actual project cards
          <>
            {featuredProjects[0] && (
              <ProjectCard
                project={featuredProjects[0]}
                style={{
                  y: card1Y,
                  scale: card1Scale,
                  opacity: card1Opacity,
                  zIndex: card1Z,
                }}
              />
            )}
            {featuredProjects[1] && (
              <ProjectCard
                project={featuredProjects[1]}
                style={{
                  y: card2Y,
                  scale: card2Scale,
                  opacity: card2Opacity,
                  zIndex: card2Z,
                }}
              />
            )}
            {featuredProjects[2] && (
              <ProjectCard
                project={featuredProjects[2]}
                style={{
                  y: card3Y,
                  scale: card3Scale,
                  opacity: card3Opacity,
                  zIndex: card3Z,
                }}
              />
            )}
          </>
        )}
      </div>

      <div className=" w-full  flex justify-center items-center">
        <Link href={`/projects`}>
          <AnimatedArrowButton className="text-base bg-white">
            View All Projects
          </AnimatedArrowButton>
        </Link>
      </div>
    </div>
  );
}
