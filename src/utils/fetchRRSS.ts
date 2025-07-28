import { BRAVA_ID } from "@/constants/rrss";

type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM" | "REEL";

export interface InstagramPost {
  id: string;
  caption: string;
  media_type: InstagramMediaType;
  media_url: string;
  permalink: string;
  timestamp: string;
  like_count: number;
  comments_count: number;
}

export type InstagramResponse = InstagramPost[];

export async function fetchRRSS(): Promise<InstagramResponse> {
  if (import.meta.env.SSR) {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${BRAVA_ID}/media?fields=user_id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.META_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Instagram data");
    }

    const bravaData = await response.json();
    return bravaData.data;
  }

  const response = await fetch("/api/rrss/instagram");
  if (!response.ok) {
    throw new Error("Failed to fetch Instagram data");
  }

  const bravaData = await response.json();
  return bravaData.data;
}
