# Sticky Wicket Labs - Portfolio Analytics Platform

## Overview

This is a full-stack web application for Sticky Wicket Labs, serving as a portfolio showcase with integrated analytics tracking. The platform displays various projects in an interactive card layout and provides comprehensive analytics on user engagement, page views, and project interactions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library
- **UI Components**: Radix UI primitives for accessibility and customization
- **State Management**: TanStack Query for server state management
- **Animations**: Framer Motion for smooth interactions and hover effects

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints for analytics tracking and data retrieval
- **Middleware**: Custom logging and error handling
- **Development**: Hot module replacement with Vite integration

### Database & ORM
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema updates
- **Connection**: Connection pooling with @neondatabase/serverless

## Design System: "Museum of Playful Ideas"

The portfolio uses an elegant, refined design inspired by editorial publications and indie bookstores.

### Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Canvas (background) | Warm Cream | `#FDF8F3` |
| Soft Accent | Clay | `#E6C4A8` |
| Primary Pop | Coral | `#FF6F61` |
| Secondary Pop | Sky Blue | `#3B82F6` |
| Tertiary Pop | Sunflower | `#F4B400` |
| Text | Deep Ink | `#2C1C14` |

### Typography
- **Headlines**: Playfair Display (elegant serif)
- **Body Text**: Nunito Sans (friendly, readable)

### Design Principles
- **Restraint**: Minimal animations, let typography and whitespace do the work
- **Warmth**: Cream canvas with clay accents creates an inviting feel
- **Sophistication**: Editorial-quality typography and generous spacing
- **Subtle Delight**: Cards lift gently on hover, no flashy effects

## Key Components

### Project Showcase
- **ProjectCard Component**: Archival mat styling with embossed emoji badges
- **Subtle Hover**: Gentle lift and shadow on hover (no color flash)
- **External Links**: Direct navigation to live project URLs
- **Click Analytics**: Automatic tracking of project interactions

### Analytics Dashboard
- **Real-time Metrics**: Total visitors, page views, and engagement statistics
- **Data Visualization**: Charts using Recharts library (Line and Bar charts)
- **Geographic Tracking**: Country-based visitor analytics
- **Project Performance**: Click tracking and popularity metrics

### Database Schema
- **Projects Table**: Stores project information (title, description, links, images)
- **Page Views Table**: Tracks all page visits with metadata (IP, user agent, referrer, location)
- **Project Clicks Table**: Records interactions with project cards

## Data Flow

1. **Page View Tracking**: Automatic middleware captures all non-API requests
2. **Project Interaction**: Click events trigger API calls to record engagement
3. **Analytics Aggregation**: Dashboard queries aggregate data for visualization
4. **Real-time Updates**: TanStack Query manages cache invalidation and updates

## External Dependencies

### UI & Styling
- **Radix UI**: Comprehensive component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for enhanced UX
- **Lucide React**: Icon library

### Data & Analytics
- **Recharts**: Chart library for data visualization
- **Date-fns**: Date manipulation utilities
- **TanStack Query**: Server state management

### Development Tools
- **ESBuild**: Fast JavaScript bundler for production
- **TSX**: TypeScript execution for development
- **PostCSS**: CSS processing with Autoprefixer

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React application to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Assets**: Static files served from build output directory

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Production Mode**: Controlled via `NODE_ENV=production`
- **Development**: Hot reload with `tsx` for server and Vite for client

### Scripts
- `dev`: Development server with hot reload
- `build`: Production build for both client and server
- `start`: Production server execution
- `db:push`: Database schema deployment

The application follows a modern full-stack architecture with emphasis on type safety, performance, and user experience. The analytics system provides valuable insights into user behavior while maintaining a clean separation between the portfolio showcase and data collection functionality.