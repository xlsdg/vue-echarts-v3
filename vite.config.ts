import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin({
      jsAssetsFilterFunction: (outputChunk) => {
        return /^(index|lite)\.(js|cjs)$/.test(outputChunk.fileName)
      }
    }),
    dts({
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/__tests__/**', 'src/**/*.spec.ts', 'src/**/*.test.ts'],
      outDir: 'dist/types',
      staticImport: true,
      rollupTypes: true,
      insertTypesEntry: true,
      copyDtsFiles: false,
      clearPureImport: true
    })
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        lite: resolve(__dirname, 'src/lite.ts')
      },
      name: 'VueECharts',
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        if (format === 'es') return `${entryName}.js`
        if (format === 'cjs') return `${entryName}.cjs`
        return `${entryName}.${format}.js`
      }
    },
    rollupOptions: {
      // Externalize peer dependencies
      external: ['vue', 'echarts', 'echarts/core', /^echarts\//],
      output: {
        // Provide global variables for UMD build
        globals: {
          vue: 'Vue',
          echarts: 'echarts',
          'echarts/core': 'echarts'
        },
        exports: 'named'
      }
    },
    // Generate sourcemaps for debugging
    sourcemap: true,
    // Target modern browsers
    target: 'es2020',
    // Minification
    minify: 'esbuild'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
