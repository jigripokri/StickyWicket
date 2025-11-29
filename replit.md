# Sticky Wicket Labs - Portfolio Analytics Platform

## Overview

This is a full-stack web application for Sticky Wicket Labs, serving as a portfolio showcase with integrated analytics tracking. The platform displays various projects as toys in a playroom-themed interface, providing comprehensive analytics on user engagement, page views, and project interactions.

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

## Design System: "Sketch Aesthetic"

The portfolio uses a minimalist, hand-drawn sketch aesthetic with cream tones, thin borders, and monochrome accents.

### Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Background | Cream | `#F5F0E8` |
| Card Surface | White | `#FFFFFF` |
| Border | Sketch Border | `#C4C0B8` |
| Light Background | Sketch Light | `#E8E4DC` |
| Muted Text | Sketch Muted | `#8A8680` |
| Primary Text | Ink | `#2D2D2D` |

### Typography
- **Display Font**: Fredoka (playful, rounded headings)
- **Body Font**: Inter (clean, readable body text)
- Loaded via Google Fonts in client/index.html

### Design Principles
- **Minimalist**: Clean, uncluttered aesthetic
- **Sketch-like**: Hand-drawn, approachable feel
- **Monochrome**: Black, white, and gray with cream background
- **Easy to Browse**: Clean grid layout, clear visual hierarchy

### UI Components
- **Sketch Card**: White cards with thin gray borders, subtle hover lift
- **Outline Button**: Black-bordered buttons, fill on hover
- **Outline Badge**: Thin-bordered category pills
- **Featured Badge**: Solid black badge for featured items

## Key Components

### Project Showcase (Homepage)
- **ToyCard Component**: Projects as sketch cards with outline badges
- **FeaturedKidScribeCard**: 2x2 featured card with Visual Harmony images
- **Hover Effects**: Cards lift subtly on hover
- **Outline Buttons**: "See All Projects" and "Progress Report" in hero

### Analytics Dashboard (Progress Report)
- **StatsCard Component**: Clean bordered metric displays
- **Daily Visitors Chart**: Line chart with monochrome styling
- **Most Played Chart**: Bar chart with grayscale bars
- **Where Our Friends Are**: Geographic distribution chart

### Database Schema
- **Projects Table**: Stores project information (title, description, links, images)
- **Page Views Table**: Tracks all page visits with metadata (IP, user agent, referrer, location)
- **Project Clicks Table**: Records interactions with project cards

## Current Projects (in display order)
1. KidScribe - Personalized storybook creation (kidscribe.ai)
2. Characto - Character design across scenes
3. ELI5 - Making web content readable
4. DebateGPT - AI debate simulator
5. DottyDraw - Pixel art tool
6. Wish Upon a Wall - Community message boards
7. Hue Knew? - Color mixing learning
8. Emoji Math - Math practice with emojis


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

## Technical Notes

- **Category badges**: Use outline-badge class for consistent styling
- **Chart theming**: All Recharts components use monochrome gray palette
- **Logo**: Custom SW script logo at /images/swl-logo.png
- **Hero illustration**: /images/toybox-illustration.png (transparent PNG)

The application follows a modern full-stack architecture with emphasis on type safety, performance, and user experience. The sketch aesthetic creates a distinctive, memorable portfolio presentation while the analytics system provides valuable insights into user behavior.
