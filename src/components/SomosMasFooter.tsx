import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const palabras = ["BRAVA", "STREAMING", "MÚSICA", "RADIO", "CONCIERTOS"];

export default function SomosMasFooter() {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(
      () => setIndex((i) => (i + 1) % palabras.length),
      10000
    );

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[35vw] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={palabras[index]}
          className="absolute inset-0 flex items-center justify-center text-[30vw] uppercase overflow-x-hidden font-tusker text-rojo tracking-wide leading-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {palabras[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
