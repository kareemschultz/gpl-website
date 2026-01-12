/**
 * Service Requests Management Page
 *
 * Admin interface for managing customer service requests.
 */
import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Search, Eye, FileText, AlertTriangle, Zap, Building, Lightbulb } from 'lucide-react'

export const Route = createFileRoute('/admin/service-requests')({
  component: ServiceRequestsManagement,
})

// Mock data
const mockRequests = [
  {
    id: '1',
    referenceNumber: 'SR-ABC123',
    type: 'new_connection',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    phone: '592-600-9876',
    address: '123 Main Street, Georgetown',
    accountNumber: null,
    details: 'I need a new electricity connection for my newly constructed house.',
    status: 'pending',
    preferredContactMethod: 'phone',
    createdAt: '2024-01-10T09:00:00Z',
  },
  {
    id: '2',
    referenceNumber: 'OUT-DEF456',
    type: 'outage',
    name: 'Michael Chen',
    email: 'mchen@example.com',
    phone: '592-600-1111',
    address: '45 Church Street, Berbice',
    accountNumber: 'GPL-123456',
    details: JSON.stringify({
      reportType: 'outage',
      affectedArea: 'Church Street and surrounding area',
      description: 'Power has been out since 6am. Approximately 20 houses affected.',
      hazardPresent: false,
    }),
    status: 'in_progress',
    preferredContactMethod: 'phone',
    createdAt: '2024-01-10T06:30:00Z',
  },
  {
    id: '3',
    referenceNumber: 'SL-GHI789',
    type: 'streetlight',
    name: 'David Thompson',
    email: 'dthompson@example.com',
    phone: '592-600-2222',
    address: 'Corner of Water Street and Camp Street',
    accountNumber: null,
    details: JSON.stringify({
      poleNumber: 'P-4521',
      issueType: 'not_working',
      additionalDetails: 'Light has been out for one week.',
    }),
    status: 'pending',
    preferredContactMethod: 'email',
    createdAt: '2024-01-09T14:00:00Z',
  },
]

const typeConfig = {
  new_connection: { label: 'New Connection', icon: Zap, color: 'bg-green-100 text-green-800' },
  disconnection: { label: 'Disconnection', icon: Zap, color: 'bg-red-100 text-red-800' },
  reconnection: { label: 'Reconnection', icon: Zap, color: 'bg-blue-100 text-blue-800' },
  meter_issue: { label: 'Meter Issue', icon: Building, color: 'bg-purple-100 text-purple-800' },
  billing_inquiry: { label: 'Billing', icon: FileText, color: 'bg-gray-100 text-gray-800' },
  streetlight: { label: 'Streetlight', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-800' },
  outage: { label: 'Outage', icon: AlertTriangle, color: 'bg-red-100 text-red-800' },
  other: { label: 'Other', icon: FileText, color: 'bg-gray-100 text-gray-800' },
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800' },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-800' },
}

function ServiceRequestsManagement() {
  const [requests] = useState(mockRequests)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedRequest, setSelectedRequest] = useState<any>(null)

  const filteredRequests = requests.filter((req) => {
    const matchesSearch =
      req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || req.type === typeFilter
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const parseDetails = (details: string, type: string) => {
    try {
      return JSON.parse(details)
    } catch {
      return { description: details }
    }
  }

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-8">
        <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Service Requests</h1>
          <p className="text-muted-foreground mt-2">
            Manage customer service requests, outage reports, and streetlight issues.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Outages</p>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Connections</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <Zap className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Streetlights</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Lightbulb className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Pending</p>
                <p className="text-2xl font-bold">16</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, reference, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="new_connection">New Connection</SelectItem>
                <SelectItem value="disconnection">Disconnection</SelectItem>
                <SelectItem value="reconnection">Reconnection</SelectItem>
                <SelectItem value="meter_issue">Meter Issue</SelectItem>
                <SelectItem value="billing_inquiry">Billing</SelectItem>
                <SelectItem value="streetlight">Streetlight</SelectItem>
                <SelectItem value="outage">Outage</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <Card>
        <CardHeader>
          <CardTitle>Requests ({filteredRequests.length})</CardTitle>
          <CardDescription>
            Click on a request to view details and update status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Reference</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => {
                const type = typeConfig[request.type as keyof typeof typeConfig] || typeConfig.other
                const status = statusConfig[request.status as keyof typeof statusConfig]
                const TypeIcon = type.icon
                return (
                  <TableRow key={request.id}>
                    <TableCell className="font-mono font-medium">
                      {request.referenceNumber}
                    </TableCell>
                    <TableCell>
                      <Badge className={type.color}>
                        <TypeIcon className="mr-1 h-3 w-3" />
                        {type.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.name}</div>
                        <div className="text-sm text-muted-foreground">{request.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate">{request.address}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={status.color}>{status.label}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedRequest(request)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={(open) => !open && setSelectedRequest(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="font-mono">{selectedRequest?.referenceNumber}</span>
              {selectedRequest && (
                <Badge className={typeConfig[selectedRequest.type as keyof typeof typeConfig]?.color || ''}>
                  {typeConfig[selectedRequest.type as keyof typeof typeConfig]?.label || selectedRequest.type}
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              Submitted on {selectedRequest && new Date(selectedRequest.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedRequest.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Select defaultValue={selectedRequest.status}>
                    <SelectTrigger className="w-[140px] mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <a href={`tel:${selectedRequest.phone}`} className="text-primary hover:underline">
                    {selectedRequest.phone}
                  </a>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <a href={`mailto:${selectedRequest.email}`} className="text-primary hover:underline">
                    {selectedRequest.email}
                  </a>
                </div>
                {selectedRequest.accountNumber && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Account #</p>
                    <p className="font-mono">{selectedRequest.accountNumber}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Preferred Contact</p>
                  <p className="capitalize">{selectedRequest.preferredContactMethod}</p>
                </div>
              </div>

              {/* Address */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Address</p>
                <p>{selectedRequest.address}</p>
              </div>

              {/* Details */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Request Details</p>
                <div className="bg-muted p-4 rounded-lg">
                  {(() => {
                    const details = parseDetails(selectedRequest.details, selectedRequest.type)
                    if (details.reportType === 'outage') {
                      return (
                        <div className="space-y-2">
                          <p><strong>Affected Area:</strong> {details.affectedArea}</p>
                          <p><strong>Description:</strong> {details.description}</p>
                          {details.hazardPresent && (
                            <div className="flex items-center gap-2 text-red-600 font-medium">
                              <AlertTriangle className="h-4 w-4" />
                              HAZARD PRESENT - Prioritize
                            </div>
                          )}
                        </div>
                      )
                    } else if (details.poleNumber) {
                      return (
                        <div className="space-y-2">
                          <p><strong>Pole Number:</strong> {details.poleNumber || 'Not specified'}</p>
                          <p><strong>Issue:</strong> {details.issueType?.replace('_', ' ')}</p>
                          {details.additionalDetails && (
                            <p><strong>Notes:</strong> {details.additionalDetails}</p>
                          )}
                        </div>
                      )
                    } else {
                      return <p className="whitespace-pre-wrap">{details.description || selectedRequest.details}</p>
                    }
                  })()}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button className="flex-1">Mark as In Progress</Button>
                <Button variant="outline">Assign</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
