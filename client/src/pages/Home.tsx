import Header from "@/components/Header";
import MainContent from "@/components/MainContent";
import SimpleFooter from "@/components/SimpleFooter";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Add CSS for background pattern directly to the document head
    const style = document.createElement('style');
    style.textContent = `
      .bg-pattern {
        background-color: #E8F5EE;
        background-image: radial-gradient(#5F9A85 0.5px, transparent 0.5px);
        background-size: 20px 20px;
        background-position: 0 0;
        opacity: 0.2;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Clean up style when component unmounts
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="relative z-10 min-h-screen bg-secondary">
      {/* Background pattern */}
      <div className="fixed inset-0 z-0 bg-pattern"></div>

      <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
        <Header />
        <MainContent />
        <SimpleFooter />
      </div>
    </div>
  );
};

export default Home;