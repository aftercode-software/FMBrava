import { useRef, useState } from "react";
import ReactPlayer from "react-player";
// import { useMediaQuery } from "../../hooks/useMediaQuery";
import useScrollOffset from "../../hooks/useScrollOffset";
import FixedPlayer from "./FixedPlayer";

export default function Player() {
  const [playing, setPlaying] = useState(true);
  const scrollY = useScrollOffset();
  const playerRef = useRef<any>(null);
  const [volume, setVolume] = useState(0.5);
  return (
    <div className="w-full h-full relative">
      <div className="hidden md:block bg-rojo h-[50%] w-[50%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[300px] pointer-events-none"></div>

      {scrollY > 400 && (
        <FixedPlayer
          playing={playing}
          setIsPlaying={setPlaying}
          playerRef={playerRef}
          volume={volume}
          setVolume={setVolume}
        />
      )}
      <div
        className={`w-full h-[50vh] rounded-lg overflow-hidden z-50 ${
          scrollY > 400 ? "hidden" : ""
        }`}
      >
        <ReactPlayer
          src="https://www.youtube.com/watch?v=xttl8CQ0wa8"
          ref={playerRef}
          width="100%"
          height="100%"
          volume={volume}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          playing={playing}
          config={{
            youtube: {
              playerVars: {
                fs: 0,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
