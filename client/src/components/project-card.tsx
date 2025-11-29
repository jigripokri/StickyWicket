import { ExternalLink, Play } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  emoji: string;
  status?: string;
  category?: string;
}

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const handleClick = async () => {
    try {
      await apiRequest("POST", `/api/track-click/${project.id}`);
    } catch (error) {
      console.error("Failed to track click:", error);
    }
  };

  const colors = ["#FF3366", "#00D4FF", "#00FF94", "#FFE566", "#B366FF"];
  const accentColor = colors[index % colors.length];

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="program-card block group"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl">{project.emoji}</div>
          <div className="flex items-center gap-2">
            <span className={`status-light ${project.status === 'live' ? 'active' : 'idle'}`}></span>
            <span className="text-xs text-tungsten-warm/60 uppercase tracking-wider">
              {project.status || 'live'}
            </span>
          </div>
        </div>

        {project.category && (
          <div 
            className="inline-block px-2 py-1 rounded text-xs font-medium mb-3"
            style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
          >
            {project.category}
          </div>
        )}

        <h3 className="font-display text-xl font-semibold text-tungsten-soft mb-2 group-hover:text-neon-cyan transition-colors flex items-center gap-2">
          {project.title}
          <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
        </h3>

        <p className="text-tungsten-warm/70 text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="px-6 py-3 bg-studio-slate/50 border-t border-studio-steel flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-tungsten-warm/50">
          <Play className="w-3 h-3" />
          <span>View Program</span>
        </div>
        <div className="w-8 h-1 rounded-full bg-studio-steel overflow-hidden">
          <div 
            className="h-full rounded-full" 
            style={{ width: '100%', backgroundColor: accentColor }}
          ></div>
        </div>
      </div>
    </a>
  );
}
