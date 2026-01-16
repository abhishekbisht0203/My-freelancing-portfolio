import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Code2, Zap } from "lucide-react";
import { contactInfo } from "@/lib/data";

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            Available for new projects
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            I Build Products That
            <span className="block text-primary mt-2">Grow Your Business</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Hi, I'm {contactInfo.name}. I help startups and businesses build powerful
            web applications with AI integration. Not just code—solutions that
            drive revenue.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              onClick={() => scrollToSection("#contact")}
              className="w-full sm:w-auto gap-2"
              data-testid="button-hero-contact"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#projects")}
              className="w-full sm:w-auto"
              data-testid="button-hero-projects"
            >
              View My Work
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold">50+ Projects</div>
                <div className="text-sm text-muted-foreground">Delivered</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold">AI Powered</div>
                <div className="text-sm text-muted-foreground">Solutions</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card border border-border">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Fast Delivery</div>
                <div className="text-sm text-muted-foreground">2-4 Weeks</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => scrollToSection("#services")}
          className="w-8 h-12 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-2"
          data-testid="button-scroll-down"
        >
          <div className="w-1 h-3 rounded-full bg-muted-foreground/50" />
        </button>
      </div>
    </section>
  );
}
