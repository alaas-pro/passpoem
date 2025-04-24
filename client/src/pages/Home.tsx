import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainContent from "@/components/MainContent";

const Home = () => {
  return (
    <div className="relative z-10 min-h-screen bg-secondary">
      {/* Background pattern */}
      <div className="fixed inset-0 z-0 bg-pattern"></div>
      <StyleTag />
      
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
    <style dangerouslySetInnerHTML={{
      __html: `
        .bg-pattern {
          background-color: #E8F5EE;
          background-image: radial-gradient(#5F9A85 0.5px, transparent 0.5px);
          background-size: 20px 20px;
          background-position: 0 0;
          opacity: 0.2;
        }
      `
    }} />
  );
};

export default Home;
