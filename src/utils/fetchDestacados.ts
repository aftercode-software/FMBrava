import { secureFetch } from "../lib/secureFetch";
import { fetchImagenPresign } from "./fetchImagen";

interface DestacadoRaw {
  id: string;
  title: string;
  link: string;
  image: {
    url: string;
    alt: string;
  };
}
export type Destacado = {
  id: string;
  title: string;
  link: string;
  image: {
    url: string;
    alt: string;
  };
};

export async function fetchDestacados(): Promise<Destacado[]> {
  const { docs } = await secureFetch<{ docs: DestacadoRaw[] }>("destacadas");
  if (!docs) throw new Error("Error fetching destacados");

  return Promise.all(
    docs.map(async (item) => {
      const presignedUrl = await fetchImagenPresign(item.image.url);
      return {
        id: item.id,
        title: item.title,
        link: item.link,
        image: {
          url: presignedUrl,
          alt: item.image.alt || "",
        },
      };
    })
  );
}
