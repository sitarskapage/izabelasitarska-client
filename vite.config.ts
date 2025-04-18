import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React and React DOM
          react: ["react", "react-dom"],

          // React Router
          router: ["react-router-dom", "react-router-bootstrap"],

          // UI Libraries
          bootstrap: ["react-bootstrap", "bootstrap", "bootstrap-icons"],
          icons: ["react-bootstrap-icons"],

          // Cloudinary
          cloudinary: ["@cloudinary/react", "@cloudinary/url-gen"],

          // Helmet for meta tags
          helmet: ["react-helmet"],

          // Motion
          motion: ["motion"],

          // 3D Model Viewer
          "model-viewer": ["@google/model-viewer"],

          // Utilities
          utils: [
            "dayjs",
            "html-react-parser",
            "dotenv",
            "@react-hook/window-size",
          ],

          // Video Player
          player: ["react-player"],
        },
      },
    },
  },
});
