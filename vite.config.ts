import { resolve } from 'node:path';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  base: '/Quicky-Clicky/',
  plugins: [tanstackRouter({ autoCodeSplitting: true, target: 'react' }), react(), tailwindcss()],
  resolve: { alias: { '@': resolve(__dirname, './src') } },
});
