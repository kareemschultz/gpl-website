import React from "react"
import { Button } from "./ui/button"
interface ErrorBoundaryProps {
children: React.ReactNode
fallback?: React.ComponentType<{ error: Error; retry: () => void }>
}
interface ErrorBoundaryState {
hasError: boolean
error?: Error
}
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
constructor(props: ErrorBoundaryProps) {
super(props)
this.state = { hasError: false }
}
static getDerivedStateFromError(error: Error): ErrorBoundaryState {
return { hasError: true, error }
}
componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
console.error('ErrorBoundary caught an error:', error, errorInfo)

// Report to Sentry
if (typeof window !== 'undefined' && window.Sentry) {
window.Sentry.captureException(error, { extra: errorInfo })
}

}
retry = () => {
this.setState({ hasError: false, error: undefined })
}
render() {
if (this.state.hasError) {
const { fallback: Fallback } = this.props
if (Fallback && this.state.error) {
return <Fallback error={this.state.error} retry={this.retry} />
}
return (
<div className="min-h-screen flex items-center justify-center bg-background">
<div className="max-w-md w-full p-6 text-center">
<div className="mb-4">
<h1 className="text-2xl font-bold text-foreground mb-2">
Oops! Something went wrong
</h1>
<p className="text-muted-foreground">
We encountered an unexpected error. Please try refreshing the page.
</p>
</div>
{this.state.error && import.meta.env.DEV && (
<div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
<h3 className="text-sm font-semibold text-red-800 mb-2">
Error Details (Development Only)
</h3>
<pre className="text-xs text-red-700 overflow-auto">
{this.state.error.message}
</pre>
</div>
)}
<div className="space-x-3">
<Button onClick={this.retry} variant="default">
Try Again
</Button>
<Button
onClick={() => window.location.reload()}
variant="outline"
>
Refresh Page
</Button>
</div>
</div>
</div>
)
}
return this.props.children
}
}
// Custom hook for error boundaries in functional components
export function useErrorHandler() {
const [error, setError] = React.useState<Error | null>(null)
React.useEffect(() => {
if (error) {
throw error
}
}, [error])
return setError
}