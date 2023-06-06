import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), viteTsConfigPaths(), svgrPlugin()],
    server: {
        port: 3000,
        open: true,
        host: true,
    }
});