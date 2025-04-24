import { useAppState } from "@/hooks/useAppState";
import WelcomeSection from "./WelcomeSection";
import QuestionSection from "./QuestionSection";
import GeneratingSection from "./GeneratingSection";
import PasswordSection from "./PasswordSection";
import WaitlistSection from "./WaitlistSection";
import SuccessSection from "./SuccessSection";

const MainContent = () => {
  const { currentStep } = useAppState();

  return (
    <main className="flex-grow flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
      {currentStep === "welcome" && <WelcomeSection />}
      {currentStep === "questions" && <QuestionSection />}
      {currentStep === "generating" && <GeneratingSection />}
      {currentStep === "password" && <PasswordSection />}
      {currentStep === "waitlist" && <WaitlistSection />}
      {currentStep === "success" && <SuccessSection />}
    </main>
  );
};

export default MainContent;
