// @ts-check
import node from "@astrojs/node";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "server",
  adapter: vercel({}),
  // adapter: node({ mode: "standalone" }),
  vite: {
    plugins: [tailwindcss()],
  },
});
