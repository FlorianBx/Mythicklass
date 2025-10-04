import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
   server: {
    proxy: {
      '/api/wow-icons': {
        target: 'https://wow.zamimg.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/wow-icons/, '/images/wow/icons/large'),
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
