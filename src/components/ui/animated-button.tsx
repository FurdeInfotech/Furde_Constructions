"use client"

import { motion, type Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import type { ButtonHTMLAttributes, ReactNode } from "react"

type AnimationVariant = "arrow" | "phone" | "scale" | "none"

import type { HTMLMotionProps } from "framer-motion"

interface EnhancedAnimatedButtonProps
  extends Omit<HTMLMotionProps<"button">, "onAnimationStart" | "onAnimationEnd"> {
  children: ReactNode
  className?: string
  icon?: ReactNode
  variant?: AnimationVariant
  iconPosition?: "left" | "right"
}

export const EnhancedAnimatedButton = ({
  children,
  className,
  icon,
  variant = "arrow",
  iconPosition = "right",
  type = "button",
  ...buttonProps
}: EnhancedAnimatedButtonProps) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const hoverProp = isMobile ? "whileTap" : "whileHover"

  const phoneRingVariants: Variants = {
    rest: {
      rotate: 0,
      scale: 1,
    },
    hover: {
      rotate: [0, -10, 10, -10, 10, -5, 5, 0],
      scale: 1.1,
      transition: {
        rotate: {
          duration: 0.6,
          repeat: 2,
          repeatType: "loop" as const,
          ease: "easeInOut" as const,
        },
        scale: {
          duration: 0.2,
          ease: "easeOut" as const,
        },
      },
    },
  }

  // Scale animation variants
  const scaleVariants: Variants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
  }

  // Arrow animation variants (original)
  const arrowVariants: Variants = {
    rest: { x: 0, y: 0, opacity: 1 },
    hover: { x: 30, y: -30, opacity: 0 },
  }

  const arrowSlideVariants: Variants = {
    rest: { x: -30, y: 30, opacity: 0 },
    hover: { x: 0, y: 0, opacity: 1 },
  }

  const backgroundVariants: Variants = {
    rest: { scale: 0, opacity: 0 },
    hover: { scale: 4, opacity: 1 },
  }

  const renderIcon = () => {
    if (!icon && variant !== "arrow") return null

    const iconContent = icon || <ArrowRight className="w-5 h-5" />

    switch (variant) {
      case "phone":
        return (
          <span className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/10 bg group-hover:bg-[#CA6F1E] overflow-hidden">
            <motion.div variants={phoneRingVariants} className="flex items-center justify-center">
              {iconContent}
            </motion.div>
          </span>
        )

      case "scale":
        return (
          <span className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/10 bg group-hover:bg-[#CA6F1E] overflow-hidden">
            <motion.div
              variants={scaleVariants}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center text-black group-hover:text-white transition-colors duration-300"
            >
              {iconContent}
            </motion.div>
          </span>
        )

      case "arrow":
        return (
          <span className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/10 bg group-hover:bg-[#CA6F1E] overflow-hidden">
            {/* First arrow - flies OUT */}
            <motion.div variants={arrowVariants} transition={{ duration: 0.3 }} className="absolute">
              <ArrowRight className="transform -rotate-45 text-black group-hover:text-white transition-colors duration-300" />
            </motion.div>

            {/* Second arrow - slides in */}
            <motion.div variants={arrowSlideVariants} transition={{ duration: 0.3, delay: 0.05 }} className="absolute">
              <ArrowRight className="transform -rotate-45 text-black group-hover:text-black transition-colors duration-300" />
            </motion.div>
          </span>
        )

      case "none":
        return icon ? (
          <span className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/10 bg group-hover:bg-[#CA6F1E] overflow-hidden">
            <span className="text-black group-hover:text-white transition-colors duration-300">{iconContent}</span>
          </span>
        ) : null

      default:
        return null
    }
  }

  return (
    <motion.button
      {...{ [hoverProp]: "hover" }}
      initial="rest"
      animate="rest"
      type={type}
      className={cn(
        "relative group font-medium text-base w-fit h-12 px-6 flex items-center gap-3 overflow-hidden rounded-full border border-border bg-transparent cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      {...buttonProps}
    >
      {/* Background expanding from center */}
      <motion.span
        variants={backgroundVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 bg-[#CA6F1E] rounded-full z-0"
        style={{ transformOrigin: "center" }}
      />

      {/* Icon on left */}
      {iconPosition === "left" && renderIcon()}

      {/* Text */}
      <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">{children}</span>

      {/* Icon on right */}
      {iconPosition === "right" && renderIcon()}
    </motion.button>
  )
}

// Default export
export default EnhancedAnimatedButton
