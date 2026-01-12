import { createFileRoute, Link } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import {
  EMERGENCY_CONTACTS,
  getPhoneHref,
} from '@/lib/emergency-contacts'

export const Route = createFileRoute('/')({
  component: HomePage,
})

/**
 * GPL Homepage
 *
 * Features:
 * - Hero section with company tagline
 * - Quick access to services
 * - Latest news preview
 * - Emergency contacts (always visible)
 * - Quick links
 */
function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Quick Services */}
      <ServicesSection />

      {/* Quick Actions */}
      <QuickActionsSection />

      {/* About Preview */}
      <AboutSection />

      {/* News Preview */}
      <NewsSection />

      {/* CTA Section */}
      <CTASection />
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -left-10 bottom-0 w-64 h-64 rounded-full bg-white/5" />
        <div className="absolute right-1/4 bottom-1/4 w-48 h-48 rounded-full bg-white/5" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Powering Guyana's Future
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
            Providing reliable, efficient, and affordable electricity services
            to support the sustainable development of Guyana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/services"
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'px-6 py-3 rounded-lg font-semibold',
                'bg-white text-primary hover:bg-white/90',
                'transition-colors'
              )}
            >
              <BoltIcon className="w-5 h-5" />
              Our Services
            </Link>
            <Link
              to="/contact"
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'px-6 py-3 rounded-lg font-semibold',
                'bg-primary-foreground/10 text-primary-foreground',
                'border-2 border-primary-foreground/30',
                'hover:bg-primary-foreground/20 transition-colors'
              )}
            >
              <PhoneIcon className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
        </div>

        {/* Emergency Quick Access */}
        <div className="mt-12 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <AlertIcon className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">Power Emergency?</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {EMERGENCY_CONTACTS.map((contact) => (
                <a
                  key={contact.region}
                  href={getPhoneHref(contact.primaryNumber)}
                  className={cn(
                    'inline-flex items-center gap-2 px-4 py-2',
                    'bg-amber-500 text-white rounded-full',
                    'font-bold hover:bg-amber-600 transition-colors'
                  )}
                >
                  <PhoneIcon className="w-4 h-4" />
                  {contact.region}: {contact.primaryNumber}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const SERVICES = [
  {
    title: 'Electricity Supply',
    description: 'Reliable power generation, transmission, and distribution across Guyana.',
    icon: BoltIcon,
    href: '/services#electricity',
  },
  {
    title: 'New Connections',
    description: 'Apply for new electrical service for residential or commercial properties.',
    icon: PlusIcon,
    href: '/services#connections',
  },
  {
    title: 'Report Outage',
    description: 'Report power outages and get real-time status updates for your area.',
    icon: AlertIcon,
    href: '/contact#outage',
  },
  {
    title: 'Street Lighting',
    description: 'Report non-functioning street lights in your neighborhood.',
    icon: LampIcon,
    href: '/contact#streetlight',
  },
  {
    title: 'Billing & Payments',
    description: 'View your bill, make payments, and manage your account online.',
    icon: CreditCardIcon,
    href: '/services#billing',
  },
  {
    title: 'Safety Information',
    description: 'Essential electrical safety tips and emergency procedures.',
    icon: ShieldIcon,
    href: '/safety',
  },
]

function ServicesSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            GPL provides comprehensive electricity services to residential,
            commercial, and industrial customers throughout Guyana.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const Icon = service.icon
            return (
              <Link
                key={service.title}
                to={service.href}
                className={cn(
                  'group p-6 rounded-xl',
                  'bg-card border border-border',
                  'hover:border-primary/50 hover:shadow-lg',
                  'transition-all duration-200'
                )}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground">
                  {service.description}
                </p>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            View all services
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

function QuickActionsSection() {
  return (
    <section className="py-12 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <QuickActionCard
            title="Pay Your Bill"
            description="Quick and secure online payment"
            href="/services#billing"
            icon={CreditCardIcon}
          />
          <QuickActionCard
            title="Report Outage"
            description="Let us know about power issues"
            href="/contact#outage"
            icon={AlertIcon}
          />
          <QuickActionCard
            title="New Connection"
            description="Apply for electrical service"
            href="/services#connections"
            icon={PlusIcon}
          />
          <QuickActionCard
            title="Contact Support"
            description="Get help from our team"
            href="/contact"
            icon={PhoneIcon}
          />
        </div>
      </div>
    </section>
  )
}

interface QuickActionCardProps {
  title: string
  description: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

function QuickActionCard({ title, description, href, icon: Icon }: QuickActionCardProps) {
  return (
    <Link
      to={href}
      className={cn(
        'flex items-center gap-4 p-4 rounded-lg',
        'bg-primary-foreground/10 hover:bg-primary-foreground/20',
        'transition-colors'
      )}
    >
      <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-primary-foreground/80">{description}</p>
      </div>
    </Link>
  )
}

function AboutSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              About Guyana Power & Light
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              Guyana Power & Light Inc. (GPL) is the national electric utility
              company responsible for the generation, transmission, and
              distribution of electricity throughout Guyana.
            </p>
            <p className="text-muted-foreground mb-6">
              Our mission is to support the sustainable development of Guyana
              through the provision of reliable, efficient, and affordable
              electricity services to all our customers.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-3xl font-bold text-primary mb-1">200k+</div>
                <div className="text-sm text-muted-foreground">Customers Served</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50">
                <div className="text-3xl font-bold text-primary mb-1">3</div>
                <div className="text-sm text-muted-foreground">Regions Covered</div>
              </div>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-6 text-primary font-medium hover:underline"
            >
              Learn more about GPL
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center">
                <BoltIcon className="w-16 h-16 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Mock news data - will be replaced with real API data
const MOCK_NEWS = [
  {
    id: '1',
    title: 'Scheduled Maintenance Notice for Berbice Region',
    excerpt: 'GPL will be conducting scheduled maintenance in the Berbice region on Saturday. Please plan accordingly.',
    date: '2026-01-10',
    slug: 'scheduled-maintenance-berbice',
  },
  {
    id: '2',
    title: 'New Customer Service Hours for 2026',
    excerpt: 'Starting January 2026, GPL customer service offices will have extended hours to better serve you.',
    date: '2026-01-08',
    slug: 'new-customer-service-hours-2026',
  },
  {
    id: '3',
    title: 'Safety Tips for Rainy Season',
    excerpt: 'With the rainy season approaching, here are essential electrical safety tips to keep your family safe.',
    date: '2026-01-05',
    slug: 'safety-tips-rainy-season',
  },
]

function NewsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest News & Updates</h2>
            <p className="text-muted-foreground">
              Stay informed about GPL services, scheduled maintenance, and announcements.
            </p>
          </div>
          <Link
            to="/news"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors"
          >
            View all news
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {MOCK_NEWS.map((article) => (
            <article
              key={article.id}
              className={cn(
                'p-6 rounded-xl bg-card border border-border',
                'hover:border-primary/50 hover:shadow-md transition-all'
              )}
            >
              <time className="text-sm text-muted-foreground">
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <h3 className="text-lg font-semibold mt-2 mb-3 hover:text-primary transition-colors">
                <Link to={`/news/${article.slug}`}>
                  {article.title}
                </Link>
              </h3>
              <p className="text-muted-foreground text-sm">
                {article.excerpt}
              </p>
              <Link
                to={`/news/${article.slug}`}
                className="inline-flex items-center gap-1 mt-4 text-sm text-primary font-medium hover:underline"
              >
                Read more
                <ArrowRightIcon className="w-3 h-3" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Have a Question? We're Here to Help
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Our customer service team is ready to assist you with any inquiries
            about your electricity service, billing, or technical support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/faq"
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'px-6 py-3 rounded-lg font-semibold',
                'bg-white text-primary hover:bg-white/90',
                'transition-colors'
              )}
            >
              <HelpIcon className="w-5 h-5" />
              Browse FAQ
            </Link>
            <Link
              to="/contact"
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'px-6 py-3 rounded-lg font-semibold',
                'bg-primary-foreground/10 text-primary-foreground',
                'border-2 border-primary-foreground/30',
                'hover:bg-primary-foreground/20 transition-colors'
              )}
            >
              <PhoneIcon className="w-5 h-5" />
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// SVG Icons

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  )
}

function LampIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}

function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <line x1="5" x2="19" y1="12" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function HelpIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  )
}
