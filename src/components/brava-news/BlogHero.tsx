import type { Blog } from "@/utils/fetchBlogs";
import { Calendar, Clock, User } from "lucide-react";

export default function BlogHero({ b }: { b: Blog }) {
  return (
    <div className="relative h-[70vh] overflow-hidden">
      <img
        src={b.largeImage?.url || b.smallImage.url}
        alt={b.largeImage?.alt || b.smallImage.alt}
        className="object-cover w-full"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
        <div className="max-w-4xl mx-auto">
          <span className="font-bold mx-auto left-0 translate-x-1 text-sm font-inter bg-[#FADC48] px-3 py-1 rounded-full mb-2">
            BRAVA NEWS
          </span>
          <h1 className="text-4xl text-white md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {b.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(b.createdAt ?? "").toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Por Redacción Brava</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>5 min de lectura</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
