# Sticky Wicket Labs - Portfolio Analytics Platform

## Overview

This is a full-stack web application for Sticky Wicket Labs, serving as a portfolio showcase with integrated analytics tracking. The platform displays various projects as "broadcast programs" in a control room/studio themed interface, providing comprehensive analytics on user engagement, page views, and project interactions.

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

## Design System: "Wonder Workshop Live"

The portfolio uses a broadcast studio/control room aesthetic with neon gel lighting and a live TV program metaphor.

### Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Main Background | Studio Dark | `#0D0D0F` |
| Card Background | Studio Charcoal | `#1A1A1F` |
| Interactive Elements | Studio Slate | `#2A2A32` |
| Borders | Studio Steel | `#3D3D47` |
| Primary Accent | Neon Pink | `#FF3366` |
| Secondary Accent | Neon Cyan | `#00D4FF` |
| Success/Live | Neon Green | `#00FF94` |
| Warning | Neon Yellow | `#FFE566` |
| Tertiary | Neon Purple | `#B366FF` |
| Warm Text | Tungsten Warm | `#FFB366` |
| Primary Text | Tungsten Soft | `#FFF5E6` |

### Typography
- **Display Font**: Space Grotesk (headings, stats, labels)
- **Body Font**: Inter (paragraphs, descriptions)
- Loaded via Google Fonts in client/index.html

### Design Principles
- **Broadcast Feel**: Live indicators, status lights, ticker tape create energy
- **Control Room**: Dark surfaces, neon accents, telemetry displays
- **Subtle Motion**: Cards lift gently on hover with cyan glow, no flashy effects
- **Professional Edge**: Technical aesthetic balanced with playful content

### UI Components
- **Ticker Tape**: Scrolling announcements with CSS animation
- **Live Indicator**: Pulsing red dot with "LIVE FROM THE WORKSHOP" text
- **Studio Panel**: Dark cards with subtle pink glow on edges
- **Program Cards**: Project cards styled as TV programs with status lights
- **Control Buttons**: Dark slate buttons with neon hover states

## Key Components

### Project Showcase (Homepage)
- **ProgramCard Component**: Displays projects as broadcast programs
- **Status Lights**: Green (live) or yellow (idle) indicators
- **Category Tags**: Color-coded badges using inline styles (avoids dynamic Tailwind)
- **Ticker Tape**: Animated announcements at top of page
- **Studio Status Panel**: Shows live program count, uptime, categories

### Analytics Dashboard (Control Room)
- **StatsCard Component**: Neon-accented metric displays
- **Traffic Signal Chart**: Line chart showing views over time
- **Top Programs Chart**: Bar chart of project popularity
- **Global Reach Chart**: Geographic visitor distribution
- **All charts use Recharts** with dark theme styling

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

- **Category badges**: Use inline styles for colors (avoid dynamic Tailwind class strings)
- **Ticker animation**: CSS keyframes in index.css, duplicated items for seamless loop
- **Chart theming**: All Recharts components use inline styles matching studio palette

The application follows a modern full-stack architecture with emphasis on type safety, performance, and user experience. The broadcast/control room theme creates a distinctive, memorable portfolio presentation while the analytics system provides valuable insights into user behavior.
