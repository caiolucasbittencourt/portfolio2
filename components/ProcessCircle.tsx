"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef<(() => void) | undefined>(undefined);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const CENTER = 300;
const RADIUS = 260;
const ANIMATION_DURATION = 5500;
const RESET_ANIMATION_DURATION = 800;

const processSteps = [
  {
    angle: -90,
    title: "UX/UI",
    description:
      "Começo pelo porquê. Entendo o problema, crio wireframes e protótipos, e defino o fluxo do usuário para garantir uma base sólida.",
  },
  {
    angle: -18,
    title: "Code",
    description:
      "Traduzo o design em código. Construo componentes reutilizáveis e uma arquitetura limpa, focando na semântica e acessibilidade.",
  },
  {
    angle: 54,
    title: "RWD",
    description:
      "Garanto que a experiência seja perfeita em qualquer tela. Adiciono micro-interações e animações que dão vida à interface.",
  },
  {
    angle: 126,
    title: "Integration",
    description:
      "Conecto a aplicação a dados. Seja um banco de dados ou uma API, eu torno a interface dinâmica e funcional.",
  },
  {
    angle: 198,
    title: "Deploy",
    description:
      "Otimizo a performance, realizo testes finais de usabilidade e publico a aplicação, garantindo uma entrega rápida e estável.",
  },
];

function polarToCartesian(
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) {
  if (endAngle < startAngle) {
    endAngle += 360;
  }
  const start = polarToCartesian(x, y, radius, startAngle);
  const end = polarToCartesian(x, y, radius, endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

export default function ProcessCircle() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [loopCount, setLoopCount] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  useInterval(
    () => {
      const isLastStep = currentStepIndex === processSteps.length - 1;

      if (isLastStep) {
        setIsRunning(false);
        setIsResetting(true);

        setTimeout(() => {
          setLoopCount((count) => count + 1);
          setCurrentStepIndex(0);
          setIsResetting(false);
          setIsRunning(true);
        }, RESET_ANIMATION_DURATION);
      } else {
        setCurrentStepIndex((prev) => prev + 1);
      }
    },
    isRunning ? ANIMATION_DURATION : null
  );

  const step = processSteps[currentStepIndex];
  const elegantEase = [0.86, 0, 0.07, 1] as const;

  return (
    <div className="relative w-[90vw] h-[90vw] md:w-[600px] md:h-[600px] flex justify-center items-center overflow-hidden">
      <svg
        className="absolute"
        width="100%"
        height="100%"
        viewBox="0 0 600 600"
        style={{ overflow: "visible" }}
      >
        <circle
          strokeWidth="1"
          stroke="rgba(255,255,255,0.15)"
          strokeDasharray="5 5"
          fill="transparent"
          r={RADIUS}
          cx={CENTER}
          cy={CENTER}
        />
        {processSteps.map((_, index) => {
          const startAngle = processSteps[index].angle;
          const endAngle = processSteps[index + 1]
            ? processSteps[index + 1].angle
            : processSteps[0].angle;
          return (
            <motion.path
              key={`${loopCount}-${index}`}
              d={describeArc(CENTER, CENTER, RADIUS, startAngle, endAngle)}
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: isResetting ? 0 : index <= currentStepIndex ? 1 : 0,
              }}
              transition={
                isResetting
                  ? { duration: RESET_ANIMATION_DURATION / 1000, ease: "easeOut" }
                  : index === currentStepIndex
                  ? { duration: ANIMATION_DURATION / 1000, ease: "linear" }
                  : { duration: 0.5, ease: "easeOut" }
              }
            />
          );
        })}
      </svg>
      <div className="absolute w-full h-full">
        {processSteps.map((s, index) => {
          const { x, y } = polarToCartesian(CENTER, CENTER, RADIUS, s.angle);
          return (
            <motion.div
              key={`${loopCount}-${index}-dot`}
              className="absolute w-[20px] h-[20px] rounded-full"
              style={{
                left: `${(x / 600) * 100}%`,
                top: `${(y / 600) * 100}%`,
                x: "-50%",
                y: "-50%",
              }}
              initial={{
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                boxShadow: "none",
              }}
              animate={{
                backgroundColor:
                  isResetting || index > currentStepIndex
                    ? "rgba(255, 255, 255, 0.2)"
                    : "#ffffff",
                boxShadow:
                  isResetting || index > currentStepIndex
                    ? "none"
                    : "0 0 16px rgba(255, 255, 255, 0.8)",
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          );
        })}
      </div>

      <div className="text-center max-w-[70%] md:max-w-[450px] flex flex-col justify-center min-h-[150px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStepIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8, ease: elegantEase }}
          >
            <p className="text-xs md:text-sm text-white/60 mb-1 md:mb-2 tracking-wide font-light flex items-center justify-center gap-2 uppercase">
              MY PROCESS - STEP {currentStepIndex + 1}/5
            </p>
            
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-2 md:mb-4 text-balance">
              {step.title}
            </h1>
            
            <p className="text-sm md:text-base leading-relaxed text-white/80 font-light text-balance">
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}