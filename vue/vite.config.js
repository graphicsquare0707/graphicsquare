import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/vue/',  // SPAを /vue/ 配下で公開する
  build: {
    outDir: 'dist'
  }
})
