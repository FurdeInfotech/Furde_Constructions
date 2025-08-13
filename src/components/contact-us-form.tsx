import { Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Input } from "./ui/input";
import  AnimatedArrowButton, { EnhancedAnimatedButton }  from "./ui/animated-button";

function ContactUsForm() {
  return (
    <div className="flex md:flex-row md:gap-4 gap-10 flex-col items-stretch md:px-10 px-5 md:py-10 py-5">
      <div className="heading md:space-y-10 space-y-5 md:w-1/2 h-full">
        <h2 className="section-heading">Contact Us</h2>
        <h3 className="md:text-5xl text-3xl font-semibold leading-snug">
          We&apos;d love to hear from you
        </h3>
        <Link
          href={"tel:+919850326555"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-fit body gap-2 items-center md:text-xl text-lg text-neutral-700 hover:text-black heading"
        >
          <div className=" mt-0.5 w-12 h-12 items-center justify-center flex text-white rounded-full bg-[#71BD5A]">
            <Phone className="" />
          </div>
          <p className=" heading font-bold ml-2"> +91-9850326555</p>
        </Link>
      </div>
      <div className="md:w-1/2 md:space-y-10 space-y-7">
        <p className="secondary-text md:text-xl text-base">
          We&apos;d love to share more with you, please complete this form and
          our dedicated team will get back to you shortly.
        </p>
        <div className=" grid grid-cols-2 gap-x-4 gap-y-4">
          <Input
            className="h-12 rounded-full placeholder:secondary-text text-lg bg-[#EFEFEF]"
            placeholder="Your Name*"
          />
          <Input
            className="h-12 rounded-full placeholder:secondary-text text-lg bg-[#EFEFEF]"
            placeholder="Email*"
          />
          <Input
            className="h-12 rounded-full placeholder:secondary-text text-lg bg-[#EFEFEF]"
            placeholder="Phone*"
          />
          <Input
            className="h-12 rounded-full placeholder:secondary-text text-lg bg-[#EFEFEF]"
            placeholder="Inquiry About*"
          />
        </div>
        <div className=" flex md:flex-row flex-col justify-between md:items-center md:gap-0 gap-5">
          <p className="secondary-text md:text-xl text-base">
            We&apos;re excited to connect with you! <br />Required fields are marked *
          </p>
          <div className=" flex md:justify-normal justify-end">

            <EnhancedAnimatedButton type="submit" variant="phone" icon={<Phone className="w-5 h-5" />} iconPosition="right">
                Call Now
              </EnhancedAnimatedButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsForm;
