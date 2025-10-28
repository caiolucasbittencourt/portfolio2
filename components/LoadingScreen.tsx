"use client";

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const circleVariants: Variants = {
  initial: {
    scale: 0,
    opacity: 1,
  },
  animate: {
    scale: 1,
    opacity: 0,
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1,
    },
  },
};

export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <motion.div
        className="relative w-48 h-48"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {[...Array(3)].map((_, index) => (
          <motion.span
            key={index}
            className="block absolute top-0 left-0 w-full h-full border-2 border-gray-500 rounded-full"
            variants={circleVariants}
          />
        ))}
      </motion.div>
    </div>
  );
}