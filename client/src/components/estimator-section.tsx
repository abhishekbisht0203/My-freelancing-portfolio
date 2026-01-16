import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Calculator, Sparkles, Clock, IndianRupee, Loader2, AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const projectTypes = [
  { id: "landing", label: "Landing Page" },
  { id: "webapp", label: "Web Application" },
  { id: "ecommerce", label: "E-Commerce Store" },
  { id: "saas", label: "SaaS Platform" },
  { id: "custom", label: "Custom Project" },
];

const features = [
  { id: "auth", label: "User Authentication" },
  { id: "payments", label: "Payment Integration" },
  { id: "ai", label: "AI Integration" },
  { id: "realtime", label: "Real-time Features" },
  { id: "admin", label: "Admin Dashboard" },
  { id: "api", label: "Third-party API Integration" },
];

const timelines = [
  { id: "urgent", label: "Urgent (1.5x)" },
  { id: "normal", label: "Normal" },
  { id: "flexible", label: "Flexible (0.9x)" },
];

const complexities = [
  { id: "simple", label: "Simple" },
  { id: "medium", label: "Medium" },
  { id: "complex", label: "Complex" },
];

interface EstimateResult {
  price: number;
  days: number;
  breakdown: {
    baseProject: string;
    features: string[];
    timeline: string;
    complexity: string;
  };
}

export function EstimatorSection() {
  const [projectType, setProjectType] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState("normal");
  const [complexity, setComplexity] = useState("medium");

  const estimateMutation = useMutation({
    mutationFn: async (data: {
      projectType: string;
      features: string[];
      timeline: string;
      complexity: string;
    }): Promise<EstimateResult> => {
      const response = await apiRequest("POST", "/api/estimate", data);
      return response.json();
    },
  });

  const handleCalculate = () => {
    if (!projectType) return;
    estimateMutation.mutate({
      projectType,
      features: selectedFeatures,
      timeline,
      complexity,
    });
  };

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((f) => f !== featureId)
        : [...prev, featureId]
    );
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="estimator" className="py-20 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered Tool
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Project Cost Estimator
          </h2>
          <p className="text-lg text-muted-foreground">
            Get an instant estimate for your project. Answer a few questions and
            see the approximate cost and timeline.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-primary" />
                  Configure Your Project
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Project Type
                  </Label>
                  <RadioGroup
                    value={projectType}
                    onValueChange={setProjectType}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {projectTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-3">
                        <RadioGroupItem
                          value={type.id}
                          id={type.id}
                          data-testid={`radio-project-${type.id}`}
                        />
                        <Label
                          htmlFor={type.id}
                          className="cursor-pointer flex-1"
                        >
                          {type.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Additional Features
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-center space-x-3"
                      >
                        <Checkbox
                          id={feature.id}
                          checked={selectedFeatures.includes(feature.id)}
                          onCheckedChange={() => toggleFeature(feature.id)}
                          data-testid={`checkbox-feature-${feature.id}`}
                        />
                        <Label
                          htmlFor={feature.id}
                          className="cursor-pointer flex-1"
                        >
                          {feature.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Timeline
                  </Label>
                  <RadioGroup
                    value={timeline}
                    onValueChange={setTimeline}
                    className="flex flex-wrap gap-4"
                  >
                    {timelines.map((t) => (
                      <div key={t.id} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={t.id}
                          id={`timeline-${t.id}`}
                          data-testid={`radio-timeline-${t.id}`}
                        />
                        <Label
                          htmlFor={`timeline-${t.id}`}
                          className="cursor-pointer"
                        >
                          {t.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-medium mb-4 block">
                    Complexity
                  </Label>
                  <RadioGroup
                    value={complexity}
                    onValueChange={setComplexity}
                    className="flex flex-wrap gap-4"
                  >
                    {complexities.map((c) => (
                      <div key={c.id} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={c.id}
                          id={`complexity-${c.id}`}
                          data-testid={`radio-complexity-${c.id}`}
                        />
                        <Label
                          htmlFor={`complexity-${c.id}`}
                          className="cursor-pointer"
                        >
                          {c.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <Button
                  onClick={handleCalculate}
                  disabled={!projectType || estimateMutation.isPending}
                  className="w-full"
                  size="lg"
                  data-testid="button-calculate-estimate"
                >
                  {estimateMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-4 h-4 mr-2" />
                      Calculate Estimate
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Your Estimate</CardTitle>
              </CardHeader>
              <CardContent>
                {estimateMutation.isPending && (
                  <div className="text-center py-8">
                    <Loader2 className="w-12 h-12 mx-auto mb-4 text-primary animate-spin" />
                    <p className="text-muted-foreground">Calculating your estimate...</p>
                  </div>
                )}

                {estimateMutation.isError && (
                  <div className="text-center py-8">
                    <AlertCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
                    <p className="text-destructive mb-4">Failed to calculate estimate</p>
                    <Button variant="outline" onClick={handleCalculate}>
                      Try Again
                    </Button>
                  </div>
                )}

                {estimateMutation.isSuccess && estimateMutation.data && (
                  <div className="space-y-6">
                    <div className="text-center p-6 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-center justify-center gap-1 text-3xl font-bold text-primary mb-1">
                        <IndianRupee className="w-6 h-6" />
                        {estimateMutation.data.price.toLocaleString("en-IN")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Estimated cost
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 p-4 rounded-lg bg-muted">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{estimateMutation.data.days} days</span>
                      <span className="text-sm text-muted-foreground">
                        estimated timeline
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground text-center">
                      This is a rough estimate. Final pricing depends on detailed
                      requirements discussion.
                    </p>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={scrollToContact}
                      data-testid="button-get-exact-quote"
                    >
                      Get Exact Quote
                    </Button>
                  </div>
                )}

                {!estimateMutation.isPending && !estimateMutation.isError && !estimateMutation.isSuccess && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select options and click Calculate to see your estimate</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
