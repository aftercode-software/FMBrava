import { CACHE_DURATION } from "@/constants/cache";
import { secureFetch } from "@/lib/secureFetch";
import { fetchImagenPresign } from "./fetchImagen";

let cachedBlogs: any[] | null = null;
let cacheTimestamp: number = 0;

interface BlogRaw {
  id: string;
  title: string;
  content: {
    root: {
      children: any[];
    };
  };
  smallImage: {
    url: string;
    alt: string;
  };
  largeImage: {
    url: string;
    alt: string;
  };
  slug: string;
  createdAt?: string;
}

export type Blog = {
  id: string;
  title: string;
  content: any[];
  smallImage: { url: string; alt: string };
  largeImage?: { url: string; alt: string };
  slug: string;
  createdAt?: string;
};

export async function fetchBlogs(): Promise<Blog[]> {
  const now = Date.now();

  if (cachedBlogs && now - cacheTimestamp < CACHE_DURATION) {
    return cachedBlogs;
  }

  const { docs } = await secureFetch<{ docs: BlogRaw[] }>("blogs");
  if (!docs) throw new Error("Error fetching blogs");

  const smallImages = await Promise.all(
    docs.map((doc) => fetchImagenPresign(doc.smallImage.url))
  );
  const largeImages = await Promise.all(
    docs.map((doc) =>
      doc.largeImage
        ? fetchImagenPresign(doc.largeImage.url)
        : Promise.resolve(undefined)
    )
  );

  cachedBlogs = docs.map((doc, i) => ({
    id: doc.id,
    title: doc.title,
    content: doc.content.root.children,
    smallImage: {
      url: smallImages[i],
      alt: doc.smallImage.alt,
    },
    largeImage: doc.largeImage
      ? {
          url: largeImages[i],
          alt: doc.largeImage.alt,
        }
      : undefined,
    slug: doc.slug,
    createdAt: doc.createdAt
      ? new Date(doc.createdAt).toISOString()
      : undefined,
  }));

  cacheTimestamp = now;
  return cachedBlogs;
}
