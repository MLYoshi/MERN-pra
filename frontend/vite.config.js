import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:'0.0.0.0',
    proxy: {
      // 代理路径
      "/api": {
        target: 'http://localhost:5000', // 目标服务器的地址
        cors: false,
        changeOrigin: false,
        rewrite: (path) => path.replace(/^\/api/, " "), // 重写路径
      },
    }
  }
})
