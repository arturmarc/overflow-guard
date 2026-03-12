import path from "path";
import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    checker({
      typescript: {
        tsconfigPath: "tsconfig.t3chat.json",
      },
    }),
  ],
  build: {
    copyPublicDir: false,
    target: "esnext", // Modern browsers only
    lib: {
      entry: path.resolve(__dirname, "src/dom/t3chatCustom.ts"),
      formats: ["iife"],
      name: "T3ChatCustom",
      fileName: () => "t3chat-custom.js",
    },
    minify: false,
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      treeshake: false, // Disable tree-shaking to preserve all code
    },
    watch: {
      // Enable watch mode for development
      include: ["src/dom/t3chatCustom.ts"],
    },
  },
  esbuild: {
    keepNames: true, // Preserve function/class names
    legalComments: "inline", // Preserve comments
    target: "esnext", // Modern syntax, minimal transforms
  },
});
