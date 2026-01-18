import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    remix({
      appDirectory: "app",
      buildDirectory: "build",
      future: {
        /* any enabled future flags */
      },
      ignoredRouteFiles: ["**/*.css"],
    }),
    tsconfigPaths(),
  ],
  assetsInclude: ["**/*.md", "**/*.png"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./@"),
    },
  },
});
