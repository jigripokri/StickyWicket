import { motion } from "framer-motion";
import { Link } from "wouter";
import { Blocks, Sparkles, ExternalLink, Star } from "lucide-react";
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
    category: "AI Fun",
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

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "Storytelling": { bg: "#FEF3C7", text: "#B45309", border: "#F59E0B" },
  "Creative Tools": { bg: "#DBEAFE", text: "#1D4ED8", border: "#3B82F6" },
  "Learning": { bg: "#D1FAE5", text: "#047857", border: "#10B981" },
  "AI Fun": { bg: "#FEE2E2", text: "#B91C1C", border: "#EF4444" },
  "Community": { bg: "#F3E8FF", text: "#7C3AED", border: "#8B5CF6" },
};

function ToyCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const handleClick = async () => {
    try {
      await apiRequest("POST", `/api/track-click/${project.id}`);
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  };

  const colors = categoryColors[project.category] || categoryColors["Learning"];
  const rotations = [-1, 0.5, -0.5, 1, -0.8, 0.3, -0.3, 0.8];
  const rotation = rotations[index % rotations.length];

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className="craft-card block group relative"
      style={{ transform: `rotate(${rotation}deg)` }}
      whileHover={{ rotate: 0, scale: 1.02 }}
    >
      {/* Tape accent */}
      <div 
        className="absolute -top-2 left-6 w-16 h-5 rounded-sm opacity-80"
        style={{ 
          background: `linear-gradient(135deg, ${colors.border}40 0%, ${colors.border}60 100%)`,
          transform: 'rotate(-2deg)',
        }}
      />

      <div className="p-6">
        {/* Emoji and status */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl">{project.emoji}</div>
          <div 
            className="sticker-badge"
            style={{ 
              backgroundColor: colors.bg,
              color: colors.text,
              borderColor: `${colors.border}50`,
            }}
          >
            {project.category}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-marker mb-2 group-hover:text-lego-blue transition-colors flex items-center gap-2">
          {project.title}
          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" />
        </h3>

        {/* Description */}
        <p className="text-marker/70 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Bottom accent bar */}
      <div 
        className="h-2 rounded-b-xl"
        style={{ backgroundColor: colors.border }}
      />
    </motion.a>
  );
}

function PlayroomIllustration() {
  return (
    <div className="relative w-full h-80 md:h-96">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-lego-yellow/20 via-transparent to-lego-blue/10 rounded-3xl" />
      
      {/* Floating elements - other projects */}
      <motion.div 
        className="absolute top-4 left-4 text-3xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        🧠
      </motion.div>
      <motion.div 
        className="absolute top-8 right-8 text-2xl"
        animate={{ y: [0, -6, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      >
        🎨
      </motion.div>
      <motion.div 
        className="absolute bottom-16 left-8 text-2xl"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        🥊
      </motion.div>
      <motion.div 
        className="absolute bottom-8 right-12 text-2xl"
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.7 }}
      >
        ✏️
      </motion.div>
      <motion.div 
        className="absolute top-1/3 right-4 text-xl"
        animate={{ y: [0, -4, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        🧮
      </motion.div>
      <motion.div 
        className="absolute bottom-1/3 left-2 text-xl"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        🧱
      </motion.div>

      {/* Sparkles */}
      <motion.div 
        className="absolute top-12 left-1/4 text-lego-yellow text-lg"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        ✨
      </motion.div>
      <motion.div 
        className="absolute bottom-20 right-1/4 text-lego-yellow text-sm"
        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
      >
        ✨
      </motion.div>

      {/* Central KidScribe book */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          {/* Open book shape */}
          <div className="relative">
            {/* Book pages */}
            <div className="flex">
              {/* Left page */}
              <div 
                className="w-28 md:w-36 h-36 md:h-44 bg-white rounded-l-lg shadow-lg relative overflow-hidden"
                style={{ 
                  transform: 'perspective(800px) rotateY(15deg)',
                  transformOrigin: 'right center',
                }}
              >
                <div className="absolute inset-2 border-2 border-dashed border-craft-shadow/30 rounded flex flex-col items-center justify-center p-2">
                  <div className="text-4xl md:text-5xl mb-1">👧</div>
                  <div className="w-full space-y-1">
                    <div className="h-1.5 bg-craft-shadow/20 rounded w-full" />
                    <div className="h-1.5 bg-craft-shadow/20 rounded w-4/5" />
                    <div className="h-1.5 bg-craft-shadow/20 rounded w-full" />
                  </div>
                </div>
              </div>
              {/* Spine */}
              <div className="w-3 md:w-4 h-36 md:h-44 bg-lego-red shadow-inner" />
              {/* Right page */}
              <div 
                className="w-28 md:w-36 h-36 md:h-44 bg-white rounded-r-lg shadow-lg relative overflow-hidden"
                style={{ 
                  transform: 'perspective(800px) rotateY(-15deg)',
                  transformOrigin: 'left center',
                }}
              >
                <div className="absolute inset-2 border-2 border-dashed border-craft-shadow/30 rounded flex flex-col items-center justify-center p-2">
                  <div className="text-4xl md:text-5xl mb-1">🏰</div>
                  <div className="w-full space-y-1">
                    <div className="h-1.5 bg-craft-shadow/20 rounded w-4/5" />
                    <div className="h-1.5 bg-craft-shadow/20 rounded w-full" />
                    <div className="h-1.5 bg-craft-shadow/20 rounded w-3/4" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Book base/cover */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-64 md:w-80 h-4 bg-lego-red rounded-b-lg shadow-md" />
          </div>

          {/* KidScribe label */}
          <motion.div 
            className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md border-2 border-lego-red/20"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="font-display font-bold text-lego-red text-sm">📚 KidScribe</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Stars decoration */}
      <div className="absolute top-6 right-1/3 text-lego-yellow/60 text-xs">⭐</div>
      <div className="absolute bottom-12 left-1/3 text-lego-yellow/60 text-xs">⭐</div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-craft-paper">
      {/* Hero Section */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-lego-yellow/20 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-lego-orange" />
                <span className="text-sm font-medium text-marker">Welcome to the Playroom!</span>
              </div>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-marker leading-tight mb-6">
                Where Ideas
                <br />
                <span className="text-lego-red">Come to Play</span>
              </h1>

              <p className="text-marker/70 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                Explore our collection of playful experiments built for kids, families, and the young at heart. Each project is a new toy to discover!
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="brick-button brick-button-red inline-flex items-center gap-2">
                  <Blocks className="w-4 h-4" />
                  See All Projects
                </a>
                <Link href="/analytics" className="brick-button brick-button-blue inline-flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Progress Report
                </Link>
              </div>
            </motion.div>

            {/* Right: Playroom Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <PlayroomIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="px-6 py-16 bg-craft-tan/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-marker mb-3">
                Our Toy Box
              </h2>
              <p className="text-marker/60 text-lg max-w-md mx-auto">
                Pick a project and start playing!
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {projects.map((project, index) => (
              <ToyCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-white border-t-4 border-lego-yellow">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🧱</span>
              <div>
                <div className="font-display font-bold text-marker text-lg">
                  Sticky Wicket Labs
                </div>
                <div className="text-sm text-marker/50">
                  Building fun since 2024
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-marker/50">
              <Link href="/analytics" className="hover:text-lego-blue transition-colors font-medium">
                Progress Report
              </Link>
              <span className="text-craft-shadow">|</span>
              <span>© 2025 All toys reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
