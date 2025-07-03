import { secureFetch } from "../lib/secureFetch";
import { fetchImagenPresign } from "./fetchImagen";

export type Programa = {
  id: string;
  nombre: string;
  descripcion: string;
  horarioInicio: string;
  horarioFin: string;
  diasSemana: string[];
  fechaInicio: string;
  fechaFin: string;
  participantes: { id: string; nombre: string }[];
  imagen: { url: string; alt: string };
};

interface ProgramaRaw {
  id: string;
  nombre: string;
  descripcion: string;
  diasSemana: string[];
  fechaInicio: string;
  fechaFin: string;
  horarioInicio: string;
  horarioFin: string;
  participantes: { id: string; nombre: string }[];
  imagenPrincipal: { url: string; alt: string };
}

export async function fetchProgramas(): Promise<Programa[]> {
  const { docs } = await secureFetch<{ docs: ProgramaRaw[] }>("programacion");
  if (!docs) throw new Error("Error fetching programas");

  return Promise.all(
    docs.map(async (item) => {
      const presignedUrl = await fetchImagenPresign(item.imagenPrincipal.url);
      return {
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion,
        horarioInicio: item.horarioInicio,
        horarioFin: item.horarioFin,
        diasSemana: item.diasSemana,
        fechaInicio: item.fechaInicio,
        fechaFin: item.fechaFin,
        participantes: item.participantes.map((p) => ({
          id: p.id,
          nombre: p.nombre,
        })),
        imagen: {
          url: presignedUrl,
          alt: item.imagenPrincipal.alt || "",
        },
      };
    })
  );
}
