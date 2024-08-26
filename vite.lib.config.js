// vite.lib.config.js
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
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
      // watch: true,
    },
    define: {
      'process.env': env,
    },
  }
})
