"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/data/Projects";
import Image from "next/image";
import { X } from "lucide-react";
import { TextAnimate } from "@/components/magicui/text-animate";

function Page() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Handle scroll lock when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  const filteredProjects =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.name === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50 py-10 px-4 md:px-8 sm:pt-14 pt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <TextAnimate
            as="h1"
            animation="blurInUp"
            by="word"
            delay={0.2}
            duration={0.8}
            className="font-bold md:text-6xl text-4xl heading mb-4"
            startOnView={false}
          >
            Project Gallery
          </TextAnimate>
          <p className="text-gray-600 md:text-xl text-lg mt-4">
            Explore our completed and ongoing projects
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap gap-3 mb-12 justify-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setFilter("All")}
              variant={filter === "All" ? "default" : "outline"}
              className={`transition-all duration-300 px-6 py-2 rounded-full ${
                filter === "All"
                  ? "bg-[#CA6F1E] hover:bg-[#B35F0E] text-white shadow-lg shadow-orange-200"
                  : "hover:border-[#CA6F1E] hover:text-[#CA6F1E]"
              }`}
            >
              All Projects
            </Button>
          </motion.div>
          {PROJECTS.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setFilter(project.name)}
                variant={filter === project.name ? "default" : "outline"}
                className={`transition-all duration-300 px-6 py-2 rounded-full ${
                  filter === project.name
                    ? "bg-[#CA6F1E] hover:bg-[#B35F0E] text-white shadow-lg shadow-orange-200"
                    : "hover:border-[#CA6F1E] hover:text-[#CA6F1E]"
                }`}
              >
                {project.name}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="space-y-16"
          >
            {filteredProjects.map((project, projectIndex) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: projectIndex * 0.1 }}
                className="space-y-6"
              >
                {/* Project Title */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: projectIndex * 0.1 + 0.2 }}
                  className="flex items-center gap-4"
                >
                  <div className="h-1 w-12 bg-gradient-to-r from-[#CA6F1E] to-orange-300 rounded-full"></div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    {project.name}
                  </h2>
                  <div className="h-1 flex-1 bg-gradient-to-r from-orange-300 to-transparent rounded-full"></div>
                </motion.div>

                {/* Project Info */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: projectIndex * 0.1 + 0.3 }}
                  className="text-gray-600 max-w-3xl"
                >
                  {project.address}
                </motion.p>

                {/* Images Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {project.images.map((image, imageIndex) => (
                    <motion.div
                      key={imageIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: projectIndex * 0.1 + imageIndex * 0.05,
                      }}
                      whileHover={{ scale: 1.05, y: -8 }}
                      whileTap={{ scale: 0.95 }}
                      className="relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                      onClick={() => setSelectedImage(image)}
                    >
                      {/* Image */}
                      <Image
                        src={image}
                        alt={`${project.name} ${imageIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-sm font-semibold">
                            {project.name}
                          </p>
                          <p className="text-xs opacity-80">
                            View Image {imageIndex + 1}
                          </p>
                        </div>
                      </div>

                      {/* Border glow effect */}
                      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-[#CA6F1E] transition-all duration-300"></div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-xl">No projects found</p>
          </motion.div>
        )}
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, type: "spring" }}
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-w-[90vw] max-h-[90vh] overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={selectedImage}
                  alt="Selected image"
                  width={1200}
                  height={800}
                  className="object-contain max-h-[85vh] w-auto h-auto"
                  priority
                />

                {/* Close Button */}
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 text-white bg-[#CA6F1E] hover:bg-[#B35F0E] rounded-full p-3 transition-all shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Backdrop indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-8 text-white/60 text-sm"
              >
                Click anywhere to close
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Page;