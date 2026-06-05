import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' 

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    
  ],
  base: '/ra2581392523018/',
  resolve:{
    alias:{
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'docs', // Faz o build ser exportado para a pasta /docs
    emptyOutDir: true // Limpa a pasta docs antes de gerar novos arquivos
  }
})
