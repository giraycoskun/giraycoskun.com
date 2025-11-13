import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    headers: {
      "Cache-Control": "max-age=3600", // cache for 1 hour
    },
  },
  build: {
    target: "esnext", // modern JS output
    cssCodeSplit: true,
    minify: "esbuild",
    sourcemap: false,
  },
});
