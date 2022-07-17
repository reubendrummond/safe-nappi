import React, {useEffect, useState} from "react";
import {jsonFetch} from "safe-nappi";

async function doLeFetchificationOfLaDaeeeeeta() {
    const data = await jsonFetch("/api/users/fafe?ip=foo&foo=baz");


}

const UnsafeUser = () => {
  const [userRes, setUserRes] = useState<Awaited<ReturnType<typeof doLeFetchificationOfLaDaeeeeeta>> | null>(null);

  useEffect(() => {
      doLeFetchificationOfLaDaeeeeeta().then(res => setUserRes(res));
  }, []);

  return (
    <div>{userRes ? <pre>{JSON.stringify(userRes)}</pre> : "Loading..."}</div>
  );
};

Array.prototype.flat;

export default UnsafeUser;

type OptionalAssignment = `=${string}` | "";

type QueryUrlPart<Name extends string> = `${Name}${OptionalAssignment}`;
type QueryUrl<Source extends string, Identifiers extends string> = Source extends `${QueryUrlPart<Identifiers>}${infer Rest}`
    ? Rest extends `&${infer OtherParams}`
        ? QueryUrl<Rest, Identifiers>
        : `(error:1) ${Source}`
    : `(error:2) ${Source}`;

type Foo = QueryUrl<"foo&baz", "foo" | "baz">;

declare const bla: Foo;
