import { secureFetch } from "@/lib/secureFetch";
import { fetchImagenPresign } from "./fetchImagen";

export async function fetchBlogs() {
  const { docs } = await secureFetch<{ docs: any[] }>("blogs");
  if (!docs) throw new Error("Error fetching blogs");

  return docs;
}
