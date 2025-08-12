import { Slider } from "@/components/ui/slider";
import { Volume2, VolumeX } from "lucide-react";

export default function VolumeSlider({
  volume,
  setVolume,
}: {
  volume: number;
  setVolume: (volume: number) => void;
}) {
  return (
    <div className="flex items-center justify-center w-48 h-full gap-2">
      {volume === 0 ? (
        <VolumeX
          className="w-6 h-6 cursor-pointer text-white"
          onClick={() => setVolume(0.5)}
        />
      ) : (
        <Volume2
          className="w-6 h-6 cursor-pointer text-white"
          onClick={() => setVolume(0)}
        />
      )}
      <Slider
        min={0}
        max={1}
        step={0.01}
        defaultValue={[volume]}
        className="w-40"
        value={[volume]}
        onValueChange={(value) => setVolume(value[0])}
      />
    </div>
  );
}
