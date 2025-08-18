"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";

const timeline = [
  {
    year: "1989",
    title: "Furde Group",
    description:
      "The foundation of Furde Group was laid in 1989, with a vision to build more than the structures we aimed to create a legacy of trust and quality. Since its inception, we have been synonymous with reliability and excellence in every venture we take.",
  },
  {
    year: "1997",
    title: "Amar Constructions",
    description:
      "In 1997, we expanded our horizons with the establishment of Amar constructions. This marked our foray into large-scale construction projects, where we delivered numerous iconic structures contributing to the skyline of our city.",
  },
  {
    year: "2003",
    title: "Furde Constructions Private Limited",
    description:
      "Furde Constructions was born as a testament to our growing ambition. We focused on innovative designs and sustainable construction practices, ensuring that every project meets the highest standards of quality.",
  },
  {
    year: "2012",
    title: "Furde Group Warehouse",
    description:
      "2012 saw the inception of Furde Group Warehouse, catering to the logistics and warehousing needs of our clients. This venture solidified our reputation as a versatile player in the real estate and construction industry.",
  },
  {
    year: "2018",
    title: "Rohit Realty (Pune)",
    description:
      "Through Rohit Realty, we diversified our portfolio into the facility management sector along with construction, delivering projects in Pune and Solapur.",
  },
  {
    year: "2024",
    title: "Furde Infotech Private Limited",
    description:
      "We took a significant leap forward with the establishment of Furde Infotech Pvt. Ltd. This marks our entry into the world of technology and BPO services, driven by the same values that have guided us for over three decades - Innovative ideas, Dynamic Results.",
  },
];

function MileStone() {
  const [selectedYear, setSelectedYear] = useState<string>("1989");
  // Find the current timeline object to display its content
  const currentStory = timeline.find((item) => item.year === selectedYear);

  return (
    <div className="relative w-full h-[80vh] mt-5 rounded-4xl overflow-hidden">
      <div className="absolute flex justify-center items-start flex-col space-y-5 h-full w-full inset-0 md:bg-black/40 bg-black/40  backdrop-blur-lg z-10 md:px-8 px-6 py-5">
        <h1 className=" section-heading text-white">Building MileStones</h1>
        <p className="md:mt-0 md:text-xl text-base text-white  w-full">
          Three decades of trust, innovation, and unwavering commitment—each
          milestone reflects our dedication to transforming visions into
          enduring structures.
        </p>
        <div className="mt-10 flex flex-row h-96 text-white">
          {/* Left Side - Year List */}
          <ul className="flex flex-col w-1/2 justify-between">
            {timeline.map((item, index) => (
              <React.Fragment key={index}>
                <li
                  onClick={() => setSelectedYear(item.year)}
                  className={`cursor-pointer flex flex-row justify-between md:text-2xl text-xs items-center w-[90%] hover:font-bold duration-200 ${
                    selectedYear === item.year ? "font-bold" : ""
                  }`}
                >
                  {item.year}
                </li>
              
              </React.Fragment>
            ))}
          </ul>

          {/* Right Side - Story Content */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center">
            {currentStory && (
              <motion.div
                key={currentStory.year}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="font-bold heading text-2xl md:text-6xl">
                  {currentStory.title}
                </h1>
                <p className="mt-5 text-sm md:text-2xl leading-snug tracking-wide ">
                  {currentStory.description}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Image src="/fullfront.png" alt="Milestone Image" fill priority />
    </div>
  );
}

export default MileStone;
