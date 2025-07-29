import type { Blog } from "@/utils/fetchBlogs";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Container from "../containers/Container";
import VerMasButton from "../VerMasButton";

interface Props {
  showAll?: boolean;
  blogs: Blog[];
}

export default function BravaNews({ blogs, showAll = false }: Props) {
  if (blogs.length === 0) return null;
  return (
    <Container className="my-6">
      <div className="flex justify-between w-full items-center mt-40 mb-6">
        <aside className="flex items-center">
          <div>
            <img
              src="/sections-icons/brava-news-icon.webp"
              alt="Brava News"
              className="w-18 h-18 md:w-24 md:h-24 mr-2"
            />
          </div>
          <div className="flex-1 md:min-w-[50%]">
            <h2 className="font-inter text-white font-semibold text-xl lg:text-2xl">
              Brava News
            </h2>
            <p className="text-base md:text-lg font-ibm text-gray-300">
              Noticias de música, entretenimiento y cultura pop en Mendoza, con
              el sello Brava.
            </p>
          </div>
        </aside>
        <aside className="hidden md:block">
          <a
            href="/brava-news"
            className="group font-inter flex gap-3 md:gap-4 items-center font-semibold md:font-bold text-white md:text-lg *:transition-all *:duration-100"
          >
            Ver todas
            <span className="bg-white/30 px-4 py-1 rounded-xl group-hover:bg-rojo group-hover:scale-105">
              {blogs.length}
            </span>
            <ChevronRight className="group-hover:translate-x-1" />
          </a>
        </aside>
      </div>
      <div className="mt-16 grid gap-6 grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {(showAll ? blogs : blogs.slice(0, 4)).map((b) => (
          <BravaNewsCard key={b.id} blog={b} />
        ))}
      </div>
      <aside className="flex md:hidden w-full justify-end items-center mt-10">
        <VerMasButton
          cantidad={blogs.length}
          link="/brava-news"
          verTodasTexto="todas"
        />
      </aside>
    </Container>
  );
}

export function BravaNewsCard({ blog }: { blog: Blog }) {
  return (
    <motion.a
      href={`/brava-news/${blog.slug}`}
      key={blog.id}
      className="relative items-center justify-center rounded-lg hover:shadow-lg transition-shadow"
      whileHover={{ y: -10, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <picture>
        <img
          src={blog.smallImage.url}
          alt={blog.smallImage.alt}
          className="w-full aspect-[3/4] object-cover rounded-sm"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.0) 100%)",
          }}
        />
        <section className="absolute inset-0 -bottom-0 flex flex-col justify-end p-2 lg:p-4">
          <span className="font-bold mx-auto left-0 translate-x-1 text-xs lg:text-sm font-inter bg-amarillo px-3 py-1 rounded-full mb-2">
            BRAVA NEWS
          </span>
          <h3 className="mx-auto text-left lg:text-center text-sm md:text-base xl:text-lg font-bold text-white my-2 font-inter uppercase">
            {blog.title}
          </h3>
          <p className="hidden lg:block text-white/60 text-center text-xs font-inter font-bold">
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : "Unknown date"}
          </p>
        </section>
      </picture>
    </motion.a>
  );
}
