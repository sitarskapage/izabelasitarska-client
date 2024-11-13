import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/labguy-client",

  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "dist/index.html",
          dest: "",
          rename: "404.html",
        },
      ],
    }),
  ],
});
