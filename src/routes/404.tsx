import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
export const Route = createFileRoute('/404')({
component: NotFound,
})
function NotFound() {
return (
<div className="min-h-screen flex items-center justify-center bg-background">
<div className="max-w-md w-full p-6 text-center">
<div className="mb-8">
<h1 className="text-6xl font-bold text-primary mb-4">404</h1>
<h2 className="text-2xl font-semibold text-foreground mb-2">
Page Not Found
</h2>
<p className="text-muted-foreground">
The page you're looking for doesn't exist or has been moved.
</p>
</div>
<div className="space-y-4">
<div className="space-x-3">
<Button asChild>
<Link to="/">
Go Home
</Link>
</Button>
<Button variant="outline" onClick={() => window.history.back()}>
Go Back
</Button>
</div>
<div className="text-sm text-muted-foreground">
<p>
Lost? Check out our{' '}
<Link to="/about" className="text-primary hover:underline">
About page
</Link>{' '}
to learn more about gpl-website.
</p>
</div>
</div>
<div className="mt-8 p-4 bg-muted/50 rounded-lg">
<h3 className="text-sm font-semibold mb-2">Popular pages:</h3>
<ul className="text-sm space-y-1">
<li>
<Link to="/" className="text-primary hover:underline">
🏠 Home
</Link>
</li>
<li>
<Link to="/about" className="text-primary hover:underline">
📖 About
</Link>
</li>
<li>
<Link to="/auth" className="text-primary hover:underline">
🔐 Authentication
</Link>
</li>
</ul>
</div>
</div>
</div>
)
}