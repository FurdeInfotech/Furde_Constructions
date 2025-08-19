"use client"

import { Badge } from "@/components/ui/badge"
import { MapPin, PercentCircle } from "lucide-react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import { TextAnimate } from "@/components/magicui/text-animate"
import { useRef } from "react"
import LoanCalculator from "@/components/loan-calulator"

function Page() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end start"],
  })

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [0.5, 0])
  const backdropBlur = useTransform(scrollYProgress, [0, 0.2], [12, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])

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
            backgroundColor: useTransform(backgroundOpacity, (value) => `rgba(0, 0, 0, ${value})`),
            backdropFilter: useTransform(backdropBlur, (value) => `blur(${value}px)`),
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
            Furde Heights
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
              Ganesh Nagar, Near RTO office
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
            2 BHK - 3BHK
          </TextAnimate>

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
            Starting at Rs 40,00,000/-
          </TextAnimate>
        </motion.div>

        <Image src="/hero.png" alt="Hero Image" fill className="object-cover" priority />
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
          Furde Heights
        </TextAnimate>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: false }}
        >
          <Badge variant={"onGoing"} className="[&>svg]:size-4 font-bold text-base">
            <PercentCircle strokeWidth={2.3} size={30} /> Great Flats, Great Deals
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
          The Secret to Signature Living
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
          Furde Heights redefines modern living in Solapur, offering a perfect balance of comfort, elegance, and
          convenience. Thoughtfully designed with contemporary architecture, it harmonizes beautifully with its
          surroundings to create an exceptional residential experience. Located in Ganesh Nagar, near the RTO, this
          premium address offers residents easy access to the city's key destinations while enjoying a peaceful
          neighborhood ambiance. With spacious, well-planned flats and every amenity crafted for comfort and well-being,
          Furde Heights is where quality living truly begins.
        </TextAnimate>
      </motion.div>

      <LoanCalculator/>
    </div>
  )
}

export default Page
