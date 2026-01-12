import { createFileRoute } from '@tanstack/react-router'
import { cn } from '@/lib/utils'
import { EMERGENCY_CONTACTS, getPhoneHref } from '@/lib/emergency-contacts'

export const Route = createFileRoute('/safety')({
  component: SafetyPage,
})

/**
 * Safety Page
 *
 * CRITICAL SAFETY CONTENT
 * This page contains essential electrical safety information that could save lives.
 * Emergency contacts must be prominently displayed.
 */
function SafetyPage() {
  return (
    <div className="flex flex-col">
      {/* Emergency Header - CRITICAL */}
      <section className="bg-destructive text-destructive-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertTriangleIcon className="w-10 h-10" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Electrical Safety</h1>
                <p className="text-destructive-foreground/90">Your safety is our priority</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {EMERGENCY_CONTACTS.map((contact) => (
                <a
                  key={contact.region}
                  href={getPhoneHref(contact.primaryNumber)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-destructive rounded-full font-bold hover:bg-white/90 transition-colors"
                >
                  <PhoneIcon className="w-4 h-4" />
                  {contact.region}: {contact.primaryNumber}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Critical Warning */}
        <div className="bg-destructive/10 border-2 border-destructive rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangleIcon className="w-8 h-8 text-destructive flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-destructive mb-2">
                CRITICAL: Downed Power Lines
              </h2>
              <p className="text-lg mb-4">
                If you see a downed power line, <strong>STAY AT LEAST 35 FEET (10 METERS) AWAY</strong>.
                Assume ALL downed lines are energized and deadly.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <XIcon className="w-4 h-4 text-destructive" />
                  <strong>NEVER</strong> touch or go near a downed line
                </li>
                <li className="flex items-center gap-2">
                  <XIcon className="w-4 h-4 text-destructive" />
                  <strong>NEVER</strong> touch anything touching the line (fences, cars, trees)
                </li>
                <li className="flex items-center gap-2">
                  <XIcon className="w-4 h-4 text-destructive" />
                  <strong>NEVER</strong> drive over a downed line
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-green-600" />
                  Call GPL emergency immediately
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon className="w-4 h-4 text-green-600" />
                  Keep others away from the area
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid gap-12">
          {/* General Safety Rules */}
          <SafetySection
            id="general"
            title="General Electrical Safety"
            icon={<ShieldIcon className="w-8 h-8" />}
            variant="default"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <SafetyTip
                title="Respect Electricity"
                description="Electricity can kill. Always treat electrical equipment with caution and respect."
              />
              <SafetyTip
                title="Don't Overload Outlets"
                description="Avoid plugging multiple high-powered devices into a single outlet. Use power strips with surge protection."
              />
              <SafetyTip
                title="Keep Water Away"
                description="Never use electrical appliances near water. Keep hands dry when touching switches or plugs."
              />
              <SafetyTip
                title="Check for Damage"
                description="Inspect cords and plugs regularly. Replace any that are frayed, cracked, or damaged."
              />
              <SafetyTip
                title="Professional Installation"
                description="Always use a licensed electrician for electrical work. DIY electrical work is dangerous."
              />
              <SafetyTip
                title="Know Your Panel"
                description="Learn where your main electrical panel is and how to shut off power in an emergency."
              />
            </div>
          </SafetySection>

          {/* Storm Safety */}
          <SafetySection
            id="storm"
            title="Storm & Weather Safety"
            icon={<CloudIcon className="w-8 h-8" />}
            variant="warning"
          >
            <div className="p-6 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 mb-6">
              <h4 className="font-bold mb-2">Before a Storm:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 text-yellow-600 mt-0.5" />
                  Charge phones and essential devices
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 text-yellow-600 mt-0.5" />
                  Have flashlights and batteries ready
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 text-yellow-600 mt-0.5" />
                  Unplug sensitive electronics
                </li>
                <li className="flex items-start gap-2">
                  <CheckIcon className="w-4 h-4 text-yellow-600 mt-0.5" />
                  Know your regional emergency number
                </li>
              </ul>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <SafetyTip
                title="During Lightning"
                description="Stay indoors. Avoid using landline phones, plumbing, or touching electrical equipment."
              />
              <SafetyTip
                title="After a Storm"
                description="Check for downed lines before going outside. Report any damage to GPL immediately."
              />
              <SafetyTip
                title="Flooding"
                description="Never touch electrical equipment in flooded areas. Turn off power at the main breaker if safe."
              />
              <SafetyTip
                title="Generator Safety"
                description="Never run generators indoors. Keep them outside and away from windows."
              />
            </div>
          </SafetySection>

          {/* Generator Safety */}
          <SafetySection
            id="generator"
            title="Generator Safety"
            icon={<BoltIcon className="w-8 h-8" />}
            variant="danger"
          >
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mb-6">
              <p className="text-lg font-bold text-destructive mb-2">
                WARNING: Carbon Monoxide Kills
              </p>
              <p>
                NEVER run a generator indoors, in a garage, or near windows.
                Carbon monoxide is odorless and can kill within minutes.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <SafetyTip
                title="Outdoor Use Only"
                description="Always place generators outside, at least 20 feet from your home, with exhaust pointing away."
              />
              <SafetyTip
                title="Dry Conditions"
                description="Never operate a generator in rain or wet conditions. Use a canopy that's open on all sides."
              />
              <SafetyTip
                title="Proper Fueling"
                description="Turn off and let cool before refueling. Never refuel while running."
              />
              <SafetyTip
                title="Don't Backfeed"
                description="Never plug a generator into a wall outlet. This can electrocute utility workers."
              />
              <SafetyTip
                title="Extension Cords"
                description="Use heavy-duty outdoor extension cords. Never run cords under rugs or through doorways."
              />
              <SafetyTip
                title="Load Limits"
                description="Don't overload your generator. Add up the wattage of devices you want to power."
              />
            </div>
          </SafetySection>

          {/* Vehicle Safety */}
          <SafetySection
            id="vehicle"
            title="Vehicle & Power Line Safety"
            icon={<CarIcon className="w-8 h-8" />}
            variant="danger"
          >
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-destructive/10 border border-destructive/30">
                <h4 className="font-bold text-destructive mb-3">If a Power Line Falls on Your Vehicle:</h4>
                <ol className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-sm font-bold">1</span>
                    <span><strong>STAY INSIDE</strong> the vehicle. You are safer inside.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-sm font-bold">2</span>
                    <span>Call GPL emergency and wait for help.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-sm font-bold">3</span>
                    <span>Honk horn, roll down window, yell for help.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-sm font-bold">4</span>
                    <span>Warn others to stay away.</span>
                  </li>
                </ol>
              </div>
              <div className="p-6 rounded-lg bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900">
                <h4 className="font-bold mb-3">Only Exit If Vehicle Is on Fire:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• Jump clear of the vehicle - do not step out</li>
                  <li>• Land with feet together</li>
                  <li>• Shuffle away with feet touching the ground</li>
                  <li>• Do not touch the vehicle and ground simultaneously</li>
                </ul>
              </div>
            </div>
          </SafetySection>

          {/* Working Near Power Lines */}
          <SafetySection
            id="work"
            title="Working Near Power Lines"
            icon={<HardHatIcon className="w-8 h-8" />}
            variant="warning"
          >
            <div className="bg-primary/10 border border-primary/30 rounded-lg p-6 mb-6">
              <p className="text-lg font-bold mb-2">
                ALWAYS Call GPL at 226-2600 Before Working Near Lines
              </p>
              <p>
                If you're doing construction, tree trimming, or any work near power lines,
                contact GPL first for safety guidance.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <SafetyTip
                title="Maintain Distance"
                description="Keep ladders, scaffolds, and equipment at least 10 feet from power lines."
              />
              <SafetyTip
                title="Tree Trimming"
                description="Never trim trees near power lines yourself. Contact GPL for professional service."
              />
              <SafetyTip
                title="Construction"
                description="Before digging or excavation, call GPL to locate underground cables."
              />
              <SafetyTip
                title="Kites & Drones"
                description="Keep kites, drones, and model aircraft away from power lines."
              />
            </div>
          </SafetySection>

          {/* Home Safety */}
          <SafetySection
            id="home"
            title="Home Electrical Safety"
            icon={<HomeIcon className="w-8 h-8" />}
            variant="default"
          >
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <SafetyTip
                title="GFCI Outlets"
                description="Install Ground Fault Circuit Interrupter outlets in bathrooms, kitchens, and outdoor areas."
              />
              <SafetyTip
                title="Smoke Detectors"
                description="Install smoke detectors and test them monthly. Replace batteries yearly."
              />
              <SafetyTip
                title="Space Heaters"
                description="Keep space heaters 3 feet from flammable materials. Never leave unattended."
              />
              <SafetyTip
                title="Extension Cords"
                description="Extension cords are for temporary use. Install permanent outlets if needed."
              />
              <SafetyTip
                title="Appliance Safety"
                description="Unplug small appliances when not in use. Never use with wet hands."
              />
              <SafetyTip
                title="Children Safety"
                description="Use outlet covers. Teach children about electrical dangers."
              />
            </div>
          </SafetySection>

          {/* First Aid */}
          <SafetySection
            id="firstaid"
            title="Electrical Shock First Aid"
            icon={<HeartIcon className="w-8 h-8" />}
            variant="danger"
          >
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-6 mb-6">
              <p className="text-lg font-bold mb-4">If Someone Is Being Electrocuted:</p>
              <ol className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-sm font-bold">1</span>
                  <span><strong>DO NOT</strong> touch the person if they're still in contact with the source</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-sm font-bold">2</span>
                  <span>Turn off the power source if possible</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-sm font-bold">3</span>
                  <span>Use a dry, non-conductive object (wood, plastic) to separate person from source</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-sm font-bold">4</span>
                  <span>Call emergency services immediately</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-sm font-bold">5</span>
                  <span>Begin CPR if the person is not breathing</span>
                </li>
              </ol>
            </div>
            <div className="p-6 rounded-lg bg-muted/50 border border-border">
              <h4 className="font-bold mb-2">After an Electrical Shock:</h4>
              <p className="text-sm text-muted-foreground">
                Even if the person seems fine, seek medical attention immediately.
                Internal injuries from electrical shock may not be immediately apparent.
              </p>
            </div>
          </SafetySection>
        </div>
      </main>

      {/* Emergency Contact Footer */}
      <section className="bg-destructive text-destructive-foreground py-8 mt-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Emergency Contacts</h2>
            <p>Available 24/7 for power emergencies</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {EMERGENCY_CONTACTS.map((contact) => (
              <a
                key={contact.region}
                href={getPhoneHref(contact.primaryNumber)}
                className="inline-flex flex-col items-center gap-1 px-6 py-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <span className="font-bold text-2xl">{contact.primaryNumber}</span>
                <span className="text-sm">{contact.region}</span>
              </a>
            ))}
          </div>
          <p className="text-center mt-6 text-sm text-destructive-foreground/80">
            For downed power lines, electrical fires, or life-threatening emergencies,
            call immediately and keep others away from danger.
          </p>
        </div>
      </section>
    </div>
  )
}

interface SafetySectionProps {
  id: string
  title: string
  icon: React.ReactNode
  variant: 'default' | 'warning' | 'danger'
  children: React.ReactNode
}

function SafetySection({ id, title, icon, variant, children }: SafetySectionProps) {
  const borderClass = {
    default: 'border-l-primary',
    warning: 'border-l-yellow-500',
    danger: 'border-l-destructive',
  }[variant]

  return (
    <section id={id} className={cn('scroll-mt-20 border-l-4 pl-6', borderClass)}>
      <div className="flex items-center gap-4 mb-6">
        <div className={cn(
          'w-14 h-14 rounded-xl flex items-center justify-center',
          variant === 'danger' ? 'bg-destructive/10 text-destructive' :
          variant === 'warning' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-500' :
          'bg-primary/10 text-primary'
        )}>
          {icon}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>
      {children}
    </section>
  )
}

interface SafetyTipProps {
  title: string
  description: string
}

function SafetyTip({ title, description }: SafetyTipProps) {
  return (
    <div className="p-4 rounded-lg bg-card border border-border">
      <h4 className="font-semibold mb-2">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

// Icons
function AlertTriangleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
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

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  )
}

function CloudIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  )
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
    </svg>
  )
}

function CarIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}

function HardHatIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
      <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
      <path d="M4 15v-3a6 6 0 0 1 6-6h0" />
      <path d="M14 6h0a6 6 0 0 1 6 6v3" />
    </svg>
  )
}

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
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

function XIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <line x1="18" x2="6" y1="6" y2="18" />
      <line x1="6" x2="18" y1="6" y2="18" />
    </svg>
  )
}
