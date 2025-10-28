"use client";
import { motion } from "framer-motion";

interface CornerButtonProps {
  onClick: () => void;
  label: string;
  position: string;
}

export default function CornerButton({ onClick, label, position }: CornerButtonProps) {
  return (
    <motion.div
      onClick={onClick}
      className={`fixed ${position} w-[120px] h-[120px] bg-orange-500 rounded-full flex justify-center items-center text-lg font-bold z-50`}
      whileHover={{ scale: 1.05 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
    >
      {label}
    </motion.div>
  );
}