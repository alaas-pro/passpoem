import { create } from 'zustand';

type Question = {
  question: string;
  answer: string;
};

type Password = {
  value: string;
  mnemonic: string;
  score: number;
};

type AppState = {
  currentStep: 'welcome' | 'questions' | 'generating' | 'password' | 'waitlist' | 'success';
  currentQuestionIndex: number;
  answeredQuestions: Question[];
  password: Password;
  
  setCurrentStep: (step: AppState['currentStep']) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setAnsweredQuestions: (questions: Question[]) => void;
  setPassword: (password: Password) => void;
  resetApp: () => void;
};

export const useAppState = create<AppState>((set) => ({
  currentStep: 'welcome',
  currentQuestionIndex: 0,
  answeredQuestions: [],
  password: {
    value: '',
    mnemonic: '',
    score: 0
  },
  
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  
  setAnsweredQuestions: (questions) => set({ answeredQuestions: questions }),
  
  setPassword: (password) => set({ password }),
  
  resetApp: () => set({
    currentStep: 'welcome',
    currentQuestionIndex: 0,
    answeredQuestions: [],
    password: {
      value: '',
      mnemonic: '',
      score: 0
    }
  })
}));
