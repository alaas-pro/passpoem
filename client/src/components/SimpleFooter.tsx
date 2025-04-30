import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const SimpleFooter = () => {
  const [, setLocation] = useLocation();
  
  const navigateToPrivacy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Privacy button clicked"); // Debug log
    setLocation("/privacy");
  };
  
  return (
    <footer className="mt-auto py-6 text-center text-neutral-600 text-sm relative z-20">
      <p>&copy; {new Date().getFullYear()} Passpoem. All rights reserved.</p>
      <div className="mt-2 flex flex-col items-center gap-2">
        <Button 
          variant="link" 
          size="sm" 
          onClick={navigateToPrivacy}
          className="text-primary hover:text-primary/80 relative z-30 cursor-pointer"
        >
          Privacy Policy
        </Button>
        <p className="text-sm">
          Made with ❤️ by <a href="https://alaas.pro" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 underline">Alaa S.</a>
        </p>
      </div>
    </footer>
  );
};

export default SimpleFooter;