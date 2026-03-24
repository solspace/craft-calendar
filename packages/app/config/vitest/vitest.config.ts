import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const configDir = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(configDir, "../..");

export default defineConfig({
  resolve: {
    alias: {
      "@cal": resolve(packageRoot, "src"),
      "@config": resolve(packageRoot, "config"),
      "@widgets": resolve(packageRoot, "src/standalone/widgets"),
      "@event-builder": resolve(packageRoot, "src/standalone/event-builder"),
    },
  },
  test: {
    root: packageRoot,
    include: ["src/**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["**/node_modules/**", "**/dist/**"],
  },
});
