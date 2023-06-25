import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';

const pwaConfig: Partial<VitePWAOptions> = {
    manifest: {
        name: 'MyVibe.',
        short_name: 'MyVibe.',
        description: 'Share your vibes with your best friends now.',
        theme_color: '#ffffff',
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        icons: [
            {
                src: "favicon.ico",
                sizes: "64x64 32x32 24x24 16x16",
                type: "image/x-icon"
            },
            {
                src: "logo192.png",
                type: "image/png",
                sizes: "192x192"
            },
            {
                src: "logo512.png",
                type: "image/png",
                sizes: "512x512"
            },
            {
                src: "logo180.png",
                type: "image/png",
                sizes: "180x180",
                purpose: "apple touch icon"
            },
            {
                src: "logo225.png",
                type: "image/png",
                sizes: "225x225",
                purpose: "any maskable"
            }
        ]
    },
    manifestFilename: 'manifest.json',
    workbox: {
        globPatterns: [
            '**/*.{js,css,html,png,jpg,jpeg,svg,ico,json}'
        ],
    }
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteTsConfigPaths(), svgrPlugin(), VitePWA(pwaConfig)],
    server: {
        port: 4173,
        open: true,
        host: true,
    }
});
