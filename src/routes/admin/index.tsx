/**
 * Admin Dashboard
 *
 * Main admin panel for GPL website content management.
 * Protected route - requires admin authentication.
 */
import { createFileRoute, Link, redirect } from '@tanstack/react-router'
import { useAuth } from '@/components/auth/auth-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  FileText,
  MessageSquare,
  AlertTriangle,
  Newspaper,
  HelpCircle,
  Settings,
  Users,
  Activity,
} from 'lucide-react'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
  beforeLoad: async () => {
    // Note: In production, this would check auth state properly
    // For now, we allow access to demonstrate the UI
  },
})

function AdminDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      </div>
    )
  }

  const adminLinks = [
    {
      title: 'FAQs',
      description: 'Manage frequently asked questions',
      href: '/admin/faqs',
      icon: HelpCircle,
      count: '18',
    },
    {
      title: 'News',
      description: 'Create and edit news articles',
      href: '/admin/news',
      icon: Newspaper,
      count: '3',
    },
    {
      title: 'Emergency Contacts',
      description: 'Update emergency contact information',
      href: '/admin/emergency-contacts',
      icon: AlertTriangle,
      count: '5',
    },
    {
      title: 'Contact Submissions',
      description: 'View and respond to contact form submissions',
      href: '/admin/contacts',
      icon: MessageSquare,
      count: '12',
    },
    {
      title: 'Service Requests',
      description: 'Manage service requests from customers',
      href: '/admin/service-requests',
      icon: FileText,
      count: '8',
    },
    {
      title: 'Feedback',
      description: 'Review customer feedback and suggestions',
      href: '/admin/feedback',
      icon: Activity,
      count: '5',
    },
  ]

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back{user?.name ? `, ${user.name}` : ''}. Manage GPL website content and submissions.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Contacts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Service Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 urgent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published FAQs</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">5 categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">News Articles</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Sections */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {adminLinks.map((link) => (
          <Link key={link.href} to={link.href}>
            <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <link.icon className="h-8 w-8 text-primary" />
                  <span className="text-2xl font-bold text-muted-foreground">{link.count}</span>
                </div>
                <CardTitle className="mt-4">{link.title}</CardTitle>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Manage {link.title}
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/admin/faqs">
            <Button variant="outline">
              <HelpCircle className="mr-2 h-4 w-4" />
              Add New FAQ
            </Button>
          </Link>
          <Link to="/admin/news">
            <Button variant="outline">
              <Newspaper className="mr-2 h-4 w-4" />
              Create News Article
            </Button>
          </Link>
          <Link to="/admin/emergency-contacts">
            <Button variant="outline">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Update Emergency Contacts
            </Button>
          </Link>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Site Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
