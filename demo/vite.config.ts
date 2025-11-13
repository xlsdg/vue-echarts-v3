import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  root: resolve(__dirname),
  plugins: [vue()],
  resolve: {
    alias: {
      // Link to the source code for development
      'vue-echarts-v3': resolve(__dirname, '../src/index.ts'),
      '@': resolve(__dirname, '../src')
    }
  },
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: resolve(__dirname, 'dist-demo')
  }
})
