# Sticky Wicket Labs - Portfolio Analytics Platform

## Overview

This is a full-stack web application for Sticky Wicket Labs, serving as a portfolio showcase with integrated analytics tracking. The platform displays various projects with an elegant Post-it pastel aesthetic, providing comprehensive analytics on user engagement, page views, and project interactions.

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

## Design System: Post-it Pastel

The portfolio uses an elegant Post-it pastel aesthetic with soft colors, subtle shadows, and a warm, inviting feel.

### Color Palette
| Role | Color | Hex |
|------|-------|-----|
| Background | Warm Parchment | `#F9F4EC` |
| Card Surface | Cloud White | `#FFFFFF` |
| Border | Soft Edge | `#E7DFED` |
| Mist | Neutral Mist | `#F0EBF5` |
| Text Primary | Graphite Ink | `#2F2A3A` |
| Text Secondary | Dove Gray | `#8A8295` |
| Text Faint | Ink Faint | `#B8B2C2` |
| Accent Yellow | Sunlit Lemon | `#FFF4B8` |
| Accent Coral | Soft Coral | `#FFD7D5` |
| Accent Aqua | Misty Aqua | `#CFEFF1` |
| Accent Lavender | Lavender Haze | `#E3D8FF` |
| Accent Rose | Dusty Rose | `#F3C9E8` |
| Accent Mint | Fresh Mint | `#D4F5E9` |

### Typography
- **Display Font**: Fredoka (playful, rounded headings)
- **Body Font**: Inter (clean, readable body text)
- Loaded via Google Fonts in client/index.html

### Design Principles
- **Elegant & Warm**: Soft pastels with professional polish
- **Post-it Aesthetic**: Subtle note-like accents on cards
- **Accessible**: High contrast text on pastel backgrounds
- **Easy to Browse**: Clean grid layout, clear visual hierarchy

### UI Components
- **Note Card**: White cards with soft shadows (0 4px 20px rgba(47,42,58,0.06)), rounded-2xl corners, subtle border
- **Note Button**: Pastel gradient buttons with hover lift effect
- **Pastel Badge**: Rounded category badges with matching border colors
- **Post-it Strip**: Semi-transparent pastel strips as card accents
- **Elegant Panel**: White panels with soft edge borders

### CSS Utility Classes
- `.note-card`: Elegant card with soft shadow and border
- `.note-button`: Pastel gradient button with hover animation
- `.note-button-coral`, `.note-button-lavender`, `.note-button-aqua`: Button color variants
- `.pastel-badge`: Category badge styling
- `.pastel-badge-yellow`, `.pastel-badge-coral`, `.pastel-badge-aqua`, etc.: Badge color variants
- `.stats-block-*`: Colored stat block variants

## Key Components

### Project Showcase (Homepage)
- **ToyCard Component**: Projects with post-it strip accents and pastel badges
- **FeaturedKidScribeCard**: Large featured card for KidScribe with Visual Harmony images
- **Category Colors**: Each category has distinct pastel color pairing
- **Hover Effects**: Cards lift smoothly with scale animation

### About Me Page
- **Personal ethos page**: Focus on motivations and joy of building
- **Introduction**: "I'm Saurabh" - PM who codes, tinkerer who builds on weekends
- **Headline**: "My Most Important User is Four Years Old" - about son and bedtime stories
- **Sections**: Joy of Building, A Wonderful Time to Build, Lessons Learned at 1 a.m., Let's Trade Notes
- **Lessons Learned**: 4 cards covering roadmap discovery, AI as thought partner, prototype vs production, taste/agency/testing
- **Contact**: Email (saurabh@stickywicketlabs.com) and LinkedIn link
- **Navigation**: Accessible via header user icon, hero button, and footer link

### Analytics Dashboard (Progress Report)
- **StatsCard Component**: Pastel-accented metric displays with soft shadows
- **Daily Visitors Chart**: Line chart with coral accent
- **Most Visited Chart**: Bar chart with multi-pastel bars
- **Where Our Visitors Are**: Geographic distribution chart
- **Note**: Still available at /analytics route but not linked in main navigation

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

## Category Color Mapping (Pastel)
- Storytelling: Yellow (#FFF4B8 / #7A6B2A text)
- Creative Tools: Aqua (#CFEFF1 / #3D6B6F text)
- Learning: Mint (#D4F5E9 / #3D6B5A text)
- AI Fun: Coral (#FFD7D5 / #8B4E52 text)
- Community: Lavender (#E3D8FF / #5B4B8A text)

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
- **Card shadows**: Consistent soft shadows using rgba(47, 42, 58, 0.06) for cohesive look
- **Chart theming**: All Recharts components use pastel color palette with darker stroke accents
- **Accessibility**: Text colors maintain WCAG AA contrast ratios against pastel backgrounds

The application follows a modern full-stack architecture with emphasis on type safety, performance, and user experience. The Post-it pastel theme creates a warm, elegant portfolio presentation while the analytics system provides valuable insights into user behavior.
