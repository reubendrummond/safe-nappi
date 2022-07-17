import { Options } from "tsup";

export const tsup: Options = {
  sourcemap: true,
  dts: false,
  clean: true,
  entryPoints: ["src/index.ts", "src/real-types.ts", "src/plugin.ts"],
  format: ["cjs"],
};
