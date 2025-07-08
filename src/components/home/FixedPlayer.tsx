import { Play, Redo, Redo2, Undo, Undo2 } from "lucide-react";
import React from "react";
import Badge from "../Badge";
import Container from "../containers/Container";
import VolumeSlider from "./VolumeSlider";

type Props = {
  playing: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  playerRef: React.RefObject<any>;
  volume: number;
  setVolume: (volume: number) => void;
};

export default function FixedPlayer({
  playing,
  setIsPlaying,
  playerRef,
  volume,
  setVolume,
}: Props) {
  const manipulatePlayerTime = (time: number) => {
    const player = playerRef.current!.api;
    const currentTime = player.getCurrentTime();
    player.seekTo(currentTime + time);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full h-32 bg-negro-900/50 py-5 overflow-hidden z-50 backdrop-blur-xl border-t-1 border-negro-400">
      <Container className="flex items-center justify-between h-full">
        <div className="flex items-center justify-center gap-8 h-24 overflow-hidden">
          <img
            src="/images/player-image.jpg"
            alt="player"
            className="w-32 h-full object-cover select-none"
            draggable="false"
          />
          <div className="flex flex-col gap-2">
            <Badge className="animate-pulse">En vivo</Badge>
            <span className="font-inter font-bold text-xl">
              SOMOS MÁS BRAVA
            </span>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-4">
          <button onClick={() => manipulatePlayerTime(-5)}>
            <Undo2 className="w-8 h-8 cursor-pointer hover:scale-110 transition-all duration-100" />
          </button>
          <button
            onClick={() => setIsPlaying(!playing)}
            className="hover:scale-110 transition-all duration-300 w-[4.5rem] h-[4.5rem] bg-white rounded-full flex items-center justify-center relative cursor-pointer"
          >
            {!playing ? (
              <img
                src="/images/play.svg"
                alt="play"
                className="w-7 h-7 absolute top-1/2 left-[35%] -translate-y-1/2 select-none"
                draggable="false"
              />
            ) : (
              <img
                src="/images/pause.svg"
                alt="pause"
                className="w-7 h-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
                draggable="false"
              />
            )}
          </button>
          <button onClick={() => manipulatePlayerTime(5)}>
            <Redo2 className="w-8 h-8 cursor-pointer hover:scale-110 transition-all duration-100" />
          </button>
        </div>
        <VolumeSlider volume={volume} setVolume={setVolume} />
      </Container>
    </div>
  );
}
