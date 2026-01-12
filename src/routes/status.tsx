import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  EMERGENCY_CONTACTS,
  getPhoneHref,
} from '@/lib/emergency-contacts'

export const Route = createFileRoute('/status')({
  component: StatusPage,
})

/**
 * GPL System Status Page
 *
 * Displays:
 * - Overall grid health status
 * - Active outages by region
 * - Planned maintenance notices
 * - Outage history
 * - Emergency contacts
 *
 * CRITICAL: This page must be accessible and load quickly
 * for customers checking during emergencies.
 */
function StatusPage() {
  return (
    <div className="min-h-screen">
      {/* Status Header with animated gradient */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground py-12 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-white/5 animate-pulse" />
          <div className="absolute left-1/4 bottom-0 w-64 h-64 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute right-1/3 top-1/2 w-32 h-32 rounded-full bg-white/5 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2 animate-fade-in">
                System Status
              </h1>
              <p className="text-primary-foreground/90 text-lg">
                Real-time power grid status and outage information for Guyana
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-primary-foreground/70">
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Live
                </span>
                <span className="mx-2">•</span>
                Last updated: {new Date().toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-4">
              <QuickStat label="Uptime" value="99.7%" trend="up" />
              <QuickStat label="Active Issues" value={ACTIVE_OUTAGES.length.toString()} trend={ACTIVE_OUTAGES.length > 0 ? 'down' : 'neutral'} />
            </div>
          </div>
        </div>
      </section>

      {/* Overall Status Banner */}
      <OverallStatusBanner />

      <div className="container mx-auto px-4 py-8">
        {/* Grid Metrics Chart */}
        <GridMetricsChart />

        <div className="grid gap-8 lg:grid-cols-3 mt-8">
          {/* Main content - 2 columns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Regional Status */}
            <RegionalStatus />

            {/* Active Outages */}
            <ActiveOutages />

            {/* Planned Maintenance */}
            <PlannedMaintenance />

            {/* Recent History */}
            <RecentHistory />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <EmergencyContactsCard />

            {/* Report Issue */}
            <ReportIssueCard />

            {/* Status Legend */}
            <StatusLegend />
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}

interface QuickStatProps {
  label: string
  value: string
  trend: 'up' | 'down' | 'neutral'
}

function QuickStat({ label, value, trend }: QuickStatProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 min-w-[100px]">
      <div className="text-xs text-primary-foreground/70 mb-1">{label}</div>
      <div className="flex items-center gap-1">
        <span className="text-2xl font-bold">{value}</span>
        {trend === 'up' && <TrendUpIcon className="w-4 h-4 text-green-400" />}
        {trend === 'down' && <TrendDownIcon className="w-4 h-4 text-amber-400" />}
      </div>
    </div>
  )
}

// Mock grid metrics data
const GRID_METRICS = [
  { time: '00:00', load: 65, capacity: 100 },
  { time: '04:00', load: 45, capacity: 100 },
  { time: '08:00', load: 78, capacity: 100 },
  { time: '12:00', load: 92, capacity: 100 },
  { time: '16:00', load: 88, capacity: 100 },
  { time: '20:00', load: 75, capacity: 100 },
  { time: 'Now', load: 72, capacity: 100 },
]

function GridMetricsChart() {
  const maxLoad = Math.max(...GRID_METRICS.map(m => m.load))

  return (
    <section className="p-6 rounded-2xl border bg-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ActivityIcon className="w-5 h-5 text-primary" />
            Grid Load Today
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Current system load vs capacity
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Load</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-muted" />
            <span className="text-muted-foreground">Capacity</span>
          </div>
        </div>
      </div>

      {/* Simple bar chart visualization */}
      <div className="flex items-end gap-2 h-48 mt-4">
        {GRID_METRICS.map((metric, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="relative w-full h-40 bg-muted/30 rounded-t-lg overflow-hidden">
              {/* Capacity background */}
              <div className="absolute inset-0 bg-muted/20" />
              {/* Load bar with animation */}
              <div
                className={cn(
                  'absolute bottom-0 left-0 right-0 rounded-t-lg transition-all duration-1000 ease-out',
                  metric.load > 85 ? 'bg-amber-500' : 'bg-primary'
                )}
                style={{
                  height: `${(metric.load / 100) * 100}%`,
                  animationDelay: `${index * 100}ms`
                }}
              />
              {/* Load percentage label */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold text-white drop-shadow-sm">
                  {metric.load}%
                </span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{metric.time}</span>
          </div>
        ))}
      </div>

      {/* Current stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">72%</div>
          <div className="text-xs text-muted-foreground">Current Load</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">92%</div>
          <div className="text-xs text-muted-foreground">Peak Today</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-500">28%</div>
          <div className="text-xs text-muted-foreground">Reserve Capacity</div>
        </div>
      </div>
    </section>
  )
}

// System status types
type SystemStatus = 'operational' | 'degraded' | 'partial-outage' | 'major-outage'

interface RegionStatus {
  region: string
  status: SystemStatus
  affectedCustomers?: number
  message?: string
}

// Mock data - will be replaced with real API data
const SYSTEM_STATUS: SystemStatus = 'degraded'

const REGIONAL_STATUSES: RegionStatus[] = [
  {
    region: 'Demerara',
    status: 'operational',
    message: 'All systems operating normally',
  },
  {
    region: 'Berbice',
    status: 'degraded',
    affectedCustomers: 1250,
    message: 'Scheduled maintenance in progress - New Amsterdam area',
  },
  {
    region: 'Essequibo',
    status: 'operational',
    message: 'All systems operating normally',
  },
]

interface Outage {
  id: string
  region: string
  area: string
  startTime: string
  estimatedRestoration?: string
  affectedCustomers: number
  cause: string
  status: 'investigating' | 'identified' | 'restoring' | 'monitoring'
}

const ACTIVE_OUTAGES: Outage[] = [
  {
    id: 'OUT-2026-0112-001',
    region: 'Berbice',
    area: 'New Amsterdam - Market Area',
    startTime: '2026-01-12T09:00:00',
    estimatedRestoration: '2026-01-12T14:00:00',
    affectedCustomers: 850,
    cause: 'Scheduled maintenance - Transformer upgrade',
    status: 'restoring',
  },
  {
    id: 'OUT-2026-0112-002',
    region: 'Berbice',
    area: 'Rose Hall Village',
    startTime: '2026-01-12T10:30:00',
    estimatedRestoration: '2026-01-12T13:00:00',
    affectedCustomers: 400,
    cause: 'Scheduled maintenance - Line repair',
    status: 'restoring',
  },
]

interface MaintenanceNotice {
  id: string
  region: string
  area: string
  scheduledDate: string
  duration: string
  affectedCustomers: number
  description: string
}

const PLANNED_MAINTENANCE: MaintenanceNotice[] = [
  {
    id: 'MAINT-2026-0115',
    region: 'Demerara',
    area: 'Georgetown - Stabroek',
    scheduledDate: '2026-01-15',
    duration: '6 hours (6:00 AM - 12:00 PM)',
    affectedCustomers: 2000,
    description: 'Substation upgrade to improve grid reliability',
  },
  {
    id: 'MAINT-2026-0118',
    region: 'Essequibo',
    area: 'Anna Regina',
    scheduledDate: '2026-01-18',
    duration: '4 hours (8:00 AM - 12:00 PM)',
    affectedCustomers: 800,
    description: 'Transformer replacement',
  },
]

interface HistoryEntry {
  id: string
  region: string
  area: string
  date: string
  duration: string
  cause: string
}

const OUTAGE_HISTORY: HistoryEntry[] = [
  {
    id: 'HIST-001',
    region: 'Demerara',
    area: 'Kitty',
    date: '2026-01-10',
    duration: '2h 15m',
    cause: 'Equipment failure - Restored',
  },
  {
    id: 'HIST-002',
    region: 'Berbice',
    area: 'Corriverton',
    date: '2026-01-09',
    duration: '45m',
    cause: 'Vegetation contact - Cleared',
  },
  {
    id: 'HIST-003',
    region: 'Demerara',
    area: 'Eccles',
    date: '2026-01-08',
    duration: '1h 30m',
    cause: 'Scheduled maintenance - Completed',
  },
]

function OverallStatusBanner() {
  const statusConfig: Record<SystemStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
    'operational': {
      label: 'All Systems Operational',
      color: 'text-green-700 dark:text-green-400',
      bg: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800',
      icon: <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />,
    },
    'degraded': {
      label: 'Partial Degradation',
      color: 'text-yellow-700 dark:text-yellow-400',
      bg: 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800',
      icon: <AlertTriangleIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />,
    },
    'partial-outage': {
      label: 'Partial Outage',
      color: 'text-orange-700 dark:text-orange-400',
      bg: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-800',
      icon: <AlertCircleIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
    },
    'major-outage': {
      label: 'Major Outage',
      color: 'text-red-700 dark:text-red-400',
      bg: 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800',
      icon: <XCircleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />,
    },
  }

  const config = statusConfig[SYSTEM_STATUS]

  return (
    <div className={cn('border-b', config.bg)}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          {config.icon}
          <div>
            <div className={cn('font-semibold', config.color)}>
              {config.label}
            </div>
            <div className="text-sm text-muted-foreground">
              {ACTIVE_OUTAGES.length > 0
                ? `${ACTIVE_OUTAGES.length} active incident${ACTIVE_OUTAGES.length > 1 ? 's' : ''} being addressed`
                : 'No active incidents'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RegionalStatus() {
  const getStatusBadge = (status: SystemStatus) => {
    const styles: Record<SystemStatus, string> = {
      'operational': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      'degraded': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      'partial-outage': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
      'major-outage': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    }

    const labels: Record<SystemStatus, string> = {
      'operational': 'Operational',
      'degraded': 'Degraded',
      'partial-outage': 'Partial Outage',
      'major-outage': 'Major Outage',
    }

    return (
      <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium', styles[status])}>
        {labels[status]}
      </span>
    )
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MapIcon className="w-5 h-5 text-primary" />
        Regional Status
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {REGIONAL_STATUSES.map((region) => (
          <div
            key={region.region}
            className={cn(
              'p-4 rounded-xl border',
              'bg-card hover:shadow-md transition-shadow'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">{region.region}</h3>
              {getStatusBadge(region.status)}
            </div>
            <p className="text-sm text-muted-foreground">
              {region.message}
            </p>
            {region.affectedCustomers && (
              <p className="text-sm mt-2">
                <span className="font-medium">{region.affectedCustomers.toLocaleString()}</span>{' '}
                <span className="text-muted-foreground">customers affected</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function ActiveOutages() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const getStatusBadge = (status: Outage['status']) => {
    const styles: Record<Outage['status'], string> = {
      'investigating': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      'identified': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      'restoring': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      'monitoring': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    }

    const labels: Record<Outage['status'], string> = {
      'investigating': 'Investigating',
      'identified': 'Identified',
      'restoring': 'Restoring',
      'monitoring': 'Monitoring',
    }

    return (
      <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-medium', styles[status])}>
        {labels[status]}
      </span>
    )
  }

  if (ACTIVE_OUTAGES.length === 0) {
    return (
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertCircleIcon className="w-5 h-5 text-primary" />
          Active Outages
        </h2>
        <div className="p-6 rounded-xl border bg-card text-center">
          <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <p className="font-medium text-green-700 dark:text-green-400">No active outages</p>
          <p className="text-sm text-muted-foreground mt-1">
            All areas are currently receiving power
          </p>
        </div>
      </section>
    )
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <AlertCircleIcon className="w-5 h-5 text-destructive" />
        Active Outages
        <span className="ml-auto text-sm font-normal text-muted-foreground">
          {ACTIVE_OUTAGES.length} active
        </span>
      </h2>
      <div className="space-y-3">
        {ACTIVE_OUTAGES.map((outage) => (
          <div
            key={outage.id}
            className={cn(
              'p-4 rounded-xl border bg-card',
              'transition-shadow hover:shadow-md'
            )}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <BoltIcon className="w-4 h-4 text-destructive" />
                <span className="font-semibold">{outage.area}</span>
              </div>
              {getStatusBadge(outage.status)}
            </div>

            <div className="grid gap-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPinIcon className="w-4 h-4" />
                {outage.region}
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <ClockIcon className="w-4 h-4" />
                Started: {new Date(outage.startTime).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </div>
              {outage.estimatedRestoration && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <RefreshIcon className="w-4 h-4" />
                  Est. restoration: {new Date(outage.estimatedRestoration).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </div>
              )}
              <div className="flex items-center gap-2 text-muted-foreground">
                <UsersIcon className="w-4 h-4" />
                {outage.affectedCustomers.toLocaleString()} customers affected
              </div>
            </div>

            <button
              onClick={() => setExpandedId(expandedId === outage.id ? null : outage.id)}
              className="mt-3 text-sm text-primary font-medium flex items-center gap-1 hover:underline"
            >
              {expandedId === outage.id ? 'Hide details' : 'Show details'}
              <ChevronIcon className={cn('w-4 h-4 transition-transform', expandedId === outage.id && 'rotate-180')} />
            </button>

            {expandedId === outage.id && (
              <div className="mt-3 pt-3 border-t text-sm">
                <div className="mb-2">
                  <span className="font-medium">Incident ID:</span>{' '}
                  <span className="text-muted-foreground">{outage.id}</span>
                </div>
                <div>
                  <span className="font-medium">Cause:</span>{' '}
                  <span className="text-muted-foreground">{outage.cause}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

function PlannedMaintenance() {
  if (PLANNED_MAINTENANCE.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <WrenchIcon className="w-5 h-5 text-primary" />
        Planned Maintenance
      </h2>
      <div className="space-y-3">
        {PLANNED_MAINTENANCE.map((notice) => (
          <div
            key={notice.id}
            className={cn(
              'p-4 rounded-xl border bg-card',
              'border-l-4 border-l-blue-500'
            )}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="font-semibold">{notice.area}</span>
              <span className="text-sm text-muted-foreground">
                {new Date(notice.scheduledDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              {notice.description}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPinIcon className="w-4 h-4" />
                {notice.region}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <ClockIcon className="w-4 h-4" />
                {notice.duration}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <UsersIcon className="w-4 h-4" />
                ~{notice.affectedCustomers.toLocaleString()} customers
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function RecentHistory() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <HistoryIcon className="w-5 h-5 text-primary" />
        Recent History
      </h2>
      <div className="rounded-xl border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Date</th>
              <th className="px-4 py-3 text-left font-medium">Area</th>
              <th className="px-4 py-3 text-left font-medium hidden sm:table-cell">Duration</th>
              <th className="px-4 py-3 text-left font-medium hidden md:table-cell">Cause</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {OUTAGE_HISTORY.map((entry) => (
              <tr key={entry.id} className="hover:bg-muted/30">
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3">
                  <div>{entry.area}</div>
                  <div className="text-xs text-muted-foreground">{entry.region}</div>
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                  {entry.duration}
                </td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                  {entry.cause}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function EmergencyContactsCard() {
  return (
    <div className="p-4 rounded-xl border bg-card">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <PhoneIcon className="w-5 h-5 text-amber-600 dark:text-amber-500" />
        <span>Emergency Contacts</span>
      </h3>
      <div className="space-y-2">
        {EMERGENCY_CONTACTS.map((contact) => (
          <a
            key={contact.region}
            href={getPhoneHref(contact.primaryNumber)}
            className={cn(
              'flex items-center justify-between p-3 rounded-lg',
              'bg-muted/50 hover:bg-muted',
              'transition-colors group'
            )}
          >
            <span className="text-sm font-medium">{contact.region}</span>
            <span className="font-semibold text-primary group-hover:underline">
              {contact.primaryNumber}
            </span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Available 24/7 for power emergencies
      </p>
    </div>
  )
}

function ReportIssueCard() {
  return (
    <div className="p-4 rounded-xl border bg-card">
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <AlertTriangleIcon className="w-5 h-5 text-amber-600 dark:text-amber-500" />
        Report an Issue
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Experiencing a power outage or electrical issue not listed above?
      </p>
      <a
        href="/contact#outage"
        className={cn(
          'flex items-center justify-center gap-2 w-full',
          'px-4 py-2.5 rounded-lg font-medium text-sm',
          'bg-primary text-primary-foreground',
          'hover:bg-primary/90 transition-colors'
        )}
      >
        <AlertCircleIcon className="w-4 h-4" />
        Report Outage
      </a>
    </div>
  )
}

function StatusLegend() {
  return (
    <div className="p-4 rounded-xl border bg-card">
      <h3 className="font-semibold mb-3">Status Legend</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          <span>Operational - All systems normal</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-yellow-500" />
          <span>Degraded - Minor issues</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-orange-500" />
          <span>Partial Outage - Some areas affected</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span>Major Outage - Widespread impact</span>
        </div>
      </div>
    </div>
  )
}

// SVG Icons

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function AlertTriangleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  )
}

function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  )
}

function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <line x1="15" x2="9" y1="9" y2="15" />
      <line x1="9" x2="15" y1="9" y2="15" />
    </svg>
  )
}

function MapIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m3 7 6-3 6 3 6-3v13l-6 3-6-3-6 3V7z" />
      <path d="M9 4v13" />
      <path d="M15 7v13" />
    </svg>
  )
}

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function RefreshIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
}

function HistoryIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
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

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd" />
    </svg>
  )
}

function TrendUpIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

function TrendDownIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
      <polyline points="16 17 22 17 22 11" />
    </svg>
  )
}

function ActivityIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}
