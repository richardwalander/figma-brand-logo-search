import { defineConfig, loadEnv } from 'vite'
import preact from '@preact/preset-vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [preact(), viteSingleFile()],
    build: {
      outDir: 'dist',
      emptyOutDir: false,
      // watch: true,
    },
    define: {
      'process.env': env,
    },
  }
})
