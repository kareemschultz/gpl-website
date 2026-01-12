import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  integer,
  jsonb,
  index,
  pgEnum,
} from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { relations } from 'drizzle-orm'

// ============================================
// ENUMS
// ============================================

export const userRoleEnum = pgEnum('user_role', ['user', 'admin', 'super_admin'])
export const contentStatusEnum = pgEnum('content_status', ['draft', 'published', 'archived'])
export const submissionStatusEnum = pgEnum('submission_status', ['pending', 'in_progress', 'resolved', 'closed'])
export const serviceRequestTypeEnum = pgEnum('service_request_type', [
  'new_connection',
  'disconnection',
  'reconnection',
  'meter_issue',
  'billing_inquiry',
  'streetlight',
  'other',
])
export const feedbackTypeEnum = pgEnum('feedback_type', ['complaint', 'suggestion', 'compliment', 'general'])
export const faqCategoryEnum = pgEnum('faq_category', [
  'billing',
  'connections',
  'outages',
  'streetlights',
  'safety',
  'customer_service',
  'technical',
  'account',
  'emergency',
])

// ============================================
// USER & AUTH TABLES
// ============================================

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false),
  image: text('image'),
  role: userRoleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  users_email_idx: index('users_email_idx').on(table.email),
  users_role_idx: index('users_role_idx').on(table.role),
}))

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  sessions_user_id_idx: index('sessions_user_id_idx').on(table.userId),
  sessions_token_idx: index('sessions_token_idx').on(table.token),
}))

export const accounts = pgTable('accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }).notNull(),
  accountType: text('account_type').notNull(),
  githubId: text('github_id'),
  googleId: text('google_id'),
  password: text('password'),
  salt: text('salt'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  accounts_user_id_idx: index('accounts_user_id_idx').on(table.userId),
}))

export const verificationTokens = pgTable('verification_tokens', {
  identifier: text('identifier').notNull(),
  token: text('token').notNull(),
  expires: timestamp('expires').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// ============================================
// CONTENT MANAGEMENT TABLES
// ============================================

/**
 * News articles and announcements
 */
export const news = pgTable('news', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  featuredImage: text('featured_image'),
  status: contentStatusEnum('status').default('draft').notNull(),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'set null' }),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  news_slug_idx: index('news_slug_idx').on(table.slug),
  news_status_idx: index('news_status_idx').on(table.status),
  news_published_at_idx: index('news_published_at_idx').on(table.publishedAt),
}))

/**
 * Frequently Asked Questions
 */
export const faqs = pgTable('faqs', {
  id: uuid('id').defaultRandom().primaryKey(),
  question: text('question').notNull(),
  answer: text('answer').notNull(),
  category: faqCategoryEnum('category').notNull(),
  order: integer('order').default(0).notNull(),
  isPublished: boolean('is_published').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  faqs_category_idx: index('faqs_category_idx').on(table.category),
  faqs_order_idx: index('faqs_order_idx').on(table.order),
}))

/**
 * Dynamic CMS pages
 */
export const pages = pgTable('pages', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  metaDescription: text('meta_description'),
  metaKeywords: text('meta_keywords'),
  status: contentStatusEnum('status').default('draft').notNull(),
  authorId: uuid('author_id').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  pages_slug_idx: index('pages_slug_idx').on(table.slug),
  pages_status_idx: index('pages_status_idx').on(table.status),
}))

// ============================================
// FORM SUBMISSION TABLES
// ============================================

/**
 * Contact form submissions
 */
export const contactSubmissions = pgTable('contact_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: submissionStatusEnum('status').default('pending').notNull(),
  assignedTo: uuid('assigned_to').references(() => users.id, { onDelete: 'set null' }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  contact_submissions_status_idx: index('contact_submissions_status_idx').on(table.status),
  contact_submissions_created_at_idx: index('contact_submissions_created_at_idx').on(table.createdAt),
}))

/**
 * Service request form submissions
 */
export const serviceRequests = pgTable('service_requests', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: serviceRequestTypeEnum('type').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  accountNumber: text('account_number'),
  details: text('details').notNull(),
  preferredContactMethod: text('preferred_contact_method').default('email'),
  status: submissionStatusEnum('status').default('pending').notNull(),
  assignedTo: uuid('assigned_to').references(() => users.id, { onDelete: 'set null' }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  service_requests_type_idx: index('service_requests_type_idx').on(table.type),
  service_requests_status_idx: index('service_requests_status_idx').on(table.status),
  service_requests_created_at_idx: index('service_requests_created_at_idx').on(table.createdAt),
}))

/**
 * User feedback submissions
 */
export const feedback = pgTable('feedback', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: feedbackTypeEnum('type').notNull(),
  message: text('message').notNull(),
  email: text('email'),
  name: text('name'),
  rating: integer('rating'),
  status: submissionStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  feedback_type_idx: index('feedback_type_idx').on(table.type),
  feedback_status_idx: index('feedback_status_idx').on(table.status),
}))

// ============================================
// EMERGENCY & REFERENCE TABLES
// ============================================

/**
 * Emergency contacts by region
 */
export const emergencyContacts = pgTable('emergency_contacts', {
  id: uuid('id').defaultRandom().primaryKey(),
  region: text('region').notNull(),
  name: text('name').notNull(),
  primaryNumber: text('primary_number').notNull(),
  secondaryNumber: text('secondary_number'),
  description: text('description'),
  available: text('available').default('24/7').notNull(),
  order: integer('order').default(0).notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emergency_contacts_region_idx: index('emergency_contacts_region_idx').on(table.region),
  emergency_contacts_order_idx: index('emergency_contacts_order_idx').on(table.order),
}))

// ============================================
// AUDIT & VERSIONING TABLES
// ============================================

/**
 * Content version history for CMS content
 */
export const contentVersions = pgTable('content_versions', {
  id: uuid('id').defaultRandom().primaryKey(),
  entityType: text('entity_type').notNull(), // 'news', 'page', 'faq'
  entityId: uuid('entity_id').notNull(),
  content: jsonb('content').notNull(),
  changedBy: uuid('changed_by').references(() => users.id, { onDelete: 'set null' }),
  changeDescription: text('change_description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  content_versions_entity_idx: index('content_versions_entity_idx').on(table.entityType, table.entityId),
  content_versions_created_at_idx: index('content_versions_created_at_idx').on(table.createdAt),
}))

/**
 * Audit log for admin actions
 */
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').defaultRandom().primaryKey(),
  action: text('action').notNull(), // 'create', 'update', 'delete', 'login', 'logout'
  entityType: text('entity_type'), // 'user', 'news', 'page', etc.
  entityId: uuid('entity_id'),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'set null' }),
  details: jsonb('details'),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  audit_logs_action_idx: index('audit_logs_action_idx').on(table.action),
  audit_logs_entity_idx: index('audit_logs_entity_idx').on(table.entityType, table.entityId),
  audit_logs_user_id_idx: index('audit_logs_user_id_idx').on(table.userId),
  audit_logs_created_at_idx: index('audit_logs_created_at_idx').on(table.createdAt),
}))

// ============================================
// RELATIONS
// ============================================

export const usersRelations = relations(users, ({ many }) => ({
  sessions: many(sessions),
  accounts: many(accounts),
  news: many(news),
  pages: many(pages),
  auditLogs: many(auditLogs),
}))

export const newsRelations = relations(news, ({ one }) => ({
  author: one(users, {
    fields: [news.authorId],
    references: [users.id],
  }),
}))

export const pagesRelations = relations(pages, ({ one }) => ({
  author: one(users, {
    fields: [pages.authorId],
    references: [users.id],
  }),
}))

// ============================================
// ZOD SCHEMAS
// ============================================

// User schemas
export const insertUserSchema = createInsertSchema(users)
export const selectUserSchema = createSelectSchema(users)
export type User = z.infer<typeof selectUserSchema>
export type NewUser = z.infer<typeof insertUserSchema>

// News schemas
export const insertNewsSchema = createInsertSchema(news, {
  title: z.string().min(1, 'Title is required').max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  content: z.string().min(1, 'Content is required'),
})
export const selectNewsSchema = createSelectSchema(news)
export type News = z.infer<typeof selectNewsSchema>
export type NewNews = z.infer<typeof insertNewsSchema>

// FAQ schemas
export const insertFaqSchema = createInsertSchema(faqs, {
  question: z.string().min(5, 'Question must be at least 5 characters').max(500),
  answer: z.string().min(10, 'Answer must be at least 10 characters'),
})
export const selectFaqSchema = createSelectSchema(faqs)
export type Faq = z.infer<typeof selectFaqSchema>
export type NewFaq = z.infer<typeof insertFaqSchema>

// Page schemas
export const insertPageSchema = createInsertSchema(pages, {
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase with hyphens only'),
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().min(1, 'Content is required'),
})
export const selectPageSchema = createSelectSchema(pages)
export type Page = z.infer<typeof selectPageSchema>
export type NewPage = z.infer<typeof insertPageSchema>

// Contact submission schemas
export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions, {
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
})
export const selectContactSubmissionSchema = createSelectSchema(contactSubmissions)
export type ContactSubmission = z.infer<typeof selectContactSubmissionSchema>
export type NewContactSubmission = z.infer<typeof insertContactSubmissionSchema>

// Service request schemas
export const insertServiceRequestSchema = createInsertSchema(serviceRequests, {
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Phone number is required').max(20),
  address: z.string().min(10, 'Full address is required').max(500),
  details: z.string().min(10, 'Please provide details about your request').max(5000),
})
export const selectServiceRequestSchema = createSelectSchema(serviceRequests)
export type ServiceRequest = z.infer<typeof selectServiceRequestSchema>
export type NewServiceRequest = z.infer<typeof insertServiceRequestSchema>

// Feedback schemas
export const insertFeedbackSchema = createInsertSchema(feedback, {
  message: z.string().min(10, 'Feedback must be at least 10 characters').max(5000),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  rating: z.number().min(1).max(5).optional(),
})
export const selectFeedbackSchema = createSelectSchema(feedback)
export type Feedback = z.infer<typeof selectFeedbackSchema>
export type NewFeedback = z.infer<typeof insertFeedbackSchema>

// Emergency contact schemas
export const insertEmergencyContactSchema = createInsertSchema(emergencyContacts, {
  region: z.string().min(1, 'Region is required').max(100),
  name: z.string().min(1, 'Name is required').max(200),
  primaryNumber: z.string().min(3, 'Primary number is required').max(20),
})
export const selectEmergencyContactSchema = createSelectSchema(emergencyContacts)
export type EmergencyContactRecord = z.infer<typeof selectEmergencyContactSchema>
export type NewEmergencyContactRecord = z.infer<typeof insertEmergencyContactSchema>

// Session schemas
export const insertSessionSchema = createInsertSchema(sessions)
export const selectSessionSchema = createSelectSchema(sessions)
export type Session = z.infer<typeof selectSessionSchema>
export type NewSession = z.infer<typeof insertSessionSchema>

// Audit log schemas
export const insertAuditLogSchema = createInsertSchema(auditLogs)
export const selectAuditLogSchema = createSelectSchema(auditLogs)
export type AuditLog = z.infer<typeof selectAuditLogSchema>
export type NewAuditLog = z.infer<typeof insertAuditLogSchema>
