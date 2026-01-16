import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.status(201).json({ success: true, id: submission.id });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid form data", details: error.errors });
      } else {
        console.error("Contact submission error:", error);
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Get submissions error:", error);
      res.status(500).json({ error: "Failed to fetch submissions" });
    }
  });

  app.post("/api/estimate", async (req, res) => {
    try {
      const { projectType, features, timeline, complexity } = req.body;

      const projectPrices: Record<string, { price: number; days: number }> = {
        landing: { price: 15000, days: 5 },
        webapp: { price: 50000, days: 21 },
        ecommerce: { price: 75000, days: 30 },
        saas: { price: 100000, days: 45 },
        custom: { price: 40000, days: 20 },
      };

      const featurePrices: Record<string, { price: number; days: number }> = {
        auth: { price: 10000, days: 3 },
        payments: { price: 15000, days: 4 },
        ai: { price: 25000, days: 7 },
        realtime: { price: 20000, days: 5 },
        admin: { price: 20000, days: 6 },
        api: { price: 12000, days: 4 },
      };

      const timelineMultipliers: Record<string, number> = {
        urgent: 1.5,
        normal: 1,
        flexible: 0.9,
      };

      const complexityMultipliers: Record<string, number> = {
        simple: 0.8,
        medium: 1,
        complex: 1.4,
      };

      const base = projectPrices[projectType] || { price: 40000, days: 20 };
      let totalPrice = base.price;
      let totalDays = base.days;

      if (features && Array.isArray(features)) {
        features.forEach((featureId: string) => {
          const feature = featurePrices[featureId];
          if (feature) {
            totalPrice += feature.price;
            totalDays += feature.days;
          }
        });
      }

      const timelineMultiplier = timelineMultipliers[timeline] || 1;
      const complexityMultiplier = complexityMultipliers[complexity] || 1;

      totalPrice = Math.round(totalPrice * timelineMultiplier * complexityMultiplier);
      totalDays = Math.round(
        totalDays *
          (timeline === "urgent" ? 0.7 : timeline === "flexible" ? 1.2 : 1) *
          complexityMultiplier
      );

      res.json({
        price: totalPrice,
        days: totalDays,
        breakdown: {
          baseProject: projectType,
          features: features || [],
          timeline,
          complexity,
        },
      });
    } catch (error) {
      console.error("Estimate error:", error);
      res.status(500).json({ error: "Failed to calculate estimate" });
    }
  });

  return httpServer;
}
