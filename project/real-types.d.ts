import {NextApiRequest, NextApiResponse} from "next";

interface NextApiRequestWithData<Query extends string, Body> extends NextApiRequest {
    query: {
        [Key in Query]: string;
    };
    body: Body;
}

export type SafeNappiApiHandler<Response, Query extends string, Body = never> =
    (req: NextApiRequestWithData<Query, Body>, res: NextApiResponse<Response>) => unknown | Promise<unknown>;

export type JsonFetchOptions<Query extends string, Body> = (unknown extends Body ? {
    body?: Body;
    query?: {
        [Key in Query]?: string;
    };
} : Body extends never ? {
    query?: {
        [Key in Query]?: string;
    };
} : {
    body: Body;
    query?: {
        [Key in Query]?: string;
    };
}) & RequestInit;
