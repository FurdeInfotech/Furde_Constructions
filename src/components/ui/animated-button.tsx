"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export const AnimatedArrowButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const hoverProp = isMobile ? "whileTap" : "whileHover";

  return (
    <motion.button
      {...{ [hoverProp]: "hover" }}
      initial="rest"
      animate="rest"
      className={cn(
        "relative group font-medium text-base w-fit h-12 px-6 flex items-center gap-3 overflow-hidden rounded-full border border-border bg-transparent cursor-pointer",
        className
      )}
    >
      {/* Background expanding from center */}
      <motion.span
        variants={{
          rest: { scale: 0, opacity: 0 },
          hover: { scale: 4, opacity: 1 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="absolute inset-0 bg-[#CA6F1E] rounded-full z-0"
        style={{ transformOrigin: "center" }}
      />

      {/* Text */}
      <span className="relative z-10 text-black group-hover:text-white transition-colors duration-300">
        {children}
      </span>

      {/* Icon wrapper */}
      <span className="relative z-10 flex items-center justify-center w-9 h-9 rounded-full bg group-hover:bg-[#CA6F1E] overflow-hidden">
        {/* First arrow - flies OUT */}
        <motion.div
          variants={{
            rest: { x: 0, y: 0, opacity: 1 },
            hover: { x: 30, y: -30, opacity: 0 },
          }}
          transition={{ duration: 0.3 }}
          className="absolute"
        >
          <ArrowRight className="transform -rotate-45 text-black group-hover:text-white transition-colors duration-300" />
        </motion.div>

        {/* Second arrow - slides in */}
        <motion.div
          variants={{
            rest: { x: -30, y: 30, opacity: 0 },
            hover: { x: 0, y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="absolute"
        >
          <ArrowRight className="transform -rotate-45 text-black group-hover:text-black transition-colors duration-300" />
        </motion.div>
      </span>
    </motion.button>
  );
};
