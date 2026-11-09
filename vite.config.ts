import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  // Relatywne ścieżki zasobów (odpowiednik "homepage": "./" z CRA).
  base: './',
  plugins: [react(), tailwindcss()],
  // Port 3000 jak w CRA — musi zgadzać się z "Authorized JavaScript origins" klienta OAuth Google.
  server: { port: 3000 },
  preview: { port: 3000 },
  build: {
    outDir: 'build',
    rolldownOptions: {
      output: {
        // Duże biblioteki w osobnych plikach — lepsze cache'owanie między wdrożeniami.
        codeSplitting: {
          groups: [
            { name: 'firebase', test: /node_modules[\\/]@?firebase[\\/]/, priority: 20 },
            { name: 'mui-pickers', test: /node_modules[\\/]@mui[\\/]x-|node_modules[\\/]date-fns[\\/]/, priority: 15 },
            { name: 'mui', test: /node_modules[\\/](@mui|@emotion)[\\/]/, priority: 10 },
          ],
        },
      },
    },
  },
  test: { environment: 'node' },
})
