# GPL Website - Visual Implementation Roadmap

## 🎯 Project Vision

Transform the outdated [gplinc.com](https://gplinc.com/) into a modern, functional website for Guyana Power & Light Inc. with emphasis on user safety, accessibility, and ease of content management.

---

## 📊 Implementation Phases

```
MVP (Phase 1)              Advanced Features (Phase 2)
    ↓                              ↓
┌─────────────────┐        ┌──────────────────────┐
│  Foundation     │        │  Outage Management   │
│  - Emergency    │        │  - Interactive map   │
│  - Core pages   │        │  - Outage reports    │
│  - Auth         │   →    │  - Street light      │
│  - Basic CMS    │        │  - AI chatbot        │
│  - Forms        │        │  - Notifications     │
│  - Admin panel  │        │  - Queue system      │
└─────────────────┘        └──────────────────────┘
    2-3 weeks                   4-6 weeks
```

---

## 🚀 Phase 1: MVP Website (Current Focus)

### Week 1: Foundation & Core Pages

#### Day 1-2: Emergency Infrastructure
```
Priority: CRITICAL ⚠️

Tasks:
✓ Create EmergencyContacts component
✓ Update root layout (__root.tsx)
  - Add emergency contacts to header
  - Add emergency contacts to footer
✓ Create EmergencyBanner component (dismissible, sticky on mobile)
✓ Style with high-contrast colors (red/orange)

Files:
- src/components/emergency-contacts.tsx (NEW)
- src/components/emergency-banner.tsx (NEW)
- src/routes/__root.tsx (MODIFY)
- src/lib/data/emergency.ts (NEW - contact data)
```

#### Day 3-4: Database Foundation
```
Tasks:
✓ Extend database schema
✓ Generate migrations
✓ Test migrations locally
✓ Create seed data file

New Tables:
- news (id, title, content, slug, publishedAt, authorId)
- faqs (id, question, answer, category, order)
- pages (id, slug, title, content, meta)
- content_versions (id, contentType, contentId, versionNumber, data, changedBy)
- contact_submissions (id, name, email, phone, message, status)
- service_requests (id, type, description, contactInfo, status)
- feedback (id, rating, message, page, userId)

Files:
- src/db/schema.ts (MODIFY)
- src/db/seed.ts (CREATE)
- drizzle/ (migrations generated)
```

#### Day 5-7: Core Pages
```
Tasks:
✓ Homepage redesign
  - Hero section with GPL branding
  - Quick links (pay bill, report outage, contact)
  - Latest news section
  - Emergency banner (prominent)
✓ About page (company info, history, mission)
✓ Services page (electricity services, billing, etc.)
✓ Safety page (emergency procedures, electrical safety)
✓ Contact page (contact form + hotlines)
✓ FAQ page (searchable, categorized)

Files:
- src/routes/index.tsx (MODIFY)
- src/routes/about.tsx (ENHANCE)
- src/routes/services.tsx (CREATE)
- src/routes/safety.tsx (CREATE)
- src/routes/contact.tsx (CREATE)
- src/routes/faq.tsx (CREATE)
```

### Week 2: Authentication & Forms

#### Day 8-10: Authentication System
```
Tasks:
✓ Complete Better Auth configuration
✓ Create login page with form
✓ Create registration page with form
✓ Create password reset flow
✓ Create user profile page
✓ Update auth provider component
✓ Add user menu to header
✓ Test all auth flows

Files:
- src/lib/auth.ts (CREATE - Better Auth setup)
- src/components/auth/auth-provider.tsx (MODIFY)
- src/components/auth/login-form.tsx (CREATE)
- src/components/auth/register-form.tsx (CREATE)
- src/components/auth/user-menu.tsx (CREATE)
- src/routes/auth/login.tsx (CREATE)
- src/routes/auth/register.tsx (CREATE)
- src/routes/auth/callback.tsx (CREATE)
- src/routes/auth/forgot-password.tsx (CREATE)
- src/routes/profile.tsx (CREATE)
- auth-email-config.ts (REVIEW/COMPLETE)
- auth-github-config.ts (REVIEW/COMPLETE)
```

#### Day 11-12: Forms & API Routes
```
Tasks:
✓ Build oRPC API routes
  - Content API (news, FAQs, pages)
  - Forms API (contact, service requests, feedback)
  - Public API (emergency contacts, status)
✓ Create contact form component
✓ Create service request form
✓ Create feedback form
✓ Add rate limiting
✓ Add Zod validation schemas

Files:
- src/server/router.ts (MODIFY - add routes)
- src/components/contact-form.tsx (CREATE)
- src/components/service-request-form.tsx (CREATE)
- src/components/feedback-form.tsx (CREATE)
- src/lib/validation.ts (CREATE - Zod schemas)
```

#### Day 13-14: UI Component Library
```
Tasks:
✓ Install shadcn/ui components via CLI
✓ Create custom components
✓ Style components with Maia theme
✓ Test responsiveness

shadcn/ui Components:
- Input, Textarea, Label
- Form, Select
- Card, Dialog, Alert
- Accordion, Tabs
- Badge, Avatar

Custom Components:
- NewsCard (for displaying news articles)
- FaqAccordion (for FAQ display)
- ServiceCard (for services grid)
- EmergencyCard (for safety info)

Files:
- src/components/ui/*.tsx (CREATE via shadcn CLI)
- src/components/news-card.tsx (CREATE)
- src/components/faq-accordion.tsx (CREATE)
- src/components/service-card.tsx (CREATE)
```

### Week 3: Admin Panel & Polish

#### Day 15-17: Admin Panel
```
Tasks:
✓ Create admin layout with sidebar
✓ Create admin dashboard
✓ Create news management page (CRUD)
✓ Create FAQ management page (CRUD)
✓ Create pages editor (simple CMS)
✓ Create form submissions viewer
✓ Create user management page
✓ Add admin route guards
✓ Add audit logging

Files:
- src/routes/admin/__root.tsx (CREATE - admin layout)
- src/routes/admin/index.tsx (CREATE - dashboard)
- src/routes/admin/news.tsx (CREATE)
- src/routes/admin/faqs.tsx (CREATE)
- src/routes/admin/pages.tsx (CREATE)
- src/routes/admin/submissions.tsx (CREATE)
- src/routes/admin/users.tsx (CREATE)
- src/middleware/admin-guard.ts (CREATE)
- src/components/admin/*.tsx (CREATE - admin components)
```

#### Day 18-19: Content & Branding
```
Tasks:
✓ Add GPL logo to public/
✓ Create seed data with GPL content
  - Company information
  - Emergency contacts
  - Sample news articles
  - Common FAQs
  - Initial pages
  - Admin user
✓ Run seed script
✓ Apply GPL branding colors
✓ Add fonts (if custom)
✓ Create placeholder images

Files:
- public/images/logo.svg (ADD)
- public/images/*.jpg (ADD)
- src/db/seed.ts (COMPLETE)
- tailwind.config.js (ADJUST if needed)
```

#### Day 20-21: Testing & QA
```
Tasks:
✓ Manual testing checklist
✓ Write Playwright E2E tests
  - Homepage test
  - Auth flow test
  - Contact form test
  - Admin panel test
✓ Accessibility audit (Lighthouse)
✓ Mobile responsiveness check
✓ Performance optimization
✓ Fix bugs identified
✓ Final polish

Files:
- tests/e2e/homepage.spec.ts (CREATE)
- tests/e2e/auth.spec.ts (CREATE)
- tests/e2e/contact-form.spec.ts (CREATE)
- tests/e2e/admin.spec.ts (CREATE)
```

---

## 🎓 Implementation Insights

### ★ Insight: Emergency Contacts Design Pattern

The emergency contacts system uses a **persistent visibility pattern**:

```typescript
// Pattern: Three-tier visibility
1. Header: Compact phone icon + dropdown (desktop/mobile)
2. Footer: Full contact list (always visible)
3. Sticky Banner: Dismissible but recoverable (localStorage state)

// Why this works:
- Non-intrusive but always accessible
- Muscle memory (footer location)
- Emergency situations (banner prominence)
- User control (dismissible)
```

**Key Learning**: For safety-critical information, redundancy across UI locations is essential. Users under stress need multiple paths to critical data.

---

### ★ Insight: Database Schema Versioning

The `content_versions` table implements **temporal database pattern**:

```typescript
// Every content change creates a version entry
content_versions: {
  id, contentType, contentId, versionNumber,
  data: jsonb, changedBy, createdAt
}

// Benefits:
- Full audit trail (who changed what, when)
- Rollback capability (restore previous versions)
- Diff visualization (compare versions)
- Legal compliance (track all changes)
```

**Key Learning**: In content management systems, versioning isn't optional—it's essential for accountability, recovery, and compliance. The small storage cost is worth the operational benefits.

---

### ★ Insight: oRPC Type-Safe API Pattern

oRPC provides **end-to-end type safety** without code generation:

```typescript
// Server defines contract
export const router = {
  news: {
    list: input(z.object({ limit: z.number() }))
      .output(z.array(newsSchema))
      .handle(async ({ input }) => { /* ... */ }),
  }
}

// Client automatically typed
const news = await api.news.list({ limit: 10 });
//    ^? type: NewsSchema[]
```

**Key Learning**: Type-safe API calls eliminate an entire class of runtime errors. The developer experience improvement (autocomplete, refactoring) significantly speeds up development while reducing bugs.

---

## 📋 Pre-Launch Checklist

### Critical Path Items

```
🚨 SAFETY
□ Emergency contacts visible on ALL pages
□ Emergency contacts in header (compact)
□ Emergency contacts in footer (full list)
□ Emergency banner implemented (dismissible)
□ Safety page with emergency procedures
□ Offline fallback shows emergency contacts

✅ CORE FUNCTIONALITY
□ Homepage loads with GPL branding
□ All core pages accessible (about, services, contact, FAQ, safety)
□ Navigation works (desktop + mobile)
□ User registration works
□ User login works (email + GitHub)
□ Password reset flow works
□ Contact form submits successfully
□ Service request form submits successfully
□ Feedback form submits successfully

🔐 ADMIN PANEL
□ Admin can login
□ Admin can create/edit/delete news
□ Admin can create/edit/delete FAQs
□ Admin can edit pages
□ Admin can view form submissions
□ Admin can manage users
□ Audit log captures all admin actions

📱 RESPONSIVE & ACCESSIBLE
□ Mobile-responsive on all pages
□ Touch targets min 44x44px
□ Keyboard navigation works
□ Screen reader compatible
□ Color contrast ratio > 4.5:1
□ Lighthouse Accessibility score > 90

⚡ PERFORMANCE
□ Page load time < 2 seconds (local)
□ Lighthouse Performance score > 90
□ No console errors
□ No TypeScript errors (strict mode)
□ Images optimized
□ Fonts loaded efficiently

🔒 SECURITY
□ CSRF protection enabled
□ Rate limiting on forms (5/min)
□ Rate limiting on auth (5/15min)
□ Session cookies secure (httpOnly, secure, sameSite)
□ Passwords hashed (Better Auth)
□ Input validation (Zod) on all forms
□ XSS protection (sanitized inputs)

🗄️ DATABASE
□ All migrations run successfully
□ Seed data populates correctly
□ Database constraints in place
□ Indexes on frequently queried columns
□ Backup script tested (for future)

🧪 TESTING
□ Manual test all user flows
□ E2E tests pass (Playwright)
□ Unit tests pass (Vitest) [if created]
□ Auth flows tested (register, login, reset)
□ Forms tested (submit, validation)
□ Admin panel tested (CRUD operations)
```

---

## 🎯 Success Metrics

### Launch Ready Indicators

| Metric | Target | Priority |
|--------|--------|----------|
| Emergency contacts visible | 100% of pages | CRITICAL |
| Page load time | < 2s | High |
| Lighthouse Performance | > 90 | High |
| Lighthouse Accessibility | > 90 | High |
| Mobile usability | 100% | High |
| TypeScript errors | 0 | High |
| Browser console errors | 0 | Medium |
| Test coverage | > 70% | Medium |
| Auth success rate | > 99% | High |
| Form submission success | > 99% | High |

---

## 📚 Phase 2: Advanced Features (Future)

### Outage Management System
- Interactive map with MapLibre + PMTiles
- Customer outage reporting wizard
- Street light reporting system
- Admin outage management dashboard
- Automated status updates

### AI Chatbot
- Cloudflare Workers AI (primary)
- Ollama self-hosted (fallback)
- GPL-specific knowledge base
- Multi-language support (EN, HI, PT, ES)
- Emergency escalation to human agents

### Notification System
- Novu self-hosted platform
- Push notifications (primary, free)
- Email notifications (secondary, low cost)
- WhatsApp notifications (opt-in)
- SMS notifications (critical only, opt-in)
- Subscriber management with preferences

### Queue System
- BullMQ + Redis for job processing
- Handle 10,000+ concurrent reports
- Rate-limited processing
- Retry logic with exponential backoff
- Job status tracking

### Production Infrastructure
- Hetzner VPS deployment (~$60/mo)
- Cloudflare Tunnel (Zero Trust entry)
- Docker Compose orchestration
- Independent status page (Cloudflare Pages)
- R2 storage for photos
- Automated backups to R2

---

## 🛠️ Development Workflow

### Daily Workflow
```bash
# Morning
git pull                    # Get latest changes
bun install                 # Update dependencies if needed
bun dev                     # Start development server

# During Development
bun db:studio              # View database in browser
bun typecheck              # Check types frequently
bun lint                   # Run linter before commits

# Before Committing
bun typecheck              # Ensure no TS errors
bun lint:fix               # Fix linting issues
bun test                   # Run tests
git add .
git commit -m "feat: description"
```

### Git Commit Convention
```
feat: new feature
fix: bug fix
docs: documentation
style: formatting
refactor: code restructuring
test: adding tests
chore: maintenance
```

---

## 💡 Key Decisions Made

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Stack** | KareTech Stack | Modern, type-safe, fast development |
| **Database** | PostgreSQL | Reliable, ACID compliant, widely supported |
| **ORM** | Drizzle | Type-safe, lightweight, excellent DX |
| **Auth** | Better Auth | Modern, flexible, built-in OAuth |
| **UI** | shadcn/ui + Tailwind | Customizable, accessible, beautiful |
| **Routing** | TanStack Router | Type-safe, file-based, excellent DX |
| **API** | oRPC | Type-safe, no code generation, simple |
| **Testing** | Playwright + Vitest | Industry standard, reliable |
| **Maps (future)** | MapLibre + PMTiles | $0 cost vs $10k+ with Mapbox |
| **Hosting (future)** | Cloudflare Tunnel | Zero exposed ports, DDoS protection |

---

## 🎨 Design System

### Colors (Maia Theme)
```
Primary:   Blue (#3B82F6)
Accent:    Zinc Gray
Emergency: Red/Orange (#EF4444 / #F97316)
Success:   Green (#10B981)
Warning:   Yellow (#F59E0B)
Error:     Red (#EF4444)
```

### Typography
```
Font:       Figtree (Google Fonts)
Base Size:  16px
Scale:      1.25 (Major Third)

Headings:
  h1: 3rem (48px)
  h2: 2.25rem (36px)
  h3: 1.875rem (30px)
  h4: 1.5rem (24px)
```

### Spacing
```
Base Unit: 4px (1rem = 16px)
Scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32

Common:
  Gap:     1rem (16px)
  Section: 4rem (64px)
  Padding: 1.5rem (24px)
```

---

## 🔗 Quick Links

### Documentation
- [Complete Plan](./.claude/plans/quizzical-munching-shell.md)
- [Project Overview](./PROJECT_OVERVIEW.md)
- [GPL Spec](./gpl-final/spec.md)
- [GPL Quick Reference](./gpl-final/QUICK_REFERENCE.md)
- [GPL Claude Context](./gpl-final/CLAUDE.md)

### External Resources
- [Better Auth Docs](https://better-auth.com/)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [TanStack Router Docs](https://tanstack.com/router)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Current GPL Website](https://gplinc.com/)

---

## 📞 Emergency Contacts (Reference)

| Region | Primary | Secondary |
|--------|---------|-----------|
| **Demerara** | 0475 | 226-2600 |
| **Berbice** | 333-2186 | - |
| **Essequibo** | Varies by area | See website |

---

*Roadmap Version: 1.0*
*Last Updated: 2026-01-11*
*Status: Ready for Implementation*
