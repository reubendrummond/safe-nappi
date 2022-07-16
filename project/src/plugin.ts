import {existsSync, mkdirSync, readdirSync, statSync, writeFileSync} from "fs";
import {posix} from "path";
import {NextConfig} from "next";
import {name} from "../package.json";

function recursiveReaddir(base: string): string[] {
    return readdirSync(base).flatMap(path => {
        const joined = posix.join(base, path);
        const stat = statSync(joined);
        if (stat.isDirectory()) return recursiveReaddir(joined);
        else return joined;
    });
}

const defaultBaseDirs = ["src/pages/api", "pages/api"];

function getBaseDir() {
    const def = defaultBaseDirs.find(path => existsSync(path));
    if (def) return def;
    throw new Error("Cannot find the API directory. Please specify it in the config.");
}

function safifyIdentifier(from: string) {
    return from.replace(/[^a-z0-9]+/gi, "_");
}

export interface NappiPluginConfig {
    baseDir?: string;
    tsOut?: string;
}

function getApiUrl(path: string) {
    const metadata = {
        hasDynamicRoutes: false,
        fullPathWithDynamic: ""
    };

    if (path.endsWith("/index")) path = path.substring(0, path.length - "/index".length);

    path = "/api/" + path;

    metadata.fullPathWithDynamic = path;

    path = path.replace(/\[[^\]]+]/g, () => {
        metadata.hasDynamicRoutes = true;
        return "${string}";
    });

    return {
        fullPath: path,
        metadata
    };
}

function getApiMap(path: string) {
    const {fullPath, metadata} = getApiUrl(path);

    const type = `InferResponse<typeof ${safifyIdentifier(path)}>`;

    if (metadata.hasDynamicRoutes) {
        return [
            `[_: \`${fullPath}\`]: ${type}`,
            `["${metadata.fullPathWithDynamic}"]: never`
        ];
    } else {
        return `[\`${fullPath}\`]: ${type}`;
    }
}

export function nappiPlugin(baseConfig: NextConfig, config: NappiPluginConfig = {}): NextConfig {
    const {baseDir = getBaseDir(), tsOut = "types/nappi.d.ts"} = config;

    const tsRelativeToApi = posix.relative(posix.dirname(tsOut), baseDir);

    const files = recursiveReaddir(baseDir)
        .filter(file => file.endsWith(".ts") || file.endsWith(".tsx"))
        .map(file => posix.relative(baseDir + "/", file))
        .map(file => file.replace(/\..+$/, ""));

    const sourceFile = [
        `declare module "${name}" {`,
        "import { NextApiHandler } from \"next\";",
        ...files.map(path => `import type {default as ${safifyIdentifier(path)}} from "${posix.join(tsRelativeToApi, path)}";`),
        "export type InferResponse<Handler> = Handler extends NextApiHandler<infer Response> ? Response : never;",
        "type SafeNappiMapping = {",
        ...files.flatMap(path => getApiMap(path)).map(line => line + ";"),
        "}",
        "export function jsonFetch<Path extends keyof SafeNappiMapping>(path: Path): Promise<SafeNappiMapping[Path]>;",
        "}"
    ].join("\n");

    mkdirSync(posix.dirname(tsOut), {recursive: true});
    writeFileSync(tsOut, sourceFile);

    return baseConfig;
}
