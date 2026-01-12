/**
 * Better Auth Client
 *
 * Client-side authentication functions for use in React components.
 * Provides typed functions for sign-in, sign-up, sign-out, and session management.
 */
import { createAuthClient } from 'better-auth/react'
import { getBaseUrl } from './utils'

export const authClient = createAuthClient({
  baseURL: getBaseUrl(),
})

// Export individual functions for convenience
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient
