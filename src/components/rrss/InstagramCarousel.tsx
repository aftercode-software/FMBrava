import type { InstagramResponse } from "@/utils/fetchRRSS";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { memo } from "react";
import InstagramCard from "./InstagramCard";

function InstagramCarousel({ posts }: { posts: InstagramResponse }) {
  const [emblaRef] = useEmblaCarousel({ align: "start", loop: true }, [
    Autoplay({ delay: 2000, stopOnMouseEnter: true }),
  ]);

  return (
    <div ref={emblaRef} className="overflow-hidden h-full rounded-lg">
      <div className="flex items-center h-[26rem] sm:h-[40vh] lg:h-[50vh] gap-4 md:gap-8">
        {posts.map((p, i) => (
          <InstagramCard
            key={p.id}
            post={p}
            className={`flex-shrink-0 h-full w-[80%] md:w-[35%] lg:w-[25%] ${
              i === 0 ? "ml-[1.5em]" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// Memoize the carousel to prevent unnecessary re-renders
export default memo(InstagramCarousel);
