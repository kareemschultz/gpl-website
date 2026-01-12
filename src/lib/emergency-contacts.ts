/**
 * Emergency Contacts Data & Types
 *
 * CRITICAL SAFETY REQUIREMENT:
 * These contacts must be visible on EVERY page of the website.
 * Lives depend on this information being accessible during power emergencies.
 */

export interface EmergencyContact {
  readonly region: string
  readonly name: string
  readonly primaryNumber: string
  readonly secondaryNumber?: string
  readonly description?: string
  readonly available: string
}

export interface EmergencyCategory {
  readonly title: string
  readonly contacts: readonly EmergencyContact[]
}

/**
 * GPL Emergency Hotlines by Region
 *
 * IMPORTANT: These numbers are verified from GPL official sources.
 * Any changes must be validated against official GPL communications.
 */
export const EMERGENCY_CONTACTS: readonly EmergencyContact[] = [
  {
    region: 'Demerara',
    name: 'Demerara Emergency Hotline',
    primaryNumber: '0475',
    secondaryNumber: '226-2600',
    description: 'For power outages, downed lines, and emergencies in Georgetown and surrounding areas',
    available: '24/7',
  },
  {
    region: 'Berbice',
    name: 'Berbice Emergency Hotline',
    primaryNumber: '333-2186',
    description: 'For power outages, downed lines, and emergencies in Berbice region',
    available: '24/7',
  },
  {
    region: 'Essequibo',
    name: 'Essequibo Emergency Hotline',
    primaryNumber: '771-4244',
    secondaryNumber: '771-4623',
    description: 'For power outages, downed lines, and emergencies in Essequibo region',
    available: '24/7',
  },
] as const

/**
 * Additional Emergency Contacts
 */
export const ADDITIONAL_CONTACTS: readonly EmergencyContact[] = [
  {
    region: 'National',
    name: 'GPL Customer Service',
    primaryNumber: '226-2600',
    description: 'General inquiries, billing, and service requests',
    available: 'Mon-Fri 8AM-4PM',
  },
  {
    region: 'National',
    name: 'GPL Head Office',
    primaryNumber: '227-2654',
    secondaryNumber: '225-7900',
    description: 'Administrative inquiries',
    available: 'Mon-Fri 8AM-4PM',
  },
] as const

/**
 * Critical Safety Messages
 */
export const SAFETY_MESSAGES = {
  downed_lines: 'STAY AWAY from downed power lines! Call emergency immediately.',
  outage: 'Report power outages to your regional hotline.',
  smell_burning: 'If you smell burning near electrical equipment, evacuate and call immediately.',
  flooding: 'Never touch electrical equipment if flooding is present.',
} as const

/**
 * Get emergency contact for a specific region
 */
export function getRegionalContact(region: string): EmergencyContact | undefined {
  return EMERGENCY_CONTACTS.find(
    contact => contact.region.toLowerCase() === region.toLowerCase()
  )
}

/**
 * Get primary emergency number (defaults to Demerara/Georgetown)
 */
export function getPrimaryEmergencyNumber(): string {
  return EMERGENCY_CONTACTS[0].primaryNumber
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(number: string): string {
  // Clean the number
  const cleaned = number.replace(/\D/g, '')

  // Format based on length
  if (cleaned.length === 3 || cleaned.length === 4) {
    // Short code like 0475
    return number
  }

  if (cleaned.length === 7) {
    // Local number like 226-2600
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
  }

  // Return as-is for other formats
  return number
}

/**
 * Get tel: href for phone number
 */
export function getPhoneHref(number: string): string {
  const cleaned = number.replace(/\D/g, '')

  // For short codes, just return as-is
  if (cleaned.length <= 4) {
    return `tel:${cleaned}`
  }

  // For Guyana numbers, add country code if needed
  if (cleaned.length === 7) {
    return `tel:+592${cleaned}`
  }

  return `tel:${cleaned}`
}

/**
 * Local storage key for banner dismissal
 */
export const BANNER_DISMISSED_KEY = 'gpl-emergency-banner-dismissed'

/**
 * Check if emergency banner was dismissed today
 */
export function wasBannerDismissedToday(): boolean {
  if (typeof window === 'undefined') return false

  const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY)
  if (!dismissed) return false

  const dismissedDate = new Date(dismissed)
  const today = new Date()

  return (
    dismissedDate.getDate() === today.getDate() &&
    dismissedDate.getMonth() === today.getMonth() &&
    dismissedDate.getFullYear() === today.getFullYear()
  )
}

/**
 * Mark emergency banner as dismissed
 */
export function dismissBanner(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(BANNER_DISMISSED_KEY, new Date().toISOString())
}
