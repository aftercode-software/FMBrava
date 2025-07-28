const BRAVA_ID = "17841400957296979";
const FM_ID = "17841400207200583";

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
  const bravaResponse = await fetch(
    `https://graph.facebook.com/v19.0/${BRAVA_ID}/media?fields=user_id,caption,media_type,media_url,permalink,timestamp,like_count,comments_count&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.FACEBOOK_TOKEN}`,
      },
    }
  );

  const bravaData = await bravaResponse.json();

  return bravaData.data;
}
