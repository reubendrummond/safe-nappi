import { NextApiHandler } from "next";
import type {default as unsafeUser} from "../pages/api/unsafeUser";
import type {default as users_index} from "../pages/api/users/index";
import type {default as users_id_index} from "../pages/api/users/[id]/index";
declare module "safe-nappi" {
export function jsonFetch(path: `/api/unsafeUser`): Promise<typeof unsafeUser extends NextApiHandler<infer Response> ? Response : never>;
export function jsonFetch(path: `/api/users`): Promise<typeof users_index extends NextApiHandler<infer Response> ? Response : never>;
export function jsonFetch(path: `/api/users/${string}`): Promise<typeof users_id_index extends NextApiHandler<infer Response> ? Response : never>;
}