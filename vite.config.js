import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'demand-dashboard' with your actual GitHub repository name
export default defineConfig({
  plugins: [react()],
  base: '/demand-dashboard/',
})
