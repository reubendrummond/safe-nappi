import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export type RouteResult<Response> = NextApiHandler & {
  SOMETHING_FAKE: Response & never;
};

export function route<Response>(
  handler: NextApiHandler
): RouteResult<Response> {
  return handler as RouteResult<Response>;
}

const fooroute = route<{ bar: 7 }>(() => {});

type FooRouteResponse = typeof fooroute extends RouteResult<infer Response>
  ? Response
  : never;

const nativeHandler: NextApiHandler<{ bar: 7 }> = (req, res) => {};

// const nativeHandler = (req: NextApiRequest, res: NextApiResponse<"woo">) => {

// }

// type NativeHandlerResult = typeof nativeHandler extends NextApiHandler<infer Response> ?  Response : never;
type GetHandlerResult<Response> = Response extends NextApiHandler<
  infer Response
>
  ? Response
  : never;

type R = GetHandlerResult<typeof nativeHandler>;
