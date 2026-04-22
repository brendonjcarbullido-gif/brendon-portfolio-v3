import path from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  preview: {
    host: true,
    allowedHosts: ['bhomelab.tail5a87f7.ts.net', 'all'],
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['@mediapipe/face_mesh', '@mediapipe/camera_utils'],
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          motion: ['framer-motion'],
          mediapipe: ['@mediapipe/tasks-vision'],
        },
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
})
