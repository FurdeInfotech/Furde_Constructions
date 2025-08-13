import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AppleCardsCarouselDemo } from "./carousel";

function WhyChooseUs() {
  return (
    <div className=" relative w-full md:h-[100vh] h-screen mt-5 rounded-4xl overflow-hidden ">
      <div className="absolute flex justify-center flex-col space-y-5 h-full w-full inset-0 bg-black/55 backdrop-blur-sm z-10 md:px-10 px-5">
        <h1 className=" section-heading text-white  mt-16">
          Why Choose Us?
        </h1>
        <h2 className=" md:text-5xl text-3xl text-white mt-5">
          What makes us different?
        </h2>
        <p className=" md:text-xl text-base text-white">
          Whether you&apos;re exploring our homes or envisioning something
          custom, we&apos;re here to bring your dream to life.
        </p>
        <AppleCardsCarouselDemo />
        <div className=" relative md:mt-0 mt-0">
          {/* <h1 className="text-[15rem] absolute -top-[80%] left-1/2 -translate-x-1/2 z-0 md:block hidden bg-clip-text text-transparent font-bold heading bg-gradient-to-b from-white/90 to-white/40">
            Furde
          </h1> */}
        </div>
      </div>

      <Image src="/fullfront.png" alt="Footer Image" fill priority />
    </div>
  );
}

export default WhyChooseUs;
