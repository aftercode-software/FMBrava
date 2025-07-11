import { secureFetch } from "../lib/secureFetch";
import { fetchImagenPresign } from "./fetchImagen";

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
  const { docs } = await secureFetch<{ docs: AgendaRaw[] }>("agenda");
  if (!docs) throw new Error("Error fetching agenda");

  const filteredDocs = docs.filter((item) => new Date(item.dia) > new Date());

  return Promise.all(
    filteredDocs.map(async (item) => {
      const presignedUrl = await fetchImagenPresign(item.foto.url);
      return {
        id: item.id,
        nombre: item.name,
        descripcion: item.descripcion,
        dia: item.dia,
        link: item.link,
        imagen: {
          url: presignedUrl,
          alt: item.foto.alt || "",
        },
      };
    })
  );
}
