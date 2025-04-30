import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const SimpleFooter = () => {
  const [, setLocation] = useLocation();
  
  const navigateToPrivacy = () => {
    setLocation("/privacy");
  };
  
  return (
    <footer className="mt-auto py-6 text-center text-neutral-600 text-sm">
      <p>&copy; {new Date().getFullYear()} Passpoem. All rights reserved.</p>
      <div className="mt-2">
        <Button 
          variant="link" 
          size="sm" 
          onClick={navigateToPrivacy}
          className="text-primary hover:text-primary/80"
        >
          Privacy Policy
        </Button>
      </div>
    </footer>
  );
};

export default SimpleFooter;