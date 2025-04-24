import { InsertWaitlist, Waitlist } from "@shared/schema";

// Storage interface for the app
export interface IStorage {
  addToWaitlist(email: InsertWaitlist): Promise<Waitlist>;
  getWaitlist(): Promise<Waitlist[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private waitlist: Map<number, Waitlist>;
  private currentId: number;

  constructor() {
    this.waitlist = new Map();
    this.currentId = 1;
  }

  async addToWaitlist(data: InsertWaitlist): Promise<Waitlist> {
    // Check if email already exists
    const exists = Array.from(this.waitlist.values()).some(
      entry => entry.email === data.email
    );

    if (exists) {
      throw new Error("Email already registered");
    }

    const id = this.currentId++;
    const createdAt = new Date();
    
    const entry: Waitlist = {
      id,
      email: data.email,
      createdAt
    };
    
    this.waitlist.set(id, entry);
    return entry;
  }

  async getWaitlist(): Promise<Waitlist[]> {
    return Array.from(this.waitlist.values());
  }
}

// Export a singleton instance
export const storage = new MemStorage();
