import React from "react";

export interface InstagramPost {
  href: string;
  imageUrl: string;
  title: string;
  socialImageUrl: string;
}

interface Props {
  post: InstagramPost;
  className?: string;
}

export default function InstagramCard({ post, className }: Props) {
  const { href, imageUrl, title, socialImageUrl } = post;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block relative rounded-lg border-2 border-white overflow-hidden cursor-pointer ${className}`}
    >
      <img
        src={imageUrl}
        draggable={false}
        alt="Imagen del programa"
        className="w-full h-full object-cover absolute top-0 left-0"
      />
      <div className="absolute bottom-0 left-0 w-full h-12 bg-white flex items-center justify-between px-4">
        <p className="text-lg font-ibm w-[80%] truncate">{title}</p>
        <img
          src={socialImageUrl}
          alt="logo"
          className="w-10 h-10 object-cover rounded-full"
        />
      </div>
    </a>
  );
}
