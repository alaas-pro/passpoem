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
              fill="none" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <rect x="30" y="35" width="40" height="40" rx="8" ry="8" />
              <path d="M60 35V25c0-5.5-4.5-10-10-10S40 19.5 40 25v10" />
              <path d="M42 65 L50 45 L58 65 L50 60 L42 65" />
              <circle cx="50" cy="52" r="2" fill="currentColor" />
              <path d="M42 75 H58" strokeWidth="4" />
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
