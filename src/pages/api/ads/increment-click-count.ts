import { incrementClicks } from "@/utils/fetchAnuncios";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const { id } = await request.json();
  console.log("Incrementing click count for ad ID:", id);
  await incrementClicks(id);
  return new Response(null, { status: 204 });
};
