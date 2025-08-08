import { lazy, useRef, useState } from "react";
import useScrollOffset from "../../hooks/useScrollOffset";
import FixedPlayer from "./FixedPlayer";
import type { Programa } from "@/utils/fetchProgramas";

const ReactPlayer = lazy(() => import("react-player"));

export default function Player({
  programa,
}: {
  programa: Programa | undefined;
}) {
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
          programa={programa}
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
          src={programa?.imagen?.url || "/images/reproductor.webp"}
          alt="Chori y Chinchulo"
          className="w-full h-full object-cover z-60 aspect-video"
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
