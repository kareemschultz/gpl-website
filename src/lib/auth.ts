/**
 * Better Auth Server Configuration
 *
 * Server-side authentication setup using Better Auth with Drizzle adapter.
 * Supports email/password and GitHub OAuth authentication.
 */
import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/db'
import * as schema from '@/db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: schema.users,
      session: schema.sessions,
      account: schema.accounts,
      verification: schema.verificationTokens,
    },
  }),

  // Email & Password authentication
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },

  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // Update session every day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes cache
    },
  },

  // User configuration
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'user',
        required: false,
      },
    },
  },

  // OAuth providers (GitHub)
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    },
  },

  // Base URL for callbacks
  baseURL: process.env.BETTER_AUTH_BASE_URL || 'http://localhost:5173',

  // Secret for signing tokens
  secret: process.env.BETTER_AUTH_SECRET,

  // Trust host for production
  trustedOrigins: [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.BETTER_AUTH_BASE_URL || '',
  ].filter(Boolean),
})

// Export auth types for type-safe usage
export type Auth = typeof auth
export type Session = typeof auth.$Infer.Session
