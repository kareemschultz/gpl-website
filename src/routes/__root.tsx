import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AuthProvider } from '@/components/auth/auth-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { EmergencyBanner } from '@/components/emergency-banner'
import { Toaster } from '@/components/ui/toaster'

/**
 * Root Route Layout
 *
 * This is the main layout that wraps all pages.
 *
 * CRITICAL SAFETY REQUIREMENT:
 * Emergency contacts must be visible on EVERY page.
 * - Header: Emergency contacts dropdown
 * - Footer: Full emergency contacts display
 * - Homepage: Dismissible emergency banner
 */
export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {/* Site Header with Emergency Contacts */}
        <SiteHeader />

        {/* Main Content */}
        <main className="flex-1">
          <AppContent />
        </main>

        {/* Site Footer with Emergency Contacts */}
        <SiteFooter />
      </div>

      {/* Toast notifications */}
      <Toaster />

      {/* Dev Tools (only in development) */}
      {import.meta.env.DEV && <TanStackRouterDevtools position="bottom-right" />}
    </AuthProvider>
  )
}

function AppContent() {
  const routerState = useRouterState()
  const isHomepage = routerState.location.pathname === '/'

  return (
    <>
      {/* Show emergency banner on homepage */}
      {isHomepage && <EmergencyBanner />}

      {/* Page Content */}
      <Outlet />
    </>
  )
}
