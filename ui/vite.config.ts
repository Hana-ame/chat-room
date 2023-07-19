import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { viteSingleFile } from "vite-plugin-singlefile" // in one file

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), viteSingleFile()], // in one file
  build: {
    sourcemap: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.100.0.2:8080',
        // rewrite: path => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias:{
      '@': path.resolve(__dirname, './src')
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    // jsxInject: `import React from 'react'`, // unable to use?
  },
})