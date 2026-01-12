import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
// https://vitejs.dev/config/
export default defineConfig({
plugins: [
TanStackRouterVite({
routesDirectory: './src/routes',
generatedRouteTree: './src/routeTree.gen.ts',
autoCodeSplitting: true,
}),
react({
babel: {
plugins: [
]
}
}),
sentryVitePlugin({
org: process.env.SENTRY_ORG,
project: process.env.SENTRY_PROJECT,
authToken: process.env.SENTRY_AUTH_TOKEN,
}),
],
resolve: {
alias: {
'@': path.resolve(__dirname, './src'),
'@/components': path.resolve(__dirname, './src/components'),
'@/lib': path.resolve(__dirname, './src/lib'),
'@/utils': path.resolve(__dirname, './src/utils'),
'@/db': path.resolve(__dirname, './src/db'),
'@/auth': path.resolve(__dirname, './src/auth'),
'@/api': path.resolve(__dirname, './src/api')
}
},
build: {
sourcemap: true,
// Source maps are required for Sentry
rollupOptions: {
output: {
manualChunks: {
vendor: ['react', 'react-dom'],
api: ['@orpc/client', '@orpc/react-query'],
router: ['@tanstack/react-router'],
auth: ['better-auth'],
db: ['drizzle-orm', 'postgres']
}
}
}
},
server: {
port: 3000,
host: true,
// Configure for E2E testing
...(process.env.CI && {
host: '0.0.0.0',
port: 4173
})
},
preview: {
port: 4173,
host: true
},
define: {
__APP_VERSION__: JSON.stringify(process.env.npm_package_version)
}
})