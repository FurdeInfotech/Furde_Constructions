"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

function Footer() {
  const navItems = [
    {
      name: "Our Story",
      link: "/story",
    },
    {
      name: "Our Projects",
      link: "/projects",
    },
    {
      name: "Gallery",
      link: "/gallery",
    },
    {
      name: "Contact Us",
      link: "#contact",
    },
  ];

  const year = new Date().getFullYear();
  return (
    <div className=" relative w-full md:h-[110vh] h-screen mt-5 rounded-4xl overflow-hidden ">
      <div className="absolute flex justify-center items-center flex-col space-y-5 h-full w-full inset-0 bg-black/55 backdrop-blur-sm z-10 md:px-5 px-2">
        <h1 className=" font-semibold md:text-5xl text-center text-3xl text-white leading-snug heading">
          Your Dream Home <br />
          Awaits
        </h1>

        <p className=" md:text-2xl text-base text-white text-center md:w-1/3">
          Whether you&apos;re exploring our homes or envisioning something
          custom, we&apos;re here to bring your dream to life.
        </p>

        <div className=" relative md:mt-48 mt-0">
          <h1 className="text-[15rem] absolute -top-[80%] left-1/2 -translate-x-1/2 z-0 md:block hidden bg-clip-text text-transparent font-bold heading bg-gradient-to-b from-white/40 to-white/10">
            Furde
          </h1>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className=" bg-white rounded-4xl w-full z-10 relative"
          >
            <div className=" grid md:grid-cols-3 grid-cols-1 gap-4 md:p-5 px-2 py-4">
              <div className=" md:border-r md:border-b-0 border-b md:pb-0 pb-4">
                {" "}
                <Image
                  src={"/logo.png"}
                  alt="Furde Constructions"
                  className=" md:w-44 w-32"
                  width={1000}
                  height={1000}
                />
                <p className="secondary-text mt-3 pl-5">
                  We are creators of transformative spaces that inspire,
                  innovate, and endure.
                </p>
              </div>

              <div className=" md:border-r md:border-b-0 border-b grid md:grid-cols-1 grid-cols-2  md:pb-0 pb-4">
                {navItems.map((item, index) => (
                  <div key={index} className="py-2 px-5 ">
                    <Link
                      className=" font-semibold heading md:text-2xl text-lg text-neutral-700 hover:text-black"
                      href={item.link}
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="py-2 px-5 grid grid-cols-1 font-semibold heading md:space-y-0 space-y-4">
                <Link
                  href={"tel:+919850326555"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex  gap-2 md:text-xl text-neutral-700 hover:text-black"
                >
                  <Phone className=" mt-1.5" /> +91-9850326555
                </Link>
                <Link
                  href={"mailto:furdeconstructions@gmail.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex  gap-2 md:text-xl text-neutral-700 hover:text-black"
                >
                  <Mail className=" mt-1" /> furdeconstructions@gmail.com
                </Link>
                <Link
                  href={"https://maps.app.goo.gl/sy1Q4Wi4ozJ1vLaD7"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 md:text-xl  text-neutral-700 hover:text-black"
                >
                  <MapPin size={35} />
                  Furde complex, Damaninagar , Solapur-413001, Maharashtra,
                  India
                </Link>
              </div>
            </div>
            <div className=" w-full border-t px-10 py-4 md:flex-row flex-col flex justify-center md:items-center  gap-2">
              <p className="  text-neutral-700">
                <span className=" secondary-text">&copy; {year}</span>{" "}
                <span className=" text-black heading font-semibold">
                  Furde Constructions
                </span>{" "}
                All Rights Reserved.
              </p>
              {/* <p className=" text-neutral-700">
                Designed by{" "}
                <span className=" text-black heading font-semibold">
                  Yash Thakur
                </span>
              </p> */}
            </div>
          </motion.div>
        </div>
      </div>

      <Image src="/fullfront.png" alt="Footer Image" fill priority />
    </div>
  );
}

export default Footer;
