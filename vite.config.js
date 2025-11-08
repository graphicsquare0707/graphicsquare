import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  preview: {
    allowedHosts: ['graphicsquare-g9f0.onrender.com'],
    host: true,
    port: 4173
  }
})
