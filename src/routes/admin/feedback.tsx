/**
 * Feedback Management Page
 *
 * Admin interface for viewing customer feedback and suggestions.
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
import {
  ArrowLeft,
  Search,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Lightbulb,
  Star,
} from 'lucide-react'

export const Route = createFileRoute('/admin/feedback')({
  component: FeedbackManagement,
})

// Mock data
const mockFeedback = [
  {
    id: '1',
    type: 'compliment',
    message: 'The team that came to fix our power outage was extremely professional and fast. They had us back online within 2 hours!',
    name: 'Alice Peters',
    email: 'alice.p@example.com',
    rating: 5,
    status: 'pending',
    createdAt: '2024-01-10T11:00:00Z',
  },
  {
    id: '2',
    type: 'complaint',
    message: 'My electricity bill seems too high for this month. I was away for most of the month but the bill is the same as usual.',
    name: 'James Wilson',
    email: 'jwilson@example.com',
    rating: 2,
    status: 'in_progress',
    createdAt: '2024-01-09T15:30:00Z',
  },
  {
    id: '3',
    type: 'suggestion',
    message: 'It would be great if there was a mobile app where we could pay bills and report outages directly. Much more convenient than calling.',
    name: null,
    email: null,
    rating: null,
    status: 'pending',
    createdAt: '2024-01-08T09:15:00Z',
  },
  {
    id: '4',
    type: 'general',
    message: 'Where can I find information about solar panel installations and whether GPL supports net metering?',
    name: 'Kumar Singh',
    email: 'k.singh@example.com',
    rating: null,
    status: 'resolved',
    createdAt: '2024-01-07T14:00:00Z',
  },
]

const typeConfig = {
  complaint: { label: 'Complaint', icon: ThumbsDown, color: 'bg-red-100 text-red-800' },
  suggestion: { label: 'Suggestion', icon: Lightbulb, color: 'bg-blue-100 text-blue-800' },
  compliment: { label: 'Compliment', icon: ThumbsUp, color: 'bg-green-100 text-green-800' },
  general: { label: 'General', icon: MessageSquare, color: 'bg-gray-100 text-gray-800' },
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800' },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-800' },
}

function FeedbackManagement() {
  const [feedback] = useState(mockFeedback)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null)

  const filteredFeedback = feedback.filter((fb) => {
    const matchesSearch =
      fb.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (fb.name && fb.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = typeFilter === 'all' || fb.type === typeFilter
    return matchesSearch && matchesType
  })

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-muted-foreground">-</span>
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  // Calculate stats
  const stats = {
    total: feedback.length,
    complaints: feedback.filter((f) => f.type === 'complaint').length,
    compliments: feedback.filter((f) => f.type === 'compliment').length,
    suggestions: feedback.filter((f) => f.type === 'suggestion').length,
    avgRating:
      feedback.filter((f) => f.rating).reduce((sum, f) => sum + (f.rating || 0), 0) /
        feedback.filter((f) => f.rating).length || 0,
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
          <h1 className="text-3xl font-bold">Customer Feedback</h1>
          <p className="text-muted-foreground mt-2">
            Review customer feedback, complaints, and suggestions.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-5 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Complaints</p>
                <p className="text-2xl font-bold text-red-600">{stats.complaints}</p>
              </div>
              <ThumbsDown className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Compliments</p>
                <p className="text-2xl font-bold text-green-600">{stats.compliments}</p>
              </div>
              <ThumbsUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Suggestions</p>
                <p className="text-2xl font-bold text-blue-600">{stats.suggestions}</p>
              </div>
              <Lightbulb className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">{stats.avgRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
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
                  placeholder="Search feedback..."
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
                <SelectItem value="complaint">Complaints</SelectItem>
                <SelectItem value="compliment">Compliments</SelectItem>
                <SelectItem value="suggestion">Suggestions</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback ({filteredFeedback.length})</CardTitle>
          <CardDescription>
            Click on feedback to view full details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead className="w-[40%]">Message</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFeedback.map((fb) => {
                const type = typeConfig[fb.type as keyof typeof typeConfig]
                const status = statusConfig[fb.status as keyof typeof statusConfig]
                const TypeIcon = type.icon
                return (
                  <TableRow key={fb.id}>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(fb.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge className={type.color}>
                        <TypeIcon className="mr-1 h-3 w-3" />
                        {type.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {fb.name || <span className="text-muted-foreground">Anonymous</span>}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate">{fb.message}</div>
                    </TableCell>
                    <TableCell>{renderStars(fb.rating)}</TableCell>
                    <TableCell>
                      <Badge className={status.color}>{status.label}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedFeedback(fb)}
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
      <Dialog open={!!selectedFeedback} onOpenChange={(open) => !open && setSelectedFeedback(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              Customer Feedback
              {selectedFeedback && (
                <Badge className={typeConfig[selectedFeedback.type as keyof typeof typeConfig]?.color}>
                  {typeConfig[selectedFeedback.type as keyof typeof typeConfig]?.label}
                </Badge>
              )}
            </DialogTitle>
            <DialogDescription>
              Submitted on {selectedFeedback && new Date(selectedFeedback.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-6">
              {/* Customer Info */}
              {(selectedFeedback.name || selectedFeedback.email) && (
                <div className="grid grid-cols-2 gap-4">
                  {selectedFeedback.name && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Name</p>
                      <p className="font-medium">{selectedFeedback.name}</p>
                    </div>
                  )}
                  {selectedFeedback.email && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Email</p>
                      <a href={`mailto:${selectedFeedback.email}`} className="text-primary hover:underline">
                        {selectedFeedback.email}
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Rating */}
              {selectedFeedback.rating && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Rating</p>
                  <div className="flex items-center gap-2">
                    {renderStars(selectedFeedback.rating)}
                    <span className="text-lg font-medium">{selectedFeedback.rating}/5</span>
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Message</p>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{selectedFeedback.message}</p>
                </div>
              </div>

              {/* Status Update */}
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Status</p>
                <Select defaultValue={selectedFeedback.status}>
                  <SelectTrigger>
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

              {/* Actions */}
              {selectedFeedback.email && (
                <Button asChild className="w-full">
                  <a href={`mailto:${selectedFeedback.email}?subject=Re: Your Feedback to GPL`}>
                    Respond via Email
                  </a>
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
