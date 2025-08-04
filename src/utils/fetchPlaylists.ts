import { CACHE_DURATION } from "@/constants/cache";
import { secureFetch } from "../lib/secureFetch";
import { fetchImagenPresign } from "./fetchImagen";

let cachedPlaylists: Playlist[] | null = null;
let cacheTimestamp: number = 0;
interface PlaylistRaw {
  id: string;
  nombre: string;
  link: string;
  imagen: {
    url: string;
    alt: string;
  };
}
export type Playlist = {
  id: string;
  nombre: string;
  link: string;
  imagen: {
    url: string;
    alt: string;
  };
};

export async function fetchPlaylists(): Promise<Playlist[]> {
  const now = Date.now();

  if (cachedPlaylists && now - cacheTimestamp < CACHE_DURATION) {
    return cachedPlaylists;
  }

  const { docs } = await secureFetch<{ docs: PlaylistRaw[] }>("playlists");
  if (!docs) throw new Error("Error fetching playlists");

  cachedPlaylists = await Promise.all(
    docs.map(async (item) => {
      return {
        id: item.id,
        nombre: item.nombre,
        link: item.link,
        imagen: {
          url: (await fetchImagenPresign(item.imagen.url)) || "",
          alt: item.imagen.alt || "",
        },
      };
    })
  );
  cacheTimestamp = now;
  return cachedPlaylists;
}
