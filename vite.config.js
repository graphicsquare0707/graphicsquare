import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/',       // 公開ルートを明示
  build: {
    outDir: 'dist' // ビルド成果物を dist に出力
  }
})


