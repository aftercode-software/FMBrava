import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import ImageCard from "./ImageCard";

export interface Image {
  href: string;
  imageUrl: string;
  title: string;
}

const imagesConst: Image[] = [
  {
    href: "https://www.instagram.com/p/Cw0000000000000000000000000000000000000000/",
    imageUrl: "/images/hero.jpg",
    title: "Post de instagram :)",
  },
];

export default function InstagramCarousel({ images }: { images: Image[] }) {
  const [emblaRef] = useEmblaCarousel({ align: "start", loop: true }, [
    Autoplay({ delay: 1000, stopOnMouseEnter: true }),
  ]);

  if (!images) return null;

  return (
    <div ref={emblaRef} className="overflow-hidden h-full rounded-lg">
      <div className="flex items-center h-[50vh] gap-8">
        {images.map((p, i) => (
          <ImageCard
            key={p.href}
            post={p}
            className={`flex-shrink-0 w-[85%] md:w-[35%] lg:w-[30%] h-full ${
              i === 0 ? "ml-[1.5em]" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
