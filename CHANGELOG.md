# Changelog

All notable changes to the GPL Website project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-01-12

### Added

#### Core Infrastructure
- TanStack Router with file-based routing and auto-generated route tree
- Hono.js API server with type-safe routes
- PostgreSQL database with Drizzle ORM (13 tables, 6 enums)
- Better Auth authentication system (email/password + GitHub OAuth)
- Playwright E2E test suite
- Docker containerization with docker-compose
- GitHub Actions CI/CD workflow

#### Public Pages
- **Homepage** - GPL branding, hero section, quick links, service highlights
- **Services Page** - Comprehensive list of GPL services
- **Safety Page** - Critical safety information and guidelines
- **Contact Page** - Multi-type contact forms (general, service request, outage, streetlight, feedback)
- **FAQ Page** - Categorized frequently asked questions
- **About Page** - Company information

#### Emergency Contacts (Critical Safety Feature)
- Emergency contact numbers visible on EVERY page (header + footer)
- Regional numbers: Demerara (0475, 226-2600), Berbice (333-2186), Essequibo (771-4244)
- Fallback hardcoded numbers in API for safety redundancy
- Emergency pulse animation for visibility

#### Authentication System
- Login page with email/password and GitHub OAuth
- Registration page with validation
- Session management with Better Auth
- Auth context provider for React components

#### Admin Panel
- **Dashboard** - Statistics overview, quick actions, recent activity
- **FAQ Management** - Full CRUD operations with search and filtering
- **News Management** - Article creation, editing, publishing
- **Emergency Contacts Management** - Critical safety info editing with warnings
- **Contact Submissions** - View and respond to contact form submissions
- **Service Requests** - Manage outages, new connections, streetlight issues
- **Feedback Management** - Customer feedback with ratings and categorization

#### API Endpoints
- `GET/POST /api/health` - Health check
- `GET/POST /api/contact` - Contact form submissions
- `GET/POST /api/service-request` - Service requests
- `POST /api/outage-report` - Outage reporting
- `POST /api/streetlight-report` - Streetlight issues
- `POST /api/feedback` - Customer feedback
- `GET /api/faqs` - Public FAQ list
- `GET /api/news` - Public news articles
- `GET /api/emergency-contacts` - Emergency contacts with fallback

#### UI/UX
- GPL green (#22c55e) and gold (#eab308) branding
- Dark mode support with theme toggle
- 29 shadcn/ui components installed and configured
- Responsive design (mobile-first)
- Accessibility-focused (ARIA labels, keyboard navigation)
- Print styles for professional output
- Custom animations (soft-bounce, soft-pulse, emergency-pulse)

#### Database Schema
- `users` - User accounts
- `sessions` - Authentication sessions
- `accounts` - OAuth provider accounts
- `verification_tokens` - Email verification
- `faqs` - FAQ entries with categories
- `news` - News articles
- `contact_submissions` - Contact form data
- `service_requests` - Service request tracking
- `emergency_contacts` - Regional emergency numbers
- `outage_reports` - Power outage reports
- `streetlight_reports` - Streetlight issue reports
- `feedback` - Customer feedback with ratings
- `audit_logs` - Admin action tracking

#### Documentation
- `README.md` - Project overview and quick start
- `ARCHITECTURE.md` - Technical architecture documentation
- `PROJECT_STATUS.md` - Current project status and completion tracking
- `DEPLOYMENT.md` - Deployment instructions
- `VPS_DEPLOYMENT.md` - VPS-specific deployment guide
- `IMPLEMENTATION_ROADMAP.md` - Development roadmap
- `GPL_CONTENT_DATA.md` - GPL-specific content reference
- `GPL_FAQ_DATABASE.md` - FAQ content database
- `GPL_SAFETY_CONTENT.md` - Safety information content

#### DevOps
- Dockerfile for containerized deployment
- docker-compose.yml for local development
- GitHub Actions workflow for CI/CD
- deploy.sh script for deployment automation
- Environment variable templates (.env.example, .env.mcp.example)

### Security
- Strict TypeScript configuration (no `any` types)
- Environment variables for sensitive data
- .gitignore configured for secrets exclusion
- Input validation on all forms
- CSRF protection via Better Auth

---

## Version History

| Version | Date | Description |
|---------|------|-------------|
| 1.0.0 | 2026-01-12 | Initial MVP release with all core features |

---

## Future Releases (Planned)

### [1.1.0] - Phase 2 Features
- Interactive outage map (MapLibre + PMTiles)
- Real-time outage notifications
- Customer portal for bill viewing
- AI chatbot integration (Cloudflare Workers AI)

### [1.2.0] - Phase 3 Features
- Push/email/SMS notifications (Novu)
- Independent status page
- Advanced analytics dashboard
- Mobile app API endpoints

[Unreleased]: https://github.com/kareemschultz/gpl-website/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/kareemschultz/gpl-website/releases/tag/v1.0.0
