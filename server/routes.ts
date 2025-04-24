import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { generatePassword } from "./gemini";
import { z } from "zod";
import zxcvbn from "zxcvbn";

export async function registerRoutes(app: Express): Promise<Server> {
  // Password generation endpoint
  app.post("/api/generate-password", async (req, res) => {
    try {
      // Validate the input
      const schema = z.object({
        answers: z.array(
          z.object({
            question: z.string(),
            answer: z.string()
          })
        )
      });

      const { answers } = schema.parse(req.body);
      
      // Generate password using Gemini API
      const { value, mnemonic } = await generatePassword(answers);
      
      // Calculate password strength score
      const strength = zxcvbn(value);
      const score = strength.score; // 0-4 score
      
      return res.json({
        value,
        mnemonic,
        score
      });
    } catch (error) {
      console.error("Error generating password:", error);
      return res.status(400).json({ 
        message: error instanceof Error ? error.message : "Failed to generate password" 
      });
    }
  });

  // Waitlist endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      const data = insertWaitlistSchema.parse(req.body);
      await storage.addToWaitlist(data);
      return res.status(201).json({ message: "Successfully added to waitlist" });
    } catch (error) {
      console.error("Error adding to waitlist:", error);
      return res.status(400).json({ 
        message: error instanceof Error ? error.message : "Failed to add to waitlist" 
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
