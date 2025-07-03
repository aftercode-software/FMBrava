import { secureFetch } from "../lib/secureFetch";
import { fetchImagenPresign } from "./fetchImagen";

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
  const { docs } = await secureFetch<{ docs: PlaylistRaw[] }>("playlists");
  if (!docs) throw new Error("Error fetching playlists");

  return Promise.all(
    docs.map(async (item) => {
      const presignedUrl = await fetchImagenPresign(item.imagen.url);
      return {
        id: item.id,
        nombre: item.nombre,
        link: item.link,
        imagen: {
          url: presignedUrl,
          alt: item.imagen.alt || "",
        },
      };
    })
  );
}
