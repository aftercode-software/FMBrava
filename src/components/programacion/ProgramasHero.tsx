import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Programa } from "@/utils/fetchProgramas";
import { getStartEndDay, getStartEndHours } from "@/utils/utils";
import { useState } from "react";
import Container from "../containers/Container";
import ProgramacionCarousel from "./ProgramacionCarousel";

type Props = {
  programas: Programa[];
};

export default function ProgramasHero({ programas }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = programas[selectedIndex];
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      {selected?.imagen?.url && (
        <img
          src={selected.imagen.url}
          alt={selected.imagen.alt}
          className="absolute right-0 top-0 h-[100%] md:h-full w-full md:w-[60%] object-cover object-top z-0"
        />
      )}
      {!isMobile ? (
        <div
          className="absolute right-0 top-0 h-full md:w-[60%]"
          style={{
            background:
              "linear-gradient(90deg, rgba(10, 10, 10, 1) 0%,  rgba(10, 10, 10, 0.6) 50%, rgba(10, 10, 10, 1) 100%)",
          }}
        />
      ) : (
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(180deg, rgba(10, 10, 10, 1) 0%, rgba(10, 10, 10, 0.8) 38%, rgba(10, 10, 10, 1) 80%, rgba(10, 10, 10, 1) 100%)",
          }}
        />
      )}
      <Container className="flex flex-col w-full">
        <section className="relative w-full flex items-center min-h-[40vh] sm:h-[60vh] text-white overflow-hidden ">
          <div className="relative z-20 flex flex-col h-full max-w-[900px] justify-start">
            <span className="font-inter font-extrabold lg:text-xl tracking-[0.25em] text-negro-400">
              BRAVA PRESENTA
            </span>
            <h1 className="text-7xl lg:text-8xl 3xl:text-9xl font-bold font-tusker tracking-wide mt-4 uppercase">
              {selected?.nombre}
            </h1>

            <div className="gap-6 flex flex-wrap items-center text-lg md:text-xl font-semibold text-white/90 mb-2">
              <div className="flex flex-wrap md:flex-row items-center gap-3 md:gap-6 font-ibm text-xl mt-2">
                <span className="text-green-400 font-medium text-lg md:text-xl">
                  100% match
                </span>
                <span className="font-bold flex gap-1 items-center text-base lg:text-xl font-ibm text-white ">
                  <p>
                    {(() => {
                      const result = getStartEndDay(selected.diasSemana);
                      if (typeof result === "string") return result;
                      const { start, end } = result;
                      const capitalize = (str?: string) =>
                        str
                          ? str.charAt(0).toUpperCase() +
                            str.slice(1).toLowerCase()
                          : "";
                      return `${capitalize(start)} a ${capitalize(end)}`;
                    })()}
                  </p>
                  <p>
                    {(() => {
                      const { start, end } = getStartEndHours(
                        selected.horarioInicio,
                        selected.horarioFin
                      );
                      return `de ${start}hs a ${end}hs`;
                    })()}
                  </p>
                </span>
              </div>
            </div>

            <p className="text-xl text-[#F6F6F6]/68 lg:text-2xl tracking-tight font-ibm mt-2">
              {selected?.descripcion}
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
        </section>

        <div className="z-30">
          <ProgramacionCarousel
            programas={programas}
            onSelect={(index) => setSelectedIndex(index)}
          />
        </div>
      </Container>
    </>
  );
}
