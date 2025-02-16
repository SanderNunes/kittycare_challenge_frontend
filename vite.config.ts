import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173, // You can change the port if needed
  },
  assetsInclude: ['**/*.riv'],
  optimizeDeps: {
    include: ['@paypal/react-paypal-js'],
  },
});
