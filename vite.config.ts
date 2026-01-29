import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

import { rmSync } from "node:fs";
import path from "node:path";

import { default as electron } from "vite-plugin-electron";
import { default as renderer } from "vite-plugin-electron-renderer";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const outDir = "build";
  const appOutDir = path.join(outDir, "app");
  const electronOutDir = path.join(outDir, "electron");

  const isServe = command === "serve";
  const isBuild = command === "build";
  const isPreview = mode === "production" && isServe;

  if (!isPreview) {
    rmSync(electronOutDir, { recursive: true, force: true });
  }

  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;

  Object.assign(process.env, loadEnv(mode, process.cwd()), { NODE_ENV: mode });

  // Only takes args after `--`
  const electronArgsIndex = process.argv.indexOf("--");
  const electronArgs = electronArgsIndex >= 0 ? process.argv.slice(electronArgsIndex + 1) : [];
  const argv = [".", "--no-sandbox"].concat(electronArgs);

  return {
    server: {
      port: 3678,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    // 			api: 'modern-compiler',
    // 			importers: [new NodePackageImporter()],
    //     }
    //   }
    // },
    build: {
      outDir: appOutDir,
      emptyOutDir: true,
    },
    plugins: [
      vue({ isProduction: isBuild }),
      vueDevTools({ componentInspector: { vue: 3, launchEditor: "webstorm" }, launchEditor: "webstorm" }),
      electron([
        {
          entry: "electron/main.ts",
          onstart(options) {
            process.env.VSCODE_DEBUG ? console.log(/* For `.vscode/.debug.script.mjs` */ "[startup] Electron App") : options.startup(argv);
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: electronOutDir,
              rollupOptions: {
                external: ["electron"],
                //external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
        {
          entry: "electron/preload.ts",
          onstart(options) {
            // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete,
            // instead of restarting the entire Electron App.
            options.reload();
          },
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : undefined, // #332
              minify: isBuild,
              outDir: electronOutDir,
              rollupOptions: {
                external: ["electron"],
                // external: Object.keys('dependencies' in pkg ? pkg.dependencies : {}),
              },
            },
          },
        },
      ]),
      // Use Node.js API in the Renderer-process
      renderer(),
    ],
    clearScreen: true,
  };
});
