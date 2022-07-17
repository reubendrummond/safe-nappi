import { NextApiHandler } from "next";
import type {default as unsafeUser} from "../pages/api/unsafeUser";
import type {default as users_index} from "../pages/api/users/index";
import type {default as users_id_index} from "../pages/api/users/[id]/index";
import {SafeNappiApiHandler} from "safe-nappi/real-types";
declare module "safe-nappi" {
export * from "safe-nappi/real-types";
export function jsonFetch(path: `/api/unsafeUser`, options?: JsonFetchOptions<typeof unsafeUser extends SafeNappiApiHandler<any, infer QueryParams>
  ? QueryParams
  : never, typeof unsafeUser extends SafeNappiApiHandler<any, string, infer Body> ? Body : unknown>): Promise<typeof unsafeUser extends NextApiHandler<infer NextResponse>
  ? NextResponse
  : typeof unsafeUser extends SafeNappiApiHandler<infer SnResponse, string>
  ? SnResponse
  : never>;
export function jsonFetch(path: `/api/users`, options?: JsonFetchOptions<typeof users_index extends SafeNappiApiHandler<any, infer QueryParams>
  ? QueryParams
  : never, typeof users_index extends SafeNappiApiHandler<any, string, infer Body> ? Body : unknown>): Promise<typeof users_index extends NextApiHandler<infer NextResponse>
  ? NextResponse
  : typeof users_index extends SafeNappiApiHandler<infer SnResponse, string>
  ? SnResponse
  : never>;
export function jsonFetch(path: `/api/users/${string}`, options?: JsonFetchOptions<typeof users_id_index extends SafeNappiApiHandler<any, infer QueryParams>
  ? QueryParams
  : never, typeof users_id_index extends SafeNappiApiHandler<any, string, infer Body> ? Body : unknown>): Promise<typeof users_id_index extends NextApiHandler<infer NextResponse>
  ? NextResponse
  : typeof users_id_index extends SafeNappiApiHandler<infer SnResponse, string>
  ? SnResponse
  : never>;
export type ApiResponse<Path extends 
`/api/unsafeUser` | `/api/users` | `/api/users/${string}`
> =
Path extends `/api/unsafeUser` ? typeof unsafeUser extends NextApiHandler<infer NextResponse>
  ? NextResponse
  : typeof unsafeUser extends SafeNappiApiHandler<infer SnResponse, string>
  ? SnResponse
  : never :
Path extends `/api/users` ? typeof users_index extends NextApiHandler<infer NextResponse>
  ? NextResponse
  : typeof users_index extends SafeNappiApiHandler<infer SnResponse, string>
  ? SnResponse
  : never :
Path extends `/api/users/${string}` ? typeof users_id_index extends NextApiHandler<infer NextResponse>
  ? NextResponse
  : typeof users_id_index extends SafeNappiApiHandler<infer SnResponse, string>
  ? SnResponse
  : never :
never;
export type ApiMap = {
[Key in 
`/api/unsafeUser` | `/api/users` | `/api/users/${string}`
]: ApiResponse<Key>
}
}