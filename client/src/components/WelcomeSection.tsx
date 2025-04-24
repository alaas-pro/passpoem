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
