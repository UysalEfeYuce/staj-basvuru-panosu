import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages alt yolunda (/staj-basvuru-panosu/) da çalışması için göreli yollar
  base: './',
  plugins: [react(), tailwindcss()],
})
