type Cast<Type, To> = Type extends To ? Type : To;
type Split<T extends string> = T extends `${infer First}&${infer Rest}` ? [First, ...Split<Rest>] : [T];
type TrimEquals<T extends string[]> = T extends [infer First, ...infer Rest]
    ? First extends `${infer Name}=${string}`
        ? [Name, ...TrimEquals<Cast<Rest, string[]>>] : [First, ...TrimEquals<Cast<Rest, string[]>>]
    : [];
type ArrayToUnion<T extends unknown[]> = T extends [infer First, ...infer Rest]
    ? First | ArrayToUnion<Rest>
    : T extends [infer First] ? First : never;

export type QueryParamToKeys<T extends string> = ArrayToUnion<TrimEquals<Split<T>>>;
