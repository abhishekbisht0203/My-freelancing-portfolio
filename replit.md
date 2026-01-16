# Narendra Rawat Portfolio

## Overview

A personal portfolio and freelance developer website for Narendra Rawat, a full-stack MERN developer specializing in AI-powered web applications. The site showcases services, projects, testimonials, and includes interactive features like a project cost estimator and contact form. Built as a single-page application with a modern React frontend and Express backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Build Tool**: Vite with hot module replacement

The frontend is a single-page application located in `/client`. Components are organized by feature (sections) with reusable UI components in `/client/src/components/ui` following the shadcn/ui pattern. The main page (`/client/src/pages/home.tsx`) composes multiple section components including Hero, Services, Projects, Process, Testimonials, Estimator, FAQ, and Contact.

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: Node.js with HTTP server
- **API Design**: RESTful endpoints under `/api`

The backend in `/server` provides:
- Contact form submission endpoint (`POST /api/contact`)
- Contact submissions retrieval (`GET /api/contact`)
- Project estimate calculator (`POST /api/estimate`)

### Data Storage
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Current Implementation**: In-memory storage (`MemStorage` class) for development
- **Schema**: Defined in `/shared/schema.ts` with Zod validation via drizzle-zod

The storage layer uses an interface pattern (`IStorage`) allowing easy switching between in-memory and database implementations. When PostgreSQL is provisioned, the database connection uses `DATABASE_URL` environment variable.

### Shared Code
The `/shared` directory contains code shared between frontend and backend:
- Database schema definitions (users, contact submissions)
- TypeScript types and Zod validation schemas
- Data types for projects, services, testimonials, etc.

### Build System
- **Development**: Vite dev server with Express middleware integration
- **Production**: Custom build script (`/script/build.ts`) using esbuild for server bundling and Vite for client

## External Dependencies

### UI Component Libraries
- **shadcn/ui**: Pre-built accessible components using Radix UI primitives
- **Radix UI**: Headless UI primitives for accessibility
- **Lucide React**: Icon library

### Database & ORM
- **Drizzle ORM**: TypeScript ORM for database operations
- **drizzle-zod**: Schema validation integration
- **PostgreSQL**: Target database (requires `DATABASE_URL` environment variable)
- **connect-pg-simple**: PostgreSQL session store (available but not currently used)

### Form & Validation
- **Zod**: Runtime type validation
- **React Hook Form**: Form state management (resolver available)

### Styling
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **tailwind-merge**: Class merging utility

### Development Tools
- **Vite**: Build tool and dev server
- **tsx**: TypeScript execution for Node.js
- **drizzle-kit**: Database migration tool (run with `npm run db:push`)