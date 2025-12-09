"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const motivations = [
  "You are stronger than you think — keep moving forward.",
  "Every small step today builds your future tomorrow.",
  "Believe in yourself; you are capable of great things.",
  "If you never try, you'll never know what you can achieve.",
  "Your potential is limitless—don't stop now.",
  "Success begins with the courage to start.",
  "Be patient. Great things take time.",
  "Your dream is worth the effort—keep going.",
  "Progress is still progress, no matter how small.",
  "You are becoming the best version of yourself.",
  "Don't quit. The beginning is always the hardest.",
  "You are closer than you were yesterday.",
  "Consistency beats perfection—show up every day.",
  "Failures are lessons, not endings.",
  "Everything you want is on the other side of effort."
];

export default function MotivationText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % motivations.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center mt-12 px-4">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.55 }}
            className="
              p-6 rounded-xl shadow-lg bg-white dark:bg-neutral-900 
              border -mainColor/60
              shadow-mainColor/30
              hover:shadow-mainColor/50 transition-shadow duration-500
            "
          >
            <p className="text-center text-lg md:text-xl font-medium text-gray-700 dark:text-gray-200 leading-relaxed">
              “{motivations[index]}”
            </p>

            {/* small underline accent */}
            <div className="mt-4 flex justify-center">
              <div className="h-[3px] w-16 rounded-full bg-mainColor"></div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}