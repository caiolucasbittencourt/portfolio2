"use client";
import { motion } from "framer-motion";

export default function ContactButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[80px] h-[80px] text-base 
                 md:bottom-[50px] md:right-[50px] md:left-auto md:translate-x-0 md:w-[120px] md:h-[120px] md:text-lg
                 bg-orange-500 rounded-full flex justify-center items-center font-bold z-50"
      whileHover={{ scale: 1.05 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
    >
      CLICK ME!
    </motion.div>
  );
}