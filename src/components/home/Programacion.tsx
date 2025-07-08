import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Container from "../containers/Container";
import { type Programa } from "@/utils/fetchProgramas";
import { getStartEndDay, getStartEndHours } from "@/utils/utils";
import { motion } from "framer-motion";

type Props = { programas: Programa[] };

export default function ProgramacionCarousel({ programas }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true },
    [Autoplay({ delay: 3000 })]
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    emblaApi.on("init", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("init", onSelect);
    };
  }, [emblaApi]);

  return (
    <Container>
      <section className="relative h-[25rem] overflow-hidden">
        {programas[selected] && programas[selected].imagen?.url && (
          <div className="absolute border-white rounded-lg border-[2px] top-0 left-0 md:w-[35%] w-[45%] h-full z-20">
            <motion.img
              key={programas[selected].id}
              src={programas[selected].imagen.url}
              alt={programas[selected].imagen.alt || "Imagen del programa"}
              className="w-full h-full object-cover rounded-lg "
              style={{ display: "block" }}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            />
            <div
              className="absolute inset-0 flex flex-col justify-end p-4 rounded-lg"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.5) 20%, rgba(0,0,0,0.0) 100%)",
              }}
            ></div>
          </div>
        )}

        <div
          ref={emblaRef}
          className="overflow-hidden h-full ml-[calc(35%+1rem)] rounded-xl"
        >
          <div className="flex items-center h-full gap-4">
            {programas.map((p, i) => (
              <div
                key={p.id}
                className="flex-shrink-0 w-[100%] sm:w-[25%] h-full relative"
              >
                <img
                  src={p.imagen.url}
                  alt={p.imagen.alt}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-[102%] "
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {programas[selected] && (
        <div className="mt-3 md:max-w-[35%] rounded-lg text-white">
          <section className="flex items-center gap-2">
            <p className="font-ibm font-bold md:text-lg">
              {(() => {
                const result = getStartEndDay(programas[selected].diasSemana);
                const dias = programas[selected].diasSemana;
                if (typeof result === "string") {
                  return result;
                }
                const { start, end } = result;
                if (dias.length === 1) {
                  return `Día: ${dias[0]} ${start}`;
                }
                return `${start?.charAt(0).toUpperCase()}${start?.slice(
                  1
                )} a ${end?.charAt(0).toUpperCase()}${end?.slice(1)}`;
              })()}
            </p>
            <p className="font-ibm font-bold md:text-lg ">
              {(() => {
                const { start, end } = getStartEndHours(
                  programas[selected].horarioInicio,
                  programas[selected].horarioFin
                );
                return `${start} a ${end}`;
              })()}
            </p>
          </section>
          <p className="md:text-lg font-ibm text-gray-300">
            {programas[selected].descripcion}
          </p>
        </div>
      )}
    </Container>
  );
}
