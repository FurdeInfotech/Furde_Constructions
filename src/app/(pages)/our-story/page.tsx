import { Card } from "@/components/ui/apple-cards-carousel";
import { div } from "framer-motion/client";
import Image from "next/image";
import React from "react";

function page() {
  const featuresData = [
    {
      title: "Quality and Affordability",
      image: "/trans.png",
      description:
        "We ensure clear titles, proper documentation, and transparent deals at every step. Our clients never face legal hassles, and loans are approved faster due to flawless paperwork.",
    },
    {
      title: "Trust and Transparency",
      image: "/precision.png",
      description:
        "From expert supervision to timely delivery, we prioritize quality materials and precision engineering. Our projects meet the highest standards, offering durable homes at reasonable rates.",
    },
    {
      title: "Legal Compliance",
      image: "/seamless.png",
      description:
        "We handle everything from property valuation and custom design to project management. Whether it's a bungalow or commercial complex, we deliver turnkey solutions.",
    },
  ];
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col w-full md:px-6 px-3 py-5 gap-4">
      <div className="relative w-full md:h-[50vh] h-[60vh] mt-5 rounded-4xl overflow-hidden">
        <div className="absolute flex justify-center items-start flex-col space-y-5 h-full w-full inset-0 md:bg-black/30 bg-black/40 md:backdrop-blur-sm backdrop-blur-lg z-10 px-6">
          <h1 className="md:mt-0 mt-[15%] section-heading text-white">
            Overview
          </h1>
          <p className="md:mt-5 md:text-xl text-base text-white md:w-1/2 w-full">
            Furde Constructions is a trusted name in the construction industry
            in and around Solapur, with a legacy dating back to 1989. We empower
            individuals to elevate their lifestyles through thoughtfully
            designed spaces that go beyond the ordinary. With over 25 landmark
            projects completed over three decades, we focus not just on building
            homes but on fostering vibrant, thriving communities. Our commitment
            is to deliver more than structures — we build hope, aspirations, and
            lasting value for families.
          </p>
        </div>
        <Image
          src="/out2.png"
          alt="Hero Image"
          fill
          className="object-cover [object-position:60%_center] rounded-4xl"
          priority
        />
      </div>
      <div className=" md:px-6 px-3 mt-7">
        <h1 className=" section-heading">Why Choose Us</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              image={feature.image}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
}

function FeatureCard({ image, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-200 overflow-hidden">
      <div className="aspect-video relative rounded-t-lg overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="md:p-6 p-3 px-0 md:px-0">
        <h3 className="md:text-3xl heading text-xl font-semibold  mb-3">
          {title}
        </h3>
        <p className="secondary-text font-normal md:text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
