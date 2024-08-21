// vite.lib.config.js
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/code.js'), // Path to your standalone JS file
      name: 'StandaloneLib',
      formats: ['umd'], // Output formats
      fileName: (format) => `code.js`, // Output file name
    },
    rollupOptions: {
      external: ['preact'],
      output: {
        globals: {
          preact: 'Preact',
        },
      },
    },
    outDir: 'dist', // Output directory for the standalone JS file
  },
})
