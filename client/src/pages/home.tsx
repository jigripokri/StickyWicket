import { ProjectCard } from "@/components/project-card";

// Edit your project cards here ⬇️
const projects = [
  {
    id: 1,
    title: "Wish Upon a Wall",
    description:
      "Create your own digital wishing wall! Share it with friends and family, and watch as they add their heartfelt messages.",
    link: "https://wishuponawall.net/",
    imageUrl: "🧱",
    underConstruction: false,
  },
  {
    id: 2,
    title: "Five High",
    description: "Get recommendations from your friends and family",
    link: "https://fivehigh.stickywicketlabs.com/",
    imageUrl: "🏗️",
    underConstruction: true,
  },
  {
    id: 3,
    title: "Donkey Pong",
    description: "A fun twist on the classic Pong game - watch out for Donkey Kong in the middle!",
    link: "https://pong-challenge-jigripokri.replit.app/",
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