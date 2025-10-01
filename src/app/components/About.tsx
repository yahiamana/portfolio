"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaJs, FaReact, FaWordpress, FaPhp } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiNextdotjs, SiMysql } from "react-icons/si";

const skills = [
  { id: 1, icon: <FaJs size={60} className="text-yellow-400" />, label: "JavaScript" },
  { id: 2, icon: <SiTypescript size={60} className="text-blue-500" />, label: "TypeScript" },
  { id: 3, icon: <SiTailwindcss size={60} className="text-cyan-400" />, label: "Tailwind CSS" },
  { id: 4, icon: <FaReact size={60} className="text-cyan-300" />, label: "React" },
  { id: 5, icon: <SiNextdotjs size={60} className="text-white" />, label: "Next.js" },
  { id: 6, icon: <FaWordpress size={60} className="text-blue-400" />, label: "WordPress" },
  { id: 7, icon: <FaPhp size={60} className="text-indigo-400" />, label: "PHP" },
  { id: 8, icon: <SiMysql size={60} className="text-orange-400" />, label: "MySQL" },
];

const About = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".scroll-item", {
        xPercent: -100 * skills.length,
        repeat: -1,
        ease: "linear",
        duration: 25,
      });
    }, scrollRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-20 bg-slate-950  text-white overflow-hidden">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-5xl font-bold mb-4">About Me</h2>
        <p className="text-lg text-gray-300 mb-3">
          Passionate developer with expertise in modern web technologies. I build fast,
          responsive, and scalable applications.
        </p>
      </div>

      {/* Infinite Scroll */}
      <div ref={scrollRef} className="relative w-full mt-3 overflow-hidden">
        <div className="flex w-max mb-3 gap-16">
          {Array(2)
            .fill(skills)
            .flat()
            .map((skill, idx) => (
              <div
                key={idx}
                className="scroll-item flex flex-col items-center justify-center min-w-[180px]"
              >
                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md shadow-lg hover:scale-102 transition-transform">
                  {skill.icon}
                </div>
                <p className="mt-4 text-lg font-medium">{skill.label}</p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default About;
