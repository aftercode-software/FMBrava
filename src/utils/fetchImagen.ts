import { secureFetchRaw } from "../lib/secureFetch";

export async function fetchImagenPresign(path: string): Promise<string> {
  const res = await secureFetchRaw(path, {
    method: "GET",
    initOverrides: { redirect: "manual" },
  });

  if (res.status === 302) {
    const location = res.headers.get("location");
    if (!location) {
      throw new Error("fetchImagenPresign: no Location header");
    }
    return location;
  }

  throw new Error(
    `fetchImagenPresign: expected 302, got ${res.status} ${res.statusText}`
  );
}
