import { useAppState } from "@/hooks/useAppState";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const WelcomeSection = () => {
  const { setCurrentStep } = useAppState();

  const startJourney = () => {
    setCurrentStep("questions");
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-10 text-center">
        <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4">Welcome to your poetic password journey</h2>
        <p className="text-neutral-600 mb-6">Answer five soul-searching questions and we'll craft a secure password that resonates with your essence.</p>
        <div className="w-full max-w-xs mx-auto mb-6">
          <div className="relative rounded-lg shadow-md aspect-w-4 aspect-h-3 bg-secondary overflow-hidden">
            <svg 
              className="absolute inset-0 w-full h-full text-primary/20" 
              viewBox="0 0 512 512" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="24" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="136" y="224" width="240" height="176" rx="40" ry="40" />
              <path d="M336 224v-64c0-44.2-35.8-80-80-80s-80 35.8-80 80v64" />
              <path d="M256 300l-40 80 40-24 40 24-40-80z" />
              <circle cx="256" cy="320" r="8" fill="currentColor" />
              <rect x="236" y="380" width="40" height="12" fill="currentColor" />
            </svg>
          </div>
        </div>
        <Button 
          onClick={startJourney}
          className="bg-primary hover:bg-primary/90 text-white font-serif py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Begin Your Journey
        </Button>
      </div>
    </motion.section>
  );
};

export default WelcomeSection;
