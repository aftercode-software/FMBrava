import { motion } from "motion/react";
import { useState } from "react";

export default function React() {
  const [state, setState] = useState(0);

  return (
    <>
      <div
        onClick={() => setState(state + 1)}
        className="text-5xl font-inter font-bold"
      >
        React {state}
      </div>
      <motion.div
        animate={{ rotate: 360, scale: 2 }}
        whileHover={{ scale: 1 }}
        className="box w-10 h-10 bg-red-500"
      ></motion.div>
    </>
  );
}
