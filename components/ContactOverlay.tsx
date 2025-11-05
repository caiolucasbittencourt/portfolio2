"use client";

import { motion, Variants } from "framer-motion";
import { useState, useEffect } from "react";

const getOverlayVariants = (isMobile: boolean): Variants => {
  const position = isMobile
    ? "50% calc(100% - 65px)"
    : "calc(100% - 110px) calc(100% - 110px)";

  const initialRadius = isMobile ? "45px" : "60px";

  return {
    hidden: {
      clipPath: `circle(${initialRadius} at ${position})`,
      transition: { type: "spring", stiffness: 400, damping: 40 },
    },
    visible: {
      clipPath: `circle(150vmax at ${position})`,
      transition: { type: "spring", stiffness: 80, damping: 20 },
    },
  };
};

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 1.2,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function ContactOverlay({ onClose }: { onClose: () => void }) {
  const originalTitle = "How about a chat? ";

  const [typedTitle, setTypedTitle] = useState("");
  const [blinkingEmoticon, setBlinkingEmoticon] = useState(";) ");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setTypedTitle("");
    setIsTypingComplete(false);
  }, []);

  useEffect(() => {
    if (typedTitle.length < originalTitle.length) {
      const timeout = setTimeout(() => {
        setTypedTitle(originalTitle.slice(0, typedTitle.length + 1));
      }, 120);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [typedTitle, originalTitle]);

  useEffect(() => {
    if (isTypingComplete) {
      const interval = setInterval(() => {
        setBlinkingEmoticon((prev) => (prev === ";) " ? ":) " : ";) "));
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isTypingComplete]);

  const linkStyles =
    "text-base md:text-4xl font-light text-black/70 hover:text-black transition-colors duration-300 " +
    "relative inline-block " +
    "after:content-[''] after:absolute after:bottom-[-4px] md:after:bottom-[-8px] after:left-0 after:h-[1px] after:w-full " +
    "after:bg-black after:origin-left after:scale-x-0 hover:after:scale-x-100 " +
    "after:transition-transform after:duration-700 after:ease-out " +
    "!cursor-none";

  return (
    <motion.div
      onClick={onClose}
      className="fixed inset-0 bg-white z-40 flex justify-center items-center flex-col p-6 md:p-8 overflow-y-auto"
      variants={getOverlayVariants(isMobile)}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="text-left text-black max-w-4xl w-full cursor-none"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <h1 className="text-2xl md:text-7xl font-bold mb-4">
          <span>{typedTitle}</span>
          {!isTypingComplete && <span className="animate-ping">|</span>}
          {isTypingComplete && <span> {blinkingEmoticon}</span>}
        </h1>

        <motion.div
          className="mt-12 flex flex-col space-y-6 md:space-y-8"
          variants={contentVariants}
          initial="hidden"
          animate={isTypingComplete ? "visible" : "hidden"}
        >
          <motion.a
            href="https://wa.me/5599996513294"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyles}
            variants={itemVariants}
          >
            +55 (99) 99651-3294
          </motion.a>

          <motion.a
            href="mailto:caiolucasbittencourt@hotmail.com"
            className={linkStyles}
            variants={itemVariants}
          >
            caiolucasbittencourt@hotmail.com
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/caiolucasbittencourt/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyles}
            variants={itemVariants}
          >
            LinkedIn
          </motion.a>

          <motion.a
            href="https://github.com/caiolucasbittencourt"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyles}
            variants={itemVariants}
          >
            GitHub
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}