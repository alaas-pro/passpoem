import logo from "@/assets/passpoem-logo-simple.svg";
import { useAppState } from "@/hooks/useAppState";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

const Header = () => {
  const { resetApp } = useAppState();

  return (
    <header className="mb-8 flex flex-col items-center justify-center text-center relative">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={resetApp}
        className="absolute right-0 top-0"
        title="Restart"
      >
        <RotateCcw className="h-5 w-5" />
      </Button>
      <div className="w-24 h-24 mb-4">
        <img src={logo} alt="Passpoem Logo" className="w-full h-auto" />
      </div>
      <h1 className="font-serif text-4xl md:text-5xl text-primary">Passpoem</h1>
      <p className="font-serif italic text-xl md:text-2xl text-neutral-600 mt-2">Where security meets soul</p>
    </header>
  );
};

export default Header;
