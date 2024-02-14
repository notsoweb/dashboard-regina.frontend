import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@Components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@Layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@Pages': fileURLToPath(new URL('./src/pages', import.meta.url)),
      '@Views': fileURLToPath(new URL('./src/views', import.meta.url)),
    }
  }
})
