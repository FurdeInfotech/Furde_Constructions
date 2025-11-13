'use client';

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ProjectCardSkeletonProps {
  style?: any;
  className?: string;
}

export default function ProjectCardSkeleton({ style, className }: ProjectCardSkeletonProps) {
  return (
    <motion.div
      className={`sticky top-16 h-screen flex items-center justify-center md:px-10 px-5 ${className}`}
      style={style}
    >
      <Card className="w-full md:max-w-8xl md:h-[50rem] max-w-full h-[40rem] shadow-2xl border-0 rounded-3xl relative overflow-hidden">
        {/* Background skeleton */}
        <Skeleton className="absolute inset-0 rounded-3xl" />
        
        {/* Content card skeleton */}
        <div className="absolute md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:left-auto md:right-16 md:translate-x-0 bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-2xl p-6 md:shadow-2xl shadow:lg md:min-w-md md:max-w-md min-w-xs max-w-fit">
          {/* Badge skeleton */}
          <Skeleton className="h-6 w-20 mb-3 rounded-full" />
          
          {/* Title skeleton */}
          <Skeleton className="h-6 w-32 mb-3" />
          
          {/* Address skeleton */}
          <div className="flex items-center mb-4 w-full">
            <Skeleton className="w-6 h-6 mr-2 rounded" />
            <Skeleton className="h-4 w-40" />
          </div>
          
          {/* Button skeleton */}
          <div className="w-full flex justify-end md:mt-10 mt-10">
            <Skeleton className="h-10 w-20 rounded-full" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
