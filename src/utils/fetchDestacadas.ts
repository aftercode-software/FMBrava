import { CACHE_DURATION } from "@/constants/cache";
import { secureFetch } from "@/lib/secureFetch";
import { fetchImagenPresign } from "./fetchImagen";

let cachedDestacadas: Destacada[] | null = null;
let cacheTimestamp: number = 0;

interface BaseDestacadaRaw {
  id: string;
  createdAt: string;
  title: string;
  type: "image" | "video";
}

interface DestacadaImageRaw extends BaseDestacadaRaw {
  type: "image";
  image: {
    url: string;
    alt: string;
  };
  link?: string;
}

interface DestacadaVideoRaw extends BaseDestacadaRaw {
  type: "video";
  youtubeUrl: string;
}

type DestacadaRaw = DestacadaImageRaw | DestacadaVideoRaw;

interface BaseDestacada {
  id: string;
  createdAt: Date;
  title: string;
  type: "image" | "video";
}

export interface DestacadaImage extends BaseDestacada {
  type: "image";
  image: {
    url: string;
    alt: string;
  };
  link?: string;
}

export interface DestacadaVideo extends BaseDestacada {
  type: "video";
  youtubeUrl: string;
}

export type Destacada = DestacadaImage | DestacadaVideo;

export function getYouTubeThumbnail(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[2].length === 11 ? match[2] : null;

  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
}

export async function fetchDestacadas(): Promise<Destacada[]> {
  const now = Date.now();

  if (cachedDestacadas && now - cacheTimestamp < CACHE_DURATION) {
    return cachedDestacadas;
  }

  const { docs } = await secureFetch<{ docs: DestacadaRaw[] }>("destacadas");
  if (!docs) throw new Error("Error fetching destacadas");

  cachedDestacadas = await Promise.all(
    docs.map(async (item): Promise<Destacada> => {
      const base = {
        id: item.id,
        createdAt: new Date(item.createdAt),
        title: item.title,
      };

      if (item.type === "image") {
        return {
          ...base,
          type: "image",
          link: item.link,
          image: {
            url: (await fetchImagenPresign(item.image.url)) || "",
            alt: item.image.alt || "",
          },
        };
      } else {
        return {
          ...base,
          type: "video",
          youtubeUrl: item.youtubeUrl,
        };
      }
    })
  );

  cacheTimestamp = now;
  return cachedDestacadas;
}
