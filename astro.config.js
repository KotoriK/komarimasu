import { defineConfig } from 'astro/config'
import AstroPWA from '@vite-pwa/astro'

export default defineConfig({
    integrations: [AstroPWA({
        registerType: 'autoUpdate',
        devOptions: { enabled: true },
        manifest:{},
        workbox: {
            runtimeCaching: [
/*                 {
                    urlPattern: /\/$/,
                    handler: 'StaleWhileRevalidate',
                    options: {
                        cacheName: 'entry',
                        expiration: {
                            maxEntries: 1,
                            maxAgeSeconds: 15 * 24 * 60 * 60 // 15 Days
                        }
                    }
                }, */ {
                    urlPattern: /\/.*\.(mp3|woff2)/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'static-assets',
                        expiration: {
                            maxEntries: 4,
                            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
                        }
                    }
                }
            ]
        }
    })]
})