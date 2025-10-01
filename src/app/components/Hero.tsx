"use client";

import React, { useRef, useEffect } from "react";
import Typed from "typed.js";
import Image from "next/image";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

const Hero = () => {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (el.current) {
      const typed = new Typed(el.current, {
        strings: ["Back-end Developer", "WEP*** Developer"],
        typeSpeed: 120,
        backSpeed: 80,
        loop: true,
      });

      return () => typed.destroy();
    }
  }, []);

  return (
    <section className="relative pt-24 pb-16 px-6 lg:px-20 bg-slate-950 ">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12">
        {/* Text Section */}
        <div className="text-center lg:text-left max-w-3xl">
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            I am{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Younes
            </span>
          </h1>
          <h2 className="text-3xl lg:text-6xl font-bold max-w-3xl text-gray-300 mt-4">
            I am <span ref={el} className="text-cyan-400 font-bold"></span>
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-md">
            Passionate <span className="text-cyan-400">developer</span> crafting
            modern web experiences and scalable backend solutions.
          </p>

          <div className="mt-8 flex justify-center lg:justify-start gap-4">
            <a
              href="#projects"
              className="px-6 py-3 bg-cyan-500 hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] hover:bg-cyan-600 text-white font-medium rounded-xl shadow-lg transition"
            >
              View Projects
            </a>
            <a
              href="/resume.pdf"
              className="px-6 py-3 hover:shadow-[0_0_35px_rgba(34,211,238,0.5)] border border-cyan-500 text-cyan-400 font-medium rounded-xl hover:bg-cyan-500 hover:text-white transition"
            >
              Download CV
            </a>
          </div>

          {/* Socials */}
          <div className="mt-10 flex justify-center lg:justify-start gap-6">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin
                size={32}
                className="text-cyan-400  hover:text-cyan-300 transition-colors duration-300 cursor-pointer"
              />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook
                size={32}
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 cursor-pointer"
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram
                size={32}
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 cursor-pointer"
              />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github
                size={32}
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 cursor-pointer"
              />
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center">
          <Image
            src="/2.png"
            alt="Profile picture of Younes"
            width={380}
            height={380}
            className="rounded-full shadow-[0_0_35px_rgba(34,211,238,0.5)] border-4 border-cyan-400 hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
