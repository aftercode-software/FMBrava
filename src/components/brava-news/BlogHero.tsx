import type { Blog } from "@/utils/fetchBlogs";
import { Calendar, Clock, User } from "lucide-react";
import Container from "../containers/Container";

export default function BlogHero({ b }: { b: Blog }) {
  return (
    <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
      <img
        src={b.largeImage?.url || b.smallImage.url}
        alt={b.largeImage?.alt || b.smallImage.alt}
        className="object-cover w-full h-full"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <Container className="absolute bottom-0 left-0 right-0 py-8 md:py-12 lg:p-16">
        <div className="max-w-4xl xl:max-w-5xl mx-auto *:font-ibm">
          <span className="font-bold mx-auto left-0 translate-x-1 text-sm font-inter bg-amarillo px-3 py-1 rounded-full mb-2">
            BRAVA NEWS
          </span>
          <h1 className="text-3xl text-white md:text-5xl lg:text-6xl font-bold mb-4 leading-tight pt-2">
            {b.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 md:gap-6 text-gray-300">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm md:text-base">
                {new Date(b.createdAt ?? "").toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="text-sm md:text-base">Redacción Brava</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm md:text-base">5 min</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
