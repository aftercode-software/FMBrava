import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import InstagramCard, { type InstagramPost } from "./InstagramCard";

const instagramPosts: InstagramPost[] = [
  {
    href: "https://www.instagram.com/p/Cw0000000000000000000000000000000000000000/",
    imageUrl: "/public/images/hero.jpg",
    title: "Post de instagram :)",
    socialImageUrl: "/public/logo.png",
  },
  {
    href: "https://www.instagram.com/p/Cw0000000000000000000000000000000000000000/",
    imageUrl: "/public/images/hero.jpg",
    title: "Post de instagram :)",
    socialImageUrl: "/public/logo.png",
  },
  {
    href: "https://www.instagram.com/p/Cw0000000000000000000000000000000000000000/",
    imageUrl: "/public/images/hero.jpg",
    title: "Post de instagram :)",
    socialImageUrl: "/public/logo.png",
  },
  {
    href: "https://www.instagram.com/p/Cw0000000000000000000000000000000000000000/",
    imageUrl: "/public/images/hero.jpg",
    title: "Post de instagram :)",
    socialImageUrl: "/public/logo.png",
  },
  {
    href: "https://www.instagram.com/p/Cw0000000000000000000000000000000000000000/",
    imageUrl: "/public/images/hero.jpg",
    title: "Post de instagram :)",
    socialImageUrl: "/public/logo.png",
  },
  {
    href: "https://www.instagram.com/p/Cw0000000000000000000000000000000000000000/",
    imageUrl: "/public/images/hero.jpg",
    title: "Post de instagram :)",
    socialImageUrl: "/public/logo.png",
  },
  {
    href: "https://www.instagram.com/p/Cw0000000000000000000000000000000000000000/",
    imageUrl: "/public/images/hero.jpg",
    title: "Post de instagram :)",
    socialImageUrl: "/public/logo.png",
  },
];

export default function InstagramCarousel() {
  const [emblaRef] = useEmblaCarousel({ align: "start", loop: true }, [
    Autoplay({ delay: 1000, stopOnMouseEnter: true }),
  ]);

  const [posts, setPosts] = useState<InstagramPost[]>(instagramPosts);

  useEffect(() => {
    setTimeout(() => {
      setPosts(instagramPosts);
    }, 1000);
  }, []);

  return (
    <div ref={emblaRef} className="overflow-hidden h-full rounded-lg">
      <div className="flex items-center h-[50vh] gap-8">
        {posts.map((p, i) => (
          <InstagramCard
            key={p.href}
            post={p}
            className={`flex-shrink-0 w-[45%] md:w-[35%] lg:w-[23%] h-full ${
              i === 0 ? "ml-[.8rem]" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
}
