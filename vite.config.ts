import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3334,
    proxy: {
      '/api': 'http://localhost:3333' 
    },
  },
  plugins: [react()],
})
