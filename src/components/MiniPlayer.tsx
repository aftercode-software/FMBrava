import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import Badge from "./Badge";

export default function MiniPlayer() {
  const [defaultPos, setDefaultPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const playerWidth = window.innerWidth * 0.5;
    const playerHeight = (playerWidth / 16) * 9 + 50;
    setDefaultPos({
      x: window.innerWidth - playerWidth - 24,
      y: window.innerHeight - playerHeight - 24,
    });
  }, []);

  return (
    <Draggable
      axis="both"
      handle=".handle"
      defaultPosition={defaultPos}
      grid={[25, 25]}
      scale={1}
    >
      <section
        className="handle fixed z-50 aspect-video bg-negro-900 p-2 rounded-xl max-w-[50%] cursor-move"
        style={{ width: "min(50vw, 400px)" }}
      >
        <iframe
          src="https://player.kick.com/fmbrava?muted=false"
          className="w-full h-full rounded-xl"
          frameBorder="0"
          scrolling="no"
          allowFullScreen
        ></iframe>
        <div className="flex items-center gap-2 mt-2">
          <Badge className="animate-pulse w-fit text-xs sm:text-sm">
            EN VIVO
          </Badge>
          <p className="font-bold hidden md:block text-sm sm:text-lg text-white truncate font-ibm uppercase">
            Somos más brava
          </p>
        </div>
      </section>
    </Draggable>
  );
}
