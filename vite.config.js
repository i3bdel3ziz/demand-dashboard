import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️  IMPORTANT: Change this to your EXACT GitHub repository name
// Example: repo URL is https://github.com/john/my-dashboard → set 'my-dashboard'
const REPO_NAME = 'demand-dashboard'

export default defineConfig({
  plugins: [react()],
  base: `/${REPO_NAME}/`,
})
