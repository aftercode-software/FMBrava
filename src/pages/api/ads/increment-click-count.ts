import { incrementClicks } from "@/utils/fetchAnuncios";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id } = await request.json();
    await incrementClicks(id);
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error incrementing click count:", error);
    return new Response(
      JSON.stringify({ errors: [{ message: "Something went wrong." }] }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
