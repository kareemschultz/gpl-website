# GPL Website

**Official Website for Guyana Power & Light Inc.**

A modern, responsive web application for GPL customers to access services, report outages, view safety information, and manage their electricity accounts.

[![Build Status](https://github.com/kareemschultz/gpl-website/actions/workflows/test.yml/badge.svg)](https://github.com/kareemschultz/gpl-website/actions)

## 🚨 Emergency Contacts

**ALWAYS VISIBLE ON EVERY PAGE**

| Region | Primary | Secondary |
|--------|---------|-----------|
| **Demerara** | 0475 | 226-2600 |
| **Berbice** | 333-2186 | - |
| **Essequibo** | 771-4244 | - |

---

## ✨ Features

### Public Features
- **Homepage** - Company overview, quick links, service highlights
- **Services** - Complete list of GPL services and how to access them
- **Safety** - Critical electrical safety information and guidelines
- **Contact** - Multiple contact forms (general inquiries, service requests, outage reports, streetlight issues, feedback)
- **FAQ** - Categorized frequently asked questions

### Customer Portal (Coming Soon)
- View and pay bills online
- Track service requests
- Receive outage notifications

### Admin Panel
- Dashboard with real-time statistics
- FAQ management (CRUD)
- News article management
- Emergency contacts management
- Contact submissions viewer
- Service requests tracking
- Customer feedback management

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Runtime** | [Bun](https://bun.sh) |
| **Frontend** | React 18 + TypeScript |
| **Routing** | TanStack Router (file-based) |
| **Backend** | Hono.js |
| **Database** | PostgreSQL + Drizzle ORM |
| **Auth** | Better Auth (email + GitHub OAuth) |
| **UI** | shadcn/ui + Tailwind CSS |
| **Testing** | Playwright (E2E) + Vitest (Unit) |
| **Deployment** | Docker + GitHub Actions |

---

## 🚀 Quick Start

### Prerequisites
- [Bun](https://bun.sh) v1.0+ (recommended) or Node.js 18+
- PostgreSQL 14+

### Installation

```bash
# Clone the repository
git clone https://github.com/kareemschultz/gpl-website.git
cd gpl-website

# Install dependencies
bun install

# Set up environment
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
bun run db:migrate

# Seed with GPL content
bun run db:seed

# Start development server
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📜 Available Scripts

### Development
```bash
bun dev          # Start dev server with HMR
bun build        # Build for production
bun preview      # Preview production build
```

### Database
```bash
bun run db:generate  # Generate migrations from schema
bun run db:migrate   # Run pending migrations
bun run db:push      # Push schema (dev only)
bun run db:studio    # Open Drizzle Studio
bun run db:seed      # Seed with GPL data
```

### Testing
```bash
bun run test         # Run Playwright E2E tests
bun run test:ui      # Run with Playwright UI
bun run test:unit    # Run Vitest unit tests
```

### Code Quality
```bash
bun run typecheck    # TypeScript type checking
bun run lint         # ESLint
bun run format       # Prettier formatting
```

---

## 📂 Project Structure

```
gpl-website/
├── src/
│   ├── components/
│   │   ├── auth/           # Auth provider & hooks
│   │   └── ui/             # shadcn/ui components (29)
│   ├── routes/
│   │   ├── __root.tsx      # Root layout (emergency contacts in header/footer)
│   │   ├── index.tsx       # Homepage
│   │   ├── services.tsx    # Services page
│   │   ├── safety.tsx      # Safety information
│   │   ├── contact.tsx     # Contact forms
│   │   ├── faq.tsx         # FAQ page
│   │   ├── auth/           # Login & Register
│   │   └── admin/          # Admin panel pages
│   ├── db/
│   │   ├── schema.ts       # Database schema (13 tables, 6 enums)
│   │   ├── migrations/     # Drizzle migrations
│   │   └── seed.ts         # GPL content seeder
│   ├── server/
│   │   ├── index.ts        # Hono server + auth handler
│   │   └── router.ts       # API routes
│   └── lib/
│       ├── auth.ts         # Better Auth server config
│       ├── auth-client.ts  # Better Auth client
│       └── emergency-contacts.ts  # Emergency contact data
├── tests/
│   └── e2e/                # Playwright E2E tests
├── .beads/                 # Project tracking (Beads system)
└── docs/                   # Additional documentation
```

---

## 🔐 Environment Variables

Create a `.env` file with:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/gpl_website

# Authentication
BETTER_AUTH_SECRET=your-secret-key-min-32-chars
BETTER_AUTH_BASE_URL=http://localhost:5173

# OAuth (optional)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

See `.env.example` for all available options.

---

## 🗄️ Database Schema

### Core Tables
- `users` - Customer accounts
- `sessions` - Auth sessions
- `accounts` - OAuth provider links
- `faqs` - FAQ entries with categories
- `news` - News articles
- `emergency_contacts` - Regional emergency numbers

### Service Tables
- `contact_submissions` - Contact form submissions
- `service_requests` - New connections, disconnections, etc.
- `outage_reports` - Power outage reports
- `streetlight_reports` - Streetlight issues
- `feedback` - Customer feedback with ratings

### Enums
- `faq_category` - billing, services, outages, safety, account, general
- `submission_status` - pending, in_progress, resolved, closed
- `service_request_type` - new_connection, disconnection, reconnection, etc.
- `feedback_type` - complaint, suggestion, compliment, general
- `streetlight_issue` - not_working, flickering, damaged, other

---

## 🐳 Docker Deployment

```bash
# Build image
docker build -t gpl-website .

# Run with docker-compose
docker-compose up -d

# Or run directly
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://... \
  -e BETTER_AUTH_SECRET=... \
  gpl-website
```

---

## 📊 GPL Branding

The website uses GPL's official color scheme:

| Color | HSL | Usage |
|-------|-----|-------|
| **GPL Green** | `142 76% 36%` | Primary actions, links |
| **GPL Gold** | `45 93% 47%` | Accents, highlights |
| **Emergency Red** | `0 84% 50%` | Emergency info, alerts |

Dark mode is fully supported with adjusted color values.

---

## 📚 Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical architecture
- [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Current status & completion
- [CHANGELOG.md](./CHANGELOG.md) - Version history
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide
- [VPS_DEPLOYMENT.md](./VPS_DEPLOYMENT.md) - VPS-specific deployment

---

## 🧪 Testing

### E2E Tests Cover:
- Emergency contacts visibility on all pages
- Homepage content and navigation
- Services page functionality
- Safety page critical information
- Contact form submissions
- FAQ search and filtering
- Mobile responsiveness
- Accessibility (ARIA labels, keyboard navigation)

```bash
# Run all E2E tests
bun run test

# Run with visual UI
bun run test:ui

# Run specific test file
bun run test tests/e2e/gpl-website.spec.ts
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

Please follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

---

## 📄 License

This project is proprietary software developed for Guyana Power & Light Inc.

---

## 🙏 Acknowledgments

- Built with [KareTech Stack](https://github.com/kareemschultz/karetech-stack)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)

---

**Guyana Power & Light Inc.** - *Powering Guyana's Future*
