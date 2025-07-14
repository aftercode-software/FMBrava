import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import TikTokCard, { type TikTokPost } from "./TiktokCard";

const tiktokPosts: TikTokPost[] = [
  {
    href: "https://www.tiktok.com/@bravaoficial/video/7248300000000000000",
    imageUrl: "/images/test.jpg",
    title: "Post de tiktok :)",
    visualizations: "1000",
  },
  {
    href: "https://www.tiktok.com/@bravaoficial/video/7248300000000000000",
    imageUrl: "/images/test.jpg",
    title: "Post de tiktok :)",
    visualizations: "1000",
  },
];

export default function TiktokCarousel() {
  const [emblaRef] = useEmblaCarousel({ align: "start", loop: true }, [
    Autoplay({ delay: 1000, stopOnMouseEnter: true }),
  ]);

  const [posts, setPosts] = useState<TikTokPost[]>(tiktokPosts);

  useEffect(() => {
    setTimeout(() => {
      setPosts(tiktokPosts);
    }, 1000);
  }, []);

  return (
    <div ref={emblaRef} className="overflow-hidden h-full rounded-lg">
      <div className="flex items-center h-[50vh] gap-8">
        {posts.map((p, i) => (
          <TikTokCard
            key={p.href}
            post={p}
            className={`flex-shrink-0 w-[85%] md:w-[35%] lg:w-[23%] h-full ${
              i === 0 ? "ml-[1.5rem]" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
