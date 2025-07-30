import type { InstagramPost } from "@/utils/fetchRRSS";

interface Props {
  post: InstagramPost;
  className?: string;
}

export default function InstagramCard({ post, className }: Props) {
  const { media_url, media_type, caption } = post;
  return (
    <a
      href={post.permalink}
      target="_blank"
      rel="noopener noreferrer"
      className={`block relative rounded-lg border-2 aspect-4/5 border-white overflow-hidden cursor-pointer ${className}`}
    >
      {media_type === "IMAGE" || media_type === "CAROUSEL_ALBUM" ? (
        <img
          src={media_url}
          draggable={false}
          alt="Imagen del programa"
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      ) : (
        <video
          src={media_url}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover absolute top-0 left-0"
        />
      )}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-white flex items-center justify-between px-2">
        <p className="text-base font-ibm w-[80%] truncate">{caption}</p>
        <img
          src="/svg/instagram.svg"
          alt="logo"
          className="w-8 object-cover rounded-full"
        />
      </div>
    </a>
  );
}
