import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ isSsrBuild }) => (
  {  plugins: [ react(),tailwindcss(),  ],
    resolve:{
      alias:{
        "@" : path.resolve(__dirname,"./src")
      }
    },
    // The SSR build only renders the legal pages (scripts/prerender-legal.js); it doesn't need public/
    build: { copyPublicDir: !isSsrBuild },

  }))