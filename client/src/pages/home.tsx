import { ProjectCard } from "@/components/project-card";
import { motion } from "framer-motion";
import { Link } from "wouter";

export const projects = [
  {
    id: 17,
    title: "KidScribe",
    description: "Craft a fully illustrated storybook that's all about you.",
    link: "https://kidscribe.ai/",
    imageUrl: "📚",
    tagline: "Personalized Stories",
  },
  {
    id: 16,
    title: "Characto",
    description: "Create beautiful, consistent characters across scenes.",
    link: "https://characto.stickywicketlabs.com/",
    imageUrl: "👦",
    tagline: "Character Design",
  },
  {
    id: 1,
    title: "ELI5",
    description: "Making the web super fun to read!",
    link: "https://eli5.stickywicketlabs.com/",
    imageUrl: "🧠",
    tagline: "Learn Simply",
  },
  {
    id: 5,
    title: "DebateGPT",
    description: "Witness a debate between two AI personalities on any topic you choose.",
    link: "https://debategpt.stickywicketlabs.com/",
    imageUrl: "🥊",
    tagline: "AI Debates",
  },
  {
    id: 15,
    title: "DottyDraw",
    description: "Create pixel art drawings with simple dot patterns.",
    link: "https://dottydraw.stickywicketlabs.com/",
    imageUrl: "✏️",
    tagline: "Pixel Art",
  },
  {
    id: 6,
    title: "Wish Upon a Wall",
    description: "Collect heartfelt messages for loved ones.",
    link: "https://wishuponawall.net/",
    imageUrl: "🧱",
    tagline: "Memory Walls",
  },
  {
    id: 2,
    title: "Hue Knew?",
    description: "See how colors mix together to form new ones!",
    link: "https://hueknew.stickywicketlabs.com/",
    imageUrl: "🎨",
    tagline: "Color Play",
  },
  {
    id: 3,
    title: "Emoji Math",
    description: "Practice simple addition and subtraction with emojis.",
    link: "https://emojimath.stickywicketlabs.com/",
    imageUrl: "🧮",
    tagline: "Fun Math",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-6 pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-clay font-medium tracking-widest uppercase text-sm mb-6"
          >
            Sticky Wicket Labs
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-medium text-ink leading-tight mb-6"
          >
            Where Playful Ideas
            <br />
            Come to Life
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-ink/70 text-lg md:text-xl max-w-xl mx-auto leading-relaxed"
          >
            A collection of whimsical web experiments crafted for kids, parents, and the curious at heart.
          </motion.p>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-xs mx-auto flex items-center gap-4 mb-16">
        <div className="flex-1 h-px bg-clay/30"></div>
        <span className="text-2xl">🏏</span>
        <div className="flex-1 h-px bg-clay/30"></div>
      </div>

      {/* Projects Grid */}
      <main className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-clay/20 px-6 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-display text-2xl md:text-3xl text-ink mb-4">
            Made with curiosity & care
          </p>
          <p className="text-ink/60 mb-8">
            Each project is a small experiment in making the web more delightful.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-ink/50">
            <Link 
              href="/analytics" 
              className="hover:text-coral transition-colors"
            >
              Analytics
            </Link>
            <span>·</span>
            <span>Sticky Wicket Labs © 2025</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
