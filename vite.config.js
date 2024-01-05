import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   '/api': 'https://www.omdbapi.com/?i=tt3896198&apikey=912a044',
  // },
  plugins: [react()],
})
