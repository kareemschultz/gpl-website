import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Analytics } from '@vercel/analytics/react'
import * as Sentry from '@sentry/react'
// Import the generated route tree
import { routeTree } from './routeTree.gen'
import './index.css'
// Initialize Sentry
Sentry.init({
dsn: import.meta.env.VITE_SENTRY_DSN,
integrations: [
Sentry.browserTracingIntegration(),
Sentry.replayIntegration({
maskAllText: false,
blockAllMedia: false,
}),
],
tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
replaysSessionSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
replaysOnErrorSampleRate: 1.0,
})
// Create a new router instance
const router = createRouter({ routeTree })
// Register the router instance for type safety
declare module '@tanstack/react-router' {
interface Register {
router: typeof router
}
}
// Create a client for React Query
const queryClient = new QueryClient({
defaultOptions: {
queries: {
staleTime: 1000 * 60 * 5, // 5 minutes
retry: (failureCount, error: any) => {
// Don't retry on 4xx errors
if (error?.status >= 400 && error?.status < 500) {
return false
}
return failureCount < 2
}
}
}
})
function App() {
return (
<QueryClientProvider client={queryClient}>
<RouterProvider router={router} />
<Analytics />
</QueryClientProvider>
)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<App />
</React.StrictMode>,
)