import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { router } from './router'
import { db } from './db'
import { auth } from '../lib/auth'

const app = new Hono()

// Middleware
app.use('*', logger())
app.use('*', prettyJSON())
app.use('*', cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))

// Health check endpoint for Docker
app.get('/health', async (c) => {
  try {
    // Test database connection
    await db.execute({ sql: 'SELECT 1' })
    return c.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    })
  } catch {
    return c.json({
      status: 'unhealthy',
      error: 'Database connection failed',
      timestamp: new Date().toISOString()
    }, 503)
  }
})

// Basic ping endpoint
app.get('/ping', (c) => {
  return c.json({ message: 'pong' })
})

// Better Auth routes - handles /api/auth/*
app.on(['GET', 'POST'], '/api/auth/**', (c) => {
  return auth.handler(c.req.raw)
})

// API Routes - mount the Hono router
app.route('/api', router)

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use('*', serveStatic({
    root: './dist',
    index: 'index.html',
  }))
  // Catch all for SPA routing
  app.get('*', serveStatic({
    path: './dist/index.html',
  }))
}

const port = Number(process.env.PORT) || 3000
console.log(`🚀 Server starting on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})

export type App = typeof app
