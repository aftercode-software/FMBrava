import {
  createContext,
  useContext,
  useState,
  useRef,
  type ReactNode,
} from "react";
import type { Programa } from "@/utils/fetchProgramas";

type PlayerContextType = {
  playing: boolean;
  setPlaying: (value: boolean) => void;
  volume: number;
  setVolume: (value: number) => void;
  nowPlaying: Programa | null;
  setNowPlaying: (prog: Programa | null) => void;
  playerRef: React.RefObject<any>;
  showPlayer: boolean;
  setShowPlayer: (show: boolean) => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [nowPlaying, setNowPlaying] = useState<Programa | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);
  const playerRef = useRef<any>(null);

  return (
    <PlayerContext.Provider
      value={{
        playing,
        setPlaying,
        volume,
        setVolume,
        nowPlaying,
        setNowPlaying,
        playerRef,
        showPlayer,
        setShowPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};
