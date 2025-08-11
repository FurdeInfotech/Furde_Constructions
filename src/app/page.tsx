"use client"
import { NumberTicker } from "@/components/magicui/number-ticker"
import type React from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { AnimatedArrowButton } from "@/components/ui/animated-button"
import WhyChooseUs from "@/components/why-choose-us"
import { useState, useEffect } from "react"
import Video from "next-video"
import furdeVideo from "../../videos/Furde Constructions.mp4"

export default function Home() {
  const [videoPlayer, setVideoPlayer] = useState(false)

  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const handleVideoPlayer = () => {
    setVideoPlayer(!videoPlayer)
    if (!videoPlayer) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleVideoPlayer()
    }
  }

  return (
    <>
      {videoPlayer && (
        <motion.div
          layoutId="video-player"
          className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          {/* Close button */}
          <button
            onClick={handleVideoPlayer}
            className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white text-black cursor-pointer rounded-full p-3 transition-colors"
            aria-label="Close video"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Video container optimized for vertical videos */}
          <div className="flex items-center justify-center w-full h-full">
            <Video
              src={furdeVideo}
              controls
              autoPlay
              className="rounded-lg shadow-2xl"
              style={{
                maxWidth: "min(400px, 90vw)", // Limit width for vertical videos
                maxHeight: "100vh", // Limit height to viewport
                width: "auto", // Let width adjust naturally
                height: "auto", // Let height adjust naturally
                objectFit: "contain",
              }}
            />
          </div>
        </motion.div>
      )}

      <div className="min-h-screen flex md:flex-row flex-col w-full md:px-6 px-3 py-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 100, x: 100 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg md:w-[45%] h-[80vh] md:h-auto flex flex-col justify-center px-6 rounded-4xl"
        >
          <h1 className="heading font-semibold md:text-5xl text-3xl leading-snug md:mt-0 mt-5">
            Expertise that Inspires Confidence. Buildings that Instill Pride.
          </h1>
          <p className="secondary-text mt-5 md:text-xl text-base">
            We have delivered projects that provide lasting values to the investors and communities.
          </p>
          <AnimatedArrowButton className="md:mt-20 mt-10 bg-white">View Projects</AnimatedArrowButton>

          <div className="flex justify-between items-center md:mt-20 mt-10">
            <p className="heading text-4xl font-bold">
              {" "}
              <NumberTicker
                value={35}
                startValue={1}
                delay={0.4}
                className="whitespace-pre-wrap tracking-tighter text-black dark:text-white"
              />
              + <span className="md:text-3xl text-2xl font-normal">Years of Experience</span>
            </p>

            <motion.div layoutId="video-player" onClick={() => handleVideoPlayer()} className="cursor-pointer z-20">
              <Button className="text-base w-fit bg-[url('/video.jpg')] bg-cover bg-center">
                Watch <Play />
              </Button>
            </motion.div>
          </div>
        </motion.div>
        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, y: 100, x: -100 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative md:w-[55%] w-full h-[300px] md:h-auto"
        >
          <Image
            src="/her.jpeg"
            alt="Hero Image"
            fill
            className="object-cover [object-position:60%_center] rounded-4xl"
            priority
          />
        </motion.div>
      </div>
      <div className="flex md:flex-row md:gap-0 gap-10 flex-col items-center md:px-8 px-5 md:py-10 py-5">
        <div className="heading space-y-7 md:w-1/2">
          <h2 className="md:text-3xl text-xl font-bold">Our Story</h2>
          <h3 className="md:text-5xl text-3xl font-semibold">Built on Trust, Driven by Precision</h3>
        </div>
        <div className="md:w-1/2">
          <p className="secondary-text md:text-xl text-base">
            Furde Constructions, established in 1989, is a recognized name in the Solapur regions real estate sector.
            With over 25 completed projects, the firm maintains a strong presence in residential development. Its focus
            is on delivering high-quality housing solutions designed to enhance urban living. The company aims to exceed
            industry standards through consistent execution and community-centric planning.
          </p>
          <Link href={`/our-story`}>
            <AnimatedArrowButton className="text-base mt-5 bg-white">Our Story</AnimatedArrowButton>
          </Link>
        </div>
      </div>
      <WhyChooseUs />
    </>
  )
}
