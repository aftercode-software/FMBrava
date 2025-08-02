import { CACHE_DURATION } from "@/constants/cache";
import { secureFetch } from "@/lib/secureFetch";

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

  cachedBlogs = docs.map((doc, i) => ({
    id: doc.id,
    title: doc.title,
    content: doc.content.root.children,
    smallImage: {
      url: import.meta.env.VITE_CMS_PUBLIC_URL + (doc.smallImage?.url || ""),
      alt: doc.smallImage.alt,
    },
    largeImage: doc.largeImage
      ? {
          url:
            import.meta.env.VITE_CMS_PUBLIC_URL + (doc.largeImage?.url || ""),
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
