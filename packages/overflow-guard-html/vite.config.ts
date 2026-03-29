import path from 'node:path'

import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'OverflowGuardHtml',
      formats: ['es', 'cjs', 'iife'],
      fileName: (format) => {
        if (format === 'es') {
          return 'index.js'
        }

        if (format === 'cjs') {
          return 'index.cjs'
        }

        return 'overflow-guard.min.js'
      },
    },
  },
})
