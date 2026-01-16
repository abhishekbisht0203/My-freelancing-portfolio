import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-20 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">Portfolio</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Projects That Delivered Results
          </h2>
          <p className="text-lg text-muted-foreground">
            Real projects, real results. Each project solved a specific business
            problem and generated measurable outcomes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover-elevate"
              data-testid={`card-project-${project.id}`}
            >
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-4 left-4" variant="secondary">
                  {project.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>

                <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{project.results}</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              const element = document.querySelector("#contact");
              if (element) element.scrollIntoView({ behavior: "smooth" });
            }}
            data-testid="button-discuss-project"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Discuss Your Project
          </Button>
        </div>
      </div>
    </section>
  );
}
