import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@interfaces': resolve(__dirname, 'src/interfaces'),
      '@styles': resolve(__dirname, 'src/styles'),
    },
  },
})
