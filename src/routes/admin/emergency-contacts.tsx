/**
 * Emergency Contacts Management Page
 *
 * CRITICAL: This page manages safety-critical information.
 * All emergency contacts must be verified before publication.
 */
import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useEmergencyContacts } from '@/lib/api-hooks'
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Plus, Pencil, Trash2, AlertTriangle, Phone } from 'lucide-react'

export const Route = createFileRoute('/admin/emergency-contacts')({
  component: EmergencyContactsManagement,
})

function EmergencyContactsManagement() {
  const { data, isLoading, refetch } = useEmergencyContacts()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<any>(null)

  // Form state
  const [formData, setFormData] = useState({
    region: '',
    name: '',
    primaryNumber: '',
    secondaryNumber: '',
    description: '',
    available: '24/7',
  })

  const contacts = data?.contacts || []

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Creating emergency contact:', formData)
    setIsCreateOpen(false)
    resetForm()
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Updating emergency contact:', editingContact, formData)
    setEditingContact(null)
    resetForm()
  }

  const handleDelete = async (id: string) => {
    if (confirm('WARNING: Deleting emergency contacts may affect public safety. Are you absolutely sure?')) {
      if (confirm('This action cannot be undone. Please confirm deletion.')) {
        console.log('Deleting emergency contact:', id)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      region: '',
      name: '',
      primaryNumber: '',
      secondaryNumber: '',
      description: '',
      available: '24/7',
    })
  }

  const openEdit = (contact: any) => {
    setEditingContact(contact)
    setFormData({
      region: contact.region,
      name: contact.name,
      primaryNumber: contact.primaryNumber,
      secondaryNumber: contact.secondaryNumber || '',
      description: contact.description,
      available: contact.available,
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
            <h1 className="text-3xl font-bold">Emergency Contacts</h1>
            <p className="text-muted-foreground mt-2">
              Manage emergency contact information for GPL regions.
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleCreateSubmit}>
                <DialogHeader>
                  <DialogTitle>Add Emergency Contact</DialogTitle>
                  <DialogDescription>
                    Add a new emergency contact number. Verify all information before saving.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="region">Region</Label>
                    <Input
                      id="region"
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      placeholder="e.g., Demerara, Berbice, Essequibo"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Contact Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Demerara Emergency Line"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="primaryNumber">Primary Number</Label>
                      <Input
                        id="primaryNumber"
                        value={formData.primaryNumber}
                        onChange={(e) => setFormData({ ...formData, primaryNumber: e.target.value })}
                        placeholder="0475"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryNumber">Secondary Number</Label>
                      <Input
                        id="secondaryNumber"
                        value={formData.secondaryNumber}
                        onChange={(e) => setFormData({ ...formData, secondaryNumber: e.target.value })}
                        placeholder="226-2600"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="24/7 Power Emergency"
                      rows={2}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="available">Availability</Label>
                    <Input
                      id="available"
                      value={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: e.target.value })}
                      placeholder="24/7"
                      required
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Contact</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Safety Warning */}
      <Alert className="mb-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
        <AlertTriangle className="h-4 w-4 text-yellow-600" />
        <AlertTitle className="text-yellow-600">Critical Safety Information</AlertTitle>
        <AlertDescription className="text-yellow-700 dark:text-yellow-300">
          Emergency contacts are displayed on every page of the GPL website. Always verify phone numbers
          are correct before publishing changes. Incorrect numbers could delay emergency response.
        </AlertDescription>
      </Alert>

      {/* Contacts List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Active Emergency Contacts ({contacts.length})
          </CardTitle>
          <CardDescription>
            These contacts are currently displayed on the public website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No emergency contacts configured. Add contacts immediately.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Region</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Primary</TableHead>
                  <TableHead>Secondary</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact: any) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <Badge variant="outline">{contact.region}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>
                      <span className="font-mono font-bold text-red-600">
                        {contact.primaryNumber}
                      </span>
                    </TableCell>
                    <TableCell>
                      {contact.secondaryNumber ? (
                        <span className="font-mono">{contact.secondaryNumber}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>{contact.available}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEdit(contact)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(contact.id)}
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
      <Dialog open={!!editingContact} onOpenChange={(open) => !open && setEditingContact(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <form onSubmit={handleEditSubmit}>
            <DialogHeader>
              <DialogTitle>Edit Emergency Contact</DialogTitle>
              <DialogDescription>
                Update emergency contact information. Verify all numbers before saving.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-region">Region</Label>
                <Input
                  id="edit-region"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-name">Contact Name</Label>
                <Input
                  id="edit-name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-primaryNumber">Primary Number</Label>
                  <Input
                    id="edit-primaryNumber"
                    value={formData.primaryNumber}
                    onChange={(e) => setFormData({ ...formData, primaryNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-secondaryNumber">Secondary Number</Label>
                  <Input
                    id="edit-secondaryNumber"
                    value={formData.secondaryNumber}
                    onChange={(e) => setFormData({ ...formData, secondaryNumber: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-available">Availability</Label>
                <Input
                  id="edit-available"
                  value={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.value })}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingContact(null)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
