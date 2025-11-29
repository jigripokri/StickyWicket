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

function FeaturedKidScribeCard() {
  const handleClick = async () => {
    try {
      await apiRequest("POST", `/api/track-click/17`);
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  };

  return (
    <motion.a
      href="https://kidscribe.ai/"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="craft-card block group relative col-span-1 md:col-span-2 row-span-1 md:row-span-2 h-full flex flex-col overflow-hidden"
      whileHover={{ scale: 1.01 }}
    >
      {/* Tape accent */}
      <div 
        className="absolute -top-2 left-8 w-24 h-6 rounded-sm opacity-80 z-10"
        style={{ 
          background: `linear-gradient(135deg, #F59E0B40 0%, #F59E0B60 100%)`,
          transform: 'rotate(-1deg)',
        }}
      />
      <div 
        className="absolute -top-2 right-8 w-20 h-5 rounded-sm opacity-70 hidden md:block z-10"
        style={{ 
          background: `linear-gradient(135deg, #F59E0B40 0%, #F59E0B60 100%)`,
          transform: 'rotate(2deg)',
        }}
      />

      <div className="p-6 md:p-8 flex-1 flex flex-col">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl md:text-6xl">📚</span>
            <div>
              <div 
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
                style={{ backgroundColor: "#FEF3C7", color: "#B45309" }}
              >
                Storytelling
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-marker group-hover:text-lego-blue transition-colors flex items-center gap-2">
                KidScribe
                <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-60 transition-opacity" />
              </h3>
            </div>
          </div>
          <div className="hidden md:block bg-lego-red text-white px-3 py-1 rounded-full text-xs font-bold">
            ★ FEATURED
          </div>
        </div>

        {/* Main tagline */}
        <div className="mb-4">
          <p className="font-display text-xl md:text-2xl text-marker/90 leading-snug">
            Magical Books <span className="text-lego-red">Starring Your Child</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-marker/70 text-base md:text-lg leading-relaxed mb-6 max-w-md">
          Watch their eyes light up as they become the hero of their own illustrated adventure. Ready in 5 minutes.
        </p>

        {/* Features grid */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <div className="bg-craft-tan/50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">✨</div>
            <div className="text-xs font-medium text-marker/70">Personalized Stories</div>
          </div>
          <div className="bg-craft-tan/50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🎨</div>
            <div className="text-xs font-medium text-marker/70">12 Art Styles</div>
          </div>
          <div className="bg-craft-tan/50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">👧</div>
            <div className="text-xs font-medium text-marker/70">Character Consistency</div>
          </div>
          <div className="bg-craft-tan/50 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">📖</div>
            <div className="text-xs font-medium text-marker/70">Print-Ready Books</div>
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-3 mt-auto bg-gradient-to-r from-lego-yellow via-lego-orange to-lego-red" />
    </motion.a>
  );
}

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
      className="craft-card block group relative h-full flex flex-col overflow-hidden"
      style={{ transform: `rotate(${rotation}deg)` }}
      whileHover={{ rotate: 0, scale: 1.02 }}
    >
      {/* Tape accent */}
      <div 
        className="absolute -top-2 left-6 w-16 h-5 rounded-sm opacity-80 z-10"
        style={{ 
          background: `linear-gradient(135deg, ${colors.border}40 0%, ${colors.border}60 100%)`,
          transform: 'rotate(-2deg)',
        }}
      />

      <div className="p-6 flex-1">
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
        className="h-2 mt-auto"
        style={{ backgroundColor: colors.border }}
      />
    </motion.a>
  );
}

function PlayroomIllustration() {
  return (
    <motion.div 
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <img 
        src="/images/toybox-illustration.png"
        alt="Toy Box illustration with storybook, brain, boxing gloves, pencil, paint palette, emoji abacus, and brick wall representing all Sticky Wicket Labs projects"
        className="w-full h-auto"
      />
    </motion.div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-craft-paper">
      {/* Hero Section */}
      <section className="px-6 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-marker leading-tight mb-6">
                Tiny Apps.
                <br />
                <span className="text-lego-red">Big Smiles.</span>
              </h1>

              <p className="text-marker/70 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                A toy box of delightful little experiments—built on rainy Saturdays, powered by curiosity. Pick one. Play. Repeat.
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
            <FeaturedKidScribeCard />
            {projects.filter(p => p.id !== 17).map((project, index) => (
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
