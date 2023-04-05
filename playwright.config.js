import { defineConfig } from '@playwright/test'

export default defineConfig({
  reporter: process.env.CI ? 'github' : 'list',
  testDir: './tests',
  testMatch: ['**/*.js']
})
