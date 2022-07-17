import React, { useEffect, useState } from "react";
import { useFetch } from "~/lib/hooks/useFetch";

const UnsafeUser = () => {
  const usersRes = useFetch("/api/users/123");

  return (
    <div>{usersRes ? <pre>{JSON.stringify(usersRes)}</pre> : "Loading..."}</div>
  );
};

export default UnsafeUser;
