export const prerender = false;

import type { APIRoute } from "astro";

const BASE = import.meta.env.CMS_API_BASE;
const KEY = import.meta.env.CMS_API_KEY;

export const all: APIRoute = async ({ params, request }) => {
  const pathArray = Array.isArray(params.path)
    ? params.path
    : params.path
    ? [params.path]
    : [];
  const [slug, ...rest] = pathArray;
  const path = [slug, ...rest].join("/");
  const url = `${BASE}/${path}`;

  const init: RequestInit = {
    method: request.method,
    headers: {
      Authorization: `users API-Key ${KEY}`,
      "Content-Type": request.headers.get("content-type") ?? "application/json",
    },

    body: ["GET", "HEAD"].includes(request.method)
      ? undefined
      : await request.text(),
  };

  const res = await fetch(url, init);
  const txt = await res.text();
  const type = res.headers.get("content-type") ?? "text/plain";

  return new Response(txt, {
    status: res.status,
    headers: { "Content-Type": type },
  });
};
