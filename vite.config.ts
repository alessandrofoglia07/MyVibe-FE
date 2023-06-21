import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import manifest from './manifest.json';

const pwaConfig: Partial<VitePWAOptions> = {
    manifest,
    manifestFilename: 'manifest.json',
    includeAssets: ['favicon.ico', 'robots.txt'],
    workbox: {
        globPatterns: ['**/*.{js,css,html,json,ico,png,jpg,jpeg,svg}'],
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
