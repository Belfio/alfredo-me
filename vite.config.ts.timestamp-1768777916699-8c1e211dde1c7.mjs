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
      buildDirectory: "build",
      future: {
        /* any enabled future flags */
      },
      ignoredRouteFiles: ["**/*.css"]
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWxmcmVkby9Ob25CYWNrZWRVcC9Db2RlL2FsZnJlZG9cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hbGZyZWRvL05vbkJhY2tlZFVwL0NvZGUvYWxmcmVkby92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWxmcmVkby9Ob25CYWNrZWRVcC9Db2RlL2FsZnJlZG8vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyB2aXRlUGx1Z2luIGFzIHJlbWl4IH0gZnJvbSBcIkByZW1peC1ydW4vZGV2XCI7XG5pbXBvcnQgeyBpbnN0YWxsR2xvYmFscyB9IGZyb20gXCJAcmVtaXgtcnVuL25vZGVcIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tIFwidml0ZS10c2NvbmZpZy1wYXRoc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuaW5zdGFsbEdsb2JhbHMoKTtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgc2VydmVyOiB7XG4gICAgcG9ydDogMzAwMCxcbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIHJlbWl4KHtcbiAgICAgIGFwcERpcmVjdG9yeTogXCJhcHBcIixcbiAgICAgIGJ1aWxkRGlyZWN0b3J5OiBcImJ1aWxkXCIsXG4gICAgICBmdXR1cmU6IHtcbiAgICAgICAgLyogYW55IGVuYWJsZWQgZnV0dXJlIGZsYWdzICovXG4gICAgICB9LFxuICAgICAgaWdub3JlZFJvdXRlRmlsZXM6IFtcIioqLyouY3NzXCJdLFxuICAgIH0pLFxuICAgIHRzY29uZmlnUGF0aHMoKSxcbiAgXSxcbiAgYXNzZXRzSW5jbHVkZTogW1wiKiovKi5tZFwiLCBcIioqLyoucG5nXCJdLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vQFwiKSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVTLFNBQVMsY0FBYyxhQUFhO0FBQzNVLFNBQVMsc0JBQXNCO0FBQy9CLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sVUFBVTtBQUpqQixJQUFNLG1DQUFtQztBQU16QyxlQUFlO0FBRWYsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxNQUNKLGNBQWM7QUFBQSxNQUNkLGdCQUFnQjtBQUFBLE1BQ2hCLFFBQVE7QUFBQTtBQUFBLE1BRVI7QUFBQSxNQUNBLG1CQUFtQixDQUFDLFVBQVU7QUFBQSxJQUNoQyxDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUEsRUFDaEI7QUFBQSxFQUNBLGVBQWUsQ0FBQyxXQUFXLFVBQVU7QUFBQSxFQUNyQyxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxLQUFLO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
