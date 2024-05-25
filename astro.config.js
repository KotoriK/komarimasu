import { defineConfig } from 'astro/config'
import AstroPWA from '@vite-pwa/astro'

export default defineConfig({
    integrations: [AstroPWA({
        base: '/',
        scope: '/',
        strategies: "generateSW",
        registerType: 'autoUpdate',
        devOptions: { enabled: true, navigateFallbackAllowlist: [/^\//], },
        manifest: {
            name: "困りますボタン",
            short_name: '困ります',
            description: 'お困りの方はこのボタンを押してください',
            icons: [
                {
                    src: "/icon.svg",
                    sizes: "any"
                }, {
                    src: "/icon-maskable.svg",
                    sizes: "any",
                    purpose: "maskable"
                }
            ],
            theme_color: "#f9cb00",
            display_override: ["fullscreen", "standalone"],
            display: "minimal-ui"
        },
        workbox: {
            globPatterns: ['**/*.{html|webmanifest|svg}'],
            runtimeCaching: [
                {
                    urlPattern: /\/.*\.(mp3|woff2)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'assets',
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
                        }
                    }
                }
            ]
        }
    })]
})