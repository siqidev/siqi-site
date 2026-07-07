import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://siqi.jp",
  outDir: "./dist/public",
  build: {
    format: "file",
  },
  integrations: [
    react(),
    sitemap({
      filter: page => !page.includes("/404"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
