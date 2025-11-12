"use client";

import { Phone, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "./ui/input";
import  AnimatedArrowButton, { EnhancedAnimatedButton }  from "./ui/animated-button";

function ContactUsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Thank you! We'll get back to you shortly.",
        });
        setFormData({ name: "", email: "", phone: "", inquiry: "" });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex md:flex-row md:gap-4 gap-10 flex-col items-stretch md:px-10 px-5 md:py-10 py-5 md:mt-12 mt-0">
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className=" grid grid-cols-2 gap-x-4 gap-y-4">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="h-12 rounded-full placeholder:secondary-text text-lg bg-[#EFEFEF]"
              placeholder="Your Name*"
            />
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="h-12 rounded-full placeholder:secondary-text text-lg bg-[#EFEFEF]"
              placeholder="Email*"
            />
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="h-12 rounded-full placeholder:secondary-text text-lg bg-[#EFEFEF]"
              placeholder="Phone*"
            />
            <Input
              name="inquiry"
              value={formData.inquiry}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="h-12 rounded-full placeholder:secondary-text text-lg bg-[#EFEFEF]"
              placeholder="Inquiry About*"
            />
          </div>
          
          {status.type && (
            <div
              className={`p-4 rounded-lg flex items-center gap-2 ${
                status.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {status.type === "success" && (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <p className="text-sm font-medium">{status.message}</p>
            </div>
          )}

          <div className=" flex md:flex-row flex-col justify-between md:items-center md:gap-0 gap-5">
            <p className="secondary-text md:text-xl text-base">
              We&apos;re excited to connect with you! <br />Required fields are marked *
            </p>
            <div className=" flex md:justify-normal justify-end">
              <EnhancedAnimatedButton 
                type="submit" 
               
                icon={isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <></>} 
             
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </EnhancedAnimatedButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUsForm;
