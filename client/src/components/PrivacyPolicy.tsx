
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PrivacyPolicyProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PrivacyPolicy = ({ open, onOpenChange }: PrivacyPolicyProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">Privacy Policy</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 text-sm">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <section>
            <h3 className="font-semibold mb-2">1. Information We Collect</h3>
            <p>We collect information you provide when using our password generation service, including your responses to our poetic questions. This information is used solely for generating your unique password.</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">2. How We Use Your Information</h3>
            <p>Your information is used exclusively to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Generate your personalized password</li>
              <li>Improve our password generation algorithm</li>
              <li>Enhance your user experience</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-2">3. Data Security</h3>
            <p>We implement appropriate security measures to protect your information. Your responses are processed securely and are not stored permanently on our servers.</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">4. Data Sharing</h3>
            <p>We do not sell, trade, or transfer your information to third parties. Your data is used solely for password generation purposes.</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">5. Changes to Privacy Policy</h3>
            <p>We may update this privacy policy from time to time. Any changes will be posted on this page.</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">6. Contact Us</h3>
            <p>If you have questions about this privacy policy, please contact us.</p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrivacyPolicy;
