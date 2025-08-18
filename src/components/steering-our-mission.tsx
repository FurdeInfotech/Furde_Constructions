import Image from "next/image";

function SteeringOurMission() {
  return (
    <div className="space-y-20 px-6 md:px-8">
      <div>
        <h1 className="mt-10 text-center section-heading">
          Steering Our Mission
        </h1>

        <p className="mt-5 text-center md:text-5xl text-2xl text-[#222222] ">
          Meet the Visionaries Behind Furde Constructions
        </p>
      </div>
      <div className="flex sm:flex-row flex-col justify-between items-center gap-8 md:pt-12 ">
        <div className="sm:w-[20%] w-full">
          <div className="aspect-[3/4] sm:h-[500px] relative overflow-hidden rounded-lg cardShadow">
            <Image
              src="/sunil_furde.jpg"
              alt="Sunil Furde"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="sm:w-[70%] w-full">
          <h2 className="font-semibold text-3xl text-[#4E4E4E] heading">
            Founder
          </h2>
          <h3 className="mt-3 font-semibold text-4xl heading">Sunil Furde</h3>
          <p className="mt-5 text-base md:text-2xl leading-relaxed">
            Sunil Furde, the Founder and CEO of Furde Constructions, is a
            seasoned civil engineer with over three decades of experience in the
            construction and real estate industry. A respected name in
            Maharashtra&apos;s construction sector, he has led numerous
            residential, commercial, and plotted development projects across
            Solapur and beyond. His vision, leadership, and dedication to
            quality construction have been the cornerstone of the company&apos;s
            success. As a life member of several esteemed engineering and
            technical institutions, he continually stays ahead of industry
            trends and standards. Under his guidance, Furde Constructions has
            grown into a trusted and innovative brand.
          </p>
        </div>
      </div>

      <div className="flex sm:flex-row flex-col justify-between items-center gap-8">
        <div className="sm:w-[20%] w-full">
          <div className="aspect-[3/4]  sm:h-[500px] relative overflow-hidden rounded-lg cardShadow">
            <Image
              src="/rohit_furde.jpg"
              alt="Rohit Furde"
              fill
              className="object-cover object-center"
            />
          </div>
        </div>
        <div className="sm:w-[70%] w-full">
          <h2 className="font-semibold text-3xl text-[#4E4E4E] heading">
            Executive Director
          </h2>
          <h3 className="mt-3 font-semibold text-4xl heading">Sunil Furde</h3>
          <p className="mt-5 text-base md:text-2xl leading-relaxed">
            Mr. Rohit Furde is the Executive Director at Furde Constructions. He
            holds an MS in Construction Engineering Management from the
            University of East London, United Kingdom, and a BE in Civil
            Engineering from Walchand Institute of Technology, Solapur,
            Maharashtra. With deep exposure to innovative civil engineering
            technologies and sustainable real estate development practices in
            London, he joined the family business to drive modernisation and
            expansion. Since joining Furde Constructions, he has played an
            instrumental role in business development and strategic growth
            initiatives. His international perspective and technical expertise
            have brought fresh energy to the company&apos;s evolving vision.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SteeringOurMission;
