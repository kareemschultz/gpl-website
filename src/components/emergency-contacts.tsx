import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  EMERGENCY_CONTACTS,
  ADDITIONAL_CONTACTS,
  getPhoneHref,
  type EmergencyContact,
} from '@/lib/emergency-contacts'

interface EmergencyContactsProps {
  className?: string
  variant?: 'dropdown' | 'full' | 'compact'
}

/**
 * Emergency Contacts Component
 *
 * CRITICAL SAFETY REQUIREMENT:
 * This component displays emergency contact information.
 * It must be visible and accessible on every page.
 */
export function EmergencyContacts({
  className,
  variant = 'dropdown',
}: EmergencyContactsProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (variant === 'compact') {
    return <CompactEmergencyContacts className={className} />
  }

  if (variant === 'full') {
    return <FullEmergencyContacts className={className} />
  }

  return (
    <div className={cn('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={(e) => {
          // Close dropdown when focus leaves the component
          if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
            setTimeout(() => setIsOpen(false), 150)
          }
        }}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-md',
          'bg-destructive text-destructive-foreground',
          'hover:bg-destructive/90 transition-colors',
          'text-sm font-semibold',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Emergency contacts"
      >
        <EmergencyIcon className="w-4 h-4" />
        <span className="hidden sm:inline">Emergency</span>
        <span className="sm:hidden">911</span>
        <ChevronIcon className={cn('w-4 h-4 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full mt-2 z-50',
            'w-80 sm:w-96 p-4 rounded-lg shadow-lg',
            'bg-card border border-border',
            'animate-in fade-in-0 zoom-in-95 slide-in-from-top-2'
          )}
          role="menu"
        >
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
            <EmergencyIcon className="w-5 h-5 text-destructive" />
            <h3 className="font-bold text-lg">Emergency Contacts</h3>
          </div>

          <div className="space-y-3">
            {EMERGENCY_CONTACTS.map((contact) => (
              <ContactCard key={contact.region} contact={contact} />
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground mb-2">
              For downed power lines, evacuate the area and call immediately!
            </p>
            <a
              href="/safety"
              className="text-xs text-primary hover:underline font-medium"
            >
              View full safety information →
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Compact version for mobile header
 */
function CompactEmergencyContacts({ className }: { className?: string }) {
  const primary = EMERGENCY_CONTACTS[0]

  return (
    <a
      href={getPhoneHref(primary.primaryNumber)}
      className={cn(
        'flex items-center gap-1 px-2 py-1 rounded',
        'bg-destructive text-destructive-foreground',
        'text-xs font-bold',
        className
      )}
      aria-label={`Call emergency hotline ${primary.primaryNumber}`}
    >
      <PhoneIcon className="w-3 h-3" />
      <span>{primary.primaryNumber}</span>
    </a>
  )
}

/**
 * Full version for footer and dedicated pages
 */
function FullEmergencyContacts({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-2">
        <EmergencyIcon className="w-6 h-6 text-destructive" />
        <h3 className="font-bold text-xl">Emergency Hotlines</h3>
      </div>

      <p className="text-sm text-muted-foreground">
        Available 24/7 for power outages, downed lines, and electrical emergencies.
      </p>

      <div className="grid gap-4 sm:grid-cols-3">
        {EMERGENCY_CONTACTS.map((contact) => (
          <div
            key={contact.region}
            className="p-4 rounded-lg bg-card border border-border"
          >
            <h4 className="font-semibold text-lg mb-2">{contact.region}</h4>
            <a
              href={getPhoneHref(contact.primaryNumber)}
              className={cn(
                'flex items-center gap-2 text-xl font-bold',
                'text-destructive hover:underline'
              )}
            >
              <PhoneIcon className="w-5 h-5" />
              {contact.primaryNumber}
            </a>
            {contact.secondaryNumber && (
              <a
                href={getPhoneHref(contact.secondaryNumber)}
                className="text-sm text-muted-foreground hover:underline block mt-1"
              >
                or {contact.secondaryNumber}
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h4 className="font-semibold mb-2">Additional Contacts</h4>
        <div className="grid gap-2 sm:grid-cols-2">
          {ADDITIONAL_CONTACTS.map((contact) => (
            <div key={contact.name} className="text-sm">
              <span className="font-medium">{contact.name}:</span>{' '}
              <a
                href={getPhoneHref(contact.primaryNumber)}
                className="text-primary hover:underline"
              >
                {contact.primaryNumber}
              </a>
              <span className="text-muted-foreground ml-1">
                ({contact.available})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Individual contact card for dropdown
 */
function ContactCard({ contact }: { contact: EmergencyContact }) {
  return (
    <div className="flex items-start gap-3" role="menuitem">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
        <PhoneIcon className="w-4 h-4 text-destructive" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{contact.region}</div>
        <a
          href={getPhoneHref(contact.primaryNumber)}
          className="text-lg font-bold text-destructive hover:underline"
        >
          {contact.primaryNumber}
        </a>
        {contact.secondaryNumber && (
          <a
            href={getPhoneHref(contact.secondaryNumber)}
            className="text-sm text-muted-foreground hover:underline ml-2"
          >
            or {contact.secondaryNumber}
          </a>
        )}
        <div className="text-xs text-muted-foreground">{contact.available}</div>
      </div>
    </div>
  )
}

// Simple SVG Icons (avoiding external dependencies for critical safety component)

function EmergencyIcon({ className }: { className?: string }) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

function ChevronIcon({ className }: { className?: string }) {
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
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
