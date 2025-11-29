import { motion } from "framer-motion";
import { Link } from "wouter";
import { Blocks, ExternalLink, Star, Sparkles, BookOpen, Clock, Heart } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export const projects = [
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

function KidScribeHero() {
  const handleClick = async () => {
    try {
      await apiRequest("POST", "/api/track-click/17");
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  };

  return (
    <section className="px-6 py-10 bg-craft-tan">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-lego-red/10 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5 text-lego-red" />
              <span className="text-xs font-semibold text-lego-red uppercase tracking-wide">Latest Project</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl font-bold text-marker mb-3">
              Magical Books Starring <span className="text-lego-red">Your Child</span>
            </h2>
            
            <p className="text-marker/70 text-base md:text-lg mb-5 max-w-md">
              Watch their eyes light up as they become the hero of their own illustrated adventure.
            </p>

            {/* Compact features */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-1.5 text-marker/60 text-sm">
                <BookOpen className="w-4 h-4 text-lego-blue" />
                <span>12 Art Styles</span>
              </div>
              <div className="flex items-center gap-1.5 text-marker/60 text-sm">
                <Heart className="w-4 h-4 text-lego-red" />
                <span>Life Lessons</span>
              </div>
              <div className="flex items-center gap-1.5 text-marker/60 text-sm">
                <Clock className="w-4 h-4 text-lego-green" />
                <span>5 Minutes</span>
              </div>
            </div>

            <a
              href="https://kidscribe.ai/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClick}
              className="brick-button brick-button-red inline-flex items-center gap-2"
            >
              <span>📚</span>
              Create a Story
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Right: Stacked images */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Back image */}
              <motion.div
                className="absolute -left-6 top-4 w-36 md:w-44"
                initial={{ rotate: -8 }}
                animate={{ rotate: -6 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-white">
                  <img 
                    src="https://kidscribe.ai/assets/consistency-1-CaVth82r.png"
                    alt="Story illustration"
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
              
              {/* Front image */}
              <motion.div
                className="relative z-10 w-44 md:w-56"
                initial={{ rotate: 4 }}
                animate={{ rotate: 3 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white rounded-lg shadow-xl overflow-hidden border-2 border-white">
                  <img 
                    src="https://kidscribe.ai/assets/consistency-2-CErFaxMK.png"
                    alt="Story illustration featuring your child"
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-craft-paper">
      {/* Hero Section */}
      <section className="px-6 py-10 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left: Main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold text-marker leading-tight mb-4">
                Tiny Apps.
                <br />
                <span className="text-lego-red">Big Smiles.</span>
              </h1>

              <p className="text-marker/70 text-lg leading-relaxed mb-6 max-w-md">
                Delightful weekend experiments—built on rainy Saturdays, powered by curiosity.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="#projects" className="brick-button brick-button-red inline-flex items-center gap-2">
                  <Blocks className="w-4 h-4" />
                  Explore Projects
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
              className="flex justify-center"
            >
              <div className="w-full max-w-sm">
                <PlayroomIllustration />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KidScribe Hero Showcase */}
      <KidScribeHero />

      {/* LEGO tape divider */}
      <div className="h-3 bg-lego-yellow" />

      {/* Projects Grid */}
      <section id="projects" className="px-6 py-12 bg-craft-paper">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-2xl md:text-3xl font-bold text-marker mb-2">
                The Toy Box
              </h2>
              <p className="text-marker/60 text-base">
                Pick a project and start playing
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {projects.map((project, index) => (
              <ToyCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-craft-tan border-t-2 border-craft-shadow/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧱</span>
              <span className="font-display font-bold text-marker">
                Sticky Wicket Labs
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-marker/50">
              <Link href="/analytics" className="hover:text-lego-blue transition-colors">
                Progress Report
              </Link>
              <span>•</span>
              <span>© 2025</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
