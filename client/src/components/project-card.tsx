import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  underConstruction?: boolean;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="h-full"
    >
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        <Card className="overflow-hidden h-full flex flex-col relative">
          {project.underConstruction && (
            <div className="absolute top-0 right-0 transform translate-x-[30%] -translate-y-[10%] rotate-45 bg-yellow-400 text-yellow-900 py-1 px-8 font-semibold text-sm shadow-lg">
              Under Construction
            </div>
          )}
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