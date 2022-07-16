export const jsonFetch = async (path: string, query?: Record<string, string>): Promise<unknown> => {
  if (query) {
    const queryObj = new URLSearchParams(query);
    path += `?${queryObj.toString()}`;
  }

  const res = await fetch(path);
  return await res.json();
};
