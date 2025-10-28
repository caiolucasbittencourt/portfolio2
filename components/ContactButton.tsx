"use client";
import { motion } from "framer-motion";

export default function ContactButton({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      className="fixed bottom-[20px] right-[20px] w-[80px] h-[80px] text-base 
                 md:bottom-[50px] md:right-[50px] md:w-[120px] md:h-[120px] md:text-lg
                 bg-orange-500 rounded-full flex justify-center items-center font-bold z-50"
      whileHover={{ scale: 1.05 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
    >
      Contact
    </motion.div>
  );
}