import { incrementViews } from "@/utils/fetchAnuncios";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { id } = await request.json();
  console.log("POSTTTTTTTTT:", id);
  await incrementViews(id);
  return new Response(null, { status: 204 });
};
