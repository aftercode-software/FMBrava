import { CACHE_DURATION } from "@/constants/cache";
import { secureFetch } from "@/lib/secureFetch";
import { fetchImagenPresign } from "./fetchImagen";

let cachedDestacadas: Destacada[] | null = null;
let cacheTimestamp: number = 0;

interface DestacadaRaw {
  id: string;
  createdAt: string;
  image: {
    url: string;
    alt: string;
  };
  title: string;
  link?: string;
}

export type Destacada = {
  id: string;
  createdAt: Date;
  image: {
    url: string;
    alt: string;
  };
  title: string;
  link?: string;
};

export async function fetchDestacadas(): Promise<Destacada[]> {
  const now = Date.now();

  if (cachedDestacadas && now - cacheTimestamp < CACHE_DURATION) {
    return cachedDestacadas;
  }

  const { docs } = await secureFetch<{ docs: DestacadaRaw[] }>("destacadas");
  if (!docs) throw new Error("Error fetching destacadas");

  cachedDestacadas = await Promise.all(
    docs.map(async (item) => {
      const presignedUrl = await fetchImagenPresign(item.image.url);
      return {
        id: item.id,
        createdAt: new Date(item.createdAt),
        image: {
          url: presignedUrl,
          alt: item.image.alt || "",
        },
        title: item.title,
        link: item.link,
      };
    })
  );
  cacheTimestamp = now;
  return cachedDestacadas;
}
