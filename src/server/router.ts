/**
 * GPL Website API Router
 *
 * Hono routes for the GPL website API.
 * Using Hono directly for simplicity.
 */
import { Hono } from 'hono'
import { z } from 'zod'
import { eq, desc, and } from 'drizzle-orm'
import { db } from './db'
import {
  contactSubmissions,
  serviceRequests,
  feedback,
  faqs,
  news,
  emergencyContacts,
} from './db'

const api = new Hono()

// Helper for JSON validation
function validateBody<T>(schema: z.ZodType<T>, body: unknown): T {
  return schema.parse(body)
}

// ============================================
// HEALTH CHECK
// ============================================
api.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  })
})

// ============================================
// CONTACT FORM SUBMISSION
// ============================================
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  subject: z.string().min(5).max(200),
  message: z.string().min(10).max(5000),
})

api.post('/contact', async (c) => {
  try {
    const body = await c.req.json()
    const input = validateBody(contactSchema, body)

    const result = await db.insert(contactSubmissions).values({
      name: input.name,
      email: input.email,
      phone: input.phone || null,
      subject: input.subject,
      message: input.message,
      status: 'pending',
    }).returning({ id: contactSubmissions.id })

    return c.json({
      success: true,
      id: result[0]?.id,
      message: 'Thank you for contacting us. We will respond within 2 business days.',
    })
  } catch (error) {
    console.error('Contact submission error:', error)
    return c.json({
      success: false,
      message: 'An error occurred. Please try again or call our hotline.',
    }, 400)
  }
})

// ============================================
// SERVICE REQUEST SUBMISSION
// ============================================
const serviceRequestSchema = z.object({
  type: z.enum([
    'new_connection',
    'disconnection',
    'reconnection',
    'meter_issue',
    'billing_inquiry',
    'streetlight',
    'other',
  ]),
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  address: z.string().min(10).max(500),
  accountNumber: z.string().max(50).optional(),
  details: z.string().min(10).max(5000),
  preferredContactMethod: z.enum(['email', 'phone']).default('email'),
})

api.post('/service-request', async (c) => {
  try {
    const body = await c.req.json()
    const input = validateBody(serviceRequestSchema, body)

    const result = await db.insert(serviceRequests).values({
      type: input.type,
      name: input.name,
      email: input.email,
      phone: input.phone,
      address: input.address,
      accountNumber: input.accountNumber || null,
      details: input.details,
      preferredContactMethod: input.preferredContactMethod,
      status: 'pending',
    }).returning({ id: serviceRequests.id })

    const refNumber = `SR-${Date.now().toString(36).toUpperCase()}`

    return c.json({
      success: true,
      id: result[0]?.id,
      referenceNumber: refNumber,
      message: `Your service request has been submitted. Reference: ${refNumber}`,
    })
  } catch (error) {
    console.error('Service request error:', error)
    return c.json({
      success: false,
      message: 'An error occurred. Please try again or call our hotline.',
    }, 400)
  }
})

// ============================================
// OUTAGE REPORT
// ============================================
const outageSchema = z.object({
  name: z.string().min(2).max(100),
  phone: z.string().min(7).max(20),
  address: z.string().min(10).max(500),
  accountNumber: z.string().max(50).optional(),
  affectedArea: z.string().min(5).max(200),
  description: z.string().min(10).max(2000),
  hazardPresent: z.boolean().default(false),
})

api.post('/outage', async (c) => {
  try {
    const body = await c.req.json()
    const input = validateBody(outageSchema, body)

    await db.insert(serviceRequests).values({
      type: 'other',
      name: input.name,
      email: '',
      phone: input.phone,
      address: input.address,
      accountNumber: input.accountNumber || null,
      details: JSON.stringify({
        reportType: 'outage',
        affectedArea: input.affectedArea,
        description: input.description,
        hazardPresent: input.hazardPresent,
      }),
      preferredContactMethod: 'phone',
      status: 'pending',
    })

    const refNumber = `OUT-${Date.now().toString(36).toUpperCase()}`

    const response: {
      success: boolean
      referenceNumber: string
      message: string
      emergencyNote?: string
    } = {
      success: true,
      referenceNumber: refNumber,
      message: `Outage reported. Reference: ${refNumber}. We will investigate promptly.`,
    }

    if (input.hazardPresent) {
      response.emergencyNote = 'HAZARD REPORTED: Please stay away from the area and call 0475 immediately if downed lines are present.'
    }

    return c.json(response)
  } catch (error) {
    console.error('Outage report error:', error)
    return c.json({
      success: false,
      message: 'Unable to submit report. Please call 0475 for immediate assistance.',
    }, 400)
  }
})

// ============================================
// STREETLIGHT REPORT
// ============================================
const streetlightSchema = z.object({
  reporterName: z.string().min(2).max(100),
  reporterPhone: z.string().min(7).max(20),
  poleNumber: z.string().max(50).optional(),
  location: z.string().min(10).max(500),
  issueType: z.enum(['not_working', 'flickering', 'daylight_burning', 'damaged', 'other']),
  additionalDetails: z.string().max(1000).optional(),
})

api.post('/streetlight', async (c) => {
  try {
    const body = await c.req.json()
    const input = validateBody(streetlightSchema, body)

    await db.insert(serviceRequests).values({
      type: 'streetlight',
      name: input.reporterName,
      email: '',
      phone: input.reporterPhone,
      address: input.location,
      details: JSON.stringify({
        poleNumber: input.poleNumber,
        issueType: input.issueType,
        additionalDetails: input.additionalDetails,
      }),
      preferredContactMethod: 'phone',
      status: 'pending',
    })

    const refNumber = `SL-${Date.now().toString(36).toUpperCase()}`

    return c.json({
      success: true,
      referenceNumber: refNumber,
      message: `Streetlight issue reported. Reference: ${refNumber}. Thank you for helping keep Guyana safe.`,
    })
  } catch (error) {
    console.error('Streetlight report error:', error)
    return c.json({
      success: false,
      message: 'Unable to submit report. Please try again.',
    }, 400)
  }
})

// ============================================
// FEEDBACK SUBMISSION
// ============================================
const feedbackSchema = z.object({
  type: z.enum(['complaint', 'suggestion', 'compliment', 'general']),
  message: z.string().min(10).max(5000),
  name: z.string().max(100).optional(),
  email: z.string().email().optional().or(z.literal('')),
  rating: z.number().min(1).max(5).optional(),
})

api.post('/feedback', async (c) => {
  try {
    const body = await c.req.json()
    const input = validateBody(feedbackSchema, body)

    await db.insert(feedback).values({
      type: input.type,
      message: input.message,
      name: input.name || null,
      email: input.email || null,
      rating: input.rating || null,
      status: 'pending',
    })

    return c.json({
      success: true,
      message: 'Thank you for your feedback. We value your input!',
    })
  } catch (error) {
    console.error('Feedback submission error:', error)
    return c.json({
      success: false,
      message: 'Unable to submit feedback. Please try again.',
    }, 400)
  }
})

// ============================================
// GET FAQs (PUBLIC)
// ============================================
api.get('/faqs', async (c) => {
  try {
    const results = await db.select({
      id: faqs.id,
      question: faqs.question,
      answer: faqs.answer,
      category: faqs.category,
      order: faqs.order,
    })
    .from(faqs)
    .where(eq(faqs.isPublished, true))
    .orderBy(faqs.order, faqs.category)
    .limit(100)

    return c.json({
      faqs: results,
      total: results.length,
    })
  } catch (error) {
    console.error('FAQ fetch error:', error)
    return c.json({
      faqs: [],
      total: 0,
    })
  }
})

// ============================================
// GET NEWS (PUBLIC)
// ============================================
api.get('/news', async (c) => {
  try {
    const limit = parseInt(c.req.query('limit') || '10')
    const offset = parseInt(c.req.query('offset') || '0')

    const results = await db.select({
      id: news.id,
      title: news.title,
      slug: news.slug,
      excerpt: news.excerpt,
      featuredImage: news.featuredImage,
      publishedAt: news.publishedAt,
    })
    .from(news)
    .where(eq(news.status, 'published'))
    .orderBy(desc(news.publishedAt))
    .limit(limit)
    .offset(offset)

    return c.json({
      news: results.map(n => ({
        ...n,
        publishedAt: n.publishedAt?.toISOString() || null,
      })),
      total: results.length,
    })
  } catch (error) {
    console.error('News fetch error:', error)
    return c.json({
      news: [],
      total: 0,
    })
  }
})

// Get single news article by slug
api.get('/news/:slug', async (c) => {
  try {
    const slug = c.req.param('slug')

    const results = await db.select({
      id: news.id,
      title: news.title,
      slug: news.slug,
      content: news.content,
      excerpt: news.excerpt,
      featuredImage: news.featuredImage,
      publishedAt: news.publishedAt,
    })
    .from(news)
    .where(and(
      eq(news.slug, slug),
      eq(news.status, 'published')
    ))
    .limit(1)

    if (results.length === 0) {
      return c.json({ found: false, article: null })
    }

    const article = results[0]
    return c.json({
      found: true,
      article: {
        ...article,
        publishedAt: article.publishedAt?.toISOString() || null,
      },
    })
  } catch (error) {
    console.error('News article fetch error:', error)
    return c.json({ found: false, article: null })
  }
})

// ============================================
// GET EMERGENCY CONTACTS (PUBLIC)
// ============================================
api.get('/emergency-contacts', async (c) => {
  try {
    const results = await db.select({
      id: emergencyContacts.id,
      region: emergencyContacts.region,
      name: emergencyContacts.name,
      primaryNumber: emergencyContacts.primaryNumber,
      secondaryNumber: emergencyContacts.secondaryNumber,
      description: emergencyContacts.description,
      available: emergencyContacts.available,
    })
    .from(emergencyContacts)
    .where(eq(emergencyContacts.isActive, true))
    .orderBy(emergencyContacts.order)

    return c.json({ contacts: results })
  } catch (error) {
    console.error('Emergency contacts fetch error:', error)
    // Return hardcoded fallback for safety-critical data
    return c.json({
      contacts: [
        {
          id: 'fallback-1',
          region: 'Demerara',
          name: 'Demerara Emergency',
          primaryNumber: '0475',
          secondaryNumber: '226-2600',
          description: '24/7 Power Emergency',
          available: '24/7',
        },
        {
          id: 'fallback-2',
          region: 'Berbice',
          name: 'Berbice Emergency',
          primaryNumber: '333-2186',
          secondaryNumber: null,
          description: '24/7 Power Emergency',
          available: '24/7',
        },
        {
          id: 'fallback-3',
          region: 'Essequibo',
          name: 'Essequibo Emergency',
          primaryNumber: '771-4244',
          secondaryNumber: null,
          description: '24/7 Power Emergency',
          available: '24/7',
        },
      ],
    })
  }
})

export const router = api
export type AppRouter = typeof api
