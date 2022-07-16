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

function getApiPaths(path: string) {
    const {fullPath, metadata} = getApiUrl(path);

    if (metadata.hasDynamicRoutes) {
        return [
            fullPath
        ];
    } else {
        return [
            fullPath
        ];
    }
}

export function nappiPlugin(baseConfig: NextConfig, config: NappiPluginConfig = {}): NextConfig {
    const {baseDir = getBaseDir(), tsOut = "types/nappi.d.ts"} = config;

    const tsRelativeToApi = posix.relative(posix.dirname(tsOut), baseDir);

    setInterval(() => {
        const files = recursiveReaddir(baseDir)
            .filter(file => file.endsWith(".ts") || file.endsWith(".tsx"))
            .map(file => posix.relative(baseDir + "/", file))
            .map(file => file.replace(/\..+$/, ""));

        const sourceFile = [
            "import { NextApiHandler } from \"next\";",
            ...files.map(path => `import type {default as ${safifyIdentifier(path)}} from "${posix.join(tsRelativeToApi, path)}";`),
            `declare module "${name}" {`,
            ...files.flatMap(path => getApiPaths(path).map(apiPath =>
                `export function jsonFetch(path: \`${apiPath}\`): Promise<typeof ${safifyIdentifier(path)} extends NextApiHandler<infer Response> ? Response : never>;`
            )),
            "export type ApiResponse<Path extends ",
            files.flatMap(path => getApiPaths(path).map(apiPath => `\`${apiPath}\``)).join(" | "),
            "> =",
            ...files.flatMap(path => getApiPaths(path).map(apiPath => `Path extends \`${apiPath}\` ? typeof ${safifyIdentifier(path)} extends NextApiHandler<infer Response> ? Response : never :`)),
            "never",
            "}"
        ].join("\n");

        mkdirSync(posix.dirname(tsOut), {recursive: true});
        writeFileSync(tsOut, sourceFile);
    }, 2000);

    return baseConfig;
}


