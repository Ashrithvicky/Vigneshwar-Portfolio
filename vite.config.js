import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    coverage: {
      include: ['src/App.jsx', 'src/components/{Projects,Hero,Navbar,HorizontalGallery,Experience,Education,Languages,CosmicBackground,CustomCursor,Skills,Certifications}.jsx', 'src/utils/links.js'],
      thresholds: { lines: 80, branches: 80, functions: 80, statements: 80 },
    },
  },
})
