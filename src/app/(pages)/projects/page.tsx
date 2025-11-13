"use client";

import { Suspense } from "react";
import AllProjects from "@/components/all-projects";
import LoanCalculator from "@/components/loan-calulator";
import BanksMarquee from "@/components/banks";
import { BlurFade } from "@/components/magicui/blur-fade";

function ProjectContent() {
  return (
    <div className="min-h-screen">
      <AllProjects />
      
      <div className="mt-16 space-y-8">
        <BlurFade delay={0.5}>
          <LoanCalculator />
        </BlurFade>
        
        <BlurFade delay={0.7}>
          <BanksMarquee />
        </BlurFade>
      </div>
    </div>
  );
}

function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#CA6F1E]"></div>
      </div>
    }>
      <ProjectContent />
    </Suspense>
  );
}

export default Page;
