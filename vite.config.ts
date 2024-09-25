import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

export default defineConfig({
  plugins: [react(), svgr()],
  optimizeDeps: {
    include: ['msw'],
  },
  define: {
    'process.env': process.env
  },
  server: {
    host: true, // 모든 네트워크 인터페이스에서 접근 가능
    port: 5173,
    cors: true,
    origin: 'www.malazoo.kr',
  },
});
