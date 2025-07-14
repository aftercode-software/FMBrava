import type { Blog } from "@/utils/fetchBlogs";
import Container from "./containers/Container";
import { motion } from "framer-motion";

interface Props {
  showAll?: boolean;
  blogs: Blog[];
}

export default function BravaNews({ blogs, showAll = false }: Props) {
  return (
    <Container className="mt-10">
      <h2 className="font-inter text-white font-semibold text-2xl">
        Brava News
      </h2>
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 mt-4">
        {(showAll ? blogs : blogs.slice(0, 4)).map((b) => (
          <BravaNewsCard key={b.id} blog={b} />
        ))}
      </div>
    </Container>
  );
}

export function BravaNewsCard({ blog }: { blog: Blog }) {
  return (
    <motion.a
      href={`/brava-news/${blog.slug}`}
      key={blog.id}
      className="relative items-center justify-center rounded-lg hover:shadow-lg transition-shadow"
      whileHover={{ y: -5, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
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
        <section className="absolute inset-0 -bottom-0 flex flex-col justify-end p-4">
          <span className="font-bold mx-auto left-0 translate-x-1 text-sm font-inter bg-amarillo px-3 py-1 rounded-full mb-2">
            BRAVA NEWS
          </span>
          <h3 className="mx-auto text-left lg:text-center text-sm md:text-base xl:text-lg font-bold text-white my-2 font-inter uppercase">
            {blog.title}
          </h3>
          <p className="text-white/60 text-center text-xs font-inter font-bold">
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : "Unknown date"}
          </p>
        </section>
      </picture>
    </motion.a>
  );
}
