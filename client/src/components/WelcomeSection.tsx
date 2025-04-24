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
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
              <line x1="16" y1="8" x2="2" y2="22"></line>
              <line x1="17.5" y1="15" x2="9" y2="15"></line>
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
