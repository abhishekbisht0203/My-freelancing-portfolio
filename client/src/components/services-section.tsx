import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Brain, Rocket, Lightbulb, Check } from "lucide-react";
import { services } from "@/lib/data";

const iconMap: Record<string, any> = {
  code: Code2,
  brain: Brain,
  rocket: Rocket,
  lightbulb: Lightbulb,
};

export function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">Services</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How I Can Help You
          </h2>
          <p className="text-lg text-muted-foreground">
            From idea to launch, I provide end-to-end development services that
            turn your vision into a profitable product.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <Card
                key={service.id}
                className="group hover-elevate"
                data-testid={`card-service-${service.id}`}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
