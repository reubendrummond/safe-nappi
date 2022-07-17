import React, { useEffect, useState } from "react";
import { jsonFetch } from "safe-nappi";

async function doLeFetchificationOfLaDaeeeeeta() {
  const data = await jsonFetch("/api/users/sadf", {});
  return data;
}

const UnsafeUser = () => {
  const [userRes, setUserRes] = useState<Awaited<
    ReturnType<typeof doLeFetchificationOfLaDaeeeeeta>
  > | null>(null);

  useEffect(() => {
    doLeFetchificationOfLaDaeeeeeta().then((res) => setUserRes(res));
  }, []);

  return (
    <div>{userRes ? <pre>{JSON.stringify(userRes)}</pre> : "Loading..."}</div>
  );
};

export default UnsafeUser;
