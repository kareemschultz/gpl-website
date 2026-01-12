import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'
import { EmergencyBannerMinimal } from '@/components/emergency-banner'

export const Route = createFileRoute('/faq')({
  component: FAQPage,
})

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

// FAQ data - will be replaced with API data
const FAQ_DATA: FAQ[] = [
  // Billing & Payments
  {
    id: '1',
    category: 'billing',
    question: 'How do I pay my GPL bill?',
    answer: 'You can pay your GPL bill through multiple channels: GPL offices, banks (Republic Bank, Scotiabank, Demerara Bank, Citizens Bank), MMG mobile app, online banking, Bill Express kiosks, and authorized collection agents throughout Guyana.',
  },
  {
    id: '2',
    category: 'billing',
    question: 'What happens if I don\'t pay my bill on time?',
    answer: 'Late payment may result in a late fee being added to your account. If the bill remains unpaid after the grace period, your service may be disconnected. To avoid disconnection, please contact GPL Customer Service to discuss payment arrangements.',
  },
  {
    id: '3',
    category: 'billing',
    question: 'How is my electricity bill calculated?',
    answer: 'Your bill is calculated based on your electricity consumption measured in kilowatt-hours (kWh), multiplied by the applicable rate. Additional charges may include fuel surcharge, demand charges for commercial accounts, and any applicable taxes or fees.',
  },
  {
    id: '4',
    category: 'billing',
    question: 'Can I get a copy of my bill history?',
    answer: 'Yes, you can request a copy of your billing history at any GPL customer service office. Please bring a valid ID and your account number. In the future, you\'ll be able to view your history online through our customer portal.',
  },
  // Connections
  {
    id: '5',
    category: 'connections',
    question: 'How do I apply for a new electrical connection?',
    answer: 'Visit any GPL office with your ID, proof of property ownership or rental agreement, and a completed application form. Pay the required connection fee, and GPL will schedule an inspection and installation within 7-14 business days.',
  },
  {
    id: '6',
    category: 'connections',
    question: 'What are the requirements for a new connection?',
    answer: 'Requirements include: valid ID, proof of property ownership or rental agreement, completed application form, and payment of connection fee. Your property must also meet GPL\'s electrical safety standards.',
  },
  {
    id: '7',
    category: 'connections',
    question: 'How long does it take to get connected?',
    answer: 'After submitting your application and completing all requirements, connections are typically completed within 7-14 business days, depending on your location and the complexity of the installation.',
  },
  // Outages
  {
    id: '8',
    category: 'outages',
    question: 'How do I report a power outage?',
    answer: 'Call your regional emergency line immediately: Demerara: 0475 or 226-2600, Berbice: 333-2186, Essequibo: 771-4244. You can also report outages through our website contact form.',
  },
  {
    id: '9',
    category: 'outages',
    question: 'How long will a power outage last?',
    answer: 'Outage duration varies depending on the cause. Simple issues may be resolved within hours, while major damage from storms may take longer. GPL works to restore power as quickly and safely as possible.',
  },
  {
    id: '10',
    category: 'outages',
    question: 'Will I be compensated for losses during an outage?',
    answer: 'GPL is not typically liable for damages resulting from outages unless caused by gross negligence. We recommend using surge protectors for sensitive equipment and having backup power for critical needs.',
  },
  // Street Lights
  {
    id: '11',
    category: 'streetlights',
    question: 'How do I report a faulty street light?',
    answer: 'Report faulty street lights through our website contact form, by calling customer service at 226-2600, or by visiting a GPL office. Provide the location, pole number (if visible), and nature of the problem.',
  },
  {
    id: '12',
    category: 'streetlights',
    question: 'How long does it take to fix a street light?',
    answer: 'Simple repairs are typically completed within 3-5 business days. More complex issues requiring pole replacement or major repairs may take longer. Emergency situations are prioritized.',
  },
  // Safety
  {
    id: '13',
    category: 'safety',
    question: 'What should I do if I see a downed power line?',
    answer: 'STAY AT LEAST 35 FEET AWAY! Assume all downed lines are energized and deadly. Never touch or go near the line, anything touching it, or drive over it. Call GPL emergency immediately and keep others away.',
  },
  {
    id: '14',
    category: 'safety',
    question: 'Is it safe to use electrical appliances during a storm?',
    answer: 'During lightning storms, it\'s safest to avoid using corded phones, plumbing, and electronic devices connected to outlets. Unplug sensitive electronics to protect them from power surges.',
  },
  {
    id: '15',
    category: 'safety',
    question: 'Can I trim trees near power lines myself?',
    answer: 'NO. Never trim trees near power lines yourself. This is extremely dangerous and can result in electrocution. Contact GPL at 226-2600 to request tree trimming near power lines.',
  },
  // Customer Service
  {
    id: '16',
    category: 'customer_service',
    question: 'What are GPL\'s customer service hours?',
    answer: 'GPL customer service offices are open Monday through Friday, 8:00 AM to 4:00 PM. Emergency lines are available 24/7.',
  },
  {
    id: '17',
    category: 'customer_service',
    question: 'How can I update my account information?',
    answer: 'Visit any GPL customer service office with a valid ID to update your account information, including name changes, address changes, or contact information updates.',
  },
  // Technical
  {
    id: '18',
    category: 'technical',
    question: 'My meter seems to be running fast. What should I do?',
    answer: 'If you believe your meter is not reading accurately, contact GPL to request a meter test. A technician will test your meter, and if it\'s found to be faulty, it will be replaced and your bill adjusted accordingly.',
  },
  {
    id: '19',
    category: 'technical',
    question: 'What is a prepaid meter and how does it work?',
    answer: 'A prepaid meter allows you to pay for electricity before you use it. You purchase credit at authorized vendors, enter the code into your meter, and use electricity until the credit runs out. It helps you manage your budget.',
  },
  // Account
  {
    id: '20',
    category: 'account',
    question: 'How do I transfer my account to a new address?',
    answer: 'Visit a GPL office with your current account details and proof of your new address. Request a disconnection at your old address and a new connection at your new address. Transfer fees may apply.',
  },
  {
    id: '21',
    category: 'account',
    question: 'Can I put my account on hold temporarily?',
    answer: 'Yes, if you\'ll be away for an extended period, you can request a temporary disconnection. Contact GPL customer service to arrange this. Reconnection fees will apply when you return.',
  },
  // Emergency
  {
    id: '22',
    category: 'emergency',
    question: 'What should I do in case of an electrical fire?',
    answer: 'If safe to do so, turn off power at the main breaker. Never use water on an electrical fire. Use a Class C fire extinguisher if available. Evacuate and call emergency services immediately.',
  },
  {
    id: '23',
    category: 'emergency',
    question: 'I smell burning near my electrical panel. What should I do?',
    answer: 'Turn off the main breaker immediately if safe to do so. Do not touch the panel if you see sparks or smoke. Evacuate your home and call GPL emergency and fire services.',
  },
]

const CATEGORIES = [
  { id: 'all', label: 'All Questions', icon: <GridIcon className="w-4 h-4" /> },
  { id: 'billing', label: 'Billing & Payments', icon: <CreditCardIcon className="w-4 h-4" /> },
  { id: 'connections', label: 'New Connections', icon: <PlusIcon className="w-4 h-4" /> },
  { id: 'outages', label: 'Outages & Emergencies', icon: <AlertIcon className="w-4 h-4" /> },
  { id: 'streetlights', label: 'Street Lights', icon: <LampIcon className="w-4 h-4" /> },
  { id: 'safety', label: 'Safety', icon: <ShieldIcon className="w-4 h-4" /> },
  { id: 'customer_service', label: 'Customer Service', icon: <HeadphonesIcon className="w-4 h-4" /> },
  { id: 'technical', label: 'Technical', icon: <SettingsIcon className="w-4 h-4" /> },
  { id: 'account', label: 'Account Management', icon: <UserIcon className="w-4 h-4" /> },
  { id: 'emergency', label: 'Emergency Preparedness', icon: <SirenIcon className="w-4 h-4" /> },
]

function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const filteredFAQs = useMemo(() => {
    let faqs = FAQ_DATA

    // Filter by category
    if (activeCategory !== 'all') {
      faqs = faqs.filter(faq => faq.category === activeCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      faqs = faqs.filter(
        faq =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      )
    }

    return faqs
  }, [activeCategory, searchQuery])

  const toggleFAQ = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const expandAll = () => {
    setExpandedIds(new Set(filteredFAQs.map(faq => faq.id)))
  }

  const collapseAll = () => {
    setExpandedIds(new Set())
  }

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Find answers to common questions about GPL services, billing, connections, and more.
          </p>
        </div>
      </section>

      {/* Emergency Reminder */}
      <div className="container mx-auto px-4 py-4">
        <EmergencyBannerMinimal />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar - Categories & Search */}
          <div className="lg:col-span-1">
            {/* Search */}
            <div className="mb-6">
              <label htmlFor="search" className="sr-only">Search FAQs</label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="search"
                  id="search"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={cn(
                    'w-full pl-10 pr-4 py-2 rounded-lg',
                    'border border-input bg-background',
                    'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
                  )}
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <h2 className="font-semibold mb-3">Categories</h2>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left text-sm transition-colors',
                      activeCategory === cat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    )}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-8 p-4 rounded-lg bg-muted/30 border border-border">
              <h3 className="font-semibold mb-3">Can't find what you need?</h3>
              <div className="space-y-2 text-sm">
                <Link
                  to="/contact"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <MailIcon className="w-4 h-4" />
                  Contact Us
                </Link>
                <Link
                  to="/safety"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <ShieldIcon className="w-4 h-4" />
                  Safety Information
                </Link>
                <a
                  href="tel:+5922262600"
                  className="flex items-center gap-2 text-primary hover:underline"
                >
                  <PhoneIcon className="w-4 h-4" />
                  Call 226-2600
                </a>
              </div>
            </div>
          </div>

          {/* FAQ List */}
          <div className="lg:col-span-3">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={expandAll}
                  className="text-sm text-primary hover:underline"
                >
                  Expand all
                </button>
                <span className="text-muted-foreground">|</span>
                <button
                  onClick={collapseAll}
                  className="text-sm text-primary hover:underline"
                >
                  Collapse all
                </button>
              </div>
            </div>

            {/* FAQ Items */}
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <SearchIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No questions found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or category filter.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <FAQItem
                    key={faq.id}
                    faq={faq}
                    isExpanded={expandedIds.has(faq.id)}
                    onToggle={() => toggleFAQ(faq.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Contact CTA */}
      <section className="bg-muted/30 py-12 mt-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our customer service team is here to help with any questions not covered above.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  )
}

interface FAQItemProps {
  faq: FAQ
  isExpanded: boolean
  onToggle: () => void
}

function FAQItem({ faq, isExpanded, onToggle }: FAQItemProps) {
  const categoryLabel = CATEGORIES.find(c => c.id === faq.category)?.label || faq.category

  return (
    <div
      id={faq.category}
      className={cn(
        'rounded-lg border border-border overflow-hidden',
        'transition-all duration-200',
        isExpanded ? 'bg-card shadow-sm' : 'bg-background hover:bg-muted/30'
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-4 text-left"
        aria-expanded={isExpanded}
      >
        <div className={cn(
          'flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors',
          isExpanded ? 'bg-primary text-primary-foreground' : 'bg-muted'
        )}>
          <ChevronIcon className={cn(
            'w-4 h-4 transition-transform',
            isExpanded && 'rotate-180'
          )} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            {categoryLabel}
          </span>
          <h3 className="font-semibold mt-1">{faq.question}</h3>
        </div>
      </button>
      {isExpanded && (
        <div className="px-4 pb-4 pl-14">
          <p className="text-muted-foreground whitespace-pre-line">{faq.answer}</p>
        </div>
      )}
    </div>
  )
}

// Icons
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" x2="16.65" y1="21" y2="16.65" />
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function GridIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
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

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  )
}

function AlertIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
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

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
}

function HeadphonesIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    </svg>
  )
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function SirenIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M7 12a5 5 0 0 1 5-5v0a5 5 0 0 1 5 5v6H7v-6Z" />
      <path d="M5 20a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1H5v-1Z" />
      <path d="M21 12h1" />
      <path d="M18.5 4.5 18 5" />
      <path d="M2 12h1" />
      <path d="M12 2v1" />
      <path d="m4.929 4.929.707.707" />
      <path d="M12 12v6" />
    </svg>
  )
}

function MailIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}
