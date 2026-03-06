import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const isAdminBuild = env.ADMIN_BUILD === "true";

  return {
    plugins: [react()],
    build: {
      outDir: isAdminBuild ? "dist-admin" : "dist",
      rollupOptions: {
        input: isAdminBuild ? "index-admin.html" : "index.html",
      },
    },
    define: {
      // Pass build type to the app
      __ADMIN_BUILD__: isAdminBuild,
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
