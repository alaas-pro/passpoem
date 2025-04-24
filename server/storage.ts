import { InsertWaitlist, Waitlist, waitlist } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Storage interface for the app
export interface IStorage {
  addToWaitlist(email: InsertWaitlist): Promise<Waitlist>;
  getWaitlist(): Promise<Waitlist[]>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  async addToWaitlist(data: InsertWaitlist): Promise<Waitlist> {
    try {
      // Insert and return the waitlist entry
      const [entry] = await db
        .insert(waitlist)
        .values(data)
        .returning();
      
      return entry;
    } catch (error: any) {
      // Handle unique constraint violation
      if (error.message?.includes('duplicate key value violates unique constraint')) {
        throw new Error("Email already registered");
      }
      throw error;
    }
  }

  async getWaitlist(): Promise<Waitlist[]> {
    return await db.select().from(waitlist);
  }
}

// Export a singleton instance
export const storage = new DatabaseStorage();
