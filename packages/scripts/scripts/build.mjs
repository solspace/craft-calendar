import { readdirSync } from "node:fs";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PACKAGE_ROOT = resolve(__dirname, "..");
const SOURCE_DIR = resolve(PACKAGE_ROOT, "src");
const OUTPUT_DIR = resolve(PACKAGE_ROOT, "../plugin/src/Resources/js/scripts");
const ENTRY_EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx"]);

const args = process.argv.slice(2);
const isWatchMode = args.includes("--watch");
const modeFlagIndex = args.indexOf("--mode");
const mode =
  modeFlagIndex >= 0 && args[modeFlagIndex + 1]
    ? args[modeFlagIndex + 1]
    : process.env.NODE_ENV || "development";
const isProduction = mode === "production";

const walkFiles = (dir) => {
  const files = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const absolutePath = resolve(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkFiles(absolutePath));
      continue;
    }

    files.push(absolutePath);
  }

  return files;
};

const toEntryName = (absolutePath) => {
  const relativePath = relative(SOURCE_DIR, absolutePath).replaceAll("\\", "/");
  const extension = extname(relativePath);

  return relativePath.slice(0, -extension.length);
};

const toGlobalName = (entryName) =>
  `CalendarScripts_${entryName.replaceAll(/[^a-zA-Z0-9_$]/g, "_")}`;

const entryFiles = walkFiles(SOURCE_DIR)
  .filter((path) => ENTRY_EXTENSIONS.has(extname(path)))
  .map((path) => ({
    absolutePath: path,
    entryName: toEntryName(path),
  }));

if (!entryFiles.length) {
  console.log(`No source files found in ${SOURCE_DIR}`);
  process.exit(0);
}

console.log(
  `Building ${entryFiles.length} script entries in ${mode}${isWatchMode ? " watch mode" : ""}`,
);

const watchers = [];

for (const entry of entryFiles) {
  const result = await build({
    configFile: false,
    publicDir: false,
    root: PACKAGE_ROOT,
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    resolve: {
      alias: {
        "@cal/scripts": SOURCE_DIR,
      },
    },
    build: {
      target: "es2015",
      outDir: OUTPUT_DIR,
      emptyOutDir: false,
      copyPublicDir: false,
      sourcemap: false,
      minify: isProduction ? "esbuild" : false,
      reportCompressedSize: false,
      lib: {
        entry: entry.absolutePath,
        formats: ["iife"],
        name: toGlobalName(entry.entryName),
        fileName: () => `${entry.entryName}.js`,
      },
      rollupOptions: {
        output: {
          inlineDynamicImports: true,
        },
      },
      watch: isWatchMode ? {} : undefined,
    },
  });

  if (isWatchMode) {
    watchers.push(result);
  }
}

if (isWatchMode) {
  console.log("Watching for changes...");

  process.on("SIGINT", () => {
    for (const watcher of watchers) {
      if (watcher && typeof watcher.close === "function") {
        watcher.close();
      }
    }
    process.exit(0);
  });
}
