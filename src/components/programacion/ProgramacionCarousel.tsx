import { type Programa } from "@/utils/fetchProgramas";
import { getStartEndDay, getStartEndHours } from "@/utils/utils";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import Container from "../containers/Container";

type Props = { programas: Programa[]; onSelect?: (index: number) => void };

const imageVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 20 : -20, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -20 : 20, opacity: 0 }),
};
export default function ProgramacionCarousel({ programas, onSelect }: Props) {
  const prevIndex = useRef(0);
  const touchStartX = useRef(0);
  const [direction, setDirection] = useState(0);
  const [selected, setSelected] = useState(0);
  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 3000,
        stopOnInteraction: true,
      }),
    []
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true },
    [autoplayPlugin]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelectEvent = () => {
      const idx = emblaApi.selectedScrollSnap();

      const dir =
        idx > prevIndex.current ||
        (prevIndex.current === programas.length - 1 && idx === 0)
          ? +1
          : -1;
      prevIndex.current = idx;
      setDirection(dir);
      setSelected(idx);
      onSelect?.(idx);
    };

    emblaApi.on("init", onSelectEvent);
    emblaApi.on("select", onSelectEvent);
    return () => {
      emblaApi.off("init", onSelectEvent);
      emblaApi.off("select", onSelectEvent);
    };
  }, [emblaApi, onSelect, programas.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    autoplayPlugin.stop();
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) < 50) return;
    if (delta < 0) {
      setDirection(+1);
      emblaApi?.scrollNext();
    } else {
      setDirection(-1);
      emblaApi?.scrollPrev();
    }
  };

  return (
    <Container className="flex flex-col">
      <section className="relative h-[30rem] md:h-[30rem] overflow-hidden mt-4">
        <div className="absolute top-0 left-0 aspect-5/7 lg:aspect-7/6 xl:aspect-8/6 h-full bg-black z-10 ml-4" />
        <div
          className="absolute top-0 left-0 aspect-5/7 lg:aspect-7/6 xl:aspect-8/6 h-full z-20"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction}>
            {programas[selected]?.imagen?.url && (
              <motion.img
                key={programas[selected].id}
                src={programas[selected].imagen.url}
                alt={programas[selected].imagen.alt || ""}
                onPointerDown={() => autoplayPlugin.stop()}
                className="absolute top-0 left-0 h-full w-full object-cover [object-position:50%_0%] rounded-lg border-2 border-white"
                custom={direction}
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { duration: 0.35, ease: [0.43, 0.13, 0.23, 0.96] },
                  opacity: { duration: 0.2, ease: "easeInOut" },
                }}
              />
            )}
          </AnimatePresence>
        </div>

        <div
          ref={emblaRef}
          className="overflow-hidden h-full rounded-xl
                    ml-0               
                    md:ml-0           
                    lg:ml-[clamp(1rem,20vw,21%)]
                    xl:ml-[clamp(1rem,20vw,17.5%)]"
        >
          <div className="flex items-center h-full gap-4">
            {programas.map((p, i) => (
              <div
                key={p.id}
                className={`flex-shrink-0 aspect-5/7 h-full relative rounded-lg${
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
        <div className="mt-3 lg:max-w-[40%] rounded-lg text-white ">
          <section className="flex flex-wrap items-center gap-2 *:md:text-xl uppercase">
            {onSelect ? null : (
              <>
                <p className="font-ibm font-bold">
                  {programas[selected].nombre} •
                </p>
                <p className="font-ibm font-bold">
                  {(() => {
                    const result = getStartEndDay(
                      programas[selected].diasSemana
                    );
                    const dias = programas[selected].diasSemana;
                    if (typeof result === "string") {
                      return result + " •";
                    }
                    const { start, end } = result;
                    if (dias.length === 1) {
                      return `Día: ${dias[0]} ${start
                        ?.charAt(0)
                        .toUpperCase()} •`;
                    }
                    return `${start?.charAt(0).toUpperCase()}${start?.slice(
                      1
                    )} a ${end?.charAt(0).toUpperCase()}${end?.slice(1)} •`;
                  })()}
                </p>
                <p className="font-ibm font-bold">
                  de{" "}
                  {(() => {
                    const { start, end } = getStartEndHours(
                      programas[selected].horarioInicio,
                      programas[selected].horarioFin
                    );
                    return `${start}h a ${end}h`;
                  })()}
                </p>
                <p className="font-ibm font-bold hidden xl:block">
                  • {new Date(programas[selected].fechaInicio).getFullYear()}
                </p>
              </>
            )}
          </section>
          {onSelect ? null : (
            <p className="md:text-lg font-ibm mt-2 text-gray-300">
              {programas[selected].descripcion}
            </p>
          )}
        </div>
      )}
    </Container>
  );
}
