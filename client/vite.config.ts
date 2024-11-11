import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:7070",//if I need to do locally 5150, and 7070 for kube
    },
    // host: true,
    // port: 3040,
  },
});