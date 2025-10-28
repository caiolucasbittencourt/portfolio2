"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { isBlack } = useCursor();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="hidden md:block w-6 h-6 rounded-full fixed top-0 left-0 pointer-events-none z-50"
      initial={{ x: -12, y: -12 }}
      animate={{ 
        x: position.x - 12, 
        y: position.y - 12,
        backgroundColor: isBlack ? "#000000" : "#f97316"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 30 
      }}
    />
  );
}