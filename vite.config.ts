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
        target:
          "http://ec2-3-38-154-253.ap-northeast-2.compute.amazonaws.com:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
        ws: true,
      },
      // 두 번째 프록시 설정
      "/private": {
        target:
          "http://ec2-3-35-242-183.ap-northeast-2.compute.amazonaws.com:8090",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/private/, ""),
        secure: false,
        ws: true,
      },
    },
  },
});
