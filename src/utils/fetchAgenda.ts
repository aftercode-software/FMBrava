import { CACHE_DURATION } from "@/constants/cache";
import { secureFetch } from "../lib/secureFetch";

let cachedAgendas: Agenda[] | null = null;
let cacheTimestamp: number = 0;

interface AgendaRaw {
  id: string;
  name: string;
  dia: string;
  descripcion: string;
  foto: {
    url: string;
    alt: string;
  };
  link: string;
}

export type Agenda = {
  id: string;
  nombre: string;
  dia: string;
  descripcion: string;
  imagen: {
    url: string;
    alt: string;
  };
  link: string;
};

export async function fetchAgenda(): Promise<Agenda[]> {
  const now = Date.now();

  if (cachedAgendas && now - cacheTimestamp < CACHE_DURATION) {
    return cachedAgendas;
  }
  const { docs } = await secureFetch<{ docs: AgendaRaw[] }>("agenda");
  if (!docs) throw new Error("Error fetching agenda");

  const filteredDocs = docs
    .filter((item) => new Date(item.dia) > new Date())
    .sort((a, b) => new Date(a.dia).getTime() - new Date(b.dia).getTime());

  cachedAgendas = await Promise.all(
    filteredDocs.map(async (item) => {
      return {
        id: item.id,
        nombre: item.name,
        descripcion: item.descripcion,
        dia: item.dia,
        link: item.link,
        imagen: {
          url: import.meta.env.VITE_CMS_PUBLIC_URL + (item.foto?.url || ""),
          alt: item.foto.alt || "",
        },
      };
    })
  );
  cacheTimestamp = now;
  return cachedAgendas;
}
