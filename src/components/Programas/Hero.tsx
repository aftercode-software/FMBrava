import { useState } from "react";
import type { Programa } from "@/utils/fetchProgramas";
import ProgramacionCarousel from "../home/Programacion";

type Props = {
  programas: Programa[];
};

export default function ProgramasHero({ programas }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = programas[selectedIndex];

  return (
    <div className="w-full ">
      <section
        className={` w-full pl-[5vw] flex items-center overflow-hidden text-white h-auto py-12 md:py-16 md:h-[70vh] `}
      >
        <div className="w-full md:w-1/2 flex flex-col justify-center mt-20">
          <span className="font-inter font-extrabold lg:text-xl tracking-[0.25em] text-negro-400">
            BRAVA PRESENTA
          </span>
          <h1 className="text-5xl lg:text-8xl 3xl:text-9xl font-bold font-tusker tracking-wide mt-4 uppercase">
            {selected?.nombre}
          </h1>
          <p className="text-lg lg:text-xl font-ibm text-white mt-2">
            {selected.descripcion}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {selected.participantes?.map((p) => (
              <span
                key={p.id}
                className="font-ibm lg:text-lg font-medium lg:font-semibold bg-white/30 px-4 py-1 rounded-full"
              >
                {p.nombre}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:flex justify-end relative hidden">
          <img
            src={selected.imagen.url}
            alt={selected.imagen.alt || ""}
            className={`
              object-cover 
              [object-position:50%_0%]
              max-h-[60vh]
              w-full
              rounded-lg
              shadow-lg
            `}
          />
          <div className=" absolute inset-y-0 left-0 w-1/2 rounded-l-lg pointer-events-none bg-gradient-to-r from-black to-transparent " />
        </div>
      </section>

      <ProgramacionCarousel
        programas={programas}
        onSelect={(idx) => setSelectedIndex(idx)}
      />
    </div>
  );
}
