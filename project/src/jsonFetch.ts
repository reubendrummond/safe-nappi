interface SampleApiPathMap {
  "/api/user": { data: { user: { id: number; name: string } } };
  [key: `/api/some/${number}/dynamic`]: { dynamic: boolean };
}

export const jsonFetch = async <T extends keyof SampleApiPathMap>(
  path: T
): Promise<SampleApiPathMap[T]> => {
  const res = await fetch(path);
  const data = await res.json();
  return data as SampleApiPathMap[T];
};
