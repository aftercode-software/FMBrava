import { CACHE_DURATION } from "@/constants/cache";
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

let cachedProgramas: Programa[] | null = null;
let cacheTimestamp: number = 0;

export async function fetchProgramas(): Promise<Programa[]> {
  const now = Date.now();

  if (cachedProgramas && now - cacheTimestamp < CACHE_DURATION) {
    return cachedProgramas;
  }

  const { docs } = await secureFetch<{ docs: ProgramaRaw[] }>("programacion");
  if (!docs) throw new Error("Error fetching programas from API");

  const filtered = docs.filter((item) => new Date(item.fechaFin) > new Date());

  const programas = await Promise.all(
    filtered.map(async (item) => {
      return {
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion,
        horarioInicio: item.horarioInicio,
        horarioFin: item.horarioFin,
        diasSemana: item.diasSemana,
        fechaInicio: item.fechaInicio,
        fechaFin: item.fechaFin,
        participantes: item.participantes,
        imagen: {
          url: item.imagenPrincipal?.url
            ? await fetchImagenPresign(item.imagenPrincipal.url)
            : "",
          alt: item.imagenPrincipal?.alt || "",
        },
      };
    })
  );

  cachedProgramas = programas.sort((a, b) =>
    a.horarioInicio.localeCompare(b.horarioInicio)
  );
  cacheTimestamp = now;

  return programas.sort((a, b) =>
    a.horarioInicio.localeCompare(b.horarioInicio)
  );
}
