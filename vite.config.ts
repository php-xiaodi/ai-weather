import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts']
  },
  server: {
    proxy: {
      '/weather': {
        target: 'https://api.map.baidu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/weather/, '/weather/v1')
      }
    }
  }
})
