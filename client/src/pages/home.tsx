import { motion } from "framer-motion";
import { Link } from "wouter";
import { Radio, Zap, Play, ExternalLink } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export const projects = [
  {
    id: 17,
    title: "KidScribe",
    description: "Craft a fully illustrated storybook that's all about you.",
    link: "https://kidscribe.ai/",
    emoji: "📚",
    status: "live",
    category: "Storytelling",
  },
  {
    id: 16,
    title: "Characto",
    description: "Create beautiful, consistent characters across scenes.",
    link: "https://characto.stickywicketlabs.com/",
    emoji: "👦",
    status: "live",
    category: "Creative Tools",
  },
  {
    id: 1,
    title: "ELI5",
    description: "Making the web super fun to read!",
    link: "https://eli5.stickywicketlabs.com/",
    emoji: "🧠",
    status: "live",
    category: "Learning",
  },
  {
    id: 5,
    title: "DebateGPT",
    description: "Witness a debate between two AI personalities on any topic.",
    link: "https://debategpt.stickywicketlabs.com/",
    emoji: "🥊",
    status: "live",
    category: "AI Experiments",
  },
  {
    id: 15,
    title: "DottyDraw",
    description: "Create pixel art drawings with simple dot patterns.",
    link: "https://dottydraw.stickywicketlabs.com/",
    emoji: "✏️",
    status: "live",
    category: "Creative Tools",
  },
  {
    id: 6,
    title: "Wish Upon a Wall",
    description: "Collect heartfelt messages for loved ones.",
    link: "https://wishuponawall.net/",
    emoji: "🧱",
    status: "live",
    category: "Community",
  },
  {
    id: 2,
    title: "Hue Knew?",
    description: "See how colors mix together to form new ones!",
    link: "https://hueknew.stickywicketlabs.com/",
    emoji: "🎨",
    status: "live",
    category: "Learning",
  },
  {
    id: 3,
    title: "Emoji Math",
    description: "Practice simple addition and subtraction with emojis.",
    link: "https://emojimath.stickywicketlabs.com/",
    emoji: "🧮",
    status: "live",
    category: "Learning",
  },
];

const tickerItems = [
  "🎬 Now Broadcasting: 8 Live Programs",
  "🏏 Sticky Wicket Labs — Where Ideas Come Alive",
  "✨ New: KidScribe launched at kidscribe.ai",
  "🎨 Creative tools for kids, parents & curious minds",
  "📡 Signal Strong — All Systems Operational",
];

function ProgramCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const handleClick = async () => {
    try {
      await apiRequest("POST", `/api/track-click/${project.id}`);
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  };

  const colors = ["neon-pink", "neon-cyan", "neon-green", "neon-yellow", "neon-purple"];
  const accentColor = colors[index % colors.length];

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      className="program-card block group"
    >
      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className={`text-4xl`}>{project.emoji}</div>
          <div className="flex items-center gap-2">
            <span className={`status-light ${project.status === 'live' ? 'active' : 'idle'}`}></span>
            <span className="text-xs text-tungsten-warm/60 uppercase tracking-wider">
              {project.status}
            </span>
          </div>
        </div>

        {/* Category tag */}
        <div className={`inline-block px-2 py-1 rounded text-xs font-medium mb-3 bg-${accentColor}/20 text-${accentColor}`}
          style={{ 
            backgroundColor: `var(--tw-${accentColor}, rgba(255,255,255,0.1))`,
          }}
        >
          <span className={`text-${accentColor}`} style={{
            color: accentColor === 'neon-pink' ? '#FF3366' :
                   accentColor === 'neon-cyan' ? '#00D4FF' :
                   accentColor === 'neon-green' ? '#00FF94' :
                   accentColor === 'neon-yellow' ? '#FFE566' : '#B366FF'
          }}>
            {project.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-semibold text-tungsten-soft mb-2 group-hover:text-neon-cyan transition-colors flex items-center gap-2">
          {project.title}
          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </h3>

        {/* Description */}
        <p className="text-tungsten-warm/70 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Bottom bar */}
      <div className="px-6 py-3 bg-studio-slate/50 border-t border-studio-steel flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-tungsten-warm/50">
          <Play className="w-3 h-3" />
          <span>View Program</span>
        </div>
        <div className="w-8 h-1 rounded-full bg-studio-steel overflow-hidden">
          <div className={`h-full rounded-full`} style={{
            width: '100%',
            backgroundColor: accentColor === 'neon-pink' ? '#FF3366' :
                   accentColor === 'neon-cyan' ? '#00D4FF' :
                   accentColor === 'neon-green' ? '#00FF94' :
                   accentColor === 'neon-yellow' ? '#FFE566' : '#B366FF'
          }}></div>
        </div>
      </div>
    </motion.a>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-studio-dark">
      {/* Ticker Tape */}
      <div className="ticker-tape py-2">
        <div className="animate-ticker inline-flex">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="mx-8">{item}</span>
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Main content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="live-indicator mb-6">
                  <span>Live from the Workshop</span>
                </div>

                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-tungsten-soft leading-tight mb-6">
                  Where Playful
                  <br />
                  <span className="text-neon-pink neon-text">Ideas</span> Get Made
                </h1>

                <p className="text-tungsten-warm/80 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                  Welcome to the control room. Explore our collection of whimsical experiments built for kids, parents, and the curious at heart.
                </p>

                <div className="flex flex-wrap gap-4">
                  <a href="#programs" className="control-button inline-flex items-center gap-2 bg-neon-pink/20 border-neon-pink/50 text-neon-pink hover:bg-neon-pink/30">
                    <Radio className="w-4 h-4" />
                    View All Programs
                  </a>
                  <Link href="/analytics" className="control-button inline-flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Studio Telemetry
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right: Studio Stats Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="studio-panel-glow p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-sm font-medium text-tungsten-warm/60 uppercase tracking-wider">
                  Studio Status
                </h2>
                <div className="flex items-center gap-2">
                  <span className="status-light active"></span>
                  <span className="text-xs text-neon-green">All Systems Go</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-studio-slate/50 rounded-lg p-4">
                  <div className="text-3xl font-display font-bold text-neon-cyan mb-1">
                    {projects.length}
                  </div>
                  <div className="text-xs text-tungsten-warm/60 uppercase tracking-wider">
                    Live Programs
                  </div>
                </div>
                <div className="bg-studio-slate/50 rounded-lg p-4">
                  <div className="text-3xl font-display font-bold text-neon-green mb-1">
                    100%
                  </div>
                  <div className="text-xs text-tungsten-warm/60 uppercase tracking-wider">
                    Uptime
                  </div>
                </div>
                <div className="bg-studio-slate/50 rounded-lg p-4">
                  <div className="text-3xl font-display font-bold text-neon-yellow mb-1">
                    4
                  </div>
                  <div className="text-xs text-tungsten-warm/60 uppercase tracking-wider">
                    Categories
                  </div>
                </div>
                <div className="bg-studio-slate/50 rounded-lg p-4">
                  <div className="text-3xl font-display font-bold text-neon-purple mb-1">
                    ∞
                  </div>
                  <div className="text-xs text-tungsten-warm/60 uppercase tracking-wider">
                    Ideas in Queue
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section id="programs" className="px-6 py-16 bg-studio-charcoal/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-tungsten-soft mb-2">
                Now Broadcasting
              </h2>
              <p className="text-tungsten-warm/60">
                Select a program to tune in
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <span className="text-xs text-tungsten-warm/40 uppercase tracking-wider">Filter:</span>
              <button className="control-button text-xs">All</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <ProgramCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-studio-steel">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏏</span>
              <div>
                <div className="font-display font-semibold text-tungsten-soft">
                  Sticky Wicket Labs
                </div>
                <div className="text-xs text-tungsten-warm/50">
                  Broadcasting since 2024
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-tungsten-warm/50">
              <Link href="/analytics" className="hover:text-neon-cyan transition-colors">
                Telemetry
              </Link>
              <span className="text-studio-steel">|</span>
              <span>© 2025 All experiments reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
