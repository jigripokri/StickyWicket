import { ProjectCard } from "@/components/project-card";

// Edit your project cards here ⬇️
export const projects = [
  {
    id: 1,
    title: "KidScribe",
    description: "Making the web super fun to read! ✨",
    link: "https://kidscribe.stickywicketlabs.com/",
    imageUrl: "📚",
    underConstruction: false,
  },
  {
    id: 5,
    title: "DebateGPT",
    description: "Witness a debate between two AI personalities on any topic you choose.",
    link: "https://debategpt.stickywicketlabs.com/",
    imageUrl: "🥊",
    underConstruction: false,
  },
  {
    id: 15,
    title: "DottyDraw",
    description: "Create pixel art drawings with simple dot patterns.",
    link: "https://dottydraw.stickywicketlabs.com/",
    imageUrl: "✏️",
    underConstruction: false,
  },
  {
    id: 6,
    title: "Wish Upon a Wall",
    description: "Collect heartfelt messages for loved ones.",
    link: "https://wishuponawall.net/",
    imageUrl: "🧱",
    underConstruction: false,
  },
  {
    id: 2,
    title: "Hue Knew?",
    description: "See how colors mix together to form new ones!",
    link: "https://hueknew.stickywicketlabs.com/",
    imageUrl: "🎨",
    underConstruction: false,
  },
  {
    id: 3,
    title: "Emoji Math",
    description: "Practice simple addition and subtraction with emojis",
    link: "https://emojimath.stickywicketlabs.com/",
    imageUrl: "🧮",
    underConstruction: false,
  },
  {
    id: 14,
    title: "Donkey Pong",
    description:
      "A fun twist on the classic Pong game - watch out for Donkey Kong in the middle!",
    link: "http://donkeypong.stickywicketlabs.com/",
    imageUrl: "🦍",
    underConstruction: false,
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Ideas, unstuck.</h1>
        <p className="text-muted-foreground">
          Exploring the joy of web development through fun little projects and
          experiments.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}