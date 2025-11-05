"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import ProcessCircle from "@/components/ProcessCircle";
import LoadingScreen from "@/components/LoadingScreen";
import ContactOverlay from "@/components/ContactOverlay";
import ContactButton from "@/components/ContactButton";
import { useCursor } from "@/context/CursorContext";

const aboutSectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { setIsBlack } = useCursor();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsBlack(isContactOpen);
  }, [isContactOpen, setIsBlack]);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  const generateRandomStars = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100 + "%",
      y: Math.random() * 100 + "%",
      size: Math.random() * 3 + 1,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 2,
    }));
  };

  const [stars, setStars] = useState<ReturnType<typeof generateRandomStars>>(
    []
  );

  useEffect(() => {
    setStars(generateRandomStars(50));
  }, []);

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen />}</AnimatePresence>

      {!loading && (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <main className="relative flex justify-center items-center h-screen w-full">
            <motion.div
              className="hidden md:flex absolute inset-0 justify-center items-center z-0 
                         [mask-image:radial-gradient(ellipse_at_center,white_50%,transparent_80%)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-gray-500/20"
                  style={{ width: 900 + i * 400, height: 900 + i * 400 }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    transition: {
                      duration: 1.5,
                      ease: [0.86, 0, 0.07, 1] as const,
                      delay: 0.5 + i * 0.2,
                    },
                  }}
                />
              ))}
            </motion.div>

            <motion.div
              className="flex md:hidden absolute inset-0 z-0 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
            >
              {stars.map((star) => (
                <motion.span
                  key={star.id}
                  className="absolute bg-white rounded-full"
                  style={{
                    left: star.x,
                    top: star.y,
                    width: star.size,
                    height: star.size,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                    x: [0, Math.random() * 20 - 10, 0],
                    y: [0, Math.random() * 20 - 10, 0],
                  }}
                  transition={{
                    duration: star.duration,
                    delay: star.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    repeatDelay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>

            <div className="relative z-10">
              <ProcessCircle />
            </div>

            <motion.div
              className="hidden md:block absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1.5 } }}
            >
              <motion.div
                className="flex flex-col items-center space-y-2"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{
                  duration: 2.0,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <span className="text-xs uppercase tracking-widest text-white">
                  Scroll
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5V19M12 19L19 12M12 19L5 12"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </main>

          <motion.section
            id="sobre-mim"
            className="relative z-10 w-full min-h-screen bg-black flex justify-center items-center 
                       px-8 pt-16 pb-32 md:p-16"
            variants={aboutSectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="max-w-4xl text-left">
              <motion.h2
                className="text-4xl md:text-6xl font-semibold mb-12"
                variants={textItemVariants}
              >
                Who could I be?
              </motion.h2>

              <div className="space-y-8 text-lg md:text-2xl text-white/80 font-light leading-relaxed">
                <motion.p variants={textItemVariants}>
                  Minha carreira atual é, na verdade, um retorno à minha
                  primeira paixão. Desde os 9 anos, quando comecei a fuçar no
                  meu primeiro computador, eu soube que minha vocação era
                  entender como as coisas funcionavam e criar soluções digitais.
                </motion.p>
                <motion.p variants={textItemVariants}>
                  Tentei outros rumos, inclusive abrindo minha própria empresa.
                  O sucesso nesse desvio me ensinou muito, mas também confirmou
                  onde meu coração estava. Eu vendi tudo para me dedicar 100% ao
                  que sempre amei.
                </motion.p>
                <motion.p variants={textItemVariants}>
                  Hoje, como{" "}
                  <strong className="font-medium text-white/90">
                    Desenvolvedor Front-end
                  </strong>{" "}
                  e cursando{" "}
                  <strong className="font-medium text-white/90">
                    Análise e Desenvolvimento de Sistemas
                  </strong>
                  , eu vivo essa paixão. Meu foco é o desenvolvimento de alta
                  performance, usando{" "}
                  <strong className="font-medium text-white/90">React</strong> e{" "}
                  <strong className="font-medium text-white/90">Next.js</strong>{" "}
                  para interfaces dinâmicas,{" "}
                  <strong className="font-medium text-white/90">
                    TypeScript
                  </strong>{" "}
                  para código confiável,{" "}
                  <strong className="font-medium text-white/90">
                    Tailwind CSS
                  </strong>{" "}
                  para design rápido e{" "}
                  <strong className="font-medium text-white/90">Node.js</strong>{" "}
                  para integração de serviços.
                </motion.p>

                <motion.p
                  variants={textItemVariants}
                  className="text-lg md:text-2xl text-white/80 font-light leading-relaxed !mt-12"
                >
                  <a
                    href="/cv-caio-bittencourt.pdf"
                    download="CV-Caio-Bittencourt.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-white/90 underline hover:text-white transition-colors !cursor-none"
                  >
                    Click here to download my CV
                  </a>
                </motion.p>
              </div>
            </div>
          </motion.section>

          <AnimatePresence>
            {!isContactOpen && (
              <ContactButton key="contact-btn" onClick={openContact} />
            )}
            {isContactOpen && (
              <ContactOverlay key="contact-overlay" onClose={closeContact} />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
