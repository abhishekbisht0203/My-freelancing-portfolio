import { Badge } from "@/components/ui/badge";
import { Phone, FileText, Code2, Rocket } from "lucide-react";
import { processSteps } from "@/lib/data";

const iconMap: Record<string, any> = {
  phone: Phone,
  "file-text": FileText,
  "code-2": Code2,
  rocket: Rocket,
};

export function ProcessSection() {
  return (
    <section id="process" className="py-20 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">Process</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How We Work Together
          </h2>
          <p className="text-lg text-muted-foreground">
            A streamlined process designed to deliver results without the
            complexity. No surprises, just progress.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step) => {
              const Icon = iconMap[step.icon] || Phone;
              return (
                <div
                  key={step.id}
                  className="relative text-center"
                  data-testid={`process-step-${step.step}`}
                >
                  <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-full bg-primary flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-card border-2 border-primary text-xs font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
