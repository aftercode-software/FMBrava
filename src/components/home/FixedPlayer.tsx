import { Pause, Play, Redo2, Undo2, Volume2, VolumeX } from "lucide-react";
import { lazy, useEffect, useRef, useState } from "react";
import Badge from "../Badge";
import Container from "../containers/Container";
import { Slider } from "../ui/slider";
import VolumeSlider from "./VolumeSlider";
import useScrollOffset from "@/hooks/useScrollOffset";
import type { Programa } from "@/utils/fetchProgramas";
import { minsOfDay, minsOfDayFromISO, nowInAR } from "@/utils/utils";
const ReactPlayer = lazy(() => import("react-player"));

export default function FixedPlayer({ programas }: { programas: Programa[] }) {
  const [showVolumeModal, setShowVolumeModal] = useState(false);
  const [playing, setPlaying] = useState(false);
  const scrollY = useScrollOffset();
  const playerRef = useRef<any>(null);
  const [volume, setVolume] = useState(0.5);

  const manipulatePlayerTime = (time: number) => {
    const player = playerRef.current?.api;
    if (player) {
      const currentTime = player.getCurrentTime();
      player.seekTo(currentTime + time);
    }
  };

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
    <>
      {showVolumeModal && (
        <div
          className="fixed inset-0 bg-gradient-to-b from-negro-900 to-negro/30 backdrop-blur-sm z-[9999] flex items-center justify-center sm:hidden"
          onClick={() => setShowVolumeModal(false)}
        >
          <div className="bg-negro-900 backdrop-blur-xl rounded-2xl p-6 mx-4 w-full max-w-sm border border-gray-700">
            <div className="text-center mb-4">
              <h3 className="text-white font-semibold font-inter text-xl">
                Volumen
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <VolumeX className="w-5 h-5 text-white/70" />
              <div className="flex-1">
                <Slider
                  value={[volume]}
                  onValueChange={(value) => setVolume(value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>
              <Volume2 className="w-5 h-5 text-white/70" />
            </div>
            <div className="text-center mt-4 font-inter">
              <span className="text-white/70 text-sm">{volume}%</span>
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 h-26 w-full py-1 bg-gradient-to-t from-negro-900 to-negro/30 backdrop-blur-xl z-50">
        <Container className="py-3 sm:py-4 h-full">
          <div className="relative flex items-center h-full">
            <div className="flex items-center gap-3 flex-1 min-w-0 pr-4">
              <div className="hidden md:block relative flex-shrink-0">
                <img
                  src={nowPlaying?.imagen.url || "/images/reproductor.png"}
                  alt="player"
                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-1 min-w-0">
                <Badge className="animate-pulse w-fit text-xs sm:text-sm">
                  EN VIVO
                </Badge>
                <span className="hidden md:flex font-bold text-sm sm:text-lg text-white truncate font-ibm uppercase">
                  {nowPlaying?.nombre || "Somos Más Brava"}
                </span>
              </div>
            </div>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  className="w-12 h-12 sm:w-14 sm:h-14 bg-white hover:bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-all shadow-lg cursor-pointer"
                  onClick={() => setPlaying(!playing)}
                >
                  {playing ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 ml-0.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end flex-1 pl-4">
              <div className="hidden sm:block cursor-pointer">
                <VolumeSlider volume={volume} setVolume={setVolume} />
              </div>

              <button
                className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:bg-white/10 sm:hidden active:scale-95 transition-all cursor-pointer"
                onClick={() => setShowVolumeModal(true)}
              >
                {volume > 0 ? (
                  <Volume2 className="w-5 h-5" />
                ) : (
                  <VolumeX className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>
      <ReactPlayer
        src="https://26673.live.streamtheworld.com/BRAVA_FM949.mp3"
        width="0"
        height="0"
        playing={playing}
        volume={volume}
        className="hidden"
      />
    </>
  );
}
