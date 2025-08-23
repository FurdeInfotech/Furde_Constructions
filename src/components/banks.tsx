import React from "react";
import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "./magicui/scroll-based-velocity";
import { BANKS } from "@/data/Banks";
import { div } from "framer-motion/client";
import Image from "next/image";

function BanksMarquee() {
  return (
    <div className="relative flex w-full flex-col gap-8 items-center justify-center overflow-hidden bg-transparent md:py-12 md:mt-12 mt-10 py-12">
      <ScrollVelocityContainer className="flex w-full  flex-col gap-8">
        <ScrollVelocityRow baseVelocity={2} direction={1} className="max-h-48">
          {BANKS.map((bank, index) => (
            <Image
            key={index}
              src={bank}
              alt="bank"
              width={1000}
              height={1000}
              className=" object-contain md:w-48 w-28 mr-12"
            />
          ))}
        </ScrollVelocityRow>
        <ScrollVelocityRow baseVelocity={2} direction={-1} className="max-h-48">
          {BANKS.map((bank, index) => (
            <Image
              key={index}
              src={bank}
              alt="bank"
              width={1000}
              height={1000}
              className=" object-contain md:w-48 w-28 mr-12"
            />
          ))}
        </ScrollVelocityRow>
      </ScrollVelocityContainer>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-[#FAF9F6]"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-[#FAF9F6]"></div>
    </div>
  );
}

export default BanksMarquee;
