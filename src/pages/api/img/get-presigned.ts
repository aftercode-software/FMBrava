import { fetchImagenPresign } from "@/utils/fetchImagen";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return new Response(
        JSON.stringify({ errors: [{ message: "URL parameter is required." }] }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const location = await fetchImagenPresign(url);

    return new Response(JSON.stringify({ url: location }));
  } catch (error) {
    console.error("Error fetching presigned URL:", error);
    return new Response(
      JSON.stringify({ errors: [{ message: "Something went wrong." }] }),
      { status: 500 }
    );
  }
};
