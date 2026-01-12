/**
 * Authentication Provider
 *
 * Provides authentication context throughout the application.
 * Uses Better Auth for session management.
 */
import React, { createContext, useContext } from 'react'
import { useSession, signIn, signUp, signOut } from '@/lib/auth-client'

// Auth context type
interface AuthContextType {
  user: {
    id: string
    name: string
    email: string
    image?: string | null
    role?: string
  } | null
  isLoading: boolean
  isAuthenticated: boolean
  signIn: typeof signIn
  signUp: typeof signUp
  signOut: typeof signOut
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession()

  const value: AuthContextType = {
    user: session?.user ?? null,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
    signIn,
    signUp,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Convenience hook for checking admin access
export function useIsAdmin() {
  const { user } = useAuth()
  return user?.role === 'admin' || user?.role === 'super_admin'
}
