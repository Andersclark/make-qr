import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {VitePWA} from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VitePWA({
    includeAssets: ['vite.svg', 'vue-logo.png'],
    registerType: 'autoUpdate',
    injectRegister: 'auto',
    workbox: {
      globPatterns: ['**/*.{js,css,html,ico,png,webp,avif,jpg,jpeg,svg,gif,mp4}'],
      cleanupOutdatedCaches: false,
      sourcemap: true,
    },
    devOptions: {
      enabled: true
    },
    manifest: {
      "name": "Vue PWA",
      "short_name": "Vue PWA",
      description: 'A simple way of making QR-codes',
      
      "icons": [
        {
          "src": "/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "/android-chrome-256x256.png",
          "sizes": "256x256",
          "type": "image/png"
        }
      ],
      "theme_color": "#646cff",
      "background_color": "#646cff",
      "display": "standalone"
    }})
  ],
})
