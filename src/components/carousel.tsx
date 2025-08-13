"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-1">
     
      <Carousel items={cards} />
    </div>
  );
}



const data = [
  {
   
    title: "Quality and Affordability",
    src: "/quality.png",
   
  },
  {
    
    title: "Trust and Transparency",
    src: "/trust.png",
 
  },
  {
  
    title: "Legal Compliance",
    src: "/legal.png",
 
  },

  {
    
    title: "Clear Title Assurance",
    src: "/clear.png",
 
  },
  
];
