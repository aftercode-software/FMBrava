import { type Programa } from "@/utils/fetchProgramas";
import { getStartEndDay, getStartEndHours } from "@/utils/utils";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Container from "../containers/Container";

type Props = { programas: Programa[]; onSelect?: (index: number) => void };

const slideVariants = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
  exit: { x: -10, opacity: 0 },
};

export default function ProgramacionCarousel({ programas, onSelect }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true },
    [Autoplay({ delay: 3000 })]
  );
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelectEvent = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelected(index);
      onSelect?.(index);
    };

    emblaApi.on("select", onSelectEvent);
    emblaApi.on("init", onSelectEvent);
    onSelectEvent();

    return () => {
      emblaApi.off("select", onSelectEvent);
      emblaApi.off("init", onSelectEvent);
    };
  }, [emblaApi, onSelect]);

  return (
    <Container className="flex flex-col">
      <section className="relative h-[20rem] md:h-[32rem] overflow-hidden mt-4">
        <div className="absolute top-0 left-0 md:w-[35%] w-[45%] h-full bg-black z-10" />
        <AnimatePresence mode="wait" initial={false}>
          {programas[selected]?.imagen?.url && (
            <motion.img
              key={programas[selected].id}
              src={programas[selected].imagen.url}
              alt={programas[selected].imagen.alt || "Imagen del programa"}
              className=" absolute top-0 left-0 md:w-[35%] w-[45%] h-full object-cover [object-position:50%_0%] border-white rounded-lg border-2 z-20 "
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                x: { duration: 0.35, ease: [0.43, 0.13, 0.23, 0.96] },
                opacity: { duration: 0.2, ease: "easeInOut" },
              }}
            />
          )}
        </AnimatePresence>

        <div
          ref={emblaRef}
          className="overflow-hidden h-full lg:ml-[calc(12%+1rem)] rounded-xl"
        >
          <div className="flex items-center h-full gap-4">
            {programas.map((p, i) => (
              <div
                key={p.id}
                className={`flex-shrink-0 w-[45%] md:w-[35%] lg:w-[25%] h-full relative rounded-lg${
                  i === 0 ? " ml-[1rem]" : ""
                }`}
              >
                <img
                  src={p.imagen.url}
                  alt={p.imagen.alt}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-[102%] z-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {programas[selected] && (
        <div className="mt-3 lg:max-w-[35%] rounded-lg text-white">
          <section className="flex items-center gap-2 *:md:text-lg">
            {onSelect ? null : (
              <p className="font-ibm font-bold">
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
            )}
            {onSelect ? null : (
              <p className="font-ibm font-bold">
                {(() => {
                  const { start, end } = getStartEndHours(
                    programas[selected].horarioInicio,
                    programas[selected].horarioFin
                  );
                  return `${start}h a ${end}h`;
                })()}
              </p>
            )}
          </section>
          {onSelect ? null : (
            <p className="md:text-lg font-ibm text-gray-300">
              {programas[selected].descripcion}
            </p>
          )}
        </div>
      )}
    </Container>
  );
}
