import { useEffect } from "react";
import { useAppState } from "@/hooks/useAppState";
import { apiRequest } from "@/lib/queryClient";
import { motion } from "framer-motion";
import { Pen } from "lucide-react";

const GeneratingSection = () => {
  const { answeredQuestions, setPassword, setCurrentStep } = useAppState();

  useEffect(() => {
    const generatePassword = async () => {
      try {
        const res = await apiRequest("POST", "/api/generate-password", {
          answers: answeredQuestions
        });
        
        const data = await res.json();
        
        setPassword(data);
        
        // Simulate a slight delay for better UX
        setTimeout(() => {
          setCurrentStep("password");
        }, 1500);
      } catch (error) {
        console.error("Error generating password:", error);
        // Fallback to a default password in case of error
        setPassword({
          value: "Gentle@Forest7Whispers",
          mnemonic: "Imagine walking through a gentle forest where the trees whisper ancient secrets.",
          score: 3
        });
        setTimeout(() => {
          setCurrentStep("password");
        }, 1500);
      }
    };

    generatePassword();
  }, [answeredQuestions, setPassword, setCurrentStep]);

  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-10 text-center">
        <div className="w-20 h-20 mx-auto mb-6">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Pen className="w-full h-full text-primary" />
          </motion.div>
        </div>
        <h2 className="font-serif text-2xl md:text-3xl text-primary mb-4">Crafting Your Poetic Password</h2>
        <p className="font-serif italic text-xl text-neutral-600">Weaving your essence into secure characters...</p>
        
        <div className="mt-8 space-y-2">
          <div className="w-full max-w-md mx-auto h-2 bg-primary/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
            />
          </div>
          <p className="text-sm text-neutral-600 italic">The muse is whispering security into art...</p>
        </div>
      </div>
    </motion.section>
  );
};

export default GeneratingSection;
