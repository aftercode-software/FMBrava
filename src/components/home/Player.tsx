import useScrollOffset from "@/hooks/useScrollOffset";

export default function Player() {
  const scrollY = useScrollOffset();

  return (
    <div className="w-full h-full relative rounded-xl">
      <div
        className={`w-full h-[30vh] md:h-[50vh] rounded-xl overflow-hidden z-50 aspect-video ${
          scrollY > 400 ? "invisible" : ""
        }`}
        aria-hidden={scrollY > 400}
      >
        <iframe
          src="https://player.kick.com/fmbrava?muted=false"
          className="w-full h-full rounded-xl"
          frameBorder="0"
          scrolling="no"
          allowFullScreen={true}
        ></iframe>
      </div>
    </div>
  );
}
