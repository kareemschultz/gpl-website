import { createFileRoute, Link } from '@tanstack/react-router'
import { EmergencyBannerMinimal } from '@/components/emergency-banner'

export const Route = createFileRoute('/services')({
  component: ServicesPage,
})

/**
 * Services Page
 *
 * Displays all GPL services with details and links to relevant forms/contacts.
 */
function ServicesPage() {
  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            GPL provides comprehensive electricity services to residential,
            commercial, and industrial customers throughout Guyana.
          </p>
        </div>
      </section>

      {/* Emergency Reminder */}
      <div className="container mx-auto px-4 py-4">
        <EmergencyBannerMinimal />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-12">
          {/* Electricity Supply */}
          <ServiceSection
            id="electricity"
            title="Electricity Supply"
            icon={<BoltIcon className="w-8 h-8" />}
          >
            <p className="text-muted-foreground mb-4">
              GPL is responsible for the generation, transmission, and distribution
              of electricity throughout Guyana. We operate power plants and maintain
              an extensive network of transmission and distribution lines to bring
              electricity to your home or business.
            </p>
            <div className="grid gap-4 md:grid-cols-3 mt-6">
              <ServiceFeature
                title="Generation"
                description="Power plants across the country generate electricity to meet national demand."
              />
              <ServiceFeature
                title="Transmission"
                description="High-voltage lines carry electricity from power plants to substations."
              />
              <ServiceFeature
                title="Distribution"
                description="Local lines deliver electricity from substations to your premises."
              />
            </div>
          </ServiceSection>

          {/* New Connections */}
          <ServiceSection
            id="connections"
            title="New Connections"
            icon={<PlusIcon className="w-8 h-8" />}
          >
            <p className="text-muted-foreground mb-4">
              Whether you're building a new home, starting a business, or need
              additional electrical service, GPL can help you get connected.
            </p>
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <div className="p-6 rounded-lg bg-muted/30 border border-border">
                <h4 className="font-semibold mb-3">Residential Connections</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-primary mt-0.5" />
                    Single-phase service for homes
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-primary mt-0.5" />
                    Standard and high-capacity options
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-primary mt-0.5" />
                    Meter installation included
                  </li>
                </ul>
              </div>
              <div className="p-6 rounded-lg bg-muted/30 border border-border">
                <h4 className="font-semibold mb-3">Commercial Connections</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-primary mt-0.5" />
                    Three-phase service available
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-primary mt-0.5" />
                    High-capacity industrial connections
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckIcon className="w-4 h-4 text-primary mt-0.5" />
                    Dedicated support for businesses
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-3">How to Apply</h4>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">1</span>
                  <span>Submit an application at any GPL office or online</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">2</span>
                  <span>Provide required documents (ID, property ownership proof)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">3</span>
                  <span>Pay connection fee and wait for installation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">4</span>
                  <span>GPL will inspect and connect your service</span>
                </li>
              </ol>
            </div>
            <div className="mt-6">
              <Link
                to="/contact#service-request"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Apply for New Connection
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
          </ServiceSection>

          {/* Billing & Payments */}
          <ServiceSection
            id="billing"
            title="Billing & Payments"
            icon={<CreditCardIcon className="w-8 h-8" />}
          >
            <p className="text-muted-foreground mb-4">
              GPL offers multiple convenient ways to view and pay your electricity bill.
              Stay on top of your account to avoid service interruptions.
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
              <PaymentMethod
                title="GPL Offices"
                description="Pay in person at any GPL customer service office during business hours."
                icon={<BuildingIcon className="w-6 h-6" />}
              />
              <PaymentMethod
                title="Banks"
                description="Pay at Republic Bank, Scotiabank, Demerara Bank, or Citizens Bank."
                icon={<BankIcon className="w-6 h-6" />}
              />
              <PaymentMethod
                title="MMG Mobile"
                description="Use the MMG mobile app for convenient payments from your phone."
                icon={<PhoneIcon className="w-6 h-6" />}
              />
              <PaymentMethod
                title="Online Banking"
                description="Pay through your bank's online banking platform."
                icon={<GlobeIcon className="w-6 h-6" />}
              />
              <PaymentMethod
                title="Bill Express"
                description="Use Bill Express kiosks located throughout Guyana."
                icon={<TerminalIcon className="w-6 h-6" />}
              />
              <PaymentMethod
                title="Authorized Agents"
                description="Pay at authorized collection agents in your area."
                icon={<StoreIcon className="w-6 h-6" />}
              />
            </div>
            <div className="mt-8 p-6 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-semibold mb-2">Understanding Your Bill</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Your GPL bill includes your electricity consumption (kWh), applicable
                rates, fuel surcharge, and any other charges. Bills are issued monthly
                and should be paid by the due date to avoid disconnection.
              </p>
              <Link
                to="/faq#billing"
                className="text-sm text-primary font-medium hover:underline"
              >
                View billing FAQ →
              </Link>
            </div>
          </ServiceSection>

          {/* Disconnection & Reconnection */}
          <ServiceSection
            id="disconnection"
            title="Disconnection & Reconnection"
            icon={<PlugIcon className="w-8 h-8" />}
          >
            <p className="text-muted-foreground mb-4">
              If your service has been disconnected for non-payment or you need to
              temporarily disconnect your service, here's what you need to know.
            </p>
            <div className="grid gap-6 md:grid-cols-2 mt-6">
              <div className="p-6 rounded-lg bg-destructive/5 border border-destructive/20">
                <h4 className="font-semibold text-destructive mb-3">Disconnection</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Service may be disconnected for unpaid bills</li>
                  <li>• You will receive notice before disconnection</li>
                  <li>• Tampering with meter leads to disconnection</li>
                  <li>• Safety violations require immediate disconnection</li>
                </ul>
              </div>
              <div className="p-6 rounded-lg bg-green-50 border border-green-200 dark:bg-green-950/20 dark:border-green-900">
                <h4 className="font-semibold text-green-700 dark:text-green-400 mb-3">Reconnection</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Pay outstanding balance in full</li>
                  <li>• Pay reconnection fee</li>
                  <li>• Service typically restored within 24-48 hours</li>
                  <li>• Contact customer service for urgent requests</li>
                </ul>
              </div>
            </div>
          </ServiceSection>

          {/* Street Lighting */}
          <ServiceSection
            id="streetlights"
            title="Street Lighting"
            icon={<LampIcon className="w-8 h-8" />}
          >
            <p className="text-muted-foreground mb-4">
              GPL is responsible for maintaining street lights in many areas of Guyana.
              If you notice a street light that isn't working, please report it so we
              can ensure your neighborhood stays safe and well-lit.
            </p>
            <div className="mt-6 p-6 rounded-lg bg-muted/30 border border-border">
              <h4 className="font-semibold mb-3">Report a Faulty Street Light</h4>
              <p className="text-sm text-muted-foreground mb-4">
                To report a non-functioning street light, please provide:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-primary" />
                  Location (street name, nearest landmark)
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-primary" />
                  Pole number (if visible)
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-primary" />
                  Nature of the problem (not working, flickering, broken)
                </li>
              </ul>
              <Link
                to="/contact#streetlight"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
              >
                Report Street Light Issue
              </Link>
            </div>
          </ServiceSection>

          {/* Meter Services */}
          <ServiceSection
            id="meters"
            title="Meter Services"
            icon={<GaugeIcon className="w-8 h-8" />}
          >
            <p className="text-muted-foreground mb-4">
              Your electricity meter measures your consumption. GPL provides various
              meter-related services to ensure accurate billing and reliable service.
            </p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
              <ServiceFeature
                title="Meter Reading"
                description="Regular meter readings ensure accurate billing based on actual consumption."
              />
              <ServiceFeature
                title="Meter Testing"
                description="Request a meter test if you believe your meter is not reading accurately."
              />
              <ServiceFeature
                title="Meter Relocation"
                description="Need to move your meter? We can help with relocation services."
              />
              <ServiceFeature
                title="Prepaid Meters"
                description="Consider switching to a prepaid meter for better budget control."
              />
              <ServiceFeature
                title="Smart Meters"
                description="Advanced meters with remote reading capabilities (select areas)."
              />
              <ServiceFeature
                title="Meter Repairs"
                description="Report meter damage or malfunction for prompt repair."
              />
            </div>
          </ServiceSection>
        </div>
      </main>

      {/* Contact CTA */}
      <section className="bg-muted/30 py-12 mt-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help with Our Services?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our customer service team is here to assist you with any questions about
            our services or to help you get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-accent transition-colors font-semibold"
            >
              View FAQ
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

interface ServiceSectionProps {
  id: string
  title: string
  icon: React.ReactNode
  children: React.ReactNode
}

function ServiceSection({ id, title, icon, children }: ServiceSectionProps) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>
      <div className="pl-0 md:pl-[4.5rem]">
        {children}
      </div>
    </section>
  )
}

interface ServiceFeatureProps {
  title: string
  description: string
}

function ServiceFeature({ title, description }: ServiceFeatureProps) {
  return (
    <div className="p-4 rounded-lg bg-card border border-border">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

interface PaymentMethodProps {
  title: string
  description: string
  icon: React.ReactNode
}

function PaymentMethod({ title, description, icon }: PaymentMethodProps) {
  return (
    <div className="p-4 rounded-lg bg-card border border-border flex items-start gap-4">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

// Icons
function BoltIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
    </svg>
  )
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  )
}

function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  )
}

function PlugIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a6 6 0 0 1-6 6 6 6 0 0 1-6-6V8Z" />
    </svg>
  )
}

function LampIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  )
}

function GaugeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="m12 14 4-4" />
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  )
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <line x1="5" x2="19" y1="12" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect width="16" height="20" x="4" y="2" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}

function BankIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="m3 21 18 0" />
      <path d="m3 10 18 0" />
      <path d="M5 6l7-3 7 3" />
      <path d="M4 10v11" />
      <path d="M20 10v11" />
      <path d="M8 14v3" />
      <path d="M12 14v3" />
      <path d="M16 14v3" />
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect width="14" height="20" x="5" y="2" rx="2" />
      <path d="M12 18h.01" />
    </svg>
  )
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  )
}

function StoreIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2 2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7" />
    </svg>
  )
}
