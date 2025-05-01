import { Question, PasswordGenResponse } from "@shared/schema";
import OpenAI from "openai";

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
      first create a meaningful poem, then extract a secure password from key elements of that poem.
      
      Personal reflections to inspire your poetry:
      ${formattedAnswers}
      
      Create something magical in this JSON format:
      {
        "poem": "First create a 4-line poem with vivid imagery and metaphors from the user's responses. Make it meaningful and memorable.",
        "password": "Then extract key words, numbers, and symbols (!@#$%&*) from the poem to create a secure password. The password should naturally flow from the poem's imagery.",
        "mnemonic": "Finally, briefly explain how the password is derived from specific elements in the poem."
      }
      
      Guidelines:
      1. Make the poem personal and meaningful using the user's responses
      2. Include strong imagery that can be translated into symbols
      3. Weave numbers naturally into the poem's narrative
      4. Ensure the final password has uppercase, lowercase, numbers, and symbols
      5. The connection between poem and password should be clear but not obvious to others
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
    
    // Ensure we have valid data before returning
    if (!generatedData.password || !generatedData.mnemonic) {
      throw new Error("Invalid response format from Gemini");
    }
    
    return {
      value: generatedData.password,
      mnemonic: generatedData.mnemonic,
      score: 0 // The score will be calculated by the API route
    };

  } catch (error) {
    console.error("Error generating password with Gemini:", error);
    try {
      const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });

      const formattedAnswers = answers
        .map((qa, idx) => `Question ${idx + 1}: "${qa.question}"\nAnswer ${idx + 1}: "${qa.answer}"`)
        .join("\n\n");

      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: "You are a master poet crafting secure passwords. Create a meaningful poem based on user responses, then extract a secure password from key elements of that poem."
        }, {
          role: "user",
          content: `Create a poem and password based on these responses:\n${formattedAnswers}`
        }],
        response_format: { type: "json_object" }
      });

      const result = JSON.parse(completion.choices[0].message.content);
      return {
        value: result.password,
        mnemonic: result.mnemonic,
        score: 0
      };
    } catch (openAiError) {
      console.error("Error generating password with OpenAI:", openAiError);
      return fallbackGenerator(answers);
    }
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
  
  const templates = [
    `As you ${randomTheme} about a ${formattedWords[0].toLowerCase()} ${randomSymbol1} connecting to a ${formattedWords[1].toLowerCase()} with ${randomNum} ${formattedWords[2].toLowerCase()}s ${randomSymbol2} in harmony.`,
    `Let the ${formattedWords[0].toLowerCase()} ${randomSymbol1} guide you to ${randomNum} ${formattedWords[1].toLowerCase()}s where ${formattedWords[2].toLowerCase()}s ${randomSymbol2} dance.`,
    `Within the ${formattedWords[0].toLowerCase()} ${randomSymbol1} lies ${randomNum} ${formattedWords[1].toLowerCase()}s, each ${formattedWords[2].toLowerCase()} ${randomSymbol2} unique.`
  ];
  const mnemonic = templates[Math.floor(Math.random() * templates.length)];
  
  return {
    value: password,
    mnemonic,
    score: 3 // Default score for fallback passwords
  };
}
