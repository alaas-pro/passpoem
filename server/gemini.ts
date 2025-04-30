import { Question, PasswordGenResponse } from "@shared/schema";

// Function to generate password using Gemini API
export async function generatePassword(answers: Question[]): Promise<PasswordGenResponse> {
  // Check if answers array is valid
  if (!answers || answers.length === 0) {
    throw new Error("No answers provided");
  }

  try {
    // Format the answers for the Gemini API - ensure both questions and answers are sent
    const formattedAnswers = answers
      .map((qa, idx) => `Question ${idx + 1}: "${qa.question}"\nAnswer ${idx + 1}: "${qa.answer}"`)
      .join("\n\n");

    // Use environment variables for API keys
    const apiKey = process.env.GEMINI_API_KEY || "";
    
    if (!apiKey) {
      console.warn("No Gemini API key found. Using fallback generator.");
      return fallbackGenerator(answers);
    }

    // Prepare the prompt for Gemini
    const prompt = `
      You are a poetic password generator. Based on the following answers to poetic questions, 
      create a memorable, secure password that uses characters, symbols, and numbers.
      Also create a poetic mnemonic to help remember it.
      
      IMPORTANT: Pay attention to BOTH questions and answers. Use content and themes from the questions as 
      well as the answers to inspire your password generation. Each pair of question and answer should 
      contribute to the generated password.
      
      Here are the questions and answers:
      ${formattedAnswers}
      
      Generate a response in the following JSON format:
      {
        "password": "A secure password with 3+ words, numbers and symbols",
        "mnemonic": "A short, poetic mnemonic to remember the password"
      }
      
      Requirements for the password:
      1. At least 16 characters
      2. Must include at least one symbol (like !@#$%&*)
      3. Must include at least one number
      4. Should be inspired by BOTH the questions and the user's answers
      5. Should be poetic and memorable
      6. When creating the mnemonic, reference at least one theme from the questions and one theme from the answers
    `;

    // Call Gemini API
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the response text
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Find and parse the JSON in the response
    const jsonMatch = generatedText.match(/{[\s\S]*}/);
    
    if (!jsonMatch) {
      throw new Error("Failed to parse Gemini response");
    }
    
    const generatedData = JSON.parse(jsonMatch[0]);
    
    return {
      value: generatedData.password,
      mnemonic: generatedData.mnemonic,
      score: 0 // The score will be calculated by the API route
    };

  } catch (error) {
    console.error("Error generating password with Gemini:", error);
    return fallbackGenerator(answers);
  }
}

// Fallback password generator for when API is unavailable
function fallbackGenerator(answers: Question[]): PasswordGenResponse {
  // Extract notable words from both questions and answers
  const wordsFromAnswers = answers
    .flatMap(qa => qa.answer.split(/\s+/))
    .filter(word => word.length > 3)
    .map(word => word.replace(/[^a-zA-Z]/g, ''));
    
  const wordsFromQuestions = answers
    .flatMap(qa => qa.question.split(/\s+/))
    .filter(word => word.length > 3)
    .map(word => word.replace(/[^a-zA-Z]/g, ''));
    
  // Combine words from both sources
  const words = [...wordsFromAnswers, ...wordsFromQuestions];
  
  // Get 2-3 random words from the answers
  const selectedWords: string[] = [];
  for (let i = 0; i < Math.min(3, words.length); i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    if (words[randomIndex] && !selectedWords.includes(words[randomIndex])) {
      selectedWords.push(words[randomIndex]);
    }
  }
  
  // If we don't have enough words, add some defaults
  const fallbackWords = ["Mountain", "Ocean", "Forest", "Star", "River", "Journey"];
  while (selectedWords.length < 3) {
    const randomWord = fallbackWords[Math.floor(Math.random() * fallbackWords.length)];
    if (!selectedWords.includes(randomWord)) {
      selectedWords.push(randomWord);
    }
  }
  
  // Capitalize first letter of each word
  const formattedWords = selectedWords.map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  
  // Add symbols and numbers
  const symbols = ['!', '@', '#', '$', '%', '&', '*'];
  const randomSymbol1 = symbols[Math.floor(Math.random() * symbols.length)];
  const randomSymbol2 = symbols[Math.floor(Math.random() * symbols.length)];
  const randomNum = Math.floor(Math.random() * 100);
  
  // Assemble the password
  const password = `${formattedWords[0]}${randomSymbol1}${formattedWords[1]}${randomNum}${formattedWords[2]}${randomSymbol2}`;
  
  // Create a mnemonic that references both questions and answers
  // Extract a theme word from the questions to use in the mnemonic
  const questionThemes = ["question", "answer", "reflection", "memory", "feeling", "scent", "touch", "soul", "identity", "sound"];
  const randomTheme = questionThemes[Math.floor(Math.random() * questionThemes.length)];
  
  const mnemonic = `As you ${randomTheme} about a ${formattedWords[0].toLowerCase()} ${randomSymbol1} connecting to a ${formattedWords[1].toLowerCase()} with ${randomNum} ${formattedWords[2].toLowerCase()}s ${randomSymbol2} surrounding it all.`;
  
  return {
    value: password,
    mnemonic,
    score: 3 // Default score for fallback passwords
  };
}
