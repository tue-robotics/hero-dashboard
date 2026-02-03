import { defineConfig } from "@playwright/test";

export default defineConfig({
  retries: 0, // Disable retries to prevent restarting
  workers: 1, // Single worker
  reporter: process.env.CI ? "github" : "list",
  testDir: "./tests",
  // testMatch: ["**/*.ts"],
});
