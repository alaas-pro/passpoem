import { useState, useEffect } from "react";
import { useAppState } from "@/hooks/useAppState";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import { CopyIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PasswordSection = () => {
  const { password, setCurrentStep } = useAppState();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const strengthMessages = [
    { text: "This password whispers too softly, easily drowned in the digital wind.", color: "text-red-600" },
    { text: "Like a paper shield, this offers only the illusion of protection.", color: "text-orange-500" },
    { text: "This password stands like a wooden gate—sufficient against casual intruders.", color: "text-yellow-600" },
    { text: "Your password sings with strong protection, like ancient castle walls covered in flowering vines.", color: "text-green-600" },
    { text: "A fortress of impenetrable verse—poetry and security in perfect harmony.", color: "text-primary" }
  ];

  const moveToWaitlist = () => {
    setCurrentStep("waitlist");
  };

  const regeneratePassword = async () => {
    setCurrentStep("generating");
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password.value);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
      duration: 2000,
    });
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const getSegmentColor = (index: number, score: number) => {
    if (index > score) return "bg-gray-200";
    
    const colors = [
      "bg-red-500",    // Very Weak
      "bg-orange-500", // Weak
      "bg-yellow-500", // Reasonable
      "bg-green-500",  // Strong
      "bg-primary",    // Very Strong
    ];
    
    return colors[score];
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-10">
        <h2 className="font-serif text-2xl md:text-3xl text-primary mb-6 text-center">Your Soul-Inspired Password</h2>
        
        {/* Password Display */}
        <div className="bg-secondary/70 rounded-lg p-6 mb-6 border border-primary/20">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-neutral-600">Your unique password:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={copyPassword}
              className="text-primary hover:text-primary/80 text-sm p-1 h-auto"
            >
              {copied ? "Copied!" : <CopyIcon className="h-4 w-4 mr-1" />}
            </Button>
          </div>
          <p className="font-mono text-xl md:text-2xl tracking-wide break-all">
            {password.value}
          </p>
        </div>
        
        {/* Mnemonic Cue */}
        <div className="bg-secondary/70 rounded-lg p-6 mb-6 border border-primary/20">
          <h3 className="text-sm text-neutral-600 mb-2">Your mnemonic reminder:</h3>
          <p className="font-serif italic text-lg md:text-xl text-neutral-700">
            {password.mnemonic}
          </p>
        </div>
        
        {/* Password Strength */}
        <div className="mb-8">
          <h3 className="text-sm text-neutral-600 mb-2">Password strength:</h3>
          
          {/* Strength Meter */}
          <div className="flex space-x-1 mb-2">
            {[0, 1, 2, 3, 4].map((index) => (
              <div 
                key={index}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${getSegmentColor(index, password.score)}`}
              />
            ))}
          </div>
          
          {/* Strength Message */}
          <p className="font-serif italic text-center">
            <span className={strengthMessages[password.score].color}>
              {strengthMessages[password.score].text}
            </span>
          </p>
        </div>
        
        <div className="text-center">
          <Button 
            onClick={moveToWaitlist}
            className="bg-primary hover:bg-primary/90 text-white font-serif py-3 px-8 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 mb-4"
          >
            Join Our Waitlist
          </Button>
          <Button 
            onClick={regeneratePassword}
            variant="link"
            className="block mx-auto text-primary hover:text-primary/80 underline text-sm mt-2"
          >
            Generate Another Password
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default PasswordSection;
