import { NextApiHandler } from "next";

export type InferResponse<Response> = Response extends NextApiHandler<
  infer Response
>
  ? Response
  : never;
