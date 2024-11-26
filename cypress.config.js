import { defineConfig } from "cypress";
import { CLIENT_URL } from './src/app/path';

const baseUrl = CLIENT_URL;

export default defineConfig({
  e2e: {
    // baseUrl: `${import.meta.env.VITE_BASE_URL}`
    // baseUrl: `https://localhost:3000`
    // baseUrl: cypress.env(`VITE_BASE_URL`)
    baseUrl: baseUrl
  },
});
