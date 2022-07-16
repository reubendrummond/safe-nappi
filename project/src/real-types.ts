import {NextApiRequest, NextApiResponse} from "next";

interface NextApiRequestWithData<Query extends string, Body> extends NextApiRequest {
    query: {
        [Key in Query]: string;
    };
    body: Body;
}

export type SafeNappiApiHandler<Response, Query extends string, Body = never> =
    (req: NextApiRequestWithData<Query, Body>, res: NextApiResponse<Response>) => unknown | Promise<unknown>;
