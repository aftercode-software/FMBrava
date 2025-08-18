import { type Programa } from "@/utils/fetchProgramas";
import { getStartEndDay, getStartEndHours } from "@/utils/utils";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useMemo, useRef, useState } from "react";
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
  const featureRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [padLeft, setPadLeft] = useState(0);

  const MIN_SLIDES = 10;
  const slides = useMemo(() => {
    if (!programas?.length) return [];
    const factor = Math.max(1, Math.ceil(MIN_SLIDES / programas.length));
    return Array.from({ length: factor }, () => programas).flat();
  }, [programas]);

  const autoplayPlugin = useMemo(
    () =>
      Autoplay({
        delay: 3000,
        stopOnInteraction: true,
      }),
    []
  );
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true, containScroll: "trimSnaps" },
    [autoplayPlugin]
  );

  useEffect(() => {
    const featureEl = featureRef.current;
    const trackEl = trackRef.current;
    if (!featureEl || !trackEl) return;

    const XL = "(min-width: 1023px)";
    const mql = window.matchMedia(XL);

    const compute = () => {
      if (!mql.matches) {
        setPadLeft(0);
        return;
      }

      const featureWidth = featureEl.getBoundingClientRect().width;

      const firstSlideEl = trackEl.firstElementChild as HTMLElement | null;
      const slideWidth = firstSlideEl?.getBoundingClientRect().width ?? 0;

      const styles = getComputedStyle(trackEl);
      const trackGap = parseFloat(styles.columnGap || styles.gap || "0") || 0;

      const DESIRED_VIS_GAP = 8;
      const EPS = 2;

      const pl = Math.max(
        0,
        featureWidth + DESIRED_VIS_GAP - slideWidth - trackGap + EPS
      );
      setPadLeft(pl);
    };

    const ro1 = new ResizeObserver(compute);
    const ro2 = new ResizeObserver(compute);
    ro1.observe(featureEl);
    const first = trackEl.firstElementChild as Element | null;
    if (first) ro2.observe(first);

    mql.addEventListener("change", compute);
    window.addEventListener("resize", compute);

    compute();

    return () => {
      ro1.disconnect();
      ro2.disconnect();
      mql.removeEventListener("change", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  useEffect(() => {
    if (!emblaApi || !programas.length) return;

    const onSelectEvent = () => {
      const snap = emblaApi.selectedScrollSnap();
      const idx = snap % programas.length;

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

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, padLeft, slides.length]);

  return (
    <Container className="flex flex-col w-full">
      <section className="relative h-[30rem] md:h-[30rem] overflow-hidden mt-4">
        <div className="absolute top-0 left-0 aspect-5/7 lg:aspect-7/6 xl:aspect-8/6 h-full bg-negro-900 z-10 ml-4" />
        <div
          className="absolute top-0 left-0 aspect-5/7 lg:aspect-7/6 xl:aspect-8/6 h-full z-20"
          ref={featureRef}
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
                className="absolute top-0 left-0 h-full w-full object-cover [object-position:50%_20%] rounded-lg border-2 border-white"
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
          className="overflow-hidden h-full rounded-xl"
          style={{ paddingLeft: padLeft }}
        >
          <div ref={trackRef} className="flex items-center h-full gap-4">
            {slides.map((p) => (
              <div
                key={useId()}
                className={`flex-shrink-0 aspect-5/7 h-full relative rounded-lg${
                  slides.indexOf(p) === 0 ? " ml-[0.5rem]" : ""
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
