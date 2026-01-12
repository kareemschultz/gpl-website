/**
 * FAQ Management Page
 *
 * Admin interface for managing FAQs.
 */
import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useFAQs } from '@/lib/api-hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Plus, Pencil, Trash2, Search } from 'lucide-react'

export const Route = createFileRoute('/admin/faqs')({
  component: FAQManagement,
})

const FAQ_CATEGORIES = [
  'billing',
  'connections',
  'outages',
  'streetlights',
  'safety',
  'customer_service',
  'technical',
  'account',
  'emergency',
]

function FAQManagement() {
  const { data, isLoading, refetch } = useFAQs()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<any>(null)

  // Form state
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'general',
  })

  const faqs = data?.faqs || []

  const filteredFaqs = faqs.filter((faq: any) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would call the API to create FAQ
    console.log('Creating FAQ:', formData)
    setIsCreateOpen(false)
    setFormData({ question: '', answer: '', category: 'general' })
    // refetch()
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would call the API to update FAQ
    console.log('Updating FAQ:', editingFaq, formData)
    setEditingFaq(null)
    setFormData({ question: '', answer: '', category: 'general' })
    // refetch()
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      // In production, this would call the API to delete FAQ
      console.log('Deleting FAQ:', id)
      // refetch()
    }
  }

  const openEdit = (faq: any) => {
    setEditingFaq(faq)
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
    })
  }

  return (
    <div className="container py-12">
      {/* Header */}
      <div className="mb-8">
        <Link to="/admin" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">FAQ Management</h1>
            <p className="text-muted-foreground mt-2">
              Create, edit, and manage frequently asked questions.
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add FAQ
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleCreateSubmit}>
                <DialogHeader>
                  <DialogTitle>Create New FAQ</DialogTitle>
                  <DialogDescription>
                    Add a new frequently asked question.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="question">Question</Label>
                    <Input
                      id="question"
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      placeholder="Enter the question"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {FAQ_CATEGORIES.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat.replace('_', ' ')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="answer">Answer</Label>
                    <Textarea
                      id="answer"
                      value={formData.answer}
                      onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                      placeholder="Enter the answer"
                      rows={5}
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create FAQ</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {FAQ_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.replace('_', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* FAQ List */}
      <Card>
        <CardHeader>
          <CardTitle>FAQs ({filteredFaqs.length})</CardTitle>
          <CardDescription>
            Manage your frequently asked questions below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : filteredFaqs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No FAQs found. Create your first FAQ to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50%]">Question</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaqs.map((faq: any) => (
                  <TableRow key={faq.id}>
                    <TableCell className="font-medium">
                      <div className="max-w-md truncate">{faq.question}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {faq.category.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{faq.order}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog open={editingFaq?.id === faq.id} onOpenChange={(open) => !open && setEditingFaq(null)}>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => openEdit(faq)}>
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <form onSubmit={handleEditSubmit}>
                              <DialogHeader>
                                <DialogTitle>Edit FAQ</DialogTitle>
                                <DialogDescription>
                                  Update the FAQ details.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="edit-question">Question</Label>
                                  <Input
                                    id="edit-question"
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-category">Category</Label>
                                  <Select
                                    value={formData.category}
                                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {FAQ_CATEGORIES.map((cat) => (
                                        <SelectItem key={cat} value={cat}>
                                          {cat.replace('_', ' ')}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="edit-answer">Answer</Label>
                                  <Textarea
                                    id="edit-answer"
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    rows={5}
                                    required
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setEditingFaq(null)}>
                                  Cancel
                                </Button>
                                <Button type="submit">Save Changes</Button>
                              </DialogFooter>
                            </form>
                          </DialogContent>
                        </Dialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(faq.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
    </div>
  )
}
