import type { Blog } from "@/utils/fetchBlogs";
import Container from "./containers/Container";
import { motion } from "framer-motion";

interface Props {
  blogs: Blog[];
}

export default function BravaNews({ blogs }: Props) {
  return (
    <Container className="mt-10">
      <h2 className="font-inter text-white font-semibold text-2xl">
        Brava News
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4">
        {blogs.map((b) => (
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
      whileHover={{ scale: 1.01, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <picture>
        <img
          src={blog.smallImage.url}
          alt={blog.smallImage.alt}
          className="w-full h-full aspect-[3/4] object-cover mb-4"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.0) 100%)",
          }}
        />
        <section className="absolute inset-0 -bottom-0 flex flex-col justify-end p-4">
          <span className="font-bold mx-auto left-0 translate-x-1 text-sm font-inter bg-[#FADC48] px-3 py-1 rounded-full mb-2">
            BRAVA NEWS
          </span>
          <h3 className="mx-auto text-center text-lg font-bold text-white my-2 font-inter uppercase">
            {blog.title}
          </h3>
          <p className="text-white/60 text-center font-inter font-bold">
            {blog.createdAt
              ? new Date(blog.createdAt).toLocaleDateString()
              : "Unknown date"}
          </p>
        </section>
      </picture>
    </motion.a>
  );
}
