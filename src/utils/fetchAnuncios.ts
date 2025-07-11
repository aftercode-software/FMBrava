import { secureFetch } from "@/lib/secureFetch";
import { fetchImagenPresign } from "./fetchImagen";

interface AnuncioRaw {
  id: string;
  title: string;
  adType: string;
  startDate: string;
  endDate: string;
  link?: string;
  text: string;
  image: {
    url: string;
    alt: string;
  };
}
export type Anuncio = {
  id: string;
  title: string;
  adType: "betweenSections" | "insideBlog";
  startDate: Date;
  endDate: Date;
  link?: string;
  text: string;
  image: {
    url: string;
    alt: string;
  };
};

export async function fetchAnuncios(): Promise<Anuncio[]> {
  const { docs } = await secureFetch<{ docs: AnuncioRaw[] }>("ads");
  if (!docs) throw new Error("Error fetching anuncios");

  const now = new Date();

  const filteredDocs = docs.filter((item) => new Date(item.endDate) > now);

  return Promise.all(
    filteredDocs.map(async (item) => {
      const presignedUrl = await fetchImagenPresign(item.image.url);
      return {
        id: item.id,
        title: item.title,
        adType: item.adType as "betweenSections" | "insideBlog",
        startDate: new Date(item.startDate),
        endDate: new Date(item.endDate),
        link: item.link,
        text: item.text,
        image: {
          url: presignedUrl,
          alt: item.image.alt || "",
        },
      };
    })
  );
}

export async function fetchAnunciosEntreSecciones(): Promise<Anuncio[]> {
  const anuncios = await fetchAnuncios();
  return anuncios.filter((ad) => ad.adType === "betweenSections");
}

export async function fetchAnunciosDentroBlog(): Promise<Anuncio[]> {
  const anuncios = await fetchAnuncios();
  return anuncios.filter((ad) => ad.adType === "insideBlog");
}
