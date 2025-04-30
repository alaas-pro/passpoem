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
      You are a master poet crafting secure passwords. Using the following personal responses,
      create both a secure password and a lyrical poem to remember it by.
      
      Transform these personal reflections into password poetry:
      ${formattedAnswers}
      
      Create something magical in this JSON format:
      {
        "password": "A secure artistic password that weaves symbols (!@#$%&*), numbers, and meaningful words",
        "mnemonic": "A short, rhythmic poem that captures the essence of the password and makes it memorable. Use metaphors and imagery from the user's responses."
      }
      
      Guidelines for the poetic creation:
      1. Create a password that tells a story through symbols and words
      2. Write the mnemonic as a proper poem with rhythm and possibly rhyme
      3. Use vivid imagery from the user's responses
      4. Ensure the poem naturally leads to remembering the password
      5. Keep security strong while maintaining poetic beauty
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
