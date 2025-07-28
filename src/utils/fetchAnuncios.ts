import { secureFetch } from "@/lib/secureFetch";
import { fetchImagenPresign } from "./fetchImagen";
import { CACHE_DURATION } from "@/constants/cache";

let cachedAnuncios: Anuncio[] | null = null;
let cacheTimestamp: number = 0;

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
  const now = Date.now();
  const today = new Date();

  if (cachedAnuncios && now - cacheTimestamp < CACHE_DURATION) {
    return cachedAnuncios;
  }

  const { docs } = await secureFetch<{ docs: AnuncioRaw[] }>("ads");
  if (!docs) throw new Error("Error fetching anuncios");

  const filteredDocs = docs.filter((item) => new Date(item.endDate) > today);

  cachedAnuncios = await Promise.all(
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
  cacheTimestamp = now;
  return cachedAnuncios;
}

export async function fetchAnunciosEntreSecciones(): Promise<Anuncio[]> {
  const anuncios = await fetchAnuncios();
  return anuncios.filter((ad) => ad.adType === "betweenSections");
}

export async function fetchAnunciosDentroBlog(): Promise<Anuncio[]> {
  const anuncios = await fetchAnuncios();
  return anuncios.filter((ad) => ad.adType === "insideBlog");
}

export async function incrementViews(adId: string): Promise<void> {
  await secureFetch(`/ads/increment-view-count`, {
    method: "POST",
    body: { id: adId },
  });
}

export async function incrementClicks(adId: string): Promise<void> {
  await secureFetch(`/ads/increment-click-count`, {
    method: "POST",
    body: { id: adId },
  });
}
