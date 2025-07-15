import type { Image } from "./ImagesCarousel";

export default function ImageCard({
  post,
  className,
}: {
  post: Image;
  className?: string;
}) {
  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative ${className}`}
    >
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full h-14 text-white bg-black/50 backdrop-blur py-3 px-4">
        <span className="text-white font-bold text-xl font-ibm uppercase">
          {post.title}
        </span>
      </div>
    </a>
  );
}
