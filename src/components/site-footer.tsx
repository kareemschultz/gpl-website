import { Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { EmergencyContacts } from '@/components/emergency-contacts'
import { EMERGENCY_CONTACTS, getPhoneHref } from '@/lib/emergency-contacts'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Services',
    links: [
      { label: 'Electricity Supply', href: '/services' },
      { label: 'New Connections', href: '/services#connections' },
      { label: 'Billing & Payments', href: '/services#billing' },
      { label: 'Street Lighting', href: '/services#streetlights' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Report Outage', href: '/contact#outage' },
      { label: 'Submit Feedback', href: '/contact#feedback' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About GPL', href: '/about' },
      { label: 'News & Updates', href: '/news' },
      { label: 'Safety Information', href: '/safety' },
      { label: 'Careers', href: '/careers' },
    ],
  },
]

/**
 * Site Footer Component
 *
 * Contains:
 * - Emergency contacts (CRITICAL - full display)
 * - Quick links
 * - Contact information
 * - Copyright
 */
export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted/30 border-t border-border">
      {/* Emergency Contacts Section - CRITICAL */}
      <div className="bg-destructive/5 border-b border-destructive/20">
        <div className="container mx-auto px-4 py-6">
          <EmergencyContacts variant="full" />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                <BoltIcon className="w-7 h-7 text-primary-foreground" />
              </div>
              <div>
                <div className="font-bold text-xl">GPL</div>
                <div className="text-sm text-muted-foreground">
                  Guyana Power & Light Inc.
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Supporting the sustainable development of Guyana through the
              provision of reliable, efficient, and affordable electricity
              services.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <LocationIcon className="w-4 h-4 text-muted-foreground" />
                <span>Duke Street, Kingston, Georgetown, Guyana</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-muted-foreground" />
                <a
                  href="tel:+5922262600"
                  className="hover:text-primary transition-colors"
                >
                  226-2600
                </a>
              </div>
              <div className="flex items-center gap-2">
                <EmailIcon className="w-4 h-4 text-muted-foreground" />
                <a
                  href="mailto:info@gplinc.com"
                  className="hover:text-primary transition-colors"
                >
                  info@gplinc.com
                </a>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Quick Emergency Numbers Bar */}
        <div className="mt-8 pt-6 border-t border-border">
          <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
            <span className="text-sm font-medium text-muted-foreground">
              24/7 Emergency:
            </span>
            {EMERGENCY_CONTACTS.map((contact) => (
              <a
                key={contact.region}
                href={getPhoneHref(contact.primaryNumber)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-3 py-1',
                  'bg-destructive/10 text-destructive rounded-full',
                  'text-sm font-semibold hover:bg-destructive/20 transition-colors'
                )}
              >
                <PhoneIcon className="w-3.5 h-3.5" />
                {contact.region}: {contact.primaryNumber}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-border bg-muted/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              © {currentYear} Guyana Power & Light Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="hover:text-primary transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// SVG Icons

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
        clipRule="evenodd"
      />
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

function LocationIcon({ className }: { className?: string }) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function EmailIcon({ className }: { className?: string }) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
