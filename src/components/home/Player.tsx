import { lazy, useEffect, useRef, useState } from "react";
import useScrollOffset from "../../hooks/useScrollOffset";
import FixedPlayer from "./FixedPlayer";
import type { Programa } from "@/utils/fetchProgramas";

const ReactPlayer = lazy(() => import("react-player"));

function nowInAR() {
  return new Date(
    new Date().toLocaleString("en-US", {
      timeZone: "America/Argentina/Buenos_Aires",
    })
  );
}

function minsOfDay(d: Date) {
  return d.getHours() * 60 + d.getMinutes();
}
function minsOfDayFromISO(iso: string, tz = "America/Argentina/Buenos_Aires") {
  const base = new Date(iso);
  const inTz = new Date(base.toLocaleString("en-US", { timeZone: tz }));
  return minsOfDay(inTz);
}

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
  const [playing, setPlaying] = useState(false);
  const scrollY = useScrollOffset();
  const playerRef = useRef<any>(null);
  const [volume, setVolume] = useState(0.5);

  return (
    <div className="w-full h-full relative">
      {/* <div className="hidden md:block bg-rojo h-[80%] w-[60%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[300px] pointer-events-none"></div> */}

      {scrollY > 400 && (
        <FixedPlayer
          playing={playing}
          setIsPlaying={setPlaying}
          playerRef={playerRef}
          volume={volume}
          programa={nowPlaying}
          setVolume={setVolume}
        />
      )}
      <div
        className={`w-full h-[30vh] md:h-[50vh] rounded-lg overflow-hidden z-50 aspect-video ${
          scrollY > 400 ? "invisible" : ""
        }`}
        aria-hidden={scrollY > 400}
      >
        <img
          src={nowPlaying?.imagen?.url || "/images/reproductor.webp"}
          alt={nowPlaying?.nombre || "Programa en vivo"}
          className="w-full h-full object-cover z-60 aspect-video object-[50%_20%] "
        />
        <ReactPlayer
          src="https://26673.live.streamtheworld.com/BRAVA_FM949.mp3"
          width="0"
          height="0"
          playing={playing}
          volume={volume}
          className="hidden"
        />
      </div>
    </div>
  );
}
