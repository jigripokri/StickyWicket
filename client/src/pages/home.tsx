import { motion } from "framer-motion";
import { Link } from "wouter";
import { Blocks, Sparkles, ExternalLink, Heart } from "lucide-react";
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
  "Storytelling": { bg: "#FFF4B8", text: "#7A6B2A", border: "#E8D990" },
  "Creative Tools": { bg: "#CFEFF1", text: "#3D6B6F", border: "#A8D8DB" },
  "Learning": { bg: "#D4F5E9", text: "#3D6B5A", border: "#A8D8C5" },
  "AI Fun": { bg: "#FFD7D5", text: "#8B4E52", border: "#E8B8B5" },
  "Community": { bg: "#E3D8FF", text: "#5B4B8A", border: "#C5B6E8" },
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
      className="note-card block group relative col-span-1 md:col-span-2 row-span-1 md:row-span-2 h-full flex flex-col"
      whileHover={{ scale: 1.01 }}
    >
      {/* Post-it strip accent */}
      <div 
        className="absolute -top-2.5 left-8 w-20 h-5 rounded-sm z-10"
        style={{ 
          background: `linear-gradient(135deg, #FFF4B8 0%, #FFEAA0 100%)`,
          transform: 'rotate(-1deg)',
          boxShadow: '0 2px 4px rgba(47, 42, 58, 0.08)',
        }}
      />
      <div 
        className="absolute -top-2 right-8 w-16 h-4 rounded-sm hidden md:block z-10"
        style={{ 
          background: `linear-gradient(135deg, #FFD7D5 0%, #FFC5C2 100%)`,
          transform: 'rotate(2deg)',
          boxShadow: '0 2px 4px rgba(47, 42, 58, 0.08)',
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
                style={{ backgroundColor: "#FFF4B8", color: "#7A6B2A", border: "1.5px solid #E8D990" }}
              >
                Storytelling
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-ink group-hover:text-ink-light transition-colors flex items-center gap-2">
                KidScribe
                <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-60 transition-opacity" />
              </h3>
            </div>
          </div>
          <div className="hidden md:block bg-postit-coral text-[#8B4E52] px-3 py-1 rounded-full text-xs font-bold border border-[#E8B8B5]">
            ★ FEATURED
          </div>
        </div>

        {/* Main tagline */}
        <div className="mb-4">
          <p className="font-display text-xl md:text-2xl text-ink/90 leading-snug">
            Magical Books <span className="text-[#8B4E52]">Starring Your Child</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-ink-light text-base md:text-lg leading-relaxed mb-6 max-w-md">
          Watch their eyes light up as they become the hero of their own illustrated adventure. Ready in 5 minutes.
        </p>

        {/* Visual Harmony preview */}
        <div className="mt-auto">
          <p className="text-xs font-medium text-ink-faint uppercase tracking-wider mb-3">Character Consistency Across Scenes</p>
          <div className="grid grid-cols-3 gap-2">
            <div className="relative rounded-xl overflow-hidden shadow-soft group/img">
              <img 
                src="https://kidscribe.ai/assets/consistency-1-CaVth82r.png" 
                alt="Scene 1: Characters meeting"
                className="w-full h-20 md:h-24 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-soft group/img">
              <img 
                src="https://kidscribe.ai/assets/consistency-2-CErFaxMK.png" 
                alt="Scene 2: Characters on discovery"
                className="w-full h-20 md:h-24 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-soft group/img">
              <img 
                src="https://kidscribe.ai/assets/consistency-3-BXg-iRdO.png" 
                alt="Scene 3: Characters on adventure"
                className="w-full h-20 md:h-24 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent bar - soft pastel gradient */}
      <div className="h-2 mt-auto bg-gradient-to-r from-postit-yellow via-postit-coral to-postit-rose" />
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

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 * index }}
      className="note-card block group relative h-full flex flex-col"
      whileHover={{ scale: 1.02 }}
    >
      {/* Post-it strip accent */}
      <div 
        className="absolute -top-2 left-6 w-14 h-4 rounded-sm z-10"
        style={{ 
          background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.border} 100%)`,
          transform: 'rotate(-1deg)',
          boxShadow: '0 2px 4px rgba(47, 42, 58, 0.06)',
        }}
      />

      <div className="p-6 flex-1">
        {/* Emoji and status */}
        <div className="flex items-start justify-between mb-4">
          <div className="text-5xl">{project.emoji}</div>
          <div 
            className="pastel-badge"
            style={{ 
              backgroundColor: colors.bg,
              color: colors.text,
              borderColor: colors.border,
            }}
          >
            {project.category}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-xl font-bold text-ink mb-2 group-hover:text-ink-light transition-colors flex items-center gap-2">
          {project.title}
          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-60 transition-opacity" />
        </h3>

        {/* Description */}
        <p className="text-ink-light text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Bottom accent bar */}
      <div 
        className="h-1.5 mt-auto"
        style={{ background: `linear-gradient(90deg, ${colors.bg} 0%, ${colors.border} 100%)` }}
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
    <div className="min-h-screen bg-neutral-parchment">
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
                Weekend Projects.
                <br />
                <span className="text-[#8B4E52]">Weekday Magic.</span>
              </h1>

              <p className="text-ink-light text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                Rediscovering the joy of web development through fun side projects. Built on rainy Saturdays.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="note-button note-button-coral inline-flex items-center gap-2">
                  <Blocks className="w-4 h-4" />
                  See All Projects
                </a>
                <Link href="/about" className="note-button note-button-lavender inline-flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  About Me
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
      <section id="projects" className="px-6 py-16 bg-neutral-parchment">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink mb-3">
                Projects
              </h2>
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
      <footer className="px-6 py-12 bg-white border-t border-neutral-edge">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img 
                src="/images/swl-logo.png" 
                alt="Sticky Wicket Labs" 
                className="h-12 w-auto"
              />
              <div>
                <div className="font-display font-bold text-ink text-lg">
                  Sticky Wicket Labs
                </div>
                <div className="text-sm text-ink-light">
                  Building fun since 2024
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-ink-light">
              <Link href="/about" className="hover:text-ink transition-colors font-medium">
                About Me
              </Link>
              <span className="text-neutral-edge">|</span>
              <span>© 2025 All projects reserved</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
