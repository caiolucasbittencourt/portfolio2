"use client";

import { motion, Variants } from "framer-motion";

const overlayVariants: Variants = {
  hidden: {
    clipPath: "circle(40px at calc(100% - 60px) calc(100% - 60px))",
    transition: { type: "spring", stiffness: 400, damping: 40 },
  },
  visible: {
    clipPath: "circle(150vmax at calc(100% - 60px) calc(100% - 60px))",
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.86, 0, 0.07, 1] as const },
  },
};

export default function ContactOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      onClick={onClose}
      className="fixed inset-0 bg-orange-500 z-40 flex justify-center items-center flex-col p-8 overflow-y-auto cursor-pointer"
      variants={overlayVariants} // Agora está corretamente tipado
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="text-center text-white max-w-4xl cursor-default"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-4">
          Vamos Conversar.
        </motion.h1>
        <motion.p variants={itemVariants} className="text-lg md:text-2xl mb-4 font-light">
          Estou sempre aberto a novos desafios e colaborações. Se você tem um projeto em mente, uma ideia para discutir ou apenas quer dizer olá, sinta-se à vontade para me contatar.
        </motion.p>
        <motion.p variants={itemVariants} className="text-lg md:text-2xl mb-8 font-light">
          Acredito que uma boa comunicação é a chave para o sucesso. Vamos criar algo incrível juntos.
        </motion.p>
        <motion.div variants={itemVariants} className="text-xl md:text-3xl font-semibold">
          <a href="mailto:caio.bittencourt.dev@gmail.com" className="hover:underline">
            caio.bittencourt.dev@gmail.com
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}