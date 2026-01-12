import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { EmergencyBannerMinimal } from '@/components/emergency-banner'
import { EMERGENCY_CONTACTS, getPhoneHref } from '@/lib/emergency-contacts'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

type FormType = 'general' | 'outage' | 'streetlight' | 'service-request' | 'feedback'

/**
 * Contact Page
 *
 * Contains multiple forms:
 * - General contact form
 * - Outage report form
 * - Street light report form
 * - Service request form
 * - Feedback form
 */
function ContactPage() {
  const [activeForm, setActiveForm] = useState<FormType>('general')

  return (
    <div className="flex flex-col">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-primary-foreground/90 max-w-2xl">
            Get in touch with GPL for inquiries, service requests, or to report issues.
            We're here to help.
          </p>
        </div>
      </section>

      {/* Emergency Reminder */}
      <div className="container mx-auto px-4 py-4">
        <EmergencyBannerMinimal />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column - Contact Info & Form Selector */}
          <div className="lg:col-span-1">
            {/* Quick Contact Info */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <ContactInfo
                  icon={<LocationIcon className="w-5 h-5" />}
                  label="Address"
                  value="Duke Street, Kingston, Georgetown, Guyana"
                />
                <ContactInfo
                  icon={<PhoneIcon className="w-5 h-5" />}
                  label="Customer Service"
                  value="226-2600"
                  href="tel:+5922262600"
                />
                <ContactInfo
                  icon={<ClockIcon className="w-5 h-5" />}
                  label="Office Hours"
                  value="Mon-Fri 8AM-4PM"
                />
                <ContactInfo
                  icon={<MailIcon className="w-5 h-5" />}
                  label="Email"
                  value="info@gplinc.com"
                  href="mailto:info@gplinc.com"
                />
              </div>
            </div>

            {/* Emergency Numbers */}
            <div className="mb-8 p-4 rounded-lg bg-destructive/5 border border-destructive/20">
              <h3 className="font-bold text-destructive mb-3 flex items-center gap-2">
                <AlertIcon className="w-5 h-5" />
                24/7 Emergency Lines
              </h3>
              <div className="space-y-2">
                {EMERGENCY_CONTACTS.map((contact) => (
                  <a
                    key={contact.region}
                    href={getPhoneHref(contact.primaryNumber)}
                    className="flex items-center justify-between p-2 rounded hover:bg-destructive/10 transition-colors"
                  >
                    <span className="font-medium">{contact.region}</span>
                    <span className="font-bold text-destructive">{contact.primaryNumber}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Form Type Selector */}
            <div className="mb-8">
              <h3 className="font-semibold mb-3">Select Inquiry Type</h3>
              <div className="space-y-2">
                <FormTab
                  active={activeForm === 'general'}
                  onClick={() => setActiveForm('general')}
                  icon={<MailIcon className="w-4 h-4" />}
                  label="General Inquiry"
                />
                <FormTab
                  active={activeForm === 'outage'}
                  onClick={() => setActiveForm('outage')}
                  icon={<AlertIcon className="w-4 h-4" />}
                  label="Report Outage"
                />
                <FormTab
                  active={activeForm === 'streetlight'}
                  onClick={() => setActiveForm('streetlight')}
                  icon={<LampIcon className="w-4 h-4" />}
                  label="Street Light Issue"
                />
                <FormTab
                  active={activeForm === 'service-request'}
                  onClick={() => setActiveForm('service-request')}
                  icon={<PlusIcon className="w-4 h-4" />}
                  label="Service Request"
                />
                <FormTab
                  active={activeForm === 'feedback'}
                  onClick={() => setActiveForm('feedback')}
                  icon={<MessageIcon className="w-4 h-4" />}
                  label="Feedback"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Forms */}
          <div className="lg:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              {activeForm === 'general' && <GeneralContactForm />}
              {activeForm === 'outage' && <OutageReportForm />}
              {activeForm === 'streetlight' && <StreetLightForm />}
              {activeForm === 'service-request' && <ServiceRequestForm />}
              {activeForm === 'feedback' && <FeedbackForm />}
            </div>
          </div>
        </div>

        {/* Office Locations */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">GPL Offices</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <OfficeCard
              name="Head Office"
              address="Duke Street, Kingston, Georgetown"
              phone="226-2600 / 227-2654"
              hours="Mon-Fri 8AM-4PM"
            />
            <OfficeCard
              name="Berbice Office"
              address="New Amsterdam, Berbice"
              phone="333-2186"
              hours="Mon-Fri 8AM-4PM"
            />
            <OfficeCard
              name="Essequibo Office"
              address="Anna Regina, Essequibo Coast"
              phone="771-4244"
              hours="Mon-Fri 8AM-4PM"
            />
          </div>
        </section>
      </main>
    </div>
  )
}

interface ContactInfoProps {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}

function ContactInfo({ icon, label, value, href }: ContactInfoProps) {
  const content = (
    <>
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </>
  )

  if (href) {
    return (
      <a href={href} className="flex items-center gap-3 hover:text-primary transition-colors">
        {content}
      </a>
    )
  }

  return <div className="flex items-center gap-3">{content}</div>
}

interface FormTabProps {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}

function FormTab({ active, onClick, icon, label }: FormTabProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors',
        active
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-muted'
      )}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  )
}

interface OfficeCardProps {
  name: string
  address: string
  phone: string
  hours: string
}

function OfficeCard({ name, address, phone, hours }: OfficeCardProps) {
  return (
    <div className="p-6 rounded-lg bg-card border border-border">
      <h3 className="font-semibold text-lg mb-3">{name}</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-start gap-2">
          <LocationIcon className="w-4 h-4 text-muted-foreground mt-0.5" />
          <span>{address}</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-4 h-4 text-muted-foreground" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-muted-foreground" />
          <span>{hours}</span>
        </div>
      </div>
    </div>
  )
}

// Form Components

function GeneralContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // TODO: Implement actual form submission via oRPC
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessMessage message="Thank you for your message. We'll get back to you within 2 business days." />
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6">General Inquiry</h2>
      <p className="text-muted-foreground mb-6">
        Have a question or need assistance? Fill out the form below and we'll get back to you.
      </p>
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Full Name" name="name" required />
          <FormField label="Email Address" name="email" type="email" required />
        </div>
        <FormField label="Phone Number" name="phone" type="tel" />
        <FormField label="Subject" name="subject" required />
        <FormTextarea label="Message" name="message" required rows={5} />
        <SubmitButton isSubmitting={isSubmitting}>Send Message</SubmitButton>
      </div>
    </form>
  )
}

function OutageReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessMessage message="Thank you for reporting this outage. Our team has been notified and will investigate." />
  }

  return (
    <form onSubmit={handleSubmit} id="outage">
      <h2 className="text-2xl font-bold mb-6">Report Power Outage</h2>
      <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded-lg p-4 mb-6">
        <p className="text-sm">
          <strong>For immediate emergencies</strong> (downed lines, electrical fires), please call your regional emergency line directly.
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Your Name" name="name" required />
          <FormField label="Phone Number" name="phone" type="tel" required />
        </div>
        <FormField label="Email Address" name="email" type="email" />
        <FormField label="Account Number (if known)" name="account" />
        <FormField label="Street Address" name="address" required />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="City/Area" name="city" required />
          <FormSelect
            label="Region"
            name="region"
            options={['Demerara', 'Berbice', 'Essequibo']}
            required
          />
        </div>
        <FormTextarea
          label="Describe the Issue"
          name="description"
          placeholder="When did the outage start? Is it affecting your neighbors too?"
          rows={4}
          required
        />
        <SubmitButton isSubmitting={isSubmitting}>Report Outage</SubmitButton>
      </div>
    </form>
  )
}

function StreetLightForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessMessage message="Thank you for reporting this issue. Our maintenance team will address it." />
  }

  return (
    <form onSubmit={handleSubmit} id="streetlight">
      <h2 className="text-2xl font-bold mb-6">Report Street Light Issue</h2>
      <p className="text-muted-foreground mb-6">
        Help us keep your neighborhood safe and well-lit by reporting faulty street lights.
      </p>
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Your Name" name="name" required />
          <FormField label="Phone Number" name="phone" type="tel" />
        </div>
        <FormField label="Email Address" name="email" type="email" />
        <FormField label="Street/Location" name="location" required placeholder="Street name and nearest landmark" />
        <FormField label="Pole Number (if visible)" name="pole" />
        <FormSelect
          label="Issue Type"
          name="issue"
          options={['Light not working', 'Light flickering', 'Light stays on during day', 'Damaged pole/light', 'Other']}
          required
        />
        <FormTextarea
          label="Additional Details"
          name="details"
          placeholder="Any additional information that might help us locate and fix the issue"
          rows={3}
        />
        <SubmitButton isSubmitting={isSubmitting}>Submit Report</SubmitButton>
      </div>
    </form>
  )
}

function ServiceRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessMessage message="Your service request has been submitted. We'll contact you within 3 business days." />
  }

  return (
    <form onSubmit={handleSubmit} id="service-request">
      <h2 className="text-2xl font-bold mb-6">Service Request</h2>
      <p className="text-muted-foreground mb-6">
        Request a new connection, disconnection, reconnection, or other service.
      </p>
      <div className="grid gap-4">
        <FormSelect
          label="Request Type"
          name="type"
          options={[
            'New Connection',
            'Disconnection',
            'Reconnection',
            'Meter Issue',
            'Billing Inquiry',
            'Other'
          ]}
          required
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Full Name" name="name" required />
          <FormField label="Phone Number" name="phone" type="tel" required />
        </div>
        <FormField label="Email Address" name="email" type="email" required />
        <FormField label="Account Number (if applicable)" name="account" />
        <FormField label="Property Address" name="address" required />
        <FormTextarea
          label="Request Details"
          name="details"
          placeholder="Please provide details about your request"
          rows={4}
          required
        />
        <FormSelect
          label="Preferred Contact Method"
          name="contact"
          options={['Phone', 'Email', 'Either']}
        />
        <SubmitButton isSubmitting={isSubmitting}>Submit Request</SubmitButton>
      </div>
    </form>
  )
}

function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) {
    return <SuccessMessage message="Thank you for your feedback. We appreciate your input." />
  }

  return (
    <form onSubmit={handleSubmit} id="feedback">
      <h2 className="text-2xl font-bold mb-6">Share Your Feedback</h2>
      <p className="text-muted-foreground mb-6">
        We value your feedback. Let us know how we're doing or how we can improve.
      </p>
      <div className="grid gap-4">
        <FormSelect
          label="Feedback Type"
          name="type"
          options={['Complaint', 'Suggestion', 'Compliment', 'General Feedback']}
          required
        />
        <FormTextarea
          label="Your Feedback"
          name="message"
          placeholder="Please share your thoughts..."
          rows={5}
          required
        />
        <FormField label="Name (Optional)" name="name" />
        <FormField label="Email (Optional)" name="email" type="email" placeholder="If you'd like a response" />
        <SubmitButton isSubmitting={isSubmitting}>Submit Feedback</SubmitButton>
      </div>
    </form>
  )
}

// Form Elements

interface FormFieldProps {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}

function FormField({ label, name, type = 'text', required, placeholder }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        required={required}
        placeholder={placeholder}
        className={cn(
          'w-full px-4 py-2 rounded-lg',
          'border border-input bg-background',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
          'placeholder:text-muted-foreground'
        )}
      />
    </div>
  )
}

interface FormTextareaProps {
  label: string
  name: string
  rows?: number
  required?: boolean
  placeholder?: string
}

function FormTextarea({ label, name, rows = 3, required, placeholder }: FormTextareaProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        className={cn(
          'w-full px-4 py-2 rounded-lg',
          'border border-input bg-background',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
          'placeholder:text-muted-foreground',
          'resize-vertical'
        )}
      />
    </div>
  )
}

interface FormSelectProps {
  label: string
  name: string
  options: string[]
  required?: boolean
}

function FormSelect({ label, name, options, required }: FormSelectProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        className={cn(
          'w-full px-4 py-2 rounded-lg',
          'border border-input bg-background',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent'
        )}
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

interface SubmitButtonProps {
  isSubmitting: boolean
  children: React.ReactNode
}

function SubmitButton({ isSubmitting, children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={cn(
        'w-full sm:w-auto px-6 py-3 rounded-lg font-semibold',
        'bg-primary text-primary-foreground',
        'hover:bg-primary/90 transition-colors',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'flex items-center justify-center gap-2'
      )}
    >
      {isSubmitting ? (
        <>
          <LoadingSpinner />
          Submitting...
        </>
      ) : (
        children
      )}
    </button>
  )
}

function LoadingSpinner() {
  return (
    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  )
}

interface SuccessMessageProps {
  message: string
}

function SuccessMessage({ message }: SuccessMessageProps) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
        <CheckIcon className="w-8 h-8 text-green-600" />
      </div>
      <h3 className="text-xl font-bold mb-2">Submitted Successfully!</h3>
      <p className="text-muted-foreground">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 text-primary font-medium hover:underline"
      >
        Submit another
      </button>
    </div>
  )
}

// Icons
function LocationIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
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

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
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

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  )
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
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
