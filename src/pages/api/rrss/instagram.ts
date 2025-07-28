import { BRAVA_ID } from "@/constants/rrss";
import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  try {
    const bravaResponse = await fetch(
      `https://graph.facebook.com/v19.0/${BRAVA_ID}/media?fields=user_id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.META_TOKEN}`,
        },
      }
    );

    if (!bravaResponse.ok) {
      throw new Error(`Instagram API error: ${bravaResponse.status}`);
    }

    const bravaData = await bravaResponse.json();

    return new Response(JSON.stringify(bravaData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching Instagram data:", error);
    return new Response(
      JSON.stringify({ errors: [{ message: "Something went wrong." }] }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
