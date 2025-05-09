
import logo from "@/assets/passpoem-logo-simple.svg";
import { useAppState } from "@/hooks/useAppState";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { resetApp, setCurrentStep } = useAppState();

  const handleClick = () => {
    resetApp();
    setCurrentStep("welcome");
  };

  return (
    <header className="mb-8 flex flex-col items-center justify-center text-center">
      <Button
        variant="ghost"
        className="flex flex-col items-center hover:bg-transparent"
        onClick={handleClick}
      >
        <div className="w-24 h-24 mb-4">
          <img src={logo} alt="Passpoem Logo" className="w-full h-auto" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-primary">Passpoem</h1>
        <p className="font-serif italic text-xl md:text-2xl text-neutral-600 mt-2">Where security meets soul</p>
      </Button>
    </header>
  );
};

export default Header;
