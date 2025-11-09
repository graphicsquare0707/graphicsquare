import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',  // ← ここを追加（相対パス）
  build: {
    outDir: 'dist'
  }
})
