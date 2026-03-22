import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: false,
    include: ['src/test/**/*.test.{ts,tsx}'],
    setupFiles: './src/test/setup.ts',
  },
})
