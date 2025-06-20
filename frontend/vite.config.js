import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// ✅ Fixed config using path.resolve safely
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
