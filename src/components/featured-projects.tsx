"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Badge } from "./ui/badge";
import  AnimatedArrowButton  from "./ui/animated-button";

export default function FeaturedProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

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

  return (
    <div className="">
      <h2 className=" text-center mt-16 section-heading">Featured Projects</h2>
      <p className=" md:text-5xl text-3xl text-center mt-10">
        Discover some of our projects
      </p>

      <div ref={containerRef} className="relative h-[400vh] md:mt-5 mt-0">
        {/* Card 1 */}
        <motion.div
          className="sticky top-16 h-screen flex items-center justify-center md:px-10 px-5"
          style={{
            y: card1Y,
            scale: card1Scale,
            opacity: card1Opacity,
            zIndex: card1Z,
          }}
        >
          <Card className="w-full md:max-w-8xl md:h-[50rem] max-w-full h-[40rem] shadow-2xl border-0 rounded-3xl relative overflow-hidden">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-black/10" />
            <div className="absolute inset-0">
              <Image
                src="/front.png"
                alt="Furde Heights Building"
                fill
                className="object-cover rounded-3xl"
              />
            </div>
            <div className="absolute  md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:left-auto md:right-16 md:translate-x-0  bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-2xl p-6 md:shadow-2xl shadow:lg md:min-w-md md:max-w-md min-w-xs max-w-fit">
              <div className="mb-3">
                <Badge variant={"onGoing"}>Ongoing</Badge>
              </div>

              <h2 className="md:text-2xl text-lg font-semibold heading mb-3">
                Furde Heights
              </h2>

              <div className="flex items-center mb-4 w-full">
                <MapPin
                  className="w-6 h-6 mr-2 text-[#CA6F1E]"
                  strokeWidth={2.5}
                />
                <span className="md:text-lg text-sm secondary-text">
                  Ganesh Nagar, Near RTO office
                </span>
              </div>
              <div className=" w-full flex justify-end md:mt-10 mt-10">
                <AnimatedArrowButton className=" bg-white">
                  View
                </AnimatedArrowButton>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="sticky top-16 h-screen flex items-center justify-center  md:px-10 px-5"
          style={{
            y: card2Y,
            scale: card2Scale,
            opacity: card2Opacity,
            zIndex: card2Z,
          }}
        >
          <Card className="w-full md:max-w-8xl md:h-[50rem] max-w-full h-[40rem] shadow-2xl border-0 rounded-3xl relative">
            <div className="absolute inset-0">
              <Image
                src="/front.png"
                alt="Furde Heights Building"
                fill
                className="object-cover rounded-3xl"
              />
            </div>
            <div className="absolute  md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:left-auto md:right-16 md:translate-x-0  bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-2xl p-6 md:shadow-2xl shadow:lg md:min-w-md md:max-w-md min-w-xs max-w-fit">
              <div className="mb-3">
                <Badge variant={"completed"}>Completed</Badge>
              </div>

              <h2 className="md:text-2xl text-lg font-semibold heading mb-3">
                SmurthiGanda Appts.
              </h2>

              <div className="flex items-center mb-4 w-full">
                <MapPin
                  className="w-6 h-6 mr-2 text-[#CA6F1E]"
                  strokeWidth={2.5}
                />
                <span className="md:text-lg text-sm secondary-text">
                  Vijapur Road, Near Girija Mangalkaryalaya
                </span>
              </div>
              <div className=" w-full flex justify-end md:mt-10 mt-10">
                <AnimatedArrowButton className=" bg-white">
                  View
                </AnimatedArrowButton>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="sticky top-16 h-screen flex items-center justify-center md:px-10 px-5"
          style={{
            y: card3Y,
            scale: card3Scale,
            opacity: card3Opacity,
            zIndex: card3Z,
          }}
        >
          <Card className="w-full md:max-w-8xl md:h-[50rem] max-w-full h-[40rem] shadow-2xl border-0 rounded-3xl relative p-0">
            <div className="absolute inset-0">
              <Image
                src="/front.png"
                alt="Furde Heights Building"
                fill
                className="object-cover rounded-3xl"
              />
            </div>
            <div className="absolute  md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:left-auto md:right-16 md:translate-x-0  bottom-10 left-1/2 -translate-x-1/2 bg-white rounded-2xl p-6 md:shadow-2xl shadow:lg md:min-w-md md:max-w-md min-w-xs max-w-fit">
              <div className="mb-3">
                <Badge variant={"completed"}>Completed</Badge>
              </div>

              <h2 className="md:text-2xl text-lg font-semibold heading mb-3">
                Furde Residency
              </h2>

              <div className="flex items-center mb-4">
                <MapPin
                  className="w-6 h-6 mr-2 text-[#CA6F1E]"
                  strokeWidth={2.5}
                />
                <span className="md:text-lg text-sm secondary-text">
                  Vijapur Road
                </span>
              </div>
              <div className=" w-full flex justify-end md:mt-10 mt-10">
                <AnimatedArrowButton className=" bg-white">
                  View
                </AnimatedArrowButton>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
