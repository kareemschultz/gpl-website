# GPL Website Architecture

**Document Version**: 1.0
**Last Updated**: 2026-01-11
**Status**: Active Development

---

## Overview

The GPL Website is built on the **KareTech Stack** (Better-T-Stack), a modern full-stack TypeScript framework optimized for developer experience and performance.

```
┌─────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                      │
├─────────────────────────────────────────────────────────────┤
│  TanStack Router  │  TanStack Query  │  React 19  │ shadcn │
├─────────────────────────────────────────────────────────────┤
│                     oRPC (Type-Safe RPC)                     │
├─────────────────────────────────────────────────────────────┤
│                      Hono.js Server                          │
├─────────────────────────────────────────────────────────────┤
│  Better Auth  │  Drizzle ORM  │  Zod Validation  │  oRPC   │
├─────────────────────────────────────────────────────────────┤
│                      PostgreSQL                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Tech Stack Rationale

### Runtime: Bun

**Why Bun?**
- 3-4x faster than Node.js for most operations
- Built-in TypeScript support (no transpilation step)
- Native package management (faster than npm/yarn)
- Compatible with Node.js ecosystem

### Backend: Hono.js + oRPC

**Why Hono.js?**
- Lightweight (~14kb), edge-first framework
- Excellent TypeScript support
- Middleware ecosystem (CORS, auth, rate limiting)
- Fast request handling with low memory overhead

**Why oRPC over tRPC?**
- Simpler API, less boilerplate
- Better integration with Hono.js
- Full type inference between client and server
- Smaller bundle size

### Frontend: TanStack Router + React

**Why TanStack Router?**
- File-based routing with full type safety
- Built-in data loading and caching
- Search params as state (type-safe)
- Better code splitting than React Router

**Why React 19?**
- Latest features (Server Components support)
- Improved performance
- Better concurrent rendering

### UI: shadcn/ui + Tailwind CSS

**Why shadcn/ui?**
- Copy-paste components (no npm dependency lock-in)
- Fully customizable
- Built on Radix UI (accessibility-first)
- Tailwind CSS integration

**Theme: Maia**
- Blue primary color (matches GPL branding)
- Zinc neutral colors
- Professional, clean aesthetic

### Database: PostgreSQL + Drizzle ORM

**Why PostgreSQL?**
- Battle-tested reliability
- Excellent for concurrent writes (important for outage reports)
- JSON support for flexible content
- Full-text search capabilities

**Why Drizzle ORM?**
- TypeScript-first with full type inference
- SQL-like syntax (easier to debug)
- Lightweight (no heavy runtime)
- Great migration system

### Authentication: Better Auth

**Why Better Auth?**
- Modern, TypeScript-first auth library
- Email/password + OAuth providers
- Session-based (more secure for web apps)
- Easy to extend

---

## Directory Structure

```
gpl-website/
├── .beads/                    # Beads tracking system
│   ├── config.json           # Tracking configuration
│   ├── issues/               # Issue tracking files
│   ├── sprints/              # Sprint definitions
│   └── sessions/             # Work session logs
├── .claude/                   # Claude AI configuration
│   ├── agents/               # Agent definitions
│   ├── plans/                # Implementation plans
│   ├── settings.json         # Project constitution
│   └── skills/               # Skill definitions
├── gpl-final/                 # GPL specification documents
│   ├── spec.md               # Full platform specification
│   ├── CLAUDE.md             # Claude context document
│   └── QUICK_REFERENCE.md    # Quick reference card
├── src/
│   ├── components/           # React components
│   │   ├── auth/             # Authentication components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── emergency-contacts.tsx  # Emergency contacts (CRITICAL)
│   │   ├── emergency-banner.tsx    # Dismissible banner
│   │   └── ...               # Other components
│   ├── db/
│   │   ├── schema.ts         # Drizzle schema definitions
│   │   ├── migrations/       # Generated migrations
│   │   └── seed.ts           # Seed data script
│   ├── lib/
│   │   ├── api.ts            # oRPC client
│   │   ├── auth.ts           # Better Auth client
│   │   └── utils.ts          # Utility functions
│   ├── routes/
│   │   ├── __root.tsx        # Root layout (emergency contacts here!)
│   │   ├── index.tsx         # Homepage
│   │   ├── services.tsx      # Services page
│   │   ├── safety.tsx        # Safety information
│   │   ├── contact.tsx       # Contact form
│   │   ├── faq.tsx           # FAQ page
│   │   ├── auth/             # Auth routes
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   └── callback.tsx
│   │   └── admin/            # Admin routes
│   │       ├── __root.tsx    # Admin layout with guard
│   │       ├── index.tsx     # Dashboard
│   │       └── ...           # CRUD pages
│   └── server/
│       ├── index.ts          # Hono server entry
│       ├── router.ts         # oRPC router
│       └── db.ts             # Database connection
├── tests/
│   ├── e2e/                  # Playwright E2E tests
│   └── unit/                 # Vitest unit tests
├── public/                    # Static assets
│   └── images/               # GPL branding assets
├── drizzle.config.ts         # Drizzle configuration
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript configuration
└── tailwind.config.ts        # Tailwind configuration
```

---

## Data Flow

### Client-to-Server Communication

```
User Action → React Component → TanStack Query → oRPC Client
                                                      ↓
                                                 HTTP Request
                                                      ↓
Hono.js Server ← oRPC Router ← Procedure Handler
      ↓
Drizzle ORM → PostgreSQL
      ↓
Response → oRPC Client → TanStack Query Cache → React Component
```

### Type Safety Chain

```
Database Schema (Drizzle)
        ↓
   TypeScript Types
        ↓
  oRPC Procedures (Zod validation)
        ↓
   oRPC Client (auto-generated types)
        ↓
  React Components (full type inference)
```

---

## Database Schema (MVP)

### Core Tables

```typescript
// Users & Auth (Better Auth managed)
users, sessions, accounts, verification_tokens

// Content Management
news: { id, title, slug, content, excerpt, published_at, author_id, status }
faqs: { id, question, answer, category, order, is_published }
pages: { id, slug, title, content, meta_description, is_published }

// Forms
contact_submissions: { id, name, email, subject, message, status, created_at }
service_requests: { id, type, details, name, email, phone, address, status }
feedback: { id, type, message, email, rating, created_at }

// Emergency
emergency_contacts: { id, region, name, primary_number, secondary_number, order }

// Audit
content_versions: { id, entity_type, entity_id, content, changed_by, created_at }
audit_logs: { id, action, entity_type, entity_id, user_id, details, created_at }
```

---

## Security Architecture

### Authentication Flow

```
1. User submits credentials → Better Auth validates
2. Session created → Stored in PostgreSQL
3. Session cookie set → HttpOnly, Secure, SameSite=Lax
4. Subsequent requests → Session validated via middleware
```

### Authorization Levels

| Role | Access |
|------|--------|
| Guest | Public pages, forms submission |
| User | Profile, preferences, form history |
| Admin | Content management, user management |
| Super Admin | System settings, audit logs |

### API Security

- **Rate Limiting**: Hono.js middleware
- **CSRF Protection**: Better Auth built-in
- **Input Validation**: Zod schemas on all inputs
- **SQL Injection Prevention**: Drizzle ORM parameterized queries

---

## Performance Considerations

### Frontend
- **Code Splitting**: TanStack Router file-based routes
- **Lazy Loading**: Components loaded on demand
- **Caching**: TanStack Query with stale-while-revalidate
- **Static Assets**: Served from public/ with cache headers

### Backend
- **Connection Pooling**: Drizzle with PostgreSQL pool
- **Response Caching**: Cache-Control headers for static content
- **Efficient Queries**: Proper indexes on frequently queried columns

---

## Future Architecture (Phase 2)

### Outage Mapping

```
MapLibre GL JS (client)
        ↓
PMTiles (static tile hosting - $0 cost)
        ↓
Outage API → PostgreSQL with PostGIS
```

### AI Chatbot

```
User Question → Cloudflare Workers AI (primary)
                        ↓
              Fallback: Local Ollama
                        ↓
                 Response to User
```

### Notifications (Novu)

```
Event Trigger → BullMQ Job Queue
                    ↓
              Novu API
                    ↓
    ┌───────────────┼───────────────┐
    ↓               ↓               ↓
   Push           Email           SMS
```

---

## Key Architectural Decisions

### ADR-001: oRPC over tRPC
**Decision**: Use oRPC for type-safe API communication
**Rationale**: Simpler API, better Hono.js integration, smaller bundle

### ADR-002: Session-based Auth
**Decision**: Use session cookies instead of JWT
**Rationale**: More secure for web apps, easier session invalidation

### ADR-003: PostgreSQL for Everything
**Decision**: Single PostgreSQL database for all data
**Rationale**: Simplicity, transactional consistency, proven reliability

### ADR-004: File-based Routing
**Decision**: Use TanStack Router file-based routing
**Rationale**: Type safety, code organization, automatic code splitting

### ADR-005: Emergency Contacts Always Visible
**Decision**: Emergency contacts in root layout, not individual pages
**Rationale**: Safety requirement - must be visible on EVERY page

---

## Development Workflow

### Local Development

```bash
bun install          # Install dependencies
bun run dev          # Start dev server (hot reload)
bun run db:generate  # Generate migrations
bun run db:migrate   # Run migrations
bun run db:studio    # Open Drizzle Studio
bun run db:seed      # Seed database
bun run test         # Run tests
bun run build        # Production build
```

### Code Quality

- **TypeScript**: Strict mode, no `any` types
- **Linting**: ESLint with recommended rules
- **Formatting**: Prettier
- **Testing**: Playwright for E2E, Vitest for unit

---

## References

- [Better-T-Stack Documentation](https://github.com/better-t-stack)
- [Hono.js Documentation](https://hono.dev)
- [TanStack Router Documentation](https://tanstack.com/router)
- [Drizzle ORM Documentation](https://orm.drizzle.team)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Better Auth Documentation](https://www.better-auth.com)
