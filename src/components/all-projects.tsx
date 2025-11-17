"use client";

import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useProjects, Project as ProjectType } from "@/hooks/useProjects";
import ProjectCard from "./project-card";
import ProjectCardSkeleton from "./project-card-skeleton";

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export default function AllProjects() {
  const { projects, loading, error } = useProjects();

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

  const hasProjects = projects.length > 0;
  const groups = hasProjects ? chunkArray(projects, 3) : [];

  return (
    <div className="w-full">
      <div className="text-center py-16">
        <h1 className="section-heading mb-4">All Projects</h1>
        <p className="md:text-2xl text-lg text-gray-600 max-w-2xl mx-auto">
          Explore our complete portfolio of residential and commercial projects
        </p>
      </div>

      {loading ? (
        // One stack with skeletons while loading
        <ProjectsStack projects={[]} loading={true} />
      ) : !hasProjects ? (
        // No projects state
        <div className="sticky top-16 h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🏗️</div>
            <h3 className="text-2xl font-semibold mb-2">No Projects Found</h3>
            <p className="text-gray-600">Check back later for new projects.</p>
          </div>
        </div>
      ) : (
        // Render one stacked section per group of three projects
        groups.map((group, index) => (
          <ProjectsStack key={index} projects={group} loading={false} />
        ))
      )}

      {/* Project Statistics */}
      {/* {!loading && hasProjects && (
        <div className="py-16 bg-gray-50 rounded-2xl mt-16">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Portfolio
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-[#CA6F1E] mb-2">
                  {projects.length}
                </div>
                <p className="text-gray-600">Total Projects</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#CA6F1E] mb-2">
                  {projects.filter((p) => p.status === "completed").length}
                </div>
                <p className="text-gray-600">Completed</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#CA6F1E] mb-2">
                  {projects.filter((p) => p.status === "ongoing").length}
                </div>
                <p className="text-gray-600">Ongoing</p>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
}

function ProjectsStack({
  projects,
  loading,
}: {
  projects: ProjectType[];
  loading: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Exact same curves as FeaturedProjects for 3 cards
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

  const p0 = projects[0];
  const p1 = projects[1];
  const p2 = projects[2];

  return (
    <div ref={containerRef} className="relative h-[400vh] md:mt-10 mt-0">
      {loading ? (
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
        <>
          {p0 && (
            <ProjectCard
              project={p0}
              style={{
                y: card1Y,
                scale: card1Scale,
                opacity: card1Opacity,
                zIndex: card1Z,
              }}
            />
          )}
          {p1 && (
            <ProjectCard
              project={p1}
              style={{
                y: card2Y,
                scale: card2Scale,
                opacity: card2Opacity,
                zIndex: card2Z,
              }}
            />
          )}
          {p2 && (
            <ProjectCard
              project={p2}
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
  );
}
