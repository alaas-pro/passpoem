
import { useState } from "react";

const Footer = () => {
  const [clickCount, setClickCount] = useState(0);
  
  const navigateToPrivacy = () => {
    console.log("Privacy button clicked:", clickCount + 1);
    setClickCount(prev => prev + 1);
    
    // Use window.location to navigate
    window.location.href = "/privacy";
  };
  
  return (
    <footer className="mt-12 text-center text-neutral-600 text-sm">
      <p>&copy; {new Date().getFullYear()} Passpoem. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <button 
          onClick={navigateToPrivacy} 
          className="text-primary hover:text-primary/80 cursor-pointer border-none bg-transparent p-0 font-medium"
          style={{ outline: "none" }}
        >
          Privacy
        </button>
        <a href="#" className="text-primary hover:text-primary/80">Terms</a>
        <a href="#" className="text-primary hover:text-primary/80">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
