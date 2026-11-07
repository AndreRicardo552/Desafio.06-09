import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Encaminha as chamadas /api para o backend, sem precisar configurar CORS
    proxy: { "/api": "http://localhost:3001" },
  },
});
