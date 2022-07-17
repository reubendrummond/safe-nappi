"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if ((from && typeof from === "object") || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, {
          get: () => from[key],
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
        });
  }
  return to;
};
var __toCommonJS = (mod) =>
  __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  nappiPlugin: () => nappiPlugin,
});
module.exports = __toCommonJS(src_exports);

// src/plugin.ts
var import_path = require("path");
var import_fs = require("fs");

// package.json
var name = "safe-nappi";

// src/plugin.ts
function recursiveReaddir(base) {
  return (0, import_fs.readdirSync)(base).flatMap((path) => {
    const joined = import_path.posix.join(base, path);
    const stat = (0, import_fs.statSync)(joined);
    if (stat.isDirectory()) return recursiveReaddir(joined);
    else return joined;
  });
}
var defaultBaseDirs = ["src/pages/api", "pages/api"];
function getBaseDir() {
  const def = defaultBaseDirs.find((path) => (0, import_fs.existsSync)(path));
  if (def) return def;
  throw new Error(
    "Cannot find the API directory. Please specify it in the config."
  );
}
function safifyIdentifier(from) {
  return from.replace(/[^a-z0-9]+/gi, "_");
}
function getApiUrl(path) {
  const metadata = {
    hasDynamicRoutes: false,
    fullPathWithDynamic: "",
  };
  if (path.endsWith("/index"))
    path = path.substring(0, path.length - "/index".length);
  path = "/api/" + path;
  metadata.fullPathWithDynamic = path;
  path = path.replace(/\[[^\]]+]/g, () => {
    metadata.hasDynamicRoutes = true;
    return "${string}";
  });
  return {
    fullPath: path,
    metadata,
  };
}
function getApiPaths(path) {
  const { fullPath } = getApiUrl(path);
  return [fullPath];
}
function getResponseType(path) {
  const id = safifyIdentifier(path);
  return `typeof ${id} extends NextApiHandler<infer NextResponse>
  ? NextResponse
  : typeof ${id} extends SafeNappiApiHandler<infer SnResponse, string>
  ? SnResponse
  : never`;
}
function inferQueryParams(path) {
  const id = safifyIdentifier(path);
  return `typeof ${id} extends SafeNappiApiHandler<any, infer QueryParams>
  ? QueryParams
  : never`;
}
function nappiPlugin(baseConfig, config = {}) {
  const { baseDir = getBaseDir(), tsOut = "types/nappi.d.ts" } = config;
  const tsRelativeToApi = import_path.posix.relative(
    import_path.posix.dirname(tsOut),
    baseDir
  );
  setInterval(() => {
    const files = recursiveReaddir(baseDir)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".tsx"))
      .map((file) => import_path.posix.relative(baseDir + "/", file))
      .map((file) => file.replace(/\..+$/, ""));
    const sourceFile = [
      'import { NextApiHandler } from "next";',
      ...files.map(
        (path) =>
          `import type {default as ${safifyIdentifier(
            path
          )}} from "${import_path.posix.join(tsRelativeToApi, path)}";`
      ),
      `import {SafeNappiApiHandler} from "${name}/dist/real-types";`,
      `declare module "${name}" {`,
      `export * from "${name}/dist/real-types";`,
      ...files.flatMap((path) =>
        getApiPaths(path).map(
          (apiPath) =>
            `export function jsonFetch(path: \`${apiPath}\`, query?: (${inferQueryParams(
              path
            )}) extends never ? undefined : {[Key in ${inferQueryParams(
              path
            )}]?: string}): Promise<${getResponseType(path)}>;`
        )
      ),
      "export type ApiResponse<Path extends ",
      files
        .flatMap((path) => getApiPaths(path).map((apiPath) => `\`${apiPath}\``))
        .join(" | "),
      "> =",
      ...files.flatMap((path) =>
        getApiPaths(path).map(
          (apiPath) =>
            `Path extends \`${apiPath}\` ? ${getResponseType(path)} :`
        )
      ),
      "never",
      "}",
    ].join("\n");
    (0, import_fs.mkdirSync)(import_path.posix.dirname(tsOut), {
      recursive: true,
    });
    (0, import_fs.writeFileSync)(tsOut, sourceFile);
  }, 2e3);
  return baseConfig;
}
// Annotate the CommonJS export names for ESM import in node:
0 &&
  (module.exports = {
    nappiPlugin,
  });
//# sourceMappingURL=index.js.map
