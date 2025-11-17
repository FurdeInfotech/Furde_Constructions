"use client";

import { CheckCircle, Loader2, Phone, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { EnhancedAnimatedButton } from "./ui/animated-button";
import { useInDialog } from "@/hooks/use-in-dialog";
import confetti from "canvas-confetti";

type ContactUsFormMode = "default" | "brochure";

interface ContactUsFormProps {
  mode?: ContactUsFormMode;
  onSuccess?: (data: {
    name: string;
    email: string;
    phone: string;
    inquiry: string;
  }) => void;
}

function ContactUsForm({ mode = "default", onSuccess }: ContactUsFormProps) {
  const isInDialog = useInDialog();
  const formRef = useRef<HTMLDivElement>(null);
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

  interface InquirySubject {
    _id: string;
    name: string;
  }

  const [subjects, setSubjects] = useState<InquirySubject[]>([]);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fetch inquiry subjects for dynamic dropdown
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setSubjectsLoading(true);
        const res = await fetch("/api/inquiry-subjects");
        const data = await res.json();
        if (data?.success) {
          setSubjects(data.data || []);
        } else {
          setSubjects([]);
        }
      } catch (error) {
        console.error("Error fetching inquiry subjects:", error);
        setSubjects([]);
      } finally {
        setSubjectsLoading(false);
      }
    };

    fetchSubjects();
  }, []);

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
          message:
            mode === "brochure"
              ? "Form submitted! Your brochure download is unlocking..."
              : "Thank you! We'll get back to you shortly.",
        });

        if (mode === "brochure") {
          try {
            if (typeof window !== "undefined") {
              window.localStorage.setItem(
                "brochure_contact_info",
                JSON.stringify(formData)
              );
              window.localStorage.setItem("brochure_unlocked", "true");
            }
          } catch (err) {
            console.error("Error saving brochure contact info:", err);
          }
        }

        onSuccess?.(formData);

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

  // Trigger confetti effect
  const triggerConfetti = () => {
    const rect = formRef.current?.getBoundingClientRect();
    const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const y = rect ? (rect.top + 100) / window.innerHeight : 0.5;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ["#71BD5A", "#4CAF50", "#8BC34A", "#CDDC39"],
    });
  };

  // Handle success effect
  useEffect(() => {
    if (status.type === "success") {
      triggerConfetti();
    }
  }, [status.type]);

  return (
    <div
      ref={formRef}
      className={cn(
        "flex flex-col items-stretch px-5 py-5",
        isInDialog
          ? "md:px-6 md:py-6 max-h-[80vh] overflow-y-auto"
          : "md:px-10 md:py-10 md:mt-12",
        "md:flex-row md:gap-6 gap-6"
      )}
    >
      {/* Left Side */}
      <div
        className={cn(
          "heading space-y-5",
          isInDialog ? "md:space-y-6" : "md:space-y-10",
          isInDialog ? "md:w-2/5" : "md:w-1/2",
          "h-full"
        )}
      >
        <h2 className="section-heading">
          {mode === "brochure" ? "Unlock Brochure" : "Contact Us"}
        </h2>
        <h3
          className={cn(
            "font-semibold leading-snug",
            isInDialog ? "text-2xl md:text-3xl" : "text-3xl md:text-5xl"
          )}
        >
          {mode === "brochure"
            ? "Fill in your details to unlock the brochure download"
            : "We'd love to hear from you"}
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
      {/* Right Side */}
      <div
        className={cn(
          "space-y-7",
          isInDialog ? "md:space-y-6" : "md:space-y-10",
          isInDialog ? "md:w-3/5" : "md:w-1/2"
        )}
      >
        <p className="secondary-text md:text-xl text-base">
          {mode === "brochure"
            ? "Complete this form once to unlock and download all project brochures."
            : "We'd love to share more with you, please complete this form and our dedicated team will get back to you shortly."}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            className={cn(
              "grid gap-x-4 gap-y-4",
              isInDialog ? "grid-cols-1" : "grid-cols-2"
            )}
          >
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
              className={cn(
                "rounded-full placeholder:secondary-text bg-[#EFEFEF]",
                isInDialog ? "h-10 text-sm" : "h-12 text-lg"
              )}
              placeholder="Your Name*"
            />
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
              className={cn(
                "rounded-full placeholder:secondary-text bg-[#EFEFEF]",
                isInDialog ? "h-10 text-sm" : "h-12 text-lg"
              )}
              placeholder="Email*"
            />
            <Input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={isLoading}
              className={cn(
                "rounded-full placeholder:secondary-text bg-[#EFEFEF]",
                isInDialog ? "h-10 text-sm" : "h-12 text-lg"
              )}
              placeholder="Phone*"
            />
            <div className="relative">
              <Input
                name="inquiry"
                value={formData.inquiry}
                onChange={(e) => {
                  handleChange(e);
                  setShowSubjectDropdown(true);
                }}
                onFocus={() => setShowSubjectDropdown(true)}
                required
                disabled={isLoading}
                className={cn(
                  "rounded-full placeholder:secondary-text bg-[#EFEFEF]",
                  isInDialog ? "h-10 text-sm" : "h-12 text-lg"
                )}
                placeholder="Inquiry About*"
                autoComplete="off"
              />
              {showSubjectDropdown &&
                !subjectsLoading &&
                subjects.length > 0 && (
                  <div className="absolute z-20 mt-1 w-full max-h-60 overflow-auto bg-white rounded-2xl shadow-lg border border-gray-200">
                    {subjects
                      .filter((subject) =>
                        subject.name
                          .toLowerCase()
                          .includes(formData.inquiry.toLowerCase())
                      )
                      .map((subject) => (
                        <button
                          key={subject._id}
                          type="button"
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              inquiry: subject.name,
                            }));
                            setShowSubjectDropdown(false);
                          }}
                        >
                          {subject.name}
                        </button>
                      ))}
                  </div>
                )}
            </div>
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

          <div
            className={cn(
              "flex flex-col gap-5 justify-between",
              isInDialog
                ? "md:flex-col"
                : "md:flex-row md:items-center md:gap-0"
            )}
          >
            <p
              className={cn(
                "secondary-text",
                isInDialog ? "text-sm md:text-base" : "text-base md:text-xl"
              )}
            >
              {mode === "brochure" ? (
                "Submit the form once to unlock all brochure downloads. Required fields are marked *."
              ) : (
                <>
                  We&apos;re excited to connect with you! <br />
                  Required fields are marked *
                </>
              )}
            </p>

            <div className=" flex md:justify-normal justify-end">
              <EnhancedAnimatedButton
                type="submit"
                icon={
                  isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <></>
                  )
                }
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
