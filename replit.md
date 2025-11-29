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

## Design System: "The Playroom"

The portfolio uses a kids' toyroom aesthetic with LEGO brick colors, craft paper textures, and playful but polished styling.

### Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Background | Craft Paper | `#F5E6D3` |
| Card Surface | White Board | `#FFFFFF` |
| Section Background | Craft Tan | `#E8DDD0` |
| Shadow/Border | Craft Shadow | `#D4C4B0` |
| Primary Accent | LEGO Red | `#DA291C` |
| Secondary Accent | LEGO Blue | `#0055BF` |
| Success | LEGO Green | `#4DBD33` |
| Highlight | LEGO Yellow | `#FFD700` |
| Tertiary | LEGO Orange | `#FF6B35` |
| Text | Marker Black | `#2D2D2D` |

### Typography
- **Display Font**: Fredoka (playful, rounded headings)
- **Body Font**: Inter (clean, readable body text)
- Loaded via Google Fonts in client/index.html

### Design Principles
- **Playful but Polished**: Fun without being chaotic
- **Craft Paper Feel**: Warm, tactile background textures
- **LEGO Inspiration**: Bold primary colors, building block motifs
- **Easy to Browse**: Clean grid layout, clear visual hierarchy

### UI Components
- **Craft Card**: White cards with paper shadow, hover lift effect
- **Brick Button**: 3D buttons with press-down animation
- **Sticker Badge**: Dashed border category badges in various colors
- **Paper Panel**: White panels with subtle grid pattern background
- **Tape Accent**: Colored tape decoration on cards

## Key Components

### Homepage Structure
- **Top Hero**: Compact section with "Tiny Apps. Big Smiles." headline and Toy Box illustration
- **KidScribe Spotlight**: Featured "Latest Project" section with split layout (copy left, stacked images right)
- **LEGO Tape Divider**: Yellow horizontal bar separating sections
- **The Toy Box**: Grid of 7 project cards (KidScribe excluded as it's featured above)
- **Footer**: Simple branding with Sticky Wicket Labs logo

### Project Showcase
- **ToyCard Component**: Projects as toys with tape accents and sticker badges
- **Category Colors**: Each category has distinct color pairing
- **Hover Effects**: Cards lift and rotate to neutral on hover

### Analytics Dashboard (Progress Report)
- **StatsCard Component**: LEGO-colored metric displays
- **Daily Visitors Chart**: Line chart with red accent
- **Most Played Chart**: Bar chart with multi-color bars
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

## Category Color Mapping
- Storytelling: Yellow/Amber tones
- Creative Tools: Blue tones
- Learning: Green tones
- AI Fun: Red tones
- Community: Purple tones

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

- **Category badges**: Use inline styles for colors (avoids dynamic Tailwind class issues)
- **Card rotations**: Slight random rotations on cards, neutralize on hover
- **Chart theming**: All Recharts components use LEGO color palette

The application follows a modern full-stack architecture with emphasis on type safety, performance, and user experience. The playroom theme creates a distinctive, memorable portfolio presentation while the analytics system provides valuable insights into user behavior.
