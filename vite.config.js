import { defineConfig } from 'vite'
import { reactRouter } from '@react-router/dev/vite'
import netlifyReactRouter from '@netlify/vite-plugin-react-router'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), ...(process.env.VERCEL === '1' ? [] : [netlifyReactRouter()])],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  server: { host: '127.0.0.1' },
})
