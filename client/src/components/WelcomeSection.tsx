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
              viewBox="0 0 100 100" 
              fill="currentColor"
            >
              <rect x="25" y="20" width="50" height="40" rx="8" ry="8" />
              <path d="M65 20 V12 C65 4 58 -2 50 -2 S35 4 35 12 V20" />
              <path d="M30 60 L50 30 L70 60 L50 48 L30 60 Z M40 75 H60 V82 H40 Z" />
              <circle cx="50" cy="45" r="3" />
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
