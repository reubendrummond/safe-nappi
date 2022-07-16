import React, { useEffect, useState } from "react";
import { UnsafeUserRes } from "./api/unsafeUser";

const UnsafeUser = () => {
  const [userRes, setUserRes] = useState<UnsafeUserRes | null>(null);

  useEffect(() => {
    fetch("/api/unsafeUser")
      .then((res) => res.json())
      .then(async (data) => {
        await new Promise((res) => setTimeout(res, 2000));
        setUserRes(data);
      });
  });

  return (
    <div>{userRes ? <pre>{JSON.stringify(userRes)}</pre> : "Loading..."}</div>
  );
};

export default UnsafeUser;
