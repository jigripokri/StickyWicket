import { ArrowUpRight } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  tagline?: string;
}

export function ProjectCard({ project }: { project: Project }) {
  const handleClick = async () => {
    try {
      await apiRequest("POST", `/api/track-click/${project.id}`);
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  };

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="block h-full"
    >
      <article className="exhibit-card h-full p-8 flex flex-col">
        {/* Emoji Badge */}
        <div className="mb-6 flex justify-center">
          <div className="emoji-badge">
            <span className="text-4xl">{project.imageUrl}</span>
          </div>
        </div>

        {/* Tagline */}
        {project.tagline && (
          <p className="text-xs font-medium tracking-widest uppercase text-coral text-center mb-3">
            {project.tagline}
          </p>
        )}

        {/* Title */}
        <h3 className="font-display text-xl font-medium text-ink text-center mb-3 flex items-center justify-center gap-2">
          {project.title}
          <ArrowUpRight className="h-4 w-4 text-clay" />
        </h3>

        {/* Description */}
        <p className="text-ink/70 text-center text-sm leading-relaxed flex-grow">
          {project.description}
        </p>
      </article>
    </a>
  );
}
