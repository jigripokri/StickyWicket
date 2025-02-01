import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@db/schema";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        <Card className="overflow-hidden h-full flex flex-col">
          <CardHeader className="p-6 flex-shrink-0">
            <div className="text-6xl mb-4 flex justify-center">
              {project.imageUrl}
            </div>
          </CardHeader>
          <CardContent className="p-6 flex-grow flex flex-col">
            <CardTitle className="flex items-center gap-2 mb-4">
              {project.title}
              <ArrowUpRight className="h-4 w-4" />
            </CardTitle>
            <p className="text-muted-foreground flex-grow">{project.description}</p>
          </CardContent>
        </Card>
      </a>
    </motion.div>
  );
}