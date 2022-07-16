import React, {useEffect, useState} from "react";
import { UnsafeUserRes } from "./api/unsafeUser";
import {jsonFetch, ApiResponse} from "safe-nappi";

async function fetch() {
    return await jsonFetch("/api/users/somethingElse");
}

const UnsafeUser = () => {
  const [userRes, setUserRes] = useState<Awaited<ReturnType<typeof fetch>> | null>(null);

  useEffect(() => {
      fetch().then(res => setUserRes(res));
  }, []);

  return (
    <div>{userRes ? <pre>{JSON.stringify(userRes)}</pre> : "Loading..."}</div>
  );
};

export default UnsafeUser;
