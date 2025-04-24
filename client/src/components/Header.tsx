import logo from "@/assets/logo.svg";

const Header = () => {
  return (
    <header className="mb-8 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 mb-4">
        <img src={logo} alt="Passpoem Logo" className="w-full h-auto" />
      </div>
      <h1 className="font-serif text-4xl md:text-5xl text-primary">Passpoem</h1>
      <p className="font-serif italic text-xl md:text-2xl text-neutral-600 mt-2">Where security meets soul</p>
    </header>
  );
};

export default Header;
