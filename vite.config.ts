import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath, URL } from "url";

const projectRootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(projectRootDir, "client/src"),
      "@assets": path.resolve(projectRootDir, "client/src/assets"),
    },
  },
  root: path.resolve(projectRootDir, "client"),
  build: {
    outDir: path.resolve(projectRootDir, "dist/public"),
    emptyOutDir: true,
  },
});
