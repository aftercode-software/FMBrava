import useScrollOffset from "@/hooks/useScrollOffset";

export default function Player() {
  const scrollY = useScrollOffset();

  return (
    <div className="w-full h-full relative">
      {/* <div className="hidden md:block bg-rojo h-[80%] w-[60%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[300px] pointer-events-none"></div> */}

      <div
        className={`w-full h-[30vh] md:h-[50vh] rounded-lg overflow-hidden z-50 aspect-video ${
          scrollY > 400 ? "invisible" : ""
        }`}
        aria-hidden={scrollY > 400}
      >
        <iframe
          src="https://player.kick.com/fmbrava"
          className="w-full h-full"
          frameBorder="0"
          scrolling="no"
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
}
