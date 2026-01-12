/**
 * Contact Submissions Management Page
 *
 * Admin interface for viewing and managing contact form submissions.
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
import { ArrowLeft, Search, Eye, Mail, Phone, CheckCircle, Clock, XCircle } from 'lucide-react'

export const Route = createFileRoute('/admin/contacts')({
  component: ContactSubmissionsManagement,
})

// Mock data - in production, this would come from the API
const mockSubmissions = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '592-600-1234',
    subject: 'Billing inquiry',
    message: 'I received a bill that seems incorrect. My account shows double charges for last month. Can someone please review this?',
    status: 'pending',
    createdAt: '2024-01-10T14:30:00Z',
  },
  {
    id: '2',
    name: 'Mary Johnson',
    email: 'mary.j@example.com',
    phone: '592-600-5678',
    subject: 'New connection request',
    message: 'I recently moved to a new house in Georgetown and need to set up electricity service. What documents do I need?',
    status: 'in_progress',
    createdAt: '2024-01-09T10:15:00Z',
  },
  {
    id: '3',
    name: 'Robert Brown',
    email: 'rbrown@example.com',
    phone: null,
    subject: 'Streetlight out on Main Street',
    message: 'The streetlight at the corner of Main Street and Church Street has been out for two weeks. It is very dark and unsafe.',
    status: 'resolved',
    createdAt: '2024-01-08T16:45:00Z',
  },
]

const statusConfig = {
  pending: { label: 'Pending', icon: Clock, color: 'bg-yellow-100 text-yellow-800' },
  in_progress: { label: 'In Progress', icon: Clock, color: 'bg-blue-100 text-blue-800' },
  resolved: { label: 'Resolved', icon: CheckCircle, color: 'bg-green-100 text-green-800' },
  closed: { label: 'Closed', icon: XCircle, color: 'bg-gray-100 text-gray-800' },
}

function ContactSubmissionsManagement() {
  const [submissions] = useState(mockSubmissions)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateStatus = async (id: string, newStatus: string) => {
    console.log('Updating status:', id, newStatus)
    // In production, this would call the API
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
          <h1 className="text-3xl font-bold">Contact Submissions</h1>
          <p className="text-muted-foreground mt-2">
            View and respond to contact form submissions from the public website.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Progress</p>
                <p className="text-2xl font-bold">5</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Resolved</p>
                <p className="text-2xl font-bold">48</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <Mail className="h-8 w-8 text-primary" />
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
                  placeholder="Search by name, email, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Submissions List */}
      <Card>
        <CardHeader>
          <CardTitle>Submissions ({filteredSubmissions.length})</CardTitle>
          <CardDescription>
            Click on a submission to view details and respond.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubmissions.map((submission) => {
                const status = statusConfig[submission.status as keyof typeof statusConfig]
                return (
                  <TableRow key={submission.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(submission.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{submission.name}</div>
                        <div className="text-sm text-muted-foreground">{submission.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">{submission.subject}</div>
                    </TableCell>
                    <TableCell>
                      <Badge className={status.color}>{status.label}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedSubmission(submission)}
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
      <Dialog open={!!selectedSubmission} onOpenChange={(open) => !open && setSelectedSubmission(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Contact Submission</DialogTitle>
            <DialogDescription>
              Submitted on {selectedSubmission && new Date(selectedSubmission.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="font-medium">{selectedSubmission.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Status</p>
                  <Select
                    value={selectedSubmission.status}
                    onValueChange={(value) => updateStatus(selectedSubmission.id, value)}
                  >
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
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <a href={`mailto:${selectedSubmission.email}`} className="text-primary hover:underline">
                    {selectedSubmission.email}
                  </a>
                </div>
                {selectedSubmission.phone && (
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                    <a href={`tel:${selectedSubmission.phone}`} className="text-primary hover:underline">
                      {selectedSubmission.phone}
                    </a>
                  </div>
                )}
              </div>

              {/* Subject & Message */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Subject</p>
                <p className="font-medium">{selectedSubmission.subject}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Message</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <a href={`mailto:${selectedSubmission.email}?subject=Re: ${selectedSubmission.subject}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Reply via Email
                  </a>
                </Button>
                {selectedSubmission.phone && (
                  <Button variant="outline" asChild>
                    <a href={`tel:${selectedSubmission.phone}`}>
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </a>
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
