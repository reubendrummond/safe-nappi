import { useEffect, useState } from "react";
import { jsonFetch } from "safe-nappi";

export const useFetch = <T extends Parameters<typeof jsonFetch>>(
  url: T[0],
  queryparms?: T[1] | undefined
) => {
  const [response, setResponse] = useState<null | Awaited<
    ReturnType<typeof jsonFetch>
  >>(null);

  useEffect(() => {
    jsonFetch(url, queryparms).then((res) => setResponse(res));
  }, [url, queryparms]);

  return response;
};
