export interface SecureFetchOptions {
  method?: string;
  body?: any;
  query?: Record<string, string | number>;
  initOverrides?: Omit<RequestInit, "method" | "body" | "headers">;
}

export async function secureFetch<T = any>(
  endpoint: string,
  { method = "GET", body, query }: SecureFetchOptions = {}
): Promise<T> {
  if (import.meta.env.SSR) {
    let url = `${import.meta.env.CMS_API_BASE}/${endpoint}`;
    if (query) {
      const qs = new URLSearchParams(
        Object.entries(query).map(([k, v]) => [k, String(v)])
      );
      url += `?${qs}`;
    }

    const res = await fetch(url, {
      method,
      headers: {
        "Cache-Control": "public, max-age=600, stale-while-revalidate=3600",
        Authorization: `users API-Key ${import.meta.env.CMS_API_KEY}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
    return res.json();
  }

  let url = `/api/proxy/${endpoint}`;
  if (query) {
    const qs = new URLSearchParams(
      Object.entries(query).map(([k, v]) => [k, String(v)])
    );
    url += `?${qs}`;
  }

  const init: RequestInit = { method, headers: {} };
  if (body != null) {
    init.headers = { "Content-Type": "application/json" };
    init.body = JSON.stringify(body);
  }

  const res = await fetch(url, init);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Proxy error ${res.status}: ${txt}`);
  }
  return res.json();
}

export async function secureFetchRaw(
  endpoint: string,
  { method = "GET", query, initOverrides }: SecureFetchOptions = {}
): Promise<Response> {
  let urlPath = endpoint;
  if (query) {
    const qs = new URLSearchParams(
      Object.entries(query).map(([k, v]) => [k, String(v)])
    );
    urlPath += `?${qs}`;
  }

  if (import.meta.env.SSR) {
    const url = `${import.meta.env.VITE_CMS_PUBLIC_URL}${urlPath}`;
    const res = await fetch(url, {
      method,
      headers: {
        "Cache-Control": "public, max-age=600, stale-while-revalidate=3600",
        Authorization: `users API-Key ${import.meta.env.CMS_API_KEY}`,
      },
      ...initOverrides,
    });
    return res;
  }

  const url = `/api/proxy/${urlPath}`;
  const res = await fetch(url, {
    method,
    ...initOverrides,
  });
  return res;
}
