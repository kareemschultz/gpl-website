# gpl-website
A gpl website application
## 🚀 Tech Stack
This project was created with [KareTech Stack](https://github.com/kareemschultz/karetech-stack), an enhanced Better-T-Stack scaffold with modern tooling and DevOps built-in.
### Frontend
- **React 18** with TypeScript
- **TanStack Router** for file-based routing
- **TanStack Query** for server state management
- **Tailwind CSS** for styling
- **shadcn/ui** components (maia theme)
- **Vite** for lightning-fast development
### Backend
- **Hono.js** - Ultra-fast web framework
- **PostgreSQL** database
- **Drizzle ORM** for type-safe database operations
- **oRPC** for type-safe API calls

- **Better Auth** with email, github providers
### DevOps & Quality
- **Playwright** for E2E testing

- **Vitest** for unit testing
- **Docker** for containerization
- **Vercel Analytics** for insights
- **Sentry** for error tracking
## 🛠️ Getting Started
### Prerequisites
- [Bun](https://bun.sh) (recommended) or Node.js 18+
### Installation
1. Clone the repository:
```bash
git clone <your-repo-url>
cd gpl-website
```
2. Install dependencies:
```bash
bun install
```
3. Set up your database:
```bash
cp .env.example .env
# Edit .env with your database credentials
bun db:generate
bun db:migrate
```
4. Start the development server:
```bash
bun dev
```
5. Open your browser to [http://localhost:5173](http://localhost:5173)
## 📜 Available Scripts
### Development
- `bun dev` - Start development server
- `bun build` - Build for production
- `bun preview` - Preview production build locally
- `bun clean` - Clean build artifacts
### Code Quality
- `bun typecheck` - Run TypeScript type checking
- `bun lint` - Run ESLint
- `bun lint:fix` - Fix ESLint errors automatically
- `bun format` - Format code with Prettier
- `bun format:check` - Check code formatting
### Testing
- `bun test` - Run Playwright E2E tests
- `bun test:ui` - Run Playwright with UI mode
- `bun test:debug` - Debug Playwright tests
- `bun test:unit` - Run unit tests with Vitest
- `bun test:unit:ui` - Run unit tests with Vitest UI
- `bun test:all` - Run all tests
### Database
- `bun db:generate` - Generate Drizzle migrations
- `bun db:migrate` - Run database migrations
- `bun db:push` - Push schema changes (development)
- `bun db:studio` - Open Drizzle Studio
- `bun db:seed` - Seed database with sample data
### Docker
- `bun docker:build` - Build Docker image
- `bun docker:run` - Run Docker container
- `bun docker:dev` - Run development environment with Docker Compose
## 📂 Project Structure
```
gpl-website/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions and configs
│   ├── routes/              # TanStack Router routes
│   ├── db/                  # Database schema and migrations
│   ├── auth/                # Authentication configuration
│   ├── api/                 # oRPC API routes
│   ├── index.css            # Global styles
│   └── main.tsx             # Application entry point
├── tests/                   # Playwright E2E tests
├── __tests__/              # Unit tests
├── Dockerfile               # Docker configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.ts           # Vite configuration
└── package.json
```
## 🗄️ Database
This project uses PostgreSQL with Drizzle ORM. Make sure you have PostgreSQL installed and running.
### Environment Variables
```env
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
```

## 🔐 Authentication
This project uses Better Auth for authentication with the following providers:
- email- github
### Environment Variables
```env
BETTER_AUTH_SECRET=your-secret-key
BETTER_AUTH_URL=http://localhost:5173
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret



```
## 🧪 Testing
### Playwright E2E Tests
```bash
# Run tests
bun test
# Run tests with UI mode
bun test:ui
# Run tests in debug mode
bun test:debug
# Update snapshots
bun test:update
```
## 🐳 Docker
### Development with Docker
```bash
# Build and run with Docker Compose
bun docker:dev
# Or manually
docker build -t gpl-website .
docker run -p 3000:3000 gpl-website
```
## 📊 Monitoring
### Vercel Analytics
This project includes Vercel Analytics for performance monitoring. Deploy to Vercel to automatically enable analytics.

### Sentry Error Tracking
Add your Sentry DSN to the environment variables:
```env
VITE_SENTRY_DSN=https://your-dsn@sentry.io/project-id
```

## 🚀 Deployment
### Docker Deployment
The project includes a production-ready Dockerfile:
```bash
docker build -t gpl-website .
docker run -p 3000:3000 gpl-website
```
### Vercel (Recommended)
```bash
# Install Vercel CLI
bun add -g vercel
# Deploy
vercel
```
### Netlify
```bash
# Build the project
bun build
# Deploy the dist/ folder to Netlify
```
## 📚 Documentation
- [KareTech Stack](https://github.com/kareemschultz/karetech-stack) - Project scaffold
- [Better-T-Stack](https://better-t-stack.dev) - Base stack documentation
- [TanStack Router](https://tanstack.com/router) - Routing
- [TanStack Query](https://tanstack.com/query) - Server state management
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [shadcn/ui](https://ui.shadcn.com) - UI components
- [Drizzle ORM](https://orm.drizzle.team) - Database ORM
- [Playwright](https://playwright.dev) - E2E testing
## 🤝 Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request
## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
---
Built with ❤️ using [KareTech Stack](https://github.com/kareemschultz/karetech-stack)