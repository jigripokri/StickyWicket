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
      className="sketch-card block group relative col-span-1 md:col-span-2 row-span-1 md:row-span-2 h-full flex flex-col"
      whileHover={{ scale: 1.01 }}
    >
      <div className="p-6 md:p-8 flex-1 flex flex-col">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl md:text-6xl">📚</span>
            <div>
              <span className="outline-badge mb-2">Storytelling</span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-ink group-hover:text-sketch-muted transition-colors flex items-center gap-2">
                KidScribe
                <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-60 transition-opacity" />
              </h3>
            </div>
          </div>
          <span className="featured-badge hidden md:inline-flex">★ FEATURED</span>
        </div>

        {/* Main tagline */}
        <div className="mb-4">
          <p className="font-display text-xl md:text-2xl text-ink/90 leading-snug">
            Magical Books Starring Your Child
          </p>
        </div>

        {/* Description */}
        <p className="text-ink/60 text-base md:text-lg leading-relaxed mb-6 max-w-md">
          Watch their eyes light up as they become the hero of their own illustrated adventure. Ready in 5 minutes.
        </p>

        {/* Visual Harmony preview */}
        <div className="mt-auto">
          <p className="text-xs font-medium text-ink/40 uppercase tracking-wider mb-3">Character Consistency Across Scenes</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="relative rounded-lg overflow-hidden border border-sketch-border">
              <img 
                src="https://kidscribe.ai/assets/consistency-1-CaVth82r.png" 
                alt="Scene 1: Characters meeting"
                className="w-full h-20 md:h-24 object-cover"
              />
            </div>
            <div className="relative rounded-lg overflow-hidden border border-sketch-border">
              <img 
                src="https://kidscribe.ai/assets/consistency-2-CErFaxMK.png" 
                alt="Scene 2: Characters on discovery"
                className="w-full h-20 md:h-24 object-cover"
              />
            </div>
            <div className="relative rounded-lg overflow-hidden border border-sketch-border">
              <img 
                src="https://kidscribe.ai/assets/consistency-3-BXg-iRdO.png" 
                alt="Scene 3: Characters on adventure"
                className="w-full h-20 md:h-24 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
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

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className="sketch-card block group h-full"
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-6">
        {/* Emoji and category */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{project.emoji}</div>
          <span className="outline-badge">{project.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-ink mb-2 group-hover:text-sketch-muted transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-ink/60 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>
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
    <div className="min-h-screen bg-cream">
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
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-ink leading-tight mb-6">
                Tiny Apps.
                <br />
                Big Smiles.
              </h1>

              <p className="text-ink/60 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                A toy box of delightful little experiments—built on rainy Saturdays, powered by curiosity. Pick one. Play. Repeat.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="outline-button inline-flex items-center gap-2">
                  <Blocks className="w-4 h-4" />
                  See All Projects
                </a>
                <Link href="/analytics" className="outline-button inline-flex items-center gap-2">
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
      <section id="projects" className="px-6 py-16 border-t border-sketch-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
                Our Toy Box
              </h2>
              <p className="text-ink/50 text-lg max-w-md mx-auto">
                Pick a project and start playing!
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <FeaturedKidScribeCard />
            {projects.filter(p => p.id !== 17).map((project, index) => (
              <ToyCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-white border-t border-sketch-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/images/swl-logo.png" alt="Sticky Wicket Labs" className="h-8 w-auto" />
              <div>
                <div className="font-display font-bold text-ink text-lg">
                  Sticky Wicket Labs
                </div>
                <div className="text-sm text-ink/40">
                  Building fun since 2024
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-ink/40">
              <Link href="/analytics" className="hover:text-ink transition-colors font-medium">
                Progress Report
              </Link>
              <span className="text-sketch-border">|</span>
              <span>© 2025 All toys reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
