import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

interface StandardResponse<T extends {}> {
  success: boolean;
  data: T;
}

const nativeHandler: NextApiHandler<StandardResponse<{}>> = (req, res) => {};

export type GetHandlerResult<Response> = Response extends NextApiHandler<
  infer Response
>
  ? Response
  : never;

type R = GetHandlerResult<typeof nativeHandler>;
