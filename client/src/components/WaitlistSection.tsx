import { useState } from "react";
import { useAppState } from "@/hooks/useAppState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address")
});

type WaitlistFormValues = z.infer<typeof waitlistSchema>;

const WaitlistSection = () => {
  const { setCurrentStep } = useAppState();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: ""
    }
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/waitlist", { email: data.email });
      setCurrentStep("success");
    } catch (error) {
      console.error("Error submitting waitlist:", error);
      toast({
        title: "Error",
        description: "Failed to join waitlist. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-10 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4">Join Our Poetic Journey</h2>
        <p className="text-neutral-600 mb-6">Be the first to experience the full Passpoem platform when we launch.</p>
        
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <Label htmlFor="email" className="block text-sm font-medium text-neutral-600 mb-2">
                    Email Address
                  </Label>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      id="email"
                      className="w-full border border-primary/30 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="your@email.com"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-serif py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
            >
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
        </Form>
        
        <div className="mt-8">
          <div className="h-64 rounded-lg shadow-md mx-auto mb-4 bg-secondary flex items-center justify-center">
            <svg 
              className="w-16 h-16 text-primary opacity-30" 
              viewBox="0 0 512 512" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="20" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="128" y="224" width="256" height="224" rx="32" ry="32" />
              <path d="M336 224 L336 160 C336 93 288 48 256 48 C224 48 176 93 176 160 L176 224" />
              <path d="M256 192 L192 360 L256 320 L320 360 L256 192" />
              <circle cx="256" cy="260" r="16" />
              <rect x="224" y="368" width="64" height="24" />
            </svg>
          </div>
          <p className="font-serif italic text-lg text-accent">Poetry in passwords, security in verse.</p>
        </div>
      </div>
    </motion.section>
  );
};

export default WaitlistSection;
