import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  EMERGENCY_CONTACTS,
  getPhoneHref,
  wasBannerDismissedToday,
  dismissBanner,
} from '@/lib/emergency-contacts'

interface EmergencyBannerProps {
  className?: string
  /** If true, shows even if previously dismissed today */
  forceShow?: boolean
  /** If true, cannot be dismissed */
  persistent?: boolean
}

/**
 * Emergency Banner Component
 *
 * Displays a dismissible emergency contacts banner.
 * By default, once dismissed, stays hidden for the rest of the day.
 *
 * CRITICAL SAFETY REQUIREMENT:
 * This banner provides prominent emergency contact visibility.
 */
export function EmergencyBanner({
  className,
  forceShow = false,
  persistent = false,
}: EmergencyBannerProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  useEffect(() => {
    // Check if banner was dismissed today
    if (forceShow || !wasBannerDismissedToday()) {
      setIsVisible(true)
    }
  }, [forceShow])

  const handleDismiss = () => {
    if (persistent) return

    setIsAnimatingOut(true)
    dismissBanner()

    // Wait for animation to complete before hiding
    setTimeout(() => {
      setIsVisible(false)
      setIsAnimatingOut(false)
    }, 300)
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'bg-gradient-to-r from-destructive to-destructive/90',
        'text-destructive-foreground',
        'transition-all duration-300 ease-in-out',
        isAnimatingOut && 'opacity-0 -translate-y-full',
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Main content */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <AlertIcon className="w-5 h-5 flex-shrink-0" />
              <span className="font-bold text-sm sm:text-base">
                Power Emergency?
              </span>
            </div>

            {/* Emergency numbers */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              {EMERGENCY_CONTACTS.map((contact) => (
                <a
                  key={contact.region}
                  href={getPhoneHref(contact.primaryNumber)}
                  className={cn(
                    'inline-flex items-center gap-1.5 px-3 py-1',
                    'bg-white/20 hover:bg-white/30 rounded-full',
                    'text-sm font-semibold transition-colors',
                    'focus:outline-none focus:ring-2 focus:ring-white/50'
                  )}
                  aria-label={`Call ${contact.region} emergency at ${contact.primaryNumber}`}
                >
                  <PhoneIcon className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">{contact.region}:</span>
                  <span className="font-bold">{contact.primaryNumber}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Dismiss button */}
          {!persistent && (
            <button
              onClick={handleDismiss}
              className={cn(
                'flex-shrink-0 p-1.5 rounded-full',
                'hover:bg-white/20 transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-white/50',
                'absolute top-2 right-2 sm:relative sm:top-auto sm:right-auto'
              )}
              aria-label="Dismiss emergency banner"
            >
              <CloseIcon className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Safety tip */}
        <div className="mt-2 text-center sm:text-left">
          <p className="text-xs sm:text-sm opacity-90">
            <strong>Safety First:</strong> Stay away from downed power lines!
            Call immediately and keep others away.{' '}
            <a
              href="/safety"
              className="underline hover:no-underline font-medium"
            >
              More safety tips
            </a>
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/5" />
        <div className="absolute -left-2 -bottom-2 w-16 h-16 rounded-full bg-white/5" />
      </div>
    </div>
  )
}

/**
 * Minimal version for pages where space is limited
 */
export function EmergencyBannerMinimal({ className }: { className?: string }) {
  const primary = EMERGENCY_CONTACTS[0]

  return (
    <div
      className={cn(
        'bg-destructive/10 border-l-4 border-destructive',
        'px-4 py-2 rounded-r',
        className
      )}
      role="alert"
    >
      <div className="flex items-center gap-2 text-sm">
        <AlertIcon className="w-4 h-4 text-destructive flex-shrink-0" />
        <span>
          <strong>Power Emergency?</strong> Call{' '}
          <a
            href={getPhoneHref(primary.primaryNumber)}
            className="font-bold text-destructive hover:underline"
          >
            {primary.primaryNumber}
          </a>
        </span>
      </div>
    </div>
  )
}

// Simple SVG Icons

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="18" x2="6" y1="6" y2="18" />
      <line x1="6" x2="18" y1="6" y2="18" />
    </svg>
  )
}
