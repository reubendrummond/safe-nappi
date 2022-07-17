import {JsonFetchOptions} from "./real-types";

export const jsonFetch = async (path: string, {query, body, ...init}: JsonFetchOptions<string, unknown>): Promise<unknown> => {
  if (query) {
    const queryObj = new URLSearchParams(query as Record<string, string>);
    path += `?${queryObj.toString()}`;
  }

  if (body && typeof body === "object" && (body as unknown as {__proto__: unknown}).__proto__ === Object.prototype) {
    body = JSON.stringify(body);
  }

  const res = await fetch(path, {
    ...init,
    body
  });

  return await res.json();
};
