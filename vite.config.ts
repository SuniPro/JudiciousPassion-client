import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: {
      // 첫 번째 프록시 설정
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
        ws: true,
      },
      // 두 번째 프록시 설정
      "/private": {
        target: "http://localhost:8090",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/private/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
