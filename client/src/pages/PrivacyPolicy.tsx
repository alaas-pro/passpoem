import Header from "@/components/Header";
import { useLocation } from "wouter";

const PrivacyPolicy = () => {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="container mx-auto max-w-4xl">
        <Header />

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-10">
          <div className="mb-6 flex items-center">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setLocation("/");
              }} 
              className="text-primary hover:text-primary/80 flex items-center cursor-pointer border-none bg-transparent p-0 relative z-50"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="m12 19-7-7 7-7"/>
                  <path d="M19 12H5"/>
                </svg>
                Back to Home
            </button>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl text-primary mb-8">Privacy Policy</h1>

          <div className="space-y-8 text-neutral-700">
            <p className="text-sm italic">Last updated: {new Date().toLocaleDateString()}</p>

            <section>
              <h2 className="font-serif text-xl text-primary mb-4">Information We Collect</h2>
              <p className="leading-relaxed">
                We only collect email addresses when users choose to join our waitlist. This information is used 
                solely for the purpose of sending updates about our service. You can unsubscribe from these 
                communications at any time through the unsubscribe link provided in each email.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-primary mb-4">Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate security measures to protect your email address. Your information is 
                processed securely and is only used for waitlist communications.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-primary mb-4">Contact Us</h2>
              <p className="leading-relaxed">
                If you have questions about this privacy policy or how we handle your information, please contact 
                us at privacy@passpoem.com.
              </p>
            </section>
          </div>
        </div>

        <footer className="mt-12 text-center text-neutral-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Passpoem. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;