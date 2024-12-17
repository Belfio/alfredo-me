// vite.config.ts
import { vitePlugin as remix } from "file:///Users/alfredo/NonBackedUp/Code/alfredo/node_modules/@remix-run/dev/dist/index.js";
import { installGlobals } from "file:///Users/alfredo/NonBackedUp/Code/alfredo/node_modules/@remix-run/node/dist/index.js";
import { defineConfig } from "file:///Users/alfredo/NonBackedUp/Code/alfredo/node_modules/vite/dist/node/index.js";
import tsconfigPaths from "file:///Users/alfredo/NonBackedUp/Code/alfredo/node_modules/vite-tsconfig-paths/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/Users/alfredo/NonBackedUp/Code/alfredo";
installGlobals();
var vite_config_default = defineConfig({
  server: {
    port: 3e3
  },
  plugins: [
    remix({
      appDirectory: "app",
      assetsBuildDirectory: "public/build",
      future: {
        /* any enabled future flags */
      },
      ignoredRouteFiles: ["**/*.css"],
      publicPath: "/build/",
      serverBuildPath: "build/index.js",
      include: ["**/*.md", "**/*.png"]
    }),
    tsconfigPaths()
  ],
  assetsInclude: ["**/*.md", "**/*.png"],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./@")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWxmcmVkby9Ob25CYWNrZWRVcC9Db2RlL2FsZnJlZG9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hbGZyZWRvL05vbkJhY2tlZFVwL0NvZGUvYWxmcmVkby92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWxmcmVkby9Ob25CYWNrZWRVcC9Db2RlL2FsZnJlZG8vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyB2aXRlUGx1Z2luIGFzIHJlbWl4IH0gZnJvbSBcIkByZW1peC1ydW4vZGV2XCI7XG5pbXBvcnQgeyBpbnN0YWxsR2xvYmFscyB9IGZyb20gXCJAcmVtaXgtcnVuL25vZGVcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuaW5zdGFsbEdsb2JhbHMoKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlbWl4KHtcbiAgICAgIGFwcERpcmVjdG9yeTogXCJhcHBcIixcbiAgICAgIGFzc2V0c0J1aWxkRGlyZWN0b3J5OiBcInB1YmxpYy9idWlsZFwiLFxuICAgICAgZnV0dXJlOiB7XG4gICAgICAgIC8qIGFueSBlbmFibGVkIGZ1dHVyZSBmbGFncyAqL1xuICAgICAgfSxcbiAgICAgIGlnbm9yZWRSb3V0ZUZpbGVzOiBbXCIqKi8qLmNzc1wiXSxcbiAgICAgIHB1YmxpY1BhdGg6IFwiL2J1aWxkL1wiLFxuICAgICAgc2VydmVyQnVpbGRQYXRoOiBcImJ1aWxkL2luZGV4LmpzXCIsXG4gICAgICBpbmNsdWRlOiBbXCIqKi8qLm1kXCIsIFwiKiovKi5wbmdcIl0sXG4gICAgfSksXG4gICAgdHNjb25maWdQYXRocygpLFxuICBdLFxuICBhc3NldHNJbmNsdWRlOiBbXCIqKi8qLm1kXCIsIFwiKiovKi5wbmdcIl0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9AXCIpLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVMsU0FBUyxjQUFjLGFBQWE7QUFDM1UsU0FBUyxzQkFBc0I7QUFDL0IsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxVQUFVO0FBSmpCLElBQU0sbUNBQW1DO0FBTXpDLGVBQWU7QUFFZixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLE1BQ0osY0FBYztBQUFBLE1BQ2Qsc0JBQXNCO0FBQUEsTUFDdEIsUUFBUTtBQUFBO0FBQUEsTUFFUjtBQUFBLE1BQ0EsbUJBQW1CLENBQUMsVUFBVTtBQUFBLE1BQzlCLFlBQVk7QUFBQSxNQUNaLGlCQUFpQjtBQUFBLE1BQ2pCLFNBQVMsQ0FBQyxXQUFXLFVBQVU7QUFBQSxJQUNqQyxDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLGVBQWUsQ0FBQyxXQUFXLFVBQVU7QUFBQSxFQUNyQyxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
