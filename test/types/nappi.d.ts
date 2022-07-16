declare module "safe-nappi" {
import { NextApiHandler } from "next";
import type {default as unsafeUser} from "../pages/api/unsafeUser";
import type {default as users_index} from "../pages/api/users/index";
import type {default as users_id_index} from "../pages/api/users/[id]/index";
export type InferResponse<Handler> = Handler extends NextApiHandler<infer Response> ? Response : never;
type SafeNappiMapping = {
[`/api/unsafeUser`]: InferResponse<typeof unsafeUser>;
[`/api/users`]: InferResponse<typeof users_index>;
[_: `/api/users/${string}`]: InferResponse<typeof users_id_index>;
["/api/users/[id]"]: never;
}
export function jsonFetch<Path extends keyof SafeNappiMapping>(path: Path): Promise<SafeNappiMapping[Path]>;
}