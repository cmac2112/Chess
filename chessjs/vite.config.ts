import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:"/Chess-With-AI-Opponents/",
  plugins: [react()],
})
