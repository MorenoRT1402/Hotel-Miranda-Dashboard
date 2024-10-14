import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${import.meta.env.VITE_CLIENT_SERVER}`
  },
});
