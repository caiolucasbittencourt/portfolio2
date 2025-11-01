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
    },
  },
};

const paragraphVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 2.5, ease: "easeOut" } },
};

export default function ContactOverlay({ onClose }: { onClose: () => void }) {
  const originalTitle = "Hello, I'm Caio.";

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
    if (typedTitle.length < originalTitle.length) {
      const timeout = setTimeout(() => {
        setTypedTitle(originalTitle.slice(0, typedTitle.length + 1));
      }, 120);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [typedTitle]);

  useEffect(() => {
    if (isTypingComplete) {
      const interval = setInterval(() => {
        setBlinkingEmoticon((prev) => (prev === ";) " ? ":) " : ";) "));
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isTypingComplete]);

  const linkStyles =
    "font-semibold relative inline-block text-black transition-colors duration-900 hover:text-black " +
    "after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:w-full " +
    "after:bg-black after:origin-left after:scale-x-0 hover:after:scale-x-100 " +
    "after:transition-transform after:duration-900 after:ease-out " +
    "!cursor-none";

  return (
    <motion.div
      onClick={onClose}
      className="fixed inset-0 bg-white z-40 flex justify-center items-center flex-col p-8 overflow-y-auto"
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
        <h1 className="text-3xl md:text-7xl font-bold mb-4">
          <span>{typedTitle}</span>
          {!isTypingComplete && <span className="animate-ping">|</span>}
          {isTypingComplete && <span> {blinkingEmoticon}</span>}
        </h1>

        <motion.p
          initial="hidden"
          animate={isTypingComplete ? "visible" : "hidden"}
          variants={paragraphVariants}
          className="text-lg md:text-2xl font-light"
        >
          I'm a front-end developer specializing in building
          dynamic and beautiful web applications. My toolkit is centered around{" "}
          <strong className="font-semibold text-black/90">React</strong> and its
          powerful framework,{" "}
          <strong className="font-semibold text-black/90">Next.js</strong>. I
          write robust, scalable code with{" "}
          <strong className="font-semibold text-black/90">TypeScript</strong>{" "}
          and design pixel-perfect, responsive layouts using{" "}
          <strong className="font-semibold text-black/90">Tailwind CSS</strong>.
          While my focus is on the front-end, I'm also comfortable using{" "}
          <strong className="font-semibold text-black/90">Node.js</strong> for
          server-side logic. You can see my work on{" "}
          <a
            href="https://github.com/caiolucasbittencourt"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyles}
          >
            GitHub
          </a>
          , connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/caiolucasbittencourt/"
            target="_blank"
            rel="noopener noreferrer"
            className={linkStyles}
          >
            LinkedIn
          </a>
          , or reach out directly via{" "}
          <a
            href="mailto:caiolucasbittencourt@hotmail.com"
            className={linkStyles}
          >
            e-mail
          </a>
          .
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
