import { useEffect, useState } from "react";
import type { Programa } from "@/utils/fetchProgramas";
import { minsOfDay, minsOfDayFromISO, nowInAR } from "@/utils/utils";

export default function Player({
  programas,
}: {
  programas: Programa[] | undefined;
}) {
  const [nowPlaying, setNowPlaying] = useState<Programa | null>(null);

  useEffect(() => {
    if (!programas || programas.length === 0) return;
    const compute = () => {
      const now = nowInAR();
      const nowM = minsOfDay(now);
      const current =
        programas.find((p) => {
          const s = minsOfDayFromISO(p.horarioInicio);
          const e = minsOfDayFromISO(p.horarioFin);
          return e > s ? nowM >= s && nowM < e : nowM >= s || nowM < e;
        }) || null;
      setNowPlaying(current);
    };
    compute();
    const id = setInterval(compute, 30 * 1000);
    return () => clearInterval(id);
  }, [programas]);

  return (
    <div className="w-full h-full relative">
      {/* <div className="hidden md:block bg-rojo h-[80%] w-[60%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[300px] pointer-events-none"></div> */}

      <div
        className={`w-full h-[30vh] md:h-[50vh] rounded-lg overflow-hidden z-50 aspect-video ${
          scrollY > 400 ? "invisible" : ""
        }`}
        aria-hidden={scrollY > 400}
      >
        <img
          src={nowPlaying?.imagen?.url || "/images/reproductor.webp"}
          alt={nowPlaying?.nombre || "Programa en vivo"}
          className="aspect-7/6 w-full object-cover z-60  object-[50%_20%] "
        />
      </div>
    </div>
  );
}
