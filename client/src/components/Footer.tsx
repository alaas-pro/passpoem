
import { useState } from "react";
import PrivacyPolicy from "./PrivacyPolicy";

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <footer className="mt-12 text-center text-neutral-600 text-sm">
      <p>&copy; {new Date().getFullYear()} Passpoem. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <button 
          onClick={() => setShowPrivacy(true)} 
          className="text-primary hover:text-primary/80 cursor-pointer"
        >
          Privacy
        </button>
        <a href="#" className="text-primary hover:text-primary/80">Terms</a>
        <a href="#" className="text-primary hover:text-primary/80">Contact</a>
      </div>
      <PrivacyPolicy 
        open={showPrivacy} 
        onOpenChange={(open) => setShowPrivacy(open)} 
      />
    </footer>
  );
};

export default Footer;
