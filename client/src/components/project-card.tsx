import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCallback } from "react";

interface Project {
  id: number;
  title: string;
  description: string;
  link: string;
  imageUrl: string;
  underConstruction?: boolean;
}

export function ProjectCard({ project }: { project: Project }) {
  // Generate a random pastel color using RGB for better animation support
  const getRandomPastelColor = useCallback(() => {
    const h = Math.random() * 360;
    const s = 0.7;
    const l = 0.8;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c/2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

    const red = Math.round((r + m) * 255);
    const green = Math.round((g + m) * 255);
    const blue = Math.round((b + m) * 255);

    return `rgb(${red}, ${green}, ${blue})`;
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <motion.div 
          className="h-full w-full relative"
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
        >
          {project.underConstruction && (
            <div className="absolute top-0 right-0 transform translate-x-[30%] -translate-y-[10%] rotate-45 bg-yellow-400 text-yellow-900 py-1 px-8 font-semibold text-sm shadow-lg z-10">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;WIP
            </div>
          )}
          <a href={project.link} target="_blank" rel="noopener noreferrer" className="block h-full">
            <motion.div 
              className="h-full flex flex-col"
              whileHover={{
                backgroundColor: getRandomPastelColor(),
                transition: { duration: 0.2 }
              }}
            >
              <CardHeader className="p-6">
                <div className="text-6xl mb-4 flex justify-center">
                  {project.imageUrl}
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-grow">
                <CardTitle className="flex items-center gap-2 mb-4">
                  {project.title}
                  <ArrowUpRight className="h-4 w-4" />
                </CardTitle>
                <p className="text-muted-foreground">
                  {project.description}
                </p>
              </CardContent>
            </motion.div>
          </a>
        </motion.div>
      </Card>
    </motion.div>
  );
}