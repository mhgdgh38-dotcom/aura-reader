import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // ⚠️ 极其重要：base 的值必须是你的仓库名，两边都要有斜杠
  // 如果你的仓库名叫 aura-reader，就写 '/aura-reader/'
  base: '/aura-reader/', 
})

