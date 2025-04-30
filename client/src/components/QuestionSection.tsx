import { useState, useEffect } from "react";
import { useAppState } from "@/hooks/useAppState";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { questions } from "@shared/questions";

const QuestionSection = () => {
  const { 
    currentQuestionIndex, 
    answeredQuestions,
    selectedQuestionIndices,
    setCurrentQuestionIndex, 
    setAnsweredQuestions,
    addQuestionIndex,
    setCurrentStep 
  } = useAppState();
  
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [progress, setProgress] = useState(0);
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(0);

  // Initialize with a random question
  useEffect(() => {
    if (currentQuestionIndex === 0 && selectedQuestionIndices.length === 0) {
      const randomIndex = Math.floor(Math.random() * questions.length);
      setCurrentQuestionId(randomIndex);
      addQuestionIndex(randomIndex);
    }
  }, [currentQuestionIndex, selectedQuestionIndices, addQuestionIndex]);

  useEffect(() => {
    setProgress((currentQuestionIndex / 5) * 100);
  }, [currentQuestionIndex]);

  // Get a new random question that hasn't been asked before
  const getRandomQuestion = (): number => {
    let newIndex: number;
    do {
      newIndex = Math.floor(Math.random() * questions.length);
    } while (selectedQuestionIndices.includes(newIndex));
    
    return newIndex;
  };

  const handleSkip = () => {
    // Get the next random question without incrementing the counter
    const nextQuestionId = getRandomQuestion();
    setCurrentQuestionId(nextQuestionId);
    addQuestionIndex(nextQuestionId);
    setCurrentAnswer("");
  };

  const handleAnswer = () => {
    if (currentAnswer.trim()) {
      // Store both the question text and the user's answer
      setAnsweredQuestions([
        ...answeredQuestions,
        {
          question: questions[currentQuestionId],
          answer: currentAnswer.trim()
        }
      ]);
      
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      setCurrentAnswer("");
      
      if (nextIndex >= 5) {
        setCurrentStep("generating");
      } else {
        // Get the next random question
        const nextQuestionId = getRandomQuestion();
        setCurrentQuestionId(nextQuestionId);
        addQuestionIndex(nextQuestionId);
      }
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Progress value={progress} className="mb-6 w-full h-3" />
      
      <div className="text-center mb-4">
        <span className="font-serif italic text-xl text-primary">
          Question {currentQuestionIndex + 1} of 5
        </span>
      </div>
      
      <motion.div 
        key={currentQuestionIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-8 md:p-10"
      >
        <h2 className="font-serif text-2xl text-primary mb-6">
          {questions[currentQuestionId]}
        </h2>
        <Textarea
          value={currentAnswer}
          onChange={(e) => setCurrentAnswer(e.target.value)}
          className="w-full border border-primary/30 rounded-lg p-4 h-32 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none font-sans text-neutral-700"
          placeholder="Write your answer here..."
        />
        
        <div className="flex justify-between mt-8">
          <Button 
            onClick={handleSkip}
            variant="outline"
            className="bg-white border border-primary text-primary hover:bg-primary/10 font-serif py-2 px-6 rounded-full shadow-sm transition-all duration-300"
          >
            Skip
          </Button>
          <Button 
            onClick={handleAnswer}
            className="bg-primary hover:bg-primary/90 text-white font-serif py-2 px-6 rounded-full shadow-md transition-all duration-300"
          >
            Continue
          </Button>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default QuestionSection;
