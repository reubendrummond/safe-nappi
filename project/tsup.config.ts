import { Options } from "tsup";

export const tsup: Options = {
  sourcemap: true,
  dts: true,
  clean: true,
  entryPoints: ["src/index.ts", "src/real-types.ts", "src/internal-types.ts", "src/plugin.ts"],
  format: ["cjs"],
};
