import { useAppState } from "@/hooks/useAppState";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const SuccessSection = () => {
  const { resetApp } = useAppState();

  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-10 text-center">
        <div className="w-20 h-20 mx-auto mb-6 text-green-500">
          <CheckCircle className="w-full h-full" />
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4">Thank You!</h2>
        <p className="text-neutral-600 mb-6">You've been added to our waitlist. We'll notify you when Passpoem is ready.</p>
        
        <blockquote className="italic text-accent font-serif text-xl mb-8">
          "In a world of keys and codes, only poetry unlocks the soul."
        </blockquote>
        
        <Button 
          onClick={resetApp}
          className="bg-primary hover:bg-primary/90 text-white font-serif py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Create Another Password
        </Button>
      </div>
    </motion.section>
  );
};

export default SuccessSection;
