import {existsSync, readdirSync, statSync} from "fs";
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
}

export function nappiPlugin(baseConfig: NextConfig, config: NappiPluginConfig = {}): NextConfig {
    const {baseDir = getBaseDir()} = config;

    const files = recursiveReaddir(baseDir)
        .filter(file => file.endsWith(".ts") || file.endsWith(".tsx"))
        .map(file => file.replace(/\..+$/, ""));

    const sourceFile = [
        `import {InferResponse} from "${name}"`,
        ...files.map(path => `import ${safifyIdentifier(path)} from "${path}";`),
        "type SafeNappiMapping = {",
        ...files.map(path => `  ["${path}"]: InferResponse<${safifyIdentifier(path)}>`),
        "}"
    ].join("\n");

    return baseConfig;
}
