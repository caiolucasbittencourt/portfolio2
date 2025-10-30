"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const CENTER = 300;
const RADIUS = 260;

const techStackData = [
  {
    angle: -90,
    title: "React",
    description:
      "I use React to build dynamic and component-based user interfaces, creating interactive and seamless web experiences.",
    logo: "./react.svg",
    logoAlt: "React Logo",
  },
  {
    angle: -18,
    title: "Next.js",
    description:
      "I leverage Next.js on top of React to develop fast, SEO-friendly applications with server-side rendering and static site generation.",
    logo: "./nextjs.svg",
    logoAlt: "Next.js Logo",
  },
  {
    angle: 54,
    title: "TypeScript",
    description:
      "I use TypeScript to add static typing to my projects, ensuring more robust, maintainable, and error-free code.",
    logo: "./typescript.svg",
    logoAlt: "TypeScript Logo",
  },
  {
    angle: 126,
    title: "Node.js",
    description:
      "On the server-side, I utilize Node.js to build fast and scalable APIs, connecting the frontend to data and services.",
    logo: "./nodejs.svg",
    logoAlt: "Node.js Logo",
  },
  {
    angle: 198,
    title: "Tailwind CSS",
    description:
      "For styling, I use Tailwind CSS, a utility-first framework that allows me to rapidly build modern and responsive designs directly in my markup.",
    logo: "./tailwindcss.svg",
    logoAlt: "Tailwind CSS Logo",
  },
];

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  if (endAngle < startAngle) {
    endAngle += 360;
  }
  const start = polarToCartesian(x, y, radius, startAngle);
  const end = polarToCartesian(x, y, radius, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

export default function ProcessCircle() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= techStackData.length - 1) {
          setIsResetting(true);
          return 0;
        } else {
          setIsResetting(false);
          return prev + 1;
        }
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const step = techStackData[currentStepIndex];
  const elegantEase = [0.86, 0, 0.07, 1] as const;
  const smoothTransition = { duration: 1.2, ease: elegantEase };

  return (
    <div className="relative w-[90vw] h-[90vw] md:w-[600px] md:h-[600px] flex justify-center items-center overflow-hidden">
      <svg
        className="absolute"
        width="100%"
        height="100%"
        viewBox="0 0 600 600"
        style={{ overflow: "visible" }}
      >
        <circle
          strokeWidth="1"
          stroke="rgba(255,255,255,0.15)"
          strokeDasharray="5 5"
          fill="transparent"
          r={RADIUS}
          cx={CENTER}
          cy={CENTER}
        />
        {techStackData.map((_, index) => {
          const startAngle = techStackData[index].angle;
          const endAngle = techStackData[index + 1]
            ? techStackData[index + 1].angle
            : techStackData[0].angle;
          return (
            <motion.path
              key={index}
              d={describeArc(CENTER, CENTER, RADIUS, startAngle, endAngle)}
              fill="none"
              stroke="#f97316"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: index < currentStepIndex ? 1 : 0 }}
              transition={
                isResetting
                  ? { duration: 0.4, ease: "easeOut" }
                  : smoothTransition
              }
            />
          );
        })}
      </svg>
      <div className="absolute w-full h-full">
        {techStackData.map((s, index) => {
          const { x, y } = polarToCartesian(CENTER, CENTER, RADIUS, s.angle);
          return (
            <motion.div
              key={index}
              className="absolute w-[20px] h-[20px] rounded-full"
              style={{
                left: `${(x / 600) * 100}%`,
                top: `${(y / 600) * 100}%`,
                x: "-50%",
                y: "-50%",
              }}
              animate={{
                backgroundColor:
                  index <= currentStepIndex
                    ? "#f97316"
                    : "rgba(255, 255, 255, 0.2)",
                boxShadow:
                  index <= currentStepIndex
                    ? "0 0 16px rgba(249,115,22,0.8)"
                    : "none",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          );
        })}
      </div>

      <div className="text-center max-w-[80%] md:max-w-[450px] flex flex-col justify-center min-h-[150px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, ease: elegantEase }}
          >
            <p className="text-xs md:text-sm text-white/60 mb-1 md:mb-2 tracking-wide font-light flex items-center justify-center gap-2">
              MY TECH STACK
              {step.logo && (
                <Image
                  src={step.logo}
                  alt={step.logoAlt}
                  width={20}
                  height={20}
                  className="inline-block"
                />
              )}
            </p>
            <h1 className="text-4xl md:text-[60px] font-semibold leading-tight mb-2 md:mb-4">
              {step.title}
            </h1>
            <p className="text-sm md:text-[17px] leading-relaxed text-white/80 font-light">
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}