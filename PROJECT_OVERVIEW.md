# GPL Website Project - Complete Overview

## What is This Project?

This is a **modern website replacement** for **Guyana Power & Light Inc. (GPL)**, the national electricity utility company of Guyana. The current website at [gplinc.com](https://gplinc.com/) is outdated, and this project aims to deliver a modern, functional MVP website with better user experience and essential features.

---

## Project Context

### Current Situation
- **Current Site**: [gplinc.com](https://gplinc.com/) - outdated and needs modernization
- **Your Codebase**: KareTech Stack scaffold (modern, production-ready foundation)
- **Specification**: Complete GPL Platform v4.1 spec in `gpl-final/` folder
- **Priority**: Get MVP website live FIRST, then add advanced features later

### What You Have
✅ **Fully scaffolded KareTech Stack** (Bun + Hono + TanStack Router + Drizzle + PostgreSQL)
✅ **Authentication framework** (Better Auth with email + GitHub OAuth)
✅ **Database schema** with users, posts, sessions, accounts tables
✅ **Docker configuration** ready for deployment
✅ **UI framework** (shadcn/ui with Maia theme - blue/zinc colors)
✅ **Complete GPL specification** with advanced features documented

### What Needs to Be Built - MVP

**Immediate Priority (Phase 1 - MVP):**
1. Modern homepage and core pages (about, services, safety, contact, FAQ)
2. **Emergency contacts prominently displayed** (CRITICAL - safety requirement)
3. User authentication fully integrated (login, register, profile)
4. Basic content management system (news, FAQs, pages)
5. Contact and service request forms
6. Basic admin panel for content management

**Future (Phase 2 - Advanced Features):**
- Interactive outage map (MapLibre + PMTiles)
- Customer outage reporting system
- AI chatbot (Cloudflare Workers AI + Ollama)
- Push/email/SMS notifications (Novu)
- BullMQ queue system for high traffic
- Cloudflare Tunnel for production hosting
- Independent status page

---

## Emergency Contacts (MOST CRITICAL)

These **MUST be visible on EVERY page** - this is a safety requirement:

| Region | Primary | Secondary |
|--------|---------|-----------|
| **Demerara** | 0475 | 226-2600 |
| **Berbice** | 333-2186 | - |
| **Essequibo** | Varies | See website |

**Why Critical**: GPL is a utility company. During power outages or emergencies, people need to quickly find these numbers. Could be life-threatening situations (downed power lines, etc.).

---

## Technology Stack

```
Runtime:      Bun (fast JavaScript runtime)
Backend:      Hono.js (ultra-fast web framework)
Frontend:     React 18 + TanStack Router (file-based routing)
Database:     PostgreSQL + Drizzle ORM (type-safe)
UI:           shadcn/ui + Tailwind CSS (Maia theme)
Auth:         Better Auth (email + GitHub OAuth)
API:          oRPC (type-safe client-server communication)
Testing:      Playwright (E2E) + Vitest (unit tests)
Deployment:   Docker + Docker Compose
```

---

## Project Structure

```
gpl-website/
├── src/
│   ├── components/       # React components
│   │   ├── auth/         # Authentication components
│   │   ├── ui/           # UI components (button, input, etc.)
│   │   └── ...           # Custom components (news cards, forms, etc.)
│   ├── routes/           # Pages (TanStack Router)
│   │   ├── index.tsx     # Homepage
│   │   ├── about.tsx     # About page
│   │   ├── auth/         # Auth pages (login, register, etc.)
│   │   └── admin/        # Admin panel pages
│   ├── db/               # Database
│   │   ├── schema.ts     # Database tables (Drizzle ORM)
│   │   ├── seed.ts       # Initial data
│   │   └── index.ts      # DB connection
│   ├── server/           # Backend API
│   │   ├── index.ts      # Server setup (Hono)
│   │   └── router.ts     # API routes (oRPC)
│   ├── lib/              # Utilities
│   └── main.tsx          # Frontend entry
├── public/               # Static assets (images, logos, etc.)
├── tests/e2e/            # Playwright E2E tests
├── gpl-final/            # Complete GPL specification (reference)
│   ├── spec.md           # Full technical spec v4.1
│   ├── CLAUDE.md         # Claude AI context
│   ├── QUICK_REFERENCE.md
│   ├── docker-compose.yml
│   └── Caddyfile
├── package.json          # Dependencies & scripts
├── .env.example          # Environment variables template
└── README.md             # Project documentation
```

---

## Quick Start (Local Development)

### 1. Install Dependencies
```bash
bun install
```

### 2. Set Up Environment
```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Set Up Database
```bash
# Generate migrations
bun run db:generate

# Run migrations
bun run db:migrate

# Seed with initial data
bun run db:seed
```

### 4. Start Development Server
```bash
bun run dev
```

### 5. Access Application
- **Website**: http://localhost:5173
- **API**: http://localhost:5173/api
- **Drizzle Studio** (DB viewer): http://localhost:4983
  ```bash
  bun run db:studio
  ```

---

## Key Commands

```bash
# Development
bun dev                  # Start dev server
bun build               # Build for production
bun preview             # Preview production build

# Database
bun db:generate         # Generate migrations from schema
bun db:migrate          # Run migrations
bun db:studio           # Open database viewer
bun db:seed             # Seed initial data

# Testing
bun test                # Run E2E tests (Playwright)
bun test:ui             # Playwright with UI
bun test:unit           # Unit tests (Vitest)
bun test:all            # All tests

# Code Quality
bun typecheck           # TypeScript type checking
bun lint                # Run ESLint
bun lint:fix            # Fix linting issues
bun format              # Format with Prettier

# Docker
bun docker:build        # Build Docker image
bun docker:run          # Run in container
```

---

## Implementation Plan Summary

### Phase 1: MVP Website (Current Focus)

**Step 1: Emergency Contacts & Layout**
- Create emergency contacts component (HIGHEST PRIORITY)
- Update root layout with header/footer containing emergency contacts
- Implement navigation menu

**Step 2: Database Schema**
- Extend schema with tables for:
  - News/announcements
  - FAQs
  - Dynamic pages (CMS)
  - Contact submissions
  - Service requests
  - Content versions (audit trail)

**Step 3: API Development**
- Build oRPC API routes for:
  - Content management (news, FAQs, pages)
  - Form submissions (contact, service requests)
  - Public data (emergency contacts, status)

**Step 4: Core Pages**
- Homepage (hero, quick links, latest news, emergency banner)
- About GPL
- Services overview
- Safety information (emergency procedures)
- Contact page
- FAQ page

**Step 5: Authentication**
- Complete Better Auth integration
- Login/register pages
- Password reset flow
- User profile page
- Auth guards for protected routes

**Step 6: Forms & Interactions**
- Contact form
- Service request form
- Feedback form
- Form validation with Zod
- Success/error handling

**Step 7: Admin Panel**
- Admin dashboard
- News management (create, edit, delete)
- FAQ management
- Page editor (simple CMS)
- View form submissions
- User management

**Step 8: UI Components**
- Expand component library with shadcn/ui:
  - Input, Textarea, Form components
  - Card, Dialog, Alert components
  - Custom components (news cards, FAQ accordion, etc.)

**Step 9: Content & Branding**
- Add GPL logo and assets
- Create seed data with initial content
- Apply GPL branding (colors, fonts, images)
- Mobile-responsive design

**Step 10: Testing & Polish**
- Manual testing of all features
- Playwright E2E tests
- Accessibility audit
- Performance optimization
- Final polish and bug fixes

---

## MVP Launch Checklist

Before going live, ensure:

✅ **Emergency contacts visible on ALL pages** (header + footer)
✅ Homepage loads with proper content and branding
✅ Navigation works on desktop and mobile
✅ User can register, login, and access profile
✅ Contact form submits successfully
✅ Admin can login and manage content (news, FAQs)
✅ All pages are mobile-responsive
✅ Database migrations run without errors
✅ No TypeScript errors (strict mode)
✅ No console errors in browser
✅ Lighthouse score > 90 (Performance, Accessibility)
✅ All critical user flows tested (registration, login, forms)

---

## Key Reference Documents

1. **Implementation Plan**: `.claude/plans/quizzical-munching-shell.md`
   - Detailed step-by-step plan
   - File structure
   - Testing strategy

2. **GPL Specification v4.1**: `gpl-final/spec.md`
   - Complete technical specification
   - Architecture diagrams
   - Database schema
   - All advanced features documented

3. **Quick Reference**: `gpl-final/QUICK_REFERENCE.md`
   - Commands cheatsheet
   - Service ports
   - Rate limits

4. **Claude Context**: `gpl-final/CLAUDE.md`
   - AI assistant context
   - Common tasks
   - Tech decisions

---

## Important Notes

### 🚨 Critical Requirements

1. **Emergency contacts ALWAYS visible** - non-negotiable safety requirement
2. **Mobile-first design** - many users will access on mobile during outages
3. **TypeScript strict mode** - maintain type safety throughout
4. **Rate limiting on forms** - prevent spam/abuse
5. **Content versioning** - track all changes to content
6. **Audit logging** - log all admin actions

### 💡 Design Guidelines

- Use existing Maia theme (blue/zinc) - appropriate for utility company
- Maintain accessibility standards (WCAG 2.1 AA minimum)
- Keep emergency contacts in red/orange accent colors for visibility
- Ensure high contrast for readability
- Use clear, simple language (not technical jargon)

### 🔒 Security

- All passwords hashed with Better Auth
- CSRF protection enabled
- Session cookies: httpOnly, secure, sameSite
- Input validation with Zod on all forms
- Rate limiting on auth and form endpoints
- PII encrypted at rest (email, phone in spec's advanced features)

### 📱 Responsive Design

- Mobile breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly buttons and inputs (min 44x44px)
- Readable font sizes (min 16px base)
- Collapsible navigation on mobile
- Emergency contacts easily accessible on small screens

---

## Getting Help

### Documentation
- **Better Auth**: https://better-auth.com/
- **Drizzle ORM**: https://orm.drizzle.team/
- **TanStack Router**: https://tanstack.com/router
- **shadcn/ui**: https://ui.shadcn.com/
- **Tailwind CSS**: https://tailwindcss.com/

### Current GPL Website
- **Live Site**: https://gplinc.com/
- Use for reference on:
  - Content structure
  - Services offered
  - Contact information
  - Existing features

---

## Next Steps

1. **Review this document** and the detailed plan in `.claude/plans/quizzical-munching-shell.md`
2. **Start with Step 1**: Create emergency contacts component (highest priority)
3. **Follow the implementation order** in the plan
4. **Test frequently** as you build each component
5. **Keep emergency contacts visible** on every page you create

---

## Contact Information

**Project**: GPL Website MVP
**Tech Stack**: KareTech Stack (Bun + Hono + TanStack + Drizzle)
**Current Phase**: Phase 1 - MVP Development
**Goal**: Modern, functional website to replace outdated gplinc.com

---

*Last Updated: 2026-01-11*
*Version: 1.0*
