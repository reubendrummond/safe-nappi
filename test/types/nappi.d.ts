import { NextApiHandler } from "next";
import type {default as unsafeUser} from "../pages/api/unsafeUser";
import type {default as users_id_index} from "../pages/api/users/[id]/index";
import type {default as users_index} from "../pages/api/users/index";
import {SafeNappiApiHandler} from "safe-nappi/dist/real-types";
declare module "safe-nappi" {
export * from "safe-nappi/dist/real-types";
export function jsonFetch(path: `/api/unsafeUser`, query?: (typeof unsafeUser extends SafeNappiApiHandler<any, infer QueryParams>
  ? QueryParams
  : never) extends never ? undefined : {[Key in typeof unsafeUser extends SafeNappiApiHandler<any, infer QueryParams>
  ? QueryParams
  : never]?: string}): Promise<typeof unsafeUser extends NextApiHandler<infer NextResponse>
  ? NextResponse
  : typeof unsafeUser extends SafeNappiApiHandler<infer SnResponse, string>
  ? SnResponse
  : never>;
export function jsonFetch(path: `/api/users/${string}`, query?: (typeof users_id_index extends SafeNappiApiHandler<any, infer QueryParams>
  ? QueryParams
  : never) extends never ? undefined : {[Key in typeof users_id_index extends SafeNappiApiHandler<any, infer QueryParams>
  ? QueryParams
  : never]?: string}): Promise<typeof users_id_index extends NextApiHandler<infer NextResponse>
  ? NextResponse
  : typeof users_id_index extends SafeNappiApiHandler<infer SnResponse, string>
  ? SnResponse
  : never>;
export function jsonFetch(path: `/api/users`, query?: (typeof users_index extends SafeNappiApiHandler<any, infer QueryParams>
  ? QueryParams
  : never) extends never ? undefined : {[Key in typeof users_index extends SafeNappiApiHandler<any, infer QueryParams>
  ? QueryParams
  : never]?: string}): Promise<typeof users_index extends NextApiHandler<infer NextResponse>
  ? NextResponse
  : typeof users_index extends SafeNappiApiHandler<infer SnResponse, string>
  ? SnResponse
  : never>;
export type ApiResponse<Path extends 
`/api/unsafeUser` | `/api/users/${string}` | `/api/users`
> =
Path extends `/api/unsafeUser` ? typeof unsafeUser extends NextApiHandler<infer NextResponse>
  ? NextResponse
  : typeof unsafeUser extends SafeNappiApiHandler<infer SnResponse, string>
  ? SnResponse
  : never :
Path extends `/api/users/${string}` ? typeof users_id_index extends NextApiHandler<infer NextResponse>
  ? NextResponse
  : typeof users_id_index extends SafeNappiApiHandler<infer SnResponse, string>
  ? SnResponse
  : never :
Path extends `/api/users` ? typeof users_index extends NextApiHandler<infer NextResponse>
  ? NextResponse
  : typeof users_index extends SafeNappiApiHandler<infer SnResponse, string>
  ? SnResponse
  : never :
never;
export type ApiMap = {
[Key in 
`/api/unsafeUser` | `/api/users` | `/api/users/${string}`
]: ApiResponse<Key>
}
}