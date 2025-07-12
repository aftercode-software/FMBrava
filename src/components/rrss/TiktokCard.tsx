import React from "react";

export interface TikTokPost {
  href: string;
  imageUrl: string;
  title: string;
  visualizations: string;
}

interface Props {
  post: TikTokPost;
  className?: string;
}

export default function TikTokCard({ post, className }: Props) {
  const { href, imageUrl, title, visualizations } = post;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`block relative rounded-lg border-2 border-white overflow-hidden cursor-pointer  ${className}`}
    >
      <img
        src={imageUrl}
        draggable={false}
        alt="Imagen del programa"
        className="w-full h-full object-cover absolute top-0 left-0"
      />
      <div className="absolute bottom-0 left-0 h-28 w-full flex flex-col justify-end p-4 bg-gradient-to-t from-black to-transparent text-white font-ibm">
        <p className="text-xl font-medium">{title}</p>
        <span className="text-lg text-gray-400 font-medium">
          {visualizations} visualizaciones
        </span>
      </div>
    </a>
  );
}
