import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import graphqlLoader from 'vite-plugin-graphql-loader';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), graphqlLoader()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
