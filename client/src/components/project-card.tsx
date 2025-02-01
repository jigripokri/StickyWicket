import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@db/schema";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        <Card className="overflow-hidden">
          <CardHeader className="p-0">
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
          </CardHeader>
          <CardContent className="p-6">
            <CardTitle className="flex items-center gap-2 mb-2">
              {project.title}
              <ArrowUpRight className="h-4 w-4" />
            </CardTitle>
            <p className="text-muted-foreground">{project.description}</p>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
}
