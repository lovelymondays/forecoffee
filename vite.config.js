import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
  },
});

/**
 * 
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { transformWithEsbuild, defineConfig } from "vite";
// import restart from "vite-plugin-restart";

export default defineConfig({
  root: "src/",
  publicDir: "../public/",
  plugins: [
    // Restart server on static/public file change
    // restart({ restart: ["../public/**"] }),

    // React support
    react(),tailwindcss()

    // .js file support as if it was JSX
    {
      name: "load+transform-js-files-as-jsx",
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;

        return transformWithEsbuild(code, id, {
          loader: "jsx",
          jsx: "automatic",
        });
      },
    },
  ],
  server: {
    host: true, // Open to local network and display URL
    // open: !("SANDBOX_URL" in process.env || "CODESANDBOX_HOST" in process.env), // Open if it's not a CodeSandbox
  },
  build: {
    outDir: "../dist", // Output in the dist/ folder
    emptyOutDir: true, // Empty the folder first
    sourcemap: true, // Add sourcemap
  },
});
 */
