"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProcessCircle from "@/components/ProcessCircle";
import LoadingScreen from "@/components/LoadingScreen";
import ContactOverlay from "@/components/ContactOverlay";
import ContactButton from "@/components/ContactButton";
import { useCursor } from "@/context/CursorContext";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const { setIsBlack } = useCursor();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsBlack(isContactOpen);
  }, [isContactOpen, setIsBlack]);
  
  // Efeito para detectar se a tela é mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen />}
      </AnimatePresence>

      {!loading && (
        <motion.div key="main-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <main className="relative flex justify-center items-center h-screen w-screen">
            {/* Os círculos de fundo só são renderizados se NÃO for mobile */}
            {!isMobile && (
              <motion.div
                className="absolute inset-0 flex justify-center items-center z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.5 } }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full border border-gray-500/20"
                    style={{ width: 900 + i * 400, height: 900 + i * 400 }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, transition: { duration: 1.5, ease: [0.86, 0, 0.07, 1] as const, delay: 0.5 + i * 0.2 } }}
                  />
                ))}
              </motion.div>
            )}

            <div className="relative z-10">
              <ProcessCircle />
            </div>
          </main>

          <AnimatePresence>
            {!isContactOpen && <ContactButton key="contact-btn" onClick={openContact} />}
            {isContactOpen && <ContactOverlay key="contact-overlay" onClose={closeContact} />}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}