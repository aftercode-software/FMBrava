"use client";

import { useState } from "react";
import type { Programa } from "@/utils/fetchProgramas";
import { getStartEndDay, getStartEndHours } from "@/utils/utils";
import ProgramacionCarousel from "../home/Programacion";

type Props = {
  programas: Programa[];
};

export default function ProgramasHero({ programas }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = programas[selectedIndex];

  return (
    <div className="flex flex-col w-full  ">
      <section className="relative w-full h-[75vh] md:h-[85vh] text-white overflow-hidden ">
        {selected?.imagen?.url && (
          <img
            src={selected.imagen.url}
            alt={selected.imagen.alt}
            className="absolute right-0 top-0 w-[70%] h-full object-cover object-top z-0"
          />
        )}

        <div className="absolute inset-0  z-10"
        style={{background:
      "linear-gradient(90deg, rgba(0, 0, 0, 1) 36%, rgba(255, 255, 255, 0) 100%)",}} />

        <div className="relative z-20 flex flex-col  h-full p-26  max-w-[900px]">
          <h1 className="text-6xl lg:text-8xl 3xl:text-9xl font-bold font-tusker tracking-wide mt-4">
            {selected?.nombre}
          </h1>

          <div className="gap-6 flex flex-wrap items-center text-lg md:text-xl font-semibold text-white/90 mb-2">
                <span className="text-green-400 font-medium">100% Para Vos</span>
            <p>
              {(() => {
                const result = getStartEndDay(selected.diasSemana);
                if (typeof result === "string") return result;
                const { start, end } = result;
                return `${start} a ${end}`;
              })()}
            </p>
            <p>
              {(() => {
                const { start, end } = getStartEndHours(
                  selected.horarioInicio,
                  selected.horarioFin
                );
                return `${start}hs a ${end}hs`;
              })()}
            </p>
          </div>

          <p className="text-xl text-[#F6F6F6]/68 lg:text-2xl tracking-tight font-ibm mt-4">
            {selected?.descripcion}
          </p>
          <div>
            {selected.participantes?.map((participante) => (
              <p className="gap-6 flex flex-wrap items-center text-lg md:text-xl font-semibold text-[#F6F6F6]/68 mb-2" key={participante.id}>Elenco:{participante.nombre}</p>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-[-4rem] z-30 relative px-4">
        <ProgramacionCarousel
          programas={programas}
          onSelect={(index) => setSelectedIndex(index)}
        />
      </div>
    </div>
  );
}
