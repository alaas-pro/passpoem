
import { useLocation } from "wouter";

const Footer = () => {
  const [, setLocation] = useLocation();
  
  const navigateToPrivacy = () => {
    // This directly manipulates the browser history
    setLocation("/privacy");
  };
  
  return (
    <footer className="mt-12 text-center text-neutral-600 text-sm">
      <p>&copy; {new Date().getFullYear()} Passpoem. All rights reserved.</p>
      <div className="mt-2 space-x-4">
        <Link 
          href="/privacy"
          className="text-primary hover:text-primary/80 cursor-pointer font-medium no-underline hover:underline"
        >
          Privacy
        </Link>
        <a href="#" className="text-primary hover:text-primary/80">Terms</a>
        <a href="#" className="text-primary hover:text-primary/80">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
