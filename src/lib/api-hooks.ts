/**
 * API Hooks
 *
 * React Query hooks for the GPL website API.
 * These hooks use fetch for API calls.
 */
import { useMutation, useQuery } from '@tanstack/react-query'
import { getBaseUrl } from './utils'

const API_BASE = `${getBaseUrl()}/api`

// Generic API call function
async function apiCall<TInput, TOutput>(
  route: string,
  input?: TInput
): Promise<TOutput> {
  const response = await fetch(`${API_BASE}/${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: input !== undefined ? JSON.stringify({ input }) : undefined,
  })

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }

  const data = await response.json()
  return data as TOutput
}

// ============================================
// CONTACT FORM
// ============================================

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

interface ContactSubmitResponse {
  success: boolean
  id?: string
  message: string
}

export function useContactSubmit() {
  return useMutation({
    mutationFn: async (data: ContactFormData): Promise<ContactSubmitResponse> => {
      return apiCall<ContactFormData, ContactSubmitResponse>('contact.submit', data)
    },
  })
}

// ============================================
// SERVICE REQUEST
// ============================================

interface ServiceRequestData {
  type: 'new_connection' | 'disconnection' | 'reconnection' | 'meter_issue' | 'billing_inquiry' | 'streetlight' | 'other'
  name: string
  email: string
  phone: string
  address: string
  accountNumber?: string
  details: string
  preferredContactMethod?: 'email' | 'phone'
}

interface ServiceRequestResponse {
  success: boolean
  id?: string
  referenceNumber?: string
  message: string
}

export function useServiceRequestSubmit() {
  return useMutation({
    mutationFn: async (data: ServiceRequestData): Promise<ServiceRequestResponse> => {
      return apiCall<ServiceRequestData, ServiceRequestResponse>('serviceRequest.submit', data)
    },
  })
}

// ============================================
// OUTAGE REPORT
// ============================================

interface OutageReportData {
  name: string
  phone: string
  address: string
  accountNumber?: string
  affectedArea: string
  description: string
  hazardPresent?: boolean
}

interface OutageReportResponse {
  success: boolean
  referenceNumber?: string
  message: string
  emergencyNote?: string
}

export function useOutageReport() {
  return useMutation({
    mutationFn: async (data: OutageReportData): Promise<OutageReportResponse> => {
      return apiCall<OutageReportData, OutageReportResponse>('outage.report', data)
    },
  })
}

// ============================================
// STREETLIGHT REPORT
// ============================================

interface StreetlightReportData {
  reporterName: string
  reporterPhone: string
  poleNumber?: string
  location: string
  issueType: 'not_working' | 'flickering' | 'daylight_burning' | 'damaged' | 'other'
  additionalDetails?: string
}

interface StreetlightReportResponse {
  success: boolean
  referenceNumber?: string
  message: string
}

export function useStreetlightReport() {
  return useMutation({
    mutationFn: async (data: StreetlightReportData): Promise<StreetlightReportResponse> => {
      return apiCall<StreetlightReportData, StreetlightReportResponse>('streetlight.report', data)
    },
  })
}

// ============================================
// FEEDBACK
// ============================================

interface FeedbackData {
  type: 'complaint' | 'suggestion' | 'compliment' | 'general'
  message: string
  name?: string
  email?: string
  rating?: number
}

interface FeedbackResponse {
  success: boolean
  message: string
}

export function useFeedbackSubmit() {
  return useMutation({
    mutationFn: async (data: FeedbackData): Promise<FeedbackResponse> => {
      return apiCall<FeedbackData, FeedbackResponse>('feedback.submit', data)
    },
  })
}

// ============================================
// FAQs
// ============================================

interface FAQsQueryParams {
  category?: 'billing' | 'connections' | 'outages' | 'streetlights' | 'safety' | 'customer_service' | 'technical' | 'account' | 'emergency'
  search?: string
  limit?: number
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
}

interface FAQsResponse {
  faqs: FAQ[]
  total: number
}

export function useFAQs(params: FAQsQueryParams = {}) {
  return useQuery({
    queryKey: ['faqs', params],
    queryFn: async (): Promise<FAQsResponse> => {
      return apiCall<FAQsQueryParams, FAQsResponse>('faqs.list', params)
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

// ============================================
// NEWS
// ============================================

interface NewsQueryParams {
  limit?: number
  offset?: number
}

interface NewsItem {
  id: string
  title: string
  slug: string
  excerpt: string | null
  featuredImage: string | null
  publishedAt: string | null
}

interface NewsResponse {
  news: NewsItem[]
  total: number
}

export function useNews(params: NewsQueryParams = {}) {
  return useQuery({
    queryKey: ['news', params],
    queryFn: async (): Promise<NewsResponse> => {
      return apiCall<NewsQueryParams, NewsResponse>('news.list', params)
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })
}

interface NewsArticle {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  featuredImage: string | null
  publishedAt: string | null
}

interface NewsArticleResponse {
  found: boolean
  article: NewsArticle | null
}

export function useNewsArticle(slug: string) {
  return useQuery({
    queryKey: ['news', 'article', slug],
    queryFn: async (): Promise<NewsArticleResponse> => {
      return apiCall<{ slug: string }, NewsArticleResponse>('news.getBySlug', { slug })
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 10, // 10 minutes
  })
}

// ============================================
// EMERGENCY CONTACTS
// ============================================

interface EmergencyContact {
  id: string
  region: string
  name: string
  primaryNumber: string
  secondaryNumber: string | null
  description: string | null
  available: string
}

interface EmergencyContactsResponse {
  contacts: EmergencyContact[]
}

export function useEmergencyContacts() {
  return useQuery({
    queryKey: ['emergencyContacts'],
    queryFn: async (): Promise<EmergencyContactsResponse> => {
      return apiCall<void, EmergencyContactsResponse>('emergencyContacts.list', undefined)
    },
    staleTime: 1000 * 60 * 60, // 1 hour - emergency contacts rarely change
    gcTime: 1000 * 60 * 60 * 24, // 24 hours cache
  })
}

// ============================================
// HEALTH CHECK
// ============================================

interface HealthResponse {
  status: 'ok'
  timestamp: string
}

export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: async (): Promise<HealthResponse> => {
      return apiCall<void, HealthResponse>('health', undefined)
    },
    staleTime: 1000 * 30, // 30 seconds
    refetchInterval: 1000 * 60, // Check every minute
  })
}
