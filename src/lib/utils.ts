import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs))
}
// API client utility
export const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5173'
export function createApiClient() {
return {
baseUrl: apiUrl,
headers: {
'Content-Type': 'application/json',
}
}
}
// Environment utilities
export const isDev = import.meta.env.DEV
export const isProd = import.meta.env.PROD
export const isTest = import.meta.env.MODE === 'test'
// Local storage utilities with type safety
export function getStoredValue<T>(key: string, defaultValue: T): T {
if (typeof window === 'undefined') return defaultValue
try {
const item = window.localStorage.getItem(key)
return item ? JSON.parse(item) : defaultValue
} catch (error) {
console.warn(`Error reading localStorage key "${key}":`, error)
return defaultValue
}
}
export function setStoredValue<T>(key: string, value: T): void {
if (typeof window === 'undefined') return
try {
window.localStorage.setItem(key, JSON.stringify(value))
} catch (error) {
console.warn(`Error setting localStorage key "${key}":`, error)
}
}
export function removeStoredValue(key: string): void {
if (typeof window === 'undefined') return
try {
window.localStorage.removeItem(key)
} catch (error) {
console.warn(`Error removing localStorage key "${key}":`, error)
}
}
// URL utilities
export function getBaseUrl(): string {
if (typeof window !== 'undefined') {
return window.location.origin
}
return import.meta.env.VITE_API_URL || 'http://localhost:5173'
}
// Format utilities
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
const dateObj = typeof date === 'string' ? new Date(date) : date
return dateObj.toLocaleDateString('en-US', {
year: 'numeric',
month: 'long',
day: 'numeric',
...options,
})
}
export function formatRelativeTime(date: Date | string): string {
const dateObj = typeof date === 'string' ? new Date(date) : date
const now = new Date()
const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000)
if (diffInSeconds < 60) return 'just now'
if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
return formatDate(dateObj)
}
// Error utilities
export class AppError extends Error {
constructor(
message: string,
public code?: string,
public statusCode?: number
) {
super(message)
this.name = 'AppError'
}
}
export function handleError(error: unknown): AppError {
if (error instanceof AppError) return error
if (error instanceof Error) return new AppError(error.message)
return new AppError('An unknown error occurred')
}
// Debounce utility
export function debounce<T extends (...args: any[]) => any>(
func: T,
wait: number
): (...args: Parameters<T>) => void {
let timeout: NodeJS.Timeout | undefined
return (...args: Parameters<T>) => {
clearTimeout(timeout)
timeout = setTimeout(() => func(...args), wait)
}
}
// Throttle utility
export function throttle<T extends (...args: any[]) => any>(
func: T,
limit: number
): (...args: Parameters<T>) => void {
let inThrottle: boolean
return (...args: Parameters<T>) => {
if (!inThrottle) {
func(...args)
inThrottle = true
setTimeout(() => (inThrottle = false), limit)
}
}
}