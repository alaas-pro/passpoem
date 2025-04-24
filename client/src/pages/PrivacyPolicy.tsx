import { useCallback } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";

const PrivacyPolicy = () => {
  const [location, setLocation] = useLocation();
  
  const navigateToHome = useCallback(() => {
    setLocation("/");
  }, [setLocation]);
  return (
    <div className="min-h-screen px-4 py-12 bg-gradient-to-b from-primary/5 to-primary/10">
      <div className="container mx-auto max-w-4xl">
        <Header />
        
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-10">
          <div className="mb-6 flex items-center">
            <button 
              onClick={navigateToHome} 
              className="text-primary hover:text-primary/80 flex items-center cursor-pointer border-none bg-transparent p-0"
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
              <h2 className="font-serif text-xl text-primary mb-4">1. Information We Collect</h2>
              <p className="leading-relaxed">
                When you use our password generation service, we collect the responses you provide to our poetic 
                questions. This information is used solely for the purpose of generating your unique password.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-primary mb-4">2. How We Use Your Information</h2>
              <p className="leading-relaxed mb-4">Your information is used exclusively to:</p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Generate your personalized poetic password</li>
                <li>Improve our password generation algorithm</li>
                <li>Enhance your user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-xl text-primary mb-4">3. Data Security</h2>
              <p className="leading-relaxed">
                We implement appropriate security measures to protect your information. Your responses are 
                processed securely and are not stored permanently on our servers. We use advanced encryption 
                technology to ensure that your data remains confidential during transmission.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-primary mb-4">4. Data Sharing</h2>
              <p className="leading-relaxed">
                We do not sell, trade, or transfer your information to third parties. Your data is used 
                solely for password generation purposes within our application. We may share anonymized, 
                aggregated data for research purposes, but this will never include personally identifiable information.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-primary mb-4">5. Email Collection</h2>
              <p className="leading-relaxed">
                If you choose to join our waitlist, we collect your email address to provide you with updates 
                about our service. You can unsubscribe from these communications at any time through the unsubscribe 
                link provided in each email.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-primary mb-4">6. Changes to Privacy Policy</h2>
              <p className="leading-relaxed">
                We may update this privacy policy from time to time. Any changes will be posted on this page, 
                and if significant changes are made, we will provide a more prominent notice.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl text-primary mb-4">7. Contact Us</h2>
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