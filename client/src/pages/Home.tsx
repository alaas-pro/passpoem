import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";

const Home = () => {
  return (
    <div className="relative z-10 min-h-screen bg-secondary">
      {/* Background pattern */}
      <div className="fixed inset-0 z-0 bg-pattern"></div>
      
      <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </div>
  );
};

// Add the styled background pattern
const StyleTag = () => {
  return (
    <style jsx global>{`
      .bg-pattern {
        background-color: #E8F3E8;
        background-image: radial-gradient(#5B9A8B 0.5px, transparent 0.5px);
        background-size: 20px 20px;
        background-position: 0 0;
        opacity: 0.2;
      }
    `}</style>
  );
};

export default Home;
