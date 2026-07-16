import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const workspaceRoot = path.resolve(__dirname, "../..");

const certificateDirectory = path.resolve(__dirname, "./config/certs");
const hasServerCertificate = (() => {
  return (
    existsSync(path.join(certificateDirectory, "key.pem")) &&
    existsSync(path.join(certificateDirectory, "cert.pem"))
  );
})();

const serverCertificate = hasServerCertificate
  ? {
      key: readFileSync(path.join(certificateDirectory, "key.pem")),
      cert: readFileSync(path.join(certificateDirectory, "cert.pem")),
    }
  : undefined;

export default defineConfig(({ command, mode }) => {
  const env = {
    ...loadEnv(mode, workspaceRoot, ""),
    ...loadEnv(mode, __dirname, ""),
  };
  const host = env.APP_HOST || "127.0.0.1";
  const port = env.APP_PORT ? Number.parseInt(env.APP_PORT, 10) : 8080;
  const isProduction = mode === "production";
  const shouldGenerateSourceMaps = command === "build" && !isProduction;

  return {
    appType: "custom",
    base: command === "serve" ? "/" : "./",
    define: {
      "process.env.DEBUG_MODE": JSON.stringify(!isProduction),
      "process.env.NODE_ENV": JSON.stringify(isProduction ? "production" : "development"),
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@cal": path.resolve(__dirname, "./src"),
        "@config": path.resolve(__dirname, "./config"),
        "@event-builder": path.resolve(__dirname, "./src/standalone/event-builder"),
        "@widgets": path.resolve(__dirname, "./src/standalone/widgets"),
      },
    },
    server: {
      allowedHosts: true,
      cors: true,
      hmr: true,
      host,
      https: serverCertificate,
      port,
      strictPort: true,
    },
    build: {
      emptyOutDir: true,
      manifest: "manifest.json",
      outDir: path.resolve(__dirname, "../plugin/src/Resources/js/app"),
      sourcemap: shouldGenerateSourceMaps,
      target: "es2020",
      rollupOptions: {
        input: {
          overview: path.resolve(__dirname, "./src/index.tsx"),
          "event-builder": path.resolve(__dirname, "./src/standalone/event-builder/index.tsx"),
          "widget-agenda": path.resolve(__dirname, "./src/standalone/widgets/agenda/index.tsx"),
          "widget-event": path.resolve(__dirname, "./src/standalone/widgets/event/index.tsx"),
          "widget-mini": path.resolve(__dirname, "./src/standalone/widgets/mini/index.tsx"),
        },
      },
    },
  };
});
