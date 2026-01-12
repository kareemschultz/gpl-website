import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/about')({
component: About,
})
function About() {
return (
<div className="p-2">
<h3 className="text-3xl font-bold">About gpl-website</h3>
<div className="mt-6 space-y-6">
<section>
<h4 className="text-xl font-semibold mb-3">📖 Project Information</h4>
<div className="bg-gray-50 p-4 rounded-lg">
<dl className="space-y-2">
<div>
<dt className="font-medium text-gray-700">Project Name:</dt>
<dd className="text-gray-900">gpl-website</dd>
</div>
<div>
<dt className="font-medium text-gray-700">Description:</dt>
<dd className="text-gray-900">A gpl website application</dd>
</div>
<div>
<dt className="font-medium text-gray-700">Author:</dt>
<dd className="text-gray-900">kareemschultz</dd>
</div>
<div>
<dt className="font-medium text-gray-700">Preset Used:</dt>
<dd className="text-gray-900">Custom</dd>
</div>
</dl>
</div>
</section>
<section>
<h4 className="text-xl font-semibold mb-3">⚙️ Technical Stack</h4>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div className="bg-blue-50 p-4 rounded-lg">
<h5 className="font-medium text-blue-800 mb-2">Frontend</h5>
<ul className="text-sm text-blue-700 space-y-1">
<li>• React 18 + TypeScript</li>
<li>• TanStack Router</li>
<li>• TanStack Query</li>
<li>• Tailwind CSS + shadcn/ui</li>
<li>• Vite (build tool)</li>
</ul>
</div>
<div className="bg-green-50 p-4 rounded-lg">
<h5 className="font-medium text-green-800 mb-2">Backend</h5>
<ul className="text-sm text-green-700 space-y-1">
<li>• Hono.js (web framework)</li>
<li>• PostgreSQL database</li>
<li>• Drizzle ORM</li>
<li>• oRPC (type-safe APIs)</li>
<li>• Better Auth</li>
</ul>
</div>
<div className="bg-purple-50 p-4 rounded-lg">
<h5 className="font-medium text-purple-800 mb-2">DevOps & Testing</h5>
<ul className="text-sm text-purple-700 space-y-1">
<li>• Playwright E2E testing</li>
<li>• Vitest unit testing</li>
<li>• Docker containerization</li>
<li>• GitHub Actions CI/CD</li>
</ul>
</div>
<div className="bg-orange-50 p-4 rounded-lg">
<h5 className="font-medium text-orange-800 mb-2">AI & Monitoring</h5>
<ul className="text-sm text-orange-700 space-y-1">
<li>• PBS (Plan-Build-Ship) system</li>
<li>• Beads issue tracking</li>
<li>• Claude Code hooks</li>
<li>• Vercel Analytics</li>
<li>• Sentry error tracking</li>
</ul>
</div>
</div>
</section>
<section>
<h4 className="text-xl font-semibold mb-3">🚀 Available Commands</h4>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
<div>
<h5 className="font-medium mb-2">Development</h5>
<ul className="space-y-1 font-mono">
<li><span className="text-blue-600">bun dev</span> - Start dev server</li>
<li><span className="text-blue-600">bun build</span> - Build for production</li>
<li><span className="text-blue-600">bun preview</span> - Preview build locally</li>
</ul>
</div>
<div>
<h5 className="font-medium mb-2">Quality</h5>
<ul className="space-y-1 font-mono">
<li><span className="text-green-600">bun typecheck</span> - Check TypeScript</li>
<li><span className="text-green-600">bun lint</span> - Run ESLint</li>
<li><span className="text-green-600">bun format</span> - Format code</li>
</ul>
</div>
<div>
<h5 className="font-medium mb-2">Testing</h5>
<ul className="space-y-1 font-mono">
<li><span className="text-purple-600">bun test</span> - Run Playwright tests</li>
<li><span className="text-purple-600">bun test:unit</span> - Run unit tests</li>
<li><span className="text-purple-600">bun test:all</span> - Run all tests</li>
</ul>
</div>
<div>
<h5 className="font-medium mb-2">Docker</h5>
<ul className="space-y-1 font-mono">
<li><span className="text-orange-600">bun docker:build</span> - Build image</li>
<li><span className="text-orange-600">bun docker:run</span> - Run container</li>
</ul>
</div>
</div>
</div>
</section>
<section>
<h4 className="text-xl font-semibold mb-3">📚 Documentation</h4>
<div className="space-y-2">
<p className="text-gray-600">
This project was created with <strong>KareTech Stack</strong>, an enhanced Better-T-Stack scaffold.
</p>
<ul className="text-sm space-y-1">
<li>• <a href="https://github.com/kareemschultz/karetech-stack" className="text-blue-600 hover:underline" target="_blank" rel="noopener">KareTech Stack Documentation</a></li>
<li>• <a href="https://better-t-stack.dev" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Better-T-Stack Docs</a></li>
<li>• <a href="https://tanstack.com/router" className="text-blue-600 hover:underline" target="_blank" rel="noopener">TanStack Router</a></li>
<li>• <a href="https://tailwindcss.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Tailwind CSS</a></li>
<li>• <a href="https://ui.shadcn.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener">shadcn/ui Components</a></li>
<li>• <a href="https://orm.drizzle.team" className="text-blue-600 hover:underline" target="_blank" rel="noopener">Drizzle ORM</a></li>
</ul>
</div>
</section>
</div>
</div>
)
}