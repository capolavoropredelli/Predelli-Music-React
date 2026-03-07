import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'generate-cname',
      closeBundle() {
        writeFileSync('dist/CNAME', 'music.predelli.site')
      }
    }
  ],
})
