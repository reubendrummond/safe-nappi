import React, { useState } from "react";
import { UnsafeUserRes } from "./api/unsafeUser";
import {jsonFetch} from "safe-nappi";

async function fetch() {
    const res = await jsonFetch("");
}

const UnsafeUser = () => {
  const [userRes, setUserRes] = useState<UnsafeUserRes | null>(null);

  return (
    <div>{userRes ? <pre>{JSON.stringify(userRes)}</pre> : "Loading..."}</div>
  );
};

export default UnsafeUser;
